import { EventForm } from '../EventForm'
import { createEvent } from '../actions'

export default function NewEventPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl tracking-[-0.03em]">Novo evento</h1>
      <EventForm action={createEvent} />
    </div>
  )
}
