import Link from 'next/link'
import { notFound } from 'next/navigation'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { NewsForm } from '@/app/admin/actualites/NewsForm'
import { updateNewsAsCoach, deleteNewsAsCoach } from '@/app/admin/actualites/actions'
import { ConfirmButton } from '@/components/portal/ConfirmButton'

export const dynamic = 'force-dynamic'

export default async function EditCoachNewsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await auth()

  const article = await prisma.news.findUnique({ where: { id }, include: { author: { select: { role: true } } } })
  if (!article) notFound()
  // Un coach ne peut pas voir/éditer les brouillons ou actualités
  // programmées d'un admin — même en accédant directement par l'URL.
  if (session?.user.role !== 'ADMIN' && article.author.role === 'ADMIN' && !article.published) notFound()

  return (
    <div>
      <Link href="/coach/actualites" className="text-xs text-muted underline underline-offset-2 mb-4 inline-block">
        ← Retour
      </Link>
      <h1 className="text-2xl font-bold text-ink mb-8">{article.title}</h1>
      <NewsForm
        action={updateNewsAsCoach.bind(null, article.id)}
        defaultValues={article}
        deleteSlot={
          <form
            action={async () => {
              'use server'
              await deleteNewsAsCoach(article.id)
            }}
          >
            <ConfirmButton
              confirmMessage={`Supprimer l'actualité "${article.title}" ?`}
              className="text-fire text-sm font-medium px-5 py-2.5 border border-fire hover:bg-fire hover:text-white transition-colors"
            >
              Supprimer
            </ConfirmButton>
          </form>
        }
      />
    </div>
  )
}
