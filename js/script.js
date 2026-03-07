/**
 * J&J Pickup — script.js
 * ======================
 * Handles: dark mode toggle, sticky nav, mobile hamburger menu,
 *          smooth scroll, scroll-reveal animations, active nav highlight,
 *          and lead-capture form validation.
 *
 * No frameworks or external libraries used.
 */

/* ============================================================
   1. Dark Mode Toggle
   ============================================================ */
function initDarkMode() {
  const toggleBtns = document.querySelectorAll('.dark-mode-toggle');
  const html = document.documentElement;

  // Load saved preference (default: light)
  const saved = localStorage.getItem('jjPickupTheme') || 'light';
  html.setAttribute('data-theme', saved);
  updateToggleIcons(saved);

  toggleBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const current = html.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('jjPickupTheme', next);
      updateToggleIcons(next);
    });
  });
}

/**
 * Update aria-label and icon on all dark-mode toggle buttons.
 * Moon icon = switch to dark, Sun icon = switch to light.
 */
function updateToggleIcons(theme) {
  var toggleBtns = document.querySelectorAll('.dark-mode-toggle');
  toggleBtns.forEach(function (btn) {
    if (theme === 'dark') {
      btn.setAttribute('aria-label', 'Switch to light mode');
      btn.innerHTML = /* sun icon */
        '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" ' +
        'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        '<circle cx="12" cy="12" r="5"/>' +
        '<line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>' +
        '<line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>' +
        '<line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>' +
        '<line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>' +
        '</svg>';
    } else {
      btn.setAttribute('aria-label', 'Switch to dark mode');
      btn.innerHTML = /* moon icon */
        '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" ' +
        'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>' +
        '</svg>';
    }
  });
}

/* ============================================================
   2. Sticky Navigation Shadow
   ============================================================ */
function initStickyNav() {
  var navbar = document.querySelector('.navbar');
  if (!navbar) return;

  function onScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load in case page is already scrolled
}

/* ============================================================
   3. Mobile Hamburger Menu
   ============================================================ */
function initHamburger() {
  var hamburger = document.querySelector('.hamburger');
  var mobileMenu = document.querySelector('.nav-mobile-menu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', function () {
    var isOpen = mobileMenu.classList.contains('open');
    if (isOpen) {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    } else {
      mobileMenu.classList.add('open');
      hamburger.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
    }
  });

  // Close mobile menu when any link is clicked
  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ============================================================
   4. Smooth Scroll for in-page anchor links
   ============================================================ */
function initSmoothScroll() {
  var NAV_HEIGHT = 76; // px offset for sticky navbar
  document.addEventListener('click', function (e) {
    var target = e.target.closest('a[href^="#"]');
    if (!target) return;

    var id = target.getAttribute('href');
    if (id === '#') return;

    var section = document.querySelector(id);
    if (!section) return;

    e.preventDefault();
    var top = section.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
    window.scrollTo({ top: top, behavior: 'smooth' });
  });
}

/* ============================================================
   5. Scroll-Reveal Animations (IntersectionObserver)
   ============================================================ */
function initScrollReveal() {
  // Support for both individual .reveal and grouped .reveal-stagger elements
  var elements = document.querySelectorAll('.reveal, .reveal-stagger');
  if (!elements.length) return;

  // Skip animations when user prefers reduced motion
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    elements.forEach(function (el) { el.classList.add('visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // animate only once
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(function (el) { observer.observe(el); });
}

/* ============================================================
   6. Active Navigation Highlight (IntersectionObserver)
   ============================================================ */
function initActiveNav() {
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-links a[href^="#"], .nav-mobile-menu a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var id = '#' + entry.target.id;
        navLinks.forEach(function (link) {
          if (link.getAttribute('href') === id) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-30% 0px -60% 0px'
  });

  sections.forEach(function (section) { observer.observe(section); });
}

/* ============================================================
   7. Lead Capture Form Validation
   ============================================================ */
function initFormValidation() {
  var forms = document.querySelectorAll('.quote-form');
  if (!forms.length) return;

  // Validation rule definitions
  var rules = {
    'name':        { required: true,  label: 'Name' },
    'phone':       { required: true,  label: 'Phone',   pattern: /^[\d\s\-\+\(\)]{7,20}$/ },
    'email':       { required: true,  label: 'Email',   pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    'address':     { required: true,  label: 'Address' },
    'junk-desc':   { required: true,  label: 'Description' }
  };

  forms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;

      Object.keys(rules).forEach(function (fieldName) {
        var rule = rules[fieldName];
        var input = form.querySelector('[name="' + fieldName + '"]');
        if (!input) return;

        var group = input.closest('.form-group');
        var errorEl = group ? group.querySelector('.field-error') : null;
        var value = input.value.trim();

        // Clear previous state
        if (group) { group.classList.remove('error', 'success'); }

        var message = '';

        if (rule.required && !value) {
          message = rule.label + ' is required.';
        } else if (value && rule.pattern && !rule.pattern.test(value)) {
          message = 'Please enter a valid ' + rule.label.toLowerCase() + '.';
        }

        if (message) {
          valid = false;
          if (group) { group.classList.add('error'); }
          if (errorEl) { errorEl.textContent = message; }
        } else {
          if (group) { group.classList.add('success'); }
        }
      });

      var successEl = form.querySelector('.form-success');
      if (valid) {
        // Show success message and reset form
        form.reset();
        // Clear all field states
        form.querySelectorAll('.form-group').forEach(function (g) {
          g.classList.remove('error', 'success');
        });
        if (successEl) {
          successEl.classList.add('visible');
          successEl.textContent = '✓ Thank you! We\'ll contact you shortly to confirm your pickup.';
          // Auto-hide after 8 seconds
          setTimeout(function () { successEl.classList.remove('visible'); }, 8000);
        }
        // Scroll to success message
        if (successEl) {
          successEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      } else {
        // Hide success if previously shown
        if (successEl) { successEl.classList.remove('visible'); }
        // Scroll to first error
        var firstError = form.querySelector('.form-group.error input, .form-group.error textarea');
        if (firstError) { firstError.focus(); }
      }
    });

    // Real-time validation (clear error on input after first submit attempt)
    form.querySelectorAll('input, textarea').forEach(function (input) {
      input.addEventListener('input', function () {
        var group = input.closest('.form-group');
        if (group && group.classList.contains('error')) {
          group.classList.remove('error', 'success');
          var errorEl = group.querySelector('.field-error');
          if (errorEl) { errorEl.textContent = ''; }
        }
      });
    });
  });
}

/* ============================================================
   8. Current Year in Footer
   ============================================================ */
function initFooterYear() {
  var yearEls = document.querySelectorAll('.js-year');
  yearEls.forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
}

/* ============================================================
   Init — Run all modules on DOMContentLoaded
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {
  initDarkMode();
  initStickyNav();
  initHamburger();
  initSmoothScroll();
  initScrollReveal();
  initActiveNav();
  initFormValidation();
  initFooterYear();
});
