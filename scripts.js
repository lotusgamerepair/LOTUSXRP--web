// Smooth scrolling for navigation
document.addEventListener('DOMContentLoaded', () => {
  const navItems = document.querySelectorAll('.light-beam');
  
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionId = item.getAttribute('data-section').toLowerCase();
      const section = document.getElementById(sectionId);
      
      if (section) {
        section.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Highlight active nav item on scroll
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navItems.forEach(nav => {
          nav.classList.remove('active');
          if (nav.getAttribute('data-section').toLowerCase() === sectionId) {
            nav.classList.add('active');
          }
        });
      }
    });
  });
});

// Add active class style in CSS
const style = document.createElement('style');
style.innerHTML = `
  .light-beam.active {
    background: rgba(0, 255, 204, 0.5);
    box-shadow: 0 0 20px #00ffcc;
    transform: translateX(15px);
  }
`;
document.head.appendChild(style);