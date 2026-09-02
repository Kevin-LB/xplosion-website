'use client'

import { useRef, useState } from 'react'

export function ImageDropField({
  name,
  label,
  initialUrl,
}: {
  name: string
  label: string
  initialUrl?: string | null
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(initialUrl ?? null)
  const [cleared, setCleared] = useState(false)
  const [dragOver, setDragOver] = useState(false)

  function handleFiles(files: FileList | null) {
    const file = files?.[0]
    if (!file) return
    if (inputRef.current) {
      const dt = new DataTransfer()
      dt.items.add(file)
      inputRef.current.files = dt.files
    }
    setPreview(URL.createObjectURL(file))
    setCleared(false)
  }

  function handleRemove(e: React.MouseEvent) {
    e.stopPropagation()
    setPreview(null)
    setCleared(true)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div>
      <label className="block text-xs font-medium uppercase tracking-wider text-muted mb-1.5">{label}</label>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragOver(false)
          handleFiles(e.dataTransfer.files)
        }}
        className={`relative border border-dashed cursor-pointer flex items-center justify-center overflow-hidden transition-colors ${
          dragOver ? 'border-fire bg-cream' : preview ? 'border-border' : 'border-border bg-cream-2'
        }`}
        style={{ height: '220px' }}
      >
        {preview ? (
          <>
            {/* Aperçu local (blob:) ou image déjà uploadée — next/image ne gère
                pas les URLs blob:, une balise <img> classique est le bon choix ici. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 w-7 h-7 bg-ink text-white text-sm flex items-center justify-center rounded-full hover:bg-fire transition-colors"
              aria-label="Retirer l'image"
            >
              ✕
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 text-center px-4">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
            <span className="text-xs text-muted">Glisse une image ici ou clique pour parcourir</span>
          </div>
        )}
      </div>
      <input ref={inputRef} type="file" name={name} accept="image/*" className="hidden" onChange={(e) => handleFiles(e.target.files)} />
      {/* Conserve l'image actuelle si aucun nouveau fichier n'est déposé, ou
          la vide si "Retirer" a été cliqué. */}
      <input type="hidden" name={`${name}Current`} value={cleared ? '' : initialUrl ?? ''} />
    </div>
  )
}
