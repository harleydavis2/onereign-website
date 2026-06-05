# OneReign Portfolio Website — AI Agent Build Prompt

---

## Project Overview

You are building the official portfolio website for **OneReign**, a startup brand built by a group of freelancers who previously worked as individuals. The website showcases their collective and individual past work under the unified OneReign identity.

**Tagline**: *Where Possibility Becomes Inevitable.*  
**Philosophy**: Hidden order revealed. Possibility realized.  
**Vision**: To become the institution where the impossible becomes inevitable.  
**Mission**: We transform possibility into reality through research, engineering, and relentless execution.

---

## Brand Identity (STRICTLY FOLLOW)

### Colors
| Role | Hex |
|---|---|
| Primary Background | `#0A0A0A` |
| Secondary Background | `#111111` |
| Surface | `#171717` |
| Primary Text | `#FAFAFA` |
| Accent 01 (Electric Blue) | `#2563EB` |
| Accent 02 (Purple) | `#7C3AED` |
| Accent 03 (Cyan) | `#06B6D4` |

Color usage rule: **80% dark neutrals, 15% white/light text, 5% accent**. Accents should feel earned — use them for CTAs, hover states, data highlights, and key UI moments only.

### Typography
| Role | Font | Weight | Size |
|---|---|---|---|
| H1 | Clash Display | Semibold | 120px / -2% tracking |
| H2 | Clash Display | Medium | 64px / -2% tracking |
| H3 | Clash Display | Regular | 36px / -1% tracking |
| Body | Satoshi | Regular | 16px / 0% tracking |
| Caption | Satoshi | Medium | 12px / +5% tracking |
| Code | JetBrains Mono | Regular | 14px / 0% |

Load Clash Display and Satoshi from CDN (Fontshare) and JetBrains Mono from Google Fonts.

### Logo
- Use the provided transparent PNG logo (`logotransparent.png`) — a 3D silver hexagonal gem with sacred geometry inner structure
- Always on dark backgrounds
- Never add drop shadows — the logo has its own depth
- Minimum size: 40px height

### Shape Language
The brand uses a vocabulary of geometric forms that evolve: **Threshold → Emergence → Expansion → Alignment → Resolution**. Use hexagons, nested polyhedra, alignment grids, and radial structures as decorative and structural elements throughout the UI.

### Motion Language
Animations must follow four states in sequence:
1. **Emerge** — Reveal through structure (fade + slight scale from 0.95)
2. **Align** — Elements find their place (translate into position)
3. **Resolve** — Order becomes clear (opacity snap to full)
4. **Stabilize** — System holds with confidence (subtle stillness)

Motion principles:
- Slow confidence (300–600ms transitions, ease-out curves)
- Precise movement (no bouncy or spring physics)
- Hidden structure (grid-aligned movement)
- Meaningful reveals (staggered, not simultaneous)
- Purposeful stillness (animations end and hold — no looping unless ambient)

---

## Website Structure

Build a **single-page website** with smooth scroll navigation. Sections in order:

### 1. Navigation (Fixed)
- OneReign logo (left)
- Nav links: Research · Engineering · Products · About · Contact
- Subtle backdrop blur on scroll
- No hamburger on desktop; full hamburger on mobile

### 2. Hero Section
- Full-viewport height
- Large H1: *"Deep research. Engineered reality."*
- Subheading (H3): *"We solve hard problems that turn possibility into inevitability."*
- Two CTAs: primary *"Explore Our Work"* (accent blue) + secondary *"About OneReign"* (ghost)
- Background: subtle animated emergence grid (dots/lines on dark) — very low opacity (~8%)
- Logo mark centered or top-left, hero text center or left-aligned

### 3. About Section
- Brand story: formed by individuals, now one — the transition from freelancers to OneReign
- Three columns: **Vision** / **Mission** / **Philosophy**
- Use caption-style labels (spaced uppercase, small)
- Decorative: faint geometric shapes in the background

### 4. Services Section
- What OneReign offers: Research · Engineering · Design · Products · Platforms
- Icon per service (use SVG hexagon-framed icons matching the brand icon library)
- Each card: icon + title + 1-line description

### 5. Work / Portfolio Section
- Headline: *"Projects that mattered."*
- Filter bar: All · Design · Engineering · Research · Product
- Project cards in a 3-column grid (2 on tablet, 1 on mobile)
- Each card: project thumbnail/image, category badge, project name, 1-line description, tools used as small tags, "View Project →" link
- On hover: subtle lift (transform: translateY(-4px)), faint blue border glow
- Note: Project data will be supplied separately. Use placeholder cards for now with realistic dummy data.

### 6. Team Section
- Headline: *"The individuals behind OneReign."*
- Profile cards: photo (or initials avatar), name, role, short bio, social links (LinkedIn, GitHub, Dribbble)
- 3-4 columns

### 7. Contact Section
- Headline: *"Let's build something inevitable."*
- Subtext: email address + social links
- Simple contact form: Name, Email, Message, Send button (accent blue)
- Background: photonic accent (light bleed / gradient glow from one corner)

### 8. Footer
- Logo + tagline
- Navigation links
- Copyright line
- Five brand pillars listed as spaced text: POSSIBILITY · EMERGENCE · ALIGNMENT · RESOLUTION · INEVITABILITY

---

## Technical Requirements

- **Stack**: React (functional components + hooks) with Vite, OR pure semantic HTML5 + CSS3 + vanilla JS — choose whichever produces cleaner output
- **Styling**: CSS custom properties (variables) for the entire design system; no Tailwind — write real CSS
- **Animations**: CSS transitions and keyframes for most; JS IntersectionObserver for scroll reveals
- **Images**: Use `<img>` tags with `loading="lazy"`; accept placeholder URLs for now
- **Responsive**: Mobile-first; breakpoints at 768px (tablet) and 1280px (desktop)
- **Accessibility**: Semantic HTML, ARIA labels on icons, sufficient color contrast
- **Performance**: No unnecessary libraries; keep bundle lean
- **File structure**:

```
onereign-website/
├── index.html
├── style.css (or src/styles/)
├── main.js (or src/main.jsx)
├── assets/
│   └── logo.png
├── components/ (if React)
│   ├── Nav.jsx
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Services.jsx
│   ├── Portfolio.jsx
│   ├── Team.jsx
│   ├── Contact.jsx
│   └── Footer.jsx
├── BUILD_LOG.md
└── TODO.md
```

---

## Logging Requirements (MANDATORY)

You must maintain two markdown files throughout the build:

### BUILD_LOG.md
Log every significant action you take:
- What you built / changed
- Why a decision was made
- Any issues encountered and how you resolved them
- Format: `## Session [N] — [Date]` with bullet points under each

### TODO.md
A living checklist of all tasks:
- Use `[ ]` for pending, `[~]` for in progress, `[x]` for done
- Organized into phases: Foundation, Design System, Sections, Animation, Responsive, Deploy
- Update it as you complete tasks — mark things done as you go

---

## Aesthetic Direction

This website must feel like a **premium deep-tech institution** — not an agency, not a freelancer marketplace. Think: the intersection of a hedge fund's restraint and a research lab's precision. Every pixel should feel intentional.

References to keep in mind (aesthetically, not to copy):
- Stripe's typographic confidence
- Linear's dark-mode polish
- Vercel's purposeful minimalism
- But with OneReign's own geometric, emergent identity layered on top

**What to avoid**:
- Purple gradient on white (generic AI look)
- Glassmorphism for its own sake
- Excessive particle animations
- Anything that looks like a SaaS landing page template

**What to lean into**:
- Deep blacks with true contrast
- Typography doing the heavy lifting
- Geometric shapes as design elements, not decoration
- Animations that feel earned and intentional
- Space — generous negative space that makes content breathe

---

## Starting Instruction

Begin by:
1. Reading and logging in BUILD_LOG.md that you are starting the build
2. Creating the full project structure
3. Setting up the design system (CSS variables, font imports)
4. Building the Nav and Hero sections first — get the first impression perfect
5. Update TODO.md as you complete each step

Work section by section. Do not rush. Quality over speed.
