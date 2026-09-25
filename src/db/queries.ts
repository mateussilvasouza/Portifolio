import { asc, desc, eq } from 'drizzle-orm'
import { db } from './index'
import {
  contactLinks,
  events,
  experiences,
  posts,
  projects,
  settings,
} from './schema'

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

export function getAllProjects() {
  return db
    .select()
    .from(projects)
    .orderBy(asc(projects.order), asc(projects.id))
}

export async function getProjectById(id: number) {
  const [project] = await db
    .select()
    .from(projects)
    .where(eq(projects.id, id))
  return project
}

export function getAllEvents() {
  return db.select().from(events).orderBy(desc(events.date))
}

export async function getEventById(id: number) {
  const [event] = await db.select().from(events).where(eq(events.id, id))
  return event
}

export function getAllExperiences() {
  return db
    .select()
    .from(experiences)
    .orderBy(asc(experiences.order), asc(experiences.id))
}

export async function getExperienceById(id: number) {
  const [experience] = await db
    .select()
    .from(experiences)
    .where(eq(experiences.id, id))
  return experience
}

export function getAllContactLinks() {
  return db
    .select()
    .from(contactLinks)
    .orderBy(asc(contactLinks.order), asc(contactLinks.id))
}

export async function getContactLinkById(id: number) {
  const [link] = await db
    .select()
    .from(contactLinks)
    .where(eq(contactLinks.id, id))
  return link
}
