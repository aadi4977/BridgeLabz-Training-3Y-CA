/**
 * Q4 – Debugging Mystery
 * 
 * Objective:
 * Analyze, reproduce, and resolve a strict mode scoping error caused by an
 * undeclared variable, explain JavaScript scope resolution mechanisms,
 * and provide a guide for inspecting watch variables and call stacks in VS Code.
 * 
 * Given Code:
 * "use strict";
 * function showMessage() {
 *   greeting = "Welcome"; // undeclared
 *   console.log(greeting);
 * }
 * showMessage();
 * 
 * Tasks:
 * 1. Identify why this throws an error under strict mode.
 * 2. Fix it and explain how scope declaration rules changed behavior.
 * 3. Add a watch variable and observe the call stack in VS Code's debugger.
 */

"use strict";

console.log("====================================================================");
console.log("               Q4: DEBUGGING MYSTERY & STRICT MODE                  ");
console.log("====================================================================\n");

// ===========================================================================
// TASK 1: IDENTIFY WHY THIS THROWS AN ERROR UNDER STRICT MODE
// ===========================================================================
console.log("--- TASK 1: REPRODUCING THE STRICT MODE ERROR ---");

function faultyShowMessage() {
    // Under "use strict", assignment to an undeclared variable fails
    greetingBuggy = "Welcome"; // Undeclared variable assignment
    console.log(greetingBuggy);
}

try {
    faultyShowMessage();
} catch (err) {
    console.log(`[CAUGHT ERROR] Type: ${err.name}`);
    console.log(`[MESSAGE]      : ${err.message}`);
    console.log(`[EXPLANATION]  : In non-strict ("sloppy") mode, assigning to an undeclared`);
    console.log(`                 identifier (greeting = "Welcome") creates an implicit global`);
    console.log(`                 property (global.greeting or window.greeting).`);
    console.log(`                 In "use strict", implicit globals are forbidden. JavaScript`);
    console.log(`                 enforces strict lexical binding, throwing a ReferenceError.\n`);
}

// ===========================================================================
// TASK 2: FIX IT AND EXPLAIN SCOPE DECLARATION RULES
// ===========================================================================
console.log("--- TASK 2: FIXED IMPLEMENTATION & SCOPE ANALYSIS ---");

/**
 * Fixed function using proper ES6 `const` or `let` declaration.
 * This binds `greeting` to the local block/function scope of `fixedShowMessage()`.
 */
function fixedShowMessage() {
    const greeting = "Welcome"; // Properly scoped with ES6 'const'
    console.log(`[INSIDE FUNCTION] greeting: "${greeting}"`);
    return greeting;
}

const result = fixedShowMessage();
console.log(`[FUNCTION RETURN] Call succeeded with output: "${result}"`);

// Verify that 'greeting' did not leak to global scope
try {
    // In strict mode, checking an undeclared variable outside throws ReferenceError
    console.log(typeof greeting === "undefined" ? "Verified: 'greeting' is isolated inside function scope!" : greeting);
} catch (e) {
    console.log(`Verified: 'greeting' cannot be accessed outside function scope (${e.message}).`);
}

console.log("\n[HOW SCOPE DECLARATION RULES CHANGED BEHAVIOR]:");
console.log("1. Undeclared (Original):");
console.log("   - JS engine searched local scope -> not found.");
console.log("   - Traversed up the scope chain to Global Environment Record.");
console.log("   - In non-strict mode: silently created 'global.greeting'.");
console.log("   - In strict mode: ReferenceError is immediately thrown at runtime.");
console.log("2. Declared with `const` or `let` (Fixed):");
console.log("   - Identifier is registered in the Lexical Environment of fixedShowMessage().");
console.log("   - Memory is properly allocated and confined strictly to this execution context.");
console.log("   - Garbage collected automatically once execution finishes; zero global leakage.\n");

// ===========================================================================
// TASK 3: VS CODE DEBUGGER & CALL STACK OBSERVATION GUIDE
// ===========================================================================
console.log("--- TASK 3: WATCH VARIABLES AND CALL STACK WALKTHROUGH ---");

function debugDemonstration() {
    const stage = "Initialization";
    let stepCount = 1;

    function innerWorker() {
        const localStatus = "Processing in innerWorker";
        stepCount++;

        // Debug hook for developer observation
        // debugger; // Place breakpoint here

        console.log(`[innerWorker Active] stage: ${stage}, step: ${stepCount}, status: ${localStatus}`);
    }

    innerWorker();
}

debugDemonstration();

console.log("\n================ VS CODE DEBUGGER STEP-BY-STEP ================");
console.log("1. Set Breakpoint:");
console.log("   - Open 'question4.js' in VS Code.");
console.log("   - Click the red dot next to line 95 (inside innerWorker).");
console.log("2. Start Debugging:");
console.log("   - Press F5 (select Node.js environment).");
console.log("3. Observe CALL STACK Window (Bottom-Left Panel):");
console.log("   Top of Stack -> innerWorker          (Local execution context)");
console.log("                -> debugDemonstration   (Enclosing function context)");
console.log("   Bottom       -> (anonymous function) (Global script execution)");
console.log("4. Add WATCH Variables (Top-Left Panel -> '+' icon):");
console.log("   - `greeting`        -> Result: ReferenceError / not available");
console.log("   - `stepCount`       -> Result: 2");
console.log("   - `localStatus`     -> Result: 'Processing in innerWorker'");
console.log("   - `this`            -> Result: undefined (in strict mode)");
console.log("===============================================================\n");
