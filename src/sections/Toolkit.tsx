import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/motion/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { StackChips } from '@/components/ui/stack-chips'
import { skillGroups } from '@/data/skills'

export function Toolkit() {
  return (
    <section id="stack" className="py-[70px] sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading kicker="06 / Ferramentas" title="Stack" />
          <div>
            {skillGroups.map((group) => (
              <div
                key={group.title}
                className="grid grid-cols-1 gap-2 border-t border-border py-5 sm:grid-cols-[220px_minmax(0,1fr)] sm:gap-6"
              >
                <h3 className="font-display text-base leading-[1.4] font-semibold">
                  {group.title}
                </h3>
                <StackChips items={group.skills} />
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
