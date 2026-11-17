/**
 * ASSIGNMENT 5 - JAVASCRIPT FUNCTIONS & PROTOTYPES
 * Question 3: Arrow Functions vs Regular Functions ('this' Binding)
 * 
 * Objective:
 * Create an object user with:
 *   ● a property name
 *   ● a method showName written as an arrow function
 * Log the output and explain why this.name is undefined.
 * Then fix it by using a normal function.
 * 
 * Environment: Node.js & Browser Console
 */

"use strict";

console.log("====================================================================");
console.log("    ASSIGNMENT 5 - Q3: 'this' BINDING IN ARROW VS NORMAL FUNCTIONS   ");
console.log("====================================================================\n");

// ====================================================================
// Step 1: Buggy User Object (Arrow Function Method)
// ====================================================================

const buggyUser = {
    name: "Aaditya",
    showName: () => {
        // In an arrow function, `this` is lexically scoped to the outer scope
        console.log(`[Buggy Arrow Function] Value of this.name: ${this?.name}`);
        return this?.name;
    }
};

console.log("--- Executing Buggy User Object ---");
const buggyResult = buggyUser.showName();
console.log("Returned result:", buggyResult); // undefined

// ====================================================================
// Step 2: In-Depth Technical Explanation
// ====================================================================

console.log("\n====================================================================");
console.log("                 WHY IS 'this.name' UNDEFINED?                      ");
console.log("====================================================================");
console.log(`
1. Lexical 'this' in Arrow Functions:
   - Arrow functions DO NOT have their own 'this' binding.
   - Unlike regular functions, an arrow function captures the 'this' value of the
     enclosing lexical execution context at the time the function is created.

2. Object Literals Do NOT Create a New Execution Scope:
   - Defining an object using curly braces { ... } creates a data structure, NOT
     a new lexical execution context/scope. Only functions, modules, and blocks create scope.
   - Therefore, the arrow function is enclosed directly by the outer scope
     (Node.js module scope or global Window scope in browsers).

3. The Enclosing 'this':
   - In Node.js (CommonJS modules), the top-level 'this' points to 'module.exports' (an empty object {}).
   - In standard browser scripts, 'this' points to the 'window' object.
   - In both cases, this.name does not exist on that outer object, resulting in 'undefined'.
`);

// ====================================================================
// Step 3: Fixing with a Normal Function (Regular Function Expression)
// ====================================================================

console.log("====================================================================");
console.log("                 FIXED IMPLEMENTATION (NORMAL FUNCTION)              ");
console.log("====================================================================\n");

const fixedUser = {
    name: "Aaditya",
    showName: function () {
        // In a regular function, 'this' is dynamically bound to the invoking object at call-time
        console.log(`[Fixed Normal Function] Value of this.name: ${this.name}`);
        return this.name;
    }
};

console.log("--- Executing Fixed User (Regular Function) ---");
const fixedResult = fixedUser.showName();
console.log("Returned result:", fixedResult); // "Aaditya"

// ====================================================================
// Step 4: Alternative Modern ES6 Method Shorthand Fix
// ====================================================================

const fixedUserShorthand = {
    name: "Aaditya",
    // ES6 concise method syntax binds 'this' dynamically to the instance
    showName() {
        console.log(`[ES6 Method Shorthand] Value of this.name: ${this.name}`);
        return this.name;
    }
};

console.log("\n--- Executing Fixed User (ES6 Method Shorthand) ---");
const shorthandResult = fixedUserShorthand.showName();
console.log("Returned result:", shorthandResult); // "Aaditya"

// Export for module systems (Node.js) if required
if (typeof module !== "undefined" && module.exports) {
    module.exports = { buggyUser, fixedUser, fixedUserShorthand };
}
