/**
 * Q2: Student Form Validator (Forms + RegExp)
 * 
 * Objective:
 * Create a student registration form validator with fields: Name, Email, Phone, Password.
 * Use JavaScript and RegExp to validate:
 *   - Name: Only alphabets (allows single spaces between words for full name)
 *   - Email: Valid format (e.g., example@domain.com)
 *   - Phone: Exactly 10 digits
 *   - Password: Must contain at least 1 uppercase letter, 1 number, and 1 special character
 * 
 * Visual Feedback:
 *   - Invalid: Red border + descriptive error message
 *   - Valid: Green border
 * 
 * Environment: Node.js (automated unit tests) & Browser (interactive form)
 */

"use strict";

console.log("====================================================================");
console.log("        Q2: STUDENT FORM VALIDATOR (FORMS + REGEXP)                 ");
console.log("====================================================================\n");

/**
 * Regular Expressions used for field validations.
 */
const REGEX_PATTERNS = {
    // Only alphabetic characters and optional single spaces between words
    name: /^[A-Za-z]+(?: [A-Za-z]+)*$/,
    // Standard RFC-compliant email structure: localpart@domain.extension
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    // Exactly 10 numeric digits with no spaces or symbols
    phone: /^\d{10}$/,
    // Password lookaheads: >=1 uppercase, >=1 digit, >=1 special character
    passwordUppercase: /[A-Z]/,
    passwordNumber: /\d/,
    passwordSpecialChar: /[!@#$%^&*(),.?":{}|<>_\-+=\\/\[\]~`]/
};

/**
 * Validator module containing discrete validation functions for each field.
 */
class StudentFormValidator {
    /**
     * Validates the Name field.
     * @param {string} name - Student's full name
     * @returns {{isValid: boolean, message: string}}
     */
    static validateName(name) {
        if (!name || name.trim() === "") {
            return { isValid: false, message: "Name is required." };
        }
        const trimmed = name.trim();
        if (!REGEX_PATTERNS.name.test(trimmed)) {
            return { isValid: false, message: "Name must contain only alphabets." };
        }
        return { isValid: true, message: "" };
    }

    /**
     * Validates the Email field.
     * @param {string} email - Student's email address
     * @returns {{isValid: boolean, message: string}}
     */
    static validateEmail(email) {
        if (!email || email.trim() === "") {
            return { isValid: false, message: "Email is required." };
        }
        const trimmed = email.trim();
        if (!REGEX_PATTERNS.email.test(trimmed)) {
            return { isValid: false, message: "Enter a valid email address (e.g., student@domain.com)." };
        }
        return { isValid: true, message: "" };
    }

    /**
     * Validates the Phone field.
     * @param {string} phone - Student's phone number
     * @returns {{isValid: boolean, message: string}}
     */
    static validatePhone(phone) {
        if (!phone || phone.trim() === "") {
            return { isValid: false, message: "Phone number is required." };
        }
        const trimmed = phone.trim();
        if (!REGEX_PATTERNS.phone.test(trimmed)) {
            return { isValid: false, message: "Phone number must be exactly 10 digits." };
        }
        return { isValid: true, message: "" };
    }

    /**
     * Validates the Password field.
     * @param {string} password - Student's password
     * @returns {{isValid: boolean, message: string}}
     */
    static validatePassword(password) {
        if (!password) {
            return { isValid: false, message: "Password is required." };
        }
        const errors = [];
        if (!REGEX_PATTERNS.passwordUppercase.test(password)) {
            errors.push("at least 1 uppercase letter");
        }
        if (!REGEX_PATTERNS.passwordNumber.test(password)) {
            errors.push("at least 1 number");
        }
        if (!REGEX_PATTERNS.passwordSpecialChar.test(password)) {
            errors.push("at least 1 special character");
        }

        if (errors.length > 0) {
            return {
                isValid: false,
                message: `Password must contain: ${errors.join(", ")}.`
            };
        }
        return { isValid: true, message: "" };
    }

    /**
     * Validates all fields in a registration data payload.
     * @param {{name: string, email: string, phone: string, password: string}} data
     * @returns {{isAllValid: boolean, errors: Object}}
     */
    static validateForm(data) {
        const nameResult = this.validateName(data.name);
        const emailResult = this.validateEmail(data.email);
        const phoneResult = this.validatePhone(data.phone);
        const passwordResult = this.validatePassword(data.password);

        const isAllValid = nameResult.isValid && emailResult.isValid && phoneResult.isValid && passwordResult.isValid;

        return {
            isAllValid,
            errors: {
                name: nameResult.message,
                email: emailResult.message,
                phone: phoneResult.message,
                password: passwordResult.message
            }
        };
    }
}

// -----------------------------------------------------------------------------
// Browser DOM Integration (Executed when window and document are available)
// -----------------------------------------------------------------------------
function setupBrowserFormValidation() {
    if (typeof document === "undefined") return;

    const form = document.getElementById("studentForm");
    if (!form) return;

    const fields = ["name", "email", "phone", "password"];

    const validateFieldDOM = (fieldName) => {
        const input = document.getElementById(`student-${fieldName}`);
        const errorEl = document.getElementById(`student-${fieldName}-error`);
        if (!input || !errorEl) return false;

        let result;
        const val = input.value;
        switch (fieldName) {
            case "name": result = StudentFormValidator.validateName(val); break;
            case "email": result = StudentFormValidator.validateEmail(val); break;
            case "phone": result = StudentFormValidator.validatePhone(val); break;
            case "password": result = StudentFormValidator.validatePassword(val); break;
        }

        if (result.isValid) {
            input.style.borderColor = "#22c55e"; // Green border
            input.style.boxShadow = "0 0 0 1px #22c55e";
            errorEl.textContent = "";
            return true;
        } else {
            input.style.borderColor = "#ef4444"; // Red border
            input.style.boxShadow = "0 0 0 1px #ef4444";
            errorEl.textContent = result.message;
            errorEl.style.color = "#ef4444";
            return false;
        }
    };

    fields.forEach(field => {
        const el = document.getElementById(`student-${field}`);
        if (el) {
            el.addEventListener("input", () => validateFieldDOM(field));
            el.addEventListener("blur", () => validateFieldDOM(field));
        }
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const results = fields.map(f => validateFieldDOM(f));
        const allValid = results.every(Boolean);
        const statusEl = document.getElementById("student-form-status");

        if (allValid) {
            if (statusEl) {
                statusEl.innerHTML = `<span style="color: #22c55e; font-weight: bold;">Registration Successful! All validations passed.</span>`;
            }
            console.log("[StudentForm] Form submitted successfully with valid data.");
        } else {
            if (statusEl) {
                statusEl.innerHTML = `<span style="color: #ef4444; font-weight: bold;">Please fix the highlighted errors above.</span>`;
            }
            console.warn("[StudentForm] Form submission blocked due to validation errors.");
        }
    });
}

// Attach event listener in browser
if (typeof window !== "undefined" && typeof document !== "undefined") {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", setupBrowserFormValidation);
    } else {
        setupBrowserFormValidation();
    }
}

// -----------------------------------------------------------------------------
// Node.js Automated Test Harness
// -----------------------------------------------------------------------------
if (typeof process !== "undefined" && process.versions && process.versions.node) {
    console.log("--- Running Automated RegExp Validation Tests in Node.js ---\n");

    const testCases = [
        {
            title: "Test Case 1: All Valid Inputs",
            input: { name: "Aaditya Gupta", email: "aadi@gmail.com", phone: "9876543210", password: "Secret@123Password" },
            expected: true
        },
        {
            title: "Test Case 2: Invalid Name (Contains Digits)",
            input: { name: "John123 Doe", email: "john@example.com", phone: "9876543210", password: "Pass#1234" },
            expected: false
        },
        {
            title: "Test Case 3: Invalid Email Format",
            input: { name: "John Doe", email: "john.example.com", phone: "9876543210", password: "Pass#1234" },
            expected: false
        },
        {
            title: "Test Case 4: Invalid Phone (9 digits)",
            input: { name: "John Doe", email: "john@example.com", phone: "987654321", password: "Pass#1234" },
            expected: false
        },
        {
            title: "Test Case 5: Invalid Password (Missing Special Char)",
            input: { name: "John Doe", email: "john@example.com", phone: "9876543210", password: "Password123" },
            expected: false
        },
        {
            title: "Test Case 6: Invalid Password (Missing Uppercase)",
            input: { name: "John Doe", email: "john@example.com", phone: "9876543210", password: "secret@123" },
            expected: false
        }
    ];

    testCases.forEach((tc, idx) => {
        const result = StudentFormValidator.validateForm(tc.input);
        const passed = result.isAllValid === tc.expected;
        console.log(`[${passed ? "PASS" : "FAIL"}] ${tc.title}`);
        console.log(`   Input:    ${JSON.stringify(tc.input)}`);
        console.log(`   Valid:    ${result.isAllValid}`);
        if (!result.isAllValid) {
            const activeErrors = Object.entries(result.errors).filter(([, msg]) => msg !== "");
            console.log(`   Errors:   ${JSON.stringify(Object.fromEntries(activeErrors))}`);
        }
        console.log("");
    });
}

// Export for module systems
if (typeof module !== "undefined" && module.exports) {
    module.exports = { StudentFormValidator, REGEX_PATTERNS };
}
