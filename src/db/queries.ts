import { desc, eq } from 'drizzle-orm'
import { db } from './index'
import { posts } from './schema'

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
