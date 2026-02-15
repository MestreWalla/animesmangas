document.addEventListener('DOMContentLoaded', () => {
    const themeSwitcher = document.getElementById('theme-switcher');
    const body = document.body;

    // 1. Get preferred theme from localStorage or default to dark
    let currentTheme = localStorage.getItem('theme') || 'dark';

    // 2. Set initial theme on the body attribute
    body.setAttribute('data-theme', currentTheme);

    // 3. Add click event listener to the switcher
    themeSwitcher.addEventListener('click', () => {
        // Toggle the theme
        const newTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-theme', newTheme);
        
        // Save the new theme to localStorage
        localStorage.setItem('theme', newTheme);
    });
});
