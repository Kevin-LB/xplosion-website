import { prisma } from '@/lib/prisma'
import { deleteNewsAsCoach } from '@/app/admin/actualites/actions'
import { NewsSearchSections } from '@/app/admin/actualites/NewsSearchSections'

export const dynamic = 'force-dynamic'

export default async function CoachNewsPage() {
  const news = await prisma.news.findMany({
    orderBy: { createdAt: 'desc' },
    include: { author: true },
  })

  const now = Date.now()
  const toRow = (a: (typeof news)[number]) => {
    const isScheduled = a.published && a.publishedAt && a.publishedAt.getTime() > now
    return {
      id: a.id,
      title: a.title,
      authorName: a.author.name,
      scheduledLabel:
        isScheduled && a.publishedAt
          ? `le ${a.publishedAt.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })} à ${a.publishedAt.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`
          : null,
    }
  }

  // Un coach voit les brouillons/programmées de tous les coachs, mais pas
  // ceux des admins — seules leurs actualités publiées sont visibles.
  const visibleToCoach = (a: (typeof news)[number]) => a.author.role !== 'ADMIN'

  const drafts = news.filter((a) => !a.published && visibleToCoach(a)).map(toRow)
  const scheduled = news
    .filter((a) => a.published && a.publishedAt && a.publishedAt.getTime() > now && visibleToCoach(a))
    .map(toRow)
  const published = news.filter((a) => a.published && (!a.publishedAt || a.publishedAt.getTime() <= now)).map(toRow)

  return (
    <div className="max-w-[1600px]">
      <NewsSearchSections
        drafts={drafts}
        scheduled={scheduled}
        published={published}
        deleteAction={deleteNewsAsCoach}
        basePath="/coach/actualites"
      />
    </div>
  )
}
