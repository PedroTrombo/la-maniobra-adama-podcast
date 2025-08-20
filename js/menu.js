// Cargar el header dinámicamente
fetch('includes/header.html')
  .then(r => r.text())
  .then(d => {
    // Insertar el header en el DOM
    document.getElementById('header').innerHTML = d;

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

// menu bootstrap
  const toggle = document.querySelector(".navbar-toggler");
  const collapse = document.querySelector(".navbar-collapse");
  const icon = toggle.querySelector(".toggler-icon");

  toggle.addEventListener("click", () => {
    collapse.classList.toggle("show"); // abre/cierra el menú
    icon.textContent = collapse.classList.contains("show") ? "✖" : "☰"; // cambia hamburguesa a X
  });




