# Guide utilisateur — Espace Bureau & Coachs

Ce guide explique comment utiliser les espaces privés du site (le « bureau » et les « coachs »). Pour l'installation technique, voir [GUIDE_DEMARRAGE.md](./GUIDE_DEMARRAGE.md).

## Vue d'ensemble

Le site a deux parties :

- **Le site public** — visible par tout le monde, sans connexion (les équipes, le palmarès, les actualités, etc.)
- **Deux espaces privés**, accessibles uniquement en se connectant sur la page `/login` :
  - **Espace Bureau** (`/admin`) — pour gérer les équipes, les actualités et les comptes
  - **Espace Coach** (`/coach`) — pour suivre les athlètes et leurs devoirs (« homeworks »)

Personne ne peut créer son propre compte : c'est **toujours un membre du bureau** qui crée les comptes des autres, bureau comme coachs.

## Se connecter

1. Va sur `/login` (ex : `https://xplosion-cheer.fr/login`)
2. Entre ton **identifiant** et ton **mot de passe**
3. Clique sur **Se connecter**

### Première connexion

Si c'est ta première connexion (ou si le bureau vient de te réinitialiser ton mot de passe), tu arrives automatiquement sur une page **« Choisis ton mot de passe »**. C'est normal : le mot de passe qu'on t'a donné est provisoire. Choisis-en un nouveau (n'importe lequel, pas de contrainte particulière) et saisis-le deux fois pour confirmer. Une fois validé, tu es directement connecté avec ton nouveau mot de passe — inutile de te reconnecter.

À partir de là, ce nouveau mot de passe est le tien : utilise-le à chaque connexion.

## Créer un compte pour quelqu'un (bureau uniquement)

1. Connecte-toi en tant que membre du bureau
2. Va dans **Comptes** (menu du haut dans l'espace Bureau)
3. Tout en bas, section **Nouveau compte** :
   - **Nom** : le nom complet de la personne
   - **Identifiant** : ce qu'elle utilisera pour se connecter (ex : `marion`, `coach-fire`…) — pas d'espace, choisis quelque chose de simple
   - **Rôle** : *Coach* pour un entraîneur, *Bureau* pour quelqu'un du bureau
   - **Mot de passe provisoire** : n'importe quoi, la personne devra le changer à sa première connexion
4. Clique sur **Créer le compte**

Donne ensuite l'identifiant et le mot de passe provisoire à la personne concernée (en direct, par téléphone... pas par un canal qui traîne, c'est un mot de passe même si provisoire).

## Réinitialiser le mot de passe de quelqu'un

Si une personne a oublié son mot de passe :

1. Va dans **Comptes**
2. Sur la ligne de la personne, clique sur **Réinitialiser**
3. Entre un nouveau mot de passe provisoire
4. Valide

La personne redevra choisir son propre mot de passe à sa prochaine connexion, comme pour un premier login.

## Supprimer un compte

Dans **Comptes**, bouton **Supprimer** sur la ligne concernée (une confirmation est demandée). Tu ne peux pas supprimer ton propre compte depuis cette page — normal, ça évite de se bloquer l'accès par erreur.

⚠️ Si la personne a écrit des actualités ou assigné des homeworks, il faudra d'abord réassigner/supprimer ce contenu (la base refuse de supprimer un compte qui a du contenu lié, pour ne rien perdre par erreur).

## Gérer les équipes

Dans **Équipes** :

- La liste affiche toutes les équipes, avec leur niveau, leur nombre d'athlètes et leur(s) coach(s)
- **+ Nouvelle équipe** pour en créer une
- **Modifier** sur une équipe pour :
  - Changer son nom, niveau, catégorie, descriptions, badge, photo, statut (compétition / Group Stunt / loisirs), jours d'entraînement
  - **Assigner un ou plusieurs coachs** — coche les cases correspondantes et clique sur *Mettre à jour*. C'est ce qui donne accès aux athlètes de cette équipe au coach concerné dans son espace
  - **Ajouter/retirer des athlètes** de l'équipe, en bas de la page

Les modifications apparaissent **immédiatement** sur le site public (page équipe, page d'accueil).

## Gérer les actualités

Dans **Actualités** :

- **+ Nouvelle actualité** : titre, un court résumé (chapô), le contenu, une image de couverture (optionnelle — un chemin vers une image dans `/public/images`), et une case **Publier immédiatement**
- Tant que la case n'est pas cochée, l'actualité reste en **brouillon** — invisible du public, visible seulement dans cette liste
- **Modifier** pour republier/dépublier ou changer le contenu à tout moment
- **Supprimer** pour retirer définitivement une actualité

Les actualités publiées apparaissent sur `/actualites`, accessible depuis le menu du site public.

## Modifier ses propres informations

En haut de l'espace Bureau ou Coach, lien **Mes informations** :

- Changer son nom ou son identifiant
- Changer son mot de passe (il faut connaître l'ancien pour en mettre un nouveau)

## Ce que voit un coach

Un coach n'a accès qu'à son propre espace (`/coach`), pas à celui du bureau. Il y voit :

- La liste des athlètes des équipes qui lui sont assignées (via la fiche équipe côté bureau)
- Pour chaque athlète, l'historique des « homeworks » (exercices assignés semaine par semaine) et la possibilité d'en créer un nouveau : une semaine, une liste d'exercices, des notes optionnelles
- Une case à cocher par exercice pour marquer les devoirs faits

Un coach peut avoir plusieurs équipes ; un membre du bureau, en plus de son espace, voit **toutes** les équipes et tous les athlètes dans l'espace Coach s'il y va (utile en cas de besoin, mais l'usage normal reste : le bureau gère les équipes/actus, les coachs gèrent leurs athlètes).

## Bonnes pratiques

- Ne partage jamais ton mot de passe, même « provisoire » — si quelqu'un d'autre doit s'en servir temporairement, réinitialise-le après
- Un identifiant par personne, pas de compte partagé — ça permet de savoir qui a créé quelle actualité ou assigné quel homework
- Si quelqu'un quitte le club/le bureau, supprime son compte plutôt que de le laisser traîner
