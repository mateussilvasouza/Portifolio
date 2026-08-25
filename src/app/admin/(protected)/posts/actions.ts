'use server'

import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { db } from '@/db'
import { posts, postCategory } from '@/db/schema'
import { requireSession } from '@/lib/session'

function parsePostForm(formData: FormData) {
  const category = formData.get('category')
  if (!postCategory.enumValues.includes(category as never)) {
    throw new Error(`Invalid category: ${String(category)}`)
  }

  const tags = String(formData.get('tags') ?? '')
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean)

  return {
    slug: String(formData.get('slug')),
    title: String(formData.get('title')),
    excerpt: String(formData.get('excerpt')),
    content: String(formData.get('content')),
    category: category as (typeof postCategory.enumValues)[number],
    tags,
    readingTimeMinutes: Number(formData.get('readingTimeMinutes')),
    featured: formData.get('featured') === 'on',
    publishedAt: new Date(String(formData.get('publishedAt'))),
  }
}

export async function createPost(formData: FormData) {
  await requireSession()

  await db.insert(posts).values(parsePostForm(formData))

  revalidatePath('/admin')
  redirect('/admin')
}

export async function updatePost(id: number, formData: FormData) {
  await requireSession()

  await db.update(posts).set(parsePostForm(formData)).where(eq(posts.id, id))

  revalidatePath('/admin')
  redirect('/admin')
}

export async function deletePost(id: number) {
  await requireSession()

  await db.delete(posts).where(eq(posts.id, id))

  revalidatePath('/admin')
}
