/**
 * Q5 – Hoisting Lab: The Sequence Trap
 * 
 * Objective:
 * Analyze the JavaScript Hoisting mechanism across var, let/const, function declarations,
 * and arrow functions. Understand the memory creation phase vs execution phase,
 * resolve sequence traps, and document Temporal Dead Zone (TDZ) behavior.
 * 
 * Original Code:
 * console.log(score);
 * announce();
 * var score = 50;
 * function announce() { console.log("Game started"); }
 * let status = "ready";
 * startGame();
 * function startGame() {
 *   console.log(status);
 * }
 * 
 * Tasks:
 * 1. Explain each hoisted element's memory state.
 * 2. Fix the code to run properly.
 * 3. Rewrite using arrow functions to compare hoisting differences.
 */

"use strict";

console.log("====================================================================");
console.log("             Q5: HOISTING LAB - THE SEQUENCE TRAP                   ");
console.log("====================================================================\n");

// ===========================================================================
// TASK 1: RUN ORIGINAL CODE & EXPLAIN HOISTED MEMORY STATES
// ===========================================================================
console.log("--- TASK 1: RUNNING ORIGINAL CODE PREDICTION & EXECUTION ---");

console.log("[Execution Output of Original Code]:");

// Simulating original block in a dedicated function scope to illustrate exact output
function runOriginalCode() {
    console.log("1. console.log(score) ->", typeof scoreLocal !== "undefined" ? scoreLocal : "undefined (hoisted var)");
    announceLocal();
    var scoreLocal = 50;
    function announceLocal() {
        console.log("2. announce()         -> Game started");
    }
    let statusLocal = "ready";
    startGameLocal();
    function startGameLocal() {
        console.log("3. startGame()        ->", statusLocal);
    }
}
runOriginalCode();

console.log("\n[DETAILED MEMORY CREATION VS EXECUTION PHASE ANALYSIS]:");
console.log("+----------------------+-------------------+---------------------------------------------------+");
console.log("| Element              | Hoisting Type     | Memory Phase State / Behavior                     |");
console.log("+----------------------+-------------------+---------------------------------------------------+");
console.log("| var score            | Variable Hoisting | Allocated in memory and initialized to undefined. |");
console.log("|                      |                   | Accessing before assignment yields `undefined`.   |");
console.log("| function announce()  | Function Hoisting | Fully hoisted with body. Callable anywhere in     |");
console.log("|                      |                   | the enclosing scope prior to declaration.         |");
console.log("| let status           | Lexical TDZ       | Hoisted into Temporal Dead Zone (TDZ).            |");
console.log("|                      |                   | Uninitialized until line of declaration.         |");
console.log("| function startGame() | Function Hoisting | Fully hoisted. Accesses `status` successfully     |");
console.log("|                      |                   | only because invocation happens AFTER let status. |");
console.log("+----------------------+-------------------+---------------------------------------------------+\n");


// ===========================================================================
// TASK 2: FIX THE CODE TO RUN PROPERLY IN LOGICAL SEQUENCE
// ===========================================================================
console.log("--- TASK 2: REFACTORED CLEAN CODE (PROPER SEQUENCE) ---");

// 1. Declare all dependencies, functions, and state variables at the top
const fixedScore = 50;
const fixedStatus = "ready";

function fixedAnnounce() {
    console.log("[Fixed Announce] Game started");
}

function fixedStartGame(currentStatus) {
    console.log(`[Fixed StartGame] Current game status: "${currentStatus}"`);
}

// 2. Execute calls in clean, deterministic sequence
console.log(`[Fixed Access] Score is properly initialized: ${fixedScore}`);
fixedAnnounce();
fixedStartGame(fixedStatus);
console.log("Result: Zero undefined traps, pure predictability and readability.\n");


// ===========================================================================
// TASK 3: REWRITE USING ARROW FUNCTIONS & COMPARE HOISTING DIFFERENCES
// ===========================================================================
console.log("--- TASK 3: ARROW FUNCTIONS & HOISTING COMPARISON ---");

// Demonstrate TDZ with Arrow functions declared via const/let
console.log("A. Attempting to call arrow function BEFORE its declaration:");
try {
    // Calling before declaration
    // arrowAnnounce(); // ReferenceError
    eval("arrowAnnounce()");
} catch (err) {
    console.log(`   [CAUGHT EXPECTED ERROR]: ${err.name} - ${err.message}`);
    console.log("   Reason: Arrow functions assigned to const/let live in TDZ prior to line of definition.");
}

console.log("\nB. Attempting to call arrow function assigned to 'var' BEFORE declaration:");
try {
    // If declared as: var arrowVar = () => {};
    // arrowVar(); // TypeError: arrowVar is not a function
    eval("var arrowVar; arrowVar();");
} catch (err) {
    console.log(`   [CAUGHT EXPECTED ERROR]: ${err.name} - ${err.message}`);
    console.log("   Reason: 'var arrowVar' is hoisted as undefined. Invoking undefined() causes TypeError.");
}

console.log("\nC. Proper Arrow Function Implementation:");
// Proper modern declarations
const arrowScore = 50;
const arrowStatus = "ready";

const arrowAnnounce = () => {
    console.log("   [Arrow announce()] Game started successfully!");
};

const arrowStartGame = (status) => {
    console.log(`   [Arrow startGame()] Status is confirmed: ${status}`);
};

// Calling after definition
console.log(`   Arrow Score: ${arrowScore}`);
arrowAnnounce();
arrowStartGame(arrowStatus);

console.log("\n==================== HOISTING COMPARISON SUMMARY ====================");
console.log("1. Function Declaration (`function foo(){}`):");
console.log("   - Hoisted in full with implementation.");
console.log("   - Can be safely invoked anywhere in the enclosing scope.");
console.log("2. Arrow Function (`const foo = () => {}`):");
console.log("   - Follows lexical variable rules (const/let).");
console.log("   - Enforces Temporal Dead Zone (TDZ) - Prevents early invocation.");
console.log("   - Recommended for modern JS to avoid sequence bugs and silent failures.");
console.log("====================================================================\n");
