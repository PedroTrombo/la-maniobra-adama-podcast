fetch('includes/header.html')
  .then(r => r.text())
  .then(d => document.getElementById('header').innerHTML = d);

fetch('includes/nav.html')
  .then(r => r.text())
  .then(d => {
    const navMenu = document.getElementById('nav-menu');
    navMenu.innerHTML = d;

    const toggle = navMenu.querySelector(".menu-toggle");
    const navLinks = navMenu.querySelector(".nav-links");

    if (toggle && navLinks) {
      toggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
      });
    }
  });

fetch('includes/footer.html')
  .then(r => r.text())
  .then(d => document.getElementById('footer').innerHTML = d);