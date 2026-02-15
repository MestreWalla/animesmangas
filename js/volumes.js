console.log("volumes.js script started");

import data from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed for volumes page");
    const params = new URLSearchParams(window.location.search);
    const mangaName = params.get('manga');
    console.log(`Manga name from URL: ${mangaName}`);

    const manga = data.categorias.find(c => c.nome === mangaName);
    const mainContent = document.querySelector('main');

    if (manga) {
        console.log("Found manga data:", manga);

        if (manga.wallpaper) {
            const wallpaperBg = document.getElementById('manga-wallpaper-bg');
            if (wallpaperBg) {
                wallpaperBg.style.backgroundImage = `url(${manga.wallpaper})`;
                setTimeout(() => wallpaperBg.classList.add('visible'), 100);
                console.log(`Set wallpaper for ${manga.nome}`);
            }
        }

        document.getElementById('page-title').textContent = manga.nome;
        document.getElementById('header-manga-title').textContent = manga.nome;
        document.getElementById('manga-title').textContent = manga.nome;
        document.getElementById('manga-synopsis').textContent = manga.sinopsis;

        const coverImage = document.getElementById('manga-cover-image');
        if (coverImage && manga.volumes.length > 0 && manga.volumes[0].imagem) {
            coverImage.src = manga.volumes[0].imagem;
            coverImage.alt = `Capa de ${manga.nome}`;
        } else if (coverImage) {
            coverImage.style.display = 'none';
        }

        const volumesContainer = document.getElementById('volumes-container');
        if (!volumesContainer) {
            console.error("Error: '#volumes-container' element not found!");
            return;
        }

        function renderVolumes(filter = 'all') {
            console.log(`Rendering volumes with filter: ${filter}`);
            volumesContainer.innerHTML = '';
            let filteredVolumes = manga.volumes;

            if (filter !== 'all') {
                filteredVolumes = filteredVolumes.filter(v => v.status === filter);
            }

            if (filteredVolumes.length === 0) {
                volumesContainer.innerHTML = `<p class="no-results">Nenhum volume correspondente encontrado.</p>`;
                return;
            }

            filteredVolumes.forEach(volume => {
                const card = document.createElement('div');
                card.className = `card volume-card ${volume.status.toLowerCase()}`;
                card.innerHTML = `
                    <div class="card-image-container">
                        <img src="${volume.imagem}" alt="Capa do ${volume.volume} de ${manga.nome}" class="card-image">
                    </div>
                    <div class="card-content">
                        <h3 class="card-title">${volume.volume}</h3>
                    </div>
                    <div class="status-indicator"></div>
                `;
                volumesContainer.appendChild(card);
            });
        }

        const filterButtons = document.querySelectorAll('.filter-btn');
        if (filterButtons.length > 0) {
            // Set "all" as active by default
            const allButton = document.querySelector('.filter-btn[data-filter="all"]');
            if (allButton) {
                allButton.classList.add('active');
            }

            filterButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    // Remove active class from the current active button
                    const currentActive = document.querySelector('.filter-btn.active');
                    if (currentActive) {
                        currentActive.classList.remove('active');
                    }
                    // Add active class to the clicked button
                    const targetButton = e.currentTarget;
                    targetButton.classList.add('active');
                    // Render volumes based on the filter
                    renderVolumes(targetButton.dataset.filter);
                });
            });
        }

        // Initial render
        renderVolumes();

    } else {
        console.error("Manga not found!");
        mainContent.innerHTML = `<p class="no-results">Manga não encontrado. Por favor, retorne à <a href="index.html">página inicial</a>.</p>`;
        document.getElementById('manga-title').textContent = 'Não encontrado';
    }
});
