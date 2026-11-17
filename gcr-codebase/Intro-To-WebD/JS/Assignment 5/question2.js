/**
 * ASSIGNMENT 5 - JAVASCRIPT FUNCTIONS & PROTOTYPES
 * Question 2: Higher-Order Functions & Array Transformation
 * 
 * Objective:
 * Create a function applyOperation(numbers, operation) that takes an array and a callback function.
 * Use it to:
 *   ● Double each number in [1,2,3,4]
 *   ● Square each number in [1,2,3,4]
 * 
 * Environment: Node.js & Browser Console
 */

"use strict";

console.log("====================================================================");
console.log("   ASSIGNMENT 5 - Q2: HIGHER-ORDER FUNCTION (applyOperation)        ");
console.log("====================================================================\n");

/**
 * Applies a callback transformation operation to every element in an array.
 * This is a pure function that does not mutate the source array.
 * 
 * @param {Array<number>} numbers - Input array of numbers
 * @param {Function} operation - Callback function applied to each element
 * @returns {Array<number>} A new array containing the transformed values
 * @throws {TypeError} If numbers is not an array or operation is not a function
 */
function applyOperation(numbers, operation) {
    if (!Array.isArray(numbers)) {
        throw new TypeError("First argument 'numbers' must be an Array.");
    }
    if (typeof operation !== "function") {
        throw new TypeError("Second argument 'operation' must be a Function.");
    }

    const result = [];
    for (let i = 0; i < numbers.length; i++) {
        // Pass the current element, index, and full array to the callback (mirroring Array.prototype.map)
        result.push(operation(numbers[i], i, numbers));
    }

    return result;
}

// ====================================================================
// Callback Operations Definition
// ====================================================================

/** Doubles a given number */
const double = (num) => num * 2;

/** Squares a given number */
const square = (num) => num * num;

/** Cubes a given number (additional demonstration) */
const cube = (num) => num ** 3;

// ====================================================================
// Demonstration
// ====================================================================

const originalNumbers = [1, 2, 3, 4];
console.log("Original Array:", originalNumbers);

// 1. Double each number in [1, 2, 3, 4]
const doubledNumbers = applyOperation(originalNumbers, double);
console.log("\n1. Doubled Array:  ", doubledNumbers);
console.log("   Expected Output: [2, 4, 6, 8]");

// 2. Square each number in [1, 2, 3, 4]
const squaredNumbers = applyOperation(originalNumbers, square);
console.log("\n2. Squared Array:  ", squaredNumbers);
console.log("   Expected Output: [1, 4, 9, 16]");

// 3. Additional demonstration with inline arrow function (Cube)
const cubedNumbers = applyOperation(originalNumbers, cube);
console.log("\n3. Cubed Array:    ", cubedNumbers);
console.log("   Expected Output: [1, 8, 27, 64]");

// Confirm purity (immutability of original array)
console.log("\nImmutability Check:");
console.log("Did original array change?", originalNumbers); // [1, 2, 3, 4]

// Export for module systems (Node.js) if required
if (typeof module !== "undefined" && module.exports) {
    module.exports = { applyOperation, double, square, cube };
}
