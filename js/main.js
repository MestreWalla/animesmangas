import data from './data.js';

document.addEventListener('DOMContentLoaded', () => {
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

    function createLoadingScreen(categoria) {
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'loading-overlay';

        const loadingCard = document.createElement('div');
        loadingCard.className = 'loading-card';
        if (categoria.wallpaper) {
            loadingCard.style.backgroundImage = `url('${categoria.wallpaper}')`;
        }

        const loadingContent = document.createElement('div');
        loadingContent.className = 'loading-content';

        const cover = document.createElement('img');
        cover.src = categoria.volumes[0]?.imagem || 'placeholder.png';
        cover.alt = `Capa de ${categoria.nome}`;
        cover.className = 'loading-cover';
        cover.style.opacity = 0;

        const info = document.createElement('div');
        info.className = 'loading-info';
        info.style.opacity = 0;

        const title = document.createElement('h2');
        title.textContent = categoria.nome;

        const sinopsis = document.createElement('p');
        sinopsis.textContent = categoria.sinopsis || 'Sinopse não disponível.';

        const spinner = document.createElement('div');
        spinner.className = 'loading-spinner';

        info.appendChild(title);
        info.appendChild(sinopsis);
        info.appendChild(spinner);
        loadingContent.appendChild(cover);
        loadingContent.appendChild(info);
        loadingCard.appendChild(loadingContent);
        loadingOverlay.appendChild(loadingCard);

        return loadingOverlay;
    }

    function createCards(searchTerm = '') {
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
                const originImage = e.currentTarget.querySelector('.card-image');
                if (!originImage.src) return; // Don't animate if there is no image

                const originRect = originImage.getBoundingClientRect();

                const flyingClone = originImage.cloneNode(true);
                flyingClone.className = 'flying-clone';
                flyingClone.style.position = 'fixed';
                flyingClone.style.top = `${originRect.top}px`;
                flyingClone.style.left = `${originRect.left}px`;
                flyingClone.style.width = `${originRect.width}px`;
                flyingClone.style.height = `${originRect.height}px`;
                document.body.appendChild(flyingClone);

                const loadingOverlay = createLoadingScreen(categoria);
                document.body.appendChild(loadingOverlay);
                
                const destinationImage = loadingOverlay.querySelector('.loading-cover');
                const loadingInfo = loadingOverlay.querySelector('.loading-info');

                requestAnimationFrame(() => {
                    mangaGrid.classList.add('grid-faded');
                    loadingOverlay.classList.add('visible');
                    
                    const destinationRect = destinationImage.getBoundingClientRect();

                    flyingClone.style.top = `${destinationRect.top}px`;
                    flyingClone.style.left = `${destinationRect.left}px`;
                    flyingClone.style.width = `${destinationRect.width}px`;
                    flyingClone.style.height = `${destinationRect.height}px`;
                    flyingClone.style.borderRadius = '16px';
                });

                // --- ANIMATION FIX ---
                flyingClone.addEventListener('transitionend', () => {
                    // Make the destination elements visible. CSS transitions will handle the fade-in.
                    destinationImage.style.opacity = 1;
                    loadingInfo.style.opacity = 1;

                    // Wait for the destination image's opacity transition to finish before removing the clone.
                    // The CSS transition is now 0.3s (no delay).
                    setTimeout(() => {
                        flyingClone.remove();
                    }, 350); 

                    // Navigate after a longer delay to let the user see the popup.
                    setTimeout(() => {
                       window.location.href = `volumes.html?manga=${encodeURIComponent(categoria.nome)}`;
                    }, 1200);

                }, { once: true });
            });

            mangaGrid.appendChild(card);
        });
    }

    // Event Listeners
    if(searchBar) {
        searchBar.addEventListener('input', (e) => createCards(e.target.value));
    }

    if(mangaGrid) {
        mangaGrid.addEventListener('mouseover', (e) => {
            const card = e.target.closest('.card');
            if (card && card.dataset.wallpaper) {
                mainWallpaper.style.backgroundImage = `url(${card.dataset.wallpaper})`;
                mainWallpaper.classList.add('visible');
            }
        });

        mangaGrid.addEventListener('mouseout', () => {
            mainWallpaper.classList.remove('visible');
        });
    }

    // Initial Load
    createCards();
    displayStats();
});
