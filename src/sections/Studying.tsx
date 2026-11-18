import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/motion/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { Tag } from '@/components/ui/tag'
import { studying } from '@/data/studying'

export function Studying() {
  return (
    <section id="estudando" className="py-[70px] sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            kicker="04 / Em estudo"
            title="Estudando agora"
            description="O que estou estudando hoje."
          />
          <ol className="flex flex-col gap-2.5">
            {studying.map((topic, index) => (
              <li
                key={topic.name}
                className="grid grid-cols-[32px_88px_minmax(0,1fr)] items-center gap-5 rounded-md border border-border bg-card px-5 py-4 sm:grid-cols-[40px_120px_minmax(0,1fr)_auto]"
              >
                <span className="font-mono text-[13px] text-accent">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span
                  aria-hidden="true"
                  className="grid aspect-video place-items-center rounded-lg bg-background-2 font-mono text-sm font-bold text-muted-foreground"
                >
                  {topic.short}
                </span>
                <div>
                  <div className="font-display text-lg leading-[1.3] font-semibold">
                    {topic.name}
                  </div>
                  <div className="text-sm text-muted-foreground">{topic.note}</div>
                </div>
                <Tag tone="study" className="hidden sm:inline-flex">
                  Em estudo
                </Tag>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  )
}
