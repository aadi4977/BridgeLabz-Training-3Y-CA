/**
 * ASSIGNMENT 5 - JAVASCRIPT FUNCTIONS & PROTOTYPES
 * Question 7: Closures & Factory Functions
 * 
 * Objective:
 * Write a function makeMultiplier(multiplier) that returns another function to
 * multiply any number by that multiplier.
 * 
 * Example:
 *   const triple = makeMultiplier(3);
 *   console.log(triple(5)); // 15
 * 
 * Explain how closure works in this example.
 * 
 * Environment: Node.js & Browser Console
 */

"use strict";

console.log("====================================================================");
console.log("             ASSIGNMENT 5 - Q7: CLOSURES (makeMultiplier)            ");
console.log("====================================================================\n");

/**
 * Higher-order factory function creating multiplier functions via closure.
 * 
 * @param {number} multiplier - The multiplier factor to remember in closure
 * @returns {function(number): number} A new function that multiplies its argument by multiplier
 */
function makeMultiplier(multiplier) {
    if (typeof multiplier !== "number" || isNaN(multiplier)) {
        throw new TypeError("Argument 'multiplier' must be a valid number.");
    }

    // The inner function closes over (retains access to) the 'multiplier' variable
    return function multiply(number) {
        if (typeof number !== "number" || isNaN(number)) {
            throw new TypeError("Argument 'number' must be a valid number.");
        }
        return number * multiplier;
    };
}

// ====================================================================
// Demonstration (From Problem Specification)
// ====================================================================

console.log("--- Problem Specification Example ---");
const triple = makeMultiplier(3);
const resultTriple5 = triple(5);
console.log(`const triple = makeMultiplier(3);`);
console.log(`triple(5) => ${resultTriple5}`); // 15

// Additional practical examples
console.log("\n--- Additional Multiplier Examples ---");
const double = makeMultiplier(2);
console.log(`double(10)     => ${double(10)}`);     // 20
console.log(`double(25)     => ${double(25)}`);     // 50

const tenX = makeMultiplier(10);
console.log(`tenX(7)        => ${tenX(7)}`);        // 70

const half = makeMultiplier(0.5);
console.log(`half(100)      => ${half(100)}`);      // 50

// ====================================================================
// Detailed Explanation: How Closure Works in this Example
// ====================================================================

console.log("\n====================================================================");
console.log("                  HOW CLOSURE WORKS IN THIS EXAMPLE                 ");
console.log("====================================================================\n");

console.log(`
1. What is a Closure?
   A closure is the combination of a function bundled together with references
   to its surrounding state (its lexical environment). In JavaScript, closures
   give an inner function access to an outer function's scope even after the
   outer function has finished executing.

2. Step-by-Step Lifecycle Analysis:

   Step A: Invocation of makeMultiplier(3)
   - makeMultiplier(3) is pushed onto the Call Stack.
   - An execution context is created with a Lexical Environment containing:
       Environment Record: { multiplier: 3 }
   - The inner function 'multiply' is created. JavaScript gives this function
     an internal [[Environment]] slot that points to makeMultiplier's Lexical Environment.
   - makeMultiplier returns the function reference to 'triple' and finishes executing.
   - makeMultiplier's execution context is POPPED off the Call Stack.

   Step B: Preservation in Memory (Heap)
   - Normally, local variables are destroyed when a function finishes.
   - HOWEVER, because the returned 'triple' function still holds a reference
     in its [[Environment]] slot to { multiplier: 3 }, the Garbage Collector
     cannot reclaim that memory.
   - This enclosed variable environment is the CLOSURE.

   Step C: Invocation of triple(5)
   - triple(5) is pushed onto the Call Stack.
   - It searches for 'multiplier' in its local scope: not found.
   - It follows the Scope Chain to its [[Environment]] (Closure scope):
     found 'multiplier = 3'!
   - It multiplies 5 * 3 = 15 and returns the result.

3. Visual Memory Representation:
   ┌────────────────────────────────────────────────────────┐
   │ Global Scope:                                          │
   │   const triple ──────────────────┐                     │
   └──────────────────────────────────┼─────────────────────┘
                                      │
                                      ▼
                        ┌───────────────────────────┐
                        │ Function: multiply(number)│
                        │   [[Environment]] ────────┼───┐
                        └───────────────────────────┘   │
                                                        ▼
                                       ┌─────────────────────────────┐
                                       │ Closure (makeMultiplier):   │
                                       │   multiplier: 3             │
                                       └─────────────────────────────┘
`);

// Export for module systems (Node.js) if required
if (typeof module !== "undefined" && module.exports) {
    module.exports = { makeMultiplier, triple, double, tenX };
}
