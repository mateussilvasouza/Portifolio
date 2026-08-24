import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/motion/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
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

          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group) => (
              <div key={group.title} className="rounded-[17px] border p-5.5">
                <h3 className="text-[15px]">{group.title}</h3>
                <p className="mt-1.5 mb-3 text-xs text-muted-foreground">
                  {group.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md border border-primary/10 bg-primary/[0.08] px-1.75 py-1 text-[9px] text-[#cbd3ff]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
