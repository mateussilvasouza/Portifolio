import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

export function Container({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn('mx-auto max-w-[1200px] px-4 lg:px-8', className)}
      {...props}
    />
  )
}
