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
        "relative overflow-hidden rounded-[20px] border bg-gradient-to-br from-[rgba(17,23,34,.95)] to-[rgba(10,14,22,.88)] after:absolute after:right-[-70px] after:bottom-[-70px] after:h-[150px] after:w-[150px] after:rounded-full after:bg-accent/[0.06] after:blur-[2px] after:content-['']",
        featured ? 'p-9' : 'p-7',
      )}
    >
      <div className="flex items-center gap-2">
        <small className="text-[9px] font-black tracking-[0.14em] text-accent uppercase">
          {post.category}
        </small>
        {featured && (
          <span className="rounded-md bg-accent/10 px-1.5 py-0.5 text-[9px] font-bold text-accent uppercase">
            destaque
          </span>
        )}
      </div>

      <h3
        className={cn(
          'my-2.5 tracking-[-0.03em]',
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

      <div className="mt-4 flex flex-wrap gap-3 text-[10px] text-muted-foreground-2">
        <span>{formatDate(post.publishedAt)}</span>
        <span>{post.readingTimeMinutes} min de leitura</span>
        {post.tags.length > 0 && <span>{post.tags.join(' · ')}</span>}
      </div>

      <Link
        href={`/blog/${post.slug}`}
        className="mt-5 inline-block text-[11px] font-extrabold text-accent"
      >
        Ler artigo →
      </Link>
    </article>
  )
}
