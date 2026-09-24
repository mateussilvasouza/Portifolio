import { desc, eq } from 'drizzle-orm'
import { db } from './index'
import { posts, settings } from './schema'

export function getAllPosts() {
  return db.select().from(posts).orderBy(desc(posts.publishedAt))
}

export async function getPostBySlug(slug: string) {
  const [post] = await db.select().from(posts).where(eq(posts.slug, slug))
  return post
}

export async function getPostById(id: number) {
  const [post] = await db.select().from(posts).where(eq(posts.id, id))
  return post
}

export async function getSetting(key: string) {
  const [row] = await db.select().from(settings).where(eq(settings.key, key))
  return row?.value
}
