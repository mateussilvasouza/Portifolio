import Link from 'next/link'
import type { posts } from '@/db/schema'
import { cn } from '@/lib/utils'

type Post = typeof posts.$inferSelect

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
    .format(date)
    .replace('.', '')
}

export function BlogPostCard({
  post,
  featured = false,
}: {
  post: Post
  featured?: boolean
}) {
  return (
    <article
      className={cn(
        'rounded-lg border border-border bg-card transition-all duration-200 ease-[cubic-bezier(.2,.8,.2,1)] hover:-translate-y-1 hover:bg-background-2 hover:shadow-lift',
        featured ? 'p-9' : 'p-7',
      )}
    >
      <div className="flex items-center gap-2">
        <small className="font-mono text-xs tracking-[0.1em] text-accent uppercase">
          {post.category}
        </small>
        {featured && (
          <span className="rounded-sm bg-accent-soft px-1.5 py-0.5 font-mono text-[10px] font-medium text-accent uppercase">
            destaque
          </span>
        )}
      </div>

      <h3
        className={cn(
          'my-2.5 font-display font-semibold tracking-[-0.02em]',
          featured ? 'text-[28px]' : 'text-xl',
        )}
      >
        {post.title}
      </h3>

      <p
        className={cn(
          'text-[13px] text-muted-foreground',
          !featured && 'line-clamp-3',
        )}
      >
        {post.excerpt}
      </p>

      <div className="mt-4 flex flex-wrap gap-3 font-mono text-[11px] text-muted-foreground-2">
        <span>{formatDate(post.publishedAt)}</span>
        <span>{post.readingTimeMinutes} min de leitura</span>
        {post.tags.length > 0 && <span>{post.tags.join(' · ')}</span>}
      </div>

      <Link
        href={`/blog/${post.slug}`}
        className="mt-5 inline-block text-[13px] font-semibold text-foreground hover:text-accent"
      >
        Ler artigo →
      </Link>
    </article>
  )
}
