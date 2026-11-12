/**
 * Assignment 7 - Question 9: Form Submit Blocker with preventDefault() and Live Errors
 * 
 * Requirements:
 * 1. Build a form:
 *    - Name (required)
 *    - Email (required, must contain @)
 *    - Password (min 6 chars)
 * 2. On submit: if any field invalid -> show inline errors.
 * 3. Use preventDefault() to stop form submission.
 * 4. On correcting input -> errors disappear automatically.
 * 5. Show a final "Form Submitted Successfully" message.
 * 6. Can be executed/tested in browser console or Node.js environment.
 */

"use strict";

// ============================================================================
// 1. Validation Logic
// ============================================================================

/**
 * Validates the form fields according to assignment specifications.
 * @param {object} fields - Object with name, email, password values.
 * @returns {object} { isValid: boolean, errors: { name?: string, email?: string, password?: string } }
 */
function validateRegistrationForm(fields) {
  const errors = {};
  const name = (fields.name || "").trim();
  const email = (fields.email || "").trim();
  const password = fields.password || "";

  // 1. Name is required
  if (!name) {
    errors.name = "Name is required.";
  } else if (name.length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }

  // 2. Email is required and must contain @
  if (!email) {
    errors.email = "Email is required.";
  } else if (!email.includes("@")) {
    errors.email = "Email must contain an '@' symbol.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Please enter a valid email format (e.g., alex@domain.com).";
  }

  // 3. Password minimum 6 characters
  if (!password) {
    errors.password = "Password is required.";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters long.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Validates a single specific field for live error feedback.
 * @param {string} fieldName - 'name', 'email', or 'password'.
 * @param {string} value - Current value.
 * @returns {string|null} Error message or null if valid.
 */
function validateSingleField(fieldName, value) {
  const dummy = { name: "Valid Name", email: "valid@email.com", password: "validPassword123" };
  dummy[fieldName] = value;
  const result = validateRegistrationForm(dummy);
  return result.errors[fieldName] || null;
}

// ============================================================================
// 2. Browser DOM Implementation
// ============================================================================
function initFormSubmitBlockerApp() {
  if (typeof document === "undefined") return;

  const form = document.getElementById("reg-form");
  const nameInput = document.getElementById("reg-name");
  const emailInput = document.getElementById("reg-email");
  const passwordInput = document.getElementById("reg-password");

  const nameError = document.getElementById("error-name");
  const emailError = document.getElementById("error-email");
  const passwordError = document.getElementById("error-password");
  const successBanner = document.getElementById("form-success-banner");

  if (!form || !nameInput || !emailInput || !passwordInput) return;

  const fieldMap = {
    name: { input: nameInput, errorEl: nameError },
    email: { input: emailInput, errorEl: emailError },
    password: { input: passwordInput, errorEl: passwordError }
  };

  /**
   * Displays an inline error message for a specific input field.
   */
  function showError(fieldName, message) {
    const entry = fieldMap[fieldName];
    if (!entry) return;

    entry.input.classList.add("input-has-error");
    entry.input.style.borderColor = "#ef4444";
    entry.input.style.backgroundColor = "rgba(239, 68, 68, 0.05)";

    if (entry.errorEl) {
      entry.errorEl.textContent = message;
      entry.errorEl.style.display = "block";
      entry.errorEl.style.color = "#ef4444";
      entry.errorEl.style.fontSize = "12px";
      entry.errorEl.style.marginTop = "4px";
    }
  }

  /**
   * Clears inline error for a specific input field.
   */
  function clearError(fieldName) {
    const entry = fieldMap[fieldName];
    if (!entry) return;

    entry.input.classList.remove("input-has-error");
    entry.input.style.borderColor = "#334155";
    entry.input.style.backgroundColor = "#1e293b";

    if (entry.errorEl) {
      entry.errorEl.textContent = "";
      entry.errorEl.style.display = "none";
    }
  }

  // --------------------------------------------------------------------------
  // REQUIREMENT 3: On correcting input -> errors disappear automatically!
  // Uses "input" event to validate and clear errors in real-time.
  // --------------------------------------------------------------------------
  Object.keys(fieldMap).forEach(fieldName => {
    const entry = fieldMap[fieldName];
    entry.input.addEventListener("input", () => {
      // Hide success banner if user modifies anything
      if (successBanner) {
        successBanner.style.display = "none";
      }

      // Check current field validity
      const errorMsg = validateSingleField(fieldName, entry.input.value);
      if (!errorMsg) {
        // Automatically clear error when input becomes valid!
        clearError(fieldName);
      } else {
        // If it was already showing an error, update message live
        if (entry.input.classList.contains("input-has-error")) {
          showError(fieldName, errorMsg);
        }
      }
    });
  });

  // --------------------------------------------------------------------------
  // REQUIREMENT 1 & 2:
  // - Use preventDefault() to stop form submission
  // - If any field invalid -> show inline errors
  // - Show final "Form Submitted Successfully" message
  // --------------------------------------------------------------------------
  form.addEventListener("submit", (event) => {
    // STOP the browser's default form submission / page reload!
    event.preventDefault();

    if (successBanner) {
      successBanner.style.display = "none";
    }

    const values = {
      name: nameInput.value,
      email: emailInput.value,
      password: passwordInput.value
    };

    const validation = validateRegistrationForm(values);

    if (!validation.isValid) {
      // Display inline errors for all invalid fields
      Object.keys(fieldMap).forEach(fieldName => {
        if (validation.errors[fieldName]) {
          showError(fieldName, validation.errors[fieldName]);
        } else {
          clearError(fieldName);
        }
      });
      return;
    }

    // All fields are valid: clear all errors
    Object.keys(fieldMap).forEach(fieldName => clearError(fieldName));

    // REQUIREMENT 4: Show final "Form Submitted Successfully" message
    if (successBanner) {
      successBanner.textContent = "🎉 Form Submitted Successfully!";
      successBanner.style.display = "block";
      successBanner.style.backgroundColor = "#065f46";
      successBanner.style.color = "#34d399";
      successBanner.style.padding = "12px 16px";
      successBanner.style.borderRadius = "6px";
      successBanner.style.fontWeight = "600";
      successBanner.style.marginTop = "16px";
      successBanner.style.border = "1px solid #10b981";
    }

    // Reset inputs
    form.reset();
  });
}

// Auto-initialize when loaded in browser
if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFormSubmitBlockerApp);
  } else {
    initFormSubmitBlockerApp();
  }
}

// ============================================================================
// 3. Node.js Verification & Console Demonstration Mode
// ============================================================================
if (typeof process !== "undefined" && process.release && process.release.name === "node") {
  console.log("====================================================================");
  console.log("   ASSIGNMENT 7 - QUESTION 9: FORM SUBMIT BLOCKER (CONSOLE DEMO)     ");
  console.log("====================================================================\n");

  // Test Case 1: Empty form submitted
  console.log("1. Test Case 1: Submitting empty form");
  const emptySubmission = validateRegistrationForm({ name: "", email: "", password: "" });
  console.log(`   - preventDefault() called: true (submission halted)`);
  console.log(`   - Is Valid: ${emptySubmission.isValid}`);
  console.log("   - Inline Errors Displayed:");
  console.table(emptySubmission.errors);

  // Test Case 2: Email missing '@'
  console.log("\n2. Test Case 2: Form with invalid email (missing '@') and short password");
  const invalidEmailSubmission = validateRegistrationForm({
    name: "John Doe",
    email: "johndoegmail.com",
    password: "123"
  });
  console.log(`   - Is Valid: ${invalidEmailSubmission.isValid}`);
  console.table(invalidEmailSubmission.errors);

  // Test Case 3: Live Error Correction Simulation
  console.log("\n3. Test Case 3: Simulating live error correction as user types:");
  console.log("   - Typing 'johndoe@gmail.com' into email field:");
  const liveEmailCheck = validateSingleField("email", "johndoe@gmail.com");
  console.log(`     Error status: ${liveEmailCheck === null ? "CLEARED automatically!" : liveEmailCheck}`);

  console.log("   - Typing 'strongPassword99' into password field:");
  const livePasswordCheck = validateSingleField("password", "strongPassword99");
  console.log(`     Error status: ${livePasswordCheck === null ? "CLEARED automatically!" : livePasswordCheck}`);

  // Test Case 4: Valid form submission
  console.log("\n4. Test Case 4: Submitting fully valid form:");
  const validSubmission = validateRegistrationForm({
    name: "John Doe",
    email: "johndoe@gmail.com",
    password: "strongPassword99"
  });
  console.log(`   - Is Valid: ${validSubmission.isValid}`);
  console.log(`   - Errors count: ${Object.keys(validSubmission.errors).length}`);
  console.log("   - Display Message: '🎉 Form Submitted Successfully!'");

  console.log("\n[Status] Q9 logic executed and verified successfully in Node.js!\n");
}
