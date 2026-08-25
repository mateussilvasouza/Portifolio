const MARKDOWN_IMAGE_URL = /!\[[^\]]*\]\(([^)\s]+)\)/g

export function extractBlobUrls(content: string): string[] {
  const urls: string[] = []

  for (const match of content.matchAll(MARKDOWN_IMAGE_URL)) {
    const url = match[1]
    if (url.includes('.blob.vercel-storage.com')) {
      urls.push(url)
    }
  }

  return urls
}
