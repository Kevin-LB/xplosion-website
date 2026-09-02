import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { NewsForm } from '../NewsForm'
import { updateNews } from '../actions'

export const dynamic = 'force-dynamic'

export default async function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const article = await prisma.news.findUnique({ where: { id } })
  if (!article) notFound()

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink mb-8">{article.title}</h1>
      <NewsForm action={updateNews.bind(null, article.id)} defaultValues={article} submitLabel="Enregistrer" />
    </div>
  )
}
