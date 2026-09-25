import { cn } from '@/lib/utils'

export interface GalleryPhoto {
  src: string
  caption: string
  event: string
  size?: 'wide' | 'tall' | 'big'
}

export function PhotoGallery({ photos }: { photos: GalleryPhoto[] }) {
  return (
    <ul className="grid grid-cols-2 auto-rows-[180px] gap-4 lg:grid-cols-4">
      {photos.map((photo, index) => (
        <li
          key={photo.src + index}
          className={cn(
            'group relative m-0 overflow-hidden rounded-md',
            photo.size === 'wide' && 'col-span-2',
            photo.size === 'big' && 'col-span-2 row-span-2',
            photo.size === 'tall' && 'row-span-2'
          )}
        >
          <div
            className="size-full bg-background-2 bg-[repeating-linear-gradient(135deg,transparent_0_10px,var(--border)_10px_11px)] bg-cover bg-center transition-transform duration-[400ms] ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-105"
            style={photo.src ? { backgroundImage: `url(${photo.src})` } : undefined}
          />
          <figcaption className="absolute right-2.5 bottom-2.5 left-2.5 translate-y-1.5 rounded-[10px] bg-scrim px-3 py-2 text-[13px] leading-[1.4] text-[#eeece6] opacity-0 backdrop-blur-md transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
            <b className="block font-mono text-[11px] font-medium tracking-[0.08em] text-lime uppercase">
              {photo.event}
            </b>
            {photo.caption}
          </figcaption>
        </li>
      ))}
    </ul>
  )
}
