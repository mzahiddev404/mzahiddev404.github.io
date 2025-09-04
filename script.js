/******************************************
 * INIT WHEN DOM IS READY
 ******************************************/
document.addEventListener('DOMContentLoaded', () => {
  setupOverlay();           // add dim background
  setupMobileNav();         // toggle nav menu
  setupSmoothScroll();      // scroll to section
  setupSectionHighlight();  // highlight active nav link
  setupNavHoverEffects();   // was setupNavHover()          // nav hover feedback
setupNavLinkClose();      // was setupNavClose()          // auto close nav on click
  setupSkillTooltips();     // skill tooltip clicks

  window.addEventListener('scroll', highlightNavOnScroll);
});

/******************************************
 * OVERLAY UTILITY — adds dark backdrop
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
 * MOBILE NAV — hamburger toggle logic
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
 * SMOOTH SCROLLING — scrolls to sections
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
 * SECTION HIGHLIGHT — tracks scroll position
 ******************************************/
function setupSectionHighlight() {
  window.addEventListener('scroll', highlightNavOnScroll);
}

/******************************************
 * highlightNavOnScroll — makes nav link active
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
 * NAV HOVER EFFECTS — color changes on hover
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
 * CLOSE NAV ON LINK CLICK — hamburger mobile UX fix
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
 * SKILLS TOOLTIP LOGIC — reveals on click
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

// ==============================
// BACK TO TOP BUTTON
// ==============================
const backToTop = document.querySelector('.btt');

if (backToTop) {
  // Show/hide button on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {         // when scrolled more than 50px
      backToTop.classList.add('show'); // makes button visible
    } else {
      backToTop.classList.remove('show'); // hide button again
    }
  });

  // Smooth scroll to top when button is clicked
  backToTop.addEventListener('click', (e) => {
    e.preventDefault(); // stop default "jump" to top
    window.scrollTo({ top: 0, behavior: 'smooth' }); // smooth scroll
  });
}
