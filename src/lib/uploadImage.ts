import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

// Enregistre un fichier uploadé dans public/images/<folder>/ et renvoie
// le chemin public (ex: /images/equipes/intensity/169...-a1b2c3.jpg).
export async function saveUploadedImage(file: File, folder: string): Promise<string> {
  const bytes = Buffer.from(await file.arrayBuffer())
  const ext = (path.extname(file.name) || '.jpg').toLowerCase()
  const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`
  const dir = path.join(process.cwd(), 'public', 'images', folder)

  await mkdir(dir, { recursive: true })
  await writeFile(path.join(dir, safeName), bytes)

  return `/images/${folder}/${safeName}`
}

export function isRealFile(value: FormDataEntryValue | null): value is File {
  return value instanceof File && value.size > 0
}
