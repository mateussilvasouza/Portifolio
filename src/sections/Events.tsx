import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/motion/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { EventCard } from '@/components/EventCard'
import { getAllEvents } from '@/db/queries'

const monthNames = [
  'Jan',
  'Fev',
  'Mar',
  'Abr',
  'Mai',
  'Jun',
  'Jul',
  'Ago',
  'Set',
  'Out',
  'Nov',
  'Dez',
]

export async function Events() {
  const events = await getAllEvents()

  if (events.length === 0) return null

  return (
    <section id="eventos" className="py-[70px] sm:py-[105px]">
      <Container>
        <Reveal>
          <SectionHeading
            kicker="06 / eventos"
            title="Onde estive."
            description="Meetups, conferências e hackathons que participei — e o que levei de cada um."
          />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {events.map((event) => {
              const date = new Date(event.date)
              return (
                <EventCard
                  key={event.id}
                  day={String(date.getDate()).padStart(2, '0')}
                  month={`${monthNames[date.getMonth()]} ${date.getFullYear()}`}
                  kind={event.kind}
                  role={event.role}
                  title={event.title}
                  description={event.description}
                  place={event.place}
                  photos={event.photos}
                />
              )
            })}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
