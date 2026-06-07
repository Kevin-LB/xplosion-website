# Xplosion Website — Setup

## ⚠️ Fix the broken npm state first

The `npm audit fix --force` downgraded Next.js to v9. Fix it by deleting everything and reinstalling:

```bash
# 1. Go into the project folder
cd /Users/kevlb/Desktop/PROJET/XPLOSION/xplosion-website

# 2. Delete broken deps and lock file
rm -rf node_modules package-lock.json

# 3. Replace package.json with the correct one (copy from files provided)

# 4. Clean install
npm install

# 5. Launch dev server
npm run dev
```

Then open http://localhost:3000

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