/**
 * ASSIGNMENT 6 - QUESTION 1
 * Topic: The Startup Morning: Async Coffee Maker
 * 
 * Objective:
 * Implement an asynchronous coffee preparation process consisting of three steps:
 *   1. Boiling water
 *   2. Brewing coffee
 *   3. Pouring into a cup
 * 
 * Requirements:
 * - Each step returns a Promise that resolves after 1-2 seconds.
 * - Use Promise chaining (.then()) to simulate the sequential process.
 * - Print logs for each step and finally display: "Coffee ready for the team!"
 * - Use .catch() to handle any failure (simulate random failure using Math.random()).
 * - Clean ES6+ syntax, descriptive variable names, and clear comments.
 */

"use strict";

console.log("====================================================================");
console.log("       Q1: THE STARTUP MORNING: ASYNC COFFEE MAKER                 ");
console.log("====================================================================\n");

/**
 * Helper to generate a random delay between min and max milliseconds.
 * @param {number} min - Minimum delay in ms
 * @param {number} max - Maximum delay in ms
 * @returns {number} Random milliseconds
 */
function getRandomDelay(min = 1000, max = 2000) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Step 1: Boil Water
 * Simulates heating water with a 15% random failure chance (e.g., kettle malfunction).
 * @returns {Promise<string>}
 */
function boilWater() {
  return new Promise((resolve, reject) => {
    const delay = getRandomDelay(1000, 2000);
    console.log(`[Step 1] Boiling water started... (Estimated time: ${(delay / 1000).toFixed(1)}s)`);

    setTimeout(() => {
      // 15% chance of simulated failure
      const hasError = Math.random() < 0.15;
      if (hasError) {
        reject(new Error("Water heater tripped the circuit breaker!"));
      } else {
        console.log("[Step 1] Water is boiled and steaming hot!");
        resolve("Boiled Water");
      }
    }, delay);
  });
}

/**
 * Step 2: Brew Coffee
 * Simulates extracting coffee with a 15% random failure chance (e.g., out of beans).
 * @param {string} waterInput - Output from Step 1
 * @returns {Promise<string>}
 */
function brewCoffee(waterInput) {
  return new Promise((resolve, reject) => {
    const delay = getRandomDelay(1000, 2000);
    console.log(`[Step 2] Brewing coffee with ${waterInput}... (Estimated time: ${(delay / 1000).toFixed(1)}s)`);

    setTimeout(() => {
      // 15% chance of simulated failure
      const hasError = Math.random() < 0.15;
      if (hasError) {
        reject(new Error("Coffee grinder jammed or ran out of coffee beans!"));
      } else {
        console.log("[Step 2] Rich espresso aroma fills the room! Coffee brewed successfully.");
        resolve("Aromatic Brewed Coffee");
      }
    }, delay);
  });
}

/**
 * Step 3: Pour into Cup
 * Simulates pouring coffee into a mug with a 15% random failure chance (e.g., spilled).
 * @param {string} coffeeInput - Output from Step 2
 * @returns {Promise<string>}
 */
function pourIntoCup(coffeeInput) {
  return new Promise((resolve, reject) => {
    const delay = getRandomDelay(1000, 2000);
    console.log(`[Step 3] Pouring ${coffeeInput} into clean ceramic cups... (Estimated time: ${(delay / 1000).toFixed(1)}s)`);

    setTimeout(() => {
      // 15% chance of simulated failure
      const hasError = Math.random() < 0.15;
      if (hasError) {
        reject(new Error("Cup slipped and coffee spilled all over the counter!"));
      } else {
        console.log("[Step 3] Poured smoothly into the cup.");
        resolve("Fresh Cup of Coffee");
      }
    }, delay);
  });
}

// ============================================================================
// Execution via Promise Chaining (.then() and .catch())
// ============================================================================

console.log("Morning routine initiated: Making coffee for developers...\n");

boilWater()
  .then((waterResult) => {
    return brewCoffee(waterResult);
  })
  .then((brewResult) => {
    return pourIntoCup(brewResult);
  })
  .then((finalProduct) => {
    console.log("\n----------------------------------------------------");
    console.log("SUCCESS:", finalProduct);
    console.log("Coffee ready for the team!");
    console.log("----------------------------------------------------\n");
  })
  .catch((error) => {
    console.error("\n----------------------------------------------------");
    console.error("FAILURE OCCURRED DURING COFFEE PREPARATION!");
    console.error(`Reason: ${error.message}`);
    console.error("The team will have to settle for tea today.");
    console.error("----------------------------------------------------\n");
  })
  .finally(() => {
    console.log("Coffee machine powered down.\n");
  });
