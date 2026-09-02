import { prisma } from '@/lib/prisma'

const authorInclude = { author: { include: { coachedTeams: { select: { name: true } } } } } as const

export function getPublishedNews() {
  return prisma.news.findMany({
    where: { published: true, publishedAt: { lte: new Date() } },
    orderBy: { publishedAt: 'desc' },
    include: authorInclude,
  })
}

export function getPublishedNewsBySlug(slug: string) {
  return prisma.news.findFirst({
    where: { slug, published: true, publishedAt: { lte: new Date() } },
    include: authorInclude,
  })
}
