import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/motion/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { thoughts } from '@/data/thinking'

export function Thinking() {
  return (
    <section id="pensamento" className="py-[70px] sm:py-[105px]">
      <Container>
        <Reveal>
          <SectionHeading
            kicker="02 / engineering mindset"
            title="Como eu penso quando o código chega em produção."
            description="Minha experiência passa por suporte, dados, frontend, backend e arquitetura. Isso influencia como tomo decisões técnicas."
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {thoughts.map((thought) => (
              <div
                key={thought.num}
                className="rounded-[18px] border bg-gradient-to-br from-white/4 to-white/[0.012] p-7 transition-all duration-[250ms] hover:-translate-y-1 hover:border-primary/35"
              >
                <div className="font-mono text-[11px] text-accent">
                  {thought.num}
                </div>
                <h3 className="mt-3 mb-1.5 text-xl tracking-[-0.035em]">
                  {thought.title}
                </h3>
                <p className="text-[13px] text-muted-foreground">
                  {thought.description}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
