import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/motion/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { metrics } from '@/data/metrics'
import { cn } from '@/lib/utils'

const borderClasses = [
  'border-b sm:border-r lg:border-b-0',
  'border-b lg:border-b-0 lg:border-r',
  'border-b sm:border-b-0 sm:border-r',
  '',
]

export function Impact() {
  return (
    <section
      id="impacto"
      className="border-y border-border bg-background-2 py-[70px] sm:py-[105px]"
    >
      <Container>
        <Reveal>
          <SectionHeading
            kicker="01 / impacto"
            title="Números que contam uma história."
            description="Resultados concretos da experiência profissional, não apenas uma lista de tecnologias."
          />

          <div className="grid grid-cols-1 overflow-hidden rounded-lg border border-border bg-card sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric, index) => (
              <div key={metric.value} className={cn('p-7', borderClasses[index])}>
                <b className="block font-display text-[35px] font-bold tracking-[-0.03em]">
                  {metric.value}
                </b>
                <span className="text-[11px] text-muted-foreground">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
