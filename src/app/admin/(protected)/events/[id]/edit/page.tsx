import { notFound } from 'next/navigation'
import { getEventById } from '@/db/queries'
import { EventForm } from '../../EventForm'
import { updateEvent } from '../../actions'

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const event = await getEventById(Number(id))

  if (!event) notFound()

  return (
    <div>
      <h1 className="mb-6 text-2xl tracking-[-0.03em]">Editar evento</h1>
      <EventForm
        action={updateEvent.bind(null, event.id)}
        initialValues={{
          date: event.date.toISOString().slice(0, 10),
          kind: event.kind ?? '',
          role: event.role ?? '',
          title: event.title,
          description: event.description ?? '',
          place: event.place,
          photos: event.photos,
        }}
      />
    </div>
  )
}
