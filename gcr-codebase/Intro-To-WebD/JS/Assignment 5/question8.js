/**
 * ASSIGNMENT 5 - JAVASCRIPT FUNCTIONS & PROTOTYPES
 * Question 8: Custom Array Prototype Method (myMap)
 * 
 * Objective:
 * Add a custom prototype method myMap() to all arrays that behaves like the built-in map() function.
 * 
 * Example:
 *   [1,2,3].myMap(num => num * 2); // [2,4,6]
 * 
 * Environment: Node.js & Browser Console
 */

"use strict";

console.log("====================================================================");
console.log("          ASSIGNMENT 5 - Q8: CUSTOM PROTOTYPE METHOD (myMap)         ");
console.log("====================================================================\n");

// ====================================================================
// Implementation of Array.prototype.myMap
// ====================================================================

/**
 * Defines a custom `myMap` method on Array.prototype.
 * We use Object.defineProperty to ensure 'enumerable: false', preventing
 * this method from polluting standard `for...in` loops across all arrays.
 */
Object.defineProperty(Array.prototype, "myMap", {
    value: function (callback, thisArg) {
        // Step 1: Null / Undefined check for 'this'
        if (this == null) {
            throw new TypeError("Array.prototype.myMap called on null or undefined");
        }

        // Step 2: Validate callback function
        if (typeof callback !== "function") {
            throw new TypeError(`${callback} is not a function`);
        }

        // Step 3: Convert 'this' to an Object and calculate length (spec compliance)
        const originalArray = Object(this);
        const length = originalArray.length >>> 0; // Unsigned 32-bit integer conversion

        // Step 4: Create new array with identical length
        const mappedResult = new Array(length);

        // Step 5: Loop through elements
        for (let index = 0; index < length; index++) {
            // Respect sparse arrays (e.g., [1, , 3] where index 1 does not exist)
            if (index in originalArray) {
                // Call callback with (element, index, array) and optional thisArg
                mappedResult[index] = callback.call(
                    thisArg,
                    originalArray[index],
                    index,
                    originalArray
                );
            }
        }

        return mappedResult;
    },
    writable: true,
    configurable: true,
    enumerable: false // Standard built-in prototype methods are non-enumerable!
});

// ====================================================================
// Demonstration & Test Cases
// ====================================================================

console.log("--- Test Case 1: Prompt Specification Example ---");
const numbers = [1, 2, 3];
const doubled = numbers.myMap((num) => num * 2);
console.log(`Input:    [1, 2, 3]`);
console.log(`Doubled: `, doubled); // [2, 4, 6]
console.log(`Expected: [2, 4, 6]`);

console.log("\n--- Test Case 2: Using (element, index, array) Arguments ---");
const fruits = ["Apple", "Banana", "Cherry"];
const fruitReport = fruits.myMap((fruit, index, arr) => {
    return `${index + 1}/${arr.length}: ${fruit.toUpperCase()}`;
});
console.log(fruitReport);

console.log("\n--- Test Case 3: Using 'thisArg' Context Binding ---");
const taxCalculator = {
    taxRate: 0.18,
    addTax(price) {
        return Number((price + price * this.taxRate).toFixed(2));
    }
};
const prices = [100, 250, 500];
const pricesWithTax = prices.myMap(function (price) {
    return this.addTax(price);
}, taxCalculator);
console.log("Prices:          ", prices);
console.log("Prices with Tax: ", pricesWithTax); // [118, 295, 590]

console.log("\n--- Test Case 4: Sparse Array Handling ---");
const sparseArray = [10, , 30]; // Index 1 is empty / sparse
const mappedSparse = sparseArray.myMap((x) => x * 2);
console.log("Sparse Array: ", sparseArray);
console.log("Mapped Sparse:", mappedSparse); // [20, <1 empty item>, 60]

console.log("\n--- Test Case 5: Parity Comparison with Native Array.prototype.map ---");
const testArray = [5, 10, 15, 20];
const mapFn = (x, i) => x * 10 + i;

const nativeResult = testArray.map(mapFn);
const customResult = testArray.myMap(mapFn);

console.log("Native .map() output:  ", JSON.stringify(nativeResult));
console.log("Custom .myMap() output:", JSON.stringify(customResult));
console.log("Are outputs identical? :", JSON.stringify(nativeResult) === JSON.stringify(customResult)); // true

console.log("\n--- Test Case 6: Non-Enumerability Check in for...in ---");
let pollutedKeys = [];
for (let key in [1, 2]) {
    if (key === "myMap") {
        pollutedKeys.push(key);
    }
}
console.log("Did myMap show up in for...in loop?", pollutedKeys.length > 0 ? "YES (Bad)" : "NO (Clean/Correct!)");

// Export for module systems (Node.js) if required
if (typeof module !== "undefined" && module.exports) {
    module.exports = { myMap: Array.prototype.myMap };
}
