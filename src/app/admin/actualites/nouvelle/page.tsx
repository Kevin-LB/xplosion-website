import { NewsForm } from '../NewsForm'
import { createNews } from '../actions'

export default function NewNewsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-ink mb-8">Nouvelle actualité</h1>
      <NewsForm action={createNews} submitLabel="Créer" />
    </div>
  )
}
