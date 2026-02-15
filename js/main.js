import data from './data.js';
import { animateCardClick } from './animation.js';

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    const mangaGrid = document.getElementById('manga-grid');
    const searchBar = document.getElementById('search-bar');
    const collectionStats = document.getElementById('collection-stats');
    const mainWallpaper = document.getElementById('main-wallpaper');

    function calculateStats() {
        const totalMangas = data.categorias.length;
        let totalVolumes = 0;
        let acquiredVolumes = 0;

        data.categorias.forEach(cat => {
            totalVolumes += cat.volumes.length;
            acquiredVolumes += cat.volumes.filter(v => v.status === 'Adquirido').length;
        });

        return { totalMangas, totalVolumes, acquiredVolumes };
    }

    function displayStats() {
        const stats = calculateStats();
        if (collectionStats) {
            collectionStats.innerHTML = `
                <p><strong>Títulos na Coleção:</strong> ${stats.totalMangas}</p>
                <p><strong>Volumes Adquiridos:</strong> ${stats.acquiredVolumes} de ${stats.totalVolumes}</p>
            `;
        }
    }

    function createCards(searchTerm = '') {
        if (!mangaGrid) return;
        mangaGrid.innerHTML = '';

        const filteredData = searchTerm
            ? data.categorias.filter(cat => cat.nome.toLowerCase().includes(searchTerm.toLowerCase()))
            : data.categorias;

        if (filteredData.length === 0) {
            mangaGrid.innerHTML = `<p class="no-results">Nenhum mangá encontrado.</p>`;
            return;
        }

        filteredData.forEach(categoria => {
            const card = document.createElement('div');
            card.className = 'card';
            card.dataset.wallpaper = categoria.wallpaper;

            const total = categoria.volumes.length;
            const acquired = categoria.volumes.filter(v => v.status === 'Adquirido').length;

            card.innerHTML = `
                <div class="card-image-container">
                    <img src="${categoria.volumes[0]?.imagem || ''}" alt="Capa de ${categoria.nome}" class="card-image">
                </div>
                <div class="card-content">
                    <h3 class="card-title">${categoria.nome}</h3>
                    <p class="card-subtitle">${categoria.editora}</p>
                </div>
                <div class="card-volume-count">${acquired}/${total}</div>
            `;

            card.addEventListener('click', (e) => {
                animateCardClick(e, categoria, mangaGrid);
            });

            mangaGrid.appendChild(card);
        });
    }

    if (searchBar) {
        searchBar.addEventListener('input', (e) => createCards(e.target.value));
    }

    if (mangaGrid) {
        mangaGrid.addEventListener('mouseover', (e) => {
            const card = e.target.closest('.card');
            if (card && card.dataset.wallpaper) {
                if(mainWallpaper) {
                    mainWallpaper.style.backgroundImage = `url(${card.dataset.wallpaper})`;
                    mainWallpaper.classList.add('visible');
                }
            }
        });

        mangaGrid.addEventListener('mouseout', () => {
            if(mainWallpaper) {
                mainWallpaper.classList.remove('visible');
            }
        });
    }

    createCards();
    displayStats();
}
