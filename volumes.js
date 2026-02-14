import data from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const mangaName = params.get('manga');

    const manga = data.categorias.find(c => c.nome === mangaName);

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

            filteredVolumes.forEach(volume => {
                const card = document.createElement('div');
                card.className = 'card volume-card';

                const img = document.createElement('img');
                img.src = volume.imagem;
                img.alt = `Capa do volume ${volume.volume} de ${manga.nome}`;
                card.appendChild(img);

                const cardInfo = document.createElement('div');
                cardInfo.className = 'card-info';

                const title = document.createElement('h2');
                title.textContent = `${volume.volume}`;
                cardInfo.appendChild(title);

                const status = document.createElement('p');
                status.textContent = volume.status;
                cardInfo.appendChild(status);

                card.appendChild(cardInfo);

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
    }
});
