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
  longDescription?: string
  badge?: string
  status: 'active' | 'gs' | 'loisirs'
  slug: string
  photo?: string
  gallery?: string[]
  coach?: string
  trainingDays?: string[]
}

// Images disponibles dans /public/images/ :
// intensity.jpg, audacity.png, fire.jpg, sparks.jpg, silverstar.jpg, xplosion.jpg, logo.PNG, asptt.png
// + photos génériques club : IMG_0971.JPG, IMG_0978.JPG, IMG_0980.JPG, IMG_1052.JPG, IMG_1054.JPG,
//   IMG_4618.jpg, IMG_6047.jpg, 0fb221a9-...JPG, B5BD3619-...JPG, eb81d6d9-...JPG

export const TEAMS: Team[] = [
  {
    name: 'Intensity',
    level: 'Seniors · Coed · Niveau 4',
    category: 'Seniors Coed LVL 4',
    description: "Équipe élite internationale. Grand Champion TSN 2026 & OCC 2026. Qualifiée Summit Orlando 2026/27.",
    longDescription: "Intensity est la vitrine du club à l'international. Composée des athlètes les plus expérimentés, l'équipe enchaîne les podiums depuis plusieurs saisons et porte les couleurs d'Xplosion jusqu'aux États-Unis. Routine technique de 2min30 mêlant pyramides, tumbling avancé et chorégraphie de haut niveau.",
    badge: 'Summit Orlando',
    status: 'active',
    slug: 'intensity',
    photo: '/images/intensity.jpg',
    gallery: ['/images/intensity.jpg', '/images/IMG_0971.JPG', '/images/IMG_1052.JPG'],
  },
  {
    name: 'Audacity',
    level: 'Seniors · Mixte · Niveau 1',
    category: 'Seniors Open LVL 1',
    description: "2ème place OCC 2026. Lauréate du bid All Star Worlds Orlando 2026.",
    longDescription: "Audacity réunit des athlètes seniors mixtes autour d'un niveau accessible mais exigeant. L'équipe a connu une saison 2025/26 marquée par une belle progression et une place de choix sur le podium régional, validant tout le travail accompli à l'entraînement.",
    status: 'active',
    slug: 'audacity',
    photo: '/images/audacity.png',
    gallery: ['/images/audacity.png', '/images/IMG_0978.JPG'],
  },
  {
    name: 'Silver Stars',
    level: 'U18 · All Girl · Niveau 1',
    category: 'U18 LVL 1',
    description: "1ère place OCC 2026. Qualifiée Summit Européen 2026/27.",
    longDescription: "Silver Stars rassemble les athlètes U18 All Girl du club. Après une saison 2025/26 exceptionnelle couronnée par une victoire à l'OCC et un coup de cœur du jury, l'équipe s'envole vers le Summit Européen 2027 — une première pour ce groupe.",
    badge: 'Summit EU',
    status: 'active',
    slug: 'silver-stars',
    photo: '/images/silverstar.jpg',
    gallery: ['/images/silverstar.jpg', '/images/IMG_0980.JPG'],
  },
  {
    name: 'Fire',
    level: 'U12 · All Girl · Niveau 1',
    category: 'U12 LVL 1',
    description: "1ère place OCC 2026, coup de cœur du jury. Qualifiée Summit Européen 2026/27.",
    longDescription: "Fire, c'est la relève du club. Une équipe U12 pleine d'énergie qui a marqué les esprits lors de l'OCC 2026 en décrochant la première place et le coup de cœur du jury. Direction le Summit Européen 2027 pour ces jeunes pousses pleines de promesses.",
    badge: 'Summit EU',
    status: 'active',
    slug: 'fire',
    photo: '/images/fire.jpg',
    gallery: ['/images/fire.jpg', '/images/IMG_1054.JPG'],
  },
  {
    name: 'Tenacity',
    level: 'Seniors · Niveau 3',
    category: 'Seniors LVL 3',
    description: "Équipe en réouverture pour la saison 2026/27. Tryouts le 27 juin 2026.",
    longDescription: "Après une pause, Tenacity rouvre ses portes pour la saison 2026/27. Une nouvelle aventure senior niveau 3 à construire dès les tryouts du 27 juin 2026 — l'occasion de rejoindre une équipe dès sa fondation.",
    badge: 'Nouveau',
    status: 'active',
    slug: 'tenacity',
    photo: '/images/IMG_4618.jpg',
  },
  {
    name: 'Cosmo',
    level: 'Tous âges · Loisirs',
    category: 'Section Loisirs',
    description: "Section loisirs ouverte à tous, quel que soit le niveau. Idéale pour découvrir le cheerleading.",
    longDescription: "Cosmo est la section loisirs du club, pensée pour découvrir le cheerleading sans pression de compétition. Tous niveaux et tous âges sont les bienvenus pour s'initier aux portés, à la danse et au tumbling dans une ambiance conviviale.",
    status: 'loisirs',
    slug: 'cosmo',
    photo: '/images/IMG_6047.jpg',
  },
  // ── Group Stunt & Partner Stunt ──
  {
    name: 'Sparks',
    level: 'Group Stunt · Coed · Niveau 5',
    category: 'Senior Group Stunt Coed LVL 5',
    description: "Lauréates Worlds Mexico 2026. 1ère place Open Spice Event.",
    longDescription: "Sparks excelle dans la discipline du Group Stunt, où la précision des portés et la synchronisation font toute la différence. L'équipe a décroché le bid pour les Worlds Mexico 2026, une qualification historique pour le club.",
    status: 'gs',
    slug: 'sparks',
    photo: '/images/sparks.jpg',
    gallery: ['/images/sparks.jpg', '/images/0fb221a9-83a5-4e8f-9d90-88204c897bc9.JPG'],
  },
  {
    name: 'Blackstarz',
    level: 'Group Stunt · Coed · Niveau 6/7',
    category: 'Senior Group Stunt Coed LVL 6/7',
    description: "Niveau élite national. 1er OCC et SALC 2024/25.",
    longDescription: "Blackstarz représente le plus haut niveau du Group Stunt au sein du club, avec une routine technique de niveau 6/7. Double victoire nationale en 2024/25 entre l'OCC et le SALC.",
    status: 'gs',
    slug: 'blackstarz',
    photo: '/images/B5BD3619-F698-4BF4-8F2F-6F155175E7F3.JPG',
  },
  {
    name: 'Fire Queens',
    level: 'Group Stunt · U12 · Niveau 2',
    category: 'U12 Group Stunt All Girl LVL 2',
    description: "Équipe jeunes Group Stunt.",
    longDescription: "Fire Queens initie les plus jeunes athlètes du club à la discipline du Group Stunt, dans un esprit ludique et progressif.",
    status: 'gs',
    slug: 'fire-queens',
    photo: '/images/eb81d6d9-abc4-4e52-8f46-9c7d03e6d2ab.JPG',
  },
  {
    name: 'Dark Fire',
    level: 'Group Stunt · U12 · Niveau 2',
    category: 'U12 Group Stunt All Girl LVL 2',
    description: "Équipe jeunes Group Stunt.",
    longDescription: "Dark Fire complète l'offre Group Stunt U12 du club, avec une approche centrée sur la technique des portés.",
    status: 'gs',
    slug: 'dark-fire',
  },
  {
    name: 'Starlight',
    level: 'Group Stunt · U18 · Niveau 2',
    category: 'U18 Group Stunt All Girl LVL 2',
    description: "Équipe U18 Group Stunt.",
    longDescription: "Starlight regroupe les athlètes U18 pratiquant le Group Stunt, alliant maturité technique et précision dans l'exécution des pyramides.",
    status: 'gs',
    slug: 'starlight',
  },
  {
    name: 'Lemon',
    level: 'Partner Stunt · Mixte',
    category: 'Partner Stunt',
    description: "Duo Partner Stunt, discipline de précision portée par deux athlètes.",
    longDescription: "Lemon est notre duo Partner Stunt — une discipline exigeante où deux athlètes seulement portent l'intégralité d'une routine technique. Précision, confiance et synchronisation sont les maîtres mots de cette spécialité.",
    status: 'gs',
    slug: 'lemon',
  },
]

export type Result = {
  season: string
  rank: number | null
  competition: string
  date?: string
  team: string
  detail?: string
  tag?: string
  highlight?: boolean
}

export const RESULTS: Result[] = [
  // ── 2025/2026 ──
  { season: '2025/2026', rank: 1, competition: 'OCC · Juin 2026', date: 'Juin 2026', team: 'Intensity', detail: 'Seniors Coed Niveau 4', tag: 'Lauréat Summit Orlando 2027', highlight: true },
  { season: '2025/2026', rank: 1, competition: 'OCC · Juin 2026', date: 'Juin 2026', team: 'Silver Stars', detail: 'U18 Niveau 1', tag: 'Lauréat Summit EU 2027', highlight: true },
  { season: '2025/2026', rank: 1, competition: 'OCC · Juin 2026', date: 'Juin 2026', team: 'Fire', detail: 'U12 Niveau 1 · Coup de cœur du jury', tag: 'Lauréat Summit EU 2027', highlight: true },
  { season: '2025/2026', rank: 2, competition: 'OCC · Juin 2026', date: 'Juin 2026', team: 'Audacity', detail: 'Seniors Mixte Niveau 1' },
  { season: '2025/2026', rank: 1, competition: 'TSN · 06 juin 2026', date: '6 juin 2026', team: 'Intensity', detail: 'Grand Champion Niv. 3/4/5/6', tag: 'Lauréat Summit Orlando + EU', highlight: true },
  { season: '2025/2026', rank: 1, competition: 'Open Spice Event', date: 'Printemps 2026', team: 'Audacity', detail: 'Seniors Coed Niveau 1', tag: 'Lauréat bid Worlds' },
  { season: '2025/2026', rank: 1, competition: 'Open Spice Event', date: 'Printemps 2026', team: 'Sparks', detail: 'Group Stunt Niveau 5', tag: 'Lauréat bid Worlds Mexico' },
  { season: '2025/2026', rank: 1, competition: 'TSN · 06 juin 2026', date: '6 juin 2026', team: 'Silver Stars', detail: 'Grand Champion Niv. 1/2', tag: 'Lauréat Summit EU' },
  { season: '2025/2026', rank: 1, competition: 'TSN · 28 février 2026', date: '28 fév. 2026', team: 'Intensity', detail: 'Qualification Summit EU' },
  { season: '2025/2026', rank: 1, competition: 'Open Spice Event', date: 'Printemps 2026', team: 'Fire', detail: 'U12 Niveau 1' },
  { season: '2025/2026', rank: 5, competition: 'Elite Cheerleading Championship', date: 'Janvier 2026', team: 'Intensity', detail: 'Score record club : 90.30', tag: 'Record' },
  { season: '2025/2026', rank: 1, competition: 'Summer All Level (SALC)', date: 'Été 2025', team: 'Silver Stars', detail: 'Score : 91.30', tag: 'Record' },
  // ── 2024/2025 ──
  { season: '2024/2025', rank: 1, competition: 'Open Cheer Centre (OCC)', date: 'Mars 2025', team: 'Silver Stars', detail: 'Coup de cœur du jury', tag: 'Lauréat Summit EU' },
  { season: '2024/2025', rank: 1, competition: 'Open Cheer Centre (OCC)', date: 'Mars 2025', team: 'Fire', detail: 'U12 Niveau 1', tag: 'Lauréat Summit EU' },
  { season: '2024/2025', rank: 1, competition: 'OCC + SALC', date: 'Printemps 2025', team: 'Blackstarz', detail: 'Double victoire nationale' },
  { season: '2024/2025', rank: 1, competition: 'Summer All Level (SALC)', date: 'Été 2025', team: 'Gravity', detail: 'Seniors Niveau 2' },
  { season: '2024/2025', rank: 3, competition: 'Championnat de France', date: 'Avril 2025', team: 'Gravity', detail: 'Score : 65,33' },
  // ── 2022/2023 ──
  { season: '2022/2023', rank: 1, competition: 'Open Cheerleading Centre (OCC)', date: 'Mars 2023', team: 'Intensity', detail: 'Seniors Niveau 4' },
  { season: '2022/2023', rank: 1, competition: 'Championnat Fédéral — Zone Régionale', date: 'Déc. 2022', team: 'Power', detail: 'Qualifiée Finales Nationales' },
  // ── 2021/2022 ──
  { season: '2021/2022', rank: 1, competition: 'Open Cheerleading Centre (OCC)', date: 'Mars 2022', team: 'Intensity', detail: 'Seniors Niveau 4' },
  { season: '2021/2022', rank: 2, competition: 'Open de Lyon (SACD)', date: 'Novembre 2021', team: 'Intensity' },
  { season: '2021/2022', rank: 11, competition: 'Elite Cheerleading Championship', date: 'Janvier 2022', team: 'Intensity' },
  // ── Historique ──
  { season: '2018/2019', rank: 3, competition: 'Championnat National', date: 'Avril', team: 'Météore', detail: 'Seniors Niveau 1' },
  { season: '2018/2019', rank: 3, competition: 'Championnat National', date: 'Avril', team: 'Fusion', detail: 'Seniors Niveau 2' },
  { season: '2017/2018', rank: 3, competition: 'Championnat National', date: 'Avril', team: 'Météore' },
  { season: '2017/2018', rank: 2, competition: 'Phases Qualificatives Championnat National', date: 'Déc. 2017', team: 'Fusion' },
  { season: '2017/2018', rank: 2, competition: 'Open International Lyon', date: 'Novembre 2017', team: 'Fusion', detail: 'Séniors Niveau 3' },
  { season: '2016/2017', rank: 1, competition: 'Championnat de France', date: 'Avril 2017', team: 'Intensity', detail: 'CHAMPIONS DE FRANCE', tag: '🏆', highlight: true },
  { season: '2015/2016', rank: 2, competition: 'Phases Qualificatives Championnat National', date: 'Déc. 2015', team: 'Équipe Seniors Niveau 1' },
  { season: '2015/2016', rank: 2, competition: 'CHEER FOR ME — Paris', date: 'Février 2016', team: 'Équipe Seniors', detail: 'Compétition Internationale — Niveau 2' },
]

export const PARTNERS = [
  { name: 'Orléans Loiret Basket', category: 'Sport' },
  { name: 'Groupama', category: 'Assurance' },
  { name: 'Les Panthères', category: 'Sport' },
  { name: 'Rugby Club Orléans', category: 'Sport' },
  { name: 'SwissLife', category: 'Finance' },
  { name: 'Gilbert Autret Architecture', category: 'Architecture' },
  { name: 'MG BR', category: 'Partenaire' },
  { name: "Mairie d'Orléans", category: 'Subvention' },
  { name: 'Département du Loiret', category: 'Subvention' },
  { name: 'ASPTT Orléans', category: 'Association' },
]

export const TICKER_ITEMS = [
  'Training the Future',
  'Champions de France 2016/17',
  '3 équipes Summit Européen 2027',
  '1er OCC · Juin 2026',
  '1er TSN · Juin 2026',
  'Score record 91.30 · Silver Stars',
  'Summit Orlando 2027 · Intensity',
  'Fondé en 2015 · ASPTT Orléans',
]

export const HERO_STATS = [
  { num: '6', sup: '', label: 'Équipes actives' },
  { num: '3', sup: '', label: 'Équipes Summit EU 2027' },
  { num: '1', sup: '', label: 'Équipe Summit Orlando 2027' },
]

export const VALUES = [
  {
    num: '01',
    icon: '⚡',
    title: 'Excellence sportive',
    description: "Un encadrement technique de haut niveau pour progresser à chaque séance, des débutants aux athlètes compétiteurs — parce que chaque membre du club compte.",
  },
  {
    num: '02',
    icon: '🤝',
    title: "Esprit d'équipe",
    description: "On s'entraîne ensemble, on grandit ensemble, on performe ensemble. La solidarité et le collectif sont au cœur de chacune de nos actions.",
  },
  {
    num: '03',
    icon: '🌍',
    title: 'Ambition internationale',
    description: "Compétitions en France, en Europe et à l'internationale : Xplosion s'est imposé sur la scène mondiale du cheerleading.",
  },
]

export const CLUB_INFO = {
  name: 'Xplosion Cheerleaders Orléans',
  shortName: 'XCO',
  founded: '15 juillet 2015',
  association: 'ASPTT Orléans',
  status: 'Club All-Star',
  email: 'xplosioncheerleaders.xco@gmail.com',
  phone: '06 03 61 22 39',
  address: 'Gymnase Olympe de Gouges, 1 Pl. Albert Camus, 45100 Orléans',
  instagram: 'https://www.instagram.com/xplosion_cheer_orleans/',
  facebook: 'https://www.facebook.com/xplosioncheer45/',
  tiktok: '#',
  youtube: 'https://www.youtube.com/@XplosionCheerOrleans',
  president: 'Marion Guiougou',
}