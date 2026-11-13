/**
 * ASSIGNMENT 6 - QUESTION 9
 * Topic: Debugging the Event Loop
 * 
 * Objective:
 * Analyze asynchronous execution in JavaScript, predict the output order,
 * execute the snippet, and explain the deep mechanics of Microtasks vs Macrotasks.
 * 
 * Code Snippet under investigation:
 *   console.log("Script start");
 *   setTimeout(() => console.log("Timeout callback"), 0);
 *   Promise.resolve().then(() => console.log("Promise callback"));
 *   console.log("Script end");
 * 
 * Requirements:
 * 1. Before running, write predicted output order in comments.
 * 2. Execute and compare actual results.
 * 3. Explain why Promises (microtasks) execute before setTimeout (macrotasks).
 */

"use strict";

/*
================================================================================
STEP 1: PREDICTED OUTPUT ORDER (Written prior to execution)
================================================================================

PREDICTED ORDER:
1. Script start
2. Script end
3. Promise callback
4. Timeout callback

PREDICTION REASONING:
- "Script start" is synchronous code on the call stack; runs first.
- setTimeout(..., 0) schedules a Macrotask into the Timer / Macrotask Queue.
- Promise.resolve().then(...) schedules a Microtask into the Microtask Queue.
- "Script end" is synchronous code on the call stack; runs before the stack yields.
- When the Call Stack becomes completely empty, the Event Loop checks the
  Microtask Queue first and executes "Promise callback".
- Once the Microtask Queue is completely drained, the Event Loop takes the next
  item from the Macrotask Queue and executes "Timeout callback".
================================================================================
*/

console.log("====================================================================");
console.log("             Q9: DEBUGGING THE EVENT LOOP                           ");
console.log("====================================================================\n");

console.log("[Execution Commencing...]\n");

// Code specified in assignment:
console.log("Script start");

setTimeout(() => console.log("Timeout callback"), 0);

Promise.resolve().then(() => console.log("Promise callback"));

console.log("Script end");

/*
================================================================================
STEP 2 & 3: DETAILED EXPLANATION & ARCHITECTURAL COMPARISON
================================================================================

HOW THE JAVASCRIPT ENGINE & EVENT LOOP WORK UNDER THE HOOD:

1. THE CALL STACK (LIFO - Last In, First Out):
   - JavaScript is single-threaded; only one statement executes at a time.
   - When the script runs, the global execution context is pushed onto the Call Stack.
   - Line 46: `console.log("Script start")` pushes onto stack, prints, and pops off.
   - Line 48: `setTimeout()` is evaluated. It delegates the timer (0ms) to the host
     environment (Browser Web APIs or Node.js libuv threadpool). When the timer expires,
     the host pushes the callback `() => console.log("Timeout callback")` into the
     MACROTASK QUEUE (also known as the Task Queue).
   - Line 50: `Promise.resolve().then()` is evaluated. A resolved promise pushes its
     reaction callback `() => console.log("Promise callback")` into the
     MICROTASK QUEUE (also known as the Job Queue).
   - Line 52: `console.log("Script end")` pushes onto stack, prints, and pops off.
   - The main script finishes; Call Stack is now EMPTY.

2. THE EVENT LOOP CYCLE (Microtasks vs Macrotasks):
   - The Event Loop continuously checks if the Call Stack is empty.
   - Once empty, the Event Loop follows a strict order of precedence:
       1. Drain the ENTIRE Microtask Queue until empty.
       2. Perform UI rendering updates (in browser environments).
       3. Pick and execute EXACTLY ONE task from the Macrotask Queue.
       4. Immediately drain any new microtasks queued by that macrotask.
       5. Repeat the loop.

3. WHY PROMISES (MICROTASKS) RUN BEFORE setTimeout (MACROTASKS):
   - By HTML5 and ECMAScript specifications, Microtasks are intended for actions that
     must execute immediately after the current script/operation finishes, before any
     other work, user interaction, rendering, or timer ticks take place.
   - Therefore, the Microtask Queue has higher priority over the Macrotask Queue.
   - This ensures asynchronous promises settle state consistently and promptly without
     unnecessary latency.

SUMMARY TABLE:
+-------------------+----------------------------+-----------------------------+
| Feature           | Microtask Queue            | Macrotask Queue             |
+-------------------+----------------------------+-----------------------------+
| APIs              | Promise (.then, .catch),   | setTimeout, setInterval,    |
|                   | queueMicrotask,            | setImmediate (Node),        |
|                   | MutationObserver           | I/O polling, UI events      |
| Priority          | High (emptied completely)  | Normal (1 task per cycle)   |
| When executed     | After call stack empties,  | After microtask queue       |
|                   | before next macrotask      | is completely drained       |
+-------------------+----------------------------+-----------------------------+
================================================================================
*/
