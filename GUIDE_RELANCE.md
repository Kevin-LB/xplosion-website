# Guide de relance — reprendre le projet après extinction du PC

Pense-bête rapide pour retravailler sur le projet après avoir éteint/redémarré ta machine. La base est déjà créée et peuplée — pas besoin de refaire les migrations ni le seed, juste de relancer ce qui s'est arrêté.

## Les 3 étapes

**1. Lance Docker Desktop** (l'appli, comme n'importe quelle appli sur ton Mac) et attends qu'elle affiche "Docker Desktop is running".

**2. Ouvre un terminal dans le projet et relance la base :**

```bash
cd /Users/kevlb/Desktop/PROJET/XPLOSION/xplosion-website
docker compose up -d
```

Vérifie que ça a marché :

```bash
docker compose ps
```

Tu dois voir une ligne avec `Up ... (healthy)`.

**3. Lance le site :**

```bash
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000) — c'est bon, tu peux travailler.

## Pour tout arrêter proprement en fin de session

- Dans le terminal où tourne `npm run dev` : `Ctrl+C`
- Arrêter Postgres (optionnel, tu peux aussi le laisser tourner) : `docker compose down` — tes données restent, elles ne sont supprimées qu'avec `docker compose down -v`

## Si quelque chose ne marche pas

- **Erreur de connexion à la base** → Docker Desktop n'est pas lancé, ou `docker compose up -d` n'a pas été fait. Reprends l'étape 1-2.
- **Port 3000 déjà utilisé** → un `npm run dev` tourne déjà quelque part (autre terminal, autre fenêtre VS Code). Pas besoin d'en relancer un deuxième.
- **Autre problème** → section "Dépannage" de [GUIDE_DEMARRAGE.md](./GUIDE_DEMARRAGE.md).

## Identifiants pour se connecter sur `/login`

| Identifiant | Mot de passe |
|---|---|
| `taga` | celui que tu as choisi à ta première connexion (plus `taga-admin`, qui n'est valable qu'une fois) |

Si tu l'as oublié, voir la section "réinitialiser un mot de passe" de [GUIDE_UTILISATEUR.md](./GUIDE_UTILISATEUR.md) — mais comme tu es le seul admin pour l'instant, il faudra passer par `npm run db:studio` pour te réinitialiser toi-même (modifier `mustChangePassword` à `true` sur ton compte dans la table `users`), faute d'avoir un autre admin pour le faire depuis `/admin/comptes`.
