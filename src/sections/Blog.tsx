import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/motion/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { Button } from '@/components/ui/button'
import { BlogPostCard } from '@/components/BlogPostCard'
import { getAllPosts } from '@/db/queries'

export async function Blog() {
  const allPosts = await getAllPosts()
  const featured = allPosts.find((post) => post.featured)
  const recent = allPosts
    .filter((post) => post.id !== featured?.id)
    .slice(0, 3)

  if (allPosts.length === 0) return null

  return (
    <section id="blog" className="border-t border-b bg-white/[0.018] py-[70px] sm:py-[105px]">
      <Container>
        <Reveal>
          <SectionHeading
            kicker="07 / blog"
            title="Ideias, experiências e aprendizados."
            description="Um espaço para compartilhar o que aprendi construindo software: frontend, backend, arquitetura, performance, cloud e os problemas que aparecem no mundo real."
          />

          {featured && (
            <div className="mb-4">
              <BlogPostCard post={featured} featured />
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recent.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button variant="outline" asChild>
              <Link href="/blog">Ver todos os posts</Link>
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
