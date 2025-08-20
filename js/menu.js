// Cargar el header dinámicamente
fetch('includes/nav.html')
  .then(r => r.text())
  .then(d => {
    // Insertar el header en el DOM
    document.getElementById('nav-menu').innerHTML = d;

    // Ahora que el header está en el DOM, seleccionamos los elementos del menú
    const toggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    // Solo añadimos el event listener si los elementos existen
    if (toggle && navLinks) {
      toggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
      });
    }
  });






