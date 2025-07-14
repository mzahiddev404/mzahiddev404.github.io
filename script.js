document.addEventListener('DOMContentLoaded', function() {

  /******************************************
  /* OVERLAY SETUP
  /* Creates an overlay to dim background when nav menu is active.
  /*******************************************/
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
    transition: 'opacity 0.3s ease',
    zIndex: '90', // behind the nav menu (nav menu z-index: 100)
    pointerEvents: 'none'
  });
  document.body.appendChild(overlay);

  /******************************************
  /* MOBILE NAVIGATION
  /* Toggles the nav menu and overlay when the nav toggle is clicked.
  /*******************************************/
  function toggleMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

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

    // Clicking on overlay closes the nav menu and resets the overlay.
    overlay.addEventListener('click', () => {
      navMenu.classList.remove('show');
      overlay.style.opacity = '0';
      overlay.style.pointerEvents = 'none';
    });
  }

  /******************************************
  /* SMOOTH SCROLLING
  /* SMOOTH SCROLLING to the targeted section when the nav link is clicked.
  /*******************************************/
  function addSmoothScrolling() {
    const sectionLinks = document.querySelectorAll('a[href^="#"]');
    sectionLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute('href'));
        targetElement.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  /******************************************
  /* HIGHLIGHT CURRENT SECTION
  /* Highlights the current active nav link based on scroll position.
  /*******************************************/
  function highlightCurrentSection() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    let currentSection = null;
    sections.forEach(section => {
      if (window.pageYOffset >= section.offsetTop - 100) {
        currentSection = section;
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (currentSection && link.getAttribute('href') === `#${currentSection.id}`) {
        link.classList.add('active');
      }
    });
  }

  /******************************************
  /* NAV LINK HOVER EFFECT
  /* Changes the nav link color on hover for visual feedback.
  /*******************************************/
  function addNavLinkHoverEffect() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
      link.addEventListener('mouseover', () => link.style.color = '#3498db');
      link.addEventListener('mouseout', () => link.style.color = '#fff');
    });
  }

  /******************************************
  /* CLOSE MENU ON LINK CLICK
  /* Closes the nav menu and resets the overlay when any nav link is clicked.
  /*******************************************/
  function addNavMenuCloseOnLinkClick() {
    const navMenuLinks = document.querySelectorAll('.nav-menu a');
    navMenuLinks.forEach(link => {
      link.addEventListener('click', () => {
        const navMenu = document.querySelector('.nav-menu');
        navMenu.classList.remove('show');
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
      });
    });
  }

  /******************************************
  /* INITIALIZATION
  /* Runs all functions to set up the page behavior.
  /*******************************************/
  toggleMobileNavigation();
  addSmoothScrolling();
  highlightCurrentSection();
  addNavLinkHoverEffect();
  addNavMenuCloseOnLinkClick();
  window.addEventListener('scroll', highlightCurrentSection);

});

  /******************************************
  /* Skills Logo click detail.
  /*******************************************/

// Set up click event handler for skill links
document.addEventListener('DOMContentLoaded', () => {
  const skillLinks = document.querySelectorAll('.skill-link');
  skillLinks.forEach(link => {
    link.addEventListener('click', toggleActiveLink);
  });
});

// Toggle active link and show/hide tooltip
function toggleActiveLink() {
  const skillLinks = document.querySelectorAll('.skill-link');
  skillLinks.forEach(l => {
    l.classList.remove('active');
    l.querySelector('.skill-tooltip').style.display = 'none';
  });
  this.classList.add('active');
  this.querySelector('.skill-tooltip').style.display = 'block';
  hideTooltipAfterDelay(this);
  hideTooltipOnBlur(this);
}

// Hide tooltip after 3 seconds
function hideTooltipAfterDelay(link) {
  let tooltipTimeout;
  clearTimeout(tooltipTimeout);
  tooltipTimeout = setTimeout(() => {
    link.querySelector('.skill-tooltip').style.display = 'none';
  }, 3000);
}

// Hide tooltip when clicking outside the link
function hideTooltipOnBlur(link) {
  link.addEventListener('blur', () => {
    link.querySelector('.skill-tooltip').style.display = 'none';
  });
}

// Hide all tooltips when clicking outside the skills section
document.addEventListener('click', (event) => {
  if (!event.target.closest('#skills')) {
    const skillLinks = document.querySelectorAll('.skill-link');
    skillLinks.forEach(link => {
      link.querySelector('.skill-tooltip').style.display = 'none';
    });
  }
});
