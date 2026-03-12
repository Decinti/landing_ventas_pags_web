/* =============================================
   NAVBAR — sticky + scroll class
   ============================================= */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  updateActiveNav();
});

/* =============================================
   MOBILE MENU
   ============================================= */
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

// Close when clicking outside
document.addEventListener('click', e => {
  if (!navbar.contains(e.target)) closeMobileMenu();
});

function closeMobileMenu() {
  hamburger.classList.remove('active');
  navLinks.classList.remove('open');
}

/* =============================================
   ACTIVE NAV LINK ON SCROLL
   ============================================= */
const sections    = document.querySelectorAll('section[id]');
const navAnchors  = document.querySelectorAll('.nav-links a[href^="#"]');

function updateActiveNav() {
  const y = window.scrollY + 110;

  sections.forEach(sec => {
    if (y >= sec.offsetTop && y < sec.offsetTop + sec.offsetHeight) {
      navAnchors.forEach(a => a.classList.remove('nav-active'));
      const match = document.querySelector(`.nav-links a[href="#${sec.id}"]`);
      if (match) match.classList.add('nav-active');
    }
  });
}

/* =============================================
   SMOOTH SCROLL for anchor links
   ============================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 78;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* =============================================
   FAQ ACCORDION
   ============================================= */
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-q').addEventListener('click', () => {
    const isOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));

    // Toggle clicked
    if (!isOpen) item.classList.add('open');
  });
});

/* =============================================
   CUSTOM SCROLL REVEAL (IntersectionObserver)
   ============================================= */
const aoObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const delay = parseInt(entry.target.dataset.aosDelay || 0, 10);
      setTimeout(() => entry.target.classList.add('aos-animate'), delay);
      aoObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -48px 0px' }
);

document.querySelectorAll('[data-aos]').forEach(el => aoObserver.observe(el));

/* =============================================
   COUNTER ANIMATION for hero stats
   ============================================= */
function countUp(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  if (isNaN(target)) return;

  const duration = 1800;
  const start    = performance.now();

  const tick = now => {
    const progress = Math.min((now - start) / duration, 1);
    const ease     = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(ease * target) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}

const statsObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('.stat-num[data-target]').forEach(countUp);
      statsObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.5 }
);

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

/* =============================================
   FLOATING WA BUTTON — subtle reveal on scroll
   ============================================= */
const waFloat = document.querySelector('.wa-float');

function toggleWaFloat() {
  if (!waFloat) return;
  waFloat.style.opacity = window.scrollY > 280 ? '1' : '0.7';
}

window.addEventListener('scroll', toggleWaFloat, { passive: true });
toggleWaFloat();

/* =============================================
   PRICING CARD — highlight on hover (touch devices)
   Adds a slight tap feedback for mobile
   ============================================= */
document.querySelectorAll('.plan-card').forEach(card => {
  card.addEventListener('touchstart', () => {
    card.style.transform = card.classList.contains('plan-featured')
      ? 'scale(1.03) translateY(-4px)'
      : 'translateY(-4px)';
  }, { passive: true });

  card.addEventListener('touchend', () => {
    card.style.transform = card.classList.contains('plan-featured')
      ? 'scale(1.03)'
      : '';
  }, { passive: true });
});
