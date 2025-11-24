// Premium Tech Portfolio JS

document.addEventListener('DOMContentLoaded', () => {
  initTypewriter();
  initExpandableCards();
  initDockNav();
  initSmoothScroll();
  new ParticleNetwork('hero-canvas');
  initScrollytelling();
  initTiltEffect();
  initHeroAnimations();
  initPersistentNav();
});

function initExpandableCards() {
  const cards = document.querySelectorAll('.expandable-card');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      // Toggle current card
      card.classList.toggle('expanded');

      // Optional: Close other cards
      cards.forEach(otherCard => {
        if (otherCard !== card) {
          otherCard.classList.remove('expanded');
        }
      });
    });
  });
}

function initHeroAnimations() {
  const elements = document.querySelectorAll('.stagger-text');
  elements.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add('visible');
    }, 200 * (index + 1));
  });
}

function initMagneticButtons() {
  const buttons = document.querySelectorAll('.btn-magnetic');

  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const deltaX = (x - centerX) * 0.3;
      const deltaY = (y - centerY) * 0.3;

      btn.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });
}

function initDockNav() {
  const dockItems = document.querySelectorAll('.dock-item');
  const sections = document.querySelectorAll('section');

  // Active state on scroll
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - sectionHeight / 3)) {
        current = section.getAttribute('id');
      }
    });

    dockItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href').includes(current)) {
        item.classList.add('active');
      }
    });
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
}

/* Interactive Hero Background - Particle Network */
class ParticleNetwork {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.hoverMouse = { x: -100, y: -100 };
    this.connectDistance = 120;
    this.mouseDistance = 150;

    this.resize();
    this.init();
    this.animate();

    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.hoverMouse.x = e.clientX - rect.left;
      this.hoverMouse.y = e.clientY - rect.top;
    });
    window.addEventListener('mouseout', () => {
      this.hoverMouse.x = -100;
      this.hoverMouse.y = -100;
    });
  }

  resize() {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
    this.init(); // Re-init particles on resize
  }

  init() {
    this.particles = [];
    const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 15000); // Density

    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach(p => {
      // Move
      p.x += p.vx;
      p.y += p.vy;

      // Bounce
      if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;

      // Draw Particle
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = 'rgba(0, 242, 234, 0.5)'; // Cyan
      this.ctx.fill();

      // Connect to Mouse
      const dxMouse = this.hoverMouse.x - p.x;
      const dyMouse = this.hoverMouse.y - p.y;
      const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

      if (distMouse < this.mouseDistance) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = `rgba(0, 242, 234, ${1 - distMouse / this.mouseDistance})`;
        this.ctx.lineWidth = 1;
        this.ctx.moveTo(p.x, p.y);
        this.ctx.lineTo(this.hoverMouse.x, this.hoverMouse.y);
        this.ctx.stroke();

        // Slight attraction to mouse
        if (distMouse > 50) {
          p.x += dxMouse * 0.01;
          p.y += dyMouse * 0.01;
        }
      }

      // Connect to other particles
      this.particles.forEach(p2 => {
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.connectDistance) {
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - dist / this.connectDistance)})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
        }
      });
    });

    requestAnimationFrame(() => this.animate());
  }
}

/* Scrollytelling - Experience Timeline */
function initScrollytelling() {
  const timeline = document.querySelector('.timeline');
  const lineFill = document.querySelector('.timeline-line-fill');
  const items = document.querySelectorAll('.timeline-item');
  const experienceSection = document.querySelector('#experience');

  if (!timeline || !lineFill) return;

  // Observer for fading in items
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });

  items.forEach(item => observer.observe(item));

  // Scroll listener for drawing the line
  // Use window scroll since horizontal layout was reverted
  window.addEventListener('scroll', () => {
    updateTimelineLine();
  });

  function updateTimelineLine() {
    const rect = timeline.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Calculate how much of the timeline is visible
    let percentage = 0;

    // Start drawing when top of timeline hits middle of screen
    const startPoint = windowHeight / 2;

    if (rect.top < startPoint) {
      const distance = startPoint - rect.top;
      percentage = (distance / rect.height) * 100;
    }

    // Clamp between 0 and 100
    percentage = Math.min(Math.max(percentage, 0), 100);

    lineFill.style.height = `${percentage}%`;
  }
}

/* 3D Tilt Effect for Cards */
function initTiltEffect() {
  const cards = document.querySelectorAll('.bento-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10; // Max rotation deg
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  });
}

/* Persistent Navigation Logic */
function initPersistentNav() {
  const nav = document.getElementById('persistent-nav');
  const heroSection = document.querySelector('.hero-section');
  const dockNav = document.querySelector('.dock-nav');

  if (!nav || !heroSection) return;

  window.addEventListener('scroll', () => {
    const heroBottom = heroSection.getBoundingClientRect().bottom;

    // Show nav when hero is scrolled out of view
    if (heroBottom < 100) {
      nav.classList.add('visible');
      if (dockNav) dockNav.style.opacity = '0'; // Hide bottom dock
      if (dockNav) dockNav.style.pointerEvents = 'none';
    } else {
      nav.classList.remove('visible');
      if (dockNav) dockNav.style.opacity = '1'; // Show bottom dock
      if (dockNav) dockNav.style.pointerEvents = 'auto';
    }
  });
}

function initTypewriter() {
  const app = document.getElementById('app');
  if (!app) return;

  const typewriter = new Typewriter(app, {
    loop: true,
    delay: 75,
  });

  typewriter
    .typeString('Wireless Engineer')
    .pauseFor(1000)
    .deleteAll()
    .typeString('AI Researcher')
    .pauseFor(1000)
    .deleteAll()
    .typeString('5G/6G Innovator')
    .pauseFor(1000)
    .start();
}