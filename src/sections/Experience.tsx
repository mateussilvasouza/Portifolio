import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/motion/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { StackChips } from '@/components/ui/stack-chips'
import { getAllExperiences } from '@/db/queries'
import { growthIntro, growthPath } from '@/data/growth'

export async function Experience() {
  const experiences = await getAllExperiences()

  return (
    <section id="experiencia" className="py-[70px] sm:py-[105px]">
      <Container>
        <Reveal>
          <SectionHeading
            kicker="05 / experiência"
            title="De suporte a Full Stack Pleno."
            description="Uma evolução rápida, atravessando diferentes camadas do produto e da engenharia."
          />

          <div className="grid grid-cols-1 items-stretch gap-6.25 lg:grid-cols-[1fr_1.4fr]">
            <div className="rounded-lg border border-border bg-card p-7.5">
              <h3 className="font-display text-[27px] font-semibold tracking-[-0.02em]">
                {growthIntro.title.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h3>
              <p className="mt-2.5 text-[13px] text-muted-foreground">
                {growthIntro.description}
              </p>
            </div>

            <div className="grid gap-2.5">
              {growthPath.map((step) => (
                <div
                  key={step.title}
                  className="flex items-center gap-3.25 rounded-[10px] border border-border bg-card p-3.25"
                >
                  <b className="text-xs">{step.title}</b>
                  <span className="text-[10px] text-muted-foreground">
                    {step.description}
                  </span>
                  <em className="ml-auto font-mono text-[10px] text-accent not-italic uppercase">
                    {step.tag}
                  </em>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-11.25 border-t border-border">
            {experiences.map((job) => (
              <article
                key={job.id}
                className="grid grid-cols-1 gap-1.75 border-b border-border py-8 lg:grid-cols-[180px_1fr] lg:gap-9"
              >
                <div className="font-mono text-[13px] text-muted-foreground">
                  <b className="block font-medium text-foreground">
                    {job.period}
                  </b>
                  {job.duration}
                </div>
                <div>
                  <h3 className="font-display text-2xl font-semibold tracking-[-0.02em]">
                    {job.role}
                  </h3>
                  <p className="mt-1 mb-3 text-sm font-semibold text-sky">
                    {job.company}
                    {job.product && (
                      <span className="font-normal text-muted-foreground">
                        {' '}
                        · {job.product}
                      </span>
                    )}
                  </p>
                  <div className="grid gap-2">
                    {job.highlights.map((highlight) => (
                      <div
                        key={highlight}
                        className="relative pl-4 text-sm text-muted-foreground before:absolute before:top-[0.65em] before:left-0 before:h-px before:w-2.5 before:bg-accent before:content-['']"
                      >
                        {highlight}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <StackChips items={job.technologies} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
