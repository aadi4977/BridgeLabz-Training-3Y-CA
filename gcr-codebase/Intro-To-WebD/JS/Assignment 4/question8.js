/**
 * Q8: Dynamic Object Updater
 * 
 * Objective:
 * Initialize an object: user = { name: "John", email: "john@mail.com", age: 21 }
 * Build an interactive form that allows editing these values.
 * On form submit, update the user object properties in real time.
 * Render and display the updated object state below the form using the DOM.
 * 
 * Environment: Node.js (state mutation simulation) & Browser (live interactive DOM binding)
 */

"use strict";

console.log("====================================================================");
console.log("              Q8: DYNAMIC OBJECT UPDATER                            ");
console.log("====================================================================\n");

/**
 * 1. Target user object as defined in the assignment specifications.
 */
let user = {
    name: "John",
    email: "john@mail.com",
    age: 21
};

/**
 * Audit history tracking real-time state mutations.
 */
const updateHistory = [];

/**
 * Updates the user object with new data and logs the mutation.
 * @param {{name?: string, email?: string, age?: number|string}} newValues 
 * @returns {Object} The mutated user object
 */
function updateUserData(newValues) {
    const previousSnapshot = { ...user };

    if (newValues.name !== undefined && String(newValues.name).trim() !== "") {
        user.name = String(newValues.name).trim();
    }
    if (newValues.email !== undefined && String(newValues.email).trim() !== "") {
        user.email = String(newValues.email).trim();
    }
    if (newValues.age !== undefined && newValues.age !== "") {
        const parsedAge = parseInt(newValues.age, 10);
        if (!isNaN(parsedAge) && parsedAge > 0) {
            user.age = parsedAge;
        }
    }

    const mutationRecord = {
        timestamp: new Date().toLocaleTimeString(),
        previous: previousSnapshot,
        updated: { ...user }
    };
    updateHistory.push(mutationRecord);

    console.log(`[Object Updated at ${mutationRecord.timestamp}]`, user);
    return user;
}

// -----------------------------------------------------------------------------
// Browser DOM Integration
// -----------------------------------------------------------------------------
function setupDynamicObjectUpdaterDOM() {
    if (typeof document === "undefined") return;

    const form = document.getElementById("userUpdaterForm");
    const nameInput = document.getElementById("edit-user-name");
    const emailInput = document.getElementById("edit-user-email");
    const ageInput = document.getElementById("edit-user-age");
    const displayContainer = document.getElementById("updated-user-display");

    // Function to synchronize DOM display with current user object
    function renderUserDisplay() {
        if (!displayContainer) return;
        displayContainer.innerHTML = `
            <div style="background: #1e293b; border-left: 4px solid #38bdf8; border-radius: 6px; padding: 15px; margin-top: 15px; color: #f8fafc;">
                <div style="font-weight: 600; color: #38bdf8; margin-bottom: 8px;">
                    Current User Object (Live in Memory)
                </div>
                <div style="display: grid; grid-template-columns: 80px 1fr; gap: 6px; font-family: monospace; font-size: 14px;">
                    <span style="color: #94a3b8;">name:</span> <strong style="color: #34d399;">"${user.name}"</strong>
                    <span style="color: #94a3b8;">email:</span> <strong style="color: #38bdf8;">"${user.email}"</strong>
                    <span style="color: #94a3b8;">age:</span> <strong style="color: #fbbf24;">${user.age}</strong>
                </div>
                <div style="margin-top: 10px; font-size: 12px; color: #64748b;">
                    Total mutations performed: ${updateHistory.length}
                </div>
            </div>
        `;
    }

    // Pre-populate input fields with existing user object state
    if (nameInput) nameInput.value = user.name;
    if (emailInput) emailInput.value = user.email;
    if (ageInput) ageInput.value = user.age;

    // Initial render of user object details
    renderUserDisplay();

    // Attach form submit handler for real-time updating
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const updatedFields = {
                name: nameInput ? nameInput.value : user.name,
                email: emailInput ? emailInput.value : user.email,
                age: ageInput ? ageInput.value : user.age
            };

            updateUserData(updatedFields);
            renderUserDisplay();
        });
    }
}

if (typeof window !== "undefined" && typeof document !== "undefined") {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", setupDynamicObjectUpdaterDOM);
    } else {
        setupDynamicObjectUpdaterDOM();
    }
}

// -----------------------------------------------------------------------------
// Node.js Automated Demonstration
// -----------------------------------------------------------------------------
if (typeof process !== "undefined" && process.versions && process.versions.node) {
    console.log("--- 1. Initial State of user Object ---");
    console.log(JSON.stringify(user, null, 2));

    console.log("\n--- 2. Simulating First Form Submission (Edit Name and Age) ---");
    updateUserData({ name: "Johnathan Doe", age: 25 });
    console.log("Resulting Object in Memory:", user);

    console.log("\n--- 3. Simulating Second Form Submission (Edit Email) ---");
    updateUserData({ email: "jdoe.dev@techcorp.io" });
    console.log("Resulting Object in Memory:", user);

    console.log("\n--- 4. Final Mutation Audit Trail ---");
    updateHistory.forEach((record, idx) => {
        console.log(`Update #${idx + 1} (${record.timestamp}):`);
        console.log(`   From: ${JSON.stringify(record.previous)}`);
        console.log(`   To:   ${JSON.stringify(record.updated)}`);
    });
}

// Export for module systems
if (typeof module !== "undefined" && module.exports) {
    module.exports = { user, updateUserData, updateHistory };
}
