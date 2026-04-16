/* ============================================
   MURIM DEVELOPER PORTFOLIO - script.js
   Martial Arts Cultivation Theme
   Advanced Effects Edition
   ============================================ */

(function () {
  'use strict';

  /* ------------------------------------------
     UTILITY: Debounce helper
     ------------------------------------------ */
  function debounce(fn, delay) {
    let timer;
    return function () {
      var ctx = this, args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () { fn.apply(ctx, args); }, delay);
    };
  }

  /* ------------------------------------------
     UTILITY: Check if tab is visible
     ------------------------------------------ */
  var tabHidden = false;
  document.addEventListener('visibilitychange', function () {
    tabHidden = document.hidden;
  });

  /* ------------------------------------------
     UTILITY: Touch device detection
     ------------------------------------------ */
  var isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  /* ==========================================================
     H. HERO CINEMATIC INTRO SEQUENCE
     Play a sword-unsheathing reveal animation on page load
     ========================================================== */
  (function cinematicIntro() {
    var overlay = document.createElement('div');
    overlay.className = 'cinematic-overlay';
    overlay.innerHTML =
      '<div class="cinematic-line"></div>';

    // Inject styles for the cinematic overlay
    var style = document.createElement('style');
    style.textContent =
      '.cinematic-overlay{' +
        'position:fixed;top:0;left:0;width:100%;height:100%;' +
        'background:#000;z-index:100000;display:flex;align-items:center;justify-content:center;' +
        'pointer-events:none;' +
      '}' +
      '.cinematic-line{' +
        'width:0;height:2px;background:#fff;' +
        'transition:width 0.5s cubic-bezier(0.25,0.46,0.45,0.94),' +
                   'height 0.4s cubic-bezier(0.25,0.46,0.45,0.94) 0.5s;' +
      '}' +
      '.cinematic-line.draw{width:60%;height:2px;}' +
      '.cinematic-line.expand{width:60%;height:100vh;}' +
      '.cinematic-overlay.fade{' +
        'opacity:0;transition:opacity 0.5s ease 0.1s;' +
      '}';
    document.head.appendChild(style);
    document.body.appendChild(overlay);

    var line = overlay.querySelector('.cinematic-line');

    // Step 1: draw horizontal line (0.3s delay then 0.5s animation)
    setTimeout(function () { line.classList.add('draw'); }, 300);

    // Step 2: expand vertically (line transition handles 0.5s delay via CSS)
    setTimeout(function () { line.classList.add('expand'); }, 800);

    // Step 3: fade out and reveal content
    setTimeout(function () {
      overlay.classList.add('fade');
      document.body.classList.add('cinematic-done');
    }, 1200);

    // Step 4: remove overlay from DOM
    setTimeout(function () {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }, 2000);
  })();

  /* ==========================================================
     F. SCROLL PROGRESS INDICATOR (Energy Gauge)
     Thin vertical line on right side with diamond section markers
     ========================================================== */
  (function scrollProgressIndicator() {
    // Inject styles
    var style = document.createElement('style');
    style.textContent =
      '.scroll-gauge{' +
        'position:fixed;top:0;right:6px;width:2px;height:100%;z-index:9999;pointer-events:none;' +
      '}' +
      '.scroll-gauge-bg{' +
        'position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(255,255,255,0.06);' +
      '}' +
      '.scroll-gauge-fill{' +
        'position:absolute;top:0;left:0;width:100%;height:0%;background:rgba(255,255,255,0.5);' +
        'transition:height 0.15s linear;box-shadow:0 0 6px rgba(255,255,255,0.3);' +
      '}' +
      '.scroll-gauge-diamond{' +
        'position:absolute;left:50%;width:6px;height:6px;background:rgba(255,255,255,0.25);' +
        'transform:translateX(-50%) rotate(45deg);pointer-events:none;' +
      '}';
    document.head.appendChild(style);

    var gauge = document.createElement('div');
    gauge.className = 'scroll-gauge';
    gauge.innerHTML = '<div class="scroll-gauge-bg"></div><div class="scroll-gauge-fill"></div>';
    document.body.appendChild(gauge);

    var fill = gauge.querySelector('.scroll-gauge-fill');
    var allSections = document.querySelectorAll('section[id]');

    // Place diamond markers at section boundaries
    function placeDiamonds() {
      var existing = gauge.querySelectorAll('.scroll-gauge-diamond');
      existing.forEach(function (d) { d.remove(); });

      var docH = document.documentElement.scrollHeight;
      allSections.forEach(function (sec) {
        var pct = (sec.offsetTop / docH) * 100;
        var diamond = document.createElement('div');
        diamond.className = 'scroll-gauge-diamond';
        diamond.style.top = pct + '%';
        gauge.appendChild(diamond);
      });
    }

    function updateFill() {
      var scrollTop = window.scrollY;
      var docH = document.documentElement.scrollHeight - window.innerHeight;
      var pct = docH > 0 ? (scrollTop / docH) * 100 : 0;
      fill.style.height = pct + '%';
    }

    placeDiamonds();
    updateFill();
    window.addEventListener('scroll', updateFill, { passive: true });
    window.addEventListener('resize', debounce(placeDiamonds, 300), { passive: true });
  })();

  /* ==========================================================
     D. ENERGY RIPPLE ON BUTTON CLICK
     Concentric rings expand from click point on .btn elements
     ========================================================== */
  (function energyRipple() {
    var style = document.createElement('style');
    style.textContent =
      '@keyframes ripple-ring{' +
        '0%{width:0;height:0;opacity:0.8;}' +
        '100%{width:200px;height:200px;opacity:0;}' +
      '}' +
      '.energy-ring{' +
        'position:fixed;border:2px solid rgba(255,255,255,0.7);border-radius:50%;' +
        'pointer-events:none;z-index:99999;' +
        'transform:translate(-50%,-50%);' +
        'animation:ripple-ring 0.6s ease-out forwards;' +
      '}';
    document.head.appendChild(style);

    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.btn');
      if (!btn) return;

      var x = e.clientX;
      var y = e.clientY;

      for (var i = 0; i < 3; i++) {
        (function (delay) {
          setTimeout(function () {
            var ring = document.createElement('div');
            ring.className = 'energy-ring';
            ring.style.left = x + 'px';
            ring.style.top = y + 'px';
            document.body.appendChild(ring);
            setTimeout(function () {
              if (ring.parentNode) ring.parentNode.removeChild(ring);
            }, 650);
          }, delay);
        })(i * 100);
      }
    });
  })();

  /* ------------------------------------------
     1. CUSTOM CURSOR WITH ENERGY TRAIL
     ------------------------------------------ */
  var cursorDot = document.querySelector('.cursor-dot');
  var cursorTrail = document.querySelector('.cursor-trail');

  var mouseX = 0;
  var mouseY = 0;
  var trailX = 0;
  var trailY = 0;
  var trailLerp = 0.15;

  if (!isTouchDevice && cursorDot && cursorTrail) {
    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.transform = 'translate(' + mouseX + 'px, ' + mouseY + 'px)';
    });

    // Hover expansion on interactive elements
    var hoverTargets = 'a, button, .btn, .skill-icon, .skill-scroll, .project-card';

    document.addEventListener('mouseover', function (e) {
      if (e.target.closest(hoverTargets)) {
        cursorTrail.classList.add('cursor-hover');
      }
    });

    document.addEventListener('mouseout', function (e) {
      if (e.target.closest(hoverTargets)) {
        cursorTrail.classList.remove('cursor-hover');
      }
    });

    // Click pulse
    document.addEventListener('mousedown', function () {
      cursorTrail.style.transform = 'translate(' + trailX + 'px, ' + trailY + 'px) scale(0.75)';
    });

    document.addEventListener('mouseup', function () {
      cursorTrail.style.transform = 'translate(' + trailX + 'px, ' + trailY + 'px) scale(1)';
    });

    function animateCursor() {
      trailX += (mouseX - trailX) * trailLerp;
      trailY += (mouseY - trailY) * trailLerp;
      cursorTrail.style.transform = 'translate(' + trailX + 'px, ' + trailY + 'px)';
      requestAnimationFrame(animateCursor);
    }

    requestAnimationFrame(animateCursor);
  } else {
    // Hide custom cursors on touch devices
    if (cursorDot) cursorDot.style.display = 'none';
    if (cursorTrail) cursorTrail.style.display = 'none';
  }

  /* ==========================================================
     2. PARTICLE SYSTEM (QI ENERGY / DUST) + G. ENHANCED BURSTS
     ========================================================== */
  var particleCanvas = document.getElementById('particleCanvas');

  if (particleCanvas) {
    var ctx = particleCanvas.getContext('2d');
    var canvasW, canvasH;
    var particles = [];
    var burstParticles = [];
    var particleCount = isTouchDevice ? 30 : 60;

    function resizeCanvas() {
      canvasW = particleCanvas.width = window.innerWidth;
      canvasH = particleCanvas.height = window.innerHeight;
    }

    resizeCanvas();

    /* --- Standard Particle --- */
    function Particle(initial) {
      this.reset(initial);
    }

    Particle.prototype.reset = function (initial) {
      this.x = Math.random() * canvasW;
      this.y = initial ? Math.random() * canvasH : canvasH + 10;
      this.size = Math.random() * 2 + 1;
      this.speedY = Math.random() * 0.4 + 0.2;
      this.opacity = Math.random() * 0.3 + 0.1;
      this.swayPhase = Math.random() * Math.PI * 2;
      this.swayAmplitude = Math.random() * 0.5 + 0.2;
      this.swaySpeed = Math.random() * 0.01 + 0.005;
    };

    Particle.prototype.update = function () {
      this.y -= this.speedY;
      this.swayPhase += this.swaySpeed;
      this.x += Math.sin(this.swayPhase) * this.swayAmplitude;
      if (this.y < -10) this.reset(false);
    };

    Particle.prototype.draw = function () {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, ' + this.opacity + ')';
      ctx.fill();
    };

    for (var i = 0; i < particleCount; i++) {
      particles.push(new Particle(true));
    }

    /* --- G. Burst Particle (qi energy surges) --- */
    function BurstParticle(ox, oy) {
      var angle = Math.random() * Math.PI * 2;
      var speed = Math.random() * 3 + 1.5;
      this.x = ox;
      this.y = oy;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.size = Math.random() * 3 + 2;
      this.opacity = 0.8;
      this.life = 1.0;
      this.decay = Math.random() * 0.015 + 0.01;
      this.friction = 0.97;
    }

    BurstParticle.prototype.update = function () {
      this.vx *= this.friction;
      this.vy *= this.friction;
      this.x += this.vx;
      this.y += this.vy;
      this.life -= this.decay;
      this.opacity = this.life * 0.8;
    };

    BurstParticle.prototype.draw = function () {
      if (this.opacity <= 0) return;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * this.life, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, ' + Math.max(0, this.opacity) + ')';
      ctx.fill();
    };

    // Spawn burst every 3-5 seconds
    var lastBurst = 0;
    var nextBurstInterval = 3000 + Math.random() * 2000;

    function spawnBurst(timestamp) {
      if (timestamp - lastBurst > nextBurstInterval) {
        lastBurst = timestamp;
        nextBurstInterval = 3000 + Math.random() * 2000;
        var bx = Math.random() * canvasW;
        var by = Math.random() * canvasH;
        var count = 8 + Math.floor(Math.random() * 5);
        for (var j = 0; j < count; j++) {
          burstParticles.push(new BurstParticle(bx, by));
        }
      }
    }

    /* --- Main animation loop --- */
    function animateParticles(timestamp) {
      if (tabHidden) {
        requestAnimationFrame(animateParticles);
        return;
      }

      ctx.clearRect(0, 0, canvasW, canvasH);


      // Standard particles
      for (var p = 0; p < particles.length; p++) {
        particles[p].update();
        particles[p].draw();
      }

      // Burst particles
      spawnBurst(timestamp || 0);
      for (var b = burstParticles.length - 1; b >= 0; b--) {
        burstParticles[b].update();
        burstParticles[b].draw();
        if (burstParticles[b].life <= 0) {
          burstParticles.splice(b, 1);
        }
      }

      requestAnimationFrame(animateParticles);
    }

    requestAnimationFrame(animateParticles);

    // Debounced resize
    window.addEventListener('resize', debounce(resizeCanvas, 200), { passive: true });
  }

  /* ------------------------------------------
     3. TYPING EFFECT
     ------------------------------------------ */
  var typedElement = document.getElementById('typingText');

  if (typedElement) {
    var phrases = ['Full Stack Developer', 'Code Cultivator', 'Digital Swordsmith'];
    var phraseIndex = 0;
    var charIndex = 0;
    var isDeleting = false;

    function type() {
      var current = phrases[phraseIndex];

      if (isDeleting) {
        charIndex--;
        typedElement.textContent = current.substring(0, charIndex);
      } else {
        charIndex++;
        typedElement.textContent = current.substring(0, charIndex);
      }

      var delay;

      if (!isDeleting && charIndex === current.length) {
        delay = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 400;
      } else {
        delay = isDeleting ? 50 : 100;
      }

      setTimeout(type, delay);
    }

    type();
  }

  /* ------------------------------------------
     4. NAVBAR SCROLL EFFECT
     ------------------------------------------ */
  var navbar = document.getElementById('navbar');
  var sections = document.querySelectorAll('section[id]');
  var navLinksAll = document.querySelectorAll('.nav-links a');

  function handleNavScroll() {
    var scrollY = window.scrollY;

    // Scrolled class
    if (navbar) {
      if (scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Active section highlight
    var currentSection = '';
    sections.forEach(function (section) {
      var sectionTop = section.offsetTop - 100;
      var sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinksAll.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentSection) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });

  /* ------------------------------------------
     5. MOBILE MENU TOGGLE
     ------------------------------------------ */
  var hamburger = document.querySelector('.hamburger');
  var navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  /* ------------------------------------------
     6. SMOOTH SCROLL
     ------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ------------------------------------------
     7. SCROLL REVEAL ANIMATION
     ------------------------------------------ */
  var revealElements = document.querySelectorAll('.reveal');
  var revealTextElements = document.querySelectorAll('.reveal-text');

  if (revealElements.length > 0) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // Stagger based on element index within its parent
          var parent = entry.target.parentElement;
          var siblings = parent ? parent.querySelectorAll('.reveal') : [];
          var index = 0;
          siblings.forEach(function (el, i) {
            if (el === entry.target) index = i;
          });

          setTimeout(function () {
            entry.target.classList.add('visible');
          }, index * 100);

          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '-40px'
    });

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  if (revealTextElements.length > 0) {
    var textObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          textObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '-40px'
    });

    revealTextElements.forEach(function (el) {
      textObserver.observe(el);
    });
  }

  /* ------------------------------------------
     8. MOUSE PARALLAX ON HERO
     ------------------------------------------ */
  var heroSection = document.getElementById('path');
  var heroContent = document.querySelector('.hero-content');

  if (heroSection && heroContent && !isTouchDevice) {
    var parallaxX = 0;
    var parallaxY = 0;
    var targetParallaxX = 0;
    var targetParallaxY = 0;
    var parallaxMax = 15;
    var parallaxSmooth = 0.08;

    heroSection.addEventListener('mousemove', function (e) {
      var rect = heroSection.getBoundingClientRect();
      var centerX = rect.width / 2;
      var centerY = rect.height / 2;
      var offsetX = (e.clientX - rect.left - centerX) / centerX;
      var offsetY = (e.clientY - rect.top - centerY) / centerY;

      targetParallaxX = -offsetX * parallaxMax;
      targetParallaxY = -offsetY * parallaxMax;
    });

    heroSection.addEventListener('mouseleave', function () {
      targetParallaxX = 0;
      targetParallaxY = 0;
    });

    function animateParallax() {
      parallaxX += (targetParallaxX - parallaxX) * parallaxSmooth;
      parallaxY += (targetParallaxY - parallaxY) * parallaxSmooth;
      heroContent.style.transform = 'translate3d(' + parallaxX + 'px, ' + parallaxY + 'px, 0)';
      requestAnimationFrame(animateParallax);
    }

    requestAnimationFrame(animateParallax);
  }

  /* ------------------------------------------
     9. BACK TO TOP BUTTON
     ------------------------------------------ */
  var backToTop = document.getElementById('backToTop');

  function handleBackToTopVisibility() {
    if (!backToTop) return;
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  if (backToTop) {
    window.addEventListener('scroll', handleBackToTopVisibility, { passive: true });

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ------------------------------------------
     10. CONTACT FORM VALIDATION
     ------------------------------------------ */
  var contactForm = document.getElementById('contactForm');

  if (contactForm) {
    var formStatus = document.getElementById('formStatus');

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = contactForm.querySelector('[name="name"]');
      var email = contactForm.querySelector('[name="email"]');
      var message = contactForm.querySelector('[name="message"]');
      var errors = [];

      // Reset previous states
      [name, email, message].forEach(function (field) {
        if (field) field.classList.remove('error');
      });

      // Validate name
      if (name && name.value.trim().length < 2) {
        errors.push('Name must be at least 2 characters.');
        name.classList.add('error');
      }

      // Validate email
      if (email) {
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value.trim())) {
          errors.push('Please enter a valid email address.');
          email.classList.add('error');
        }
      }

      // Validate message
      if (message && message.value.trim().length < 10) {
        errors.push('Message must be at least 10 characters.');
        message.classList.add('error');
      }

      if (formStatus) {
        if (errors.length > 0) {
          formStatus.textContent = errors[0];
          formStatus.className = 'form-status error';
        } else {
          formStatus.textContent = 'Your message has been sent successfully. The dao of communication is fulfilled.';
          formStatus.className = 'form-status success';
          contactForm.reset();

          // Clear status after 5 seconds
          setTimeout(function () {
            formStatus.textContent = '';
            formStatus.className = 'form-status';
          }, 5000);
        }
      }
    });
  }

  /* ------------------------------------------
     11. GLOWING HOVER EFFECT ON CARDS
     ------------------------------------------ */
  var glowTargets = document.querySelectorAll('.project-card, .timeline-card');

  glowTargets.forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      card.style.background = 'radial-gradient(circle at ' + x + 'px ' + y + 'px, rgba(255, 255, 255, 0.03), transparent 50%)';
    });

    card.addEventListener('mouseleave', function () {
      card.style.background = '';
    });
  });

  /* ------------------------------------------
     12. SECTION DIVIDER SLASH EFFECT (original)
     ------------------------------------------ */
  var sectionDividers = document.querySelectorAll('.section-divider');

  if (sectionDividers.length > 0) {
    var slashObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('slash-active');
          slashObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5
    });

    sectionDividers.forEach(function (divider) {
      slashObserver.observe(divider);
    });
  }

  /* ==========================================================
     A. QI AURA ON PORTRAIT FRAME
     Animated glowing energy arcs around the portrait
     ========================================================== */
  (function qiAura() {
    var portraitFrame = document.querySelector('.portrait-frame');
    if (!portraitFrame) return;

    var canvas = document.createElement('canvas');
    canvas.style.cssText =
      'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);' +
      'pointer-events:none;z-index:0;';
    portraitFrame.style.position = 'relative';
    portraitFrame.insertBefore(canvas, portraitFrame.firstChild);

    var aCtx = canvas.getContext('2d');
    var aW, aH, cx, cy, radius;
    var auraParticles = [];
    var isInView = false;

    function sizeAuraCanvas() {
      var rect = portraitFrame.getBoundingClientRect();
      var pad = 60;
      aW = canvas.width = rect.width + pad;
      aH = canvas.height = rect.height + pad;
      cx = aW / 2;
      cy = aH / 2;
      radius = Math.min(rect.width, rect.height) / 2 + 10;
    }

    sizeAuraCanvas();
    window.addEventListener('resize', debounce(sizeAuraCanvas, 250), { passive: true });

    // Viewport observer for the portrait
    var auraObs = new IntersectionObserver(function (entries) {
      isInView = entries[0].isIntersecting;
    }, { threshold: 0.1 });
    auraObs.observe(portraitFrame);

    // Aura edge particles
    function AuraParticle() {
      var angle = Math.random() * Math.PI * 2;
      this.x = cx + Math.cos(angle) * radius;
      this.y = cy + Math.sin(angle) * radius;
      this.vx = (Math.random() - 0.5) * 1.5;
      this.vy = -Math.random() * 1.5 - 0.5;
      this.life = 1.0;
      this.decay = Math.random() * 0.02 + 0.015;
      this.size = Math.random() * 2 + 1;
    }

    function drawAura(time) {
      if (tabHidden || !isInView) {
        requestAnimationFrame(drawAura);
        return;
      }

      aCtx.clearRect(0, 0, aW, aH);

      // Draw multiple rotating arc layers
      for (var layer = 0; layer < 4; layer++) {
        var speed = (layer + 1) * 0.3;
        var baseAngle = (time * 0.001 * speed) % (Math.PI * 2);
        var arcLen = Math.PI * (0.3 + layer * 0.15);

        aCtx.beginPath();
        aCtx.arc(cx, cy, radius + layer * 4, baseAngle, baseAngle + arcLen);
        aCtx.strokeStyle = 'rgba(255, 255, 255, ' + (0.12 - layer * 0.025) + ')';
        aCtx.lineWidth = 1.5;
        aCtx.stroke();

        // Second arc on opposite side
        aCtx.beginPath();
        aCtx.arc(cx, cy, radius + layer * 4, baseAngle + Math.PI, baseAngle + Math.PI + arcLen * 0.7);
        aCtx.strokeStyle = 'rgba(255, 255, 255, ' + (0.08 - layer * 0.015) + ')';
        aCtx.lineWidth = 1;
        aCtx.stroke();
      }

      // Pulsing glow ring
      var pulse = Math.sin(time * 0.003) * 0.05 + 0.1;
      aCtx.beginPath();
      aCtx.arc(cx, cy, radius - 2, 0, Math.PI * 2);
      aCtx.strokeStyle = 'rgba(255, 255, 255, ' + pulse + ')';
      aCtx.lineWidth = 2;
      aCtx.stroke();

      // Emit edge particles occasionally
      if (Math.random() < 0.15) {
        auraParticles.push(new AuraParticle());
      }

      // Update and draw edge particles
      for (var ap = auraParticles.length - 1; ap >= 0; ap--) {
        var pp = auraParticles[ap];
        pp.x += pp.vx;
        pp.y += pp.vy;
        pp.life -= pp.decay;
        if (pp.life <= 0) {
          auraParticles.splice(ap, 1);
          continue;
        }
        aCtx.beginPath();
        aCtx.arc(pp.x, pp.y, pp.size * pp.life, 0, Math.PI * 2);
        aCtx.fillStyle = 'rgba(255, 255, 255, ' + (pp.life * 0.6) + ')';
        aCtx.fill();
      }

      requestAnimationFrame(drawAura);
    }

    requestAnimationFrame(drawAura);
  })();

  /* ==========================================================
     B. SWORD SLASH SECTION TRANSITIONS
     Diagonal white slash line sweeps across when section enters
     ========================================================== */
  (function swordSlash() {
    var style = document.createElement('style');
    style.textContent =
      '.slash-effect{' +
        'position:absolute;top:0;left:0;width:100%;height:100%;overflow:hidden;pointer-events:none;z-index:10;' +
      '}' +
      '.slash-line{' +
        'position:absolute;top:50%;left:-10%;width:0;height:2px;' +
        'background:linear-gradient(90deg,transparent,#fff 20%,#fff 80%,transparent);' +
        'transform:rotate(-30deg);transform-origin:left center;' +
        'opacity:0;' +
      '}' +
      '.slash-line.animate{' +
        'opacity:1;width:130%;' +
        'transition:width 0.5s cubic-bezier(0.22,1,0.36,1),opacity 0.1s;' +
      '}' +
      '.slash-line.done{opacity:0;transition:opacity 0.3s 0.2s;}' +
      '.slash-flare{' +
        'position:absolute;top:50%;left:-10%;width:8px;height:8px;' +
        'background:radial-gradient(circle,rgba(255,255,255,0.9),transparent 70%);' +
        'border-radius:50%;transform:translate(-50%,-50%) rotate(-30deg);' +
        'opacity:0;' +
      '}' +
      '.slash-flare.animate{opacity:1;transition:opacity 0.1s;}' +
      '.slash-flare.done{opacity:0;transition:opacity 0.3s;}';
    document.head.appendChild(style);

    var allSections = document.querySelectorAll('section[id]');

    allSections.forEach(function (sec) {
      sec.style.position = sec.style.position || 'relative';

      var container = document.createElement('div');
      container.className = 'slash-effect';

      var line = document.createElement('div');
      line.className = 'slash-line';

      var flare = document.createElement('div');
      flare.className = 'slash-flare';

      container.appendChild(flare);
      container.appendChild(line);
      sec.appendChild(container);
    });

    var sectionSlashObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var slashEl = entry.target.querySelector('.slash-effect');
          if (!slashEl) return;
          var line = slashEl.querySelector('.slash-line');
          var flare = slashEl.querySelector('.slash-flare');

          // Trigger flare and slash
          requestAnimationFrame(function () {
            if (flare) flare.classList.add('animate');
            if (line) line.classList.add('animate');
          });

          // Fade out after animation
          setTimeout(function () {
            if (line) line.classList.add('done');
            if (flare) flare.classList.add('done');
          }, 600);

          // Clean up
          setTimeout(function () {
            if (slashEl && slashEl.parentNode) slashEl.parentNode.removeChild(slashEl);
          }, 1200);

          sectionSlashObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    allSections.forEach(function (sec) {
      sectionSlashObserver.observe(sec);
    });
  })();

  /* ==========================================================
     E. INK SPLATTER / DISSOLVE ON SECTION ENTER
     Brief ink dot marks appear at random positions within section
     ========================================================== */
  (function inkSplatter() {
    var style = document.createElement('style');
    style.textContent =
      '@keyframes ink-dot{' +
        '0%{transform:scale(0);opacity:0.7;}' +
        '40%{transform:scale(1.2);opacity:0.5;}' +
        '100%{transform:scale(1.5);opacity:0;}' +
      '}' +
      '.ink-dot{' +
        'position:absolute;border-radius:50%;pointer-events:none;z-index:5;' +
        'background:rgba(0,0,0,0.6);' +
        'box-shadow:0 0 8px 2px rgba(255,255,255,0.15);' +
        'animation:ink-dot 0.8s ease-out forwards;' +
      '}';
    document.head.appendChild(style);

    var inkSections = document.querySelectorAll('section[id]');

    var inkObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var sec = entry.target;
          sec.style.position = sec.style.position || 'relative';

          var dotCount = 5 + Math.floor(Math.random() * 4);
          for (var d = 0; d < dotCount; d++) {
            var dot = document.createElement('div');
            dot.className = 'ink-dot';
            var size = 6 + Math.random() * 10;
            dot.style.width = size + 'px';
            dot.style.height = size + 'px';
            dot.style.top = (10 + Math.random() * 80) + '%';
            dot.style.left = (5 + Math.random() * 90) + '%';
            dot.style.animationDelay = (Math.random() * 0.3) + 's';
            sec.appendChild(dot);

            // Remove after animation
            (function (el) {
              setTimeout(function () {
                if (el.parentNode) el.parentNode.removeChild(el);
              }, 1200);
            })(dot);
          }

          inkObserver.unobserve(sec);
        }
      });
    }, { threshold: 0.1 });

    inkSections.forEach(function (sec) {
      inkObserver.observe(sec);
    });
  })();

  /* ==========================================================
     I. SKILL SCROLL ACTIVATION
     White flash/pulse and border-glow sweep on skill icons
     ========================================================== */
  (function skillActivation() {
    var style = document.createElement('style');
    style.textContent =
      '@keyframes skill-flash{' +
        '0%{box-shadow:0 0 0 0 rgba(255,255,255,0);}' +
        '30%{box-shadow:0 0 15px 4px rgba(255,255,255,0.5);}' +
        '100%{box-shadow:0 0 0 0 rgba(255,255,255,0);}' +
      '}' +
      '@keyframes skill-border-sweep{' +
        '0%{background-position:200% 0;}' +
        '100%{background-position:-200% 0;}' +
      '}' +
      '.skill-scroll.skill-activated{' +
        'animation:skill-flash 0.6s ease-out;' +
      '}' +
      '.skill-scroll.skill-activated::after{' +
        'content:"";position:absolute;top:-2px;left:-2px;right:-2px;bottom:-2px;' +
        'border-radius:inherit;z-index:-1;' +
        'background:linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.4) 50%,transparent 100%);' +
        'background-size:200% 100%;' +
        'animation:skill-border-sweep 0.8s ease-out forwards;' +
      '}';
    document.head.appendChild(style);

    var skillCategories = document.querySelectorAll('.skill-category');

    var skillObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var scrolls = entry.target.querySelectorAll('.skill-scroll');
          scrolls.forEach(function (scroll, idx) {
            setTimeout(function () {
              scroll.style.position = scroll.style.position || 'relative';
              scroll.classList.add('skill-activated');
            }, idx * 80);
          });
          skillObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    skillCategories.forEach(function (cat) {
      skillObserver.observe(cat);
    });
  })();

  /* ------------------------------------------
     INIT: Run scroll-dependent checks once
     ------------------------------------------ */
  handleNavScroll();
  handleBackToTopVisibility();

})();