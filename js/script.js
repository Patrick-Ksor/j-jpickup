/**
 * J&J Pickup — script.js
 * ======================
 * Handles: dark mode toggle, sticky nav, mobile hamburger menu,
 *          smooth scroll, scroll-reveal animations, active nav highlight,
 *          form validation + Netlify Forms fetch submit, footer year.
 *
 * No frameworks or external libraries used.
 */

/* ============================================================
   1. Dark Mode Toggle
   ============================================================ */
const initDarkMode = () => {
  const toggleBtns = document.querySelectorAll('.dark-mode-toggle');
  const html = document.documentElement;

  const saved = localStorage.getItem('jjPickupTheme') || 'light';
  html.setAttribute('data-theme', saved);
  updateToggleIcons(saved);

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('jjPickupTheme', next);
      updateToggleIcons(next);
    });
  });
};

const updateToggleIcons = theme => {
  const sunSVG =
    '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" ' +
    'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<circle cx="12" cy="12" r="5"/>' +
    '<line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>' +
    '<line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>' +
    '<line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>' +
    '<line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>' +
    '</svg>';

  const moonSVG =
    '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" ' +
    'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>' +
    '</svg>';

  document.querySelectorAll('.dark-mode-toggle').forEach(btn => {
    if (theme === 'dark') {
      btn.setAttribute('aria-label', 'Switch to light mode');
      btn.innerHTML = sunSVG;
    } else {
      btn.setAttribute('aria-label', 'Switch to dark mode');
      btn.innerHTML = moonSVG;
    }
  });
};

/* ============================================================
   2. Sticky Navigation Shadow
   ============================================================ */
const initStickyNav = () => {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 50);

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
};

/* ============================================================
   3. Mobile Hamburger Menu
   ============================================================ */
const initHamburger = () => {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.nav-mobile-menu');
  if (!hamburger || !mobileMenu) return;

  const closeMenu = () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  };

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      mobileMenu.classList.add('open');
      hamburger.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
    }
  });

  mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
};

/* ============================================================
   4. Smooth Scroll for in-page anchor links
   ============================================================ */
const initSmoothScroll = () => {
  const NAV_HEIGHT = 76;
  document.addEventListener('click', e => {
    const target = e.target.closest('a[href^="#"]');
    if (!target) return;

    const id = target.getAttribute('href');
    if (id === '#') return;

    const section = document.querySelector(id);
    if (!section) return;

    e.preventDefault();
    const top = section.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
    window.scrollTo({ top, behavior: 'smooth' });
  });
};

/* ============================================================
   5. Scroll-Reveal Animations (IntersectionObserver)
   ============================================================ */
const initScrollReveal = () => {
  const elements = document.querySelectorAll('.reveal, .reveal-stagger');
  if (!elements.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    elements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
};

/* ============================================================
   6. Active Navigation Highlight (IntersectionObserver)
   ============================================================ */
const initActiveNav = () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"], .nav-mobile-menu a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = `#${entry.target.id}`;
        navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === id));
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });

  sections.forEach(section => observer.observe(section));
};

/* ============================================================
   7. Lead Capture Form — Validation + Netlify Forms Submit
   ============================================================ */
const initFormValidation = () => {
  const forms = document.querySelectorAll('.quote-form');
  if (!forms.length) return;

  const rules = {
    'name':      { required: true, label: 'Name' },
    'phone':     { required: true, label: 'Phone',       pattern: /^[\d\s\-\+\(\)]{7,20}$/ },
    'email':     { required: true, label: 'Email',       pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    'address':   { required: true, label: 'Address' },
    'junk-desc': { required: true, label: 'Description' }
  };

  const validateForm = form => {
    let valid = true;
    Object.entries(rules).forEach(([fieldName, rule]) => {
      const input = form.querySelector(`[name="${fieldName}"]`);
      if (!input) return;

      const group = input.closest('.form-group');
      const errorEl = group?.querySelector('.field-error');
      const value = input.value.trim();

      group?.classList.remove('error', 'success');

      let message = '';
      if (rule.required && !value) {
        message = `${rule.label} is required.`;
      } else if (value && rule.pattern && !rule.pattern.test(value)) {
        message = `Please enter a valid ${rule.label.toLowerCase()}.`;
      }

      if (message) {
        valid = false;
        group?.classList.add('error');
        if (errorEl) errorEl.textContent = message;
      } else {
        group?.classList.add('success');
      }
    });
    return valid;
  };

  forms.forEach(form => {
    const submitBtn = form.querySelector('[type="submit"]');

    form.addEventListener('submit', e => {
      e.preventDefault();
      const successEl = form.querySelector('.form-success');

      if (!validateForm(form)) {
        successEl?.classList.remove('visible');
        form.querySelector('.form-group.error input, .form-group.error textarea')?.focus();
        return;
      }

      // Disable button during submit
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending…';
      }

      fetch('/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString()
      })
        .then(res => {
          if (res.ok) {
            form.reset();
            form.querySelectorAll('.form-group').forEach(g => g.classList.remove('error', 'success'));
            if (successEl) {
              successEl.textContent = '✓ Thank you! We\'ll contact you shortly to confirm your pickup.';
              successEl.classList.add('visible');
              successEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
              setTimeout(() => successEl.classList.remove('visible'), 8000);
            }
          } else {
            if (successEl) {
              successEl.textContent = 'Something went wrong. Please call us directly.';
              successEl.classList.add('visible');
            }
          }
        })
        .catch(() => {
          if (successEl) {
            successEl.textContent = 'Network error. Please check your connection and try again.';
            successEl.classList.add('visible');
          }
        })
        .finally(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Request Free Quote';
          }
        });
    });

    // Real-time — clear error on input
    form.querySelectorAll('input, textarea').forEach(input => {
      input.addEventListener('input', () => {
        const group = input.closest('.form-group');
        if (group?.classList.contains('error')) {
          group.classList.remove('error', 'success');
          const errorEl = group.querySelector('.field-error');
          if (errorEl) errorEl.textContent = '';
        }
      });
    });
  });
};

/* ============================================================
   8. Current Year in Footer
   ============================================================ */
const initFooterYear = () => {
  document.querySelectorAll('.js-year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
};

/* ============================================================
   Init — Run all modules on DOMContentLoaded
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  initStickyNav();
  initHamburger();
  initSmoothScroll();
  initScrollReveal();
  initActiveNav();
  initFormValidation();
  initFooterYear();
});
