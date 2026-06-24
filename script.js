const form = document.getElementById('contactForm');
const successMessage = document.getElementById('formSuccess');

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name')?.toString().trim();
    const business = formData.get('business')?.toString().trim();
    const email = formData.get('email')?.toString().trim();
    const message = formData.get('message')?.toString().trim();

    if (!name || !business || !email || !message) {
      successMessage.textContent = 'Por favor completa todos los campos.';
      successMessage.style.color = '#f87171';
      return;
    }

    successMessage.textContent = 'Gracias, tu solicitud ha sido recibida. Te contactaré pronto.';
    successMessage.style.color = '#86efac';
    form.reset();

    console.log('Contacto enviado:', {
      nombre: name,
      negocio: business,
      email,
      mensaje: message,
    });
  });
}

const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav');

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
      }
    });
  });
}

const fadeItems = document.querySelectorAll('.fade-in-up, .fade-in');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'none';
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

fadeItems.forEach((item) => observer.observe(item));
