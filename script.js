// script.js
document.addEventListener('DOMContentLoaded', function() {
  // This function handles the toggling of the mobile navigation menu
  // When the user clicks the nav toggle button, the nav menu will show or hide
  function toggleMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('show');
    });
  }

  // This function adds smooth scrolling to the section anchor links
  // When the user clicks a nav link, the page will smoothly scroll to that section
  function addSmoothScrolling() {
    const sectionLinks = document.querySelectorAll('a[href^="#"]');

    sectionLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        targetElement.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  // This function highlights the current section in the navigation menu
  // As the user scrolls, the nav link for the visible section will be highlighted
  function highlightCurrentSection() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');

    let currentSection = null;
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.pageYOffset >= sectionTop - 100) {
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

  // Call the functions to initialize the features
  toggleMobileNavigation();
  addSmoothScrolling();
  highlightCurrentSection();

  // Add a color-changing effect to the navigation links on hover
  // This makes the nav links more visually appealing and interactive
  const navLinks = document.querySelectorAll('.nav-menu a');
  navLinks.forEach(link => {
    link.addEventListener('mouseover', () => {
      link.style.color = '#3498db'; // Change the color to a light blue on hover
    });
    link.addEventListener('mouseout', () => {
      link.style.color = '#fff'; // Change the color back to white when the mouse leaves the link
    });
  });
});
