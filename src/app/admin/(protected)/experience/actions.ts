'use server'

import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { db } from '@/db'
import { experiences } from '@/db/schema'
import { requireSession } from '@/lib/session'

function parseExperienceForm(formData: FormData) {
  const highlights = String(formData.get('highlights') ?? '')
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean)

  const technologies = String(formData.get('technologies') ?? '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

  const optional = (key: string) => {
    const value = String(formData.get(key) ?? '').trim()
    return value || null
  }

  return {
    company: String(formData.get('company')),
    role: String(formData.get('role')),
    period: String(formData.get('period')),
    duration: optional('duration'),
    product: optional('product'),
    description: optional('description'),
    highlights,
    technologies,
    order: Number(formData.get('order') ?? 0),
  }
}

function revalidateExperiencePaths() {
  revalidatePath('/admin/experience')
  revalidatePath('/')
}

export async function createExperience(formData: FormData) {
  await requireSession()

  await db.insert(experiences).values(parseExperienceForm(formData))

  revalidateExperiencePaths()
  redirect('/admin/experience')
}

export async function updateExperience(id: number, formData: FormData) {
  await requireSession()

  await db
    .update(experiences)
    .set(parseExperienceForm(formData))
    .where(eq(experiences.id, id))

  revalidateExperiencePaths()
  redirect('/admin/experience')
}

export async function deleteExperience(id: number) {
  await requireSession()

  await db.delete(experiences).where(eq(experiences.id, id))

  revalidateExperiencePaths()
}
