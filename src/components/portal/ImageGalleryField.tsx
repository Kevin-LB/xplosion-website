'use client'

import { useRef, useState } from 'react'

type NewImage = { file: File; url: string }

export function ImageGalleryField({
  name,
  label,
  initialUrls,
}: {
  name: string
  label: string
  initialUrls: string[]
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [kept, setKept] = useState<string[]>(initialUrls)
  const [newImages, setNewImages] = useState<NewImage[]>([])
  const [dragOver, setDragOver] = useState(false)

  function syncInput(images: NewImage[]) {
    if (!inputRef.current) return
    const dt = new DataTransfer()
    images.forEach(({ file }) => dt.items.add(file))
    inputRef.current.files = dt.files
  }

  function addFiles(files: FileList | null) {
    if (!files || files.length === 0) return
    const added = Array.from(files).map((file) => ({ file, url: URL.createObjectURL(file) }))
    const updated = [...newImages, ...added]
    setNewImages(updated)
    syncInput(updated)
  }

  function removeNew(index: number) {
    const updated = newImages.filter((_, i) => i !== index)
    setNewImages(updated)
    syncInput(updated)
  }

  return (
    <div>
      <label className="block text-xs font-medium uppercase tracking-wider text-muted mb-1.5">{label}</label>

      {(kept.length > 0 || newImages.length > 0) && (
        <div className="flex flex-wrap gap-3 mb-3">
          {kept.map((url) => (
            <div key={url} className="relative" style={{ width: '80px', height: '80px' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <button
                type="button"
                onClick={() => setKept((k) => k.filter((u) => u !== url))}
                className="absolute -top-2 -right-2 w-5 h-5 bg-fire text-white text-xs flex items-center justify-center rounded-full"
                aria-label="Retirer cette photo"
              >
                ✕
              </button>
            </div>
          ))}
          {newImages.map((img, i) => (
            <div key={img.url} className="relative" style={{ width: '80px', height: '80px' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <button
                type="button"
                onClick={() => removeNew(i)}
                className="absolute -top-2 -right-2 w-5 h-5 bg-fire text-white text-xs flex items-center justify-center rounded-full"
                aria-label="Retirer cette photo"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

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
          addFiles(e.dataTransfer.files)
        }}
        className={`border border-dashed cursor-pointer flex items-center justify-center transition-colors ${
          dragOver ? 'border-ink bg-cream' : 'border-border bg-white'
        }`}
        style={{ height: '72px' }}
      >
        <span className="text-xs text-muted">Glisse des photos ici ou clique pour en ajouter</span>
      </div>
      <input ref={inputRef} type="file" name={name} accept="image/*" multiple className="hidden" onChange={(e) => addFiles(e.target.files)} />
      {kept.map((url) => (
        <input key={url} type="hidden" name={`${name}Kept`} value={url} />
      ))}
    </div>
  )
}
