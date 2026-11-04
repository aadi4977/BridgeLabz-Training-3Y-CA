/**
 * Q7: Login Form Validation using RegExp
 * 
 * Objective:
 * Create a login form validation module using regular expressions.
 * Validation Rules:
 *   - Username: At least 5 characters
 *   - Password: At least 8 characters, and must include:
 *       1. Number (0-9)
 *       2. Uppercase letter (A-Z)
 *       3. Lowercase letter (a-z)
 *       4. Special character (!@#$%^&* etc.)
 * 
 * Feedback:
 *   - If validation passes -> Display success message.
 *   - If validation fails -> Display specific error messages indicating which constraints failed.
 * 
 * Environment: Node.js (automated unit tests) & Browser (interactive form)
 */

"use strict";

console.log("====================================================================");
console.log("         Q7: LOGIN FORM VALIDATION USING REGEXP                     ");
console.log("====================================================================\n");

/**
 * Regular expressions for login validation.
 */
const LOGIN_RULES = {
    usernameMinLength: /^.{5,}$/,
    passwordMinLength: /^.{8,}$/,
    hasUppercase: /[A-Z]/,
    hasLowercase: /[a-z]/,
    hasNumber: /\d/,
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>_\-+=\\/\[\]~`]/
};

/**
 * Validates login credentials and produces specific error diagnostics.
 * @param {string} username 
 * @param {string} password 
 * @returns {{isValid: boolean, successMessage?: string, errors: {username: string[], password: string[]}}}
 */
function validateLoginForm(username, password) {
    const rawUsername = String(username ?? "").trim();
    const rawPassword = String(password ?? "");

    const usernameErrors = [];
    const passwordErrors = [];

    // 1. Username Validation
    if (!rawUsername) {
        usernameErrors.push("Username is required.");
    } else if (!LOGIN_RULES.usernameMinLength.test(rawUsername)) {
        usernameErrors.push("Username must be at least 5 characters long.");
    }

    // 2. Password Validation
    if (!rawPassword) {
        passwordErrors.push("Password is required.");
    } else {
        if (!LOGIN_RULES.passwordMinLength.test(rawPassword)) {
            passwordErrors.push("Password must be at least 8 characters long.");
        }
        if (!LOGIN_RULES.hasUppercase.test(rawPassword)) {
            passwordErrors.push("Password must include at least one uppercase letter (A-Z).");
        }
        if (!LOGIN_RULES.hasLowercase.test(rawPassword)) {
            passwordErrors.push("Password must include at least one lowercase letter (a-z).");
        }
        if (!LOGIN_RULES.hasNumber.test(rawPassword)) {
            passwordErrors.push("Password must include at least one numeric digit (0-9).");
        }
        if (!LOGIN_RULES.hasSpecialChar.test(rawPassword)) {
            passwordErrors.push("Password must include at least one special character (!@#$%^&*...).");
        }
    }

    const isValid = usernameErrors.length === 0 && passwordErrors.length === 0;

    return {
        isValid,
        successMessage: isValid ? `Login successful! Welcome back, ${rawUsername}.` : undefined,
        errors: {
            username: usernameErrors,
            password: passwordErrors
        }
    };
}

// -----------------------------------------------------------------------------
// Browser DOM Integration
// -----------------------------------------------------------------------------
function setupLoginValidationDOM() {
    if (typeof document === "undefined") return;

    const form = document.getElementById("loginForm");
    if (!form) return;

    const usernameInput = document.getElementById("login-username");
    const passwordInput = document.getElementById("login-password");
    const feedbackBox = document.getElementById("login-feedback");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = usernameInput ? usernameInput.value : "";
        const password = passwordInput ? passwordInput.value : "";

        const result = validateLoginForm(username, password);

        if (!feedbackBox) return;

        if (result.isValid) {
            feedbackBox.style.display = "block";
            feedbackBox.style.backgroundColor = "#064e3b";
            feedbackBox.style.border = "1px solid #10b981";
            feedbackBox.style.color = "#a7f3d0";
            feedbackBox.innerHTML = `
                <div style="font-weight: 600; font-size: 15px;">✓ ${result.successMessage}</div>
            `;
            if (usernameInput) usernameInput.style.borderColor = "#10b981";
            if (passwordInput) passwordInput.style.borderColor = "#10b981";
            console.log("[Login Successful]", { username });
        } else {
            feedbackBox.style.display = "block";
            feedbackBox.style.backgroundColor = "#450a0a";
            feedbackBox.style.border = "1px solid #ef4444";
            feedbackBox.style.color = "#fecaca";

            const allErrors = [
                ...result.errors.username.map(e => `<li>${e}</li>`),
                ...result.errors.password.map(e => `<li>${e}</li>`)
            ].join("");

            feedbackBox.innerHTML = `
                <div style="font-weight: 600; margin-bottom: 6px;">❌ Validation Errors:</div>
                <ul style="margin: 0; padding-left: 20px;">${allErrors}</ul>
            `;

            if (usernameInput) {
                usernameInput.style.borderColor = result.errors.username.length ? "#ef4444" : "#10b981";
            }
            if (passwordInput) {
                passwordInput.style.borderColor = result.errors.password.length ? "#ef4444" : "#10b981";
            }
            console.warn("[Login Failed]", result.errors);
        }
    });
}

if (typeof window !== "undefined" && typeof document !== "undefined") {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", setupLoginValidationDOM);
    } else {
        setupLoginValidationDOM();
    }
}

// -----------------------------------------------------------------------------
// Node.js Automated Demonstration
// -----------------------------------------------------------------------------
if (typeof process !== "undefined" && process.versions && process.versions.node) {
    console.log("--- Executing Automated Login Validation Test Matrix ---\n");

    const testScenarios = [
        {
            title: "Case 1: Fully Valid Login Credentials",
            user: "superCoder",
            pass: "StrongP@ssw0rd",
            expected: true
        },
        {
            title: "Case 2: Short Username (< 5 chars)",
            user: "aadi",
            pass: "StrongP@ssw0rd",
            expected: false
        },
        {
            title: "Case 3: Password Missing Uppercase Letter",
            user: "validUser",
            pass: "weakp@ssw0rd1",
            expected: false
        },
        {
            title: "Case 4: Password Missing Special Character",
            user: "validUser",
            pass: "WeakPassword123",
            expected: false
        },
        {
            title: "Case 5: Password Under 8 Characters",
            user: "validUser",
            pass: "P@ss1",
            expected: false
        },
        {
            title: "Case 6: Empty Fields",
            user: "",
            pass: "",
            expected: false
        }
    ];

    testScenarios.forEach((sc, i) => {
        const res = validateLoginForm(sc.user, sc.pass);
        const passedTest = res.isValid === sc.expected;
        console.log(`[${passedTest ? "PASS" : "FAIL"}] ${sc.title}`);
        console.log(`   Username: "${sc.user}", Password: "${sc.pass}"`);
        if (res.isValid) {
            console.log(`   Message:  ${res.successMessage}`);
        } else {
            const errs = [...res.errors.username, ...res.errors.password];
            console.log(`   Errors:   ${errs.join(" | ")}`);
        }
        console.log("");
    });
}

// Export for module systems
if (typeof module !== "undefined" && module.exports) {
    module.exports = { validateLoginForm, LOGIN_RULES };
}
