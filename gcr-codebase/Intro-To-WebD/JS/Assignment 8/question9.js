/**
 * ASSIGNMENT 8 - QUESTION 9
 * Topic: Fitness App Analytics (Classes, Array Processing & Error Handling)
 * 
 * Objective:
 * Given user workout data:
 * [
 *   { user: "A", steps: 8000, calories: 300 },
 *   { user: "B", steps: 12000, calories: 500 },
 *   { user: "C", steps: 4000, calories: 200 }
 * ]
 * Create a FitnessAnalytics class with methods:
 *   - getActiveUsers() → users with steps > 7000 using filter()
 *   - getAverageCalories() → using reduce()
 *   - getUserSummary() → using map() to format as messages
 *   - Throw an error if dataset is empty
 * Execute all methods for the above data.
 */

"use strict";

console.log("====================================================================");
console.log("        Q9: FITNESS APP ANALYTICS (CLASSES & ARRAY PIPELINES)       ");
console.log("====================================================================\n");

// Given Workout Dataset
const workoutData = [
  { user: "A", steps: 8000, calories: 300 },
  { user: "B", steps: 12000, calories: 500 },
  { user: "C", steps: 4000, calories: 200 }
];

console.log("--- Initial Workout Data ---");
console.table(workoutData);

/**
 * Analytics engine to process and summarize workout metrics.
 */
class FitnessAnalytics {
  /**
   * @param {Array<{user: string, steps: number, calories: number}>} dataset
   */
  constructor(dataset) {
    if (!Array.isArray(dataset)) {
      throw new Error("Invalid dataset provided: Must be an array of workout records.");
    }
    this.dataset = dataset;
  }

  /**
   * Internal validator to ensure dataset is non-empty before processing.
   * Throws an error if dataset is empty.
   */
  #validateDataset() {
    if (this.dataset.length === 0) {
      throw new Error("Dataset is empty. Analytics operations cannot be performed on empty data.");
    }
  }

  /**
   * Filters and returns active users who logged more than 7,000 steps.
   * Uses Array.prototype.filter()
   * 
   * @param {number} [stepThreshold=7000] - Minimum steps to be considered active
   * @returns {Array<object>} List of active users
   */
  getActiveUsers(stepThreshold = 7000) {
    this.#validateDataset();

    return this.dataset.filter(record => record.steps > stepThreshold);
  }

  /**
   * Calculates the average calories burned across all users in the dataset.
   * Uses Array.prototype.reduce()
   * 
   * @returns {number} Average calories (rounded to 2 decimal places)
   */
  getAverageCalories() {
    this.#validateDataset();

    const totalCalories = this.dataset.reduce((accum, record) => {
      if (typeof record.calories !== "number" || record.calories < 0) {
        throw new Error(`Invalid calorie entry detected for user ${record.user}.`);
      }
      return accum + record.calories;
    }, 0);

    const average = totalCalories / this.dataset.length;
    return Number(average.toFixed(2));
  }

  /**
   * Formats each user's workout metrics into a human-readable summary message.
   * Uses Array.prototype.map()
   * 
   * @returns {string[]} Array of formatted status messages
   */
  getUserSummary() {
    this.#validateDataset();

    return this.dataset.map(record => {
      const stepGoal = record.steps >= 10000 ? "🌟 Goal Exceeded" : record.steps >= 7000 ? "✅ Active" : "🚶 Moderate";
      return `User ${record.user} completed ${record.steps.toLocaleString()} steps and burned ${record.calories} kcal (${stepGoal}).`;
    });
  }
}

// ==========================================
// EXECUTION FOR THE GIVEN DATASET
// ==========================================

console.log("====================================================================");
console.log("             EXECUTING ANALYTICS METHODS ON GIVEN DATA              ");
console.log("====================================================================\n");

try {
  const analytics = new FitnessAnalytics(workoutData);

  // 1. getActiveUsers() using filter()
  console.log("1. Active Users (Steps > 7000) [filter()]:");
  const activeUsers = analytics.getActiveUsers();
  console.table(activeUsers);

  // 2. getAverageCalories() using reduce()
  console.log("\n2. Average Calories Burned [reduce()]:");
  const avgCalories = analytics.getAverageCalories();
  console.log(`🔥 Average Calories Burned: ${avgCalories} kcal`);

  // 3. getUserSummary() using map()
  console.log("\n3. User Summary Messages [map()]:");
  const summaries = analytics.getUserSummary();
  summaries.forEach((msg, idx) => {
    console.log(`   [${idx + 1}] ${msg}`);
  });

} catch (error) {
  console.error("Analytics Error:", error.message);
}

// ==========================================
// TEST SCENARIO: EMPTY DATASET ERROR HANDLING
// ==========================================

console.log("\n====================================================================");
console.log("       TESTING ERROR HANDLING: EMPTY DATASET (try/catch)            ");
console.log("====================================================================\n");

try {
  console.log("Instantiating FitnessAnalytics with an empty array []...");
  const emptyAnalytics = new FitnessAnalytics([]);

  console.log("Attempting to call .getActiveUsers()...");
  emptyAnalytics.getActiveUsers();
} catch (error) {
  console.error(`❌ Successfully Caught Expected Error: "${error.message}"`);
}

try {
  console.log("\nAttempting to call .getAverageCalories() on empty dataset...");
  const emptyAnalytics = new FitnessAnalytics([]);
  emptyAnalytics.getAverageCalories();
} catch (error) {
  console.error(`❌ Successfully Caught Expected Error: "${error.message}"`);
}

// Export for Node and browser
if (typeof module !== "undefined" && module.exports) {
  module.exports = { workoutData, FitnessAnalytics };
}
