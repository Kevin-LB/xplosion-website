import Link from 'next/link'
import Image from 'next/image'
import { notFound, redirect } from 'next/navigation'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { addAthlete, removeAthlete, addTeamPhotos, attachExistingAthlete } from '../actions'
import { ConfirmButton } from '@/components/portal/ConfirmButton'
import { AddPhotosField } from '@/components/portal/AddPhotosField'
import { AthleteSearchPicker } from '@/components/portal/AthleteSearchPicker'

export const dynamic = 'force-dynamic'

export default async function CoachTeamDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await auth()
  if (!session) redirect('/login')

  const team = await prisma.team.findUnique({
    where: { id },
    include: { athletes: { orderBy: { lastName: 'asc' } }, coaches: true },
  })
  if (!team) notFound()

  const isAllowed = session.user.role === 'ADMIN' || team.coaches.some((c) => c.id === session.user.id)
  if (!isAllowed) notFound()

  const otherAthletes = await prisma.athlete.findMany({
    where: { teams: { none: { id: team.id } } },
    orderBy: { lastName: 'asc' },
  })
  const attachAction = attachExistingAthlete.bind(null, team.id)

  return (
    <div className="max-w-[1600px]">
      <div className="text-xs font-medium uppercase tracking-wider text-fire mb-1">{team.level}</div>
      <h1 className="text-2xl font-bold text-ink mb-2">{team.name}</h1>
      <p className="text-sm text-muted mb-8 max-w-2xl">{team.description}</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div>
          <h2 className="text-lg font-semibold text-ink mb-4">Photos</h2>
          {team.photo && (
            <div className="relative mb-3" style={{ height: '200px' }}>
              <Image src={team.photo} alt={team.name} fill sizes="600px" style={{ objectFit: 'cover' }} />
            </div>
          )}
          {team.gallery.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mb-4">
              {team.gallery.map((url) => (
                <div key={url} className="relative" style={{ aspectRatio: '4/3' }}>
                  <Image src={url} alt={team.name} fill sizes="200px" style={{ objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          )}
          <form
            action={async (formData: FormData) => {
              'use server'
              await addTeamPhotos(team.id, formData)
            }}
            className="flex flex-col gap-3"
          >
            <AddPhotosField name="photos" />
            <button
              type="submit"
              className="self-start bg-ink text-white text-sm font-medium px-5 py-2.5 hover:bg-fire transition-colors"
            >
              Ajouter ces photos
            </button>
          </form>
        </div>

        <div className="flex flex-col gap-8">
          <div>
            <h2 className="text-lg font-semibold text-ink mb-4">Ajouter un nouvel athlète</h2>
            <form
              action={async (formData: FormData) => {
                'use server'
                await addAthlete(team.id, formData)
              }}
              className="flex flex-wrap items-end gap-3"
            >
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-muted mb-1.5">Prénom</label>
                <input name="firstName" required className="border border-border px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-muted mb-1.5">Nom</label>
                <input name="lastName" required className="border border-border px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-muted mb-1.5">Rôle (optionnel)</label>
                <input name="position" placeholder="Flyer, Base…" className="border border-border px-3 py-2 text-sm" />
              </div>
              <button
                type="submit"
                className="border border-ink text-ink text-sm font-medium px-4 py-2 hover:bg-ink hover:text-white transition-colors"
              >
                Ajouter
              </button>
            </form>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-ink mb-4">Tous les athlètes</h2>
            <AthleteSearchPicker
              athletes={otherAthletes.map((a) => ({ id: a.id, label: `${a.firstName} ${a.lastName}` }))}
              attachAction={attachAction}
            />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-ink mb-4">Athlètes ({team.athletes.length})</h2>
          <div className="border border-border divide-y divide-border bg-white">
            {team.athletes.map((athlete) => (
              <div key={athlete.id} className="flex items-center justify-between px-4 py-3 text-sm">
                <Link href={`/coach/athletes/${athlete.id}`} className="hover:underline underline-offset-2">
                  {athlete.firstName} {athlete.lastName}
                  {athlete.position && <span className="text-muted"> — {athlete.position}</span>}
                </Link>
                <form
                  action={async () => {
                    'use server'
                    await removeAthlete(athlete.id, team.id)
                  }}
                >
                  <ConfirmButton
                    confirmMessage={`Retirer ${athlete.firstName} ${athlete.lastName} de l'équipe ?`}
                    className="text-fire text-xs"
                  >
                    Retirer
                  </ConfirmButton>
                </form>
              </div>
            ))}
            {team.athletes.length === 0 && (
              <p className="px-4 py-6 text-sm text-muted">Aucun athlète pour l&apos;instant.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
