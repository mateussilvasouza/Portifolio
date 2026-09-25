'use client'

import { cn } from '@/lib/utils'

export interface ProjectTab {
  id: string
  label: string
  count: number
}

export function ProjectTabs({
  tabs,
  value,
  onChange,
}: {
  tabs: ProjectTab[]
  value: string
  onChange: (id: string) => void
}) {
  return (
    <div
      role="tablist"
      aria-label="Filtrar projetos"
      className="inline-flex gap-1 rounded-md border border-border bg-card p-1"
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={value === tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            'inline-flex items-center gap-2 rounded-[10px] px-4 py-2.5 text-sm font-medium text-muted-foreground',
            value === tab.id && 'bg-foreground text-background'
          )}
        >
          {tab.label}
          <span className="font-mono text-[11px] opacity-80">
            {tab.count}
          </span>
        </button>
      ))}
    </div>
  )
}
