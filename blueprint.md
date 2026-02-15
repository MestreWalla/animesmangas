# Blueprint: Manga Collection App

## Overview

This application allows users to browse and manage their manga collection. Users can view all mangas, filter them by status (All, Complete, Incomplete), and search for specific series by name. The interface is designed to be a modern, visually-rich, and intuitive experience with a sophisticated dark theme.

---

## Current Implemented Design & Features

*   **Layout:** A responsive grid of manga cards.
*   **Styling:** A sleek dark theme with clear typography and accent colors.
*   **Core Functionality:**
    *   Dynamic card generation from a `data.js` file.
    *   Client-side filtering by status (`Todos`, `Completos`, `Incompletos`).
    *   Real-time search by manga title.
    *   Light/dark theme switching.
*   **Dynamic Wallpaper Background:** On the main page, the background subtly changes to a blurred, series-specific wallpaper when the user hovers over a manga card, creating an immersive browsing experience.
*   **Signature Feature: Shared Element Transition Loading Screen:**
    *   When a user clicks on a manga, the card's cover image animates smoothly, appearing to "fly" and transform into the larger cover image on a detailed loading screen.
    *   This loading screen presents the manga's cover, title, synopsis, and a loading spinner against a blurred wallpaper of the series.
    *   After a brief moment, the application navigates to the `volumes.html` page for that series.

---

## Last Action: Restored Dynamic Wallpaper Background

This plan outlines the steps taken to re-implement the dynamic background effect on the main collection page.

### 1. **Visual & Functional Goal**

*   **Objective:** To create an immersive browsing experience by having the page background dynamically update to reflect the manga the user is currently hovering over.

### 2. **Actionable Steps Taken**

1.  **JavaScript (`main.js`):**
    *   A `div` with the class `main-wallpaper` is now programmatically prepended to the `<body>` when the DOM is loaded.
    *   A `data-wallpaper` attribute, containing the URL to the manga's wallpaper, was added to each card during its creation.
    *   Event delegation is now used on the `card-grid`. A `mouseover` event on a card triggers the update of the `.main-wallpaper` element's `backgroundImage` and adds the `.visible` class to fade it in.
    *   A `mouseout` event removes the `.visible` class, fading the wallpaper out.

2.  **CSS (`style.css`):**
    *   Added the `.main-wallpaper` style to fix the element to the background, apply a blur and brightness filter, and set its initial opacity to 0.
    *   Added the `.main-wallpaper.visible` style to change the opacity to 0.2, creating a smooth fade-in effect.
