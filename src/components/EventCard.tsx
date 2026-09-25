import { MapPin } from 'lucide-react'
import { Tag } from '@/components/ui/tag'
import { cn } from '@/lib/utils'

export interface EventCardProps {
  day: string
  month: string
  kind?: string | null
  role?: string | null
  title: string
  description?: string | null
  place: string
  photos: string[]
}

export function EventCard({
  day,
  month,
  kind,
  role,
  title,
  description,
  place,
  photos,
}: EventCardProps) {
  const visiblePhotos = photos.slice(0, 4)
  const extra = photos.length - visiblePhotos.length

  return (
    <article className="grid grid-cols-[96px_1fr] gap-6 rounded-lg border border-border bg-card p-6 transition-all duration-200 ease-[cubic-bezier(.2,.8,.2,1)] hover:-translate-y-1 hover:shadow-lift">
      <div className="h-fit rounded-md bg-coral-soft py-3.5 text-center text-coral">
        <b className="block font-display text-4xl font-bold tracking-[-0.03em]">
          {day}
        </b>
        <span className="mt-1.5 block font-mono text-xs tracking-[0.12em] uppercase">
          {month}
        </span>
      </div>

      <div>
        <div className="flex flex-wrap gap-2">
          {kind && <Tag tone="event">{kind}</Tag>}
          {role && <Tag tone="neutral">{role}</Tag>}
        </div>

        <h3 className="mt-2 mb-1.5 font-display text-[22px] leading-[1.2] font-semibold tracking-[-0.015em]">
          {title}
        </h3>

        {description && (
          <p className="mb-4 text-[15px] text-muted-foreground">
            {description}
          </p>
        )}

        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-3.5" />
          {place}
        </div>

        {photos.length > 0 && (
          <div className="mt-4 flex gap-1.5">
            {visiblePhotos.map((src, index) => (
              <div
                key={src + index}
                className={cn(
                  'h-12 w-16 rounded-[8px] bg-background-2 bg-[repeating-linear-gradient(135deg,transparent_0_10px,var(--border)_10px_11px)] bg-cover bg-center'
                )}
                style={src ? { backgroundImage: `url(${src})` } : undefined}
              />
            ))}
            {extra > 0 && (
              <div className="grid h-12 w-16 place-items-center rounded-[8px] bg-background-2 font-mono text-xs text-muted-foreground">
                +{extra}
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  )
}
