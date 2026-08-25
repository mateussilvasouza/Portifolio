'use server'

import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { del } from '@vercel/blob'
import { db } from '@/db'
import { posts, postCategory } from '@/db/schema'
import { getPostById } from '@/db/queries'
import { requireSession } from '@/lib/session'
import { extractBlobUrls } from '@/lib/extract-blob-urls'

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

function revalidatePublicBlogPaths() {
  revalidatePath('/admin')
  revalidatePath('/')
  revalidatePath('/blog')
  revalidatePath('/blog/[slug]', 'page')
}

export async function createPost(formData: FormData) {
  await requireSession()

  await db.insert(posts).values(parsePostForm(formData))

  revalidatePublicBlogPaths()
  redirect('/admin')
}

export async function updatePost(id: number, formData: FormData) {
  await requireSession()

  await db.update(posts).set(parsePostForm(formData)).where(eq(posts.id, id))

  revalidatePublicBlogPaths()
  redirect('/admin')
}

export async function deletePost(id: number) {
  await requireSession()

  const post = await getPostById(id)

  await db.delete(posts).where(eq(posts.id, id))

  if (post) {
    const blobUrls = extractBlobUrls(post.content)
    await Promise.all(
      blobUrls.map((url) =>
        del(url).catch((error) =>
          console.error(`Failed to delete blob ${url}:`, error),
        ),
      ),
    )
  }

  revalidatePublicBlogPaths()
}
