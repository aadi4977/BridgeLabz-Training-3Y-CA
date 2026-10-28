/**
 * Q8 – Strict Mode Showdown
 * 
 * Objective:
 * Demonstrate the fundamental architectural and syntactic constraints introduced
 * by ECMAScript Strict Mode ("use strict"). Compare behavior with and without
 * strict mode for duplicate parameters, undeclared global variables, and deleting
 * unqualified identifiers. Implement a clean, modern ES6 refactoring.
 * 
 * Given Code:
 * function demo(a, a) {
 *   total = 10;
 *   delete total;
 * }
 * demo(5, 10);
 * 
 * Tasks:
 * 1. Run this with and without "use strict".
 * 2. Record the errors and differences in behavior.
 * 3. Explain why strict mode makes these operations illegal.
 * 4. Show a correct version using ES6 rules.
 */

"use strict";

console.log("====================================================================");
console.log("                 Q8: STRICT MODE SHOWDOWN                           ");
console.log("====================================================================\n");

// ===========================================================================
// TASK 1 & 2: RUN WITH AND WITHOUT "use strict" & RECORD DIFFERENCES
// ===========================================================================
console.log("--- TASK 1 & 2: BEHAVIOR COMPARISON (NON-STRICT VS STRICT) ---");

// A. Running WITHOUT "use strict" (Sloppy Mode)
console.log("[TEST 1: Non-Strict Mode Execution]");
let nonStrictOutcome = "";
try {
    // We execute without "use strict" in an isolated function wrapper
    const nonStrictFn = new Function(`
        function demo(a, a) {
            total = 10;            // Implicitly creates global 'total'
            var deleteResult = delete total; // Deletes the unqualified global identifier
            return {
                paramA: a,
                globalTotalCreated: typeof total !== "undefined",
                deleteSucceeded: deleteResult
            };
        }
        return demo(5, 10);
    `);

    const result = nonStrictFn();
    nonStrictOutcome = `Execution SUCCEEDED without errors:
    - Shadowed parameter 'a' value: ${result.paramA} (second argument 10 overwrote first argument 5)
    - Undeclared 'total = 10' created a global property
    - 'delete total' returned ${result.deleteSucceeded} (silently removed property)`;
    console.log(nonStrictOutcome);

} catch (err) {
    console.log(`Non-strict failed unexpectedly: ${err.message}`);
}

console.log("\n[TEST 2: Strict Mode Violations Audit]");

// Violation 1: Duplicate parameter names
console.log("1. Duplicate Parameter Names: function demo(a, a)");
try {
    new Function(`
        "use strict";
        function demo(a, a) { return a; }
    `)();
} catch (err) {
    console.log(`   [CAUGHT ERROR] ${err.name}: ${err.message}`);
}

// Violation 2: Assigning to undeclared variable
console.log("2. Undeclared Variable Assignment: total = 10");
try {
    new Function(`
        "use strict";
        function demo(x, y) {
            total = 10;
        }
        demo(5, 10);
    `)();
} catch (err) {
    console.log(`   [CAUGHT ERROR] ${err.name}: ${err.message}`);
}

// Violation 3: Deleting an unqualified identifier
console.log("3. Deleting Unqualified Identifier: delete total");
try {
    new Function(`
        "use strict";
        var total = 10;
        delete total;
    `)();
} catch (err) {
    console.log(`   [CAUGHT ERROR] ${err.name}: ${err.message}`);
}


// ===========================================================================
// TASK 3: EXPLAIN WHY STRICT MODE MAKES THESE OPERATIONS ILLEGAL
// ===========================================================================
console.log("\n--- TASK 3: ARCHITECTURAL REASONS BEHIND THE RESTRICTIONS ---");

console.log(`
1. Prohibition of Duplicate Parameter Names (a, a):
   - In sloppy mode, the last parameter silently overwrites preceding parameters
     with the same name, rendering the earlier argument unreachable via its named identifier.
   - This causes subtle, hard-to-detect logic bugs in larger codebases.
   - Strict mode treats duplicate parameter names as an immediate compile-time SyntaxError.

2. Prohibition of Implicit Globals (total = 10):
   - In sloppy mode, assigning to a typo or undeclared variable creates an accidental property
     on the Global Object (window/globalThis).
   - This leads to memory leaks, namespace collision, and non-deterministic state changes.
   - Strict mode forces explicit declarations (const, let, var), throwing a ReferenceError.

3. Prohibition of Deleting Plain Identifiers (delete total):
   - The 'delete' operator is designed solely to remove properties from objects (e.g., delete obj.prop).
   - Attempting to delete a variable, function, or argument is nonsensical and interferes with
     JavaScript engine JIT compiler optimizations (such as hidden class shapes in V8).
   - Strict mode raises a SyntaxError to preserve compiler optimization invariants.
`);


// ===========================================================================
// TASK 4: CORRECT VERSION USING ES6 RULES
// ===========================================================================
console.log("--- TASK 4: MODERN ES6 REFACTORED IMPLEMENTATION ---");

/**
 * Modern, strict-compliant ES6 implementation.
 * - Distinct, descriptive parameter names (no duplicates).
 * - Block-scoped declarations (`const` / `let`).
 * - Encapsulated state management using proper object properties if deletion is needed.
 * 
 * @param {number} val1 - First parameter
 * @param {number} val2 - Second parameter
 * @returns {Object} Clean calculated summary
 */
function modernDemo(val1, val2) {
    // Explicit local declaration with const/let
    let total = val1 + val2;

    // If transient or cleanup properties are needed, manage them via an object:
    const calculationContext = {
        operandA: val1,
        operandB: val2,
        currentTotal: total,
        tempMetadata: "temporary calculation cache"
    };

    console.log(`  [Before Deletion] Context keys: ${Object.keys(calculationContext).join(", ")}`);
    
    // Legitimate property deletion in ES6
    delete calculationContext.tempMetadata;

    console.log(`  [After Deletion]  Context keys: ${Object.keys(calculationContext).join(", ")}`);
    
    return {
        inputs: [val1, val2],
        calculatedTotal: calculationContext.currentTotal
    };
}

const modernResult = modernDemo(5, 10);
console.log(`\nModern Demo Executed Successfully:`);
console.log(`- Inputs    : [${modernResult.inputs.join(", ")}]`);
console.log(`- Total Sum : ${modernResult.calculatedTotal}`);
console.log("===================================================================\n");
