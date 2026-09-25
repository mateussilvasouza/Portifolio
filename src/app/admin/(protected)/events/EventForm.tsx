'use client'

import { useRef, useState } from 'react'
import { upload } from '@vercel/blob/client'
import { Button } from '@/components/ui/button'

export interface EventFormValues {
  date: string
  kind: string
  role: string
  title: string
  description: string
  place: string
  photos: string[]
}

const emptyValues: EventFormValues = {
  date: new Date().toISOString().slice(0, 10),
  kind: '',
  role: '',
  title: '',
  description: '',
  place: '',
  photos: [],
}

const inputClass =
  'mt-1 w-full rounded-lg border bg-white/2.5 px-3.5 py-2.5 text-sm outline-none focus:border-primary/50'
const labelClass = 'text-xs text-muted-foreground'

export function EventForm({
  action,
  initialValues,
}: {
  action: (formData: FormData) => void
  initialValues?: EventFormValues
}) {
  const values = initialValues ?? emptyValues

  const [date, setDate] = useState(values.date)
  const [kind, setKind] = useState(values.kind)
  const [role, setRole] = useState(values.role)
  const [title, setTitle] = useState(values.title)
  const [description, setDescription] = useState(values.description)
  const [place, setPlace] = useState(values.place)
  const [photos, setPhotos] = useState<string[]>(values.photos)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function handleUpload(file: File) {
    setUploading(true)
    try {
      const blob = await upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/blob/upload',
      })
      setPhotos((p) => [...p, blob.url])
    } catch (error) {
      alert(
        error instanceof Error
          ? `Falha no upload: ${error.message}`
          : 'Falha no upload.'
      )
    } finally {
      setUploading(false)
    }
  }

  return (
    <form action={action} className="grid max-w-xl gap-4">
      <input type="hidden" name="photos" value={JSON.stringify(photos)} />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Data</label>
          <input
            type="date"
            name="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Tipo (ex: Meetup, Conferência)</label>
          <input
            name="kind"
            value={kind}
            onChange={(e) => setKind(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Papel (ex: Palestrante, Participante)</label>
        <input
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className={inputClass}
        />
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
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Local</label>
        <input
          name="place"
          required
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label className={labelClass}>Fotos</label>
          <Button
            type="button"
            variant="ghost"
            size="xs"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
          >
            {uploading ? 'Enviando...' : 'Adicionar foto'}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) handleUpload(file)
              e.target.value = ''
            }}
          />
        </div>

        <div className="mt-2 grid grid-cols-4 gap-2">
          {photos.map((url, index) => (
            <div key={url} className="group relative aspect-video overflow-hidden rounded-lg border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="size-full object-cover" />
              <button
                type="button"
                onClick={() => setPhotos((p) => p.filter((_, i) => i !== index))}
                className="absolute inset-0 flex items-center justify-center bg-black/60 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                Remover
              </button>
            </div>
          ))}
          {photos.length === 0 && (
            <p className="col-span-4 text-xs text-muted-foreground">
              Nenhuma foto ainda.
            </p>
          )}
        </div>
      </div>

      <Button type="submit" variant="primary" className="mt-2">
        Salvar
      </Button>
    </form>
  )
}
