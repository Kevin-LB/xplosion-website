import type { Session } from 'next-auth'
import { prisma } from '@/lib/prisma'

export function getAccessibleTeams(session: Session) {
  return prisma.team.findMany({
    where: session.user.role === 'ADMIN' ? {} : { coaches: { some: { id: session.user.id } } },
    orderBy: { name: 'asc' },
  })
}

export async function assertCanAccessTeam(teamId: string, session: Session) {
  if (session.user.role === 'ADMIN') return
  const team = await prisma.team.findUnique({ where: { id: teamId }, include: { coaches: true } })
  if (!team || !team.coaches.some((c) => c.id === session.user.id)) {
    throw new Error('Non autorisé')
  }
}
