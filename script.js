// My Website Brand - Shared JS (Sharp Edges)
// Modular, accessible, responsive

// Header fade-away and shrink on scroll
const header = document.getElementById('main-header');
let lastScrollY = 0;
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  // Fade effect
  header.style.opacity = Math.max(1 - scrollY / 300, 0.6);
  // Shrink effect
  const minHeight = 60;
  const maxHeight = 100;
  const newHeight = Math.max(maxHeight - scrollY * 0.2, minHeight);
  header.style.height = newHeight + 'px';
  lastScrollY = scrollY;
});

// Hamburger menu for mobile
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu').querySelector('ul');
hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  hamburger.classList.toggle('open');
});
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    hamburger.classList.remove('open');
  });
});

// Smooth scroll for Explore Services button
const exploreBtn = document.querySelector('.explore-btn');
if (exploreBtn) {
  exploreBtn.addEventListener('click', function(e) {
    // If on home, scroll to panel, else go to services.html
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname === '') {
      e.preventDefault();
      const nextPanel = document.querySelector('.panel');
      if (nextPanel) {
        nextPanel.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
}

// Fade-in animation on scroll
const fadeEls = document.querySelectorAll('.fade-in');
const fadeInOnScroll = () => {
  fadeEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      el.style.animationPlayState = 'running';
    }
  });
};
window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('load', fadeInOnScroll);

// Parallax effect for panels
const panels = document.querySelectorAll('.parallax');
window.addEventListener('scroll', () => {
  panels.forEach(panel => {
    const speed = 0.3;
    const offset = window.scrollY * speed;
    panel.style.backgroundPosition = `center ${offset}px`;
  });
});

// Services honeycomb expand/collapse
const hexCards = document.querySelectorAll('.hex-card');
if (hexCards.length) {
  hexCards.forEach(card => {
    card.addEventListener('click', () => {
      hexCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        hexCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
      }
    });
  });
}

// Contact form demo handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! (Demo only)');
    contactForm.reset();
  });
}
