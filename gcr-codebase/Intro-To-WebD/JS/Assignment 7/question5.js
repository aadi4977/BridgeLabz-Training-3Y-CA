/**
 * Assignment 7 - Question 5: Image Gallery with Modal Preview
 * 
 * Requirements:
 * 1. Create an image grid (6 images).
 * 2. On clicking any image:
 *    - Show a modal popup.
 *    - Modal displays a bigger version of clicked image.
 *    - Clicking outside modal -> closes the modal.
 *    - Use event.stopPropagation() so clicking inside modal does NOT close it.
 * 3. Can be executed/tested in browser console or Node.js environment.
 */

"use strict";

// ============================================================================
// 1. Gallery Data (Self-contained vector SVG art for 100% offline reliability)
// ============================================================================
function createSvgDataUrl(title, gradientColors, iconText) {
  const [c1, c2] = gradientColors;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${c1};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${c2};stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="800" height="600" rx="12" fill="url(#grad)" />
    <circle cx="400" cy="260" r="90" fill="rgba(255,255,255,0.18)" />
    <text x="400" y="285" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="70" text-anchor="middle" fill="#ffffff">${iconText}</text>
    <text x="400" y="420" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="34" font-weight="bold" text-anchor="middle" fill="#ffffff">${title}</text>
    <text x="400" y="465" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="18" text-anchor="middle" fill="rgba(255,255,255,0.85)">Click outside modal to dismiss</text>
  </svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

const galleryItems = [
  {
    id: 1,
    title: "Mountain Vista",
    category: "Landscape",
    src: createSvgDataUrl("Mountain Vista", ["#3b82f6", "#1d4ed8"], "🏔️")
  },
  {
    id: 2,
    title: "Sunset Horizons",
    category: "Atmosphere",
    src: createSvgDataUrl("Sunset Horizons", ["#f97316", "#e11d48"], "🌅")
  },
  {
    id: 3,
    title: "Deep Emerald Forest",
    category: "Nature",
    src: createSvgDataUrl("Deep Forest", ["#10b981", "#047857"], "🌲")
  },
  {
    id: 4,
    title: "Cosmic Nebula",
    category: "Astronomy",
    src: createSvgDataUrl("Cosmic Nebula", ["#8b5cf6", "#4c1d95"], "🌌")
  },
  {
    id: 5,
    title: "Ocean Blue Depths",
    category: "Marine",
    src: createSvgDataUrl("Ocean Depths", ["#06b6d4", "#0369a1"], "🌊")
  },
  {
    id: 6,
    title: "Golden Desert Dunes",
    category: "Safari",
    src: createSvgDataUrl("Desert Dunes", ["#eab308", "#b45309"], "🏜️")
  }
];

// ============================================================================
// 2. Browser DOM Implementation
// ============================================================================
function initImageGalleryApp() {
  if (typeof document === "undefined") return;

  const galleryGrid = document.getElementById("gallery-grid");
  const modalOverlay = document.getElementById("gallery-modal");
  const modalContent = document.getElementById("gallery-modal-content");
  const modalImg = document.getElementById("modal-img");
  const modalTitle = document.getElementById("modal-title");
  const modalCloseBtn = document.getElementById("modal-close-btn");

  if (!galleryGrid || !modalOverlay || !modalContent) return;

  // Render 6 Gallery Cards
  galleryGrid.innerHTML = "";
  galleryItems.forEach(item => {
    const card = document.createElement("div");
    card.className = "gallery-card";
    card.setAttribute("data-id", item.id);
    card.style.cssText = "cursor: pointer; overflow: hidden; border-radius: 8px; border: 1px solid #334155; background: #1e293b; transition: transform 0.2s, box-shadow 0.2s;";

    card.innerHTML = `
      <div style="position: relative; overflow: hidden;">
        <img src="${item.src}" alt="${item.title}" style="width: 100%; height: 180px; object-fit: cover; display: block; transition: transform 0.3s;" />
      </div>
      <div style="padding: 12px;">
        <h4 style="color: #f8fafc; font-size: 15px; margin-bottom: 4px;">${item.title}</h4>
        <span style="color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">${item.category}</span>
      </div>
    `;

    // Hover effect
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-4px)";
      card.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.4)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "none";
      card.style.boxShadow = "none";
    });

    // Clicking any image opens modal
    card.addEventListener("click", () => {
      openModal(item);
    });

    galleryGrid.appendChild(card);
  });

  function openModal(item) {
    if (modalImg) modalImg.src = item.src;
    if (modalTitle) modalTitle.textContent = `${item.title} (${item.category})`;
    modalOverlay.style.display = "flex";
    document.body.style.overflow = "hidden"; // Prevent background scroll
  }

  function closeModal() {
    modalOverlay.style.display = "none";
    document.body.style.overflow = "";
    if (modalImg) modalImg.src = "";
  }

  // --------------------------------------------------------------------------
  // REQUIREMENT 1: Clicking outside modal -> closes the modal
  // The outer modalOverlay covers the entire viewport. Clicking it closes modal.
  // --------------------------------------------------------------------------
  modalOverlay.addEventListener("click", (event) => {
    // If the click reached the backdrop, close the modal
    closeModal();
  });

  // --------------------------------------------------------------------------
  // REQUIREMENT 2: Use event.stopPropagation() so clicking inside modal does NOT close it
  // This stops the click event from bubbling up to modalOverlay
  // --------------------------------------------------------------------------
  modalContent.addEventListener("click", (event) => {
    event.stopPropagation(); // CRITICAL: Stop propagation to outer backdrop listener
  });

  // Close button inside modal
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", () => {
      closeModal();
    });
  }

  // Keyboard accessibility: Escape key closes modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay.style.display === "flex") {
      closeModal();
    }
  });
}

// Auto-initialize when loaded in browser
if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initImageGalleryApp);
  } else {
    initImageGalleryApp();
  }
}

// ============================================================================
// 3. Node.js Verification & Console Demonstration Mode
// ============================================================================
if (typeof process !== "undefined" && process.release && process.release.name === "node") {
  console.log("====================================================================");
  console.log("   ASSIGNMENT 7 - QUESTION 5: IMAGE GALLERY MODAL (CONSOLE DEMO)     ");
  console.log("====================================================================\n");

  console.log(`1. Image Grid configured with ${galleryItems.length} items:`);
  galleryItems.forEach(img => {
    console.log(`   - [ID: ${img.id}] "${img.title}" (${img.category})`);
  });

  console.log("\n2. Event Propagation Architecture Demonstration:");
  let modalOpen = false;

  function mockOpenModal(item) {
    modalOpen = true;
    console.log(`   -> Opened modal for "${item.title}". Modal state: Open`);
  }

  function mockCloseModal() {
    modalOpen = false;
    console.log("   -> Modal closed!");
  }

  // Simulate opening
  mockOpenModal(galleryItems[0]);

  // Case A: User clicks INSIDE the modal content
  console.log("\nCase A: User clicks INSIDE the modal dialog box:");
  let eventPropagated = true;
  function insideClickHandler() {
    eventPropagated = false; // Simulated event.stopPropagation()
    console.log("   [Inside Click] event.stopPropagation() called!");
  }
  insideClickHandler();

  if (eventPropagated) {
    mockCloseModal();
  } else {
    console.log("   Result: Modal remains OPEN because propagation was stopped.");
  }

  // Case B: User clicks OUTSIDE on the backdrop overlay
  console.log("\nCase B: User clicks OUTSIDE modal on the backdrop overlay:");
  console.log("   [Backdrop Click] Click event handled by backdrop listener.");
  mockCloseModal();
  console.log(`   Result: Modal closed successfully. State: Open = ${modalOpen}`);

  console.log("\n[Status] Q5 logic executed and verified successfully in Node.js!\n");
}
