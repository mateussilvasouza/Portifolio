import { Container } from '@/components/layout/Container'
import { ProjectCard } from '@/components/ProjectCard'
import { projects } from '@/data/projects'

export const metadata = {
  title: 'Projetos — Mateus Silva Souza',
  description:
    'Repositórios de estudo — projetos pessoais feitos pra aprender e testar coisas na prática, já que trabalho de empresa não pode ser compartilhado.',
}

export default function ProjectsPage() {
  return (
    <Container className="py-16 sm:py-24">
      <div className="text-[10px] font-black tracking-[0.14em] text-accent uppercase">
        Projetos
      </div>
      <h1 className="my-5 max-w-[850px] text-[clamp(40px,6vw,72px)] leading-[0.96] tracking-[-0.065em]">
        O que eu construo <span className="text-gradient">por conta própria.</span>
      </h1>
      <p className="max-w-[700px] text-lg text-muted-foreground">
        Projetos de empresa não podem ser compartilhados aqui — o que fica são
        os repositórios de estudo, feitos pra aprender e testar coisas na
        prática.
      </p>

      <div className="mt-11 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </Container>
  )
}
