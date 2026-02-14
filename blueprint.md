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

---

## **New Feature: Volume Counter on Cards**

This feature will display the number of acquired volumes versus the total number of volumes for each manga directly on its card on the main page (e.g., "5/10").

### 1. **Visual & Functional Goals**
*   **Data Calculation:** For each manga, the application will calculate:
    *   The total number of volumes.
    *   The number of volumes with the status "Adquirido".
*   **Display:** The count will be displayed on each manga card in a discreet manner.
*   **Styling:** The counter will be positioned in the bottom-right corner of the card, with a subtle design that doesn't distract from the main content.

### 2. **Actionable Steps**

1.  **JavaScript (`main.js`):**
    *   In the `createCards` function, for each manga, calculate the acquired and total volume counts.
    *   Create a new HTML element (e.g., a `p` or `div`) to hold the volume count text.
    *   Append this element directly to the `card` element to allow for absolute positioning.
2.  **CSS (`style.css`):**
    *   Add `position: relative` to the `.card` class.
    *   Style the `.card-volume-count` class to be positioned absolutely in the bottom-right corner.
    *   Adjust the styling to be more discreet, with a smaller font size and a subtle background color to ensure readability.
