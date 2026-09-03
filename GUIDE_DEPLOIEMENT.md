# Guide de déploiement — Dokploy (VPS)

Déploiement du site sur ton VPS via [Dokploy](https://dokploy.com) (panneau self-hosted type Vercel/Heroku, basé sur Docker). Les libellés exacts des boutons peuvent varier légèrement selon la version de Dokploy — les concepts restent les mêmes.

## Vue d'ensemble

Le projet fournit un `Dockerfile` (build multi-étapes, Next.js en mode `standalone`) et un `docker-compose.yml` (jusqu'ici utilisé seulement pour Postgres en local). Sur Dokploy, tu vas créer :

1. Une **base de données Postgres** (ressource native Dokploy)
2. Une **application** pointant sur ce repo GitHub, buildée via le `Dockerfile`
3. Les **variables d'environnement** de prod
4. Un **domaine** (avec HTTPS automatique via Dokploy/Traefik)

## 1. Installer Dokploy sur le VPS (si ce n'est pas déjà fait)

En SSH sur le VPS :

```bash
curl -sSL https://dokploy.com/install.sh | sh
```

À la fin de l'installation, Dokploy affiche l'URL de son dashboard (`http://<ip-du-vps>:3000` par défaut). Crée ton compte admin dessus.

## 2. Créer la base de données Postgres

Dans Dokploy : **Projects** → crée un projet (ex. `xplosion`) → **Create Service** → **Database** → **PostgreSQL**.

- Donne-lui un nom (ex. `xplosion-db`)
- Note le nom d'utilisateur / mot de passe / nom de base générés (ou fixe-les toi-même)
- Démarre le service

Dokploy fournit une URL de connexion **interne** (utilisable seulement entre conteneurs du même réseau Dokploy) — c'est celle-là qu'on utilisera pour `DATABASE_URL`, pas besoin de l'exposer publiquement.

## 3. Créer l'application

Dans le même projet Dokploy : **Create Service** → **Application**.

- **Source** : GitHub → connecte le repo `Kevin-LB/xplosion-website`, branche `main`
- **Build type** : `Dockerfile` (Dokploy détecte le `Dockerfile` à la racine)
- **Port** : `3000` (celui exposé par le conteneur)

### Variables d'environnement de l'application

| Variable | Valeur |
|---|---|
| `DATABASE_URL` | L'URL interne Postgres fournie par Dokploy à l'étape 2 (ex. `postgresql://user:pass@xplosion-db:5432/xplosion`) |
| `AUTH_SECRET` | Un secret généré avec `openssl rand -base64 32` — **différent** de celui utilisé en local |
| `AUTH_URL` | L'URL publique finale du site (ex. `https://xplosion-cheer.fr`) |
| `NODE_ENV` | `production` |

### Stockage persistant pour les photos uploadées

Les photos uploadées depuis l'admin (équipes, actualités) sont écrites dans `public/images/` **à l'intérieur du conteneur**. Sans volume, elles disparaissent à chaque redéploiement. Dans la config de l'application Dokploy, ajoute un **volume** :

- Chemin dans le conteneur : `/app/public/images`
- Monté sur un volume Dokploy persistant (créé automatiquement si tu le nommes, ex. `xplosion-images`)

## 4. Premier déploiement

Lance le déploiement depuis Dokploy (bouton **Deploy**). Le build utilise le `Dockerfile` du repo — il peut prendre quelques minutes la première fois.

### À propos du cache de build

Chaque déploiement reconstruit un conteneur neuf (`npm ci` → `prisma generate` → `next build`) — pas de process qui tournerait en continu et garderait une ancienne version en mémoire, contrairement à `npm run dev` en local. Le `Dockerfile` copie `prisma/schema.prisma` **avant** `npm ci`, donc Docker invalide automatiquement le cache de cette étape dès que le schéma change — le client Prisma est toujours régénéré à jour, pas d'action à faire.

Si un déploiement se comporte bizarrement sans raison apparente, Dokploy propose une option **"Rebuild without cache"** (ou équivalent, selon la version) sur le service — à utiliser en dernier recours pour forcer un rebuild complet sans réutiliser aucune couche Docker.

## 5. Créer les tables (migrations)

Une fois le conteneur démarré, il faut appliquer les migrations Prisma **une fois** (elles ne se lancent pas toutes seules). Depuis le terminal intégré de Dokploy (bouton **Terminal**/**Shell** sur le service application), ou en SSH + `docker exec` :

```bash
npx prisma migrate deploy
```

C'est la commande à utiliser en prod (contrairement à `migrate dev` utilisé en local, elle n'est pas interactive et n'essaie pas de créer de nouvelle migration — elle applique juste celles déjà commitées dans `prisma/migrations/`).

## 6. Peupler la base (première fois uniquement)

Toujours depuis ce même terminal :

```bash
npx tsx prisma/seed.ts
```

Ça crée le compte admin de départ (`taga` / `taga-admin`, mot de passe à changer à la première connexion) et importe les équipes existantes.

## 7. Domaine

Dans la config de l'application Dokploy, section **Domains** : ajoute ton nom de domaine, pointe son DNS (enregistrement A) vers l'IP du VPS. Dokploy gère le certificat HTTPS (Let's Encrypt) automatiquement.

## Mises à jour suivantes

À chaque push sur `main`, relance un déploiement depuis Dokploy (ou active l'auto-deploy sur push si l'option existe dans ta version). Si un push contient une nouvelle migration (`prisma/migrations/<nouveau-dossier>/`), refaire l'étape 5 (`prisma migrate deploy`) après le déploiement — c'est la seule étape manuelle récurrente.

## Vercel

Le repo GitHub a un déploiement Vercel connecté (créé avant l'ajout de la base de données), qui échoue puisque Vercel n'a pas accès à ta base Postgres. Si Dokploy devient le déploiement de référence, pense à désactiver l'auto-déploiement Vercel : dashboard Vercel → le projet → **Settings** → **Git** → désactive les déploiements automatiques (ou supprime le projet).
