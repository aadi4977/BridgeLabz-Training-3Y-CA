/**
 * ASSIGNMENT 6 - QUESTION 5
 * Topic: Frontend Rush: Avoiding Callback Hell
 * 
 * Objective:
 * Demonstrate the refactoring of messy nested asynchronous callbacks
 * ("Callback Hell" / "Pyramid of Doom") into elegant async/await syntax.
 * 
 * Requirements:
 * 1. The pipeline includes 5 async stages:
 *    design -> build -> test -> deploy -> celebrate
 * 2. Each stage takes 1 second and logs its step.
 * 3. Implement first using nested callbacks (to show callback hell).
 * 4. Then rewrite using async/await for cleaner flow.
 * 5. Comment on why async/await improves readability.
 */

"use strict";

console.log("====================================================================");
console.log("        Q5: FRONTEND RUSH: AVOIDING CALLBACK HELL                   ");
console.log("====================================================================\n");

// ============================================================================
// PART 1: The Callback Hell Approach (Nested Callbacks / Pyramid of Doom)
// ============================================================================

function stageDesignCallback(callback) {
  setTimeout(() => {
    console.log("[Callback Hell - Stage 1] Design completed (Figma components approved)");
    callback(null, "Design Specs");
  }, 1000);
}

function stageBuildCallback(input, callback) {
  setTimeout(() => {
    console.log(`[Callback Hell - Stage 2] Build completed (Compiled bundles using ${input})`);
    callback(null, "Production Bundle");
  }, 1000);
}

function stageTestCallback(input, callback) {
  setTimeout(() => {
    console.log(`[Callback Hell - Stage 3] Tests passed (All unit & E2E tests green for ${input})`);
    callback(null, "Verified Build");
  }, 1000);
}

function stageDeployCallback(input, callback) {
  setTimeout(() => {
    console.log(`[Callback Hell - Stage 4] Deploy completed (Pushed ${input} to CDN)`);
    callback(null, "Live Application");
  }, 1000);
}

function stageCelebrateCallback(input, callback) {
  setTimeout(() => {
    console.log(`[Callback Hell - Stage 5] Celebrate! (${input} is in hands of users! Pizza time!)`);
    callback(null, "Pipeline Complete!");
  }, 1000);
}

/**
 * Runs the pipeline using nested callbacks to demonstrate Callback Hell.
 * @param {Function} onFinished - Called when all stages complete.
 */
function runCallbackHellPipeline(onFinished) {
  console.log("--- Starting Pipeline with NESTED CALLBACKS (Pyramid of Doom) ---");

  // Notice the deep nesting indentation and tight coupling:
  stageDesignCallback((err1, designData) => {
    if (err1) return console.error(err1);

    stageBuildCallback(designData, (err2, buildData) => {
      if (err2) return console.error(err2);

      stageTestCallback(buildData, (err3, testData) => {
        if (err3) return console.error(err3);

        stageDeployCallback(testData, (err4, deployData) => {
          if (err4) return console.error(err4);

          stageCelebrateCallback(deployData, (err5, celebration) => {
            if (err5) return console.error(err5);

            console.log(`Nested Callback Result: ${celebration}\n`);
            if (typeof onFinished === "function") onFinished();
          });
        });
      });
    });
  });
}

// ============================================================================
// PART 2: The Modern Async/Await Approach (Clean & Readable)
// ============================================================================

/**
 * Reusable helper returning a Promise resolving after 1000ms.
 * @param {string} stageName - Current pipeline stage
 * @param {string} detail - Description
 * @returns {Promise<string>}
 */
function delayStage(stageName, detail) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`[Async/Await - ${stageName}] ${detail}`);
      resolve(`${stageName} Output`);
    }, 1000);
  });
}

const designStage = () => delayStage("Stage 1: Design", "Figma design system exported.");
const buildStage = () => delayStage("Stage 2: Build", "Vite build completed, chunks minified.");
const testStage = () => delayStage("Stage 3: Test", "100% test coverage verified with Jest.");
const deployStage = () => delayStage("Stage 4: Deploy", "Artifacts deployed to production AWS/Vercel.");
const celebrateStage = () => delayStage("Stage 5: Celebrate", "Feature release launched! High fives all around!");

/**
 * Clean, readable async/await pipeline.
 */
async function runAsyncAwaitPipeline() {
  console.log("--- Starting Pipeline with ASYNC / AWAIT (Flat & Synchronous Style) ---");
  try {
    const designResult = await designStage();
    const buildResult = await buildStage();
    const testResult = await testStage();
    const deployResult = await deployStage();
    const celebrationResult = await celebrateStage();

    console.log(`\nAsync/Await Result: Pipeline finished successfully with ${celebrationResult}!`);
  } catch (error) {
    console.error("Pipeline encountered an error:", error.message);
  }
}

// ============================================================================
// Execution Flow: Run Callback Hell first, then run Async/Await
// ============================================================================
runCallbackHellPipeline(() => {
  console.log("--------------------------------------------------------------------");
  runAsyncAwaitPipeline();
});

/*
================================================================================
WHY ASYNC / AWAIT IMPROVES READABILITY:
================================================================================
1. LINEAR / SYNCHRONOUS CODE STRUCTURE:
   - Nested callbacks create a horizontal triangle ("Pyramid of Doom") that pushes
     code further and further to the right.
   - async/await flattens the code vertically. It reads line-by-line, top-to-bottom,
     exactly like synchronous code, making business logic instantly recognizable.

2. UNIFIED ERROR HANDLING:
   - With nested callbacks, every single level requires manual error checking
     (e.g., `if (err) return ...`), which is repetitive and error-prone.
   - With async/await, all errors across any asynchronous step are cleanly caught
     in a single centralized `try...catch` block.

3. SCOPE AND DATA SHARING:
   - In async/await, variables returned from earlier steps remain accessible in scope
     at any subsequent line without deeply passing arguments through closures.

4. EASIER DEBUGGING & STACK TRACES:
   - Debugging nested callbacks in DevTools or Node leads to convoluted anonymous
     closure call stacks.
   - async/await retains meaningful call stacks and allows stepping through breakpoints
     sequentially.
================================================================================
*/
