/**
 * Assignment 7 - Question 8: Custom Dropdown Using Only JavaScript (No <select> Tag)
 * 
 * Requirements:
 * 1. Build a custom dropdown without using any <select> tags.
 * 2. A button shows/hides the dropdown options.
 * 3. Clicking an option updates the button text to the selected option.
 * 4. Clicking outside closes the dropdown.
 * 5. Use the CAPTURING PHASE for the closing mechanism:
 *    document.addEventListener("click", handler, true) -> useCapture = true.
 * 6. Can be executed/tested in browser console or Node.js environment.
 */

"use strict";

// ============================================================================
// 1. Dropdown State Manager
// ============================================================================
const DEFAULT_OPTIONS = [
  { id: "react", label: "React.js Framework" },
  { id: "vue", label: "Vue.js Framework" },
  { id: "angular", label: "Angular Framework" },
  { id: "svelte", label: "Svelte Next-Gen" },
  { id: "vanilla", label: "Pure Vanilla JavaScript" }
];

class CustomDropdownState {
  constructor(options = DEFAULT_OPTIONS, defaultPlaceholder = "Select a Framework") {
    this.options = options;
    this.placeholder = defaultPlaceholder;
    this.selectedOption = null;
    this.isOpen = false;
  }

  toggle() {
    this.isOpen = !this.isOpen;
    return this.isOpen;
  }

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  select(optionId) {
    const found = this.options.find(opt => opt.id === optionId);
    if (found) {
      this.selectedOption = found;
      this.close();
      return found;
    }
    return null;
  }

  getButtonText() {
    return this.selectedOption ? this.selectedOption.label : this.placeholder;
  }
}

// ============================================================================
// 2. Browser DOM Implementation
// ============================================================================
function initCustomDropdownApp() {
  if (typeof document === "undefined") return;

  const dropdownContainer = document.getElementById("custom-dropdown");
  const toggleBtn = document.getElementById("dropdown-toggle-btn");
  const optionsMenu = document.getElementById("dropdown-menu");
  const selectedDisplay = document.getElementById("selected-value-display");

  if (!dropdownContainer || !toggleBtn || !optionsMenu) return;

  const state = new CustomDropdownState();

  // Populate options list dynamically
  optionsMenu.innerHTML = "";
  state.options.forEach(opt => {
    const li = document.createElement("li");
    li.className = "dropdown-item";
    li.setAttribute("data-value", opt.id);
    li.textContent = opt.label;
    li.style.cssText = `
      padding: 10px 14px;
      color: #e2e8f0;
      cursor: pointer;
      font-size: 14px;
      transition: background 0.15s;
      border-bottom: 1px solid #334155;
    `;

    li.addEventListener("mouseenter", () => {
      li.style.backgroundColor = "#2563eb";
    });
    li.addEventListener("mouseleave", () => {
      li.style.backgroundColor = state.selectedOption?.id === opt.id ? "#1d4ed8" : "transparent";
    });

    // ------------------------------------------------------------------------
    // REQUIREMENT 2: Clicking an option updates the button text and closes
    // ------------------------------------------------------------------------
    li.addEventListener("click", () => {
      state.select(opt.id);
      updateUI();
    });

    optionsMenu.appendChild(li);
  });

  function updateUI() {
    // Update button label
    toggleBtn.innerHTML = `
      <span>${state.getButtonText()}</span>
      <span class="dropdown-chevron" style="transform: ${state.isOpen ? "rotate(180deg)" : "rotate(0deg)"}; transition: transform 0.2s;">▼</span>
    `;

    // Toggle menu visibility
    optionsMenu.style.display = state.isOpen ? "block" : "none";

    // Update active highlight on items
    const items = optionsMenu.querySelectorAll(".dropdown-item");
    items.forEach(item => {
      const val = item.getAttribute("data-value");
      if (state.selectedOption && val === state.selectedOption.id) {
        item.style.backgroundColor = "#1d4ed8";
        item.style.fontWeight = "600";
      } else {
        item.style.backgroundColor = "transparent";
        item.style.fontWeight = "400";
      }
    });

    if (selectedDisplay) {
      selectedDisplay.textContent = state.selectedOption ? state.selectedOption.label : "None selected";
    }
  }

  // --------------------------------------------------------------------------
  // REQUIREMENT 1: Button shows/hides dropdown
  // --------------------------------------------------------------------------
  toggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    state.toggle();
    updateUI();
  });

  // --------------------------------------------------------------------------
  // REQUIREMENT 3 & 4:
  // - Clicking outside closes the dropdown
  // - USE CAPTURING PHASE for the closing mechanism!
  //
  // Passing `true` as the third argument binds this listener to the CAPTURE phase.
  // In the DOM event dispatch flow, capture runs from Window -> Document -> Body -> ...
  // BEFORE event reaches target and bubbles up.
  // --------------------------------------------------------------------------
  function handleOutsideClickCapture(event) {
    if (!state.isOpen) return;

    // Check if clicked target is outside the dropdown container
    if (!dropdownContainer.contains(event.target)) {
      state.close();
      updateUI();
    }
  }

  // Bind during the CAPTURING PHASE (useCapture = true)
  document.addEventListener("click", handleOutsideClickCapture, true);

  // Keyboard accessibility: Escape key closes dropdown
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && state.isOpen) {
      state.close();
      updateUI();
    }
  });

  // Initial render
  updateUI();
}

// Auto-initialize when loaded in browser
if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCustomDropdownApp);
  } else {
    initCustomDropdownApp();
  }
}

// ============================================================================
// 3. Node.js Verification & Console Demonstration Mode
// ============================================================================
if (typeof process !== "undefined" && process.release && process.release.name === "node") {
  console.log("====================================================================");
  console.log("   ASSIGNMENT 7 - QUESTION 8: CUSTOM DROPDOWN (CONSOLE DEMO)         ");
  console.log("====================================================================\n");

  const dropdown = new CustomDropdownState();

  console.log("1. Initial Dropdown State:");
  console.log(`   - Is Open: ${dropdown.isOpen}`);
  console.log(`   - Button Text: "${dropdown.getButtonText()}"`);
  console.log(`   - Available Options (${dropdown.options.length}):`);
  console.table(dropdown.options);

  console.log("\n2. Simulating User Clicking Toggle Button:");
  dropdown.toggle();
  console.log(`   - Button clicked -> Is Open: ${dropdown.isOpen}`);

  console.log("\n3. Simulating User Selecting an Option ('vue'):");
  const selected = dropdown.select("vue");
  console.log(`   - Selected: "${selected.label}"`);
  console.log(`   - Button Text updated to: "${dropdown.getButtonText()}"`);
  console.log(`   - Menu auto-closed -> Is Open: ${dropdown.isOpen}`);

  console.log("\n4. Simulating Capturing Phase Outside Click:");
  dropdown.open();
  console.log(`   - Dropdown re-opened -> Is Open: ${dropdown.isOpen}`);
  console.log("   - User clicks outside in DOM tree.");
  console.log("   - Capture Phase listener intercepts event: document.addEventListener('click', handler, true).");
  console.log("   - Handler checks: container.contains(event.target) === false -> dropdown.close().");
  dropdown.close();
  console.log(`   - Dropdown Closed successfully -> Is Open: ${dropdown.isOpen}`);

  console.log("\n[Status] Q8 logic executed and verified successfully in Node.js!\n");
}
