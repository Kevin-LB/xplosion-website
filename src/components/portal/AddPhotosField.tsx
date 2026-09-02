'use client'

import { useRef, useState } from 'react'

export function AddPhotosField({ name }: { name: string }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [previews, setPreviews] = useState<string[]>([])
  const [dragOver, setDragOver] = useState(false)

  function addFiles(files: FileList | null) {
    if (!files || files.length === 0) return

    const dt = new DataTransfer()
    if (inputRef.current?.files) {
      Array.from(inputRef.current.files).forEach((f) => dt.items.add(f))
    }
    Array.from(files).forEach((f) => dt.items.add(f))
    if (inputRef.current) inputRef.current.files = dt.files

    setPreviews((prev) => [...prev, ...Array.from(files).map((f) => URL.createObjectURL(f))])
  }

  return (
    <div>
      {previews.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {previews.map((url, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={i} src={url} alt="" style={{ width: '64px', height: '64px', objectFit: 'cover' }} />
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
          dragOver ? 'border-fire bg-cream' : 'border-border bg-cream-2'
        }`}
        style={{ height: '90px' }}
      >
        <span className="text-xs text-muted">Glisse des photos ici ou clique pour en ajouter</span>
      </div>
      <input ref={inputRef} type="file" name={name} accept="image/*" multiple className="hidden" onChange={(e) => addFiles(e.target.files)} />
    </div>
  )
}
