const hero = document.querySelector('.hero');

if (hero) {
  hero.addEventListener('mousemove', (event) => {
    const rect = hero.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) / 20;
    const y = (event.clientY - rect.top - rect.height / 2) / 20;
    hero.style.transform = `perspective(1200px) rotateY(${x}deg) rotateX(${y * -1}deg)`;
  });

  hero.addEventListener('mouseleave', () => {
    hero.style.transform = 'perspective(1200px) rotateY(0deg) rotateX(0deg)';
  });
}
/**
 * Main JavaScript — Portfolio interactions
 * Beginner-friendly: each section is clearly labeled
 */

(function () {
  'use strict';

  /* ==========================================
     1. MOBILE NAVIGATION TOGGLE
     ========================================== */
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.querySelector('.site-nav');

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = siteNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close nav when a link is clicked
    siteNav.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ==========================================
     2. SCROLL REVEAL ANIMATIONS
     Uses Intersection Observer for performance
     ========================================== */
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target); // animate once
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback: show all elements immediately
    revealElements.forEach((el) => el.classList.add('is-visible'));
  }

  /* ==========================================
     3. ACTIVE NAV LINK ON SCROLL
     ========================================== */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    const scrollY = window.scrollY + 120;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  /* ==========================================
     4. DYNAMIC FOOTER YEAR
     ========================================== */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ==========================================
     5. CONTACT FORM (placeholder handler)
     TODO: Connect to Formspree, Netlify Forms, or your backend
     ========================================== */
  const contactForm = document.querySelector('.contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert(
        'Thank you for your message! Feedback has been sent successfully.'
      );
      contactForm.reset();
    });
  }

})();