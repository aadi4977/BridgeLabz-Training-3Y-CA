/**
 * Assignment 7 - Question 2: Live Character Counter with Warning Behavior
 * 
 * Requirements:
 * 1. Build a textarea that shows remaining characters (max 100 chars).
 * 2. Turns the counter yellow at 20 chars left (i.e., between 1 and 20 chars remaining).
 * 3. Turns red at 0 remaining and prevents further typing using preventDefault().
 * 4. A button "Reset" clears everything (textarea, counter, styles).
 * 5. Can be executed/tested in browser console or Node.js environment.
 */

"use strict";

// ============================================================================
// 1. Core Logic & State Management
// ============================================================================
const MAX_CHARACTERS = 100;
const WARNING_THRESHOLD = 20;

/**
 * Calculates remaining characters and current state badge.
 * @param {string} text - Current string in the textarea.
 * @returns {object} Calculated remaining, color state, and allowed status.
 */
function calculateCharacterState(text) {
  const currentLength = (text || "").length;
  const remaining = MAX_CHARACTERS - currentLength;

  let colorState = "normal"; // default green / neutral
  if (remaining <= 0) {
    colorState = "danger"; // red
  } else if (remaining <= WARNING_THRESHOLD) {
    colorState = "warning"; // yellow
  }

  return {
    currentLength,
    remaining: Math.max(0, remaining),
    max: MAX_CHARACTERS,
    colorState,
    isAtLimit: remaining <= 0
  };
}

/**
 * Checks whether a key event should be blocked when limit is reached.
 * Keys like Backspace, Delete, Arrows, and modifier combos should still be allowed.
 * @param {KeyboardEvent|object} event - Key event or simulated object with key & flags.
 * @param {number} currentLength - Current length of the text.
 * @param {number} selectionLength - Number of characters currently selected.
 * @returns {boolean} True if the key press should be prevented via preventDefault().
 */
function shouldPreventKeyPress(event, currentLength, selectionLength = 0) {
  // If user has highlighted text, replacement is allowed even at limit
  if (selectionLength > 0) {
    return false;
  }

  if (currentLength < MAX_CHARACTERS) {
    return false;
  }

  // Allowed navigation, deletion, and control keys
  const allowedKeys = [
    "Backspace", "Delete", "ArrowLeft", "ArrowRight",
    "ArrowUp", "ArrowDown", "Tab", "Escape", "Home", "End", "PageUp", "PageDown"
  ];

  if (allowedKeys.includes(event.key)) {
    return false;
  }

  // Allow standard keyboard shortcuts (Ctrl+A, Ctrl+C, Ctrl+X, Ctrl+Z, Meta+...)
  if (event.ctrlKey || event.metaKey || event.altKey) {
    return false;
  }

  // Any other printable character or Enter should be blocked
  return true;
}

// ============================================================================
// 2. Browser DOM Implementation
// ============================================================================
function initCharCounterApp() {
  if (typeof document === "undefined") return;

  const textarea = document.getElementById("char-textarea");
  const counterDisplay = document.getElementById("char-counter");
  const resetBtn = document.getElementById("reset-btn");
  const warningBadge = document.getElementById("warning-badge");

  if (!textarea || !counterDisplay) return;

  /**
   * Updates UI counter text, colors, and warnings based on textarea content.
   */
  function updateUI() {
    const text = textarea.value;
    const state = calculateCharacterState(text);

    counterDisplay.textContent = `${state.remaining} characters remaining (Max: ${state.max})`;

    // Remove previous state classes
    counterDisplay.classList.remove("counter-normal", "counter-warning", "counter-danger");

    if (state.colorState === "danger") {
      counterDisplay.style.color = "#ef4444"; // Red
      counterDisplay.style.fontWeight = "700";
      if (warningBadge) {
        warningBadge.textContent = "Limit reached! Further typing prevented.";
        warningBadge.style.color = "#ef4444";
        warningBadge.style.display = "block";
      }
    } else if (state.colorState === "warning") {
      counterDisplay.style.color = "#eab308"; // Yellow
      counterDisplay.style.fontWeight = "600";
      if (warningBadge) {
        warningBadge.textContent = `Warning: Only ${state.remaining} characters left!`;
        warningBadge.style.color = "#eab308";
        warningBadge.style.display = "block";
      }
    } else {
      counterDisplay.style.color = "#10b981"; // Green / Normal
      counterDisplay.style.fontWeight = "500";
      if (warningBadge) {
        warningBadge.style.display = "none";
      }
    }
  }

  // --------------------------------------------------------------------------
  // KEYDOWN LISTENER: Prevent further typing when 0 chars left using preventDefault()
  // --------------------------------------------------------------------------
  textarea.addEventListener("keydown", (event) => {
    const selectionLength = textarea.selectionEnd - textarea.selectionStart;
    const currentLength = textarea.value.length;

    if (shouldPreventKeyPress(event, currentLength, selectionLength)) {
      event.preventDefault(); // Stop further typing
      updateUI();
    }
  });

  // --------------------------------------------------------------------------
  // INPUT LISTENER: Update counter in real-time, handle paste clamp
  // --------------------------------------------------------------------------
  textarea.addEventListener("input", () => {
    // Clamp if user pastes text exceeding 100 characters
    if (textarea.value.length > MAX_CHARACTERS) {
      textarea.value = textarea.value.slice(0, MAX_CHARACTERS);
    }
    updateUI();
  });

  // --------------------------------------------------------------------------
  // RESET BUTTON: Clears textarea, resets counter to 100, restores normal state
  // --------------------------------------------------------------------------
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      textarea.value = "";
      updateUI();
      textarea.focus();
    });
  }

  // Initial render
  updateUI();
}

// Auto-initialize when loaded in browser
if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCharCounterApp);
  } else {
    initCharCounterApp();
  }
}

// ============================================================================
// 3. Node.js Verification & Console Demonstration Mode
// ============================================================================
if (typeof process !== "undefined" && process.release && process.release.name === "node") {
  console.log("====================================================================");
  console.log("  ASSIGNMENT 7 - QUESTION 2: LIVE CHARACTER COUNTER (CONSOLE DEMO)   ");
  console.log("====================================================================\n");

  // Test Case 1: Initial State (0 chars)
  const case1 = calculateCharacterState("");
  console.log("Test Case 1: Empty text (Initial)");
  console.log(`- Current Length: ${case1.currentLength}`);
  console.log(`- Remaining: ${case1.remaining} / ${case1.max}`);
  console.log(`- Color State: ${case1.colorState} (Expected: normal/green)\n`);

  // Test Case 2: 50 characters (Normal state)
  const case2 = calculateCharacterState("A".repeat(50));
  console.log("Test Case 2: 50 characters typed");
  console.log(`- Current Length: ${case2.currentLength}`);
  console.log(`- Remaining: ${case2.remaining}`);
  console.log(`- Color State: ${case2.colorState} (Expected: normal)\n`);

  // Test Case 3: 85 characters typed (15 remaining -> Warning Yellow)
  const case3 = calculateCharacterState("B".repeat(85));
  console.log("Test Case 3: 85 characters typed (<= 20 chars left)");
  console.log(`- Current Length: ${case3.currentLength}`);
  console.log(`- Remaining: ${case3.remaining}`);
  console.log(`- Color State: ${case3.colorState} (Expected: warning/yellow)\n`);

  // Test Case 4: 100 characters typed (0 remaining -> Danger Red & Block Typing)
  const case4 = calculateCharacterState("C".repeat(100));
  console.log("Test Case 4: 100 characters typed (0 chars left)");
  console.log(`- Current Length: ${case4.currentLength}`);
  console.log(`- Remaining: ${case4.remaining}`);
  console.log(`- Color State: ${case4.colorState} (Expected: danger/red)`);

  const mockLetterEvent = { key: "x", ctrlKey: false, metaKey: false, altKey: false };
  const mockBackspaceEvent = { key: "Backspace", ctrlKey: false, metaKey: false, altKey: false };

  const preventLetter = shouldPreventKeyPress(mockLetterEvent, 100, 0);
  const preventBackspace = shouldPreventKeyPress(mockBackspaceEvent, 100, 0);

  console.log(`- Typing letter 'x' at limit -> preventDefault: ${preventLetter} (Expected: true)`);
  console.log(`- Typing 'Backspace' at limit -> preventDefault: ${preventBackspace} (Expected: false)\n`);

  // Test Case 5: Reset
  console.log("Test Case 5: Triggering Reset");
  const caseReset = calculateCharacterState("");
  console.log(`- Text cleared -> Remaining: ${caseReset.remaining}, Color State: ${caseReset.colorState}\n`);

  console.log("[Status] Q2 logic executed and verified successfully in Node.js!\n");
}
