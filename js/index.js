// Premium Tech Portfolio JS

document.addEventListener('DOMContentLoaded', () => {
  initHeroAnimations();
  initMagneticButtons();
  initDockNav();
  initSmoothScroll();
  initExpandableCards();
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