/**
 * ASSIGNMENT 6 - QUESTION 3
 * Topic: Bug Tracker: Callback to Promise Migration
 * 
 * Objective:
 * Refactor legacy callback-based asynchronous code into modern Promise-based code.
 * 
 * Requirements:
 * 1. Reference original legacy function:
 *    function fetchBugs(callback) {
 *      setTimeout(() => callback(["UI glitch", "API timeout", "Login failure"]), 1000);
 *    }
 * 2. Convert it into a Promise-based version named getBugs().
 * 3. Log all bugs neatly using console.table().
 * 4. Simulate random API failure using a boolean flag/random logic and handle it using .catch().
 */

"use strict";

console.log("====================================================================");
console.log("      Q3: BUG TRACKER: CALLBACK TO PROMISE MIGRATION               ");
console.log("====================================================================\n");

// ============================================================================
// 1. Legacy Callback-based Implementation (Reference)
// ============================================================================
function fetchBugs(callback) {
  setTimeout(() => {
    callback(["UI glitch", "API timeout", "Login failure"]);
  }, 1000);
}

// ============================================================================
// 2. Modernized Promise-based Implementation
// ============================================================================

/**
 * Fetches bugs from the tracking API using Promises.
 * Supports simulating random API failures.
 * 
 * @param {boolean} [shouldSimulateFailure=null] - Optional boolean override to force success/failure.
 * @returns {Promise<Array<{id: number, bug: string, severity: string, status: string}>>}
 */
function getBugs(shouldSimulateFailure = null) {
  return new Promise((resolve, reject) => {
    console.log("Contacting Bug Tracking Server...");

    setTimeout(() => {
      // Determine failure: use passed boolean if provided, otherwise 30% random failure
      const isFailed = shouldSimulateFailure !== null ? shouldSimulateFailure : Math.random() < 0.3;

      if (isFailed) {
        reject(new Error("HTTP 500: Internal Server Error - Failed to fetch bug records."));
      } else {
        const bugRecords = [
          { id: 101, title: "UI glitch", component: "Navbar", severity: "Low", status: "Open" },
          { id: 102, title: "API timeout", component: "Payment Gateway", severity: "Critical", status: "Investigating" },
          { id: 103, title: "Login failure", component: "Auth Service", severity: "High", status: "In Progress" },
          { id: 104, title: "Memory leak", component: "Dashboard Chart", severity: "Medium", status: "Resolved" }
        ];
        resolve(bugRecords);
      }
    }, 1000);
  });
}

// ============================================================================
// 3. Execution & Demonstration
// ============================================================================

console.log("Executing getBugs() with Promise handling (.then & .catch):\n");

getBugs()
  .then((bugs) => {
    console.log("Successfully fetched bug records from server:");
    console.table(bugs);
    console.log(`Total bugs reported: ${bugs.length}\n`);
  })
  .catch((error) => {
    console.error("Bug Tracker API Error caught:");
    console.error(error.message);
    console.log("Fallback: Check server health and retry shortly.\n");
  });
