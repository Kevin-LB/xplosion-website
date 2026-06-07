export const NAV_LINKS = [
  { label: 'Le Club', href: '/#club' },
  { label: 'Nos Équipes', href: '/equipes' },
  { label: 'Palmarès', href: '/palmares' },
  { label: 'Entraînements', href: '/entrainements' },
  { label: 'Événements', href: '/evenements' },
  { label: 'Organisation', href: '/organisation' },
  { label: 'Partenaires', href: '/partenaires' },
]

export type Team = {
  name: string
  level: string
  category: string
  description: string
  badge?: string
  status: 'active' | 'loisirs'
  slug: string
  photo?: string
}

export const TEAMS: Team[] = [
  { name: 'Intensity', level: 'Seniors · Coed · Niveau 4', category: 'Seniors Coed LVL 4', description: 'Équipe élite internationale. Grand Champion TSN 2026, bid Orlando & Summit Européen.', badge: 'Worlds', status: 'active', slug: 'intensity', photo: '/images/intensity.jpg' },
  { name: 'Audacity', level: 'Seniors · Mixte · Niveau 1', category: 'Seniors Open LVL 1', description: 'Qualifiée All Star Worlds Orlando 2026. 1ère place Open Spice Event.', badge: 'Orlando', status: 'active', slug: 'audacity', photo: '/images/audacity.png' },
  { name: 'Silver Stars', level: 'U16 · All Girl · Niveau 1', category: 'U16 LVL 1', description: 'Grand Champion TSN Juin 2026 — Niveau 1/2. Qualification Summit Européen.', status: 'active', slug: 'silver-stars', photo: '/images/silver-stars.png' },
  { name: 'Fire', level: 'U12 · All Girl · Niveau 1', category: 'U12 LVL 1', description: '1ère place Open Spice Event. Qualification Summit Européen.', status: 'active', slug: 'fire', photo: '/images/fire.jpg' },
  { name: 'Sparks', level: 'Group Stunt · Coed · Niveau 5', category: 'Senior Group Stunt Coed LVL 5', description: 'Qualifiés Worlds Mexico 2026. 1ère Open Spice Event.', badge: 'Mexico', status: 'active', slug: 'sparks', photo: '/images/sparks.jpg' },
  { name: 'Blackstarz', level: 'Group Stunt · Coed · Niveau 6/7', category: 'Senior Group Stunt Coed LVL 6/7', description: 'Niveau élite national. 1er OCC et SALC 2024/25.', status: 'active', slug: 'blackstarz' },
  { name: 'Tenacity', level: 'Seniors · Niveau 3', category: 'Seniors LVL 3', description: 'Équipe en réouverture pour la saison 2025/26. Tryouts prévus le 27 juin 2026.', badge: 'Nouveau', status: 'active', slug: 'tenacity' },
  { name: 'Fire Queens', level: 'U12 · Group Stunt · Niveau 2', category: 'U12 Group Stunt All Girl LVL 2', description: 'Équipe jeunes compétition.', status: 'active', slug: 'fire-queens' },
  { name: 'Dark Fire', level: 'U12 · Group Stunt · Niveau 2', category: 'U12 Group Stunt All Girl LVL 2', description: 'Équipe jeunes compétition.', status: 'active', slug: 'dark-fire' },
  { name: 'Starlight', level: 'U16 · Group Stunt · Niveau 2', category: 'U16 Group Stunt All Girl LVL 2', description: 'Équipe juniors Group Stunt.', status: 'active', slug: 'starlight' },
  { name: 'Cosmo', level: 'Tous âges · Loisirs', category: 'Section Loisirs', description: 'Section loisirs ouverte à tous, quel que soit le niveau. Idéale pour découvrir le cheerleading.', status: 'loisirs', slug: 'cosmo' },
]

export type Result = {
  season: string
  rank: number | null
  competition: string
  team: string
  detail?: string
  tag?: string
  highlight?: boolean
}

export const RESULTS: Result[] = [
  { season: '2025/2026', rank: 1, competition: 'TSN · 06 juin 2026', team: 'Intensity', detail: 'Grand Champion Niv. 3/4/5/6', tag: 'Bid Orlando + EU', highlight: true },
  { season: '2025/2026', rank: 1, competition: 'Open Spice Event', team: 'Audacity', detail: 'Seniors Coed Niveau 1', tag: 'Bid Worlds', highlight: true },
  { season: '2025/2026', rank: 1, competition: 'Open Spice Event', team: 'Sparks', detail: 'Group Stunt Niveau 5', tag: 'Bid Mexico', highlight: true },
  { season: '2025/2026', rank: 1, competition: 'TSN · 06 juin 2026', team: 'Silver Stars', detail: 'Grand Champion Niv. 1/2', tag: 'Summit EU' },
  { season: '2025/2026', rank: 1, competition: 'TSN · 28 février 2026', team: 'Intensity', detail: 'Qualification Summit EU' },
  { season: '2025/2026', rank: 1, competition: 'Open Spice Event', team: 'Fire', detail: 'U12 Niveau 1' },
  { season: '2025/2026', rank: 5, competition: 'Elite Cheerleading Championship', team: 'Intensity', detail: 'Score record club : 90.30', tag: 'Record' },
  { season: '2024/2025', rank: 1, competition: 'Open Cheer Centre (OCC)', team: 'Silver Stars', detail: 'Coup de cœur du jury + Summit EU', tag: 'Summit EU' },
  { season: '2024/2025', rank: 1, competition: 'Open Cheer Centre (OCC)', team: 'Fire', detail: 'Qualification Summit EU' },
  { season: '2024/2025', rank: 1, competition: 'OCC + SALC', team: 'Blackstarz', detail: 'Double victoire nationale' },
  { season: '2024/2025', rank: 1, competition: 'Summer All Level (SALC)', team: 'Gravity', detail: 'Seniors Niveau 2' },
  { season: '2024/2025', rank: 3, competition: 'Championnat de France', team: 'Gravity', detail: 'Score : 65,33' },
  { season: '2022/2023', rank: 1, competition: 'Open Cheerleading Centre (OCC)', team: 'Intensity', detail: 'Seniors Niveau 4' },
  { season: '2022/2023', rank: 1, competition: 'Championnat Fédéral — Zone Régionale', team: 'Power', detail: 'Qualifiée Finales Nationales' },
  { season: '2021/2022', rank: 1, competition: 'Open Cheerleading Centre (OCC)', team: 'Intensity', detail: 'Seniors Niveau 4' },
  { season: '2021/2022', rank: 2, competition: 'Open de Lyon (SACD)', team: 'Intensity', detail: 'Seniors Niveau 4' },
  { season: '2021/2022', rank: 11, competition: 'Elite Cheerleading Championship', team: 'Intensity' },
  { season: '2018/2019', rank: 3, competition: 'Championnat National', team: 'Météore', detail: 'Seniors Niveau 1' },
  { season: '2018/2019', rank: 3, competition: 'Championnat National', team: 'Fusion', detail: 'Seniors Niveau 2' },
  { season: '2017/2018', rank: 3, competition: 'Championnat National', team: 'Météore', detail: 'Seniors Niveau 1' },
  { season: '2017/2018', rank: 2, competition: 'Phases Qualificatives Championnat National', team: 'Fusion' },
  { season: '2017/2018', rank: 2, competition: 'Open International Lyon', team: 'Fusion', detail: 'Séniors Niveau 3' },
  { season: '2016/2017', rank: 1, competition: 'Championnat de France', team: 'Intensity', detail: 'CHAMPIONS DE FRANCE', tag: '🏆', highlight: true },
  { season: '2015/2016', rank: 2, competition: 'Phases Qualificatives Championnat National', team: 'Équipe Seniors Niveau 1' },
  { season: '2015/2016', rank: 2, competition: 'CHEER FOR ME — Paris', team: 'Équipe Seniors', detail: 'Compétition Internationale — Niveau 2' },
]

export const PARTNERS = [
  { name: 'Orléans Loiret Basket', category: 'Sport' },
  { name: 'Groupama', category: 'Assurance' },
  { name: 'Les Panthères', category: 'Sport' },
  { name: 'Rugby Club Orléans', category: 'Sport' },
  { name: 'SwissLife', category: 'Finance' },
  { name: 'Gilbert Autret Architecture', category: 'Architecture' },
  { name: 'MG BR', category: 'Partenaire' },
]

export const TICKER_ITEMS = [
  'Training the Future',
  'Champions de France 2016/17',
  'Qualifiés All Star Worlds Orlando',
  '1er TSN · Juin 2026',
  'Bid Worlds Mexico · Sparks',
  'Score record 90.30 · ECC',
  'Summit Européen · Intensity & Silver Stars',
  'Fondé en 2015 · ASPTT Orléans',
]

export const HERO_STATS = [
  { num: '10', sup: '+', label: 'Équipes actives' },
  { num: '1', sup: 'er', label: 'Champ. de France' },
  { num: '90', sup: '.30', label: 'Score record ECC' },
]

export const VALUES = [
  { num: '01', icon: '⚡', title: 'Excellence sportive', description: "Un encadrement technique de haut niveau pour progresser à chaque séance, des débutants aux compétiteurs d'élite." },
  { num: '02', icon: '🤝', title: "Esprit d'équipe", description: "On gagne ensemble, on grandit ensemble. La solidarité et le collectif sont au cœur de chaque routine." },
  { num: '03', icon: '🌍', title: 'Ambition internationale', description: "Compétitions en Europe et aux États-Unis : Xplosion s'est imposé sur la scène mondiale du cheerleading." },
]

export const CLUB_INFO = {
  name: 'Xplosion Cheerleaders Orléans',
  shortName: 'XCO',
  founded: '15 juillet 2015',
  association: 'ASPTT Orléans',
  status: 'Club All-Star',
  email: 'xplosioncheerleaders.xco@gmail.com',
  phone: '06 03 61 22 39',
  address: 'Gymnase Olympe de Gouges, 45 ter rue des Montées, 45100 Orléans',
  instagram: 'https://www.instagram.com/xplosion_cheer_orleans/',
  facebook: 'https://www.facebook.com/xplosioncheer45/',
  tiktok: '#',
  president: 'Marion Guiougou',
}