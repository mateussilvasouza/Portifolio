import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/motion/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { StackChips } from '@/components/ui/stack-chips'
import { Tag } from '@/components/ui/tag'
import { experiences } from '@/data/experiences'
import { getCompanyDetailByName } from '@/data/deliveries'
import { profile } from '@/data/profile'

/** Quantas entregas aparecem na home antes do link para a página da empresa. */
const HOME_DELIVERIES = 4

export function Experience() {
  return (
    <section id="experiencia" className="py-[70px] sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            kicker="02 / Experiência"
            title="Onde trabalhei"
            description="As principais entregas em cada empresa, com o número real do impacto."
          />

          <div className="flex flex-col gap-6">
            {experiences.map((job, index) => {
              const detail = getCompanyDetailByName(job.company)
              const number = String(experiences.length - index).padStart(2, '0')
              const shown = job.highlights.slice(0, HOME_DELIVERIES)
              const total = detail?.deliveries.length ?? job.highlights.length


              return (
                <article
                  key={job.company}
                  className="grid grid-cols-1 gap-8 rounded-lg border border-border bg-card p-5 sm:p-8 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)]"
                >
                  <div className="relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-md bg-background-2 p-5">
                    <span
                      aria-hidden="true"
                      className="absolute top-2 right-4 font-display text-[120px] leading-none font-extrabold tracking-[-0.05em] text-border"
                    >
                      {number}
                    </span>
                    <Tag tone="company" className="relative self-start">
                      Empresa
                    </Tag>
                    <h3 className="relative mt-3 font-display text-[32px] leading-[1.05] font-bold tracking-[-0.02em]">
                      {job.company}
                    </h3>
                    <p className="relative mt-1 text-[15px] text-muted-foreground">
                      {job.summary}
                    </p>
                    <p className="relative mt-3 font-mono text-[13px] text-muted-foreground">
                      {job.period}
                      {job.duration && ` · ${job.duration}`}
                    </p>
                  </div>

                  <div>
                    <div className="mb-1 font-mono text-xs tracking-[0.12em] text-muted-foreground uppercase">
                      {job.role}
                    </div>
                    <ol>
                      {shown.map((highlight, i) => (
                        <li
                          key={highlight.title}
                          className="grid grid-cols-[56px_minmax(0,1fr)] items-start gap-4 border-t border-border py-3.5"
                        >
                          <span className="font-mono text-xs leading-[22px] tracking-[0.08em] text-accent">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <p className="text-[15px] leading-[1.55] text-muted-foreground">
                            <strong className="font-medium text-foreground">
                              {highlight.title}
                            </strong>{' '}
                            {highlight.text}
                          </p>
                        </li>
                      ))}
                    </ol>
                    {job.technologies && job.technologies.length > 0 && (
                      <div className="mt-4">
                        <StackChips items={job.technologies} />
                      </div>
                    )}
                    {detail && (
                      <Link
                        href={`/experiencia/${detail.slug}`}
                        className="mt-4 inline-flex items-center gap-2 font-semibold text-accent hover:underline hover:underline-offset-4"
                      >
                        Ver as {total} entregas na {job.company}
                        <ArrowRight className="size-4" />
                      </Link>
                    )}
                  </div>
                </article>
              )
            })}

            <div className="flex flex-wrap items-center justify-between gap-4 rounded-md border border-dashed border-border-strong px-6 py-5">
              <div>
                <span className="font-mono text-xs tracking-[0.12em] text-muted-foreground uppercase">
                  Formação
                </span>
                <div className="mt-1.5 font-display text-xl leading-[1.3] font-semibold">
                  {profile.education.course} — {profile.education.school}
                </div>
              </div>
              <span className="font-mono text-[13px] text-muted-foreground">
                {profile.education.conclusion}
              </span>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
