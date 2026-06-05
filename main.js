/* ════════════════════════════════════════════════════
   OneReign — Main Script
   Handles: nav scroll, hamburger, hero animation,
            scroll reveals, services rendering,
            portfolio filters, contact form.
   Project data: mirrors assets/projects-data.json
                 (inlined to avoid file:// fetch restrictions)
   ════════════════════════════════════════════════════ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* ─── Navigation: scroll state ─── */
  const nav = document.getElementById('nav');
  const scrollThreshold = 20;

  function onScroll() {
    if (window.scrollY > scrollThreshold) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  /* ─── Navigation: mobile hamburger ─── */
  const hamburger = document.getElementById('nav-hamburger');
  const navLinks  = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!isOpen));
    navLinks.classList.toggle('nav__links--open', !isOpen);
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('nav__links--open');
    });
  });

  /* ─── Hero: entrance animation ─── */
  const hero = document.querySelector('.hero');
  if (hero) {
    // Small delay so fonts have a chance to load
    requestAnimationFrame(() => {
      setTimeout(() => {
        hero.classList.add('hero--loaded');
      }, 80);
    });
  }

  /* ─── Scroll reveal: IntersectionObserver ─── */
  /*
   * Feature-detected: Safari < 12.1 (2019) doesn't support IO.
   * Fallback: immediately add is-visible to all reveal elements so
   * no content stays hidden on unsupported browsers.
   * Declared at callback scope so Services/Portfolio/Team all share
   * the same observer instance after injecting their DOM.
   */
  const revealObserver = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.10, rootMargin: '0px 0px -40px 0px' })
    : null; /* IO not available — will fall back to instant reveal below */

  /* ─── Services: render cards ─── */
  /*
   * Rendered BEFORE the observer registration sweep below, so the
   * injected .reveal elements are in the DOM when querySelectorAll runs.
   */
  const SERVICES = [
    {
      title: 'Research',
      desc: 'Deep-domain investigation — from literature synthesis to primary field studies — that gives every build a defensible foundation.',
      accentColor: '#06B6D4',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="7"/>
        <line x1="16.5" y1="16.5" x2="22" y2="22"/>
        <line x1="11" y1="8" x2="11" y2="11"/>
        <line x1="11" y1="11" x2="13" y2="13"/>
      </svg>`
    },
    {
      title: 'Engineering',
      desc: 'Full-stack systems built for reliability — from embedded firmware and backend infrastructure to data pipelines and APIs.',
      accentColor: '#2563EB',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
        <line x1="14" y1="4" x2="10" y2="20"/>
      </svg>`
    },
    {
      title: 'Design',
      desc: 'Interface and identity systems that communicate hierarchy, build trust, and scale — grounded in brand logic, not trends.',
      accentColor: '#7C3AED',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M12 19l7-7 3 3-7 7-3-3z"/>
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
        <path d="M2 2l7.586 7.586"/>
        <circle cx="11" cy="11" r="2"/>
      </svg>`
    },
    {
      title: 'Products',
      desc: 'End-to-end product development — from concept validation and prototyping through to launched, maintained software.',
      accentColor: '#10B981',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
        <line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>`
    },
    {
      title: 'Platforms',
      desc: 'Scalable infrastructure and multi-tenant platforms — the machinery that lets products grow without re-engineering from scratch.',
      accentColor: '#F59E0B',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect x="2" y="3" width="20" height="5" rx="1"/>
        <rect x="2" y="10" width="20" height="5" rx="1"/>
        <rect x="2" y="17" width="20" height="5" rx="1"/>
        <circle cx="18" cy="5.5" r="1" fill="currentColor" stroke="none"/>
        <circle cx="18" cy="12.5" r="1" fill="currentColor" stroke="none"/>
        <circle cx="18" cy="19.5" r="1" fill="currentColor" stroke="none"/>
      </svg>`
    }
  ];

  const servicesGrid = document.getElementById('services-grid');
  if (servicesGrid) {
    servicesGrid.innerHTML = SERVICES.map((svc) => {
      const hexStroke = svc.accentColor + '44'; // ~27% opacity
      const hexFill   = svc.accentColor + '0F'; // ~6% opacity
      return `
        <article class="service-card reveal" style="--svc-accent:${svc.accentColor}" aria-label="${svc.title} service">
          <div class="service-card__icon" aria-hidden="true">
            <svg class="hex-frame" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polygon points="24,2 44,13 44,35 24,46 4,35 4,13"
                stroke="${hexStroke}" stroke-width="1" fill="${hexFill}"/>
            </svg>
            <div class="icon-inner" style="color:${svc.accentColor}">${svc.icon}</div>
          </div>
          <h3 class="service-card__title">${svc.title}</h3>
          <p class="service-card__desc">${svc.desc}</p>
        </article>
      `;
    }).join('');
  }

  /* ─── Portfolio: render cards + filter ─── */
  /*
   * Data is inlined rather than fetched from JSON because fetch() is
   * blocked on the file:// protocol. Inlining guarantees the site works
   * when opened directly in a browser without a local server.
   */
  /*
   * PROJECTS — mirrors assets/projects-data.json exactly.
   * Fields: id, title, category, description, outcome, tools, image, link.
   * Update both places when real data arrives.
   */
  const PROJECTS = [
    {
      id: 'nexus-platform',
      title: 'Nexus Research Platform',
      category: 'Engineering',
      description: 'A real-time data aggregation engine for multi-source intelligence feeds, built for a defense analytics client.',
      outcome: 'Reduced analyst query latency from 4.2 s to 340 ms. Ingests 12 simultaneous data streams with sub-second fan-out.',
      tools: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker'],
      image: 'assets/screenshots/nexus-platform.png',
      link: '#'
    },
    {
      id: 'spectra-dashboard',
      title: 'Spectra Analytics Dashboard',
      category: 'Design',
      description: 'End-to-end design system and interactive dashboard for a climate-tech startup tracking carbon offset metrics.',
      outcome: 'Shipped in 6 weeks from discovery to handoff. Adopted across 3 internal product teams. Reduced onboarding time by 40%.',
      tools: ['Figma', 'React', 'D3.js', 'Tailwind'],
      image: 'assets/screenshots/spectra-dashboard.png',
      link: '#'
    },
    {
      id: 'helix-protocol',
      title: 'Helix Protocol',
      category: 'Research',
      description: 'Cryptographic protocol design for decentralized identity verification across distributed ledger networks.',
      outcome: 'Protocol formally verified. Proof-of-concept deployed on testnet. Paper submitted to IEEE S&P \'25 review.',
      tools: ['Rust', 'Solidity', 'Zero-Knowledge Proofs'],
      image: 'assets/screenshots/helix-protocol.png',
      link: '#'
    },
    {
      id: 'meridian-app',
      title: 'Meridian Mobile App',
      category: 'Product',
      description: 'Cross-platform logistics app enabling real-time fleet tracking and route optimization for a Series A startup.',
      outcome: 'Launched to 800 drivers in 3 cities. Average route efficiency improved 22%. App Store rating 4.7 ★.',
      tools: ['React Native', 'Node.js', 'MapboxGL', 'Firebase'],
      image: 'assets/screenshots/meridian-app.png',
      link: '#'
    },
    {
      id: 'cortex-ml-pipeline',
      title: 'Cortex ML Pipeline',
      category: 'Engineering',
      description: 'Automated machine learning pipeline for predictive maintenance in industrial manufacturing environments.',
      outcome: 'Achieved 94.3% fault-prediction accuracy. Cut unplanned downtime by 31% in the first quarter post-deploy.',
      tools: ['Python', 'TensorFlow', 'Airflow', 'AWS SageMaker'],
      image: 'assets/screenshots/cortex-ml-pipeline.png',
      link: '#'
    },
    {
      id: 'aether-brand',
      title: 'Aether Brand Identity',
      category: 'Design',
      description: 'Complete brand identity system for a biotech startup — logo, type system, color palette, and marketing collateral.',
      outcome: 'Brand adopted across Series A fundraise deck and investor portal. Identified by investors as a key trust signal.',
      tools: ['Illustrator', 'After Effects', 'Figma'],
      image: 'assets/screenshots/aether-brand.png',
      link: '#'
    }
  ];

  const arrowSvg = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`;

  const hexMark = `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <polygon points="32,4 58,18 58,46 32,60 6,46 6,18" stroke="currentColor" stroke-width="1.5" fill="none"/>
    <polygon points="32,14 50,24 50,40 32,50 14,40 14,24" stroke="currentColor" stroke-width="1" fill="none"/>
    <polygon points="32,22 43,28.5 43,35.5 32,42 21,35.5 21,28.5" stroke="currentColor" stroke-width="0.8" fill="none"/>
  </svg>`;

  const portfolioGrid = document.getElementById('portfolio-grid');
  if (portfolioGrid) {
    portfolioGrid.innerHTML = PROJECTS.map(p => {
      const badgeClass = `badge--${p.category.toLowerCase()}`;
      const toolTags   = p.tools.map(t => `<span class="tag">${t}</span>`).join('');
      return `
        <article class="project-card reveal" data-category="${p.category}" id="project-${p.id}">
          <div class="project-card__thumb" data-category="${p.category}" aria-hidden="true">
            <div class="project-card__thumb-hex">${hexMark}</div>
          </div>
          <div class="project-card__body">
            <div class="project-card__meta">
              <span class="badge ${badgeClass}">${p.category}</span>
            </div>
            <h3 class="project-card__title">${p.title}</h3>
            <p class="project-card__desc">${p.description}</p>
            ${p.outcome ? `<p class="project-card__outcome">${p.outcome}</p>` : ''}
            <div class="project-card__footer">
              <div class="tags">${toolTags}</div>
              <a href="${p.link}" class="project-card__link" aria-label="View project: ${p.title}">
                View Project ${arrowSvg}
              </a>
            </div>
          </div>
        </article>
      `;
    }).join('');

    /* ─ Filter button logic ─ */
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        const filter = btn.dataset.filter;
        portfolioGrid.querySelectorAll('.project-card').forEach(card => {
          const match = filter === 'all' || card.dataset.category === filter;
          card.classList.toggle('is-filtered-out', !match);
        });
      });
    });
  }

  /* ─── Team: render profile cards ─── */
  const linkedinIcon = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`;
  const githubIcon   = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`;
  const dribbbleIcon = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/></svg>`;

  const TEAM = [
    {
      initials: 'AM',
      name: 'Aryan Mehta',
      role: 'Lead Engineer',
      bio: 'Systems architect with a background in distributed systems and ML infrastructure. Built real-time data pipelines for high-stakes analytics environments.',
      avatarGradient: 'linear-gradient(135deg, #1d4ed8 0%, #2563EB 100%)',
      socials: { linkedin: '#', github: '#', dribbble: null }
    },
    {
      initials: 'PS',
      name: 'Priya Sharma',
      role: 'Design Lead',
      bio: 'Product designer focused on design systems and interaction design. Combines visual rigour with deep user research to build products people trust.',
      avatarGradient: 'linear-gradient(135deg, #6d28d9 0%, #7C3AED 100%)',
      socials: { linkedin: '#', github: null, dribbble: '#' }
    },
    {
      initials: 'ZA',
      name: 'Zaid Ansari',
      role: 'Research Lead',
      bio: 'Cryptography researcher with experience in zero-knowledge proofs and decentralized protocol design. Turns theoretical foundations into shippable systems.',
      avatarGradient: 'linear-gradient(135deg, #0891b2 0%, #06B6D4 100%)',
      socials: { linkedin: '#', github: '#', dribbble: null }
    },
    {
      initials: 'NP',
      name: 'Nisha Patel',
      role: 'Product Manager',
      bio: 'End-to-end product builder who has taken three products from 0→1. Bridges research, engineering, and market to turn strategy into shipped outcomes.',
      avatarGradient: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
      socials: { linkedin: '#', github: null, dribbble: '#' }
    }
  ];

  const teamGrid = document.getElementById('team-grid');
  if (teamGrid) {
    teamGrid.innerHTML = TEAM.map(member => {
      const socialLinks = [
        member.socials.linkedin  ? `<a href="${member.socials.linkedin}"  class="team-card__social-link" aria-label="${member.name} on LinkedIn"  rel="noopener">${linkedinIcon}</a>`  : '',
        member.socials.github    ? `<a href="${member.socials.github}"    class="team-card__social-link" aria-label="${member.name} on GitHub"    rel="noopener">${githubIcon}</a>`    : '',
        member.socials.dribbble  ? `<a href="${member.socials.dribbble}" class="team-card__social-link" aria-label="${member.name} on Dribbble" rel="noopener">${dribbbleIcon}</a>` : ''
      ].join('');

      return `
        <article class="team-card reveal" aria-label="${member.name}, ${member.role}">
          <div class="team-card__avatar" style="background:${member.avatarGradient}" aria-hidden="true">
            ${member.initials}
          </div>
          <div class="team-card__info">
            <p class="team-card__name">${member.name}</p>
            <p class="team-card__role">${member.role}</p>
          </div>
          <p class="team-card__bio">${member.bio}</p>
          <div class="team-card__socials">${socialLinks}</div>
        </article>
      `;
    }).join('');
  }

  /* ─── Register ALL .reveal / .reveal-stagger with the shared observer ─── */
  /*
   * Runs after services + portfolio + team are all injected into the DOM.
   * If IntersectionObserver is not available (revealObserver === null),
   * we reveal every element immediately as a graceful fallback.
   */
  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  if (revealObserver) {
    revealEls.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback: no IO support — reveal all elements instantly
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ─── Contact form: submit handler ─── */
  const contactForm    = document.getElementById('contact-form');
  const contactSubmit  = document.getElementById('contact-submit');
  const contactSuccess = document.getElementById('contact-success');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Basic client-side validation — all fields required
      const name    = contactForm.querySelector('#contact-name')?.value.trim();
      const email   = contactForm.querySelector('#contact-email')?.value.trim();
      const message = contactForm.querySelector('#contact-message')?.value.trim();

      if (!name || !email || !message) return;

      // Button feedback: "Sending…" → success state
      contactSubmit.disabled    = true;
      contactSubmit.textContent = 'Sending…';

      // Simulate async send (replace with real endpoint when ready)
      setTimeout(() => {
        contactSubmit.textContent = 'Sent ✓';
        if (contactSuccess) {
          contactSuccess.classList.add('is-visible');
        }
        contactForm.reset();
        // Re-enable after a delay so the user sees the state
        setTimeout(() => {
          contactSubmit.disabled    = false;
          contactSubmit.textContent = 'Send Message';
          if (contactSuccess) {
            contactSuccess.classList.remove('is-visible');
          }
        }, 4000);
      }, 800);
    });
  }

  /* ─── Project detail modal ─── */
  const modal          = document.getElementById('project-modal');
  const modalBackdrop  = document.getElementById('modal-backdrop');
  const modalClose     = document.getElementById('modal-close');
  const modalCloseBtn  = document.getElementById('modal-close-footer');
  const modalBadge     = document.getElementById('modal-badge');
  const modalTitle     = document.getElementById('modal-title');
  const modalDesc      = document.getElementById('modal-desc');
  const modalOutcome   = document.getElementById('modal-outcome');
  const modalOutcomeBlock = document.getElementById('modal-outcome-block');
  const modalTools     = document.getElementById('modal-tools');
  const modalLink      = document.getElementById('modal-link');

  // Last focused element before modal opened — restored on close
  let modalPreviousFocus = null;

  function openModal(project) {
    if (!modal) return;

    // Populate fields
    const cat       = project.category.toLowerCase();
    modalBadge.className = `modal__badge badge badge--${cat}`;
    modalBadge.textContent = project.category;

    modalTitle.textContent = project.title;
    modalDesc.textContent  = project.description;

    if (project.outcome) {
      modalOutcome.textContent = project.outcome;
      modalOutcomeBlock.style.display = '';
    } else {
      modalOutcomeBlock.style.display = 'none';
    }

    modalTools.innerHTML = project.tools
      .map(t => `<span class="tag">${t}</span>`)
      .join('');

    modalLink.href = project.link || '#';

    // Open
    modalPreviousFocus = document.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Move focus into panel for accessibility
    requestAnimationFrame(() => {
      modalClose && modalClose.focus();
    });
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    // Restore focus to the card that triggered the modal
    if (modalPreviousFocus) {
      modalPreviousFocus.focus();
      modalPreviousFocus = null;
    }
  }

  // Wire card clicks — each card maps to a PROJECTS entry by data-category + title
  if (modal) {
    // Build a lookup map by project id
    const projectMap = {};
    PROJECTS.forEach(p => { projectMap[p.id] = p; });

    // Attach click to each rendered card via event delegation on the grid
    const portGrid = document.getElementById('portfolio-grid');
    if (portGrid) {
      portGrid.addEventListener('click', (e) => {
        // Walk up to the article
        const card = e.target.closest('.project-card');
        if (!card) return;
        // Don't open modal if the "View Project →" link was clicked directly
        if (e.target.closest('.project-card__link')) return;
        const projectId = card.id.replace('project-', '');
        const project   = projectMap[projectId];
        if (project) openModal(project);
      });

      // Keyboard: Enter / Space on card body triggers open
      portGrid.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        const card = e.target.closest('.project-card');
        if (!card || e.target.closest('.project-card__link')) return;
        e.preventDefault();
        const projectId = card.id.replace('project-', '');
        const project   = projectMap[projectId];
        if (project) openModal(project);
      });
    }

    // Close triggers
    modalClose    && modalClose.addEventListener('click', closeModal);
    modalCloseBtn && modalCloseBtn.addEventListener('click', closeModal);
    modalBackdrop && modalBackdrop.addEventListener('click', closeModal);

    // Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) {
        closeModal();
      }
    });

    /* ─ Modal focus trap ─
     * While the modal is open, Tab and Shift+Tab must cycle
     * only through focusable elements inside the panel.
     * This satisfies WCAG 2.1 SC 2.1.2 (No Keyboard Trap)
     * and the ARIA dialog pattern.
     */
    modal.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      if (!modal.classList.contains('is-open')) return;

      // Collect all currently-focusable elements within the panel
      const panel = modal.querySelector('.modal__panel');
      const focusable = Array.from(
        panel.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), ' +
          'textarea:not([disabled]), select:not([disabled]), ' +
          '[tabindex]:not([tabindex="-1"])'
        )
      ).filter(el => !el.closest('[aria-hidden="true"]'));

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last  = focusable[focusable.length - 1];

      if (e.shiftKey) {
        // Shift+Tab: if on first element, wrap to last
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        // Tab: if on last element, wrap to first
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }

  /* ─── Make project cards keyboard-focusable ─── */
  /*
   * Cards are <article> elements — not natively focusable.
   * Adding tabindex="0" and a role makes them reachable via Tab
   * and activatable with Enter/Space (handled above).
   */
  document.querySelectorAll('.project-card').forEach(card => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.style.cursor = 'pointer';
  });

  console.log('[OneReign] Site initialized.');
});
