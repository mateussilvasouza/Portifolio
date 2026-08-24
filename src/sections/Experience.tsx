import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/motion/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { experiences } from '@/data/experience'
import { growthIntro, growthPath } from '@/data/growth'

export function Experience() {
  return (
    <section id="experiencia" className="border-t border-b bg-white/[0.018] py-[70px] sm:py-[105px]">
      <Container>
        <Reveal>
          <SectionHeading
            kicker="05 / trajetória"
            title="De suporte a Full Stack Pleno."
            description="Uma evolução rápida, atravessando diferentes camadas do produto e da engenharia."
          />

          <div className="grid grid-cols-1 items-stretch gap-6.25 lg:grid-cols-[1fr_1.4fr]">
            <div className="rounded-[20px] border bg-gradient-to-br from-primary/[0.08] to-white/[0.015] p-7.5">
              <h3 className="text-[27px] tracking-[-0.05em]">
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
                  className="flex items-center gap-3.25 rounded-[10px] border bg-white/2.5 p-3.25"
                >
                  <b className="text-xs">{step.title}</b>
                  <span className="text-[10px] text-muted-foreground">
                    {step.description}
                  </span>
                  <em className="ml-auto text-[9px] text-accent not-italic">
                    {step.tag}
                  </em>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-11.25 border-t">
            {experiences.map((job) => (
              <article
                key={job.company}
                className="grid grid-cols-1 gap-1.75 border-b py-7.75 lg:grid-cols-[175px_1fr] lg:gap-9"
              >
                <div className="pt-1.25 text-[10px] text-muted-foreground-2">
                  {job.period}
                </div>
                <div>
                  <div className="text-[23px] font-extrabold tracking-[-0.045em]">
                    {job.company}
                  </div>
                  <div className="mt-0.5 mb-3 text-xs text-accent">
                    {job.role}
                  </div>
                  <p className="text-[13px] text-muted-foreground">
                    {job.description}
                  </p>
                  <div className="mt-3.75 grid gap-2">
                    {job.highlights.map((highlight) => (
                      <div
                        key={highlight}
                        className="relative pl-3.75 text-xs text-[#cbd3df] before:absolute before:top-2 before:left-0 before:h-1.25 before:w-1.25 before:rounded-full before:bg-primary before:content-['']"
                      >
                        {highlight}
                      </div>
                    ))}
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
