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
  deleteSlot,
}: {
  action: (formData: FormData) => void | Promise<void>
  defaultValues?: Partial<News>
  deleteSlot?: React.ReactNode
}) {
  const isFuture = defaultValues?.publishedAt ? defaultValues.publishedAt.getTime() > Date.now() : false
  const formId = 'news-form'

  return (
    <div className="max-w-[1600px]">
      {/* Les boutons vivent hors du <form> et s'y rattachent via l'attribut
          `form` — deleteSlot est lui-même un <form> (action de suppression
          séparée), et HTML interdit d'imbriquer un <form> dans un autre. */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <button
          type="submit"
          form={formId}
          name="intent"
          value="draft"
          className="border border-ink text-ink text-sm font-medium px-5 py-2.5 hover:bg-ink hover:text-white transition-colors"
        >
          Enregistrer en brouillon
        </button>
        <button
          type="submit"
          form={formId}
          name="intent"
          value="now"
          className="bg-ink text-white text-sm font-medium px-5 py-2.5 hover:bg-fire transition-colors"
        >
          Publier maintenant
        </button>
        <button
          type="submit"
          form={formId}
          name="intent"
          value="scheduled"
          className="bg-gold text-white text-sm font-medium px-5 py-2.5 hover:opacity-90 transition-opacity"
        >
          Programmer
        </button>
        {deleteSlot}
      </div>

      <form id={formId} action={action}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10">
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

            <div className="border border-border bg-white p-4">
              <label className={labelClass} htmlFor="publishedAt">Date de programmation</label>
              <input
                id="publishedAt"
                name="publishedAt"
                type="datetime-local"
                defaultValue={toDatetimeLocal(isFuture ? defaultValues?.publishedAt : null)}
                className={inputClass}
              />
              <p className="text-xs text-muted mt-1.5">
                Utilisée uniquement par le bouton <strong>Programmer</strong> ci-dessus — laisse vide pour publier avec la date/heure actuelle.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
