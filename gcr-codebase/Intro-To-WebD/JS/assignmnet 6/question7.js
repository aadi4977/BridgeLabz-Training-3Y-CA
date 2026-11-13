/**
 * ASSIGNMENT 6 - QUESTION 7
 * Topic: The Lazy Loader: Promise Combinator Practice
 * 
 * Objective:
 * Practice Promise.allSettled() by loading multiple UI dashboard modules
 * with varying completion times, handling partial failures without short-circuiting,
 * and tracking overall duration using Date.now().
 * 
 * Requirements:
 * 1. Given module loader functions:
 *    - loadProfile() -> resolves in 2000ms
 *    - loadPosts() -> resolves in 1500ms
 *    - loadMessages() -> resolves in 1000ms
 * 2. Use Promise.allSettled() to handle them together.
 * 3. Randomly reject one Promise (simulate one module failing).
 * 4. Print which modules succeeded or failed.
 * 5. Calculate total time taken using Date.now() before and after.
 */

"use strict";

console.log("====================================================================");
console.log("      Q7: THE LAZY LOADER: PROMISE COMBINATOR PRACTICE             ");
console.log("====================================================================\n");

// Determine at random which one of the 3 modules will be simulated to reject:
// 0: Profile, 1: Posts, 2: Messages
const failureCandidateIndex = Math.floor(Math.random() * 3);
const moduleNames = ["Profile", "Posts", "Messages"];
console.log(`[Simulation Setup] Module randomly selected to fail: "${moduleNames[failureCandidateIndex]}"\n`);

/**
 * Loads User Profile Section (2000ms)
 * @returns {Promise<string>}
 */
function loadProfile() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (failureCandidateIndex === 0) {
        reject(new Error("Database timeout while loading user profile!"));
      } else {
        resolve("Profile Loaded");
      }
    }, 2000);
  });
}

/**
 * Loads Feed Posts Section (1500ms)
 * @returns {Promise<string>}
 */
function loadPosts() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (failureCandidateIndex === 1) {
        reject(new Error("Network glitch fetching posts feed!"));
      } else {
        resolve("Posts Loaded");
      }
    }, 1500);
  });
}

/**
 * Loads Direct Messages Section (1000ms)
 * @returns {Promise<string>}
 */
function loadMessages() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (failureCandidateIndex === 2) {
        reject(new Error("WebSocket authentication failed for messages!"));
      } else {
        resolve("Messages Loaded");
      }
    }, 1000);
  });
}

/**
 * Orchestrates loading all modules using Promise.allSettled()
 */
async function loadDashboard() {
  console.log("Starting dashboard module loader...");
  
  // 5. Calculate total time taken using Date.now() before and after
  const startTime = Date.now();

  // 2. Use Promise.allSettled() to handle them concurrently
  const promises = [
    loadProfile(),
    loadPosts(),
    loadMessages()
  ];

  const results = await Promise.allSettled(promises);
  const endTime = Date.now();
  const totalDuration = endTime - startTime;

  console.log("\n=================== DASHBOARD LOAD REPORT ===================");

  // 4. Print which modules succeeded or failed
  results.forEach((result, index) => {
    const moduleName = moduleNames[index];

    if (result.status === "fulfilled") {
      console.log(`[SUCCESS] Module: ${moduleName.padEnd(10)} | Status: FULFILLED | Data: "${result.value}"`);
    } else {
      console.log(`[FAILED]  Module: ${moduleName.padEnd(10)} | Status: REJECTED  | Reason: "${result.reason.message}"`);
    }
  });

  console.log("=============================================================");
  console.log(`Total time taken: ${totalDuration} ms (~${(totalDuration / 1000).toFixed(2)} seconds)`);
  console.log("Key Observation: Promise.allSettled waits for all promises to settle");
  console.log("(maximum delay among tasks), never short-circuiting on single failure.");
  console.log("=============================================================\n");
}

loadDashboard();
