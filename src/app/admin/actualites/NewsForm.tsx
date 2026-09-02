import type { News } from '@prisma/client'
import { ImageDropField } from '@/components/portal/ImageDropField'
import { ImageGalleryField } from '@/components/portal/ImageGalleryField'

const inputClass = 'w-full border border-border px-3 py-2 text-sm focus:outline-none focus:border-ink'
const labelClass = 'block text-xs font-medium uppercase tracking-wider text-muted mb-1.5'

// Format attendu par <input type="datetime-local">: "YYYY-MM-DDTHH:mm"
function toDatetimeLocal(date: Date | null | undefined): string {
  if (!date) return ''
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}

export function NewsForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: (formData: FormData) => void | Promise<void>
  defaultValues?: Partial<News>
  submitLabel: string
}) {
  const isFuture = defaultValues?.publishedAt ? defaultValues.publishedAt.getTime() > Date.now() : false

  return (
    <form action={action} className="max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">
        <div className="flex flex-col gap-5">
          <div>
            <label className={labelClass} htmlFor="title">Titre</label>
            <input id="title" name="title" defaultValue={defaultValues?.title} required className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="excerpt">Chapô (résumé court, optionnel)</label>
            <textarea id="excerpt" name="excerpt" defaultValue={defaultValues?.excerpt ?? ''} rows={2} className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="content">Contenu</label>
            <textarea id="content" name="content" defaultValue={defaultValues?.content} required rows={12} className={inputClass} />
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <ImageDropField name="coverImage" label="Image de couverture" initialUrl={defaultValues?.coverImage} />
          <ImageGalleryField name="gallery" label="Autres photos" initialUrls={defaultValues?.gallery ?? []} />

          <div className="border border-border bg-white p-4 flex flex-col gap-3">
            <label className="flex items-center gap-2 text-sm text-ink font-medium">
              <input type="checkbox" name="published" defaultChecked={defaultValues?.published ?? false} />
              Publier
            </label>
            <div>
              <label className={labelClass} htmlFor="publishedAt">Date de publication</label>
              <input
                id="publishedAt"
                name="publishedAt"
                type="datetime-local"
                defaultValue={toDatetimeLocal(isFuture ? defaultValues?.publishedAt : null)}
                className={inputClass}
              />
              <p className="text-xs text-muted mt-1.5">
                Laisse vide pour publier immédiatement, ou choisis une date/heure future pour programmer la publication.
              </p>
            </div>
          </div>
        </div>
      </div>

      <button type="submit" className="mt-8 bg-ink text-white text-sm font-medium px-6 py-2.5 hover:bg-fire transition-colors">
        {submitLabel}
      </button>
    </form>
  )
}
