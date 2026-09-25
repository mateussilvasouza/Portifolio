import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

const toneClasses = {
  study: 'bg-accent-soft text-accent',
  company: 'bg-sky-soft text-sky',
  event: 'bg-coral-soft text-coral',
  neutral: 'bg-background-2 text-muted-foreground',
} as const

export function Tag({
  tone = 'neutral',
  className,
  children,
}: {
  tone?: keyof typeof toneClasses
  className?: string
  children?: ReactNode
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-sm px-2.5 py-1.5 font-mono text-xs font-medium tracking-[0.06em] uppercase whitespace-nowrap',
        "before:size-1.5 before:rounded-full before:bg-current before:content-['']",
        toneClasses[tone],
        className
      )}
    >
      {children}
    </span>
  )
}
