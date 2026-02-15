console.log("load.js script started");

function showLoader() {
    const loader = document.getElementById('loader-container');
    if (loader) {
        console.log("Showing loader");
        loader.style.display = 'flex';
    }
}

function hideLoader() {
    const loader = document.getElementById('loader-container');
    if (loader) {
        console.log("Hiding loader");
        // Use a fade-out effect for a smoother transition
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500); // Match the transition duration in CSS
    }
}

// Show the loader as soon as the script is parsed
showLoader();

// Hide the loader once the entire page is fully loaded
window.addEventListener('load', () => {
    console.log("Window fully loaded, hiding loader.");
    hideLoader();
});

console.log("load.js script finished");
