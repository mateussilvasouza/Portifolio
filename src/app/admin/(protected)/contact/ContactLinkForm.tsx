'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export interface ContactLinkFormValues {
  label: string
  handle: string
  href: string
  order: number
}

const emptyValues: ContactLinkFormValues = {
  label: '',
  handle: '',
  href: '',
  order: 0,
}

const inputClass =
  'mt-1 w-full rounded-lg border bg-white/2.5 px-3.5 py-2.5 text-sm outline-none focus:border-primary/50'
const labelClass = 'text-xs text-muted-foreground'

export function ContactLinkForm({
  action,
  initialValues,
}: {
  action: (formData: FormData) => void
  initialValues?: ContactLinkFormValues
}) {
  const values = initialValues ?? emptyValues

  const [label, setLabel] = useState(values.label)
  const [handle, setHandle] = useState(values.handle)
  const [href, setHref] = useState(values.href)
  const [order, setOrder] = useState(values.order)

  return (
    <form action={action} className="grid max-w-md gap-4">
      <div>
        <label className={labelClass}>Rótulo (ex: LinkedIn, Email)</label>
        <input
          name="label"
          required
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>
          Texto exibido (ex: /in/mateussilvasouza)
        </label>
        <input
          name="handle"
          required
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>
          URL (use mailto: para e-mail)
        </label>
        <input
          name="href"
          required
          value={href}
          onChange={(e) => setHref(e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Ordem de exibição</label>
        <input
          type="number"
          name="order"
          value={order}
          onChange={(e) => setOrder(Number(e.target.value))}
          className={inputClass}
        />
      </div>

      <Button type="submit" variant="primary" className="mt-2">
        Salvar
      </Button>
    </form>
  )
}
