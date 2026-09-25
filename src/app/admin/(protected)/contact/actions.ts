'use server'

import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { db } from '@/db'
import { contactLinks } from '@/db/schema'
import { requireSession } from '@/lib/session'

function parseContactLinkForm(formData: FormData) {
  return {
    label: String(formData.get('label')),
    handle: String(formData.get('handle')),
    href: String(formData.get('href')),
    order: Number(formData.get('order') ?? 0),
  }
}

function revalidateContactPaths() {
  revalidatePath('/admin/contact')
  revalidatePath('/')
}

export async function createContactLink(formData: FormData) {
  await requireSession()

  await db.insert(contactLinks).values(parseContactLinkForm(formData))

  revalidateContactPaths()
  redirect('/admin/contact')
}

export async function updateContactLink(id: number, formData: FormData) {
  await requireSession()

  await db
    .update(contactLinks)
    .set(parseContactLinkForm(formData))
    .where(eq(contactLinks.id, id))

  revalidateContactPaths()
  redirect('/admin/contact')
}

export async function deleteContactLink(id: number) {
  await requireSession()

  await db.delete(contactLinks).where(eq(contactLinks.id, id))

  revalidateContactPaths()
}
