import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/motion/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { StackChips } from '@/components/ui/stack-chips'
import { skillGroups } from '@/data/skills'

export function Toolkit() {
  return (
    <section id="stack" className="py-[70px] sm:py-[105px]">
      <Container>
        <Reveal>
          <SectionHeading
            kicker="04 / toolkit"
            title="Frontend e backend trabalhando como um só produto."
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group) => (
              <div
                key={group.title}
                className="rounded-lg border border-border bg-card p-5.5"
              >
                <h3 className="font-display text-base font-semibold">
                  {group.title}
                </h3>
                <p className="mt-1.5 mb-4 text-xs text-muted-foreground">
                  {group.description}
                </p>
                <StackChips items={group.skills} />
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
