import data from './data.js';

const cardGrid = document.querySelector('.card-grid');

function createCards(filter = 'all', searchTerm = '') {
    cardGrid.innerHTML = '';

    let filteredData = data.categorias;

    if (filter !== 'all') {
        filteredData = filteredData.filter(categoria => 
            categoria.volumes.some(v => v.status === filter)
        );
    }

    if (searchTerm) {
        filteredData = filteredData.filter(categoria => 
            categoria.nome.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    if (filteredData.length === 0) {
        cardGrid.innerHTML = `<p class="no-results">No matching manga found.</p>`;
        return;
    }

    filteredData.forEach(categoria => {
        const card = document.createElement('div');
        card.className = 'card';

        card.addEventListener('click', () => {
            const loadingOverlay = document.createElement('div');
            loadingOverlay.className = 'loading-overlay';

            const loadingCard = document.createElement('div');
            loadingCard.className = 'loading-card';
            loadingCard.style.backgroundImage = `url('${categoria.wallpaper}')`;

            const loadingContent = document.createElement('div');
            loadingContent.className = 'loading-content';

            const cover = document.createElement('img');
            cover.src = categoria.volumes[0]?.imagem || 'placeholder.png';
            cover.alt = `Capa de ${categoria.nome}`;
            cover.className = 'loading-cover';

            const info = document.createElement('div');
            info.className = 'loading-info';

            const title = document.createElement('h2');
            title.textContent = categoria.nome;

            const sinopsis = document.createElement('p');
            sinopsis.textContent = categoria.sinopsis || 'No synopsis available.';

            const spinner = document.createElement('div');
            spinner.className = 'loading-spinner';

            info.appendChild(title);
            info.appendChild(sinopsis);
            info.appendChild(spinner);
            loadingContent.appendChild(cover);
            loadingContent.appendChild(info);
            loadingCard.appendChild(loadingContent);
            loadingOverlay.appendChild(loadingCard);
            document.body.appendChild(loadingOverlay);

            setTimeout(() => {
                window.location.href = `volumes.html?manga=${encodeURIComponent(categoria.nome)}`;
            }, 4000); // 4s delay
        });

        const imageContainer = document.createElement('div');
        imageContainer.className = 'card-image-container';

        const img = document.createElement('img');
        img.src = categoria.volumes[0]?.imagem || 'placeholder.png'; 
        img.alt = `Capa do mangá ${categoria.nome}`;
        img.className = 'card-image';
        imageContainer.appendChild(img);

        const cardContent = document.createElement('div');
        cardContent.className = 'card-content';
        
        const cardTitle = document.createElement('h2');
        cardTitle.textContent = categoria.nome;
        cardTitle.className = 'card-title';
        cardContent.appendChild(cardTitle);

        const editora = document.createElement('p');
        editora.textContent = categoria.editora;
        editora.className = 'card-subtitle';
        cardContent.appendChild(editora);

        const volumeCount = document.createElement('div');
        const totalVolumes = categoria.volumes.length;
        const acquiredVolumes = categoria.volumes.filter(v => v.status === 'Adquirido').length;
        volumeCount.textContent = `${acquiredVolumes}/${totalVolumes}`;
        volumeCount.className = 'card-volume-count';
        
        card.appendChild(imageContainer);
        card.appendChild(cardContent);
        card.appendChild(volumeCount);

        cardGrid.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    createCards();

    const searchBar = document.getElementById('search-bar');
    searchBar.addEventListener('input', (e) => {
        const filterButtons = document.querySelectorAll('.filter-button');
        const activeFilter = Array.from(filterButtons).find(btn => btn.classList.contains('active'));
        const filter = activeFilter ? activeFilter.dataset.filter : 'all';
        createCards(filter, e.target.value);
    });

    const filterButtons = document.querySelectorAll('.filter-button');
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            const searchTerm = document.getElementById('search-bar').value;
            createCards(e.target.dataset.filter, searchTerm);
        });
    });
});
