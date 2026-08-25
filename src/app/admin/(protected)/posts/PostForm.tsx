'use client'

import { useMemo, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Button } from '@/components/ui/button'
import { postCategory } from '@/db/schema'
import { slugify } from '@/lib/slugify'

export interface PostFormValues {
  title: string
  slug: string
  excerpt: string
  content: string
  category: (typeof postCategory.enumValues)[number]
  tags: string[]
  readingTimeMinutes: number
  featured: boolean
  publishedAt: string
}

const emptyValues: PostFormValues = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  category: 'Frontend',
  tags: [],
  readingTimeMinutes: 5,
  featured: false,
  publishedAt: new Date().toISOString().slice(0, 10),
}

function estimateReadingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

export function PostForm({
  action,
  initialValues,
}: {
  action: (formData: FormData) => void
  initialValues?: PostFormValues
}) {
  const values = initialValues ?? emptyValues

  const [title, setTitle] = useState(values.title)
  const [slug, setSlug] = useState(values.slug)
  const [slugTouched, setSlugTouched] = useState(Boolean(values.slug))
  const [content, setContent] = useState(values.content)
  const [readingTime, setReadingTime] = useState(values.readingTimeMinutes)
  const [readingTimeTouched, setReadingTimeTouched] = useState(false)

  const suggestedReadingTime = useMemo(
    () => estimateReadingTime(content),
    [content],
  )

  return (
    <form action={action} className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="grid gap-4">
        <div>
          <label className="text-xs text-muted-foreground">Título</label>
          <input
            name="title"
            required
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
              if (!slugTouched) setSlug(slugify(e.target.value))
            }}
            className="mt-1 w-full rounded-lg border bg-white/2.5 px-3.5 py-2.5 text-sm outline-none focus:border-primary/50"
          />
        </div>

        <div>
          <label className="text-xs text-muted-foreground">Slug</label>
          <input
            name="slug"
            required
            value={slug}
            onChange={(e) => {
              setSlug(e.target.value)
              setSlugTouched(true)
            }}
            className="mt-1 w-full rounded-lg border bg-white/2.5 px-3.5 py-2.5 font-mono text-sm outline-none focus:border-primary/50"
          />
        </div>

        <div>
          <label className="text-xs text-muted-foreground">Resumo</label>
          <textarea
            name="excerpt"
            required
            rows={3}
            defaultValue={values.excerpt}
            className="mt-1 w-full rounded-lg border bg-white/2.5 px-3.5 py-2.5 text-sm outline-none focus:border-primary/50"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-muted-foreground">
              Categoria
            </label>
            <select
              name="category"
              defaultValue={values.category}
              className="mt-1 w-full rounded-lg border bg-white/2.5 px-3.5 py-2.5 text-sm outline-none focus:border-primary/50"
            >
              {postCategory.enumValues.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs text-muted-foreground">
              Data de publicação
            </label>
            <input
              type="date"
              name="publishedAt"
              required
              defaultValue={values.publishedAt}
              className="mt-1 w-full rounded-lg border bg-white/2.5 px-3.5 py-2.5 text-sm outline-none focus:border-primary/50"
            />
          </div>
        </div>

        <div>
          <label className="text-xs text-muted-foreground">
            Tags (separadas por vírgula)
          </label>
          <input
            name="tags"
            defaultValue={values.tags.join(', ')}
            className="mt-1 w-full rounded-lg border bg-white/2.5 px-3.5 py-2.5 text-sm outline-none focus:border-primary/50"
          />
        </div>

        <div className="grid grid-cols-2 items-end gap-4">
          <div>
            <label className="text-xs text-muted-foreground">
              Tempo de leitura (min){' '}
              {!readingTimeTouched && (
                <span className="text-accent">
                  sugerido: {suggestedReadingTime}
                </span>
              )}
            </label>
            <input
              type="number"
              name="readingTimeMinutes"
              min={1}
              required
              value={readingTimeTouched ? readingTime : suggestedReadingTime}
              onChange={(e) => {
                setReadingTime(Number(e.target.value))
                setReadingTimeTouched(true)
              }}
              className="mt-1 w-full rounded-lg border bg-white/2.5 px-3.5 py-2.5 text-sm outline-none focus:border-primary/50"
            />
          </div>

          <label className="mb-2.5 flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={values.featured}
            />
            Destaque
          </label>
        </div>

        <div>
          <label className="text-xs text-muted-foreground">
            Conteúdo (markdown)
          </label>
          <textarea
            name="content"
            required
            rows={16}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 w-full rounded-lg border bg-white/2.5 px-3.5 py-2.5 font-mono text-xs outline-none focus:border-primary/50"
          />
        </div>

        <Button type="submit" variant="gradient">
          Salvar
        </Button>
      </div>

      <div>
        <label className="text-xs text-muted-foreground">Preview</label>
        <div className="prose prose-invert mt-1 max-w-none rounded-lg border bg-white/2.5 px-5 py-4 text-sm">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content || '_o preview aparece aqui_'}
          </ReactMarkdown>
        </div>
      </div>
    </form>
  )
}
