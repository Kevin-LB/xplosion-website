import { Hero, Ticker } from '@/components/sections/Hero'
import { TeamsSection } from '@/components/sections/TeamsSection'
import {
  PalmaresSection,
  DisciplineSection,
  ValuesSection,
  CtaBand,
  PartnersSection,
} from '@/components/sections/Sections'
import { getTeams } from '@/lib/teams'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const teams = await getTeams()

  return (
    <>
      <Hero />
      <Ticker />
      <TeamsSection teams={teams} />
      <PalmaresSection />
      <DisciplineSection />
      <ValuesSection />
      <CtaBand />
      <PartnersSection />
    </>
  )
}