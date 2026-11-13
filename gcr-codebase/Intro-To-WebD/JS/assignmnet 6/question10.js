/**
 * ASSIGNMENT 6 - QUESTION 10
 * Topic: The Final Delivery: Async Pipeline Debugger
 * 
 * Objective:
 * Build a robust asynchronous food delivery pipeline using ES6+ async/await and try/catch.
 * 
 * Requirements:
 * 1. 5 sequential steps:
 *    takeOrder -> prepare -> pack -> dispatch -> deliver
 * 2. Each returns a Promise with a random 1-2s delay and random success/failure.
 * 3. Implement runPipeline() using async/await and try/catch.
 * 4. Log each step clearly:
 *      Start Pipeline
 *      Step 1: Order taken
 *      Step 2: Food prepared
 *      Step 3: Package ready
 *      Step 4: Out for delivery
 *      Delivery completed!
 * 5. If any step fails, print "Pipeline failed!".
 * 6. Add detailed comments explaining async behavior and event loop control flow.
 */

"use strict";

console.log("====================================================================");
console.log("      Q10: THE FINAL DELIVERY: ASYNC PIPELINE DEBUGGER              ");
console.log("====================================================================\n");

/**
 * Helper to generate random duration between 1000ms and 2000ms (1-2 seconds).
 * @returns {number}
 */
function getRandomDelay() {
  return Math.floor(Math.random() * 1000) + 1000;
}

/**
 * Generic factory to create a pipeline step with random delay (1-2s) and failure chance.
 * @param {string} stepName - Name of the step
 * @param {string} successMessage - Message logged when step succeeds
 * @param {string} failureReason - Reason given if step fails
 * @param {number} failureRate - Probability of failure (0.0 to 1.0)
 * @returns {Promise<string>}
 */
function createPipelineStep(stepName, successMessage, failureReason, failureRate = 0.15) {
  return new Promise((resolve, reject) => {
    const delay = getRandomDelay();

    setTimeout(() => {
      const hasFailed = Math.random() < failureRate;

      if (hasFailed) {
        reject(new Error(`[${stepName} Failure]: ${failureReason}`));
      } else {
        console.log(successMessage);
        resolve(stepName);
      }
    }, delay);
  });
}

// ============================================================================
// 1. Individual Pipeline Steps (Each takes 1-2s and returns a Promise)
// ============================================================================

function takeOrder() {
  return createPipelineStep(
    "takeOrder",
    "Step 1: Order taken",
    "Customer cancelled the order or restaurant was closed."
  );
}

function prepare() {
  return createPipelineStep(
    "prepare",
    "Step 2: Food prepared",
    "Kitchen ran out of fresh ingredients or chef was unavailable."
  );
}

function pack() {
  return createPipelineStep(
    "pack",
    "Step 3: Package ready",
    "Packaging seal damaged or container leak detected."
  );
}

function dispatch() {
  return createPipelineStep(
    "dispatch",
    "Step 4: Out for delivery",
    "Delivery partner flat tire or severe traffic roadblock."
  );
}

function deliver() {
  return createPipelineStep(
    "deliver",
    "Delivery completed!",
    "Customer address unreachable or customer not responding."
  );
}

// ============================================================================
// 2. Orchestrator: runPipeline() using async/await and try/catch
// ============================================================================

/**
 * Runs the food delivery simulation pipeline sequentially.
 */
async function runPipeline() {
  console.log("Start Pipeline");

  try {
    // Each step awaits the previous step's completion.
    // Execution pauses here until the Promise resolves or rejects.
    await takeOrder();
    await prepare();
    await pack();
    await dispatch();
    await deliver();

    console.log("\n========================================");
    console.log("SUCCESS: Order fulfilled and enjoyed by customer!");
    console.log("========================================\n");
  } catch (error) {
    // If any step rejects, control flow immediately jumps to this catch block.
    console.error("\n========================================");
    console.error("Pipeline failed!");
    console.error(`Root Cause: ${error.message}`);
    console.error("Initiating customer refund and apology notification.");
    console.error("========================================\n");
  } finally {
    console.log("Pipeline execution finished.\n");
  }
}

// Trigger the pipeline
runPipeline();

/*
================================================================================
EVENT LOOP & ASYNCHRONOUS CONTROL FLOW EXPLANATION:
================================================================================

1. WHAT HAPPENS WHEN runPipeline() IS CALLED:
   - `runPipeline()` is an `async` function, which means it returns a Promise.
   - When entered, synchronous code runs first: `console.log("Start Pipeline")`.
   - The engine encounters `await takeOrder()`.
   - `takeOrder()` calls `setTimeout(..., delay)`.
   - The browser / Node runtime registers the timer with the operating system / libuv.
   - The `await` keyword pauses execution of the remainder of `runPipeline()`, 
     unwraps the execution context, and returns control back to the caller / main thread.
   - The main JavaScript thread is completely unblocked during the 1-2 second wait!

2. HOW THE EVENT LOOP RESUMES EXECUTION:
   - When the 1-2 second timer expires, the host runtime pushes the timer callback
     onto the Macrotask Queue.
   - The Event Loop picks up the callback when the call stack is clear.
   - Inside the callback, either `resolve()` or `reject()` is called.
   - Calling `resolve()` transitions the awaited Promise to "fulfilled", which queues
     a microtask to resume `runPipeline()` from the exact point after the `await`.
   - The Event Loop processes microtasks immediately, restoring local variables and 
     proceeding to `await prepare()`.

3. SHORT-CIRCUITING ON FAILURE:
   - If any step calls `reject()`, the Promise transitions to "rejected".
   - The `await` expression immediately throws that rejection as an Exception.
   - Control jumps directly to the `catch(error)` block, skipping all downstream 
     steps (`prepare`, `pack`, etc.).
   - This ensures safety and prevents invalid state transitions (e.g. attempting to
     deliver food that was never prepared).
================================================================================
*/
