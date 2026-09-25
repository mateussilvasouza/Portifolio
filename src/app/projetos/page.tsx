import { Container } from '@/components/layout/Container'
import { ProjectsExplorer } from '@/components/ProjectsExplorer'
import { getAllProjects } from '@/db/queries'

export const metadata = {
  title: 'Projetos — Mateus Silva Souza',
  description:
    'Projetos de estudo com código aberto e projetos em empresas com o impacto que posso divulgar.',
}

export default async function ProjectsPage() {
  const projects = await getAllProjects()

  return (
    <Container className="py-16 sm:py-24">
      <div className="font-mono text-xs tracking-[0.12em] text-accent uppercase">
        Projetos
      </div>
      <h1 className="my-5 max-w-[850px] font-display text-[clamp(40px,6vw,64px)] leading-[0.96] font-bold tracking-[-0.03em]">
        Coisas que <span className="mark-lime">construí</span>.
      </h1>
      <p className="max-w-[700px] text-lg text-muted-foreground">
        Projetos de estudo têm código aberto. Projetos em empresas são
        produtos públicos — o código é privado, então mostro o impacto.
      </p>

      <div className="mt-11">
        <ProjectsExplorer projects={projects} />
      </div>
    </Container>
  )
}
