import type { Team as PrismaTeam } from '@prisma/client'
import { ImageDropField } from '@/components/portal/ImageDropField'
import { ImageGalleryField } from '@/components/portal/ImageGalleryField'

const inputClass = 'w-full border border-border px-3 py-2 text-sm focus:outline-none focus:border-ink'
const labelClass = 'block text-xs font-medium uppercase tracking-wider text-muted mb-1.5'

export function TeamForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: (formData: FormData) => void | Promise<void>
  defaultValues?: Partial<PrismaTeam>
  submitLabel: string
}) {
  return (
    <form action={action} className="max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className={labelClass} htmlFor="name">Nom</label>
              <input id="name" name="name" defaultValue={defaultValues?.name} required className={inputClass} />
            </div>
            <div>
              <label className={labelClass} htmlFor="status">Statut</label>
              <select id="status" name="status" defaultValue={defaultValues?.status ?? 'ACTIVE'} className={inputClass}>
                <option value="ACTIVE">Compétition</option>
                <option value="GS">Group / Partner Stunt</option>
                <option value="LOISIRS">Loisirs</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className={labelClass} htmlFor="level">Niveau</label>
              <input id="level" name="level" defaultValue={defaultValues?.level} required className={inputClass} placeholder="Seniors · Coed · Niveau 4" />
            </div>
            <div>
              <label className={labelClass} htmlFor="category">Catégorie</label>
              <input id="category" name="category" defaultValue={defaultValues?.category} required className={inputClass} placeholder="Seniors Coed LVL 4" />
            </div>
          </div>
          <div>
            <label className={labelClass} htmlFor="description">Description courte</label>
            <textarea id="description" name="description" defaultValue={defaultValues?.description} required rows={2} className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="longDescription">Description longue</label>
            <textarea id="longDescription" name="longDescription" defaultValue={defaultValues?.longDescription ?? ''} rows={6} className={inputClass} />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className={labelClass} htmlFor="badge">Badge (optionnel)</label>
              <input id="badge" name="badge" defaultValue={defaultValues?.badge ?? ''} className={inputClass} placeholder="Summit Orlando" />
            </div>
            <div>
              <label className={labelClass} htmlFor="trainingDays">Jours d&apos;entraînement</label>
              <input id="trainingDays" name="trainingDays" defaultValue={defaultValues?.trainingDays?.join(', ') ?? ''} className={inputClass} placeholder="Lundi, Mercredi, Vendredi" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <ImageDropField name="photo" label="Photo principale" initialUrl={defaultValues?.photo} />
          <ImageGalleryField name="gallery" label="Galerie photo" initialUrls={defaultValues?.gallery ?? []} />
        </div>
      </div>

      <button type="submit" className="mt-8 bg-ink text-white text-sm font-medium px-6 py-2.5 hover:bg-fire transition-colors">
        {submitLabel}
      </button>
    </form>
  )
}
