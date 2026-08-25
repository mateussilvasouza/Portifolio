'use client'

import { useMemo, useState } from 'react'
import { BlogPostCard } from '@/components/BlogPostCard'
import { postCategory, type posts } from '@/db/schema'
import { cn } from '@/lib/utils'

type Post = typeof posts.$inferSelect

const categories = ['Todos', ...postCategory.enumValues] as const

export function BlogExplorer({ posts }: { posts: Post[] }) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<(typeof categories)[number]>(
    'Todos',
  )

  const isFiltering = search.trim() !== '' || category !== 'Todos'

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    return posts.filter((post) => {
      const matchesCategory = category === 'Todos' || post.category === category
      const matchesSearch =
        query === '' ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query)
      return matchesCategory && matchesSearch
    })
  }, [posts, search, category])

  const featured = !isFiltering ? posts.find((post) => post.featured) : undefined
  const grid = isFiltering
    ? filtered
    : filtered.filter((post) => post.id !== featured?.id)

  return (
    <div className="mt-11">
      <div className="mb-9 flex flex-wrap items-center justify-between gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar artigos..."
          className="min-w-[280px] flex-1 rounded-[13px] border bg-white/2.5 px-4 py-3 text-sm outline-none focus:border-primary/50"
        />

        <div className="flex flex-wrap gap-1.75">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={cn(
                'rounded-full border px-3.5 py-2 text-xs text-muted-foreground transition-colors',
                category === c &&
                  'border-primary/40 bg-primary/[0.1] text-foreground',
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {featured && (
        <div className="mb-9">
          <div className="mb-3.5 flex items-center gap-3 text-[11px] font-black tracking-[0.18em] text-muted-foreground-2 uppercase after:h-px after:flex-1 after:bg-border after:content-['']">
            Destaque
          </div>
          <BlogPostCard post={featured} featured />
        </div>
      )}

      <div className="mb-3.5 flex items-center gap-3 text-[11px] font-black tracking-[0.18em] text-muted-foreground-2 uppercase after:h-px after:flex-1 after:bg-border after:content-['']">
        {isFiltering ? `${grid.length} resultado(s)` : 'Todos os artigos'}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {grid.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>

      {grid.length === 0 && (
        <p className="text-sm text-muted-foreground">
          Nenhum artigo encontrado.
        </p>
      )}
    </div>
  )
}
