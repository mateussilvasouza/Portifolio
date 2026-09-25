'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export interface ExperienceFormValues {
  company: string
  role: string
  period: string
  duration: string
  product: string
  description: string
  highlights: string[]
  technologies: string[]
  order: number
}

const emptyValues: ExperienceFormValues = {
  company: '',
  role: '',
  period: '',
  duration: '',
  product: '',
  description: '',
  highlights: [],
  technologies: [],
  order: 0,
}

const inputClass =
  'mt-1 w-full rounded-lg border bg-white/2.5 px-3.5 py-2.5 text-sm outline-none focus:border-primary/50'
const labelClass = 'text-xs text-muted-foreground'

export function ExperienceForm({
  action,
  initialValues,
}: {
  action: (formData: FormData) => void
  initialValues?: ExperienceFormValues
}) {
  const values = initialValues ?? emptyValues

  const [company, setCompany] = useState(values.company)
  const [role, setRole] = useState(values.role)
  const [period, setPeriod] = useState(values.period)
  const [duration, setDuration] = useState(values.duration)
  const [product, setProduct] = useState(values.product)
  const [description, setDescription] = useState(values.description)
  const [highlightsText, setHighlightsText] = useState(
    values.highlights.join('\n')
  )
  const [technologiesText, setTechnologiesText] = useState(
    values.technologies.join(', ')
  )
  const [order, setOrder] = useState(values.order)

  return (
    <form action={action} className="grid max-w-xl gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Empresa</label>
          <input
            name="company"
            required
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Cargo</label>
          <input
            name="role"
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className={labelClass}>Período (ex: 04/2022 — 05/2025)</label>
          <input
            name="period"
            required
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Duração (ex: 3 anos)</label>
          <input
            name="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
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
      </div>

      <div>
        <label className={labelClass}>Produto (ex: plataforma de logística)</label>
        <input
          name="product"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Descrição</label>
        <textarea
          name="description"
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Destaques (um por linha)</label>
        <textarea
          name="highlights"
          rows={5}
          value={highlightsText}
          onChange={(e) => setHighlightsText(e.target.value)}
          className={inputClass + ' font-mono text-xs'}
        />
      </div>

      <div>
        <label className={labelClass}>Tecnologias (separadas por vírgula)</label>
        <input
          name="technologies"
          value={technologiesText}
          onChange={(e) => setTechnologiesText(e.target.value)}
          className={inputClass}
        />
      </div>

      <Button type="submit" variant="primary" className="mt-2">
        Salvar
      </Button>
    </form>
  )
}
