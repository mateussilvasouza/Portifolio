/**
 * Integração com a YouTube Data API v3 para a seção "Do canal".
 *
 * Roda só no servidor (Server Component): a chave nunca chega ao navegador.
 * As respostas ficam em cache por algumas horas (ISR), então o site faz no
 * máximo poucas chamadas por dia, bem dentro da cota gratuita.
 *
 * Sem chave, sem canal, sem vídeos ou com erro na API, retorna lista vazia e
 * a seção mostra o estado "Em breve".
 */

const API_BASE = 'https://www.googleapis.com/youtube/v3'

/** 6 horas. */
export const YOUTUBE_REVALIDATE_SECONDS = 60 * 60 * 6

export interface ChannelVideo {
  id: string
  title: string
  description: string
  publishedAt: string
  thumbnail: string | null
  duration: string | null
  url: string
}

export function getChannelConfig() {
  const url = process.env.YOUTUBE_CHANNEL_URL?.trim() || null
  return {
    url,
    subscribeUrl: url ? `${url}${url.includes('?') ? '&' : '?'}sub_confirmation=1` : null,
    description: process.env.YOUTUBE_CHANNEL_DESCRIPTION?.trim() || null,
  }
}

interface PlaylistItemsResponse {
  items?: { contentDetails?: { videoId?: string } }[]
}

interface Thumbnail {
  url: string
}

interface VideosResponse {
  items?: {
    id: string
    snippet: {
      title: string
      description: string
      publishedAt: string
      thumbnails?: Record<string, Thumbnail | undefined>
    }
    contentDetails?: { duration?: string }
  }[]
}

async function youtubeFetch<T>(path: string, params: Record<string, string>) {
  const search = new URLSearchParams(params)
  const response = await fetch(`${API_BASE}/${path}?${search}`, {
    next: { revalidate: YOUTUBE_REVALIDATE_SECONDS, tags: ['youtube'] },
  })
  if (!response.ok) {
    // 404 em playlistItems = canal ainda sem uploads. Outros erros são logados.
    if (response.status !== 404) {
      console.error(`[youtube] ${path} respondeu ${response.status}`)
    }
    return null
  }
  return (await response.json()) as T
}

/** "UCxxxx" (id do canal) vira "UUxxxx" (playlist de uploads), sem gastar cota. */
function uploadsPlaylistId(channelId: string) {
  return channelId.startsWith('UC') ? `UU${channelId.slice(2)}` : channelId
}

/** PT1H2M3S → "1:02:03"; PT4M5S → "4:05". */
export function formatDuration(iso: string | undefined) {
  if (!iso) return null
  const match = /^P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(iso)
  if (!match) return null
  const [, d, h, m, s] = match.map((part) => Number(part ?? 0))
  const hours = d * 24 + h
  const pad = (n: number) => String(n).padStart(2, '0')
  return hours > 0 ? `${hours}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`
}

function pickThumbnail(thumbnails?: Record<string, Thumbnail | undefined>) {
  if (!thumbnails) return null
  return (thumbnails.maxres ?? thumbnails.standard ?? thumbnails.high ?? thumbnails.medium ?? thumbnails.default)?.url ?? null
}

export async function getLatestVideos(limit = 3): Promise<ChannelVideo[]> {
  const key = process.env.YOUTUBE_API_KEY
  const channelId = process.env.YOUTUBE_CHANNEL_ID
  if (!key || !channelId) return []

  try {
    const playlist = await youtubeFetch<PlaylistItemsResponse>('playlistItems', {
      part: 'contentDetails',
      playlistId: uploadsPlaylistId(channelId),
      maxResults: String(limit),
      key,
    })
    const ids = (playlist?.items ?? [])
      .map((item) => item.contentDetails?.videoId)
      .filter((id): id is string => Boolean(id))
    if (ids.length === 0) return []

    const videos = await youtubeFetch<VideosResponse>('videos', {
      part: 'snippet,contentDetails',
      id: ids.join(','),
      key,
    })

    return (videos?.items ?? [])
      .map((video) => ({
        id: video.id,
        title: video.snippet.title,
        description: video.snippet.description,
        publishedAt: video.snippet.publishedAt,
        thumbnail: pickThumbnail(video.snippet.thumbnails),
        duration: formatDuration(video.contentDetails?.duration),
        url: `https://www.youtube.com/watch?v=${video.id}`,
      }))
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
      .slice(0, limit)
  } catch (error) {
    console.error('[youtube] falha ao buscar vídeos', error)
    return []
  }
}
