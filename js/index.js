// Modern Portfolio JavaScript

// Typewriter Effect
var app = document.getElementById('app');
var typewriter = new Typewriter(app, {
  loop: true,
  delay: 75,
});

typewriter
  .pauseFor(1000)
  .typeString('Bridging the gap between 5G today and 6G tomorrow, one algorithm at a time.')
  .pauseFor(2000)
  .deleteAll()
  .typeString('Where wireless meets AI: designing the future of connectivity through intelligent RF systems.')
  .pauseFor(2000)
  .deleteAll()
  .typeString('From mmWave modems to reinforcement learning — engineering the invisible threads that connect our world.')
  .pauseFor(3000)
  .start();

// Scroll Animations
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

// Modern Toggle Functionality
function initToggleHandlers() {
  const toggles = [
    { id: 'toggleExperience99', labelId: 'toggleLabel99' },
    { id: 'toggleExperience1', labelId: 'toggleLabel1' },
    { id: 'toggleExperience2', labelId: 'toggleLabel2' },
    { id: 'toggleExperience3', labelId: 'toggleLabel3' },
    { id: 'toggleExperience4', labelId: 'toggleLabel4' }
  ];

  toggles.forEach(toggle => {
    const checkbox = document.getElementById(toggle.id);
    const label = document.getElementById(toggle.labelId);
    
    if (checkbox && label) {
      checkbox.addEventListener('change', function() {
        label.textContent = this.checked ? 'Less Details' : 'More Details';
        
        // Add smooth transition effect
        const detailsList = this.nextElementSibling.nextElementSibling;
        if (detailsList) {
          if (this.checked) {
            detailsList.style.maxHeight = detailsList.scrollHeight + 'px';
          } else {
            detailsList.style.maxHeight = '0px';
          }
        }
      });
    }
  });
}

// Button Event Handlers
function initButtonHandlers() {
  // External link buttons
  const buttonMap = {
    'btn9': 'https://github.com/vibhorguptaa/REDD',
    'btn10': 'https://drive.google.com/file/d/15ZvI5zNGK1gu75SpL1oZyRUMNCs3yKI-/view',
    'btn11': 'https://drive.google.com/file/d/1Yc8qQuPcZRyRhPt83A9489TXNT7BD5BD/view',
    'btn12': 'https://drive.google.com/file/d/1Dz34jEJs5IBqF_xNFXEnNi7038rb4AFl/view',
    'btn13': 'assets/RESUME_VIBHOR_GUPTA_2025.pdf',
    'btn14': 'https://huggingface.co/collections/dyumat/rlhf-umich-text-summarization-661d7eb09e04cdf186981fef',
    'btn15': 'https://drive.google.com/file/d/1npPTz7F22KvLpIosdXFF8yBK0lNEkhti/view'
  };

  Object.entries(buttonMap).forEach(([btnId, url]) => {
    const btn = document.getElementById(btnId);
    if (btn) {
      btn.onclick = function() {
        window.open(url, '_blank');
      };
    }
  });
}

// Smooth Scrolling for Internal Links
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Loading Animation
function showLoading(button) {
  const originalText = button.textContent;
  button.innerHTML = '<span class="loading"></span> Loading...';
  button.disabled = true;
  
  setTimeout(() => {
    button.textContent = originalText;
    button.disabled = false;
  }, 2000);
}

// Enhanced Button Interactions
function initEnhancedButtons() {
  document.querySelectorAll('.btn-modern').forEach(button => {
    button.addEventListener('click', function(e) {
      // Add ripple effect
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}

// Parallax Effect for Hero Section
function initParallax() {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-section');
    if (hero) {
      hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  });
}

// Theme Toggle (Optional Enhancement)
function initThemeToggle() {
  const themeToggle = document.createElement('button');
  themeToggle.className = 'theme-toggle';
  themeToggle.innerHTML = '🌙';
  themeToggle.style.position = 'fixed';
  themeToggle.style.top = '20px';
  themeToggle.style.right = '20px';
  themeToggle.style.zIndex = '1000';
  themeToggle.style.background = 'var(--accent-color)';
  themeToggle.style.border = 'none';
  themeToggle.style.borderRadius = '50%';
  themeToggle.style.width = '50px';
  themeToggle.style.height = '50px';
  themeToggle.style.fontSize = '20px';
  themeToggle.style.cursor = 'pointer';
  themeToggle.style.transition = 'all 0.3s ease';
  
  // Uncomment to add theme toggle
  // document.body.appendChild(themeToggle);
  
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    themeToggle.innerHTML = document.body.classList.contains('light-theme') ? '☀️' : '🌙';
  });
}

// Performance Monitoring
function logPerformance() {
  window.addEventListener('load', () => {
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log(`Page loaded in ${loadTime}ms`);
  });
}

// Dynamic Tech Background
function createTechBackground() {
  const techBg = document.createElement('div');
  techBg.className = 'tech-background';
  document.body.appendChild(techBg);
  
  // Create Neural Network Nodes
  for (let i = 0; i < 15; i++) {
    const node = document.createElement('div');
    node.className = 'neural-node';
    node.style.left = Math.random() * 100 + '%';
    node.style.top = Math.random() * 100 + '%';
    node.style.animationDelay = Math.random() * 3 + 's';
    techBg.appendChild(node);
  }
  
  // Create Neural Connections
  for (let i = 0; i < 8; i++) {
    const connection = document.createElement('div');
    connection.className = 'neural-connection';
    connection.style.left = Math.random() * 80 + '%';
    connection.style.top = Math.random() * 100 + '%';
    connection.style.width = Math.random() * 200 + 100 + 'px';
    connection.style.transform = `rotate(${Math.random() * 360}deg)`;
    connection.style.animationDelay = Math.random() * 6 + 's';
    techBg.appendChild(connection);
  }
  
  // Create Cell Towers
  for (let i = 0; i < 5; i++) {
    const tower = document.createElement('div');
    tower.className = 'cell-tower';
    tower.style.left = Math.random() * 90 + '%';
    tower.style.bottom = '0';
    tower.style.height = Math.random() * 150 + 50 + 'px';
    tower.style.animationDelay = Math.random() * 4 + 's';
    techBg.appendChild(tower);
  }
  
  // Create Signal Waves
  for (let i = 0; i < 10; i++) {
    const wave = document.createElement('div');
    wave.className = 'signal-wave';
    wave.style.left = Math.random() * 100 + '%';
    wave.style.top = Math.random() * 100 + '%';
    wave.style.animationDelay = Math.random() * 4 + 's';
    techBg.appendChild(wave);
  }
  
  // Create RF Lines
  for (let i = 0; i < 6; i++) {
    const rfLine = document.createElement('div');
    rfLine.className = 'rf-line';
    rfLine.style.top = Math.random() * 100 + '%';
    rfLine.style.width = '100%';
    rfLine.style.animationDelay = Math.random() * 8 + 's';
    techBg.appendChild(rfLine);
  }
  
  // Create Binary Rain
  for (let i = 0; i < 20; i++) {
    const binary = document.createElement('div');
    binary.className = 'binary-rain';
    binary.textContent = Math.random() > 0.5 ? '1' : '0';
    binary.style.left = Math.random() * 100 + '%';
    binary.style.animationDelay = Math.random() * 10 + 's';
    binary.style.animationDuration = (Math.random() * 5 + 5) + 's';
    techBg.appendChild(binary);
  }
  
  // Create Network Icons (5G/6G)
  const networkIcons = ['5G', '6G', 'RF', 'AI', 'IoT', 'mmW'];
  for (let i = 0; i < 6; i++) {
    const icon = document.createElement('div');
    icon.className = 'network-icon';
    icon.textContent = networkIcons[i];
    icon.style.left = Math.random() * 90 + '%';
    icon.style.top = Math.random() * 90 + '%';
    icon.style.animationDelay = Math.random() * 6 + 's';
    techBg.appendChild(icon);
  }
  
  // Create Particles
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 15 + 's';
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
    techBg.appendChild(particle);
  }
  
  // Create Circuit Lines
  for (let i = 0; i < 12; i++) {
    const circuit = document.createElement('div');
    circuit.className = 'circuit-line';
    circuit.style.left = Math.random() * 100 + '%';
    circuit.style.top = Math.random() * 100 + '%';
    circuit.style.width = Math.random() * 300 + 100 + 'px';
    circuit.style.transform = `rotate(${Math.random() * 180}deg)`;
    circuit.style.animationDelay = Math.random() * 6 + 's';
    techBg.appendChild(circuit);
  }
}

// Enhanced Parallax with Tech Elements
function initTechParallax() {
  // Skip parallax on mobile devices for performance
  if (window.innerWidth <= 768) {
    return;
  }
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-section');
    const techElements = document.querySelectorAll('.neural-node, .signal-wave, .network-icon');
    
    if (hero) {
      hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    // Parallax for tech elements
    techElements.forEach((element, index) => {
      const speed = 0.2 + (index % 3) * 0.1;
      element.style.transform += ` translateY(${scrolled * speed}px)`;
    });
  });
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', function() {
  createTechBackground();
  initScrollAnimations();
  initToggleHandlers();
  initButtonHandlers();
  initSmoothScrolling();
  initEnhancedButtons();
  initTechParallax();
  initThemeToggle();
  logPerformance();
  
  console.log('Modern tech portfolio initialized with dynamic background! 🚀🌐');
});

// Add CSS for ripple effect
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  .btn-modern {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  .theme-toggle:hover {
    transform: scale(1.1);
  }
`;
document.head.appendChild(rippleStyle);