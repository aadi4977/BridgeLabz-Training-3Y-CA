/**
 * Q6 – Pyramid Pattern Generator
 * 
 * Objective:
 * Implement a star pyramid pattern generator, analyze the behavioral differences
 * between `let` and `var` in nested loops, trace variable re-use and scoping issues,
 * parameterize the outer loop limit with default values (default = 5), and enforce
 * "use strict" to prevent undeclared loop counter leaks.
 * 
 * Target Pattern:
 * *
 * * *
 * * * *
 * * * * *
 * 
 * Tasks:
 * 1. Replace let with var and observe changes in output.
 * 2. Debug step-by-step to track variable re-use.
 * 3. Add an outer loop limit controlled by user input (default = 5).
 * 4. Use "use strict" to catch undeclared loop variables.
 */

"use strict";

console.log("====================================================================");
console.log("             Q6: PYRAMID PATTERN GENERATOR & SCOPING                ");
console.log("====================================================================\n");

// ===========================================================================
// TASK 3: OUTER LOOP LIMIT CONTROLLED BY USER INPUT (DEFAULT = 5)
// ===========================================================================
console.log("--- TASK 3: PYRAMID GENERATION (WITH DEFAULT PARAMETER = 5) ---");

/**
 * Generates and prints a pyramid of asterisks up to a specified limit.
 * 
 * @param {number} [limit=5] - Height of the pyramid, defaults to 5.
 */
function generatePyramid(limit = 5) {
    const numRows = Number(limit);
    if (Number.isNaN(numRows) || numRows <= 0) {
        console.error(`Invalid limit provided: "${limit}". Must be a positive integer.`);
        return;
    }

    console.log(`Generating Pyramid of height: ${numRows}`);
    for (let i = 1; i <= numRows; i++) {
        let rowContent = "";
        for (let j = 1; j <= i; j++) {
            rowContent += "* ";
        }
        console.log(rowContent.trimEnd());
    }
}

// Generate default pyramid (height 5)
generatePyramid(5);

console.log("\nGenerating 4-row pyramid (matching PDF specification):");
generatePyramid(4);


// ===========================================================================
// TASK 1 & 2: REPLACE LET WITH VAR & DEBUG VARIABLE RE-USE
// ===========================================================================
console.log("\n--- TASK 1 & 2: 'let' VS 'var' & VARIABLE RE-USE TRAP ---");

console.log("A. Scope Leakage with 'var':");
function demonstrateVarLeakage() {
    for (var outerIndex = 1; outerIndex <= 3; outerIndex++) {
        // inner loop with var
        for (var innerIndex = 1; innerIndex <= outerIndex; innerIndex++) {
            // inside loop
        }
    }
    // With var, loop counters leak outside the for loop blocks into the enclosing function!
    console.log(`   [Leakage Verified] outerIndex is accessible outside loop: ${outerIndex}`);
    console.log(`   [Leakage Verified] innerIndex is accessible outside loop: ${innerIndex}`);
}
demonstrateVarLeakage();

console.log("\nB. Variable Re-use Trap with 'var' (Bug Simulation):");
function demonstrateVarCollisionBug() {
    console.log("   Simulating nested loops sharing the same variable name 'i':");
    let executionCycles = 0;
    const maxSafetyCycles = 10;

    // Notice: If both loops use 'var i', the inner loop corrupts the outer loop's counter!
    for (var i = 1; i <= 3; i++) {
        let line = "";
        console.log(`   [Outer Loop Start] i = ${i}`);
        
        // Inner loop uses 'var i' - overwriting the same function-scoped variable 'i'
        for (var i = 1; i <= 2; i++) {
            line += "* ";
        }
        console.log(`   [Inner Loop Finished] Pattern: "${line.trim()}" | i is now mutated to: ${i}`);
        
        executionCycles++;
        if (executionCycles >= maxSafetyCycles) {
            console.log("   [TRAP DETECTED] Infinite loop prevented by safety break!");
            break;
        }
        // At this point, inner loop ended when i became 3.
        // Outer loop then executes i++, making i = 4, terminating outer loop after only 1 iteration!
    }
    console.log("   Observation: Outer loop was prematurely terminated because inner loop mutated 'i'!");
}
demonstrateVarCollisionBug();

console.log("\nC. Proper Block-Scoping with 'let' (No Collision):");
function demonstrateLetScoping() {
    console.log("   Executing nested loops using block-scoped 'let':");
    for (let i = 1; i <= 3; i++) {
        let line = "";
        // Shadowed block-scoped 'i' inside inner block
        for (let j = 1; j <= i; j++) {
            line += "* ";
        }
        console.log(`   Row ${i}: ${line.trim()}`);
    }
    // Accessing i or j here throws ReferenceError
    try {
        eval("console.log(i);");
    } catch (e) {
        console.log(`   [Verified Clean Scoping] Accessing 'i' outside throws: ${e.message}`);
    }
}
demonstrateLetScoping();


// ===========================================================================
// TASK 4: USE "use strict" TO CATCH UNDECLARED LOOP VARIABLES
// ===========================================================================
console.log("\n--- TASK 4: CATCHING UNDECLARED LOOP VARIABLES UNDER 'use strict' ---");

try {
    // Attempting to run a loop without let, const, or var under strict mode
    eval(`
        "use strict";
        for (undeclaredCounter = 0; undeclaredCounter < 3; undeclaredCounter++) {
            // This will fail immediately
        }
    `);
} catch (err) {
    console.log(`[STRICT MODE CAUGHT ERROR] ${err.name}: ${err.message}`);
    console.log("Explanation: In 'use strict', omitting 'let' or 'const' forbids automatic global variable creation.");
}

console.log("\n==================== KEY TAKEAWAYS ====================");
console.log("1. 'let' is block-scoped: Prevents variable leakage and collisions in nested loops.");
console.log("2. 'var' is function-scoped: Subject to unintended variable mutation when variable names repeat.");
console.log("3. 'use strict': Prevents undeclared loop counters from polluting the global window/global scope.");
console.log("========================================================\n");
