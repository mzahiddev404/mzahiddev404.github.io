/******************************************
 * INIT WHEN DOM IS READY
 ******************************************/
document.addEventListener('DOMContentLoaded', () => {
  setupThemeToggle();       // dark/light mode toggle
  setupOverlay();           // add dim background
  setupMobileNav();         // toggle nav menu
  setupSmoothScroll();      // scroll to section
  setupSectionHighlight();  // highlight active nav link
  setupNavHoverEffects();   // nav hover feedback
  setupNavLinkClose();      // auto close nav on click
  setupSkillTooltips();     // skill tooltip clicks
  setupBackToTop();         // back to top button
  setupScrollAnimations();  // scroll animations
  setupTypingAnimation();   // typing effect in hero
  setupAnimatedCounters();  // animated stat counters
  setup3DTiltCards();       // 3D tilt on project cards
  setupScrollProgress();    // scroll progress bar
  setupParallaxHero();      // parallax effect on hero
  setupLogoInteraction();  // logo click interaction
  setupGillidandaGame();   // Gillidanda interactive element
  setupProjectDetails();   // project details reveal on hover
  setupSkillChips();       // skill chip interactions

  window.addEventListener('scroll', highlightNavOnScroll);
  window.addEventListener('scroll', updateScrollProgress);
  window.addEventListener('scroll', updateParallax);
});

/******************************************
 * THEME TOGGLE - dark/light mode
 ******************************************/
function setupThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  const icon = themeToggle.querySelector('i');
  
  const savedTheme = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme, icon);
  
  themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme, icon);
  });
}

function updateThemeIcon(theme, icon) {
  if (theme === 'light') {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }
}

/******************************************
 * OVERLAY UTILITY - adds dark backdrop
 ******************************************/
function setupOverlay() {
  const overlay = document.createElement('div');
  overlay.id = 'overlay';
  Object.assign(overlay.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    opacity: '0',
    pointerEvents: 'none',
    transition: 'opacity 0.3s ease',
    zIndex: '90' // behind nav menu
  });
  document.body.appendChild(overlay);
}

/******************************************
 * MOBILE NAV - hamburger toggle logic
 * - toggles menu visibility on click
 * - handles overlay fade and pointer access
 * - click outside closes menu
 ******************************************/
function setupMobileNav() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const overlay = document.getElementById('overlay');

  // Toggle nav on hamburger click
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show');

    if (navMenu.classList.contains('show')) {
      overlay.style.opacity = '1';
      overlay.style.pointerEvents = 'auto';
    } else {
      overlay.style.opacity = '0';

      // Delay pointer-events removal to allow fade-out
      setTimeout(() => {
        overlay.style.pointerEvents = 'none';
      }, 300); // Match CSS transition duration
    }
  });

  // Click outside nav → close menu + fade out overlay
  overlay.addEventListener('click', () => {
    navMenu.classList.remove('show');
    overlay.style.opacity = '0';

    setTimeout(() => {
      overlay.style.pointerEvents = 'none';
    }, 300);
  });
}

/******************************************
 * SMOOTH SCROLLING - scrolls to sections
 ******************************************/
function setupSmoothScroll() {
  const sectionLinks = document.querySelectorAll('a[href^="#"]');
  const overlay = document.getElementById('overlay');
  const navMenu = document.querySelector('.nav-menu');

  sectionLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      target?.scrollIntoView({ behavior: 'smooth' });

      // After scroll, hide menu + overlay
      navMenu.classList.remove('show');
      overlay.style.opacity = '0';
      overlay.style.pointerEvents = 'none';
    });
  });
}

/******************************************
 * SECTION HIGHLIGHT - tracks scroll position
 ******************************************/
function setupSectionHighlight() {
  window.addEventListener('scroll', highlightNavOnScroll);
}

/******************************************
 * highlightNavOnScroll - makes nav link active
 ******************************************/
function highlightNavOnScroll() {
  const sections = document.querySelectorAll('main section');
  const navLinks = document.querySelectorAll('.nav-menu a');

  let current = null;

  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) {
      current = section;
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (current && link.getAttribute('href') === `#${current.id}`) {
      link.classList.add('active');
    }
  });
}

/******************************************
 * NAV HOVER EFFECTS - color changes on hover
 ******************************************/
function setupNavHoverEffects() {
  const navLinks = document.querySelectorAll('.nav-menu a');
  navLinks.forEach(link => {
    link.addEventListener('mouseover', () => {
      link.style.color = '#00bfa6'; // Accent color
    });
    link.addEventListener('mouseout', () => {
      link.style.color = '#fff'; // Reset
    });
  });
}

/******************************************
 * CLOSE NAV ON LINK CLICK - hamburger mobile UX fix
 ******************************************/
function setupNavLinkClose() {
  const navLinks = document.querySelectorAll('.nav-menu a');   // all nav menu links
  const navMenu = document.querySelector('.nav-menu');        // the nav menu
  const overlay = document.getElementById('overlay');        // the dark backdrop

  
  // Loop through each nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      // When any link is clicked:
      navMenu.classList.remove('show');                    // close the menu
      overlay.style.opacity = '0';                        // fade out overlay
      overlay.style.pointerEvents = 'none';               // disable overlay clicks
    });
  });
}

/******************************************
 * SKILLS TOOLTIP LOGIC - reveals on click
 ******************************************/
function setupSkillTooltips() {
  const skillLinks = document.querySelectorAll('.skill-link');

  // Add click listener to each skill link
  skillLinks.forEach(link => {
    link.addEventListener('click', function () {
      skillLinks.forEach(other => {
        other.classList.remove('active');
        other.querySelector('.skill-tooltip').style.display = 'none';
      });

      
    // Then show only the clicked one
      this.classList.add('active');
      const tooltip = this.querySelector('.skill-tooltip');
      tooltip.style.display = 'block';
      
    // Auto-hide tooltip after 3s
      clearTimeout(this.tooltipTimeout);
      this.tooltipTimeout = setTimeout(() => {
        tooltip.style.display = 'none';
        this.classList.remove('active');
      }, 3000);
    });
  });

  // If user clicks outside the skills section, close all tooltips
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#skills')) {
      skillLinks.forEach(link => {
        link.classList.remove('active');
        link.querySelector('.skill-tooltip').style.display = 'none';
      });
    }
  });
}

/******************************************
 * BACK TO TOP BUTTON
 ******************************************/
function setupBackToTop() {
  const backToTop = document.querySelector('.btt');

  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    });

    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/******************************************
 * SCROLL ANIMATIONS
 ******************************************/
function setupScrollAnimations() {
  const sections = document.querySelectorAll('main section');
  
  const observerOptions = {
    root: null,
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-visible');
      }
    });
  }, observerOptions);
  
  sections.forEach(section => {
    observer.observe(section);
  });
}

/******************************************
 * TYPING ANIMATION - hero tagline effect
 ******************************************/
function setupTypingAnimation() {
  const textElement = document.querySelector('.typing-text');
  if (!textElement) return;
  
  const texts = [
    "Code that ships.",
    "Healthcare to tech.",
    "Python, React, FastAPI.",
    "6 Salesforce certs."
  ];
  
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isPaused = false;
  
  function type() {
    const currentText = texts[textIndex];
    
    if (isPaused) {
      setTimeout(type, 2000);
      isPaused = false;
      return;
    }
    
    if (isDeleting) {
      textElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      textElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
      isPaused = true;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
    }
    
    const typingSpeed = isDeleting ? 50 : 100;
    setTimeout(type, typingSpeed);
  }
  
  type();
}

/******************************************
 * ANIMATED COUNTERS - stat number animation
 ******************************************/
function setupAnimatedCounters() {
  const counters = document.querySelectorAll('.highlight-item strong');
  const observerOptions = {
    root: null,
    threshold: 0.5
  };
  
  const animateCounter = (element) => {
    const text = element.textContent;
    
    // Check if it's a number we can animate
    const match = text.match(/^(\d+)/);
    if (!match) return;
    
    const target = parseInt(match[1]);
    const duration = 1500;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        element.textContent = Math.ceil(current) + text.substring(match[0].length);
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = text;
      }
    };
    
    updateCounter();
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        entry.target.classList.add('counted');
        animateCounter(entry.target);
      }
    });
  }, observerOptions);
  
  counters.forEach(counter => observer.observe(counter));
}

/******************************************
 * 3D TILT EFFECT - project cards
 ******************************************/
function setup3DTiltCards() {
  const cards = document.querySelectorAll('#projects li');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
  });
}

/******************************************
 * SCROLL PROGRESS BAR
 ******************************************/
function setupScrollProgress() {
  // Initial setup if needed
}

function updateScrollProgress() {
  const progressBar = document.querySelector('.scroll-progress-bar');
  if (!progressBar) return;
  
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
  progressBar.style.width = scrollPercentage + '%';
}

/******************************************
 * PARALLAX HERO EFFECT
 ******************************************/
let ticking = false;

function setupParallaxHero() {
  // Initial setup if needed
}

function updateParallax() {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const scrolled = window.pageYOffset;
      const header = document.querySelector('header');
      const floatingCode = document.querySelector('.floating-code');
      
      if (header && scrolled < window.innerHeight) {
        header.style.transform = `translateY(${scrolled * 0.5}px)`;
        if (floatingCode) {
          floatingCode.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
      }
      
      ticking = false;
    });
    ticking = true;
  }
}

/******************************************
 * LOGO CLICK INTERACTION - Hidden Feature
 ******************************************/
function setupLogoInteraction() {
  const logo = document.querySelector('.logo img');
  if (!logo) return;
  
  let clicks = 0;
  const messages = [
    "Hey, stop clicking me!",
    "Okay, that's enough clicks...",
    "You found the hidden feature!",
    "You're persistent, I like that.",
    "Developer mode activated.",
    "Want a job? Keep scrolling!"
  ];
  
  logo.addEventListener('click', (e) => {
    e.preventDefault();
    clicks++;
    
    if (clicks === 1 || clicks === 3 || clicks === 5 || clicks === 7 || clicks === 10 || clicks === 15) {
      showHiddenMessage(messages[Math.min(clicks - 1, messages.length - 1)]);
    }
    
    if (clicks === 5) {
      logo.style.animation = 'spin 0.5s ease';
      setTimeout(() => {
        logo.style.animation = '';
      }, 500);
    }
    
    if (clicks >= 10) {
      document.body.style.animation = 'rainbow 3s linear';
      setTimeout(() => {
        document.body.style.animation = '';
      }, 3000);
    }
  });
}

function showHiddenMessage(message) {
  const existing = document.querySelector('.hidden-message');
  if (existing) existing.remove();
  
  const messageDiv = document.createElement('div');
  messageDiv.className = 'hidden-message';
  messageDiv.textContent = message;
  messageDiv.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(135deg, var(--clr-accent), var(--clr-accent-light));
    color: white;
    padding: 20px 40px;
    border-radius: 12px;
    font-size: 1.2rem;
    font-weight: 600;
    z-index: 10000;
    box-shadow: 0 10px 40px rgba(249, 115, 22, 0.4);
    animation: popIn 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  `;
  
  document.body.appendChild(messageDiv);
  
  setTimeout(() => {
    messageDiv.style.animation = 'popOut 0.3s ease forwards';
    setTimeout(() => messageDiv.remove(), 300);
  }, 2000);
}

/******************************************
 * GILLIDANDA INTERACTIVE ELEMENT
 * Ancient sport-inspired animation
 * Enhanced: Realistic physics, visual feedback, scoring
 ******************************************/
function setupGillidandaGame() {
  const game = document.getElementById('gillidanda-game');
  if (!game) return;

  const gilli = game.querySelector('.gilli-stick');
  const danda = game.querySelector('.danda-stick');
  const impactFlash = game.querySelector('.impact-flash');
  const scoreDisplay = game.querySelector('.game-score');
  const targetDisplay = game.querySelector('.game-target');
  const timerDisplay = game.querySelector('.game-timer');
  const statusDisplay = game.querySelector('.game-status');
  const hitIndicator = game.querySelector('.hit-indicator');
  const successMessage = game.querySelector('.success-message');
  const failMessage = game.querySelector('.fail-message');

  let isActive = false;
  let hitCount = 0;
  let score = 0;
  let targetScore = 5;
  let timeLeft = 30;
  let gameTimer = null;
  let gameActive = false;
  let level = 1;

  game.style.pointerEvents = 'auto';
  game.style.cursor = 'pointer';

  // Start game function with enhanced visuals
  function startGame() {
    if (gameActive) return;

    gameActive = true;
    score = 0;
    timeLeft = 30;
    scoreDisplay.textContent = score;
    targetDisplay.textContent = `Target: ${targetScore}`;
    timerDisplay.textContent = `Time: ${timeLeft}s`;
    timerDisplay.style.color = 'var(--clr-text-main)';
    timerDisplay.style.textShadow = '0 2px 8px rgba(0, 0, 0, 0.5)';
    statusDisplay.style.opacity = '0';

    // Show level start message
    statusDisplay.textContent = `🎯 LEVEL ${level} START! 🎯`;
    statusDisplay.style.color = 'var(--clr-accent)';
    statusDisplay.style.borderColor = 'var(--clr-accent)';
    statusDisplay.style.opacity = '1';

    setTimeout(() => {
      statusDisplay.style.opacity = '0';
    }, 1500);

    // Start countdown timer with pulsing effect
    gameTimer = setInterval(() => {
      timeLeft--;
      timerDisplay.textContent = `Time: ${timeLeft}s`;

      if (timeLeft <= 10 && timeLeft > 5) {
        timerDisplay.style.color = '#f97316';
        timerDisplay.style.textShadow = '0 0 15px rgba(249, 115, 22, 0.9)';
        timerDisplay.style.animation = 'timerUrgent 1s ease-in-out infinite';
      } else if (timeLeft <= 5) {
        timerDisplay.style.color = '#ef4444';
        timerDisplay.style.textShadow = '0 0 20px rgba(239, 68, 68, 1)';
        timerDisplay.style.animation = 'timerUrgent 0.5s ease-in-out infinite';
      }

      if (timeLeft <= 0) {
        endGame(false);
      }
    }, 1000);
  }

  // End game function with enhanced celebration
  function endGame(won) {
    gameActive = false;
    clearInterval(gameTimer);

    if (won) {
      // Level complete celebration
      statusDisplay.textContent = `🎉 LEVEL ${level} COMPLETE! 🎉`;
      statusDisplay.style.color = '#22c55e';
      statusDisplay.style.borderColor = '#22c55e';
      statusDisplay.style.animation = 'levelComplete 0.8s ease-out';
      statusDisplay.style.opacity = '1';

      // Create celebration particles
      createCelebrationParticles(game);

      level++;
      targetScore += 2; // Increase difficulty
      setTimeout(() => {
        statusDisplay.style.opacity = '0';
        statusDisplay.style.animation = 'none';
        // Auto-start next level
        setTimeout(startGame, 2500);
      }, 3500);
    } else {
      // Game over with final stats
      statusDisplay.textContent = `💥 GAME OVER!\nLevel: ${level} | Score: ${score}`;
      statusDisplay.style.color = '#ef4444';
      statusDisplay.style.borderColor = '#ef4444';
      statusDisplay.style.animation = 'gameOverShake 0.6s ease-out';
      statusDisplay.style.opacity = '1';

      setTimeout(() => {
        statusDisplay.style.opacity = '0';
        statusDisplay.style.animation = 'none';
        // Reset to level 1
        level = 1;
        targetScore = 5;
        setTimeout(startGame, 4000);
      }, 5000);
    }
  }

  // Update score display
  function updateScore() {
    score++;
    scoreDisplay.textContent = score;

    // Animate score update
    scoreDisplay.style.animation = 'none';
    void scoreDisplay.offsetWidth;
    scoreDisplay.style.animation = 'scorePop 0.3s ease-out';

    // Show success message
    showSuccessMessage();

    // Check win condition
    if (score >= targetScore) {
      endGame(true);
    }
  }

  // Show hit indicator
  function showHitIndicator() {
    hitIndicator.style.opacity = '1';
    hitIndicator.style.animation = 'none';
    void hitIndicator.offsetWidth;
    hitIndicator.style.animation = 'hitPulse 0.4s ease-out';

    setTimeout(() => {
      hitIndicator.style.opacity = '0';
    }, 400);
  }

  // Show success message with random variations
  function showSuccessMessage() {
    const messages = ["Nice!", "Great!", "Excellent!", "Perfect!", "Awesome!"];
    successMessage.textContent = messages[Math.floor(Math.random() * messages.length)];
    successMessage.style.opacity = '1';
    setTimeout(() => {
      successMessage.style.opacity = '0';
    }, 800);
  }

  // Show fail message (for misses if we add them later)
  function showFailMessage() {
    failMessage.style.opacity = '1';
    setTimeout(() => {
      failMessage.style.opacity = '0';
    }, 800);
  }

  // Auto-start first game
  setTimeout(startGame, 1000);
  
  game.addEventListener('click', () => {
    if (!gameActive || isActive) return;

    isActive = true;
    hitCount++;

    // Stop idle animations
    gilli.style.animation = 'none';
    danda.style.animation = 'none';

    // Force reflow
    void gilli.offsetWidth;
    void danda.offsetWidth;

    // Impact flash effect - more dramatic
    impactFlash.style.animation = 'none';
    void impactFlash.offsetWidth;
    impactFlash.style.animation = 'impactFlash 0.6s ease-out';

    // Danda swings with cricket-like power
    danda.style.animation = 'dandaSwing 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';

    // Gilli flies away like a cricket shot - high and far
    setTimeout(() => {
      gilli.style.animation = 'gilliHit 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
      createHitParticles(game, hitCount);
      createGilliTrail(game);
      createImpactShockwave(game);
      updateScore();
      showHitIndicator();
    }, 200);

    // Reset after cricket-like flight completes
    setTimeout(() => {
      // Reset gilli position smoothly
      gilli.style.transform = 'translateX(-50%) rotate(0deg) translateY(0) scale(1)';
      gilli.style.opacity = '1';
      gilli.style.filter = 'brightness(1) blur(0px)';

      // Restart idle animations
      setTimeout(() => {
        gilli.style.animation = 'gilliRest 4s ease-in-out infinite';
        danda.style.animation = 'dandaSwingIdle 4s ease-in-out infinite';
        isActive = false;
      }, 300);
    }, 2500);
  });
  
  // Enhanced hover effects with better instructions
  game.addEventListener('mouseenter', () => {
    game.style.opacity = '0.95';
    game.style.transform = 'scale(1.1)';
    game.style.filter = 'drop-shadow(0 15px 40px rgba(249, 115, 22, 0.7))';
    scoreDisplay.style.opacity = '1';
  });

  game.addEventListener('mouseleave', () => {
    game.style.opacity = '0.6';
    game.style.transform = 'scale(1)';
    game.style.filter = 'drop-shadow(0 10px 30px rgba(249, 115, 22, 0.5))';
    if (score === 0) {
      scoreDisplay.style.opacity = '0.9'; // Keep visible to show it's interactive
    }
  });
}

// Create trail effect when gilli flies - enhanced with motion blur
function createGilliTrail(container) {
  const trailCount = 18; // More trail elements for smoother effect
  for (let i = 0; i < trailCount; i++) {
    const trail = document.createElement('div');
    const size = 12 - (i / trailCount) * 8; // Gets smaller, starts bigger
    trail.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size * 1.4}px;
      background: linear-gradient(180deg, var(--clr-accent-light) 0%, var(--clr-accent) 100%);
      border-radius: ${size/2}px;
      left: 50%;
      bottom: 20px;
      opacity: ${1 - (i / trailCount) * 0.8};
      pointer-events: none;
      z-index: 3;
      filter: blur(${(i / trailCount) * 0.8}px) brightness(${1 + (i / trailCount) * 0.3});
      box-shadow: 0 0 ${size * 2}px rgba(249, 115, 22, 0.8);
    `;

    container.appendChild(trail);

    const delay = i * 30; // Faster trail for cricket speed
    const progress = i / trailCount;
    const xOffset = progress * 200; // Even further distance
    const yOffset = -Math.pow(progress, 1.7) * 140; // Higher, more dramatic arc
    const rotation = progress * 1620; // More rotations for spin

    trail.animate([
      {
        transform: `translateX(-50%) translateY(0) rotate(0deg) scale(1)`,
        opacity: 1 - progress * 0.6
      },
      {
        transform: `translateX(-50%) translate(${xOffset}px, ${yOffset}px) rotate(${rotation}deg) scale(${1 - progress * 0.8})`,
        opacity: 0
      }
    ], {
      duration: 2800,
      delay: delay,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }).onfinish = () => trail.remove();
  }
}

// Create shockwave effect like cricket impact - enhanced
function createImpactShockwave(container) {
  const shockwave = document.createElement('div');
  shockwave.style.cssText = `
    position: absolute;
    width: 15px;
    height: 15px;
    left: 50%;
    bottom: 20px;
    transform: translateX(-50%);
    border: 3px solid var(--clr-accent-light);
    border-radius: 50%;
    pointer-events: none;
    z-index: 4;
    opacity: 1;
    box-shadow: 0 0 20px rgba(249, 115, 22, 0.8);
  `;

  container.appendChild(shockwave);

  shockwave.animate([
    {
      width: '15px',
      height: '15px',
      opacity: 1,
      borderWidth: '3px',
      boxShadow: '0 0 20px rgba(249, 115, 22, 0.8)'
    },
    {
      width: '100px',
      height: '100px',
      opacity: 0,
      borderWidth: '1px',
      boxShadow: '0 0 60px rgba(249, 115, 22, 0.3)'
    }
  ], {
    duration: 800,
    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
  }).onfinish = () => shockwave.remove();
}

// Create celebration particles for level completion
/******************************************
 * PROJECT DETAILS - Reveal on hover
 ******************************************/
function setupProjectDetails() {
  const projectCards = document.querySelectorAll('#projects li');
  
  projectCards.forEach(card => {
    const details = card.querySelector('.project-details');
    if (!details) return;
    
    card.addEventListener('mouseenter', () => {
      details.style.display = 'block';
      setTimeout(() => {
        details.style.opacity = '1';
      }, 10);
    });
    
    card.addEventListener('mouseleave', () => {
      details.style.opacity = '0';
      setTimeout(() => {
        details.style.display = 'none';
      }, 300);
    });
  });
}

/******************************************
 * SKILL CHIPS - Interactive hover effects
 ******************************************/
function setupSkillChips() {
  const skillChips = document.querySelectorAll('.skill-chip');
  
  skillChips.forEach(chip => {
    chip.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    chip.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
}

function createCelebrationParticles(container) {
  const particleCount = 20;
  const colors = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    const size = Math.random() * 8 + 4;
    const color = colors[Math.floor(Math.random() * colors.length)];

    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: 50%;
      pointer-events: none;
      left: 50%;
      bottom: 20px;
      opacity: 1;
      z-index: 20;
      box-shadow: 0 0 ${size * 2}px ${color}80;
    `;

    container.appendChild(particle);

    const angle = (i / particleCount) * Math.PI * 2;
    const distance = Math.random() * 120 + 60;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance - Math.random() * 60;

    particle.animate([
      {
        transform: `translateX(-50%) translateY(0)`,
        opacity: 1,
        scale: 1
      },
      {
        transform: `translateX(-50%) translate(${x}px, ${y}px)`,
        opacity: 0,
        scale: 0.3
      }
    ], {
      duration: 2000,
      delay: Math.random() * 300,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }).onfinish = () => particle.remove();
  }
}

function createHitParticles(container, hitCount) {
  const particleCount = hitCount % 5 === 0 ? 25 : 15; // Even more particles
  const isSpecial = hitCount % 5 === 0;

  // Create spark particles for impact
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    const size = isSpecial ? (Math.random() * 10 + 8) : (Math.random() * 8 + 6);
    const color = isSpecial ?
      `hsl(${25 + Math.random() * 35}, 100%, ${60 + Math.random() * 25}%)` :
      `hsl(${20 + Math.random() * 25}, 95%, ${65 + Math.random() * 20}%)`;

    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: 50%;
      pointer-events: none;
      left: 50%;
      bottom: 20px;
      opacity: 1;
      z-index: 10;
      box-shadow: 0 0 ${size * 3}px ${color}, 0 0 ${size * 6}px ${color}50;
    `;

    const angle = (i / particleCount) * Math.PI * 2 + (Math.random() - 0.5) * 1.5; // Even more spread
    const distance = isSpecial ? (100 + Math.random() * 50) : (70 + Math.random() * 40); // Much further spread
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance - 50; // Higher arc for better visibility
    const rotation = Math.random() * 1080; // Lots of spin

    container.appendChild(particle);

    particle.animate([
      {
        transform: `translate(-50%, 0) translate(0, 0) rotate(0deg)`,
        opacity: 1,
        scale: 1,
        filter: `brightness(2) blur(0px)`
      },
      {
        transform: `translate(-50%, 0) translate(${x}px, ${y}px) rotate(${rotation}deg)`,
        opacity: 0,
        scale: 0.05,
        filter: `brightness(0.2) blur(3px)`
      }
    ], {
      duration: isSpecial ? 1800 : 1200,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }).onfinish = () => particle.remove();
  }

  // Add some ground dust particles
  for (let i = 0; i < 8; i++) {
    const dust = document.createElement('div');
    const size = Math.random() * 4 + 2;
    dust.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: rgba(200, 200, 200, 0.8);
      border-radius: 50%;
      pointer-events: none;
      left: 50%;
      bottom: 10px;
      opacity: 0.8;
      z-index: 9;
    `;

    const angle = Math.random() * Math.PI - Math.PI/2; // Ground level spread
    const distance = Math.random() * 30 + 10;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance - Math.random() * 10;

    container.appendChild(dust);

    dust.animate([
      {
        transform: `translate(-50%, 0) translate(0, 0)`,
        opacity: 0.8
      },
      {
        transform: `translate(-50%, 0) translate(${x}px, ${y}px)`,
        opacity: 0
      }
    ], {
      duration: 800,
      delay: Math.random() * 200,
      easing: 'ease-out'
    }).onfinish = () => dust.remove();
  }
}

// Score pop animation
const style = document.createElement('style');
style.textContent = `
  @keyframes scorePop {
    0% {
      transform: translateX(-50%) scale(1);
    }
    50% {
      transform: translateX(-50%) scale(1.3);
      color: var(--clr-accent-light);
    }
    100% {
      transform: translateX(-50%) scale(1);
    }
  }
`;
document.head.appendChild(style);
