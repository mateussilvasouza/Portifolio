import { Container } from '@/components/layout/Container'
import { getAllPosts } from '@/db/queries'
import { BlogExplorer } from './BlogExplorer'

export const metadata = {
  title: 'Blog — Mateus Silva Souza',
  description:
    'Ideias, experiências e aprendizados sobre frontend, backend, arquitetura, performance e cloud.',
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <Container className="py-16 sm:py-24">
      <div className="text-[10px] font-black tracking-[0.14em] text-accent uppercase">
        Blog pessoal
      </div>
      <h1 className="my-5 max-w-[850px] text-[clamp(40px,6vw,72px)] leading-[0.96] tracking-[-0.065em]">
        Ideias, experiências e <span className="text-gradient">aprendizados.</span>
      </h1>
      <p className="max-w-[700px] text-lg text-muted-foreground">
        Um espaço para compartilhar o que aprendi construindo software:
        frontend, backend, arquitetura, performance, cloud e os problemas
        que aparecem no mundo real.
      </p>

      <BlogExplorer posts={posts} />
    </Container>
  )
}
