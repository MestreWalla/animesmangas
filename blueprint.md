# Blueprint: Manga Collection App

## Overview

This application allows users to browse and manage their manga collection. Users can view all mangas, filter them by "Acquired" or "Missing" status, and search for specific series by name. The interface is designed to be a modern, visually-rich, and intuitive experience.

---

## Current Implemented Design

*   **Layout:** A clean, responsive, and uniform grid of cards.
*   **Styling:** A sophisticated dark theme with a subtle noise texture. Cards have a simple and elegant design with a "lift" and "glow" effect on hover.
*   **Functionality:**
    *   Dynamic card generation from a `data.js` file.
    *   Filtering by status (All, Acquired, Missing).
    *   Searching by manga title.
    *   A separate "Volumes" page with a consistent design.
    *   Light/dark theme switching with persistence in `localStorage`.
    *   A discreet volume counter on each manga card.

---

## **New Feature: Card-Based Loading Screen**

This feature will create a more focused and elegant transition when a user clicks on a manga card to view its volumes.

### 1. **Visual & Functional Goals**
*   **Trigger:** The loading screen will appear when a user clicks on a manga card on the main page.
*   **Visuals:** A blurred, full-screen backdrop will be displayed. In the center, a large card will appear, featuring the manga's `wallpaper` as its background. A subtle loading animation will be centered within this card.
*   **Transition:** After a short delay, the application will navigate to the corresponding `volumes.html` page.

### 2. **Actionable Steps**

1.  **JavaScript (`main.js`):**
    *   In the card's click event listener, the script will create a container for the loading overlay, which will act as a blurred backdrop.
    *   Inside the container, a new `div` for the loading card will be created. This card's background will be set to the manga's `wallpaper`.
    *   A `setTimeout` function will manage the transition to the `volumes.html` page after a delay.
2.  **CSS (`style.css`):**
    *   Update the `.loading-overlay` style to be a blurred backdrop.
    *   Create a new `.loading-card` class for the centered card, with styles for its size, border-radius, shadow, and background properties.
    *   Ensure the loading spinner is positioned correctly within the `.loading-card`.
