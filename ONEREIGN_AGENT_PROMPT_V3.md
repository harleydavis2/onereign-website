# OneReign Portfolio Website — Agent Prompt V3
> ⚠️ This supersedes ALL previous prompt files. Read ONLY this one.

---

## What You Are Building

The official website for **OneReign** — a web development and digital products company. This is not a simple portfolio. This is the company's primary trust signal. Clients will judge the company's capability entirely from this website. It must look visibly more sophisticated than anything a client could build themselves.

**The bar**: A senior creative director at a top-tier digital agency would be proud to show this to a Fortune 500 client.

**Tagline**: *Where Possibility Becomes Inevitable.*  
**Mission**: We transform possibility into reality through research, engineering, and relentless execution.  
**Philosophy**: Hidden order revealed. Possibility realized.

---

## CRITICAL RULES — Read Before Anything Else

1. **THE LOGO NEVER MOVES.** No rotation. No spin. No pulse. No float. No scale animation. No breathing. The logo image (`logotransparent.png`) does ONE thing: fades in on page load (opacity 0 → 1, 600ms). After that, it is completely still. If you find ANY transform or animation on the logo element, delete it immediately.

2. **NO PLAIN BACKGROUNDS.** Every single section must have a geometric pattern, texture, or 3D canvas behind it. A flat `#0A0A0A` background with no texture is a failure. Every section has its assigned background system — follow it exactly.

3. **THREE.JS IS REQUIRED.** The site must have 4 distinct Three.js interactive 3D elements. These are not optional. They are what separates this site from every other agency website.

4. **FONT SIZES ARE LARGE.** H1 is 96px minimum on desktop. The hierarchy must be commanding and immediate.

5. **BUILD ONE TASK AT A TIME.** After completing each task, mark it `[x]` in `TODO_V3.md`, append to `BUILD_LOG.md`, then stop and report what was done and what is next.

---

## Brand Identity

### Color System
```
--bg-primary:    #0A0A0A   (main background)
--bg-secondary:  #111111   (cards, nav)
--surface:       #171717   (elevated surfaces)
--text-primary:  #FAFAFA   (headings, primary text)
--text-muted:    rgba(250,250,250,0.5)
--accent-blue:   #2563EB   (primary accent — CTAs, glows, active)
--accent-purple: #7C3AED   (secondary accent — subtle use only)
--accent-cyan:   #06B6D4   (tertiary accent — data, highlights)
--border:        rgba(255,255,255,0.08)
--border-hover:  rgba(37,99,235,0.6)
```
Rule: **80% dark · 15% white text · 5% accent**. Accent colors are precious. Never fill large areas with them.

### Typography
Load these fonts first, before anything else:
```html
<link href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=satoshi@400,500,700&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

| Role | Font | Weight | Desktop Size | Tracking |
|---|---|---|---|---|
| H1 | Clash Display | 600 | 96–120px | -0.02em |
| H2 | Clash Display | 500 | 56–72px | -0.02em |
| H3 | Clash Display | 400 | 32–40px | -0.01em |
| Body | Satoshi | 400 | 17px | 0 |
| Caption | Satoshi | 500 | 12px | 0.08em, UPPERCASE |
| Code | JetBrains Mono | 400 | 14px | 0 |

### Logo
- File: `assets/logotransparent.png`
- **Only allowed animation: opacity 0 → 1, duration 600ms, once on page load**
- Never: rotate, spin, scale, pulse, float, translate, or any transform whatsoever
- Nav height: 36px. Hero standalone: 72px.
- Always on dark backgrounds. No drop shadows added via CSS.

---

## Three.js 3D Elements

Load Three.js via CDN in index.html:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
```
**Do NOT import OrbitControls** — it is not available in r128 CDN. Implement manual mouse rotation using `pointermove` events.

---

### Element 1 — Hero Particle Field (hero-canvas.js)

A full-viewport WebGL canvas positioned fixed behind the hero section.

```javascript
// Setup
const canvas = document.getElementById('hero-canvas');
// position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; pointer-events: none;

// Scene contents:
// - 120 nodes: small SphereGeometry(0.8), MeshBasicMaterial color #2563EB, opacity 0.5
// - Nodes drift in 3D space with random velocity vectors, speed 0.0003
// - On each frame: draw lines (LineSegments) between nodes closer than 150 units apart
// - Line material: LineBasicMaterial color #FAFAFA, opacity 0.06, transparent: true
// - On mousemove: nearest 15 nodes gently lerp toward cursor position (factor 0.015)
// - Canvas opacity transitions to 0 as user scrolls past hero height (window.scrollY / heroHeight)
```

---

### Element 2 — Hero Hex Geometry (hero-hex.js)

An interactive 3D polyhedron in the right side of the hero.

```javascript
// Canvas: 500x500px, positioned in right 45% of hero, hidden on mobile (< 768px)
// Geometry: new THREE.IcosahedronGeometry(120, 1)
// Material: MeshStandardMaterial({ color: 0xCCCCCC, metalness: 0.9, roughness: 0.1, wireframe: false })
// Add a wireframe overlay: MeshBasicMaterial({ color: 0x2563EB, wireframe: true, opacity: 0.15, transparent: true })

// Lighting:
// - PointLight(0x2563EB, 2.5, 500) at position (200, 200, 200)
// - AmbientLight(0xffffff, 0.25)
// - DirectionalLight(0xffffff, 0.8) at position (-100, 200, 100)

// Animation:
// - Default: mesh.rotation.y += 0.001 per frame (slow, confident)
// - On pointer enter canvas: rotation.y speed → 0.004
// - On pointer leave: speed lerps back to 0.001 over 60 frames
// - Manual drag rotation: track pointerdown, pointermove, pointerup
//   dragDelta: { x: event.clientX - lastX, y: event.clientY - lastY }
//   mesh.rotation.y += dragDelta.x * 0.005
//   mesh.rotation.x += dragDelta.y * 0.005

// Fade in on load: canvas opacity 0 → 1 at 1000ms after page load
```

---

### Element 3 — Service Card 3D Icons (service-icons.js)

Five small Three.js canvases, one per service card. Each 80x80px.

```javascript
// For each service card, create a renderer with canvas 80x80, alpha: true
// Geometries by service:
//   Engineering:  new THREE.TorusKnotGeometry(20, 6, 64, 8)
//   Design:       new THREE.IcosahedronGeometry(22, 0)
//   Research:     new THREE.OctahedronGeometry(25, 0)
//   Products:     new THREE.BoxGeometry(30, 30, 30)
//   Platforms:    new THREE.TorusGeometry(20, 7, 16, 32)

// Material for all: MeshStandardMaterial({ color: 0x2563EB, metalness: 0.8, roughness: 0.2 })
// Lighting: PointLight(0x2563EB, 3, 200) + AmbientLight(0xffffff, 0.4)

// Animation:
// - Default: mesh.rotation.x += 0.008, mesh.rotation.y += 0.012
// - On card mouseenter: pause rotation (store current rotation, stop animating)
// - On card mouseleave: resume rotation
```

---

### Element 4 — About Section Mesh Background (about-mesh.js)

A subtle undulating wireframe plane behind the About section.

```javascript
// Canvas: full width and height of about section, position: absolute, z-index: 0
// Geometry: new THREE.PlaneGeometry(2000, 800, 40, 20)
// On each frame: displace vertices on Y axis:
//   vertex.y = Math.sin(vertex.x * 0.01 + time) * 15 + Math.cos(vertex.z * 0.01 + time * 0.7) * 10
// Material: MeshBasicMaterial({ color: 0x2563EB, wireframe: true, opacity: 0.07, transparent: true })
// Camera: OrthographicCamera or PerspectiveCamera tilted down at 45°
// No lights needed (wireframe ignores lighting)
// time += 0.003 per frame
```

---

## Background Patterns

All patterns are pure CSS/SVG — no external files. Apply as `::before` pseudo-elements or absolute positioned divs with `pointer-events: none; z-index: 0;`.

### Pattern A — Emergence Grid (Hero, Footer)
```css
background-image: radial-gradient(circle, rgba(250,250,250,0.06) 1px, transparent 1px);
background-size: 32px 32px;
```

### Pattern B — Hexagonal Mesh (Services, Portfolio)
Use an inline SVG pattern with `<polygon>` hexagon outlines:
```html
<svg style="position:absolute;inset:0;width:100%;height:100%;opacity:0.05;pointer-events:none">
  <defs>
    <pattern id="hexgrid" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
      <polygon points="30,2 58,17 58,47 30,62 2,47 2,17" fill="none" stroke="#2563EB" stroke-width="0.5"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#hexgrid)"/>
</svg>
```

### Pattern C — Diagonal Noise Lines (About)
```css
background-image: repeating-linear-gradient(
  45deg,
  transparent,
  transparent 7px,
  rgba(250,250,250,0.025) 7px,
  rgba(250,250,250,0.025) 8px
);
```

### Pattern D — Radial Burst (Contact)
Inline SVG: 24 lines from a point at 75% right, 50% vertical. Stroke `#7C3AED`, opacity 0.08, length 600px.

### Pattern E — Resolution Pattern (Team)
Inline SVG: 6 concentric hexagons centered in section, sizes 100 to 700px, stroke `#FAFAFA` opacity 0.04.

### Global Noise Texture (entire page)
Add to `body::after`:
```css
body::after {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  opacity: 0.025;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
}
```

---

## Page Sections

### 1. Navigation
- `position: fixed; top: 0; width: 100%; z-index: 1000`
- `background: rgba(10,10,10,0.85); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(255,255,255,0.06)`
- Left: logo img (static — fade in once, never moves again)
- Center/Right: links — Research · Engineering · Products · About · Contact
- Far Right: "Get in Touch" button — `background: #2563EB; border-radius: 6px; padding: 8px 16px`
- On scroll > 80px: `border-bottom-color` increases to `rgba(255,255,255,0.12)`
- Mobile: hamburger → full screen `position: fixed` overlay, `background: #0A0A0A`, links stagger in

### 2. Hero Section
- `min-height: 100vh; display: grid; grid-template-columns: 55% 45%; align-items: center`
- Background layers (bottom to top): Particle Field canvas (fixed) → Emergence Grid pattern → content
- Left column:
  - Caption: `WHERE POSSIBILITY BECOMES INEVITABLE` (Satoshi, 12px, 0.08em tracking, `--accent-blue` color)
  - H1: `Deep research.` (line break) `Engineered reality.` — 96px desktop, 56px mobile
  - Body: `We build the systems that turn possibility into inevitability. Research-driven. Engineering-first. Relentlessly executed.`
  - CTA row: `[Explore Our Work]` (solid blue) + `[About OneReign]` (ghost: transparent bg, white border)
  - Trust stats: `12+ Projects · 6 Domains · 100% Client Retention` — small caps, muted color
- Right column: Three.js hex geometry canvas (Element 2)
- Staggered load animation:
  ```
  0ms    bg canvas fades in
  200ms  nav slides down
  400ms  logo fades in  
  500ms  caption appears
  580ms  H1 line 1 slides up (translateY 20px → 0)
  660ms  H1 line 2 slides up
  740ms  body text fades in
  820ms  CTAs fade in
  900ms  trust stats fade in
  1000ms 3D hex canvas fades in
  ```

### 3. Marquee Bar
- `height: 48px; background: #111111; overflow: hidden; border-top/bottom: 1px solid var(--border)`
- Inner div: `display: flex; width: max-content; animation: marquee 35s linear infinite`
- Text: `RESEARCH · ENGINEERING · DESIGN · PRODUCTS · PLATFORMS · DEEP WORK · EMERGENT SYSTEMS · INEVITABLE OUTCOMES ·` — duplicated twice for seamless loop
- `font: 11px/48px Satoshi; letter-spacing: 0.1em; color: rgba(250,250,250,0.35); text-transform: uppercase`

### 4. About Section
- Background: Element 4 (mesh canvas) + Pattern C (diagonal lines)
- Layout: 50/50 grid
- Left: H2 pull quote — `"We don't just build products. We engineer inevitability."` — 56px, left-aligned
- Right: Three stacked blocks, each with:
  - `border-left: 2px solid [accent color]; padding-left: 20px; margin-bottom: 32px`
  - Caption label (VISION / MISSION / PHILOSOPHY)
  - 2–3 lines of body text
  - Vision: blue border · Mission: purple border · Philosophy: cyan border
- Bottom full-width: `POSSIBILITY · EMERGENCE · ALIGNMENT · RESOLUTION · INEVITABILITY` in 11px caps, 0.2em tracking, 40% opacity

### 5. Services Section
- Background: Pattern B (hex mesh)
- Caption + H2: `Every problem has a structure. We find it.`
- 5 cards in a CSS grid (`grid-template-columns: repeat(5, 1fr)` → `repeat(2, 1fr)` tablet → `1fr` mobile)
- Each card: `background: #111111; border: 1px solid var(--border); border-radius: 12px; padding: 28px 24px`
  - Three.js canvas 80x80px at top
  - Service name (H3, 22px)
  - 2-line description (body)
  - `→` arrow link
- Hover: `border-color: var(--accent-blue); transform: translateY(-4px); transition: all 200ms ease`

### 6. Portfolio Section
- Background: Pattern B (hex mesh)
- Caption + H2: `Projects that mattered.`
- Filter pills: All · Design · Engineering · Research · Product
  - Active pill: `background: #2563EB; color: white`
  - Inactive: `background: transparent; border: 1px solid var(--border); color: var(--text-muted)`
- Grid: `grid-template-columns: repeat(3, 1fr)` → 2 → 1
- 6 placeholder project cards:
  1. "Nexus Dashboard" — Engineering — React, Node.js, PostgreSQL
  2. "Forma Identity" — Design — Figma, Illustrator, Brand Strategy
  3. "Pulse Analytics" — Product — Python, D3.js, FastAPI
  4. "Meridian Research Platform" — Research — Next.js, ML pipeline, Vector DB
  5. "Orbit E-commerce" — Engineering — Shopify, Tailwind, Stripe
  6. "Signal Brand System" — Design — Brand Identity, Motion, Web
- Card: thumbnail (placeholder gradient 16:9) → badge → H3 title → 1-line desc → tool tags → `View Project →`
- Hover: `transform: translateY(-6px); box-shadow: 0 -2px 0 0 #2563EB inset`

### 7. Team Section
- Background: Pattern E (concentric hexagons)
- Caption + H2: `Individuals united by one mission.`
- 3 or 4 cards (use placeholder names/roles)
  - Avatar: 64px circle with initials, `background: linear-gradient(135deg, #2563EB, #7C3AED)`
  - Name (H3, 22px) · Role (caption) · 2-line bio (body, muted)
  - Social icons: GitHub + LinkedIn (SVG icons, 18px, muted → white on hover)
- Card hover: `transform: scale(1.02); border-color: var(--border-hover)`

### 8. Contact Section
- Background: Pattern D (radial burst) + `radial-gradient(ellipse at 80% 100%, rgba(37,99,235,0.06), transparent 60%)`
- Caption + H2: `Something inevitable starts with a conversation.`
- Layout: 50/50 grid
- Left — Form:
  - Name input, Email input, Project Type dropdown (Website / App / Brand / Research / Other), Message textarea (4 rows), Send button (full width, solid blue)
  - Input style: `background: #111111; border: 1px solid var(--border); border-radius: 8px; padding: 12px 16px; color: #FAFAFA`
  - Focus: `border-color: #2563EB; box-shadow: 0 0 0 3px rgba(37,99,235,0.15)`
- Right — Info:
  - "Or reach us directly" label
  - Email address (large, Clash Display, link)
  - Response time note in muted body text
  - Social links: LinkedIn, GitHub, Twitter/X icons

### 9. Footer
- Background: Pattern A (dot grid)
- Top: logo (static) left + tagline right
- Middle: 3 columns — Company (About, Services, Work, Team) · Work (All Projects, Case Studies) · Connect (Email, LinkedIn, GitHub)
- Bottom bar: `© 2026 OneReign` left + `POSSIBILITY · EMERGENCE · ALIGNMENT · RESOLUTION · INEVITABILITY` right
- `border-top: 1px solid var(--border)`

---

## Animation Rules

### Scroll Reveals (IntersectionObserver)
```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

// CSS:
// .reveal { opacity: 0; transform: translateY(30px); transition: opacity 600ms ease-out, transform 600ms ease-out; }
// .reveal.visible { opacity: 1; transform: translateY(0); }
// .reveal:nth-child(2) { transition-delay: 80ms; }
// .reveal:nth-child(3) { transition-delay: 160ms; }
// ... etc
```

### Strictly Forbidden
- Logo animation of any kind (other than the single fade-in)
- Bounce, spring, or elastic easing
- Particle explosions or dramatic bursts
- Looping animations except the marquee
- Purple gradient on white backgrounds
- Generic template layouts
- Inter, Roboto, or system fonts

---

## File Structure
```
onereign-website/
├── index.html
├── style.css
├── main.js
├── hero-canvas.js       ← Three.js particle field
├── hero-hex.js          ← Three.js hex geometry
├── service-icons.js     ← Three.js service icons
├── about-mesh.js        ← Three.js about background
├── assets/
│   └── logotransparent.png
├── BUILD_LOG.md         ← APPEND ONLY — do not recreate
└── TODO_V3.md           ← Mark tasks as done, do not recreate
```

---

## How to Work

1. Read `BUILD_LOG.md` to understand what has been done
2. Read `TODO_V3.md` and find the first `[ ]` task
3. Do ONLY that one task — nothing else
4. Append a new entry to `BUILD_LOG.md`:
   ```
   ## Session [N] — [Date]
   ### Completed: [task name]
   - What was built
   - Any decisions or issues
   ```
5. Mark the task `[x]` in `TODO_V3.md`
6. Stop. Report: what you completed and what the next task is.

When you get the reply "continue" or "next", proceed to the next task.
