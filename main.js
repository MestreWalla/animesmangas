import data from './data.js';

const cardGrid = document.querySelector('.card-grid');

function createCards(filter = 'all', searchTerm = '') {
    cardGrid.innerHTML = '';

    let filteredData = data.categorias;

    if (filter === 'Completo') {
        filteredData = filteredData.filter(categoria => 
            categoria.volumes.every(v => v.status === 'Adquirido')
        );
    } else if (filter === 'Incompleto') {
        filteredData = filteredData.filter(categoria => 
            categoria.volumes.some(v => v.status === 'Falta')
        );
    }

    if (searchTerm) {
        filteredData = filteredData.filter(categoria => 
            categoria.nome.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    if (filteredData.length === 0) {
        cardGrid.innerHTML = `<p class=\"no-results\">Nenhum mangá correspondente encontrado.</p>`;
        return;
    }

    filteredData.forEach(categoria => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.wallpaper = categoria.wallpaper; // Add wallpaper data to card

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
            let destinationRect;

            requestAnimationFrame(() => {
                cardGrid.classList.add('grid-faded');
                loadingOverlay.classList.add('visible');
                
                destinationRect = destinationImage.getBoundingClientRect();

                flyingClone.style.top = `${destinationRect.top}px`;
                flyingClone.style.left = `${destinationRect.left}px`;
                flyingClone.style.width = `${destinationRect.width}px`;
                flyingClone.style.height = `${destinationRect.height}px`;
                flyingClone.style.borderRadius = '16px';
            });

            flyingClone.addEventListener('transitionend', () => {
                destinationImage.style.opacity = 1;
                loadingOverlay.querySelector('.loading-info').style.opacity = 1;

                flyingClone.style.transition = 'opacity 0.15s ease-out';
                flyingClone.style.opacity = 0;

                flyingClone.addEventListener('transitionend', () => {
                    flyingClone.remove();
                }, { once: true });

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
    // Create and prepend wallpaper element
    const wallpaper = document.createElement('div');
    wallpaper.className = 'main-wallpaper';
    document.body.prepend(wallpaper);

    // Event Delegation for Wallpaper Hover Effect
    cardGrid.addEventListener('mouseover', (event) => {
        const card = event.target.closest('.card');
        if (card && card.dataset.wallpaper) {
            wallpaper.style.backgroundImage = `url(${card.dataset.wallpaper})`;
            wallpaper.classList.add('visible');
        }
    });

    cardGrid.addEventListener('mouseout', (event) => {
        const card = event.target.closest('.card');
        if (card) {
            wallpaper.classList.remove('visible');
        }
    });

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
