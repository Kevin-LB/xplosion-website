import { Hero, Ticker } from '@/components/sections/Hero'
import { TeamsSection } from '@/components/sections/TeamsSection'
import {
  PalmaresSection,
  DisciplineSection,
  ValuesSection,
  CtaBand,
  PartnersSection,
} from '@/components/sections/Sections'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Ticker />
      <TeamsSection />
      <PalmaresSection />
      <DisciplineSection />
      <ValuesSection />
      <CtaBand />
      <PartnersSection />
    </>
  )
}