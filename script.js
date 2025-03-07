/* Box Model Hack */
* {
  box-sizing: border-box;
}

/* Clear fix hack */
.clearfix:after {
  content: ".";
  display: block;
  clear: both;
  visibility: hidden;
  line-height: 0;
  height: 0;
}

.clear {
  clear: both;
}

/******************************************
/* BASE STYLES
/*******************************************/
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f0f0f0;
  font-size: 16px;
  color: #333;
}

/* Container class for consistent width */
.container {
  width: 90%;
  max-width: 1000px;
  margin: 0 auto;
}

/******************************************
/* NAVIGATION
/*******************************************/
.navbar {
  background-color: #2c3e50;
  color: #fff;
  padding: 10px 0;
}
.navbar .container {
  display: flex;
  align-items: center; /* Center items vertically */
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100; /* Ensure the navigation bar stays on top */
}
.navbar .logo a {
  text-decoration: none;
  color: #fff;
  font-size: 24px;
  font-weight: bold;
}

.navbar .logo {
  display: flex;
  align-items: center; /* Center logo and text vertically */
}

.navbar .logo img {
  height: 50px; /* Set the height of the logo */
  margin-right: 10px; /* Space between logo and text */
}


/* Navigation Menu Styles */
.nav-menu {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
  position: relative; /* Needed for the dropdown menu positioning */
}
.nav-menu > li {
  margin-left: 20px;
  position: relative; /* Needed for the dropdown menu positioning */
}
.nav-menu > li > a {
  color: #fff;
  text-decoration: none;
  font-size: 16px;
  transition: color 0.3s ease;
  padding: 10px; /* Add some padding to the nav links */
}
.nav-menu > li > a:hover {
  color: #3498db; /* Change the link color on hover */
}

/* Navigation Dropdown Menu Styles */
.nav-menu li ul {
  display: none; /* Hide the dropdown menu by default */
  position: absolute; /* Position the dropdown menu absolutely */
  top: 100%; /* Position the dropdown menu below the nav link */
  left: 0;
  background-color: #2c3e50;
  padding: 10px 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Add a subtle box shadow */
  z-index: 1; /* Ensure the dropdown menu is on top of other elements */
  min-width: 200px; /* Set a minimum width for the dropdown menu */
}
.nav-menu li:hover > ul {
  display: block; /* Show the dropdown menu on hover */
}
.nav-menu li ul li {
  margin: 0;
  padding: 5px 20px; /* Add some padding to the dropdown menu items */
}
.nav-menu li ul li a {
  color: #fff;
  font-size: 14px; /* Slightly smaller font size for the dropdown menu links */
  transition: color 0.3s ease;
  display: block; /* Ensure the entire dropdown menu item is clickable */
}
.nav-menu li ul li a:hover {
  color: #3498db; /* Change the dropdown menu link color on hover */
}

/******************************************
/* HEADER
/*******************************************/
header {
  background-color: #34495e;
  color: #fff;
  padding: 60px 0;
  text-align: center;
}
.header-content h1 {
  margin: 0;
  font-size: 36px;
}
header p {
  margin: 10px 0 0;
  font-size: 20px;
}

/******************************************
/* ANIMATION
/*******************************************/
.header-content {
  /* Fade-in animation for the header content */
  opacity: 0;
  animation: fadeIn 1s ease-in-out forwards;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/******************************************
/* MAIN CONTENT
/*******************************************/
main {
  padding: 40px 0;
}

/* Section Titles */
section h2 {
  color: #2c3e50;
  font-size: 28px;
  margin-bottom: 20px;
  text-align: center;
}

/* Section Paragraphs */
section p {
  line-height: 1.6;
  margin-bottom: 20px;
}

/* Lists */
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin-bottom: 10px;
}

/* Add spacing and border between sections */
section {
  border-bottom: 1px solid #ccc; /* Light gray line */
  padding-bottom: 20px; /* Space below the section */
  margin-bottom: 20px; /* Space above the next section */
}
h1, h2, p, li {
  margin: 20px; /* Adjust text spacing (debugging...) */
}

/******************************************
/* SKILLS SECTION
/*******************************************/

/* Container for the skill icons */
.skill-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;
}

/* Individual skill icon */
.skill-list li {
  margin: 10px;
  position: relative;
}

/* Link for the skill icon */
.skill-link {
  display: block;
  text-decoration: none;
  transition: transform 0.3s; /* Smooth scale animation on hover */
}

/* Tooltip that appears on hover */
.skill-link .skill-tooltip {
  position: absolute;
  top: -50px; /* Position the tooltip above the icon */
  left: 50%;
  transform: translateX(-50%); /* Center the tooltip horizontally */
  background-color: #2c3e50;
  color: #fff;
  font-size: 0.7rem;
  padding: 8px 12px;
  border-radius: 4px;
  white-space: nowrap; /* Prevent tooltip text from wrapping */
  opacity: 0; /* Hide the tooltip by default */
  pointer-events: none; /* Disable pointer events to prevent interference */
  transition: opacity 0.3s; /* Smooth fade animation */
  z-index: 1;
  /* Adjust the width to fit the content */
  width: max-content;
}

/* Show the tooltip when the link is active (hovered) */
.skill-link.active .skill-tooltip {
  opacity: 1; /* Show the tooltip */
  pointer-events: auto; /* Enable pointer events */
}

/* Scale the skill icon on hover */
.skill-link:hover {
  transform: scale(1.1);
}

/* Responsive styles for the hover text box */
@media (max-width: 768px) {
  /* Adjust the tooltip on smaller screens */
  .skill-link .skill-tooltip {
    max-width: 300px; /* Increase the maximum width */
    padding: 10px 15px; /* Increase the padding */
    white-space: normal; /* Allow the tooltip text to wrap */
    text-align: center; /* Center the tooltip text */
  }
}

@media (max-width: 480px) {
  /* Further adjust the tooltip on even smaller screens */
  .skill-link .skill-tooltip {
    max-width: 200px; /* Decrease the maximum width */
    padding: 8px 12px; /* Decrease the padding */
    white-space: normal;
    text-align: center;
  }
}

/******************************************
/* CONTACT SECTION
/*******************************************/
.contact-section {
  padding: 60px 0;
  background-color: #f5f5f5;
}

.contact-section h2 {
  text-align: center;
  margin-bottom: 40px;
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
}

.contact-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  list-style: none;
}

.contact-list li {
  margin: 0 12px;
}

.contact-link {
  display: block;
  text-decoration: none;
  color: #3FA2F6;
  transition: color 0.3s;
}

.contact-link i {
  font-size: 1.3rem;
  border: 2px solid #3FA2F6;
  border-radius: 50%;
  padding: 8px;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s, box-shadow 0.3s;
}

.contact-link:hover {
  color: #2a7ebb;
}

.contact-link:hover i {
  transform: scale(1.1);
  box-shadow: 0 0 10px rgba(63, 162, 246, 0.5);
}

/* added on Hover show text*/
.contact-link[title] {
  position: relative;
}

.contact-link[title]::after {
  content: attr(title);
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.7rem;
  color: #666;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.3s;
}

.contact-link[title]:hover::after {
  opacity: 1;
}


/******************************************
/* RESPONSIVE STYLES: CONTACT SECTION
/*******************************************/

/* Mobile Styles (max-width: 428px) */
@media (max-width: 428px) {
  .contact-section {
    padding: 40px 0;
  }

  .contact-section h2 {
    font-size: 2rem;
    margin-bottom: 30px;
  }

  .contact-list li {
    margin: 0 10px;
  }

  .contact-link i {
    font-size: 1.2rem;
    padding: 8px;
    width: 35px;
    height: 35px;
  }
}

/* Tablet Styles (min-width: 429px and max-width: 1279px) */
@media (min-width: 429px) and (max-width: 1279px) {
  .contact-section {
    padding: 50px 0;
  }

  .contact-section h2 {
    font-size: 2.2rem;
    margin-bottom: 35px;
  }

  .contact-list li {
    margin: 0 12px;
  }

  .contact-link i {
    font-size: 1.4rem;
    padding: 10px;
    width: 40px;
    height: 40px;
  }
}

/* Desktop Styles (min-width: 1280px and max-width: 1919px) */
@media (min-width: 1280px) and (max-width: 1919px) {
  .contact-section {
    padding: 60px 0;
  }

  .contact-section h2 {
    font-size: 2.5rem;
    margin-bottom: 40px;
  }

  .contact-list li {
    margin: 0 15px;
  }

  .contact-link i {
    font-size: 1.6rem;
    padding: 12px;
    width: 45px;
    height: 45px;
  }
}



/******************************************
/* FOOTER
/*******************************************/
footer {
  background-color: #2c3e50;
  color: #fff;
  padding: 20px 0;
  text-align: center;
  font-size: 14px;
}

/******************************************
/* RESPONSIVE STYLES
/*******************************************/

/* Styles for screens up to 768px wide */
@media (max-width: 768px) {
  body {
    font-size: 14px;
  }
  /******************************************
  /* RESPONSIVE STYLES: HEADER
  /*******************************************/
  header h1 {
    font-size: 28px;
  }
  header p {
    font-size: 18px;
  }
  /******************************************
  /* RESPONSIVE STYLES: NAVIGATION
  /*******************************************/
  .nav-menu > li {
    margin-left: 10px;
  }
  .nav-menu > li > a {
    font-size: 14px;
  }
  .nav-toggle {
    display: block;
    cursor: pointer;
  }
  .nav-toggle-icon {
    display: block;
    width: 30px;
    height: 3px;
    background-color: #fff;
    margin-bottom: 5px;
  }
  .nav-menu {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    background-color: #2c3e50;
    padding: 20px 0;
  }
  .nav-menu.show {
    display: flex;
  }
  .nav-menu > li {
    margin: 10px 0;
  }
  /* Navigation Dropdown remains unchanged */
  .nav-menu li ul {
    position: static;
  }
  /******************************************
  /* RESPONSIVE STYLES: ABOUT SECTION
  /*******************************************/
  .about-content {
    flex-direction: column; /* Stack the image and text vertically */
  }
  .about-image {
    margin-bottom: 20px; /* Spacing between image and text */
  }
  /******************************************
  /* RESPONSIVE STYLES: BACKGROUND COLORS
  /*******************************************/
  header {
    background-color: #2980b9; /* Calm blue for trust and reliability */
  }
  footer {
    background-color: #2980b9;
  }
}

/* Styles for screens up to 480px wide */
@media (max-width: 480px) {
  /******************************************
  /* RESPONSIVE STYLES: HEADER
  /*******************************************/
  header h1 {
    font-size: 24px;
  }
  header p {
    font-size: 16px;
  }
  /******************************************
  /* RESPONSIVE STYLES: BACKGROUND COLORS
  /*******************************************/
  header {
    background-color: #e74c3c; /* Vibrant red for energy and urgency */
  }
  footer {
    background-color: #e74c3c;
  }
  body {
    background-color: #fdf6e3; /* Warm, light background for contrast */
  }
  /* Note: Navigation and About Section styles are inherited from the 768px query *
}

@media (max-width: 768px) {
  .nav-toggle {
    display: block; /* Show toggle on mobile */
    cursor: pointer;
  }

  .nav-toggle-icon {
    display: block;
    width: 30px;
    height: 3px;
    background-color: #fff;
    margin-bottom
