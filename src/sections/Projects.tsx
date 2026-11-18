import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/motion/Reveal'
import { ProjectsExplorer } from '@/components/ProjectsExplorer'
import { SectionHeading } from '@/components/SectionHeading'
import { projects } from '@/data/projects'

export function Projects() {
  return (
    <section id="projetos" className="py-[70px] sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            kicker="03 / Projetos"
            title="Coisas que construí"
            description="Projetos de estudo têm código aberto. Em empresas, o código é privado, então mostro o produto e o impacto."
          />

          <ProjectsExplorer projects={projects} />
        </Reveal>
      </Container>
    </section>
  )
}
