import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/motion/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { Button } from '@/components/ui/button'
import { Tag } from '@/components/ui/tag'
import { getChannelConfig, getLatestVideos } from '@/lib/youtube'

const dateFormat = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  timeZone: 'America/Sao_Paulo',
})

export async function Channel() {
  const channel = getChannelConfig()
  const videos = await getLatestVideos(3)

  return (
    <section id="canal" className="py-[70px] sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            kicker="05 / Do canal"
            title="Canal de estudos"
            description={
              channel.description ??
              'Vídeos sobre o que estou estudando e construindo, do jeito que aprendi.'
            }
          />

          {videos.length === 0 ? (
            <div className="flex flex-wrap items-end justify-between gap-8 rounded-lg border border-dashed border-border-strong bg-card p-6 sm:p-10">
              <div className="flex max-w-[56ch] flex-col gap-3">
                <Tag tone="neutral" className="self-start">
                  Em breve
                </Tag>
                <h3 className="font-display text-[32px] leading-[1.1] font-bold tracking-[-0.02em]">
                  Os primeiros vídeos estão a caminho
                </h3>
                <p className="leading-[1.6] text-muted-foreground">
                  Assim que forem publicados, os vídeos mais recentes do canal
                  aparecem aqui automaticamente.
                </p>
              </div>
              {channel.subscribeUrl && (
                <Button variant="primary" asChild>
                  <a href={channel.subscribeUrl} target="_blank" rel="noopener noreferrer">
                    Inscrever-se no canal
                  </a>
                </Button>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {videos.map((video) => (
                  <article
                    key={video.id}
                    className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all duration-200 ease-[cubic-bezier(.2,.8,.2,1)] hover:-translate-y-1 hover:bg-background-2 hover:shadow-lift"
                  >
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative block aspect-video border-b border-border bg-background-2"
                    >
                      {video.thumbnail && (
                        <Image
                          src={video.thumbnail}
                          alt=""
                          fill
                          sizes="(min-width: 768px) 33vw, 100vw"
                          className="object-cover"
                        />
                      )}
                      {video.duration && (
                        <span className="absolute right-3 bottom-3 rounded-sm bg-scrim px-2.5 py-1.5 font-mono text-xs tracking-[0.08em] text-[#eeece6]">
                          {video.duration}
                        </span>
                      )}
                    </a>
                    <div className="flex grow flex-col gap-3 px-6 pt-5 pb-6">
                      <time
                        dateTime={video.publishedAt}
                        className="font-mono text-xs text-muted-foreground"
                      >
                        {dateFormat.format(new Date(video.publishedAt))}
                      </time>
                      <h3 className="font-display text-xl leading-[1.25] font-semibold tracking-[-0.01em]">
                        <a href={video.url} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                          {video.title}
                        </a>
                      </h3>
                      {video.description && (
                        <p className="line-clamp-3 text-[15px] leading-[1.55] text-muted-foreground">
                          {video.description}
                        </p>
                      )}
                    </div>
                  </article>
                ))}
              </div>
              {channel.url && (
                <div className="mt-6">
                  <Button variant="ghost" asChild className="group">
                    <a href={channel.url} target="_blank" rel="noopener noreferrer">
                      Ver todos no YouTube
                      <ArrowUpRight className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </Button>
                </div>
              )}
            </>
          )}
        </Reveal>
      </Container>
    </section>
  )
}
