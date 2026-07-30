document.addEventListener('DOMContentLoaded', () => {

  // ── Header Scroll Effect ──
  const header = document.querySelector('#main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // ── Scroll Reveal ──
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = (entry.target.dataset.delay || 0) + 'ms';
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.dataset.delay = (i % 4) * 80;
    revealObserver.observe(el);
  });

  // ── Timeline Reveal (V2) ──
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.t2-item').forEach((el, i) => {
    el.style.transitionDelay = i * 150 + 'ms';
    // Add reveal class to t2-item as well if needed
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  // ── Smooth Scroll ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
      }
    });
  });

  // ── Mobile Menu Toggle ──
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.querySelector('.nav-links-wrapper');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking links
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // ── Project Spotlight Mouse Effect ──
  const projectCards = document.querySelectorAll('.simple-project-card');
  projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // ── Hero Title Typewriter Effect ──
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.classList.add('typing-active');
    
    let i = 0;
    setTimeout(() => {
      const typeWriter = setInterval(() => {
        if (i < text.length) {
          heroTitle.textContent += text.charAt(i);
          i++;
        } else {
          clearInterval(typeWriter);
        }
      }, 50); // Speed of typing
    }, 1000); // Delay before starting
  }

  // ── Contact Form EmailJS Integration ──
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
      submitBtn.disabled = true;
      formStatus.className = 'form-status';
      formStatus.textContent = '';

      // NOTE: Replace "YOUR_TEMPLATE_ID" with your actual EmailJS Template ID
      emailjs.sendForm('service_uej413i', 'template_gbezwoa', this)
        .then(() => {
          formStatus.textContent = 'Message sent successfully!';
          formStatus.classList.add('success');
          contactForm.reset();
        }, (error) => {
          formStatus.textContent = 'Failed to send message: ' + (error.text || 'Please try again.');
          formStatus.classList.add('error');
          console.error('EmailJS Error:', error);
        })
        .finally(() => {
          submitBtn.innerHTML = originalBtnText;
          submitBtn.disabled = false;
        });
    });
  }

});
