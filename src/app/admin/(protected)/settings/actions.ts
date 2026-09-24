'use server'

import { del } from '@vercel/blob'
import { revalidatePath } from 'next/cache'
import { db } from '@/db'
import { settings } from '@/db/schema'
import { getSetting } from '@/db/queries'
import { requireSession } from '@/lib/session'

export async function updateCvUrl(url: string) {
  await requireSession()

  const previous = await getSetting('cv_url')

  await db
    .insert(settings)
    .values({ key: 'cv_url', value: url })
    .onConflictDoUpdate({
      target: settings.key,
      set: { value: url, updatedAt: new Date() },
    })

  if (previous && previous !== url) {
    await del(previous).catch((error) =>
      console.error('Failed to delete previous CV blob:', error),
    )
  }

  revalidatePath('/', 'layout')
}
