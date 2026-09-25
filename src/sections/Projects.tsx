import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/motion/Reveal'
import { ProjectsExplorer } from '@/components/ProjectsExplorer'
import { SectionHeading } from '@/components/SectionHeading'
import { getAllProjects } from '@/db/queries'

export async function Projects() {
  const projects = await getAllProjects()

  return (
    <section id="projetos" className="py-[70px] sm:py-[105px]">
      <Container>
        <Reveal>
          <SectionHeading
            kicker="03 / projetos"
            title="Coisas que construí."
            description="Projetos de estudo têm código aberto. Projetos em empresas são produtos públicos — o código é privado, então mostro o impacto."
          />

          <ProjectsExplorer projects={projects} />
        </Reveal>
      </Container>
    </section>
  )
}
