import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { NewsForm } from '../NewsForm'
import { updateNews, deleteNews } from '../actions'
import { ConfirmButton } from '@/components/portal/ConfirmButton'

export const dynamic = 'force-dynamic'

export default async function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const article = await prisma.news.findUnique({ where: { id } })
  if (!article) notFound()

  return (
    <div>
      <Link href="/admin/actualites" className="text-xs text-muted underline underline-offset-2 mb-4 inline-block">
        ← Retour
      </Link>
      <h1 className="text-2xl font-bold text-ink mb-8">{article.title}</h1>
      <NewsForm
        action={updateNews.bind(null, article.id)}
        defaultValues={article}
        deleteSlot={
          <form
            action={async () => {
              'use server'
              await deleteNews(article.id)
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
