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

    // Create the grid for volume covers
    const volumesGrid = document.createElement('div');
    volumesGrid.className = 'loading-volumes-grid';

    // Populate the grid with a limited number of volume covers
    const volumesToShow = categoria.volumes.slice(0, 10);
    volumesToShow.forEach((volume, index) => {
        if (volume.imagem) {
            const volumeItem = document.createElement('div');
            volumeItem.className = 'loading-volume-item';
            volumeItem.style.backgroundImage = `url(${volume.imagem})`;
            volumeItem.style.animationDelay = `${index * 0.07}s`; // Stagger the animation
            volumesGrid.appendChild(volumeItem);
        }
    });

    info.appendChild(title);
    info.appendChild(sinopsis);
    info.appendChild(volumesGrid); // Add the grid instead of the spinner
    loadingContent.appendChild(cover);
    loadingContent.appendChild(info);
    loadingCard.appendChild(loadingContent);
    loadingOverlay.appendChild(loadingCard);

    return loadingOverlay;
}

export function animateCardClick(event, categoria, mangaGrid) {
    const originImage = event.currentTarget.querySelector('.card-image');
    if (!originImage.src) return; 

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

    flyingClone.addEventListener('transitionend', () => {
        destinationImage.style.opacity = 1;
        loadingInfo.style.opacity = 1;

        setTimeout(() => {
            flyingClone.remove();
        }, 350); 

        setTimeout(() => {
           window.location.href = `volumes.html?manga=${encodeURIComponent(categoria.nome)}`;
        }, 1200);

    }, { once: true });
}
