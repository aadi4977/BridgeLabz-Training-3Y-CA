/**
 * ASSIGNMENT 6 - QUESTION 2
 * Topic: Task Scheduler: Micro vs Macro Challenge
 * 
 * Objective:
 * Demonstrate how the JavaScript Event Loop prioritizes synchronous code,
 * microtasks (Promises), and macrotasks (setTimeout callbacks).
 * 
 * Requirements:
 * 1. Log "Start".
 * 2. Add:
 *    - One setTimeout() callback (macrotask).
 *    - One resolved Promise.then() callback (microtask).
 *    - One synchronous log.
 * 3. Finally, log "End".
 * 4. Run the program and explain (in comments) why microtasks run before macrotasks.
 */

"use strict";

console.log("====================================================================");
console.log("        Q2: TASK SCHEDULER: MICRO VS MACRO CHALLENGE                ");
console.log("====================================================================\n");

// 1. Initial synchronous log
console.log("Start");

// 2. Macrotask (Task Queue)
// setTimeout schedules its callback into the Macrotask Queue (or Timer Task Queue).
// Even with 0ms delay, it will not run until the synchronous call stack is completely empty
// AND all pending microtasks have executed.
setTimeout(() => {
  console.log("Timeout callback (Macrotask)");
}, 0);

// 3. Microtask (Microtask Queue / Job Queue)
// Promise resolution schedules its .then() callback into the Microtask Queue.
// Microtasks have higher priority than macrotasks.
Promise.resolve().then(() => {
  console.log("Promise callback (Microtask)");
});

// 4. Intermediate synchronous log
console.log("Synchronous middle log");

// 5. Final synchronous log
console.log("End");

/*
================================================================================
EXPLANATION OF THE JAVASCRIPT EVENT LOOP & EXECUTION ORDER
================================================================================

ACTUAL OUTPUT ORDER:
---------------------
1. Start                        -> Synchronous (Call Stack)
2. Synchronous middle log       -> Synchronous (Call Stack)
3. End                          -> Synchronous (Call Stack)
4. Promise callback (Microtask) -> Microtask Queue (drained right after Call Stack empties)
5. Timeout callback (Macrotask) -> Macrotask Queue (processed after microtasks drain)

WHY DO MICROTASKS RUN BEFORE MACROTASKS?
-----------------------------------------
1. CALL STACK EXECUTION:
   JavaScript is single-threaded. The V8/JS engine executes code strictly on the 
   Call Stack from top to bottom.
   - console.log("Start") executes immediately.
   - setTimeout(..., 0) invokes a browser/Node C++ Web API timer. The timer completes 
     and its callback is queued into the MACROTASK QUEUE (Task Queue).
   - Promise.resolve().then(...) immediately queues the `.then()` handler into the 
     MICROTASK QUEUE (Job Queue).
   - console.log("Synchronous middle log") executes immediately.
   - console.log("End") executes immediately.

2. CALL STACK EMPTIES:
   Once "End" is printed, the Main Script evaluation finishes and the Call Stack is empty.

3. DRAINING THE MICROTASK QUEUE (Higher Priority):
   According to the ECMAScript and HTML5 Event Loop specifications:
   - At the end of every tick, immediately after the current call stack empties,
     the Event Loop MUST inspect and drain the entire Microtask Queue before moving
     to render or picking the next macrotask.
   - Therefore, the Promise callback is dequeued and executed first.
   - If microtasks schedule further microtasks, they continue to be drained in the same tick.

4. EXECUTING THE MACROTASK QUEUE:
   - Only when the Microtask Queue is completely exhausted does the Event Loop 
     advance to the Macrotask Queue (Timer Queue / Task Queue).
   - The setTimeout callback is retrieved and executed.

SUMMARY OF QUEUE PRIORITIES:
----------------------------
Call Stack (Synchronous)  >  Microtask Queue (Promises, queueMicrotask)  >  Macrotask Queue (setTimeout, setInterval, setImmediate, I/O)
================================================================================
*/
