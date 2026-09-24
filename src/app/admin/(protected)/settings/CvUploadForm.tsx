'use client'

import { useState } from 'react'
import { upload } from '@vercel/blob/client'
import { updateCvUrl } from './actions'

export function CvUploadForm({ currentUrl }: { currentUrl?: string }) {
  const [url, setUrl] = useState(currentUrl)
  const [uploading, setUploading] = useState(false)

  async function handleUpload(file: File) {
    setUploading(true)
    try {
      const blob = await upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/blob/upload',
      })
      await updateCvUrl(blob.downloadUrl)
      setUrl(blob.downloadUrl)
    } catch (error) {
      alert(
        error instanceof Error
          ? `Falha no upload: ${error.message}`
          : 'Falha no upload.',
      )
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="rounded-lg border p-5">
      <h2 className="text-sm font-medium">Currículo (PDF)</h2>
      <p className="mt-1 text-xs text-muted-foreground">
        Arquivo usado pelo botão &quot;Download CV&quot; na navbar do site.
      </p>

      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-xs text-accent"
        >
          Ver currículo atual ↗
        </a>
      ) : (
        <p className="mt-3 text-xs text-muted-foreground">
          Nenhum currículo enviado ainda — o botão usa o arquivo padrão do
          site.
        </p>
      )}

      <div className="mt-4 flex items-center gap-3">
        <input
          type="file"
          accept="application/pdf"
          disabled={uploading}
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleUpload(file)
            e.target.value = ''
          }}
          className="text-xs text-muted-foreground file:mr-3 file:rounded-md file:border file:bg-white/2.5 file:px-3 file:py-1.5 file:text-xs file:text-foreground"
        />
        {uploading && (
          <span className="text-xs text-accent">Enviando...</span>
        )}
      </div>
    </div>
  )
}
