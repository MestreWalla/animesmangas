import data from './data.js';

// Function to get a random subset of items from an array
function getRandomSubset(array, size) {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, size);
}

// Get all cover images from the data
const allCoverImages = data.categorias.flatMap(categoria => 
    categoria.volumes.map(volume => volume.imagem)
).filter(imagem => imagem); // Filter out any undefined/null images

export function setupInitialLoadingAnimation(callback) {
    const loadingOverlay = document.getElementById('initial-loading-overlay');
    const coverGrid = document.getElementById('loading-cover-grid');

    if (!loadingOverlay || !coverGrid) {
        // If elements don't exist, run the callback immediately
        callback();
        return;
    }

    // Create the grid of manga covers
    const subset = getRandomSubset(allCoverImages, 50); // Get 50 random covers
    coverGrid.innerHTML = ''; // Clear existing content

    subset.forEach((imageUrl, index) => {
        const item = document.createElement('div');
        item.className = 'loading-cover-item';
        item.style.backgroundImage = `url(${imageUrl})`;
        // Stagger the animation delay
        item.style.animationDelay = `${index * 0.05}s`;
        coverGrid.appendChild(item);
    });

    // Wait for the cover animations to give them time to start
    setTimeout(() => {
        // Fade out the loading overlay
        loadingOverlay.style.opacity = '0';

        // When the fade-out is complete, remove the overlay and run the main app logic
        loadingOverlay.addEventListener('transitionend', () => {
            loadingOverlay.remove();
            callback(); // Initialize the main application
        }, { once: true });
    }, 1500); // Adjust this time based on how long the cover animation takes
}
