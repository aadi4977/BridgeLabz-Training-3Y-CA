# JavaScript Assignment 3: ES Features, Scope & Debugging

This directory contains the complete solution set for **Assignment 3 (Lectures 7–10: JS ES Features, Scoping, Hoisting, Strict Mode & Debugging)**.

---

## 📁 Project Structure

```text
Assignment 3/
├── index.html         # Interactive browser dashboard runner for all questions
├── question1.js       # Q1: Dynamic Data Parser
├── question2.js       # Q2: Employee Bonus Calculator
├── question3.js       # Q3: Transaction Validator (Custom Error Classes)
├── question4.js       # Q4: Debugging Mystery ("use strict" & Scope Resolution)
├── question5.js       # Q5: Hoisting Lab: The Sequence Trap (TDZ & Arrow Functions)
├── question6.js       # Q6: Pyramid Pattern Generator (let vs var Scoping)
├── question7.js       # Q7: Smart Calculator (Switch & Custom Error Hierarchy)
├── question8.js       # Q8: Strict Mode Showdown (Sloppy vs Strict Mode Invariants)
├── question9.js       # Q9: JSON Audit Pipeline (Schema & Syntax Validation)
├── question10.js      # Q10: Nested Hoisting and Closures (Execution Contexts)
└── README.md          # Comprehensive assignment documentation
```

---

## 🚀 How to Run the Solutions

### Option 1: Running via Node.js (Terminal)
Every script is completely standalone and can be executed directly using Node.js:
```bash
# Navigate to the assignment folder
cd "Assignment 3"

# Run any question individually
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

### Option 2: Running in the Browser (Interactive Dashboard)
1. Open `Assignment 3/index.html` in your browser (e.g., using VS Code **Live Server** extension or by opening the file directly).
2. Click **Run All 10 Questions** or click any individual question button.
3. Observe output live in the interactive styled terminal console or press `F12` to view browser developer tools.

---

## 📝 Detailed Question Breakdown

### [Q1. Dynamic Data Parser](question1.js)
- **Concepts**: Explicit type coercion (`Number()`, `Boolean()`, `String()`), validation logic, array categorization.
- **Key Implementation**:
  - Differentiates between raw type coercion (where `Number(" ")` or `Number(null)` converts to `0`) and true API numeric validity.
  - Builds two arrays: `validNumericData` and `invalidData`.
  - Produces a detailed formatted table of all conversions and reasons for rejections.

### [Q2. Employee Bonus Calculator](question2.js)
- **Concepts**: Object property iteration, `try...catch` error handling, ES6 template literals, `"use strict"`.
- **Key Implementation**:
  - Validates employee schema for missing `name`, `salary`, or `years`.
  - Converts string numbers to numeric floats/integers safely.
  - Calculates bonus tier: `(salary * 0.1)` if `years > 3` else `(salary * 0.05)`.
  - Formats compensation summaries with Indian currency number formatting (`toLocaleString("en-IN")`).

### [Q3. Transaction Validator](question3.js)
- **Concepts**: Custom Error Classes extending `Error`, inheritance, error categorization, debugging breakpoints.
- **Key Implementation**:
  - Custom classes: `NullEntryError`, `MissingFieldError`, `NegativeAmountError`.
  - Categorizes records into `validTransactions` and `invalidTransactions`.
  - Includes debugging guide and watch expressions (`tx`, `validTransactions.length`, `invalidTransactions.length`).

### [Q4. Debugging Mystery](question4.js)
- **Concepts**: Strict mode `"use strict"` preventing undeclared globals, lexical scoping, VS Code Call Stack.
- **Key Implementation**:
  - Reproduces `ReferenceError: greeting is not defined`.
  - Fixes the bug with properly scoped `const greeting = "Welcome";`.
  - Explains the step-by-step Call Stack progression (`innerWorker` -> `debugDemonstration` -> `global`).

### [Q5. Hoisting Lab: The Sequence Trap](question5.js)
- **Concepts**: Variable Hoisting (`var`), Function Declarations vs Arrow Functions, Temporal Dead Zone (`let`/`const`).
- **Key Implementation**:
  - Predicts and proves the output: `undefined`, `"Game started"`, `"ready"`.
  - Documents memory creation phase vs code execution phase.
  - Compares behavior against arrow functions, highlighting how `const fn = () => {}` prevents early invocation via TDZ.

### [Q6. Pyramid Pattern Generator](question6.js)
- **Concepts**: Nested loops, block scope (`let`) vs function scope (`var`), variable re-use bugs, default function parameters.
- **Key Implementation**:
  - Generates asterisk pyramid with default height `limit = 5`.
  - Demonstrates the dangerous loop collision bug when nested loops share `var i`.
  - Shows how `"use strict"` prevents accidental undeclared loop variables.

### [Q7. Smart Calculator](question7.js)
- **Concepts**: `switch` dispatch, domain-specific arithmetic error handling, exception hierarchies.
- **Key Implementation**:
  - Throws `DivideByZeroError` when divisor is `0`.
  - Throws `NegativeRootError` when attempting even roots of negative numbers.
  - Throws `InvalidOperationError` for unsupported operations.
  - Outputs an audit summary table of all executions.

### [Q8. Strict Mode Showdown](question8.js)
- **Concepts**: Non-strict ("sloppy") mode vs Strict mode invariants, compiler optimizations.
- **Key Implementation**:
  - Compares 3 major restrictions:
    1. Duplicate parameter names `function demo(a, a)` -> `SyntaxError`.
    2. Undeclared assignments `total = 10` -> `ReferenceError`.
    3. Deleting unqualified identifiers `delete total` -> `SyntaxError`.
  - Implements a modern ES6 refactored version with proper scoping and object state.

### [Q9. JSON Audit Pipeline](question9.js)
- **Concepts**: `JSON.parse()`, `try...catch...finally` control flow, schema enforcement, data filtering.
- **Key Implementation**:
  - Traps and logs JSON syntax errors and missing schema keys (`user`, `age`) referencing line numbers.
  - Traces execution control flow (`try` -> `catch` -> `finally`).
  - Bonus task: normalizes age to `Number` and filters adult users (`age >= 18`).

### [Q10. Nested Hoisting and Closures](question10.js)
- **Concepts**: Nested Execution Contexts, Variable Shadowing, Lexical Closures, Call Stack Push/Pop.
- **Key Implementation**:
  - Explains why `count` outputs `undefined` inside `inner()` due to local `var count` hoisting shadowing outer's variable.
  - Compares arrow function conversions with local `var`, local `let` (TDZ), and pure lexical closure resolution (printing `5`).
  - Documents the complete Call Stack frame lifecycle.
