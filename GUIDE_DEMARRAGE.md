# Guide de démarrage — Xplosion Website

Guide technique pour lancer le projet en local, gérer la base de données et déployer. Pour le fonctionnement de l'appli côté utilisateur (bureau/coachs), voir [GUIDE_UTILISATEUR.md](./GUIDE_UTILISATEUR.md).

## Prérequis

- Node.js 20+
- npm
- Docker Desktop (doit être **lancé**, pas juste installé)

## 1. Installation initiale (une seule fois)

```bash
cd xplosion-website
npm install
```

Copie le fichier d'exemple des variables d'environnement :

```bash
cp .env.example .env
```

Ouvre `.env` et remplace `AUTH_SECRET` par une vraie valeur aléatoire :

```bash
openssl rand -base64 32
```

Colle le résultat dans `.env` :

```
AUTH_SECRET="<le résultat de la commande ci-dessus>"
```

Le reste de `.env` (`DATABASE_URL`) correspond déjà à `docker-compose.yml`, pas besoin d'y toucher pour du développement local.

## 2. Démarrer la base de données

```bash
docker compose up -d
```

Ça lance un conteneur Postgres en arrière-plan. Vérifie qu'il tourne :

```bash
docker compose ps
# doit afficher "Up ... (healthy)"
```

Il reste démarré même quand tu fermes le terminal. Pour l'arrêter : `docker compose down` (les données restent, elles sont dans un volume Docker). Pour tout effacer et repartir de zéro : `docker compose down -v`.

## 3. Créer les tables et les données de départ

À faire une seule fois (ou à chaque fois que tu repars d'une base vide) :

```bash
# Génère le client Prisma (le code qui parle à la base)
npm run db:generate

# Crée les tables dans Postgres
npm run db:migrate

# Remplit avec les équipes existantes + le compte admin de départ
npm run db:seed
```

`db:migrate` peut demander un nom de migration si tu ajoutes des colonnes plus tard — voir la section [Modifier le schéma](#modifier-le-schéma-de-la-base) plus bas.

Compte admin créé par le seed :

| Identifiant | Mot de passe |
|---|---|
| `taga` | `taga-admin` |

C'est un mot de passe **provisoire** — à la première connexion sur `/login`, l'appli forcera à en choisir un nouveau. Voir le [guide utilisateur](./GUIDE_UTILISATEUR.md) pour la suite (créer les comptes du bureau et des coachs).

## 4. Lancer le site

```bash
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000).

## Commandes du quotidien

| Commande | Effet |
|---|---|
| `npm run dev` | Lance le site en local (rechargement automatique) |
| `npm run build` | Build de production (vérifie aussi les types TypeScript) |
| `npm run start` | Lance le build de production (après `npm run build`) |
| `docker compose up -d` | Démarre Postgres |
| `docker compose down` | Arrête Postgres (garde les données) |
| `npm run db:studio` | Ouvre une interface graphique pour voir/modifier les données directement dans la base |
| `npm run db:seed` | Relance le seed (équipes + compte admin) — sans effet sur les données déjà en base grâce aux upserts, mais ne recrée pas les comptes coach supprimés |

## Modifier le schéma de la base

Si tu (ou moi, dans une prochaine session) ajoutes/modifies un champ dans `prisma/schema.prisma` :

```bash
npm run db:generate      # régénère le client Prisma
npm run db:migrate       # va te demander un nom, ex: "add-athlete-phone"
```

Ça crée un nouveau fichier dans `prisma/migrations/` et l'applique à ta base locale. **Ce fichier de migration doit être commité** — c'est lui qui permettra d'appliquer le même changement sur le serveur de prod plus tard (`prisma migrate deploy`, sans avoir besoin de recréer la base).

## Dépannage

**"Can't reach database server" / erreurs de connexion**
Docker Desktop n'est pas lancé, ou le conteneur est arrêté. Lance `docker compose up -d` et réessaie.

**Port 5432 déjà utilisé**
Un autre Postgres tourne déjà sur ta machine (local ou un autre projet). Soit tu l'arrêtes, soit tu changes le port dans `docker-compose.yml` (`"5433:5432"`) et dans `DATABASE_URL` de `.env` (`localhost:5433`).

**Port 3000 déjà utilisé**
Un autre `npm run dev`/`npm run start` tourne déjà. `lsof -ti:3000 | xargs kill` pour le libérer, ou laisse Next choisir un autre port automatiquement.

**J'ai changé le schéma et rien ne se passe**
Il faut relancer `npm run db:generate` après **chaque** modif de `prisma/schema.prisma`, sinon le code TypeScript ne connaît pas les nouveaux champs.

**Je veux tout remettre à zéro**
```bash
docker compose down -v   # supprime les données
docker compose up -d
npm run db:migrate
npm run db:seed
```

## Déploiement sur le VPS

Un `Dockerfile` de production existe (build Next.js `standalone`, testé en local). `docker-compose.yml` ne contient que le service Postgres — pratique pour le développement, l'app elle-même se déploie via Dokploy plutôt que rajoutée à ce compose. Marche à suivre complète → [GUIDE_DEPLOIEMENT.md](./GUIDE_DEPLOIEMENT.md).

Points clés :
- Un vrai `AUTH_SECRET` (différent de celui du local) et `AUTH_URL` (URL publique du site) en variables d'environnement de prod
- Sur le serveur, `prisma migrate deploy` (pas `migrate dev`, fait pour le développement) pour appliquer les migrations sans prompt interactif
- Ne **jamais** committer le fichier `.env` réel (déjà dans `.gitignore`)
- Prévoir un volume persistant pour `public/images/` (voir le guide de déploiement) — sinon les photos uploadées disparaissent à chaque redéploiement

## Stack technique

- **Next.js 16** (App Router) + React 19 + TypeScript
- **Prisma 7** (ORM) + `@prisma/adapter-pg` (connexion Postgres — Prisma 7 exige un driver adapter, voir `src/lib/prisma.ts` et `prisma.config.ts`)
- **Auth.js / NextAuth v5** — connexion par identifiant + mot de passe, sessions JWT (`src/auth.ts`)
- **bcryptjs** pour le hash des mots de passe
- **Tailwind CSS v4** pour les portails `/admin` et `/coach` ; le reste du site public utilise des styles CSS via variables (`globals.css`) pour rester cohérent avec le design existant
- **Docker Compose** pour Postgres en local
