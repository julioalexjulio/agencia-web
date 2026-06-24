/* ===== CURSOR GLOW ===== */
const cursorGlow = document.getElementById('cursorGlow');
if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
  });
}

/* ===== HEADER SCROLL ===== */
const topbar = document.getElementById('topbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    topbar.classList.add('scrolled');
  } else {
    topbar.classList.remove('scrolled');
  }
}, { passive: true });

/* ===== MOBILE MENU ===== */
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    menuToggle.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      menuToggle.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ===== SCROLL REVEAL ===== */
const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);
revealItems.forEach((item) => revealObserver.observe(item));

/* ===== COUNTERS ===== */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const step = 16;
  const increment = target / (duration / step);
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current);
  }, step);
}

const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);
counters.forEach((counter) => counterObserver.observe(counter));

/* ===== CONTACT FORM ===== */
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const business = form.business.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !business || !email || !message) {
      formSuccess.textContent = '⚠️ Por favor completa todos los campos obligatorios.';
      formSuccess.style.color = '#f87171';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      formSuccess.textContent = '⚠️ Por favor introduce un email válido.';
      formSuccess.style.color = '#f87171';
      return;
    }

    // Simulate sending
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Enviando...';
    btn.disabled = true;

    setTimeout(() => {
      formSuccess.textContent = '✅ ¡Mensaje enviado! Te responderé en menos de 24h.';
      formSuccess.style.color = '#4ade80';
      form.reset();
      btn.innerHTML = '<span>Enviar mensaje</span><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
      btn.disabled = false;

      console.log('Formulario enviado:', { nombre: name, negocio: business, email, mensaje: message });
    }, 1200);
  });
}

/* ===== SMOOTH SCROLL OFFSET (fixed header) ===== */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const headerHeight = topbar ? topbar.offsetHeight : 80;
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
