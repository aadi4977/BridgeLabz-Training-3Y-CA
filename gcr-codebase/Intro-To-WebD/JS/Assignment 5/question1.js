/**
 * ASSIGNMENT 5 - JAVASCRIPT FUNCTIONS & PROTOTYPES
 * Question 1: Callback Functions & Flow Control
 * 
 * Objective:
 * Write a function greetUser(name, callback) that prints "Hello <name>" and then
 * executes a callback function showEndMessage() which prints "Welcome to the course!".
 * Demonstrate callback flow clearly.
 * 
 * Environment: Node.js & Browser Console
 */

"use strict";

console.log("====================================================================");
console.log("       ASSIGNMENT 5 - Q1: CALLBACK FUNCTIONS & FLOW CONTROL          ");
console.log("====================================================================\n");

/**
 * Callback function to display completion message.
 */
function showEndMessage() {
    console.log("Welcome to the course!");
}

/**
 * Greets a user and then executes the supplied callback function.
 * 
 * @param {string} name - The name of the user to greet
 * @param {Function} callback - Function to execute after greeting
 * @throws {TypeError} If callback is not a function
 */
function greetUser(name, callback) {
    console.log(`[Step 1] Executing greetUser()...`);
    
    // Defensive input check for name
    const validName = (typeof name === "string" && name.trim().length > 0) 
        ? name.trim() 
        : "Guest";
        
    console.log(`Hello ${validName}`);

    console.log(`[Step 2] Preparing to execute callback function...`);

    // Verify callback is indeed a function
    if (typeof callback !== "function") {
        throw new TypeError(`Expected callback to be a function, but received ${typeof callback}`);
    }

    // Execute callback
    callback();

    console.log(`[Step 3] greetUser() completed successfully.\n`);
}

// ====================================================================
// Demonstration and Execution Flow
// ====================================================================

console.log("--- Test Case 1: Standard Execution with Named Callback ---");
greetUser("Aaditya", showEndMessage);

console.log("--- Test Case 2: Execution with Anonymous Callback ---");
greetUser("Alice", () => {
    console.log("Your onboarding modules are now unlocked!");
});

console.log("--- Test Case 3: Error Handling Demonstration ---");
try {
    greetUser("Bob", "notAFunction");
} catch (error) {
    console.error(`Caught expected error: ${error.message}\n`);
}

// Export for module systems (Node.js) if required
if (typeof module !== "undefined" && module.exports) {
    module.exports = { greetUser, showEndMessage };
}
