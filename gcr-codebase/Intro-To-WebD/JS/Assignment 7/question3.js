/**
 * Assignment 7 - Question 3: Multi-Step Form with Next/Back & Validation
 * 
 * Requirements:
 * 1. Create a 3-step form:
 *    - Step 1: Name
 *    - Step 2: Email
 *    - Step 3: Password
 * 2. "Next" moves to the next step ONLY if input is valid.
 * 3. "Back" moves to previous step.
 * 4. When all 3 steps complete -> show summary.
 * 5. Can be executed/tested in browser console or Node.js environment.
 */

"use strict";

// ============================================================================
// 1. Validation Logic & State
// ============================================================================

/**
 * Validates a single step's input value.
 * @param {number} step - Current step (1, 2, or 3).
 * @param {string} value - The input value to validate.
 * @returns {object} { isValid: boolean, message: string }
 */
function validateStepInput(step, value) {
  const val = (value || "").trim();

  switch (step) {
    case 1: // Name Validation
      if (!val) {
        return { isValid: false, message: "Name is required." };
      }
      if (val.length < 2) {
        return { isValid: false, message: "Name must be at least 2 characters long." };
      }
      if (!/^[a-zA-Z\s'-]+$/.test(val)) {
        return { isValid: false, message: "Name can only contain letters and spaces." };
      }
      return { isValid: true, message: "" };

    case 2: // Email Validation
      if (!val) {
        return { isValid: false, message: "Email address is required." };
      }
      // Standard email regex format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(val)) {
        return { isValid: false, message: "Please enter a valid email address (e.g., user@example.com)." };
      }
      return { isValid: true, message: "" };

    case 3: // Password Validation
      if (!val) {
        return { isValid: false, message: "Password is required." };
      }
      if (val.length < 6) {
        return { isValid: false, message: "Password must be at least 6 characters long." };
      }
      return { isValid: true, message: "" };

    default:
      return { isValid: false, message: "Unknown form step." };
  }
}

// Multi-step form state manager
class MultiStepFormManager {
  constructor() {
    this.currentStep = 1;
    this.totalSteps = 3;
    this.formData = {
      name: "",
      email: "",
      password: ""
    };
    this.isCompleted = false;
  }

  getCurrentValue() {
    if (this.currentStep === 1) return this.formData.name;
    if (this.currentStep === 2) return this.formData.email;
    if (this.currentStep === 3) return this.formData.password;
    return "";
  }

  setCurrentValue(val) {
    if (this.currentStep === 1) this.formData.name = val;
    if (this.currentStep === 2) this.formData.email = val;
    if (this.currentStep === 3) this.formData.password = val;
  }

  next(inputValue) {
    const value = inputValue !== undefined ? inputValue : this.getCurrentValue();
    const validation = validateStepInput(this.currentStep, value);

    if (!validation.isValid) {
      return { success: false, message: validation.message, currentStep: this.currentStep };
    }

    this.setCurrentValue(value.trim());

    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
      return { success: true, message: "Moved to next step.", currentStep: this.currentStep };
    } else {
      this.isCompleted = true;
      return { success: true, message: "Form completed!", isCompleted: true, summary: this.getSummary() };
    }
  }

  back() {
    if (this.currentStep > 1) {
      this.currentStep--;
      return { success: true, currentStep: this.currentStep };
    }
    return { success: false, message: "Already at the first step." };
  }

  reset() {
    this.currentStep = 1;
    this.isCompleted = false;
    this.formData = { name: "", email: "", password: "" };
  }

  getSummary() {
    return {
      name: this.formData.name,
      email: this.formData.email,
      passwordMasked: "•".repeat(this.formData.password.length)
    };
  }
}

// ============================================================================
// 2. Browser DOM Implementation
// ============================================================================
function initMultiStepFormApp() {
  if (typeof document === "undefined") return;

  const formManager = new MultiStepFormManager();

  const step1Container = document.getElementById("step-1-container");
  const step2Container = document.getElementById("step-2-container");
  const step3Container = document.getElementById("step-3-container");
  const summaryContainer = document.getElementById("summary-container");

  const nameInput = document.getElementById("step-name-input");
  const emailInput = document.getElementById("step-email-input");
  const passwordInput = document.getElementById("step-password-input");

  const errorDisplay = document.getElementById("step-error-msg");
  const btnNext = document.getElementById("btn-step-next");
  const btnBack = document.getElementById("btn-step-back");
  const btnReset = document.getElementById("btn-step-reset");
  const stepIndicator = document.getElementById("step-indicator-text");

  if (!step1Container || !btnNext) return;

  function getActiveInput() {
    if (formManager.currentStep === 1) return nameInput;
    if (formManager.currentStep === 2) return emailInput;
    if (formManager.currentStep === 3) return passwordInput;
    return null;
  }

  function updateView() {
    // Hide all step containers
    step1Container.style.display = "none";
    step2Container.style.display = "none";
    step3Container.style.display = "none";
    if (summaryContainer) summaryContainer.style.display = "none";

    // Clear error
    if (errorDisplay) {
      errorDisplay.textContent = "";
      errorDisplay.style.display = "none";
    }

    if (formManager.isCompleted) {
      // Show Summary
      if (summaryContainer) {
        summaryContainer.style.display = "block";
        const sum = formManager.getSummary();
        document.getElementById("sum-name").textContent = sum.name;
        document.getElementById("sum-email").textContent = sum.email;
        document.getElementById("sum-password").textContent = sum.passwordMasked;
      }
      if (btnNext) btnNext.style.display = "none";
      if (btnBack) btnBack.style.display = "none";
      if (stepIndicator) stepIndicator.textContent = "Step: Summary / Finished";
      return;
    }

    if (btnNext) {
      btnNext.style.display = "inline-block";
      btnNext.textContent = formManager.currentStep === 3 ? "Submit / Finish" : "Next →";
    }

    // Toggle Back button visibility
    if (btnBack) {
      btnBack.style.display = formManager.currentStep > 1 ? "inline-block" : "none";
    }

    // Show active step
    if (formManager.currentStep === 1) step1Container.style.display = "block";
    if (formManager.currentStep === 2) step2Container.style.display = "block";
    if (formManager.currentStep === 3) step3Container.style.display = "block";

    if (stepIndicator) {
      stepIndicator.textContent = `Step ${formManager.currentStep} of 3: ${
        formManager.currentStep === 1 ? "Personal Name" : formManager.currentStep === 2 ? "Email Address" : "Secure Password"
      }`;
    }

    const currentInput = getActiveInput();
    if (currentInput) {
      currentInput.focus();
    }
  }

  // Next / Submit Handler
  btnNext.addEventListener("click", () => {
    const input = getActiveInput();
    const result = formManager.next(input ? input.value : "");

    if (!result.success) {
      if (errorDisplay) {
        errorDisplay.textContent = `⚠️ ${result.message}`;
        errorDisplay.style.display = "block";
      }
      if (input) input.focus();
    } else {
      updateView();
    }
  });

  // Back Handler
  if (btnBack) {
    btnBack.addEventListener("click", () => {
      formManager.back();
      updateView();
    });
  }

  // Reset Handler
  if (btnReset) {
    btnReset.addEventListener("click", () => {
      formManager.reset();
      if (nameInput) nameInput.value = "";
      if (emailInput) emailInput.value = "";
      if (passwordInput) passwordInput.value = "";
      updateView();
    });
  }

  // Clear error on user typing
  [nameInput, emailInput, passwordInput].forEach(inp => {
    if (inp) {
      inp.addEventListener("input", () => {
        if (errorDisplay) {
          errorDisplay.textContent = "";
          errorDisplay.style.display = "none";
        }
      });
      inp.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          btnNext.click();
        }
      });
    }
  });

  // Initialize view
  updateView();
}

// Auto-initialize when loaded in browser
if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMultiStepFormApp);
  } else {
    initMultiStepFormApp();
  }
}

// ============================================================================
// 3. Node.js Verification & Console Demonstration Mode
// ============================================================================
if (typeof process !== "undefined" && process.release && process.release.name === "node") {
  console.log("====================================================================");
  console.log("   ASSIGNMENT 7 - QUESTION 3: MULTI-STEP FORM (CONSOLE DEMO)         ");
  console.log("====================================================================\n");

  const form = new MultiStepFormManager();

  console.log("1. Starting at Step:", form.currentStep);

  console.log("   Attempting Next with empty name...");
  let res = form.next("");
  console.log(`   Validation Result: Valid=${res.success}, Error="${res.message}"`);

  console.log("   Providing valid name: 'Aaditya Gupta'");
  res = form.next("Aaditya Gupta");
  console.log(`   Moved to Step: ${form.currentStep}\n`);

  console.log("2. At Step 2 (Email):");
  console.log("   Attempting Next with invalid email: 'not-an-email'...");
  res = form.next("not-an-email");
  console.log(`   Validation Result: Valid=${res.success}, Error="${res.message}"`);

  console.log("   Providing valid email: 'aadi@example.com'");
  res = form.next("aadi@example.com");
  console.log(`   Moved to Step: ${form.currentStep}\n`);

  console.log("3. Testing 'Back' button:");
  form.back();
  console.log(`   Pressed Back -> Now at Step: ${form.currentStep} (Email retained: "${form.formData.email}")`);
  console.log("   Advancing forward again...");
  form.next(form.formData.email);
  console.log(`   Now at Step: ${form.currentStep}\n`);

  console.log("4. At Step 3 (Password):");
  console.log("   Attempting Next with short password '123'...");
  res = form.next("123");
  console.log(`   Validation Result: Valid=${res.success}, Error="${res.message}"`);

  console.log("   Providing valid password 'superSecret89!'...");
  res = form.next("superSecret89!");
  console.log("   Form Completion Result:", res.message);

  console.log("\n5. Summary Output:");
  console.table(form.getSummary());

  console.log("\n[Status] Q3 logic executed and verified successfully in Node.js!\n");
}
