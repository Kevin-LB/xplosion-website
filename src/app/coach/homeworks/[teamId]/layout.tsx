import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export default async function TeamHomeworksLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ teamId: string }>
}) {
  const { teamId } = await params
  const session = await auth()
  if (!session) redirect('/login')

  const team = await prisma.team.findUnique({ where: { id: teamId }, include: { coaches: true } })
  if (!team) notFound()

  const isAllowed = session.user.role === 'ADMIN' || team.coaches.some((c) => c.id === session.user.id)
  if (!isAllowed) notFound()

  const tabs = [
    { label: 'Vue globale', href: `/coach/homeworks/${teamId}/global` },
    { label: 'Par mois', href: `/coach/homeworks/${teamId}/mois` },
    { label: 'Par semaine', href: `/coach/homeworks/${teamId}/semaine` },
    { label: 'Enregistrer', href: `/coach/homeworks/${teamId}/enregistrer` },
  ]

  return (
    <div>
      <Link href="/coach/homeworks" className="text-xs text-muted underline underline-offset-2 mb-4 inline-block">
        ← Toutes les équipes
      </Link>
      <h1 className="text-2xl font-bold text-ink mb-6">{team.name} — Homeworks</h1>
      <div className="flex flex-wrap gap-2 mb-8">
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className="text-xs font-medium uppercase tracking-wider px-3 py-2 border border-border text-muted hover:border-ink hover:text-ink transition-colors"
          >
            {tab.label}
          </Link>
        ))}
      </div>
      {children}
    </div>
  )
}
