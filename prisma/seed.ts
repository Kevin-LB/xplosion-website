import { PrismaClient, Role, type TeamStatus } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { TEAMS } from '../src/lib/data'
import { hashPassword } from '../src/lib/password'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

const STATUS_MAP: Record<string, TeamStatus> = {
  active: 'ACTIVE',
  gs: 'GS',
  loisirs: 'LOISIRS',
}

async function main() {
  const adminPasswordHash = await hashPassword('taga-admin')

  await prisma.user.upsert({
    where: { username: 'taga' },
    update: {},
    create: {
      username: 'taga',
      name: 'Administrateur',
      passwordHash: adminPasswordHash,
      role: Role.ADMIN,
      mustChangePassword: true,
    },
  })

  for (const team of TEAMS) {
    await prisma.team.upsert({
      where: { slug: team.slug },
      update: {},
      create: {
        slug: team.slug,
        name: team.name,
        level: team.level,
        category: team.category,
        description: team.description,
        longDescription: team.longDescription,
        badge: team.badge,
        status: STATUS_MAP[team.status],
        photo: team.photo,
        gallery: team.gallery ?? [],
        trainingDays: team.trainingDays ?? [],
      },
    })
  }

  console.log(`Seed OK — ${TEAMS.length} équipes, 1 compte admin créé.`)
  console.log('  admin: taga / taga-admin (mot de passe à changer à la première connexion)')
  console.log('  Crée les comptes coach depuis /admin/comptes une fois connecté.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
