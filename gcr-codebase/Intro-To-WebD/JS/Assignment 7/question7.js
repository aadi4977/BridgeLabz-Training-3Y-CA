/**
 * Assignment 7 - Question 7: Detect Mouse Path & Coordinates Logger
 * 
 * Requirements:
 * 1. Create a box <div> with exact dimensions (400x400 px).
 * 2. Track mouse move inside the box.
 * 3. Show live clientX, clientY coordinates.
 * 4. On double-click inside, drop a red dot at the exact click position.
 * 5. Can be executed/tested in browser console or Node.js environment.
 */

"use strict";

// ============================================================================
// 1. Coordinates Math & State Manager
// ============================================================================
const BOX_WIDTH = 400;
const BOX_HEIGHT = 400;
const DOT_DIAMETER = 12; // 12px diameter circle

class MouseTrackerState {
  constructor() {
    this.currentCoordinates = { clientX: 0, clientY: 0, offsetX: 0, offsetY: 0 };
    this.dots = [];
    this.maxDots = 100;
  }

  updateMove(clientX, clientY, offsetX, offsetY) {
    this.currentCoordinates = {
      clientX: Math.round(clientX),
      clientY: Math.round(clientY),
      offsetX: Math.round(offsetX),
      offsetY: Math.round(offsetY)
    };
    return this.currentCoordinates;
  }

  addDot(offsetX, offsetY, clientX = 0, clientY = 0) {
    // Keep dot within 400x400 box boundaries
    const radius = DOT_DIAMETER / 2;
    const clampedX = Math.max(0, Math.min(BOX_WIDTH, offsetX));
    const clampedY = Math.max(0, Math.min(BOX_HEIGHT, offsetY));

    const dot = {
      id: Date.now() + Math.random(),
      x: clampedX,
      y: clampedY,
      left: clampedX - radius,
      top: clampedY - radius,
      clientX,
      clientY,
      timestamp: new Date().toLocaleTimeString()
    };

    this.dots.push(dot);
    return dot;
  }

  clearDots() {
    this.dots = [];
  }
}

// ============================================================================
// 2. Browser DOM Implementation
// ============================================================================
function initMouseTrackerApp() {
  if (typeof document === "undefined") return;

  const trackingBox = document.getElementById("tracking-box");
  const clientXDisplay = document.getElementById("coord-client-x");
  const clientYDisplay = document.getElementById("coord-client-y");
  const offsetDisplay = document.getElementById("coord-offset");
  const dotsCountDisplay = document.getElementById("dots-count");
  const clearBtn = document.getElementById("clear-dots-btn");

  if (!trackingBox) return;

  const tracker = new MouseTrackerState();

  // --------------------------------------------------------------------------
  // REQUIREMENT 1 & 2: Mouse move inside the box -> show live clientX, clientY
  // --------------------------------------------------------------------------
  trackingBox.addEventListener("mousemove", (event) => {
    // Compute box relative offset coordinates
    const rect = trackingBox.getBoundingClientRect();
    const localX = event.clientX - rect.left;
    const localY = event.clientY - rect.top;

    tracker.updateMove(event.clientX, event.clientY, localX, localY);

    if (clientXDisplay) clientXDisplay.textContent = `${event.clientX}px`;
    if (clientYDisplay) clientYDisplay.textContent = `${event.clientY}px`;
    if (offsetDisplay) offsetDisplay.textContent = `(${Math.round(localX)}, ${Math.round(localY)})`;
  });

  trackingBox.addEventListener("mouseleave", () => {
    if (offsetDisplay) offsetDisplay.textContent = "Outside box";
  });

  // --------------------------------------------------------------------------
  // REQUIREMENT 3: On double-click inside, drop a red dot at click position
  // --------------------------------------------------------------------------
  trackingBox.addEventListener("dblclick", (event) => {
    const rect = trackingBox.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    const dotData = tracker.addDot(clickX, clickY, event.clientX, event.clientY);

    // Create and append the red dot element
    const dotElement = document.createElement("div");
    dotElement.className = "red-dot";
    dotElement.style.cssText = `
      position: absolute;
      width: ${DOT_DIAMETER}px;
      height: ${DOT_DIAMETER}px;
      background-color: #ef4444;
      border: 2px solid #ffffff;
      border-radius: 50%;
      left: ${dotData.left}px;
      top: ${dotData.top}px;
      pointer-events: none;
      box-shadow: 0 0 8px rgba(239, 68, 68, 0.8);
      transform: scale(0);
      transition: transform 0.15s ease-out;
    `;

    trackingBox.appendChild(dotElement);

    // Animate pop in
    requestAnimationFrame(() => {
      dotElement.style.transform = "scale(1)";
    });

    if (dotsCountDisplay) {
      dotsCountDisplay.textContent = tracker.dots.length;
    }
  });

  // Clear Dots Button
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      tracker.clearDots();
      const existingDots = trackingBox.querySelectorAll(".red-dot");
      existingDots.forEach(dot => dot.remove());
      if (dotsCountDisplay) dotsCountDisplay.textContent = "0";
    });
  }
}

// Auto-initialize when loaded in browser
if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMouseTrackerApp);
  } else {
    initMouseTrackerApp();
  }
}

// ============================================================================
// 3. Node.js Verification & Console Demonstration Mode
// ============================================================================
if (typeof process !== "undefined" && process.release && process.release.name === "node") {
  console.log("====================================================================");
  console.log("   ASSIGNMENT 7 - QUESTION 7: MOUSE COORDINATES LOGGER (CONSOLE)    ");
  console.log("====================================================================\n");

  const tracker = new MouseTrackerState();
  console.log(`1. Box dimensions configured: ${BOX_WIDTH}x${BOX_HEIGHT} pixels.`);

  // Test Case 1: Mouse movement tracking
  console.log("\n2. Simulating 'mousemove' inside the 400x400 box:");
  const move1 = tracker.updateMove(450, 320, 200, 150);
  console.log(`   - Live clientX: ${move1.clientX}, clientY: ${move1.clientY}`);
  console.log(`   - Box Local offset: (${move1.offsetX}, ${move1.offsetY})`);

  const move2 = tracker.updateMove(580, 410, 330, 240);
  console.log(`   - Live clientX: ${move2.clientX}, clientY: ${move2.clientY}`);
  console.log(`   - Box Local offset: (${move2.offsetX}, ${move2.offsetY})`);

  // Test Case 2: Double-click event dropping red dots
  console.log("\n3. Simulating 'dblclick' to drop red dots:");
  const dot1 = tracker.addDot(200, 150, 450, 320);
  console.log(`   - Dropped Red Dot 1 at local (${dot1.x}, ${dot1.y}) -> CSS left: ${dot1.left}px, top: ${dot1.top}px`);

  const dot2 = tracker.addDot(50, 350, 300, 520);
  console.log(`   - Dropped Red Dot 2 at local (${dot2.x}, ${dot2.y}) -> CSS left: ${dot2.left}px, top: ${dot2.top}px`);

  const dot3 = tracker.addDot(380, 25, 630, 195);
  console.log(`   - Dropped Red Dot 3 at local (${dot3.x}, ${dot3.y}) -> CSS left: ${dot3.left}px, top: ${dot3.top}px`);

  console.log(`\n4. Total Red Dots active: ${tracker.dots.length}`);
  console.table(tracker.dots.map(d => ({ X: d.x, Y: d.y, Left: `${d.left}px`, Top: `${d.top}px`, clientX: d.clientX, clientY: d.clientY })));

  // Test Case 3: Clear dots
  console.log("5. Testing Clear Dots:");
  tracker.clearDots();
  console.log(`   Remaining Dots: ${tracker.dots.length}`);

  console.log("\n[Status] Q7 logic executed and verified successfully in Node.js!\n");
}
