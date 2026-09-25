'use client'

import { useSyncExternalStore } from 'react'
import { Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'

function subscribe(callback: () => void) {
  window.addEventListener('theme-change', callback)
  return () => window.removeEventListener('theme-change', callback)
}

function getSnapshot() {
  return document.documentElement.classList.contains('light')
}

function getServerSnapshot() {
  return false
}

export function ThemeToggle() {
  const isLight = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  function toggle() {
    const next = !isLight
    document.documentElement.classList.toggle('light', next)
    localStorage.setItem('theme', next ? 'light' : 'dark')
    window.dispatchEvent(new Event('theme-change'))
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={!isLight}
      aria-label={isLight ? 'Ativar tema escuro' : 'Ativar tema claro'}
      onClick={toggle}
      className="relative inline-flex h-[34px] w-16 shrink-0 items-center rounded-full border border-border-strong bg-card p-[3px]"
    >
      <span
        className={cn(
          'grid size-[26px] place-items-center rounded-full bg-foreground text-background transition-transform duration-200 ease-[cubic-bezier(.2,.8,.2,1)]',
          isLight && 'translate-x-[30px]'
        )}
      >
        {isLight ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
      </span>
    </button>
  )
}
