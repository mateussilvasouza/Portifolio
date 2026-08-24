import { Fragment } from 'react'
import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/motion/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { cases } from '@/data/cases'

export function Cases() {
  return (
    <section id="cases" className="border-t border-b bg-white/[0.018] py-[70px] sm:py-[105px]">
      <Container>
        <Reveal>
          <SectionHeading
            kicker="03 / cases"
            title="Problema → decisão → resultado."
            description="Quatro situações que representam melhor minha experiência do que uma simples lista de skills."
          />

          <div className="grid grid-cols-1 gap-[17px] lg:grid-cols-2">
            {cases.map((item) => (
              <article
                key={item.category}
                className="relative min-h-[335px] overflow-hidden rounded-[20px] border bg-gradient-to-br from-[rgba(17,23,34,.95)] to-[rgba(10,14,22,.88)] p-[29px] after:absolute after:right-[-90px] after:bottom-[-90px] after:h-[190px] after:w-[190px] after:rounded-full after:bg-accent/[0.06] after:blur-[2px] after:content-[''] max-sm:min-h-0"
              >
                <small className="text-[9px] font-black tracking-[0.14em] text-accent">
                  {item.category}
                </small>
                <h3 className="my-2.5 text-2xl tracking-[-0.045em]">
                  {item.title}
                </h3>
                <p className="max-w-[510px] text-[13px] text-muted-foreground">
                  {item.description}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-1.75">
                  {item.flow.map((step, index) => (
                    <Fragment key={step}>
                      {index > 0 && (
                        <span className="text-[10px] text-accent">→</span>
                      )}
                      <span className="rounded-[7px] border bg-white/2.5 px-2 py-1.5 text-[9px] text-[#c6cedb]">
                        {step}
                      </span>
                    </Fragment>
                  ))}
                </div>

                <span className="mt-5 inline-block rounded-lg bg-white/5 px-2.25 py-1.75 text-[11px] font-extrabold text-[#e8edf5]">
                  {item.result}
                </span>
              </article>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
