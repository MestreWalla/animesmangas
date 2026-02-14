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

        card.addEventListener('click', (e) => {
            const originImage = e.currentTarget.querySelector('.card-image');
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
            const destinationRect = destinationImage.getBoundingClientRect();

            requestAnimationFrame(() => {
                cardGrid.classList.add('grid-faded');
                loadingOverlay.classList.add('visible');

                flyingClone.style.top = `${destinationRect.top}px`;
                flyingClone.style.left = `${destinationRect.left}px`;
                flyingClone.style.width = `${destinationRect.width}px`;
                flyingClone.style.height = `${destinationRect.height}px`;
                flyingClone.style.borderRadius = '16px';
            });

            flyingClone.addEventListener('transitionend', () => {
                // 1. Make destination elements visible underneath the clone
                destinationImage.style.opacity = 1;
                loadingOverlay.querySelector('.loading-info').style.opacity = 1;

                // 2. Prepare the clone for a fade-out transition and trigger it
                flyingClone.style.transition = 'opacity 0.15s ease-out';
                flyingClone.style.opacity = 0;

                // 3. Remove the clone *after* it has finished fading out
                flyingClone.addEventListener('transitionend', () => {
                    flyingClone.remove();
                }, { once: true });

                // 4. Navigate after a delay
                setTimeout(() => {
                   window.location.href = `volumes.html?manga=${encodeURIComponent(categoria.nome)}`;
                }, 2000);
            }, { once: true });
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

function createLoadingScreen(categoria) {
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
    cover.style.opacity = 0; // Initially hidden

    const info = document.createElement('div');
    info.className = 'loading-info';
    info.style.opacity = 0; // Initially hidden

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

    return loadingOverlay;
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
