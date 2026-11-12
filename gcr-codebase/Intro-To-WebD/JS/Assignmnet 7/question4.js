/**
 * Assignment 7 - Question 4: Theme Switcher Using Attribute Manipulation
 * 
 * Requirements:
 * 1. Build a theme switcher with 3 themes: Light, Dark, Blue.
 * 2. Clicking a button adds a class to <body>.
 * 3. ALL themes must be applied using setAttribute().
 * 4. Save current theme in a custom attribute: data-theme="dark".
 * 5. Can be executed/tested in browser console or Node.js environment.
 */

"use strict";

// ============================================================================
// 1. Theme Configuration & Core Logic
// ============================================================================
const VALID_THEMES = ["light", "dark", "blue"];
const DEFAULT_THEME = "dark";

/**
 * Applies a theme to an element strictly using setAttribute().
 * @param {string} themeName - Name of the theme: 'light', 'dark', or 'blue'.
 * @param {HTMLElement|object} target - Target element (defaults to document.body).
 * @returns {object} Applied attributes information.
 */
function applyTheme(themeName, target) {
  const normalizedTheme = (themeName || "").toLowerCase().trim();
  if (!VALID_THEMES.includes(normalizedTheme)) {
    throw new Error(`Invalid theme "${themeName}". Must be one of: ${VALID_THEMES.join(", ")}`);
  }

  const className = `theme-${normalizedTheme}`;

  // REQUIREMENT 1: Apply class using setAttribute()
  target.setAttribute("class", className);

  // REQUIREMENT 2: Save theme in custom data attribute using setAttribute()
  target.setAttribute("data-theme", normalizedTheme);

  return {
    theme: normalizedTheme,
    appliedClass: target.getAttribute("class"),
    appliedDataTheme: target.getAttribute("data-theme")
  };
}

// ============================================================================
// 2. Browser DOM Implementation
// ============================================================================
function initThemeSwitcherApp() {
  if (typeof document === "undefined") return;

  const buttons = document.querySelectorAll("[data-set-theme]");
  const currentThemeBadge = document.getElementById("current-theme-name");
  const classAttrDisplay = document.getElementById("attr-class-display");
  const dataAttrDisplay = document.getElementById("attr-data-display");

  function updateStatusUI(theme) {
    if (currentThemeBadge) {
      currentThemeBadge.textContent = theme.toUpperCase();
    }
    if (classAttrDisplay) {
      classAttrDisplay.textContent = document.body.getAttribute("class") || "(none)";
    }
    if (dataAttrDisplay) {
      dataAttrDisplay.textContent = `data-theme="${document.body.getAttribute("data-theme") || ""}"`;
    }

    // Update active state on buttons
    buttons.forEach(btn => {
      const btnTheme = btn.getAttribute("data-set-theme");
      if (btnTheme === theme) {
        btn.classList.add("active-theme-btn");
        btn.style.outline = "2px solid #38bdf8";
        btn.style.outlineOffset = "2px";
      } else {
        btn.classList.remove("active-theme-btn");
        btn.style.outline = "none";
      }
    });
  }

  // Attach click listeners to all theme buttons
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const theme = btn.getAttribute("data-set-theme");
      // Apply using setAttribute as required
      applyTheme(theme, document.body);
      updateStatusUI(theme);
    });
  });

  // Set default theme on initial load if not already set
  const initialTheme = document.body.getAttribute("data-theme") || DEFAULT_THEME;
  applyTheme(initialTheme, document.body);
  updateStatusUI(initialTheme);
}

// Auto-initialize when loaded in browser
if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initThemeSwitcherApp);
  } else {
    initThemeSwitcherApp();
  }
}

// ============================================================================
// 3. Node.js Verification & Console Demonstration Mode
// ============================================================================
if (typeof process !== "undefined" && process.release && process.release.name === "node") {
  console.log("====================================================================");
  console.log("   ASSIGNMENT 7 - QUESTION 4: THEME SWITCHER (CONSOLE DEMO)          ");
  console.log("====================================================================\n");

  // Mock DOM Body Element for Node verification
  class MockDOMElement {
    constructor() {
      this.attributes = {};
    }
    setAttribute(name, value) {
      this.attributes[name] = String(value);
    }
    getAttribute(name) {
      return this.attributes[name] || null;
    }
  }

  const mockBody = new MockDOMElement();

  console.log("1. Initial Mock Body Attributes:", mockBody.attributes);

  VALID_THEMES.forEach(theme => {
    console.log(`\n2. Applying Theme: "${theme}" using setAttribute()...`);
    const result = applyTheme(theme, mockBody);

    console.log(`   - setAttribute('class', '${result.appliedClass}')`);
    console.log(`   - setAttribute('data-theme', '${result.appliedDataTheme}')`);
    console.log(`   - Verification via getAttribute('class'): "${mockBody.getAttribute("class")}"`);
    console.log(`   - Verification via getAttribute('data-theme'): "${mockBody.getAttribute("data-theme")}"`);
  });

  console.log("\n3. Testing Invalid Theme Rejection:");
  try {
    applyTheme("neon-pink", mockBody);
  } catch (err) {
    console.log(`   Caught expected error: "${err.message}"`);
  }

  console.log("\n[Status] Q4 logic executed and verified successfully in Node.js!\n");
}
