'use client'

import { useMemo, useRef, useState } from 'react'
import { upload } from '@vercel/blob/client'
import { Button } from '@/components/ui/button'
import { MarkdownContent } from '@/components/MarkdownContent'
import { postCategory } from '@/db/schema'
import { slugify } from '@/lib/slugify'
import { estimateReadingTime } from '@/lib/reading-time'
import { parseMarkdownImport } from '@/lib/markdown-import'

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
  const [excerpt, setExcerpt] = useState(values.excerpt)
  const [category, setCategory] = useState(values.category)
  const [tagsText, setTagsText] = useState(values.tags.join(', '))
  const [featured, setFeatured] = useState(values.featured)
  const [publishedAt, setPublishedAt] = useState(values.publishedAt)
  const [content, setContent] = useState(values.content)
  const [readingTime, setReadingTime] = useState(values.readingTimeMinutes)
  const [readingTimeTouched, setReadingTimeTouched] = useState(false)

  const [importText, setImportText] = useState('')
  const importFileInputRef = useRef<HTMLInputElement>(null)

  const contentRef = useRef<HTMLTextAreaElement>(null)
  const mediaFileInputRef = useRef<HTMLInputElement>(null)
  const [uploadingMedia, setUploadingMedia] = useState(false)

  const suggestedReadingTime = useMemo(
    () => estimateReadingTime(content),
    [content],
  )

  function applyImport(raw: string) {
    const parsed = parseMarkdownImport(raw)
    if (parsed.title !== undefined) setTitle(parsed.title)
    if (parsed.slug !== undefined) {
      setSlug(parsed.slug)
      setSlugTouched(true)
    }
    if (parsed.excerpt !== undefined) setExcerpt(parsed.excerpt)
    if (parsed.category !== undefined) setCategory(parsed.category)
    if (parsed.tags !== undefined) setTagsText(parsed.tags.join(', '))
    if (parsed.readingTimeMinutes !== undefined) {
      setReadingTime(parsed.readingTimeMinutes)
      setReadingTimeTouched(true)
    }
    if (parsed.featured !== undefined) setFeatured(parsed.featured)
    if (parsed.publishedAt !== undefined) setPublishedAt(parsed.publishedAt)
    if (parsed.content !== undefined) setContent(parsed.content)
    setImportText('')
  }

  async function handleImportFile(file: File) {
    applyImport(await file.text())
  }

  function insertAtCursor(insertion: string) {
    const textarea = contentRef.current
    if (!textarea) {
      setContent((c) => c + insertion)
      return
    }

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const next = content.slice(0, start) + insertion + content.slice(end)
    setContent(next)

    requestAnimationFrame(() => {
      textarea.focus()
      const pos = start + insertion.length
      textarea.setSelectionRange(pos, pos)
    })
  }

  async function handleMediaUpload(file: File) {
    setUploadingMedia(true)
    try {
      const blob = await upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/blob/upload',
      })
      const alt = file.name.replace(/\.[^.]+$/, '')
      insertAtCursor(`![${alt}](${blob.url})\n`)
    } catch (error) {
      alert(
        error instanceof Error
          ? `Falha no upload: ${error.message}`
          : 'Falha no upload.',
      )
    } finally {
      setUploadingMedia(false)
    }
  }

  return (
    <form
      action={action}
      className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2"
    >
      <div className="grid gap-4">
        <div className="rounded-lg border border-dashed p-4">
          <label className="text-xs text-muted-foreground">
            Importar de markdown (opcional) — arquivo .md ou colar o texto
            (frontmatter preenche os campos, o resto é sugerido)
          </label>

          <div className="mt-2 flex flex-wrap items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => importFileInputRef.current?.click()}
            >
              Selecionar arquivo .md
            </Button>
            <input
              ref={importFileInputRef}
              type="file"
              accept=".md,.markdown,text/markdown"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleImportFile(file)
                e.target.value = ''
              }}
            />
          </div>

          <textarea
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            placeholder={
              '--- frontmatter opcional ---\ntitle: ...\ncategory: Frontend\ntags: React, TypeScript\n---\n\nou só cole o corpo em markdown'
            }
            rows={3}
            className="mt-2 w-full rounded-lg border bg-white/2.5 px-3.5 py-2.5 font-mono text-xs outline-none focus:border-primary/50"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            disabled={!importText.trim()}
            onClick={() => applyImport(importText)}
          >
            Preencher formulário
          </Button>
        </div>

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
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
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
              value={category}
              onChange={(e) =>
                setCategory(e.target.value as PostFormValues['category'])
              }
              className="mt-1 w-full rounded-lg border bg-white/2.5 px-3.5 py-2.5 text-sm outline-none focus:border-primary/50"
            >
              {postCategory.enumValues.map((c) => (
                <option key={c} value={c}>
                  {c}
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
              value={publishedAt}
              onChange={(e) => setPublishedAt(e.target.value)}
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
            value={tagsText}
            onChange={(e) => setTagsText(e.target.value)}
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
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
            />
            Destaque
          </label>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className="text-xs text-muted-foreground">
              Conteúdo (markdown)
            </label>
            <Button
              type="button"
              variant="outline"
              size="xs"
              disabled={uploadingMedia}
              onClick={() => mediaFileInputRef.current?.click()}
            >
              {uploadingMedia ? 'Enviando...' : 'Adicionar mídia'}
            </Button>
            <input
              ref={mediaFileInputRef}
              type="file"
              accept="image/*,video/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleMediaUpload(file)
                e.target.value = ''
              }}
            />
          </div>
          <textarea
            ref={contentRef}
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

      <div className="sticky top-20">
        <label className="text-xs text-muted-foreground">Preview</label>
        <div className="mt-1 max-h-[calc(100vh-6.5rem)] overflow-y-auto rounded-lg border bg-white/2.5 px-5 py-4 text-sm">
          <MarkdownContent content={content || '_o preview aparece aqui_'} />
        </div>
      </div>
    </form>
  )
}
