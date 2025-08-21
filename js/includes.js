async function loadIncludes() {
  try {
    const base = '/includes/';

    // Nav
    const nav = await fetch(base + 'nav.html').then(r => r.text());
    document.getElementById('nav-menu').innerHTML = nav;

    const toggle = document.getElementById('nav-menu').querySelector('.menu-toggle');
    const navLinks = document.getElementById('nav-menu').querySelector('.nav-links');
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
