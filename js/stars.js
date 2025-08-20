const starsContainer = document.querySelector('.stars');
const numberOfStars = 250; // Cambia este número para más o menos estrellas

for (let i = 0; i < numberOfStars; i++) {
    const star = document.createElement('div');
    star.classList.add('star');

    const size = Math.random() * 3 + 1; // Tamaño entre 1 y 4px
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;

    // Duración y retraso aleatorio de la animación para que no parpadeen al mismo tiempo
    const duration = Math.random() * 5 + 2; // entre 2 y 7 segundos
    const delay = Math.random() * 5; // entre 0 y 5 segundos
    star.style.animationDuration = `${duration}s`;
    star.style.animationDelay = `${delay}s`;

    starsContainer.appendChild(star);
}
