# Xplosion Website

Site du club Xplosion Cheerleaders Orléans : vitrine publique + espaces privés (Bureau / Coachs) avec base de données.

**Pour relancer le projet après avoir éteint ton PC** → [GUIDE_RELANCE.md](./GUIDE_RELANCE.md)
**Pour l'installation complète, les migrations, le déploiement** → [GUIDE_DEMARRAGE.md](./GUIDE_DEMARRAGE.md)
**Pour apprendre à utiliser l'espace Bureau/Coach (comptes, équipes, actualités, homeworks)** → [GUIDE_UTILISATEUR.md](./GUIDE_UTILISATEUR.md)

---

## Project structure

```
src/
  app/
    layout.tsx          ← Root layout (fonts, navbar, footer)
    page.tsx            ← Homepage
    equipes/page.tsx    ← All teams
    palmares/page.tsx   ← Full history
    inscriptions/page.tsx
    evenements/page.tsx
    partenaires/page.tsx
  components/
    layout/
      Navbar.tsx        ← Fixed nav, scroll-aware, mobile menu
      Footer.tsx
    sections/
      Hero.tsx          ← Hero + Ticker
      TeamsSection.tsx
      PalmaresSection.tsx
      DisciplineSection.tsx
      ValuesSection.tsx
      CtaAndPartners.tsx
  lib/
    data.ts             ← All content (teams, results, partners…)
    utils.ts            ← cn() helper
  styles/
    globals.css         ← Design tokens + base styles
```

## Stack

- **Next.js 15** (App Router)
- **React 19**
- **Tailwind CSS v4** (CSS-first, @import syntax)
- **Framer Motion 12** (animations)
- **Fonts**: Playfair Display (serif titles) + Barlow / Barlow Condensed (sans body/labels)

## Design tokens (globals.css)

| Token | Value | Usage |
|-------|-------|-------|
| `--cream` | #F5F2EE | Main background |
| `--cream-2` | #EDE9E3 | Section backgrounds |
| `--ink` | #1A1A1A | Primary text |
| `--fire` | #C8401A | Accent / CTA |
| `--gold` | #B8963E | Champion rank |
| `--muted` | #8A8680 | Secondary text |
| `--border` | #DDD9D2 | Dividers |

---

## Back-end, authentification & portails privés

Le site est une application dynamique : Postgres (via Prisma) pour les données, Auth.js (NextAuth v5) pour l'authentification par identifiant + mot de passe, avec deux rôles (`ADMIN` = bureau, `COACH` = entraîneur) et deux portails privés (`/admin`, `/coach`).

Toutes les commandes (installation, migrations, dépannage, déploiement) sont dans [GUIDE_DEMARRAGE.md](./GUIDE_DEMARRAGE.md). Le fonctionnement de l'appli côté utilisateur (créer des comptes, gérer les équipes/actualités/homeworks) est dans [GUIDE_UTILISATEUR.md](./GUIDE_UTILISATEUR.md).