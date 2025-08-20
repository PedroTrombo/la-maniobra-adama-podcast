let currentPage = 1;
const postsPerPage = 3;
let posts = [];

// Formatea fecha ISO a "30 JUL 2025"
function formatDate(isoDate) {
    const fecha = new Date(isoDate);
    return fecha.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    }).replace('.', '').toUpperCase();
}

// Genera un slug genérico a partir del título
function generateSlug(title) {
    if (!title) return 'episodio-generico.html';

    // Normaliza acentos y caracteres raros
    let cleanTitle = title.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // Detecta si empieza con número + punto
    const match = cleanTitle.match(/^(\d+)\.\s*(.*)$/);
    let number = "";
    if (match) {
        number = match[1]; // el número inicial
        cleanTitle = match[2]; // el resto del título sin número
    }

    // Genera slug
    let slug = cleanTitle.toLowerCase()
        .replace(/[^\w\s-]/g, '')   // quita símbolos
        .trim()
        .replace(/\s+/g, '-')       // espacios -> guiones
        .replace(/-+/g, '-');       // guiones múltiples -> uno

    // Si había número, lo manda al final
    if (number) slug = `${slug}-${number}`;

    return slug + ".html";
}


// Truncar texto con puntos suspensivos
function truncateText(text, maxLength) {
    if (!text) return '';
    return text.length > maxLength ? text.slice(0, maxLength) + '\u2026' : text;
}

// 🔥 Formatea número de página a dos dígitos
function formatPageNumber(num) {
    return String(num).padStart(2, '0');
}

// Carga los posts desde el JSON externo
async function loadPosts() {
    try {
        const response = await fetch('/n8n-adama/data/posts.json');
        const data = await response.json();
        posts = data.episodes || [];
        renderPosts();
    } catch (error) {
        console.error('Error cargando los posts:', error);
    }
}

function renderPosts() {
    const container = document.getElementById('posts-container');
    container.innerHTML = '';

    const start = (currentPage - 1) * postsPerPage;
    const end = start + postsPerPage;
    const paginatedPosts = posts.slice(start, end);

    const totalPages = Math.ceil(posts.length / postsPerPage);

    paginatedPosts.forEach(post => {
        const article = document.createElement('article');
        article.classList.add('post');

        const fechaFormateada = formatDate(post.pubDate);
        const slug = post.slug || generateSlug(post.title);

        article.innerHTML = `
            <div class="post-image-container">
                <img src="${post.image || '/default-image.jpg'}" 
                     alt="${post.title ? `Imagen del episodio '${post.title}'` : 'Imagen del episodio del podcast La Maniobra Adama'}" 
                     class="post-image">
            </div>
            
        <!-- El replace elimina números al inicio del título seguidos de un punto y espacio.
        Ejemplo: "33. Daredevil..." → "Daredevil..."-->
        
            <h2 class="post-title">${(post.title || 'Sin título').replace(/^\d+\.\s*/, '')}</h2>


            <div class="post-meta">
               <span class="post-date">${fechaFormateada}</span> \u2022 
               <span class="post-duration">${post.duration || ''} min</span>
            </div>
            <p class="post-snippet">${truncateText(post.contentSnippet, 270)}</p>
            <a href="/episodio/${slug}" 
               class="post-button" 
               title='${post.title ? post.title + " - Escuchar episodio" : "Escuchar episodio"}'>
               ESCUCHAR AHORA
            </a>
        `;

        container.appendChild(article);
    });

    // 🔥 Actualiza los dos paginadores
    document.querySelectorAll('.pagination').forEach(pagination => {
        const prevBtn = pagination.querySelector('.prev');
        const nextBtn = pagination.querySelector('.next');
        const pageInfo = pagination.querySelector('.page-info');

        pageInfo.textContent = `${formatPageNumber(currentPage)} | ${formatPageNumber(totalPages)}`;
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages;
    });
}

// Configura los eventos de paginación solo una vez
function setupPaginationEvents() {
    document.querySelectorAll('.pagination .prev').forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderPosts();

                // 👇 Scroll hacia arriba cuando clicas en paginador inferior
                if (btn.closest('.pagination').classList.contains('bottom')) {
                    document.querySelector('.pagination.top')
                        .scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    document.querySelectorAll('.pagination .next').forEach(btn => {
        btn.addEventListener('click', () => {
            const totalPages = Math.ceil(posts.length / postsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                renderPosts();

                // 👇 Scroll hacia arriba cuando clicas en paginador inferior
                if (btn.closest('.pagination').classList.contains('bottom')) {
                    document.getElementById('page-title')
                        .scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

// 🔥 Inicializa la carga cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    loadPosts();
    setupPaginationEvents();
});

