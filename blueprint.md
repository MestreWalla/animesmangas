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

## **New Feature: Elegant Loading Screen**

This feature provides a beautiful and informative loading transition when a user clicks on a manga card.

### 1. **Visual & Functional Goals**
*   **Trigger:** When a user clicks on a manga card on the main page.
*   **Visuals:**
    1.  A full-screen, blurred backdrop appears.
    2.  A large, elegant card animates into the center of the screen. This card uses the manga's `wallpaper` for its background.
    3.  Inside the card, the layout is split into two columns:
        *   **Left:** The manga's cover image is displayed prominently.
        *   **Right:** The manga's synopsis is shown, with a subtle loading spinner at the bottom.
*   **Animation:** The loading card and its contents will fade and scale in smoothly for a polished effect.
*   **Transition:** After a few seconds, the application navigates to the `volumes.html` page.

### 2. **Actionable Steps**

1.  **JavaScript (`main.js`):**
    *   The card's click event listener will be completely rewritten.
    *   It will dynamically create the HTML structure for the loading overlay, including the main card, the content container, the cover image, and the synopsis text.
    *   The `style.backgroundImage` will be set to the manga's `wallpaper`.
    *   The `src` of the cover image and the text of the synopsis will be populated from the `data.js` object.
    *   A `setTimeout` will handle the navigation to `volumes.html`.
2.  **CSS (`style.css`):**
    *   All previous loading-related styles (`.card-clone`, `.expanded`, etc.) will be removed.
    *   New styles will be created for `.loading-overlay`, `.loading-card`, and its internal elements.
    *   `.loading-content` will use `display: flex` to create the side-by-side layout for the cover and synopsis.
    *   Styles will be added for `.loading-cover` and `.loading-info` to control their size and spacing.
    *   Keyframe animations (`@keyframes`) will be used to create a smooth, elegant entrance for the loading screen elements.
