import type { ReactNode } from 'react'

interface SectionHeadingProps {
  kicker: string
  title: string
  description?: ReactNode
}

/** Cabeçalho de seção: eyebrow + título à esquerda, descrição à direita no desktop. */
export function SectionHeading({ kicker, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-12 grid grid-cols-1 items-end gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-8">
      <div>
        <div className="font-mono text-xs tracking-[0.12em] text-accent uppercase">
          {kicker}
        </div>
        <h2 className="mt-3 font-display text-[40px] leading-none font-bold tracking-[-0.03em] lg:text-[56px]">
          {title}
        </h2>
      </div>
      {description && <p className="text-muted-foreground">{description}</p>}
    </div>
  )
}
