/**
 * ASSIGNMENT 6 - QUESTION 4
 * Topic: DevOps Delay: Async Timeout Race
 * 
 * Objective:
 * Manage concurrent server responses using Promise combinators:
 * Promise.all() and Promise.race().
 * 
 * Requirements:
 * 1. Server A responds in 2 seconds.
 * 2. Server B responds in 3 seconds.
 * 3. Use Promise.all() to show:
 *    "Deployment completed for all servers"
 * 4. Use Promise.race() to show:
 *    "Fastest response:" for whichever server finishes first.
 * 5. Simulate random failure using Math.random() and handle with .catch().
 */

"use strict";

console.log("====================================================================");
console.log("          Q4: DEVOPS DELAY: ASYNC TIMEOUT RACE                      ");
console.log("====================================================================\n");

/**
 * Simulates a deployment server response with delay and possible random failure.
 * @param {string} serverName - Identifier for the server (e.g. 'Server A')
 * @param {number} delayMs - Response time in milliseconds
 * @param {number} failProbability - Failure chance (0.0 to 1.0)
 * @returns {Promise<{server: string, time: string, status: string}>}
 */
function deployToServer(serverName, delayMs, failProbability = 0.2) {
  return new Promise((resolve, reject) => {
    console.log(`[INIT] Deploying to ${serverName} (Expected response in ${delayMs / 1000}s)...`);

    setTimeout(() => {
      const hasFailed = Math.random() < failProbability;
      if (hasFailed) {
        reject(new Error(`${serverName} deployment crashed! Connection timed out or health check failed.`));
      } else {
        resolve({
          server: serverName,
          responseTimeMs: delayMs,
          status: "DEPLOYED_SUCCESSFULLY",
          timestamp: new Date().toLocaleTimeString()
        });
      }
    }, delayMs);
  });
}

// ============================================================================
// PART 1: Promise.race() - Determining the Fastest Responder
// ============================================================================
console.log("--- PART 1: Testing Promise.race() ---");

// Server A: 2 seconds, Server B: 3 seconds
const serverAPromiseForRace = deployToServer("Server A (US-East)", 2000, 0.2);
const serverBPromiseForRace = deployToServer("Server B (EU-Central)", 3000, 0.2);

Promise.race([serverAPromiseForRace, serverBPromiseForRace])
  .then((fastest) => {
    console.log("\n>>> Promise.race Result:");
    console.log(`Fastest response: ${fastest.server} responded first in ${fastest.responseTimeMs / 1000}s!`);
    console.log(fastest);
  })
  .catch((error) => {
    console.error("\n>>> Promise.race Failure:");
    console.error(`Fastest event was a failure: ${error.message}`);
  })
  .finally(() => {
    console.log("\n----------------------------------------------------\n");
    runPromiseAllDemo();
  });

// ============================================================================
// PART 2: Promise.all() - Waiting for All Servers to Complete
// ============================================================================
function runPromiseAllDemo() {
  console.log("--- PART 2: Testing Promise.all() ---");

  const serverAPromiseForAll = deployToServer("Server A (US-East)", 2000, 0.2);
  const serverBPromiseForAll = deployToServer("Server B (EU-Central)", 3000, 0.2);

  Promise.all([serverAPromiseForAll, serverBPromiseForAll])
    .then((results) => {
      console.log("\n>>> Promise.all Result:");
      console.log("Deployment completed for all servers");
      results.forEach((res) => {
        console.log(` - ${res.server}: ${res.status} at ${res.timestamp} (${res.responseTimeMs / 1000}s)`);
      });
      console.log("\nAll clusters are live and synced!");
    })
    .catch((error) => {
      console.error("\n>>> Promise.all Failure:");
      console.error("One or more server deployments failed:");
      console.error(error.message);
      console.error("Deployment aborted. Rolling back changes.");
    })
    .finally(() => {
      console.log("\nDevOps deployment simulation finished.\n");
    });
}
