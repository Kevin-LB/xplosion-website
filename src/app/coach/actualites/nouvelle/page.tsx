import { NewsForm } from '@/app/admin/actualites/NewsForm'
import { createNewsAsCoach } from '@/app/admin/actualites/actions'

export default function NewCoachNewsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-ink mb-8">Nouvelle actualité</h1>
      <NewsForm action={createNewsAsCoach} submitLabel="Créer" />
    </div>
  )
}
