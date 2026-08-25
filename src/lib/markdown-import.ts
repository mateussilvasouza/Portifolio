import matter from 'gray-matter'
import type { PostFormValues } from '@/app/admin/(protected)/posts/PostForm'
import { postCategory } from '@/db/schema'
import { slugify } from './slugify'
import { estimateReadingTime } from './reading-time'

function toDateInputValue(value: unknown): string | undefined {
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  if (typeof value === 'string' && value) return value
  return undefined
}

function toTags(value: unknown): string[] | undefined {
  if (Array.isArray(value)) return value.map(String)
  if (typeof value === 'string' && value) {
    return value
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)
  }
  return undefined
}

function firstParagraphExcerpt(body: string) {
  return body
    .split(/\n\s*\n/)[0]
    ?.replace(/\n/g, ' ')
    .trim()
    .slice(0, 200)
}

export function parseMarkdownImport(raw: string): Partial<PostFormValues> {
  const { data, content } = matter(raw)
  const body = content.trim()

  const title = typeof data.title === 'string' ? data.title : undefined
  const category = postCategory.enumValues.includes(data.category)
    ? (data.category as (typeof postCategory.enumValues)[number])
    : undefined
  const slug =
    (typeof data.slug === 'string' && data.slug) ||
    (title ? slugify(title) : undefined)

  return {
    ...(title && { title }),
    ...(slug && { slug }),
    excerpt:
      typeof data.excerpt === 'string' ? data.excerpt : firstParagraphExcerpt(body),
    content: body,
    ...(category && { category }),
    ...(toTags(data.tags) && { tags: toTags(data.tags) }),
    readingTimeMinutes:
      typeof data.readingTimeMinutes === 'number'
        ? data.readingTimeMinutes
        : estimateReadingTime(body),
    ...(typeof data.featured === 'boolean' && { featured: data.featured }),
    ...(toDateInputValue(data.publishedAt) && {
      publishedAt: toDateInputValue(data.publishedAt),
    }),
  }
}
