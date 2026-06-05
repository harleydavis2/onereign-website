# OneReign Website — TODO Tracker

> Living document. Update status as work progresses.  
> Status: `[ ]` = pending · `[~]` = in progress · `[x]` = done

---

## Phase 1 — Foundation & Planning
- [x] Collect brand assets (logo, style guide)
- [x] Define color system from brand guide
- [x] Define typography system from brand guide
- [x] Write project prompt for AI/agent handoff
- [x] Create BUILD_LOG.md
- [x] Create TODO.md (this file)
- [x] Finalize list of portfolio projects to showcase — placeholder data created in `assets/projects-data.json` (real data TBD)
- [x] Decide tech stack — **Pure HTML5 + CSS3 + Vanilla JS** (no build step, leanest bundle, cleaner for static single-page)
- [x] Set up project folder structure — `index.html`, `style.css`, `main.js`, `assets/`, all created

## Phase 2 — Design System Setup
- [x] Import/configure fonts — Clash Display + Satoshi (Fontshare CDN), JetBrains Mono (Google Fonts), CSS vars set
- [x] Define CSS variables — full token system: colors, type scale, spacing, z-index, radii, shadows, gradients, motion, opacity
- [x] Build reusable UI components — Card (hover lift + glow), Badge (4 category variants), Tag (code chip), Section divider (gradient + geo), scroll reveal classes
- [x] Set up background system — noise texture (CSS SVG grain), emergence grid (dot matrix + scan animation), radial glow, resolution pattern, section alternation
- [x] Create logo component — `.logo`, `.logo--nav` (40px), `.logo--footer` (32px), `.logo--hero` (64px), no drop-shadow per brand rule

## Phase 3 — Page Sections (Homepage / Single Page)
- [x] **Hero Section** — full-viewport, label + H1 + accent gradient + H3 + 2 CTAs, emergence grid BG, staggered entrance animation (Emerge→Align→Resolve→Stabilize), scroll indicator
- [x] **About / Brand Section** — brand story, 2-col intro + stats (5+yrs / 12+ projects / 4 disciplines), 3-pillar cards (Vision/Mission/Philosophy), decorative hexagon SVG, scroll reveals
- [x] **Services Section** — What the team offers (e.g. design, engineering, research)
- [x] **Portfolio / Work Section** — Grid/masonry of past freelancing projects with filters
- [x] **Team Section** — Individual profiles (since projects were done as individuals)
- [x] **Contact Section** — Email, social links, CTA form or link
- [x] **Footer** — Logo, nav links, tagline, socials

## Phase 4 — Portfolio Project Cards
- [x] Gather project data: title, category, description, tools used, outcome, image/screenshot — all 6 projects complete in `projects-data.json` + `main.js`
- [x] Design project card component — done in Session 7 (thumb, badge, title, desc, outcome, tags, link)
- [x] Add filter by category (Design / Engineering / Research / etc.) — done in Session 7
- [x] Add project detail modal or separate page per project — click-to-open lightbox with badge, title, description, outcome block, tools, and CTA link

## Phase 5 — Animations & Motion
- [x] Page load: staggered hero reveal (logo → headline → tagline → CTA) — done in Session 4 (`.hero--loaded` + staggered CSS keyframe delays)
- [x] Scroll-triggered section reveals — done in Session 6 (IntersectionObserver + `.reveal` / `.reveal-stagger`)
- [x] Hover states on project cards (subtle lift, accent glow) — done in Session 7 (`translateY(-4px)` + layered blue glow `box-shadow`)
- [x] Background: subtle animated emergence grid or noise — done in Sessions 4–5 (`.emergence-grid::after` grid-scan keyframe + `.bg-noise` SVG grain)
- [x] Logo animation (optional: slow rotation or pulse) — 45 s/revolution ambient rotation on `.logo--nav img`; `will-change: transform`; 1.2 s delay

## Phase 6 — Responsive & Polish
- [x] Mobile layout (hamburger nav, stacked sections, touch-friendly cards) — 44×44 touch targets, touch-action, hover:none reset, hero left-align, section padding, iOS scroll, CTA stacking, tap-selection guard
- [x] Tablet breakpoint adjustments — three-range block: ≤1280px (nav/container), 769–1024px (hero left-align, about gap, service/team card padding, footer pillars), 1025–1280px (card padding fine-tune)
- [x] Performance audit (image optimization, lazy loading) — defer on script, preconnect Fontshare, logo preload + fetchpriority=high, dns-prefetch fallbacks, content-visibility:auto on all below-fold sections, will-change on animated elements
- [x] Accessibility pass (contrast ratios, keyboard nav, alt text) — skip link, main landmark, focus-visible rings, form labels, aria-pressed filters, modal focus trap
- [x] Cross-browser testing — svh→vh fallbacks (4×), IO feature detection + fallback, clip→clip-path, webkit-autofill override; backdrop-filter/-webkit- already present

## Phase 7 — Deployment
- [ ] Choose hosting (Vercel / Netlify / GitHub Pages)
- [ ] Set up domain (onereign.ai or similar)
- [ ] Deploy production build
- [ ] Configure OG tags and meta for social sharing

---

## Backlog / Nice-to-Have
- [ ] Dark/light mode toggle
- [ ] Blog or research paper section
- [ ] Case study deep-dive pages
- [ ] Analytics integration
- [ ] Loading screen with logo animation

---

_Last updated: 2026-06-05 (Session 18)_
