async function loadIncludes() {
  try {
    // Nav
    const nav = await fetch('includes/nav.html').then(r => r.text());
    const navMenu = document.getElementById('nav-menu');
    navMenu.innerHTML = nav;

    const toggle = navMenu.querySelector(".menu-toggle");
    const navLinks = navMenu.querySelector(".nav-links");
    if (toggle && navLinks) {
      toggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        toggle.classList.toggle("open"); // útil si quieres cambiar a "X"
      });
    }

    // Footer
    const footer = await fetch('includes/footer.html').then(r => r.text());
    document.getElementById('footer').innerHTML = footer;

  } catch (error) {
    console.error("Error cargando includes:", error);
  }
}

loadIncludes();
