# Manga Collection App Blueprint

## Overview

This application is a simple and elegant tool for managing a personal manga collection. It allows users to browse their collection, view details for each series, and track their acquired volumes. The interface is designed to be modern, responsive, and visually appealing, with a focus on a clean and intuitive user experience.

## Core Features

*   **Manga Collection Display**: The main screen displays the user's manga collection as a grid of cards. Each card shows the manga's cover, title, and publisher, as well as a count of acquired volumes.
*   **Search Functionality**: A search bar allows users to filter their collection by title.
*   **Collection Statistics**: A sidebar displays statistics about the collection, including the total number of titles and the number of acquired volumes.
*   **Dynamic Wallpaper**: As the user hovers over a manga card, the background of the application changes to a wallpaper associated with that series.
*   **Volume Details**: Clicking on a manga card opens a detailed view with more information about the series and a list of all volumes.
*   **Initial Loading Animation**: A smooth and modern loading animation is displayed when the application is first opened. This animation shows a grid of manga covers that fade in and scale up.
*   **Theme Switcher**: A theme switcher allows the user to toggle between light and dark modes.

## Design and Styling

*   **Layout**: The application uses a responsive two-column layout. On larger screens, the collection statistics are displayed in a sidebar next to the manga grid. On smaller screens, the sidebar is moved to the top of the page.
*   **Typography**: The application uses the 'Inter' font from Google Fonts, with a clean and readable typography scale.
*   **Color Scheme**: The application has both a light and a dark theme. The color scheme is designed to be modern and visually appealing.
*   **Animations**: The application uses a variety of animations to create a more dynamic and engaging user experience. These include:
    *   A fade-in animation for the initial loading screen.
    *   A hover animation for the manga cards.
    *   A shared element transition when clicking on a manga card.

## Project Structure

*   `index.html`: The main HTML file for the application.
*   `css/style.css`: The main stylesheet for the application.
*   `js/main.js`: The main JavaScript file for the application. This file handles the main application logic, including creating the manga cards, handling search functionality, and displaying collection statistics.
*   `js/data.js`: A JavaScript file that contains the data for the manga collection.
*   `js/animation.js`: A JavaScript file that handles the animation for the shared element transition when clicking on a manga card.
*   `js/initial-loading.js`: A JavaScript file that handles the initial loading animation.
*   `js/theme.js`: A JavaScript file that handles the theme switcher.
*   `assets/`: A directory that contains the images for the manga covers and wallpapers.
