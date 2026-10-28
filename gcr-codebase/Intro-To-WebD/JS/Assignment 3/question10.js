/**
 * Q10 – Nested Hoisting and Closures
 * 
 * Objective:
 * Uncover execution context lifecycles, nested variable shadowing, lexical scoping,
 * and closure mechanics. Compare classic function declarations against ES6 arrow functions,
 * and provide a complete call stack tracing and debugging guide.
 * 
 * Given Code:
 * function outer() {
 *   console.log(count);
 *   var count = 5;
 *   function inner() {
 *     console.log(count);
 *     var count = 10;
 *   }
 *   inner();
 * }
 * outer();
 * 
 * Tasks:
 * 1. Predict and explain output.
 * 2. Show how hoisting creates separate memory contexts.
 * 3. Convert the inner function to an arrow and note behavior changes.
 * 4. Add a debug session and explain the call stack flow.
 */

"use strict";

console.log("====================================================================");
console.log("            Q10: NESTED HOISTING AND CLOSURES LAB                   ");
console.log("====================================================================\n");

// ===========================================================================
// TASK 1: PREDICT AND EXPLAIN OUTPUT
// ===========================================================================
console.log("--- TASK 1: ORIGINAL CODE EXECUTION & PREDICTION ---");

console.log("Prediction:");
console.log("1st log (inside outer) -> undefined");
console.log("2nd log (inside inner) -> undefined");
console.log("\nActual Execution Output:");

function originalOuter() {
    console.log("  [outer() execution] count is:", count);
    var count = 5;

    function inner() {
        console.log("  [inner() execution] count is:", count);
        var count = 10;
    }

    inner();
}

originalOuter();

console.log("\n[Why did both log 'undefined'?]:");
console.log("- In outer(): 'var count' is hoisted to the top of outer's context and initialized to undefined.");
console.log("- In inner(): Beginners often expect '5' due to closure. However, inner has its OWN 'var count = 10'.");
console.log("- Inner's local 'var count' is hoisted to the top of inner's context and initialized to undefined,");
console.log("  shadowing (masking) outer's 'count'. Hence, inner logs undefined before its assignment line!\n");


// ===========================================================================
// TASK 2: SHOW HOW HOISTING CREATES SEPARATE MEMORY CONTEXTS
// ===========================================================================
console.log("--- TASK 2: EXECUTION CONTEXTS & MEMORY ARCHITECTURE ---");

console.log(`
+---------------------------------------------------------------------------------+
| GLOBAL EXECUTION CONTEXT                                                        |
|   Memory Component: { originalOuter: <func> }                                   |
|   Code Component  : calls originalOuter()                                       |
+---------------------------------------------------------------------------------+
                                      | (Creates & pushes)
                                      v
+---------------------------------------------------------------------------------+
| OUTER() EXECUTION CONTEXT                                                       |
|   Memory Phase    : count = undefined, inner = <func>                           |
|   Execution Phase :                                                             |
|     1. console.log(count) -> reads local count (undefined)                      |
|     2. count = 5          -> updates local count to 5                           |
|     3. calls inner()                                                            |
|   Scope Chain     : [ outer Lexical Env ] -> [ Global Lexical Env ]             |
+---------------------------------------------------------------------------------+
                                      | (Creates & pushes)
                                      v
+---------------------------------------------------------------------------------+
| INNER() EXECUTION CONTEXT                                                       |
|   Memory Phase    : count = undefined  (Local Variable Environment!)            |
|   Execution Phase :                                                             |
|     1. console.log(count) -> resolves immediately from inner's local memory     |
|                              (finds count = undefined; stops scope lookup!)     |
|     2. count = 10         -> updates inner local count to 10                    |
|   Scope Chain     : [ inner Env ] -> [ outer Env ] -> [ Global Env ]            |
+---------------------------------------------------------------------------------+
`);


// ===========================================================================
// TASK 3: CONVERT INNER FUNCTION TO AN ARROW FUNCTION & OBSERVE
// ===========================================================================
console.log("--- TASK 3: ARROW FUNCTION CONVERSION & BEHAVIORAL CHANGES ---");

// Case 3A: Arrow function with its own 'var count'
console.log("Case 3A: Arrow function with local 'var count = 10'");
function arrowDemoCaseA() {
    var count = 5;
    const arrowInner = () => {
        // 'var' is still function-scoped inside arrow functions
        console.log("  [Case 3A] arrow count:", count);
        var count = 10;
    };
    arrowInner();
}
arrowDemoCaseA();
console.log("  -> Result: Still 'undefined' because 'var' hoists to the arrow function body.\n");

// Case 3B: Arrow function with local 'let count = 10'
console.log("Case 3B: Arrow function with local 'let count = 10' (Temporal Dead Zone)");
function arrowDemoCaseB() {
    var count = 5;
    const arrowInner = () => {
        try {
            eval(`console.log(count); let count = 10;`);
        } catch (e) {
            console.log(`  [Case 3B TDZ Triggered]: ${e.name} - ${e.message}`);
        }
    };
    arrowInner();
}
arrowDemoCaseB();
console.log("  -> Result: ReferenceError due to block-scoped TDZ (shadowing outer count).\n");

// Case 3C: Arrow function WITHOUT local redeclaration (True Closure Access)
console.log("Case 3C: Arrow function accessing outer's variable (True Closure)");
function arrowDemoCaseC() {
    var count = 5;
    const arrowInner = () => {
        // No local 'count' declared! Identifier resolved via lexical closure
        console.log("  [Case 3C Closure Access] outer count:", count);
    };
    arrowInner();
}
arrowDemoCaseC();
console.log("  -> Result: Successfully accessed outer count (5) via lexical closure!\n");


// ===========================================================================
// TASK 4: DEBUG SESSION & CALL STACK FLOW
// ===========================================================================
console.log("--- TASK 4: CALL STACK LIFECYCLE & DEBUGGING SESSION ---");

function debuggableOuter() {
    const contextName = "outerExecutionContext";
    let step = 1;

    function debuggableInner() {
        const innerContextName = "innerExecutionContext";
        step++;

        // Place breakpoint here in VS Code
        // debugger;

        console.log(`  [Call Stack Peak] Active Context: ${innerContextName}, Step: ${step}`);
    }

    debuggableInner();
}

debuggableOuter();

console.log("\n================ CALL STACK LIFECYCLE (TASK 4) ================");
console.log("Step 1: GEC (Global Execution Context) pushed to Call Stack.");
console.log("        Stack: [ GEC ]");
console.log("Step 2: outer() invoked. outer Context pushed.");
console.log("        Stack: [ GEC -> outer() ]");
console.log("Step 3: inner() invoked. inner Context pushed.");
console.log("        Stack: [ GEC -> outer() -> inner() ]");
console.log("Step 4: inner() finishes execution and returns.");
console.log("        Stack: [ GEC -> outer() ] (inner popped)");
console.log("Step 5: outer() finishes execution and returns.");
console.log("        Stack: [ GEC ] (outer popped)");
console.log("Step 6: Global execution completes. Call stack empty.");
console.log("===============================================================\n");
