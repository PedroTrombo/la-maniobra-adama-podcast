function seededRandom(seed) {
  var x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

const numberOfStars = 150;
let seed = 42; // cambia este número y tendrás un cielo distinto pero estable

for (let i = 0; i < numberOfStars; i++) {
  const star = document.createElement('div');
  star.classList.add('star');

  const size = seededRandom(seed++) * 3 + 1;
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;

  star.style.top = `${seededRandom(seed++) * 100}%`;
  star.style.left = `${seededRandom(seed++) * 100}%`;

  starsContainer.appendChild(star);
}
