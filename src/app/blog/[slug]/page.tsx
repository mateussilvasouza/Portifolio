import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Container } from '@/components/layout/Container'
import { MarkdownContent } from '@/components/MarkdownContent'
import { getPostBySlug } from '@/db/queries'

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
    .format(date)
    .replace('.', '')
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) return {}

  return {
    title: `${post.title} — Blog`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) notFound()

  return (
    <Container className="py-16 sm:py-24">
      <Link href="/blog" className="text-xs text-muted-foreground hover:text-foreground">
        ← blog
      </Link>

      <div className="mt-6 text-[10px] font-black tracking-[0.14em] text-accent uppercase">
        {post.category}
      </div>

      <h1 className="mt-2.5 max-w-[850px] text-[clamp(32px,5vw,54px)] leading-[1.02] tracking-[-0.05em]">
        {post.title}
      </h1>

      <div className="mt-5 flex flex-wrap gap-4 text-xs text-muted-foreground">
        <span>{formatDate(post.publishedAt)}</span>
        <span>{post.readingTimeMinutes} min de leitura</span>
        {post.tags.length > 0 && <span>{post.tags.join(' · ')}</span>}
      </div>

      <div className="mt-10 max-w-[720px]">
        <MarkdownContent content={post.content} />
      </div>
    </Container>
  )
}
