// script.js

document.addEventListener('DOMContentLoaded', function() {

  /******************************************
  /* OVERLAY SETUP
  /* Creates an overlay to dim the background when the nav menu is active.
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

    // Clicking on the overlay closes the nav menu and resets the overlay.
    overlay.addEventListener('click', () => {
      navMenu.classList.remove('show');
      overlay.style.opacity = '0';
      overlay.style.pointerEvents = 'none';
    });
  }

  /******************************************
  /* SMOOTH SCROLLING
  /* Scrolls smoothly to the targeted section when a nav link is clicked.
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
