import { prisma } from '@/lib/prisma'
import type { Team as PrismaTeam, TeamStatus } from '@prisma/client'
import type { Team } from '@/lib/data'

const STATUS_MAP: Record<TeamStatus, Team['status']> = {
  ACTIVE: 'active',
  GS: 'gs',
  LOISIRS: 'loisirs',
}

function toTeam(row: PrismaTeam): Team {
  return {
    name: row.name,
    level: row.level,
    category: row.category,
    description: row.description,
    longDescription: row.longDescription ?? undefined,
    badge: row.badge ?? undefined,
    status: STATUS_MAP[row.status],
    slug: row.slug,
    photo: row.photo ?? undefined,
    gallery: row.gallery.length > 0 ? row.gallery : undefined,
    trainingDays: row.trainingDays.length > 0 ? row.trainingDays : undefined,
  }
}

export async function getTeams(): Promise<Team[]> {
  const rows = await prisma.team.findMany({ orderBy: { createdAt: 'asc' } })
  return rows.map(toTeam)
}

export async function getTeamBySlug(slug: string): Promise<Team | null> {
  const row = await prisma.team.findUnique({ where: { slug } })
  return row ? toTeam(row) : null
}
