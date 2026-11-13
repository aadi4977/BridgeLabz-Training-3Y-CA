# Assignment 6: Asynchronous Programming with JavaScript

This repository folder contains the complete solutions for **Assignment 6 (Lec 17-20: Async Programming with JS)**.

Each question is implemented in its own dedicated, self-contained JavaScript file adhering strictly to ES6+ best practices, comprehensive error handling, modular functions, descriptive variable names, and clear architectural comments.

---

## 📁 Directory Structure

```text
assignmnet 6/
├── index.html        # Interactive HTML test runner with live console viewer & DOM preview
├── README.md         # Comprehensive documentation & execution guide
├── question1.js      # Q1: The Startup Morning: Async Coffee Maker (Promise chaining & .catch)
├── question2.js      # Q2: Task Scheduler: Micro vs Macro Challenge (Event Loop execution order)
├── question3.js      # Q3: Bug Tracker: Callback to Promise Migration (console.table & failure simulation)
├── question4.js      # Q4: DevOps Delay: Async Timeout Race (Promise.all vs Promise.race)
├── question5.js      # Q5: Frontend Rush: Avoiding Callback Hell (Pyramid of doom refactored to async/await)
├── question6.js      # Q6: E-Commerce Dashboard: Product Card Fetcher (Fetch API, try/catch, DOM bonus)
├── question7.js      # Q7: The Lazy Loader: Promise Combinator Practice (Promise.allSettled & Date.now)
├── question8.js      # Q8: Order Processing Flow: Async Retry Mechanism (Loop + await retry logic)
├── question9.js      # Q9: Debugging the Event Loop (Prediction, execution & queue mechanics)
└── question10.js     # Q10: The Final Delivery: Async Pipeline Debugger (5-step delivery flow)
```

---

## 🚀 Running the Solutions

### Option 1: Running in Node.js (Terminal)

You can run any question file directly using Node.js from the terminal:

```bash
# Navigate to this folder
cd "assignmnet 6"

# Run individual questions:
node question1.js
node question2.js
node question3.js
node question4.js
node question5.js
node question6.js
node question7.js
node question8.js
node question9.js
node question10.js
```

### Option 2: Running in the Browser

Open `index.html` in your web browser (or use VS Code Live Server):
- Click any **"Run QX"** button to view live logs inside the UI console cards.
- View Question 6's dynamic DOM card generation rendered right inside the page.

---

## 📝 Question Breakdown & Summary

| File | Question Title | Async Concepts Covered |
| :--- | :--- | :--- |
| **`question1.js`** | The Startup Morning: Async Coffee Maker | `Promise` construction, `.then()` chaining, random delay (`Math.random()`), `.catch()` error handling |
| **`question2.js`** | Task Scheduler: Micro vs Macro Challenge | JavaScript Event Loop, Call Stack, Microtask Queue vs Macrotask Queue priority |
| **`question3.js`** | Bug Tracker: Callback to Promise Migration | Refactoring callback patterns to Promises, `console.table()` display, rejection handling |
| **`question4.js`** | DevOps Delay: Async Timeout Race | `Promise.all()` (wait for all) vs `Promise.race()` (first responder), concurrent API simulation |
| **`question5.js`** | Frontend Rush: Avoiding Callback Hell | Callback Hell ("Pyramid of Doom") refactored into clean `async/await` |
| **`question6.js`** | E-Commerce Dashboard: Product Card Fetcher | `fetch()` API, `try/catch` error handling, formatting, Bonus DOM element rendering |
| **`question7.js`** | The Lazy Loader: Promise Combinator Practice | `Promise.allSettled()` handling partial failures without short-circuiting, timing with `Date.now()` |
| **`question8.js`** | Order Processing Flow: Async Retry Mechanism | Retrying flaky async calls up to 3 times using a loop + `await`, graceful final error handling |
| **`question9.js`** | Debugging the Event Loop | Prediction analysis, actual vs predicted comparison, deep Event Loop architectural guide |
| **`question10.js`** | The Final Delivery: Async Pipeline Debugger | 5-stage async pipeline using `async/await`, `try/catch`, short-circuiting on failure, flow control |

---

## 🔍 Key Concepts & Explanations

### Microtasks vs. Macrotasks (Q2 & Q9)
1. **Synchronous Code**: Runs immediately on the Call Stack.
2. **Microtasks (`Promise.then`, `queueMicrotask`)**: Once the Call Stack is empty, the Event Loop drains the **entire** Microtask Queue first before touching macrotasks.
3. **Macrotasks (`setTimeout`, `setInterval`)**: Processed only after all microtasks have resolved.

### Promise Combinators (Q4 & Q7)
- `Promise.all()`: Fails fast if any single promise rejects; resolves when all fulfill.
- `Promise.race()`: Resolves or rejects as soon as the first promise settles.
- `Promise.allSettled()`: Waits for every promise to settle, returning an array of objects describing each outcome (`{ status: "fulfilled", value }` or `{ status: "rejected", reason }`).
