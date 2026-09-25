import Link from 'next/link'
import { getAllEvents } from '@/db/queries'
import { Button } from '@/components/ui/button'
import { deleteEvent } from './actions'

export const dynamic = 'force-dynamic'

export default async function AdminEventsPage() {
  const allEvents = await getAllEvents()

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl tracking-[-0.03em]">Eventos</h1>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/events/new">Novo evento</Link>
        </Button>
      </div>

      <div className="mt-6 divide-y rounded-[14px] border">
        {allEvents.map((event) => (
          <div
            key={event.id}
            className="flex items-center justify-between gap-4 p-4"
          >
            <div className="min-w-0">
              <span className="truncate font-medium">{event.title}</span>
              <p className="truncate text-xs text-muted-foreground">
                {new Date(event.date).toLocaleDateString('pt-BR')} ·{' '}
                {event.place}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/admin/events/${event.id}/edit`}>Editar</Link>
              </Button>
              <form action={deleteEvent.bind(null, event.id)}>
                <Button variant="ghost" size="sm" type="submit">
                  Apagar
                </Button>
              </form>
            </div>
          </div>
        ))}

        {allEvents.length === 0 && (
          <p className="p-4 text-sm text-muted-foreground">
            Nenhum evento ainda.
          </p>
        )}
      </div>
    </div>
  )
}
