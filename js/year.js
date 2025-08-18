
// Obtener el elemento con id "year" y actualizarlo con el año actual
function updateYear() {
    const yearElement = document.getElementById("year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    } else {
        // Si no se encuentra, vuelve a intentar en 100ms
        setTimeout(updateYear, 100);
    }
}

updateYear();

