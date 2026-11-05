# Assignment 9: Responsive CSS (Lectures 22–24)

This repository contains complete solutions for **Assignment 9: Responsive CSS**, demonstrating modern responsive web design patterns, Flexbox, CSS Grid, Fluid Typography, CSS Filters, Keyframe Animations, and Media Queries.

---

## 📋 General Instructions Compliance Checklist

- [x] **Separate HTML and CSS file for each question**
- [x] **Zero JavaScript or external CSS frameworks used** (Pure semantic HTML5 & Vanilla CSS)
- [x] **Semantic HTML5 tags throughout** (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<figure>`, `<figcaption>`, `<footer>`)
- [x] **Neat, well-indented, and properly commented code**
- [x] **Strict Flexbox and Grid alignment primitives**
- [x] **High contrast, accessible typography, and smooth transitions**
- [x] **Descriptive filenames matching question titles** (Strictly adhering to: *"Do not work like this q1.html, q1.css use filename as question name"* rule)

---

## 🗂️ Question Solutions & File Mapping

| Question | Title | HTML File | CSS File | Key Concepts Demonstrated |
| :--- | :--- | :--- | :--- | :--- |
| **Q1** | Responsive Image Filter Gallery | `responsive-image-filter-gallery.html` | `responsive-image-filter-gallery.css` | CSS Grid `repeat(auto-fit, minmax(200px, 1fr))`, 6 filters (`blur`, `grayscale`, `sepia`, `brightness`, `contrast`, `hue-rotate`), hover transition, `<600px` 1-col stack. |
| **Q2** | Responsive Web Design Layout | `responsive-web-design-layout.html` | `responsive-web-design-layout.css` | Flexbox header (logo left, nav right), 3 horizontal feature boxes, hover `scale(1.05)`, centered footer, `<750px` column stack. |
| **Q3** | Responsive Cards with Media Queries | `responsive-cards-with-media-queries.html` | `responsive-cards-with-media-queries.css` | Flexbox row of 4 cards: Desktop (4 cols) &rarr; Tablet &le;900px (2 cols) &rarr; Mobile &le;600px (1 col), hover background color transition. |
| **Q4** | Responsive Typography | `responsive-typography.html` | `responsive-typography.css` | Fluid typography with `h1 { font-size: clamp(1.5rem, 4vw, 3rem); }` and `p { font-size: clamp(1rem, 2vw, 1.5rem); }`, `<700px` spacing & line-height adjustment. |
| **Q5** | Filter Cards with Animation | `filter-cards-with-animation.html` | `filter-cards-with-animation.css` | Flexbox 3 profile cards, grayscale/sepia filters, `@keyframes` page-load fade-in, hover filter removal and `translateY(-10px)` lift, `<800px` vertical stack. |
| **Q6** | Responsive CSS Cheat Sheet | `responsive-css-cheat-sheet.html` | `responsive-css-cheat-sheet.css` | CSS Grid 2–3 columns on desktop, boxes for Filters, Media Queries, Responsive Design, and Typography. Below 700px converts to key-value stacked rows. |
| **Q7** | Combined Responsive Web Demo | `combined-responsive-web-demo.html` | `combined-responsive-web-demo.css` | Flexbox header/nav, CSS Grid 3 sections (Gallery, Principles text, Cheat sheet preview), contact footer, fade-in keyframes, `<700px` vertical stack. |
| **Q8** | Filter Comparison Layout | `filter-comparison-layout.html` | `filter-comparison-layout.css` | Side-by-side comparison on desktop (Original vs Filtered). Right image has contrast/brightness filter that fades on hover. Below 700px stacks vertically with captions. |
| **Q9** | Responsive Design Principles Summary | `responsive-design-principles-summary.html` | `responsive-design-principles-summary.css` | CSS Grid 3 boxes (Fluid Layouts, Flexible Media, Breakpoints) with definitions and CSS examples. Hover gradient and color transition, `<600px` 1-column stack. |
| **Q10** | Responsive Dashboard Summary | `responsive-dashboard-summary.html` | `responsive-dashboard-summary.css` | CSS Grid dashboard layout (Header, Sidebar, Main Content, Footer). Cards with hover scale & shadow, `@keyframes` load animation. Below 750px sidebar shifts to top. |
| **Index** | Assignment Portal | `index.html` | Embedded CSS | Central navigation hub with live links to all 10 solutions and requirement badges. |

---

## 🚀 How to Run and Test

1. Open the project in **Visual Studio Code**.
2. To view any question, open the corresponding `.html` file:
   - Use the VS Code extension **Live Server** (Right-click &rarr; "Open with Live Server"), OR
   - Double-click the `.html` file to open directly in any modern browser (Chrome, Edge, Firefox, Safari).
3. Test responsiveness by resizing browser window or opening DevTools (`F12`) and toggling device simulation mode.
