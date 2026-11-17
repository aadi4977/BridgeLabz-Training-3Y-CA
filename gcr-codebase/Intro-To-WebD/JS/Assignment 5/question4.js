/**
 * ASSIGNMENT 5 - JAVASCRIPT FUNCTIONS & PROTOTYPES
 * Question 4: Constructor Functions & Prototype Method Sharing
 * 
 * Objective:
 * Create a constructor function Car(brand, model). Add a prototype method getDetails()
 * that prints car brand and model. Create two car objects and call this method to show
 * method sharing via prototype.
 * 
 * Environment: Node.js & Browser Console
 */

"use strict";

console.log("====================================================================");
console.log("   ASSIGNMENT 5 - Q4: CONSTRUCTOR FUNCTION & PROTOTYPE SHARING       ");
console.log("====================================================================\n");

/**
 * Constructor function for creating Car objects.
 * 
 * @param {string} brand - Brand of the automobile
 * @param {string} model - Model name of the automobile
 */
function Car(brand, model) {
    // Instance-specific properties (each instance gets its own copy)
    this.brand = brand;
    this.model = model;
}

/**
 * Prototype method to print and return car details.
 * Adding methods to Car.prototype ensures all instances share ONE single function reference in memory.
 * 
 * @returns {string} Formatted car description
 */
Car.prototype.getDetails = function () {
    const details = `Car Brand: ${this.brand} | Model: ${this.model}`;
    console.log(`[getDetails] -> ${details}`);
    return details;
};

// ====================================================================
// Demonstration: Creating Two Car Objects
// ====================================================================

console.log("--- Creating Two Distinct Car Instances ---");
const car1 = new Car("Porsche", "911 GT3");
const car2 = new Car("Tesla", "Model S Plaid");

console.log("\nCalling getDetails() on car1:");
car1.getDetails();

console.log("\nCalling getDetails() on car2:");
car2.getDetails();

// ====================================================================
// Proof of Method Sharing via Prototype
// ====================================================================

console.log("\n====================================================================");
console.log("                 VERIFYING PROTOTYPE METHOD SHARING                 ");
console.log("====================================================================\n");

// 1. Strict equality check on the function reference
const isShared = (car1.getDetails === car2.getDetails);
console.log(`1. Do both instances share the exact same method reference?`);
console.log(`   car1.getDetails === car2.getDetails -> ${isShared}`); // true

// 2. Checking own properties vs prototype properties
console.log(`\n2. Does car1 own 'getDetails' directly?`);
console.log(`   Object.hasOwn(car1, 'getDetails') -> ${Object.prototype.hasOwnProperty.call(car1, 'getDetails')}`); // false

console.log(`\n3. Does car1 inherit 'getDetails' through its prototype chain?`);
console.log(`   'getDetails' in car1 -> ${'getDetails' in car1}`); // true

// 3. Inspecting the prototype linkage
console.log(`\n4. Prototype linkage verification:`);
console.log(`   Object.getPrototypeOf(car1) === Car.prototype -> ${Object.getPrototypeOf(car1) === Car.prototype}`); // true
console.log(`   Object.getPrototypeOf(car2) === Car.prototype -> ${Object.getPrototypeOf(car2) === Car.prototype}`); // true

// 4. Memory Efficiency Explanation
console.log(`
Memory Efficiency Note:
- If getDetails were declared inside the Car constructor via 'this.getDetails = ...',
  every instance (1,000 cars = 1,000 distinct function objects) would consume separate heap memory.
- By defining getDetails on Car.prototype, only 1 function object exists in memory,
  regardless of whether there are 2 cars or 1,000,000 cars.
`);

// Export for module systems (Node.js) if required
if (typeof module !== "undefined" && module.exports) {
    module.exports = { Car, car1, car2 };
}
