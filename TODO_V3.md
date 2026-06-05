# OneReign Website — TODO V3
> ⚠️ This replaces all previous TODO files. Use this one only.  
> Status: `[ ]` pending · `[~]` in progress · `[x]` done

---

## Phase 1 — Foundation
- [x] Set up project folder structure (index.html, style.css, main.js, three-*.js files, assets/)
- [x] Add logo PNG to assets folder
- [x] Load fonts via CDN (Clash Display + Satoshi via Fontshare, JetBrains Mono via Google Fonts)
- [x] Define all CSS custom properties in `:root` (colors, spacing, radius, transitions)
- [x] Add global base styles (reset, body, scrollbar, selection color)
- [x] Add full-page CSS noise texture via inline SVG `feTurbulence` filter at 2% opacity

## Phase 2 — Background System (Geometric Patterns)
- [x] **Pattern A — Emergence Grid**: SVG dot grid (1px dots, 32px spacing, 6% white opacity) — used in Hero + Footer
- [x] **Pattern B — Hexagonal Mesh**: SVG repeating hex outline grid (0.5px stroke, blue 5% opacity) — used in Services + Portfolio
- [x] **Pattern C — Diagonal Noise Lines**: CSS repeating-linear-gradient 45°, 3% white, 8px repeat — used in About
- [x] **Pattern D — Radial Burst**: SVG 24 radial lines from center-right, purple 8% opacity — used in Contact
- [x] **Pattern E — Resolution Pattern**: SVG concentric hexagons 800px centered, 4% white opacity — used in Team
- [x] Apply correct pattern to each section as absolute background layer

## Phase 3 — Three.js 3D Elements
- [x] **Element 1 — Hero Particle Field**: WebGL canvas, drifting connected nodes (blue), mouse pull interaction, fades on scroll
- [x] **Element 2 — Hero Hex Geometry**: IcosahedronGeometry wireframe, slow Y-axis rotation (0.001 rad/frame), mouse drag rotation, blue point light, right side of hero
- [x] **Element 3 — Service Card Icons**: 5 small 80px canvases per service card (TorusKnot, Icosahedron, Octahedron, Box, Torus), blue metallic material, pause on hover
- [x] **Element 4 — About Mesh Background**: Undulating sine-wave grid plane, very low opacity wireframe, calm ocean motion

## Phase 4 — Navigation
- [x] Fixed nav: glassmorphism background (`rgba(10,10,10,0.8)` + `backdrop-filter: blur(20px)`)
- [x] Left: static logo (fade-in on load, NO other animation ever)
- [x] Right: nav links + "Get in Touch" CTA button
- [x] Scroll behavior: border becomes more visible past 80px scroll
- [x] Mobile: hamburger icon → full-screen overlay menu with staggered link reveals

## Phase 5 — Hero Section
- [x] Full viewport height layout (left 55% text, right 45% Three.js canvas)
- [x] Caption label: `WHERE POSSIBILITY BECOMES INEVITABLE`
- [x] H1 two lines: `Deep research.` / `Engineered reality.`
- [x] Body copy + two CTA buttons (solid blue + ghost outline)
- [x] Trust stats bar: `12+ Projects · 6 Domains · 100% Client Retention`
- [x] Staggered entrance animation sequence (10 steps, 80ms apart)
- [x] Background: Particle Field (Element 1) + Emergence Grid (Pattern A) layered

## Phase 6 — Marquee Trust Bar
- [x] Full-width scrolling marquee between Hero and About
- [x] Text: `RESEARCH · ENGINEERING · DESIGN · PRODUCTS · PLATFORMS · DEEP WORK · EMERGENT SYSTEMS · INEVITABLE OUTCOMES ·`
- [x] `animation: marquee 30s linear infinite`, duplicated for seamless loop
- [x] Background `#111111`, text 40% white opacity, Satoshi caption style

## Phase 7 — About Section
- [x] Background: About Mesh (Element 4) + Diagonal Noise (Pattern C)
- [x] Left: large H2 pull quote
- [x] Right: Vision / Mission / Philosophy blocks with colored left-border accents
- [x] Bottom: horizontal divider with five brand pillars in spaced caps

## Phase 8 — Services Section
- [x] Caption + H2
- [x] 5 service cards with Three.js canvas icons (Element 3)
- [x] Card styles: dark surface, subtle border, hover → blue border
- [x] Background: Hexagonal Mesh (Pattern B)
- [x] Horizontal scroll on mobile

## Phase 9 — Portfolio / Work Section
- [x] Caption + H2
- [x] Filter pills: All · Design · Engineering · Research · Product
- [x] 3-column grid → 2 tablet → 1 mobile
- [x] 6 realistic placeholder project cards
- [x] Card anatomy: thumbnail → badge → title → description → tool tags → link
- [x] Hover: translateY(-6px) + blue top border glow
- [x] Filter JS: show/hide cards by category
- [x] Background: Hexagonal Mesh (Pattern B)

## Phase 10 — Team Section
- [x] Caption + H2
- [x] 3–4 profile cards with initials avatar (gradient background), name, role, bio, social icons
- [x] Card hover: scale(1.02) + border accent
- [x] Background: Resolution Pattern (Pattern E)

## Phase 11 — Contact Section
- [x] Caption + H2
- [x] Left: contact form (Name, Email, Project Type dropdown, Message, Send)
- [x] Right: email, response time, social links
- [x] Form input styles: dark surface, focus → blue border glow
- [x] Background: Radial Burst (Pattern D) + bottom-right photonic glow

## Phase 12 — Footer
- [x] Logo (static) + tagline
- [x] Three link columns: Company / Work / Connect
- [x] Bottom bar: copyright + five brand pillars
- [x] Background: Emergence Grid (Pattern A)

## Phase 13 — Scroll Reveals & Micro-interactions
- [x] IntersectionObserver on all sections (threshold 0.15)
- [x] Entry animation: opacity 0 + translateY(30px) → opacity 1 + translateY(0), 600ms ease-out
- [x] Card stagger: each card delays by `index * 80ms`
- [x] Nav link hover: underline slides in via CSS `::after`
- [x] Button hover: glow + lighten

## Phase 14 — Responsive
- [x] Mobile layout (< 768px): single column, hamburger nav, hidden 3D hex
- [x] Tablet (768–1280px): 2-column grid, adjusted font sizes
- [x] Test all sections at 375px, 768px, 1280px, 1920px

## Phase 15 — Polish & QA
- [x] Check no logo rotation/animation exists anywhere in code
- [x] Verify all 5 background patterns are applied to correct sections
- [x] Verify all 4 Three.js elements initialize without errors
- [x] Check font loading (Clash Display rendering correctly)
- [x] Accessibility: alt text, ARIA labels, keyboard nav
- [x] Performance: lazy load images, check canvas frame rate
- [x] Cross-browser: Chrome, Firefox, Safari

## Phase 16 — Deployment
- [ ] Initialize GitHub repo, push all files
- [ ] Connect to Vercel, configure build settings
- [ ] Add custom domain
- [ ] Configure OG meta tags (title, description, image)
- [ ] Final production deploy
- [ ] Log deploy URL in BUILD_LOG.md

---

_Last updated: 2026-06-05 — V3_
