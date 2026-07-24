# Editkaro.in | Cinematic Video Editing Portfolio

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Deployment: Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?logo=vercel)

A highly interactive, modern portfolio web application built for a social media marketing and video editing agency. Designed with a "mobile-first" approach and engineered for high performance using local HTML5 video handling.

## ✨ Key Features

*   **Cinematic 3D Tilt Cards:** Interactive media cards that calculate cursor coordinates to simulate physical 3D rotation with a dynamic glass glare effect.
*   **Ambient Lightbox Player:** A custom-built video modal that extracts the source of the clicked video and duplicates it into a heavily blurred background player to create a cinematic ambient glow.
*   **Dynamic Neon Navigation:** A JavaScript-powered neon indicator that precisely calculates the active section's width and X-axis coordinates, sliding smoothly to underline the active tab.
*   **Color Grading Masterclass:** An interactive before-and-after `<input type="range">` slider that dynamically adjusts CSS `clip-path` properties to reveal color-graded footage over raw LOG footage.
*   **High-Performance Media:** Completely decoupled from third-party APIs (like YouTube). Utilizes strictly compressed, locally hosted `.mp4` files to eliminate ad interference and reduce latency.

## 🛠️ Tech Stack

*   **Structure:** HTML5
*   **Styling:** CSS3 (CSS Grid, Flexbox, Glassmorphism, CSS Variables, Media Queries)
*   **Logic:** Vanilla JavaScript (ES6+, DOM Manipulation, Intersection Observer API)
*   **Hosting:** Vercel

## 📂 Folder Structure

To ensure the media loads correctly, the local repository must maintain this exact structure:

```text
/
├── index.html
├── style.css
├── script.js
└── media/
    ├── color-grading/
    │   ├── after.jpg
    │   └── before.jpg
    ├── thumbnails/
    │   ├── hero.jpg
    │   ├── gaming.jpg
    │   └── ...
    └── videos/
        ├── gaming.mp4
        ├── football.mp4
        └── ...
🚀 Getting Started
To run this project locally:

Clone the repository:

Bash
git clone [https://github.com/yourusername/editkaro-portfolio.git](https://github.com/yourusername/editkaro-portfolio.git)
Navigate to the project directory:

Bash
cd editkaro-portfolio
Open index.html in your preferred web browser. (Alternatively, use an extension like VS Code Live Server for hot-reloading).

👨‍💻 Author
Ajay RS

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
