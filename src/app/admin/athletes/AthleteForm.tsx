import type { Athlete } from '@prisma/client'
import { TagPicker } from '@/components/portal/TagPicker'

const inputClass = 'w-full border border-border px-3 py-2 text-sm focus:outline-none focus:border-ink'
const labelClass = 'block text-xs font-medium uppercase tracking-wider text-muted mb-1.5'

function toDateInputValue(date: Date | null | undefined): string {
  if (!date) return ''
  return date.toISOString().slice(0, 10)
}

export function AthleteForm({
  action,
  defaultValues,
  teamOptions,
  initialTeamIds,
  submitLabel,
  deleteSlot,
}: {
  action: (formData: FormData) => void | Promise<void>
  defaultValues?: Partial<Athlete>
  teamOptions: { id: string; label: string }[]
  initialTeamIds: string[]
  submitLabel: string
  deleteSlot?: React.ReactNode
}) {
  const formId = 'athlete-form'

  return (
    <div>
      <form id={formId} action={action} className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className={labelClass} htmlFor="firstName">Prénom</label>
            <input id="firstName" name="firstName" defaultValue={defaultValues?.firstName} required className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="lastName">Nom</label>
            <input id="lastName" name="lastName" defaultValue={defaultValues?.lastName} required className={inputClass} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className={labelClass} htmlFor="position">Rôle (optionnel)</label>
            <input id="position" name="position" defaultValue={defaultValues?.position ?? ''} placeholder="Flyer, Base…" className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="birthDate">Date de naissance (optionnel)</label>
            <input
              id="birthDate"
              name="birthDate"
              type="date"
              defaultValue={toDateInputValue(defaultValues?.birthDate)}
              className={inputClass}
            />
          </div>
        </div>
        <div>
          <label className={labelClass}>Équipes</label>
          <TagPicker name="teamIds" options={teamOptions} initialSelectedIds={initialTeamIds} placeholder="Rechercher une équipe…" />
        </div>
      </form>

      {/* Le bouton Supprimer est son propre <form> (action séparée) : on le
          sort du <form> principal et on relie "Enregistrer" via l'attribut
          `form`, HTML interdisant d'imbriquer un <form> dans un autre. */}
      <div className="flex items-center gap-4 mt-5">
        <button
          type="submit"
          form={formId}
          className="bg-ink text-white text-sm font-medium px-6 py-2.5 hover:bg-fire transition-colors"
        >
          {submitLabel}
        </button>
        {deleteSlot}
      </div>
    </div>
  )
}
