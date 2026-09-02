# Image de production pour xplosion-website (Next.js standalone).
# Conçue pour Dokploy / Docker Compose — voir GUIDE_DEPLOIEMENT.md.

FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat

# ── 1. Dépendances ──────────────────────────────────────────
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
COPY prisma ./prisma
COPY prisma.config.ts ./
# DATABASE_URL n'a besoin d'être qu'une chaîne valide à ce stade — `prisma
# generate` ne se connecte pas à la base, il lit juste le schéma. La vraie
# valeur est fournie à l'exécution du conteneur (voir docker-compose.yml).
ARG DATABASE_URL="postgresql://build:build@localhost:5432/build"
ENV DATABASE_URL=$DATABASE_URL
RUN npm ci

# ── 2. Build ─────────────────────────────────────────────────
FROM base AS builder
WORKDIR /app
ARG DATABASE_URL="postgresql://build:build@localhost:5432/build"
ENV DATABASE_URL=$DATABASE_URL
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ── 3. Image finale ──────────────────────────────────────────
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
