import { redirect } from 'next/navigation'

export default async function TeamHomeworksIndex({ params }: { params: Promise<{ teamId: string }> }) {
  const { teamId } = await params
  redirect(`/coach/homeworks/${teamId}/enregistrer`)
}
