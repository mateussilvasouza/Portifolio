import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/motion/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { PhotoGallery, type GalleryPhoto } from '@/components/PhotoGallery'
import { getAllEvents } from '@/db/queries'

const monthNames = [
  'jan',
  'fev',
  'mar',
  'abr',
  'mai',
  'jun',
  'jul',
  'ago',
  'set',
  'out',
  'nov',
  'dez',
]

const sizePattern: (GalleryPhoto['size'] | undefined)[] = [
  'big',
  undefined,
  'tall',
  undefined,
  'wide',
  undefined,
]

export async function Photos() {
  const events = await getAllEvents()

  const photos: GalleryPhoto[] = events.flatMap((event) => {
    const date = new Date(event.date)
    const eventLabel = `${event.kind ?? 'Evento'} · ${monthNames[date.getMonth()]} ${date.getFullYear()}`

    return event.photos.map((src) => ({
      src,
      caption: event.title,
      event: eventLabel,
    }))
  })

  if (photos.length === 0) return null

  const sized = photos.slice(0, 12).map((photo, index) => ({
    ...photo,
    size: sizePattern[index % sizePattern.length],
  }))

  return (
    <section id="fotos" className="py-[70px] sm:py-[105px]">
      <Container>
        <Reveal>
          <SectionHeading kicker="07 / fotos" title="Por trás da tela." />

          <PhotoGallery photos={sized} />
        </Reveal>
      </Container>
    </section>
  )
}
