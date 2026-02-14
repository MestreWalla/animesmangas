import data from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const mangaName = params.get('manga');

    const manga = data.categorias.find(c => c.nome === mangaName);
    const mainContent = document.querySelector('main');

    if (manga) {
        document.getElementById('manga-title').textContent = manga.nome;
        document.getElementById('manga-synopsis').textContent = manga.sinopsis;

        const volumesContainer = document.getElementById('volumes-container');
        
        function renderVolumes(filter = 'all') {
            volumesContainer.innerHTML = '';

            let filteredVolumes = manga.volumes;

            if (filter !== 'all') {
                filteredVolumes = filteredVolumes.filter(v => v.status === filter);
            }

            if (filteredVolumes.length === 0) {
                volumesContainer.innerHTML = `<p class=\"no-results\">Nenhum volume correspondente encontrado.</p>`;
                return;
            }

            filteredVolumes.forEach(volume => {
                const card = document.createElement('div');
                card.className = `card ${volume.status.toLowerCase()}`;
                if (volume.status === 'Falta') {
                    card.classList.add('disabled');
                }

                const imageContainer = document.createElement('div');
                imageContainer.className = 'card-image-container';

                const img = document.createElement('img');
                img.src = volume.imagem;
                img.alt = `Capa do volume ${volume.volume} de ${manga.nome}`;
                img.className = 'card-image';
                imageContainer.appendChild(img);

                const cardContent = document.createElement('div');
                cardContent.className = 'card-content';

                const title = document.createElement('h2');
                title.textContent = `Volume ${volume.volume}`;
                title.className = 'card-title';
                cardContent.appendChild(title);

                const status = document.createElement('p');
                status.textContent = volume.status;
                status.className = 'card-subtitle';
                cardContent.appendChild(status);

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
        mainContent.innerHTML = `<p class=\"no-results\">Manga não encontrado. Por favor, retorne à <a href=\"index.html\">página inicial</a>.</p>`;
        document.getElementById('manga-title').textContent = 'Não encontrado';
    }
});
