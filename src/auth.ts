import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import type { Role } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { verifyPassword } from '@/lib/password'

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: 'jwt' },
  pages: { signIn: '/login' },
  providers: [
    Credentials({
      credentials: {
        username: { label: 'Identifiant', type: 'text' },
        password: { label: 'Mot de passe', type: 'password' },
      },
      async authorize(credentials) {
        const username = credentials?.username as string | undefined
        const password = credentials?.password as string | undefined
        if (!username || !password) return null

        const user = await prisma.user.findUnique({ where: { username } })
        if (!user) return null

        const valid = await verifyPassword(password, user.passwordHash)
        if (!valid) return null

        return {
          id: user.id,
          username: user.username,
          name: user.name,
          role: user.role,
          mustChangePassword: user.mustChangePassword,
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        const u = user as { id: string; username: string; role: Role; mustChangePassword: boolean }
        token.id = u.id
        token.username = u.username
        token.role = u.role
        token.mustChangePassword = u.mustChangePassword
      }
      return token
    },
    session({ session, token }) {
      session.user.id = token.id as string
      session.user.username = token.username as string
      session.user.role = token.role as Role
      session.user.mustChangePassword = token.mustChangePassword as boolean
      return session
    },
  },
})
