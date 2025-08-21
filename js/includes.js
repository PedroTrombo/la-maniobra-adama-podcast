async function loadIncludes() {
  try {
    const base = '/la-maniobra-adama-podcast/includes/';

    // Nav
    const nav = await fetch(base + 'nav.html').then(r => r.text());
    const navMenu = document.getElementById('nav-menu');
    navMenu.innerHTML = nav;

    const toggle = navMenu.querySelector('.menu-toggle');
    const navLinks = navMenu.querySelector('.nav-links');
    if (toggle && navLinks) {
      toggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        toggle.classList.toggle('open');
      });
    }

    // Footer
    const footer = await fetch(base + 'footer.html').then(r => r.text());
    document.getElementById('footer').innerHTML = footer;

  } catch (error) {
    console.error('Error cargando includes:', error);
  }
}

loadIncludes();


