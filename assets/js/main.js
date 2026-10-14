/**
 * Questy - Elite R&D Intelligence for AI Developer Agents
 * Client Interactions, Ambient Particles, and Modal Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  initNavbarScroll();
  initMobileMenu();
  initModals();
  initClipboardButtons();
  initPillarInteractions();
});

/* ==========================================================================
   1. Interactive Ambient Particle / Starfield Canvas
   ========================================================================== */
function initParticleCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = Math.min(Math.floor((width * height) / 18000), 75);
  const particles = [];
  const mouse = { x: -1000, y: -1000, radius: 120 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = (Math.random() - 0.5) * 0.35;
      this.radius = Math.random() * 1.5 + 0.6;
      this.alpha = Math.random() * 0.5 + 0.2;
      this.baseAlpha = this.alpha;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx = -this.vx;
      if (this.y < 0 || this.y > height) this.vy = -this.vy;

      // Mouse proximity interaction
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < mouse.radius) {
        const force = (mouse.radius - dist) / mouse.radius;
        this.x -= (dx / dist) * force * 1.5;
        this.y -= (dy / dist) * force * 1.5;
        this.alpha = Math.min(1, this.baseAlpha + 0.4);
      } else {
        this.alpha = this.baseAlpha;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(165, 180, 252, ${this.alpha})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = 'rgba(99, 102, 241, 0.4)';
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting lines between close particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          const lineAlpha = (1 - dist / 110) * 0.12;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(129, 140, 248, ${lineAlpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. Sticky Navigation Bar Scroll Blur
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.getElementById('main-navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('glass-nav', 'py-4', 'shadow-2xl');
      navbar.classList.remove('py-8');
    } else {
      navbar.classList.remove('glass-nav', 'py-4', 'shadow-2xl');
      navbar.classList.add('py-8');
    }
  });
}

/* ==========================================================================
   3. Mobile Navigation Menu
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeBtn = document.getElementById('mobile-menu-close');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.remove('translate-x-full');
    mobileMenu.classList.add('translate-x-0');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.add('translate-x-full');
    mobileMenu.classList.remove('translate-x-0');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  mobileLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
}

/* ==========================================================================
   4. Modals (Download, Plugins, Privacy, Terms)
   ========================================================================== */
function initModals() {
  const triggers = document.querySelectorAll('[data-modal-target]');
  const closeButtons = document.querySelectorAll('[data-modal-close]');

  triggers.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-modal-target');
      const modal = document.getElementById(targetId);
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  closeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // Close modal when clicking outside modal content
  document.querySelectorAll('.modal-overlay').forEach((modal) => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // Close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach((modal) => {
        modal.classList.remove('active');
      });
      document.body.style.overflow = '';
    }
  });

  // Tab switching in download modal
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      tabButtons.forEach((b) => {
        b.classList.remove('text-white', 'border-indigo-500', 'bg-white/10');
        b.classList.add('text-slate-400', 'border-transparent');
      });

      btn.classList.add('text-white', 'border-indigo-500', 'bg-white/10');
      btn.classList.remove('text-slate-400', 'border-transparent');

      tabPanes.forEach((pane) => {
        if (pane.id === targetTab) {
          pane.classList.remove('hidden');
        } else {
          pane.classList.add('hidden');
        }
      });
    });
  });
}

/* ==========================================================================
   5. Clipboard Copy Action with Visual Feedback
   ========================================================================== */
function initClipboardButtons() {
  const copyButtons = document.querySelectorAll('[data-copy-target]');

  copyButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-copy-target');
      const targetEl = document.getElementById(targetId);
      if (!targetEl) return;

      const text = targetEl.innerText || targetEl.textContent;
      navigator.clipboard.writeText(text.trim()).then(() => {
        const originalContent = btn.innerHTML;
        btn.innerHTML = `
          <svg class="w-4 h-4 text-emerald-400 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <span class="text-emerald-400">Copied!</span>
        `;
        setTimeout(() => {
          btn.innerHTML = originalContent;
        }, 2200);
      });
    });
  });
}

/* ==========================================================================
   6. Core Pillar Interactive Modals / Details
   ========================================================================== */
const pillarDetails = {
  unbiased: {
    title: 'Unbiased Thinking',
    badge: 'Epistemic Standard #1',
    description:
      'Questy enforces strict zero-bias isolation and algorithmic detachment from preconceptions, forcing AI agents to explore counter-hypotheses and edge cases before formulating conclusions.',
    points: [
      'Zero-bias isolation prevents premature convergence and sycophantic agreement',
      'Systematic dual-hypothesis evaluation exploring edge cases and competing claims',
      'Clean separation between empirical facts, verified benchmarks, and probabilistic models',
      'Enforced uncertainty disclosure and source transparency across all turns'
    ],
    command: '/ques-guidelines'
  },
  systematic: {
    title: 'Step-by-Step System',
    badge: 'Epistemic Standard #2',
    description:
      'Replaces black-box generation with a phased, auditable 7-skill workflow transitioning through strict execution gates from inquiry to executive synthesis.',
    points: [
      'Modular pipeline decoupling hypothesis framing, source critique, and synthesis',
      'Organizes unstructured data into taxonomies, comparison matrices, schemas, and trade-off trees',
      'Designs repeatable scoring models, benchmarking frameworks, and testing procedures',
      'Universal portability across Antigravity, Claude Code, Copilot, Codex, and Perplexity'
    ],
    command: '/ques-struct'
  },
  proofs: {
    title: 'Real Proofs',
    badge: 'Epistemic Standard #3',
    description:
      'Zero hallucination tolerance. Every technical claim, recommendation, and benchmark is anchored to traceable primary sources and verified data.',
    points: [
      'Provenance traceability prioritizing peer-reviewed literature, official docs, and primary code',
      'Audits provenance and verifies citations directly against primary source documents',
      'Strict anti-hallucination guardrails bound to verifiable evidentiary weight',
      'Transforms complex findings into boardroom-ready briefs backed by quantified trade-offs'
    ],
    command: '/ques-source'
  }
};

function initPillarInteractions() {
  const pillarBadges = document.querySelectorAll('.pillar-badge');
  const detailsModal = document.getElementById('pillar-modal');
  if (!detailsModal) return;

  pillarBadges.forEach((badge) => {
    badge.addEventListener('click', () => {
      const pillarKey = badge.getAttribute('data-pillar');
      const data = pillarDetails[pillarKey];
      if (!data) return;

      document.getElementById('pillar-modal-title').innerText = data.title;
      document.getElementById('pillar-modal-badge').innerText = data.badge;
      document.getElementById('pillar-modal-desc').innerText = data.description;
      document.getElementById('pillar-modal-cmd').innerText = data.command;

      const pointsContainer = document.getElementById('pillar-modal-points');
      pointsContainer.innerHTML = '';
      data.points.forEach((point) => {
        const li = document.createElement('li');
        li.className = 'flex items-start gap-2.5 text-slate-300 text-sm md:text-base';
        li.innerHTML = `
          <svg class="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>${point}</span>
        `;
        pointsContainer.appendChild(li);
      });

      detailsModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });
}
