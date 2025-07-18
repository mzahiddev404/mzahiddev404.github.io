/******************************************
 * 🧠 INIT WHEN DOM IS READY
 ******************************************/
document.addEventListener('DOMContentLoaded', () => {
  setupOverlay();           // add dim background
  setupMobileNav();         // toggle nav menu
  setupSmoothScroll();      // scroll to section
  setupSectionHighlight();  // highlight active nav link
  setupNavHover();          // nav hover feedback
  setupNavClose();          // auto close nav on click
  setupSkillTooltips();     // skill tooltip clicks

  window.addEventListener('scroll', highlightNavOnScroll);
});

/******************************************
 * ☁️ OVERLAY UTILITY — adds dark backdrop
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
 * 📱 MOBILE NAV — hamburger toggle logic
 ******************************************/
function setupMobileNav() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const overlay = document.getElementById('overlay');

  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show');
    if (navMenu.classList.contains('show')) {
      overlay.style.opacity = '1';
      overlay.style.pointerEvents = 'auto';
    } else {
      overlay.style.opacity = '0';
      overlay.style.pointerEvents = 'none';
    }
  });

  // click outside to close menu
  overlay.addEventListener('click', () => {
    navMenu.classList.remove('show');
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';
  });
}
/******************************************
 * 🧭 SMOOTH SCROLLING — nav clicks scroll to section
 ******************************************/
function setupSmoothScroll() {
  const sectionLinks = document.querySelectorAll('a[href^="#"]');
  sectionLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      target?.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

/******************************************
 * 🧠 HIGHLIGHT SECTION — tracks scroll position
 ******************************************/
function setupSectionHighlight() {
  window.addEventListener('scroll', highlightNavOnScroll);
}

/******************************************
 * 🎯 highlightNavOnScroll — makes nav link active based on scroll
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
 * 🎨 HOVER EFFECTS — highlight nav links on hover
 ******************************************/
function setupNavHoverEffects() {
  const navLinks = document.querySelectorAll('.nav-menu a');
  navLinks.forEach(link => {
    link.addEventListener('mouseover', () => {
      link.style.color = '#3498db'; // matches root accent
    });
    link.addEventListener('mouseout', () => {
      link.style.color = '#fff'; // resets to original
    });
  });
}

/******************************************
 * 🛑 CLOSE NAV ON LINK CLICK — for mobile UX
 ******************************************/
function setupNavLinkClose() {
  const navLinks = document.querySelectorAll('.nav-menu a');
  const navMenu = document.querySelector('.nav-menu');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('show');
      const overlay = document.getElementById('overlay');
      if (overlay) {
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
      }
    });
  });
}
/******************************************
 * 🧠 SKILLS TOOLTIP LOGIC
 * click to reveal tooltips, hide after 3s or blur
 ******************************************/

// Run once DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const skillLinks = document.querySelectorAll('.skill-link');

  // click → show tooltip
  skillLinks.forEach(link => {
    link.addEventListener('click', function () {
      // Remove 'active' from all tooltips
      skillLinks.forEach(other => {
        other.classList.remove('active');
        other.querySelector('.skill-tooltip').style.display = 'none';
      });

      // Show the clicked tooltip
      this.classList.add('active');
      const tooltip = this.querySelector('.skill-tooltip');
      tooltip.style.display = 'block';

      // Hide after 3 seconds
      clearTimeout(this.tooltipTimeout);
      this.tooltipTimeout = setTimeout(() => {
        tooltip.style.display = 'none';
        this.classList.remove('active');
      }, 3000);

      // Also hide if user clicks elsewhere (below)
    });
  });

  // If user clicks outside of skills, hide everything
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#skills')) {
      skillLinks.forEach(link => {
        link.classList.remove('active');
        link.querySelector('.skill-tooltip').style.display = 'none';
      });
    }
  });
});
