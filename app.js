// BeeFlix - Datos de ejemplo y lógica de la aplicación

const mockMovies = [
    {
        id: 1,
        title: "Cómo Entrenar a tu Dragón: Live Action",
        year: 2025,
        duration: 98,
        rating: 5,
        description: "Un joven vikingo que no encaja en su tribu guerrera se hace amigo de un dragón, cambiando para siempre la forma en que su pueblo ve a estas criaturas.",
        thumbnail: "Imgenes/Imagenes_Peliculas/Como_entrenar_a_tu_dragon_live_action.jpg",
        heroImage: "Imgenes/Imagenes_Hero/como-entrenar-a-tu-dragon-live-action.webp",
        videoUrl: "Peliculas/Como entrenar a tu dragon/Live Action/Como entrenar a tu dragon (2025).mp4",
        font: "'MedievalSharp', serif",
        badges: ['NEW', '4K'],
        progress: 0,
        categories: ['aventura', 'familia', 'accion']
    },
    {
        id: 2,
        title: "El Gato con Botas",
        year: 2011,
        duration: 90,
        rating: 4,
        description: "El legendario Gato con Botas emprende una aventura épica para limpiar su nombre y recuperar su honor, junto a Kitty Softpaws y Humpty Dumpty.",
        thumbnail: null,
        heroImage: "Imgenes/Imagenes_Hero/gato_con_botas_1.webp",
        font: "'Cinzel', serif",
        badges: ['HDR'],
        progress: 45,
        categories: ['aventura', 'comedia', 'familia']
    },
    {
        id: 3,
        title: "Lilo & Stitch: Live Action",
        year: 2025,
        duration: 85,
        rating: 5,
        description: "Una niña hawaiana solitaria adopta lo que cree que es un perro, pero en realidad es un experimento alienígena genético fugitivo.",
        thumbnail: "Imgenes/Imagenes_Peliculas/Lilo_y_Stitch_Live_Action.jpg",
        heroImage: "Imgenes/Imagenes_Hero/lilo_stich_live_action.jpg",
        font: "'Pacifico', cursive",
        badges: ['NEW', '4K', 'HDR'],
        progress: 0,
        categories: ['familia', 'comedia', 'aventura']
    },
    {
        id: 4,
        title: "Spider-Man: Across the Spider-Verse",
        year: 2023,
        duration: 140,
        rating: 5,
        description: "Miles Morales se embarca en una aventura épica a través del multiverso con Gwen Stacy y un nuevo equipo de Spider-People.",
        thumbnail: null,
        heroImage: "Imgenes/Imagenes_Hero/spider_man_across_spiderverse.jpg",
        font: "'Bangers', cursive",
        badges: ['4K', 'HDR'],
        progress: 67,
        categories: ['accion', 'aventura']
    },
    {
        id: 5,
        title: "Zootopia",
        year: 2016,
        duration: 108,
        rating: 5,
        description: "Una coneja policía y un zorro estafador deben trabajar juntos para descubrir una conspiración en la ciudad de los animales.",
        thumbnail: null,
        heroImage: "Imgenes/Imagenes_Hero/zootopia_1.jpg",
        font: "'Nunito', sans-serif",
        badges: ['4K'],
        progress: 100,
        categories: ['familia', 'comedia', 'aventura']
    },
    {
        id: 6,
        title: "Toy Story",
        year: 1995,
        duration: 81,
        rating: 5,
        description: "Un vaquero de juguete se siente amenazado cuando un nuevo juguete espacial llega para ocupar su lugar como el juguete favorito del niño.",
        thumbnail: null,
        heroImage: null,
        font: "'Permanent Marker', cursive",
        badges: ['4K'],
        progress: 23,
        categories: ['familia', 'comedia', 'aventura']
    },
    {
        id: 7,
        title: "Buscando a Nemo",
        year: 2003,
        duration: 100,
        rating: 5,
        description: "Un pez payaso sobreprotector emprende un viaje épico para encontrar a su hijo capturado, con la ayuda de un pez cirujano con pérdida de memoria.",
        thumbnail: null,
        heroImage: null,
        font: "'Pacifico', cursive",
        badges: ['HDR'],
        progress: 0,
        categories: ['familia', 'aventura']
    },
    {
        id: 8,
        title: "El Rey León",
        year: 1994,
        duration: 88,
        rating: 5,
        description: "Un joven león debe aceptar su destino como rey legítimo después de la muerte de su padre a manos de su malvado tío.",
        thumbnail: null,
        heroImage: null,
        font: "'Cinzel Decorative', serif",
        badges: ['4K', 'HDR'],
        progress: 12,
        categories: ['familia', 'aventura']
    }
];

let currentHeroIndex = 0;
let currentHeroMovie = null;
let heroInterval = null;
let isHeroPaused = false;
let currentCategory = 'all';

// Crear partículas flotantes
function createParticles() {
    const container = document.getElementById('heroParticles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 3 + 1;
        const startX = Math.random() * 100;
        const drift = (Math.random() - 0.5) * 100;
        const duration = Math.random() * 10 + 15;
        const delay = Math.random() * 5;
        
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = startX + '%';
        particle.style.setProperty('--drift', drift + 'px');
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = delay + 's';
        
        container.appendChild(particle);
    }
}

// Parallax en el hero
function setupHeroParallax() {
    // Desactivado por preferencia del usuario
}

// Sombra dinámica en tarjetas
function setupCardDynamicShadow() {
    document.addEventListener('mousemove', (e) => {
        const cards = document.querySelectorAll('.movie-card:hover');
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            card.style.setProperty('--mouse-x', x + '%');
            card.style.setProperty('--mouse-y', y + '%');
        });
    });
}

// Crear efecto ripple
function createRipple(event, element) {
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

function formatDuration(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
}

function createStars(rating) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
        html += `<span class="star${i <= rating ? '' : ' empty'}" aria-hidden="true">★</span>`;
    }
    return html;
}

function startHeroInterval() {
    if (heroInterval) clearInterval(heroInterval);
    heroInterval = setInterval(() => {
        if (!isHeroPaused) updateHeroBanner();
    }, 5000);
}

function updateHeroBanner() {
    const movie = mockMovies[currentHeroIndex];
    currentHeroMovie = movie;
    const heroBanner = document.getElementById('heroBanner');

    heroBanner.classList.add('fade-transition');
    document.getElementById('heroTitle').textContent = movie.title;
    document.getElementById('heroYear').textContent = movie.year;
    document.getElementById('heroDuration').textContent = formatDuration(movie.duration);
    document.getElementById('heroRating').innerHTML = createStars(movie.rating);
    document.getElementById('heroDescription').textContent = movie.description;

    if (movie.heroImage) {
        heroBanner.style.backgroundImage = `url(${movie.heroImage})`;
    } else {
        heroBanner.style.backgroundImage = 'none';
    }

    setTimeout(() => heroBanner.classList.remove('fade-transition'), 1000);
    currentHeroIndex = (currentHeroIndex + 1) % mockMovies.length;
}

function playMovie(movie) {
    isHeroPaused = true;

    if (movie.videoUrl) {
        const overlay = document.createElement('div');
        overlay.className = 'player-overlay';
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-label', `Reproduciendo ${movie.title}`);
        overlay.innerHTML = `
            <div class="player-container">
                <button class="close-player" aria-label="Cerrar reproductor">✕</button>
                <video class="video-player" controls autoplay>
                    <source src="${movie.videoUrl}" type="video/mp4">
                    Tu navegador no soporta la reproducción de video.
                </video>
            </div>
        `;
        document.body.appendChild(overlay);

        const closePlayer = () => {
            const video = overlay.querySelector('video');
            video.pause();
            document.body.removeChild(overlay);
            document.removeEventListener('keydown', handleEsc);
            isHeroPaused = false;
        };

        overlay.querySelector('.close-player').addEventListener('click', closePlayer);

        const handleEsc = (e) => { if (e.key === 'Escape') closePlayer(); };
        document.addEventListener('keydown', handleEsc);

        // Focus en el botón de cerrar para accesibilidad
        overlay.querySelector('.close-player').focus();
    } else {
        isHeroPaused = false;
        const info = document.createElement('div');
        info.className = 'no-video-toast';
        info.textContent = `"${movie.title}" no tiene video disponible aún`;
        document.body.appendChild(info);
        setTimeout(() => document.body.removeChild(info), 3000);
    }
}

function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'article');
    card.setAttribute('aria-label', movie.title);

    const thumbHtml = movie.thumbnail
        ? `<img src="${movie.thumbnail}" alt="${movie.title}" class="movie-thumbnail" loading="lazy">`
        : `<div class="movie-thumbnail-placeholder" aria-hidden="true"><span>${movie.title.charAt(0)}</span></div>`;

    const badgesHtml = movie.badges && movie.badges.length > 0
        ? `<div class="movie-badges">${movie.badges.map(b => `<span class="badge${b === 'NEW' ? ' new' : ''}">${b}</span>`).join('')}</div>`
        : '';

    const progressHtml = movie.progress > 0
        ? `<div class="progress-bar"><div class="progress-fill" style="width: ${movie.progress}%"></div></div>`
        : '';

    card.innerHTML = `
        <div class="movie-thumbnail-container">
            ${thumbHtml}
            ${badgesHtml}
            ${progressHtml}
        </div>
        <div class="movie-info">
            <h3 class="movie-title">${movie.title}</h3>
            <div class="movie-meta">
                <span class="movie-year">${movie.year}</span>
                <span class="movie-duration">${formatDuration(movie.duration)}</span>
            </div>
            <div class="movie-rating" aria-label="${movie.rating} de 5 estrellas">${createStars(movie.rating)}</div>
            <div class="movie-actions">
                <button class="action-button play" aria-label="Reproducir ${movie.title}">
                    ▶
                    <span class="tooltip">Reproducir</span>
                </button>
                <button class="action-button" aria-label="Más información sobre ${movie.title}">
                    i
                    <span class="tooltip">Más info</span>
                </button>
                <button class="action-button" aria-label="Añadir ${movie.title} a mi lista">
                    +
                    <span class="tooltip">Mi lista</span>
                </button>
            </div>
        </div>
    `;

    card.querySelector('.action-button.play').addEventListener('click', (e) => {
        e.stopPropagation();
        playMovie(movie);
    });

    card.addEventListener('mouseenter', () => { isHeroPaused = true; });
    card.addEventListener('mouseleave', () => { isHeroPaused = false; });

    return card;
}

function renderMovies(movies) {
    const grid = document.getElementById('moviesGrid');
    const counter = document.getElementById('movieCount');
    grid.innerHTML = '';
    
    const filtered = currentCategory === 'all' 
        ? movies 
        : movies.filter(m => m.categories && m.categories.includes(currentCategory));
    
    // Actualizar contador
    const count = filtered.length;
    counter.textContent = count === 1 ? '1 película' : `${count} películas`;
    
    if (filtered.length === 0) {
        grid.innerHTML = '<p class="no-results">No se encontraron películas en esta categoría</p>';
        return;
    }
    
    filtered.sort((a, b) => a.title.localeCompare(b.title, 'es')).forEach(movie => {
        grid.appendChild(createMovieCard(movie));
    });
}

// Búsqueda integrada en header
function setupSearch() {
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');

    searchButton.addEventListener('click', () => {
        const isOpen = searchInput.classList.toggle('open');
        if (isOpen) {
            searchInput.focus();
        } else {
            searchInput.value = '';
            renderMovies(mockMovies);
        }
    });

    searchInput.addEventListener('input', () => {
        const term = searchInput.value.toLowerCase().trim();
        if (term === '') {
            renderMovies(mockMovies);
        } else {
            const filtered = mockMovies.filter(m => m.title.toLowerCase().includes(term));
            renderMovies(filtered);
        }
    });

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchInput.classList.remove('open');
            searchInput.value = '';
            renderMovies(mockMovies);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('moviesGrid');
    grid.innerHTML = '<div class="loading"><div class="loading-spinner"></div></div>';

    setTimeout(() => {
        updateHeroBanner();
        startHeroInterval();
        renderMovies(mockMovies);
        setupSearch();
        
        // Inicializar efectos visuales
        createParticles();
        setupHeroParallax();
        setupCardDynamicShadow();

        document.querySelector('.hero-play-button').addEventListener('click', () => {
            if (currentHeroMovie) playMovie(currentHeroMovie);
        });

        // Pausar hero al hacer hover sobre el banner
        const heroBanner = document.getElementById('heroBanner');
        heroBanner.addEventListener('mouseenter', () => { isHeroPaused = true; });
        heroBanner.addEventListener('mouseleave', () => { isHeroPaused = false; });

        // Setup categorías
        document.querySelectorAll('.category-chip').forEach(chip => {
            chip.addEventListener('click', (e) => {
                createRipple(e, chip);
                document.querySelectorAll('.category-chip').forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                currentCategory = chip.dataset.category;
                renderMovies(mockMovies);
            });
        });

        // Añadir ripple a todos los botones
        document.addEventListener('click', (e) => {
            if (e.target.matches('.action-button, .hero-play-button, .hero-info-button')) {
                createRipple(e, e.target);
            }
        });
    }, 500);
});
