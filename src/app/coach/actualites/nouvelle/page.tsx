import Link from 'next/link'
import { NewsForm } from '@/app/admin/actualites/NewsForm'
import { createNewsAsCoach } from '@/app/admin/actualites/actions'

export default function NewCoachNewsPage() {
  return (
    <div>
      <Link href="/coach/actualites" className="text-xs text-muted underline underline-offset-2 mb-4 inline-block">
        ← Retour
      </Link>
      <h1 className="text-2xl font-bold text-ink mb-8">Nouvelle actualité</h1>
      <NewsForm action={createNewsAsCoach} />
    </div>
  )
}
