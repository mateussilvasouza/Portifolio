import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

export function Container({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn('mx-auto w-[min(1160px,calc(100%-42px))]', className)}
      {...props}
    />
  )
}
