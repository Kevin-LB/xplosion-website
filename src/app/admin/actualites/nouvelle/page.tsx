import Link from 'next/link'
import { NewsForm } from '../NewsForm'
import { createNews } from '../actions'

export default function NewNewsPage() {
  return (
    <div>
      <Link href="/admin/actualites" className="text-xs text-muted underline underline-offset-2 mb-4 inline-block">
        ← Retour
      </Link>
      <h1 className="text-2xl font-bold text-ink mb-8">Nouvelle actualité</h1>
      <NewsForm action={createNews} />
    </div>
  )
}
