import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/motion/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { Button } from '@/components/ui/button'
import { ProjectCard } from '@/components/ProjectCard'
import { projects } from '@/data/projects'

export function Projects() {
  const featured = projects.filter((project) => project.featured)

  return (
    <section id="projetos" className="border-t border-b bg-white/[0.018] py-[70px] sm:py-[105px]">
      <Container>
        <Reveal>
          <SectionHeading
            kicker="07 / projetos"
            title="O que eu construo por conta própria."
            description="Projetos de empresa não podem ser compartilhados aqui — o que fica são os repositórios de estudo, feitos pra aprender e testar coisas na prática."
          />

          <div className="grid grid-cols-1 gap-[17px] lg:grid-cols-2">
            {featured.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button variant="outline" asChild>
              <Link href="/projetos">Ver todos os projetos</Link>
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
