# Blueprint: Manga Collection App

## Overview

This application allows users to browse and manage their manga collection. Users can view all mangas, filter them by "Acquired" or "Missing" status, and search for specific series by name. The interface is designed to be a modern, visually-rich, and intuitive experience.

---

## Current Implemented Design

*   **Layout:** A clean, responsive, and uniform grid of cards.
*   **Styling:** A sophisticated dark theme with a subtle noise texture.
*   **Functionality:**
    *   Dynamic card generation from a `data.js` file.
    *   Filtering by status (All, Acquired, Missing) and searching by title.
    *   Light/dark theme switching.
    *   An elegant loading screen with a wallpaper background, side-by-side cover and synopsis, and smooth fade-in animations.

---

## **New Feature: Shared Element Transition**

This feature creates a seamless and professional transition where the manga cover image appears to move from the grid and transform into the cover image on the loading screen.

### 1. **Visual & Functional Goals**
*   **Trigger:** When a user clicks on a manga card.
*   **Animation (The "Magic Move")**:
    1.  Get the position of the clicked card's image (`.card-image`).
    2.  Create a clone of this image and position it exactly over the original using `position: fixed`.
    3.  Fade out the main card grid.
    4.  Simultaneously, fade in the loading overlay's blurred background.
    5.  The image clone then animates (transitions `top`, `left`, `width`, `height`, `border-radius`) from its starting position to the final position of the cover image within the loading screen.
    6.  Once the image arrives at its destination, the rest of the loading screen content (synopsis, title, spinner) fades in.
    7.  The image clone is removed, revealing the actual `.loading-cover` element underneath.
*   **Transition:** After a delay, the application navigates to the `volumes.html` page.

### 2. **Actionable Steps**

1.  **JavaScript (`main.js`):**
    *   The card's click event listener will be completely rewritten to orchestrate this complex animation.
    *   It will create the "flying clone" of the image and append it to the body.
    *   It will dynamically create the loading overlay and its contents but keep them initially invisible.
    *   Crucially, it will **calculate** the final destination (position and size) of the cover image *before* the animation starts.
    *   CSS classes and `setTimeout` will be used to sequence the animation steps: fade out grid, fade in overlay, start image transition, fade in text content, and finally, navigate.
2.  **CSS (`style.css`):**
    *   A new class, `.flying-clone`, will be created to style the animating image. This class will define its `position`, `z-index`, and smooth `transition` properties.
    *   The `.loading-overlay` and `.loading-content` styles will be adjusted to have an initial `opacity` of 0 to allow them to be faded in at the correct time.
    *   The card grid will have a fade-out transition.
