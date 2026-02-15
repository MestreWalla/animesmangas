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

        // Set wallpaper
        if (manga.wallpaper) {
            const wallpaperBg = document.getElementById('manga-wallpaper-bg');
            if (wallpaperBg) {
                wallpaperBg.style.backgroundImage = `url(${manga.wallpaper})`;
                setTimeout(() => wallpaperBg.classList.add('visible'), 100);
                console.log(`Set wallpaper for ${manga.nome}`);
            }
        }

        // Populate header and sidebar
        document.getElementById('page-title').textContent = manga.nome;
        document.getElementById('header-manga-title').textContent = manga.nome;
        document.getElementById('manga-title').textContent = manga.nome;
        document.getElementById('manga-synopsis').textContent = manga.sinopsis;

        const coverImage = document.getElementById('manga-cover-image');
        if (coverImage && manga.volumes.length > 0 && manga.volumes[0].imagem) {
            coverImage.src = manga.volumes[0].imagem;
            coverImage.alt = `Capa de ${manga.nome}`;
        } else if (coverImage) {
            coverImage.style.display = 'none'; // Hide if no image
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
                card.className = `card ${volume.status.toLowerCase()}`;
                
                const imageContainer = document.createElement('div');
                imageContainer.className = 'card-image-container';
                
                const img = document.createElement('img');
                img.src = volume.imagem;
                img.alt = `Capa do ${volume.volume} de ${manga.nome}`;
                img.className = 'card-image';
                imageContainer.appendChild(img);

                const cardContent = document.createElement('div');
                cardContent.className = 'card-content';

                const title = document.createElement('h2');
                title.textContent = volume.volume;
                title.className = 'card-title';
                cardContent.appendChild(title);

                const statusIndicator = document.createElement('span');
                statusIndicator.className = 'status-indicator';
                cardContent.appendChild(statusIndicator);

                card.appendChild(imageContainer);
                card.appendChild(cardContent);

                volumesContainer.appendChild(card);
            });
        }

        renderVolumes();

        const filterButtons = document.querySelectorAll('.filter-button');
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                renderVolumes(e.target.dataset.filter);
            });
        });

    } else {
        console.error("Manga not found!");
        mainContent.innerHTML = `<p class="no-results">Manga não encontrado. Por favor, retorne à <a href="index.html">página inicial</a>.</p>`;
        document.getElementById('manga-title').textContent = 'Não encontrado';
    }
});
