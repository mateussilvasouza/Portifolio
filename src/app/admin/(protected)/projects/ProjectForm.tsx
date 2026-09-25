'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import type { ProjectLink, projectKind } from '@/db/schema'

export interface ProjectFormValues {
  kind: (typeof projectKind.enumValues)[number]
  title: string
  description: string
  period: string
  company: string
  role: string
  stack: string[]
  links: ProjectLink[]
  metricValue: string
  metricLabel: string
  privateNote: string
  order: number
}

const emptyValues: ProjectFormValues = {
  kind: 'study',
  title: '',
  description: '',
  period: '',
  company: '',
  role: '',
  stack: [],
  links: [],
  metricValue: '',
  metricLabel: '',
  privateNote: '',
  order: 0,
}

const inputClass =
  'mt-1 w-full rounded-lg border bg-white/2.5 px-3.5 py-2.5 text-sm outline-none focus:border-primary/50'
const labelClass = 'text-xs text-muted-foreground'

export function ProjectForm({
  action,
  initialValues,
}: {
  action: (formData: FormData) => void
  initialValues?: ProjectFormValues
}) {
  const values = initialValues ?? emptyValues

  const [kind, setKind] = useState(values.kind)
  const [title, setTitle] = useState(values.title)
  const [description, setDescription] = useState(values.description)
  const [period, setPeriod] = useState(values.period)
  const [company, setCompany] = useState(values.company)
  const [role, setRole] = useState(values.role)
  const [stackText, setStackText] = useState(values.stack.join(', '))
  const [metricValue, setMetricValue] = useState(values.metricValue)
  const [metricLabel, setMetricLabel] = useState(values.metricLabel)
  const [privateNote, setPrivateNote] = useState(values.privateNote)
  const [order, setOrder] = useState(values.order)
  const [links, setLinks] = useState<ProjectLink[]>(values.links)

  function updateLink(index: number, patch: Partial<ProjectLink>) {
    setLinks((current) =>
      current.map((link, i) => (i === index ? { ...link, ...patch } : link))
    )
  }

  return (
    <form action={action} className="grid max-w-xl gap-4">
      <input type="hidden" name="links" value={JSON.stringify(links)} />

      <div>
        <label className={labelClass}>Tipo</label>
        <select
          name="kind"
          value={kind}
          onChange={(e) => setKind(e.target.value as ProjectFormValues['kind'])}
          className={inputClass}
        >
          <option value="study">Estudo (projeto pessoal)</option>
          <option value="company">Empresa</option>
        </select>
      </div>

      <div>
        <label className={labelClass}>Título</label>
        <input
          name="title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Descrição</label>
        <textarea
          name="description"
          required
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Período (ex: 2024 ou 05/2025 — 05/2026)</label>
          <input
            name="period"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
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

      {kind === 'company' && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Empresa</label>
            <input
              name="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Cargo</label>
            <input
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      )}

      <div>
        <label className={labelClass}>Stack (separada por vírgula)</label>
        <input
          name="stack"
          value={stackText}
          onChange={(e) => setStackText(e.target.value)}
          className={inputClass}
        />
      </div>

      {kind === 'company' && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Métrica — valor (ex: −30%)</label>
            <input
              name="metricValue"
              value={metricValue}
              onChange={(e) => setMetricValue(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Métrica — legenda</label>
            <input
              name="metricLabel"
              value={metricLabel}
              onChange={(e) => setMetricLabel(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between">
          <label className={labelClass}>Links</label>
          <Button
            type="button"
            variant="ghost"
            size="xs"
            onClick={() => setLinks((l) => [...l, { label: '', href: '' }])}
          >
            Adicionar link
          </Button>
        </div>

        <div className="mt-2 grid gap-2">
          {links.map((link, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                placeholder="Rótulo (ex: Código)"
                value={link.label}
                onChange={(e) => updateLink(index, { label: e.target.value })}
                className={inputClass + ' mt-0 flex-1'}
              />
              <input
                placeholder="URL"
                value={link.href}
                onChange={(e) => updateLink(index, { href: e.target.value })}
                className={inputClass + ' mt-0 flex-[2]'}
              />
              <label className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground">
                <input
                  type="checkbox"
                  checked={link.kind === 'github'}
                  onChange={(e) =>
                    updateLink(index, {
                      kind: e.target.checked ? 'github' : undefined,
                    })
                  }
                />
                GitHub
              </label>
              <Button
                type="button"
                variant="ghost"
                size="xs"
                onClick={() =>
                  setLinks((l) => l.filter((_, i) => i !== index))
                }
              >
                Remover
              </Button>
            </div>
          ))}
          {links.length === 0 && (
            <p className="text-xs text-muted-foreground">
              Nenhum link — se for um projeto de empresa sem link, use a nota
              de código privado abaixo.
            </p>
          )}
        </div>
      </div>

      {kind === 'company' && (
        <div>
          <label className={labelClass}>
            Nota de código privado (mostrada quando não há links)
          </label>
          <input
            name="privateNote"
            value={privateNote}
            onChange={(e) => setPrivateNote(e.target.value)}
            placeholder="Código privado — produto público"
            className={inputClass}
          />
        </div>
      )}

      <Button type="submit" variant="primary" className="mt-2">
        Salvar
      </Button>
    </form>
  )
}
