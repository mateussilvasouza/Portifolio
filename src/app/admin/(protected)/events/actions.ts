'use server'

import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { db } from '@/db'
import { events } from '@/db/schema'
import { requireSession } from '@/lib/session'

function parseEventForm(formData: FormData) {
  let photos: string[] = []
  try {
    photos = JSON.parse(String(formData.get('photos') ?? '[]'))
  } catch {
    photos = []
  }

  const optional = (key: string) => {
    const value = String(formData.get(key) ?? '').trim()
    return value || null
  }

  return {
    date: new Date(String(formData.get('date'))),
    kind: optional('kind'),
    role: optional('role'),
    title: String(formData.get('title')),
    description: optional('description'),
    place: String(formData.get('place')),
    photos,
  }
}

function revalidateEventPaths() {
  revalidatePath('/admin/events')
  revalidatePath('/')
}

export async function createEvent(formData: FormData) {
  await requireSession()

  await db.insert(events).values(parseEventForm(formData))

  revalidateEventPaths()
  redirect('/admin/events')
}

export async function updateEvent(id: number, formData: FormData) {
  await requireSession()

  await db.update(events).set(parseEventForm(formData)).where(eq(events.id, id))

  revalidateEventPaths()
  redirect('/admin/events')
}

export async function deleteEvent(id: number) {
  await requireSession()

  await db.delete(events).where(eq(events.id, id))

  revalidateEventPaths()
}
