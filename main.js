/**
 * OneReign — main.js  (V3)
 *
 * Sections (populated per TODO_V3.md phases):
 *   - Navigation: hamburger, scroll behaviour
 *   - Hero: entrance animation sequence
 *   - Services: render service cards
 *   - Portfolio: render project cards, filter logic, modal
 *   - Team: render team cards
 *   - Contact: form validation & submission
 *   - Scroll reveals: IntersectionObserver
 */

document.addEventListener('DOMContentLoaded', () => {

  // ── NAVIGATION ──────────────────────────────────────────
  const nav = document.getElementById('nav');
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileOverlay = document.getElementById('nav-links');
  const mobileLinks = document.querySelectorAll('.nav__mobile-links a');

  // Scroll behavior: border visibility
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  });

  // Mobile Hamburger Menu Toggle
  if (hamburger && mobileOverlay) {
    const toggleMenu = () => {
      const isActive = hamburger.classList.contains('is-active');
      hamburger.classList.toggle('is-active');
      mobileOverlay.classList.toggle('is-active');
      hamburger.setAttribute('aria-expanded', !isActive);
    };

    hamburger.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (hamburger.classList.contains('is-active')) {
          toggleMenu();
        }
      });
    });
  }

  // ── HERO ENTRANCE ANIMATION ──────────────────────────────
  const heroRevealItems = document.querySelectorAll('.hero .reveal-item');
  if (heroRevealItems.length > 0) {
    // Wait for the logo to fade in first (or run concurrently)
    setTimeout(() => {
      heroRevealItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add('is-revealed');
        }, index * 80); // 80ms stagger
      });
    }, 300); // 300ms initial delay
  }

  // ── SERVICES RENDER ─────────────────────────────────────
  // Populated in Phase 8

  // ── PORTFOLIO RENDER + FILTER + MODAL ───────────────────
  const portfolioGrid = document.getElementById('portfolio-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');

  const projects = [
    {
      id: 'proj-1',
      title: 'Neural Synthesizer',
      category: 'engineering',
      badge: 'Engineering',
      desc: 'A high-performance LLM routing engine capable of dynamic model switching at 10k requests per second.',
      tools: ['Rust', 'gRPC', 'Redis'],
      link: '#'
    },
    {
      id: 'proj-2',
      title: 'Aura OS Design System',
      category: 'design',
      badge: 'Design',
      desc: 'Complete visual identity and component library for a next-generation spatial computing operating system.',
      tools: ['Figma', 'React', 'Framer Motion'],
      link: '#'
    },
    {
      id: 'proj-3',
      title: 'Quantum State Analyzer',
      category: 'research',
      badge: 'Research',
      desc: 'Published paper and open-source toolset for visualizing qubit coherence degradation in real-time.',
      tools: ['Python', 'Qiskit', 'WebGL'],
      link: '#'
    },
    {
      id: 'proj-4',
      title: 'Nexus Data Platform',
      category: 'product',
      badge: 'Product',
      desc: 'Enterprise B2B SaaS platform for unifying disparate IoT streams into actionable operational intelligence.',
      tools: ['Next.js', 'PostgreSQL', 'Go'],
      link: '#'
    },
    {
      id: 'proj-5',
      title: 'Fintech Core Ledger',
      category: 'engineering',
      badge: 'Engineering',
      desc: 'Immutable, cryptographically verified ledger system processing $2B+ in daily transactions.',
      tools: ['C++', 'Kafka', 'AWS'],
      link: '#'
    },
    {
      id: 'proj-6',
      title: 'Cognitive Ergonomics',
      category: 'research',
      badge: 'Research',
      desc: 'Study on human-computer interaction patterns in high-stress trading environments, yielding a 40% error reduction.',
      tools: ['Qualtrics', 'D3.js', 'R'],
      link: '#'
    }
  ];

  if (portfolioGrid) {
    const renderProjects = (filterStr) => {
      portfolioGrid.innerHTML = '';
      const filtered = filterStr === 'all' 
        ? projects 
        : projects.filter(p => p.category === filterStr);

      filtered.forEach((p, idx) => {
        const gradient = `background: linear-gradient(135deg, rgba(250,250,250,0.02), rgba(250,250,250,0.08));`;
        
        const cardHTML = `
          <article class="card portfolio-card reveal-item" style="transition-delay: ${idx * 80}ms">
            <div class="portfolio-card__thumb" style="${gradient}"></div>
            <div class="portfolio-card__content">
              <span class="badge badge--${p.category}">${p.badge}</span>
              <h3 class="portfolio-card__title">${p.title}</h3>
              <p class="portfolio-card__desc">${p.desc}</p>
              <div class="portfolio-card__tools">
                ${p.tools.map(t => `<span class="tag">${t}</span>`).join('')}
              </div>
              <a href="${p.link}" class="portfolio-card__link" aria-label="View ${p.title}">View Project &rarr;</a>
            </div>
          </article>
        `;
        portfolioGrid.innerHTML += cardHTML;
      });

      // Trigger staggered animation for newly rendered cards
      setTimeout(() => {
        const newItems = portfolioGrid.querySelectorAll('.reveal-item');
        newItems.forEach(item => item.classList.add('is-revealed'));
      }, 50);
    };

    // Initial render
    renderProjects('all');

    // Filter logic
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        renderProjects(btn.dataset.filter);
      });
    });
  }

  // ── TEAM RENDER ─────────────────────────────────────────
  const teamGrid = document.getElementById('team-grid');
  if (teamGrid) {
    const teamMembers = [
      {
        initials: 'JL',
        name: 'Julian Lang',
        role: 'Director of Engineering',
        bio: 'Former senior architect at a top tech firm, Julian specializes in building high-throughput distributed systems that scale linearly.'
      },
      {
        initials: 'MK',
        name: 'Maya Kowalski',
        role: 'Head of Product',
        bio: 'Maya bridges the gap between deep technical capabilities and human-centric design, ensuring solutions solve real structural problems.'
      },
      {
        initials: 'AT',
        name: 'Arthur Turing',
        role: 'Lead Researcher',
        bio: 'With a PhD in complex systems, Arthur leads our experimental division, exploring emergent behaviors in machine learning models.'
      },
      {
        initials: 'SO',
        name: 'Sarah Oconnell',
        role: 'Systems Designer',
        bio: 'Sarah crafts the visual and interactive layers of our platforms, obsessed with the ergonomics of high-density information interfaces.'
      }
    ];

    teamGrid.innerHTML = teamMembers.map((member, idx) => `
      <article class="card team-card reveal-item" style="transition-delay: ${idx * 80}ms">
        <div class="team-card__avatar">
          <span>${member.initials}</span>
        </div>
        <div class="team-card__info">
          <h3 class="team-card__name">${member.name}</h3>
          <p class="team-card__role caption-label">${member.role}</p>
          <p class="team-card__bio">${member.bio}</p>
        </div>
      </article>
    `).join('');
  }

  // ── CONTACT FORM ────────────────────────────────────────
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  if (contactForm && formSuccess) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Basic validation (browser handles required attributes)
      if (!contactForm.checkValidity()) {
        return;
      }

      // Simulate network request
      const submitBtn = document.getElementById('contact-submit');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        contactForm.reset();
        
        // Show success message
        formSuccess.hidden = false;
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          formSuccess.hidden = true;
        }, 5000);
      }, 1500);
    });
  }

  // ── SCROLL REVEALS ──────────────────────────────────────
  const revealElements = document.querySelectorAll('.reveal, .reveal-item:not(.hero .reveal-item)');
  
  const revealOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

});
