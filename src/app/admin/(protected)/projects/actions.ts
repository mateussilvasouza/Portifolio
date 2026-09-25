'use server'

import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { db } from '@/db'
import { projects, projectKind, type ProjectLink } from '@/db/schema'
import { requireSession } from '@/lib/session'

function parseProjectForm(formData: FormData) {
  const kind = formData.get('kind')
  if (!projectKind.enumValues.includes(kind as never)) {
    throw new Error(`Invalid kind: ${String(kind)}`)
  }

  const stack = String(formData.get('stack') ?? '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

  let links: ProjectLink[] = []
  try {
    links = JSON.parse(String(formData.get('links') ?? '[]'))
  } catch {
    links = []
  }

  const optional = (key: string) => {
    const value = String(formData.get(key) ?? '').trim()
    return value || null
  }

  return {
    kind: kind as (typeof projectKind.enumValues)[number],
    title: String(formData.get('title')),
    description: String(formData.get('description')),
    period: optional('period'),
    company: optional('company'),
    role: optional('role'),
    stack,
    links,
    metricValue: optional('metricValue'),
    metricLabel: optional('metricLabel'),
    privateNote: optional('privateNote'),
    order: Number(formData.get('order') ?? 0),
  }
}

function revalidateProjectPaths() {
  revalidatePath('/admin/projects')
  revalidatePath('/')
  revalidatePath('/projetos')
}

export async function createProject(formData: FormData) {
  await requireSession()

  await db.insert(projects).values(parseProjectForm(formData))

  revalidateProjectPaths()
  redirect('/admin/projects')
}

export async function updateProject(id: number, formData: FormData) {
  await requireSession()

  await db.update(projects).set(parseProjectForm(formData)).where(eq(projects.id, id))

  revalidateProjectPaths()
  redirect('/admin/projects')
}

export async function deleteProject(id: number) {
  await requireSession()

  await db.delete(projects).where(eq(projects.id, id))

  revalidateProjectPaths()
}
