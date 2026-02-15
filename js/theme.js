console.log("theme.js script started");

function applyTheme(theme) {
    console.log(`Applying theme: ${theme}`);
    document.body.dataset.theme = theme;
    localStorage.setItem('theme', theme);
    console.log("Theme applied and saved to localStorage");
}

function initializeTheme() {
    console.log("Initializing theme");
    // Apply theme immediately to avoid FOUC
    const savedTheme = localStorage.getItem('theme') || 'dark';
    console.log(`Found saved theme: ${savedTheme}`);
    applyTheme(savedTheme);

    // Add event listener after the DOM is ready
    const themeButton = document.querySelector('.theme-button');
    if (themeButton) {
        console.log("Found .theme-button element");
        themeButton.addEventListener('click', () => {
            const newTheme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
            console.log(`Theme button clicked, changing to ${newTheme}`);
            applyTheme(newTheme);
        });
         console.log("Theme button event listener added.");
    } else {
        console.warn("Warning: '.theme-button' element not found!");
    }
}

// Run the initialization code when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded, initializing theme.");
    initializeTheme();
});

console.log("theme.js script finished");
