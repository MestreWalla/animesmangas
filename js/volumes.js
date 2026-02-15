console.log("volumes.js script started");

import data from './data.js';

// --- Loader --- 
window.addEventListener('load', () => {
    const loader = document.getElementById('loader-container');
    if (loader) {
        console.log("Window fully loaded, hiding loader.");
        // Fade out
        loader.style.opacity = '0';
        // Hide after transition
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500); // Matches CSS transition
    }
});

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
            const wallpaperBg = document.createElement('div');
            wallpaperBg.className = 'wallpaper-bg';
            wallpaperBg.style.backgroundImage = `url(${manga.wallpaper})`;
            document.body.prepend(wallpaperBg);
            console.log(`Set wallpaper for ${manga.nome}`);
        }

        document.getElementById('page-title').textContent = manga.nome;
        document.getElementById('manga-title').textContent = manga.nome;
        document.getElementById('manga-synopsis').textContent = manga.sinopsis;
        console.log("Set manga title and synopsis");

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
                console.log(`Filtering by status: ${filter}`);
                filteredVolumes = filteredVolumes.filter(v => v.status === filter);
            }
            console.log("Filtered volumes:", filteredVolumes);

            if (filteredVolumes.length === 0) {
                console.log("No volumes found to render for this filter.");
                volumesContainer.innerHTML = `<p class=\"no-results\">Nenhum volume correspondente encontrado.</p>`;
                return;
            }

            filteredVolumes.forEach(volume => {
                console.log("Creating card for volume:", volume.volume);
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
            console.log("Finished rendering all volume cards.");
        }

        console.log("Performing initial render of volumes.");
        renderVolumes();

        const filterButtons = document.querySelectorAll('.filter-button');
        console.log("Found filter buttons:", filterButtons);
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                console.log(`Filter button clicked: ${e.target.dataset.filter}`);
                filterButtons.forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                renderVolumes(e.target.dataset.filter);
            });
        });
         console.log("Filter button event listeners added.");

    } else {
        console.error("Manga not found!");
        mainContent.innerHTML = `<p class=\"no-results\">Manga não encontrado. Por favor, retorne à <a href=\"index.html\">página inicial</a>.</p>`;
        document.getElementById('manga-title').textContent = 'Não encontrado';
    }
});
console.log("volumes.js script finished");
