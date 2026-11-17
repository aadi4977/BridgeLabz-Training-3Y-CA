# Assignment 5: JavaScript Functions & Prototypes

This directory contains the complete solutions for **Assignment 5 (JavaScript Functions, Callbacks, 'this' Binding, Closures, Prototypal Inheritance, and ES6 Classes)**.

Each question is solved in its own standalone, fully-commented JavaScript file adhering strictly to ES6+ best practices, strict mode (`"use strict"`), defensive input checking, and modular architecture.

---

## 📁 Directory Structure

```text
Assignment 5/
├── index.html        # Interactive HTML test dashboard with live in-browser terminal runner
├── README.md         # Comprehensive documentation, questions, and concept explanations
├── question1.js      # Q1: Callback Flow Control (greetUser & showEndMessage)
├── question2.js      # Q2: Higher-Order Functions (applyOperation: double & square)
├── question3.js      # Q3: 'this' Binding in Arrow vs Normal Functions (Lexical scope fix)
├── question4.js      # Q4: Constructor Functions & Prototype Sharing (Car & getDetails)
├── question5.js      # Q5: Prototypal Inheritance (Person -> Student using Object.create)
├── question6.js      # Q6: Multi-Level Prototype Chain (Person -> Faculty -> Professor)
├── question7.js      # Q7: Closures & Factory Functions (makeMultiplier & triple(5) = 15)
├── question8.js      # Q8: Custom Array Prototype Method (Array.prototype.myMap polyfill)
└── question9.js      # Q9: ES6 Classes (extends & super) vs Prototypal Inheritance Parity
```

---

## 📋 Questions & Implementation Summary

### 🔹 Question 1: Callback Functions & Flow Control
- **File:** `question1.js`
- **Objective:** Write `greetUser(name, callback)` that prints `"Hello <name>"` and then executes `showEndMessage()` printing `"Welcome to the course!"`.
- **Key Concepts:** Higher-order functions, first-class functions, callback execution lifecycle, defensive parameter validation.

### 🔹 Question 2: Higher-Order Function (`applyOperation`)
- **File:** `question2.js`
- **Objective:** Create `applyOperation(numbers, operation)` taking an array and callback. Use it to:
  - Double each number in `[1, 2, 3, 4]` $\rightarrow$ `[2, 4, 6, 8]`
  - Square each number in `[1, 2, 3, 4]` $\rightarrow$ `[1, 4, 9, 16]`
- **Key Concepts:** Immutability, pure transformation functions, passing `(element, index, array)` arguments.

### 🔹 Question 3: `'this'` Binding in Arrow vs Normal Functions
- **File:** `question3.js`
- **Objective:** Create object `user` with property `name` and arrow method `showName`. Explain why `this.name` is `undefined`, then fix using a normal function.
- **Key Concepts:**
  - Arrow functions have no `this` binding; they capture `this` lexically from their enclosing scope.
  - Object literals `{}` do not create a lexical scope.
  - Fix: Using standard method syntax / function expression where `this` binds dynamically to the calling object.

### 🔹 Question 4: Constructor Functions & Prototype Method Sharing
- **File:** `question4.js`
- **Objective:** Create constructor `Car(brand, model)` and prototype method `getDetails()`. Demonstrate method sharing across multiple car instances.
- **Key Concepts:** Memory efficiency of `[[Prototype]]` vs in-constructor closures, checking `car1.getDetails === car2.getDetails` (`true`), `hasOwnProperty` vs prototype lookup.

### 🔹 Question 5: Prototypal Inheritance (`Person` $\rightarrow$ `Student`)
- **File:** `question5.js`
- **Objective:** Create `Person(name)` and `Student(name, branch)` inheriting from `Person`. Add methods via prototypes and demonstrate prototype chain.
- **Key Concepts:** Constructor borrowing via `Person.call(this, name)`, prototype linkage via `Object.create(Person.prototype)`, constructor resetting `Student.prototype.constructor = Student`.

### 🔹 Question 6: Multi-Level Prototype Chain (`Person` $\rightarrow$ `Faculty` $\rightarrow$ `Professor`)
- **File:** `question6.js`
- **Objective:** Build a 3-level prototype chain where each level adds properties and methods. Show how a `Professor` instance accesses methods up the entire chain.
- **Key Concepts:** Deep prototypal inheritance, method resolution order (own $\rightarrow$ Professor $\rightarrow$ Faculty $\rightarrow$ Person $\rightarrow$ Object $\rightarrow$ null), `instanceof` across ancestors.

### 🔹 Question 7: Closures & Factory Functions (`makeMultiplier`)
- **File:** `question7.js`
- **Objective:** Write `makeMultiplier(multiplier)` returning a function. Demonstrate `triple = makeMultiplier(3); triple(5); // 15` and explain closure mechanics.
- **Key Concepts:** Lexical scoping, Environment Records, heap preservation of outer function scope after call stack exit, factory functions.

### 🔹 Question 8: Custom Array Prototype Method (`Array.prototype.myMap`)
- **File:** `question8.js`
- **Objective:** Implement custom `myMap()` on `Array.prototype` matching native `map()` behavior.
  - `[1, 2, 3].myMap(num => num * 2); // [2, 4, 6]`
- **Key Concepts:** Non-enumerable properties using `Object.defineProperty` (preventing `for...in` pollution), handling sparse arrays, supporting `thisArg`, throwing `TypeError` for invalid callbacks.

### 🔹 Question 9: ES6 Classes (`extends` & `super`) vs Prototypal Inheritance
- **File:** `question9.js`
- **Objective:** Rewrite Person $\rightarrow$ Student using ES6 `class`, `extends`, and `super()`. Prove both approaches exhibit identical runtime behavior.
- **Key Concepts:** Syntactic sugar breakdown, how `super()` maps to `Person.call(this, ...)`, prototype verification, class guardrails (strict mode, requirement of `new` keyword).

---

## 🚀 Running the Solutions

### Option 1: Running in Node.js (Terminal)

You can run individual questions directly with Node.js:

```bash
# Navigate to this directory
cd "Assignment 5"

# Run any question:
node question1.js
node question2.js
node question3.js
node question4.js
node question5.js
node question6.js
node question7.js
node question8.js
node question9.js
```

### Option 2: Running in Browser

Open `index.html` in your web browser or use VS Code Live Server:
1. Right-click `index.html` in VS Code and select **Open with Live Server** (or open the file in Chrome/Edge/Firefox).
2. Click **Run All Questions** or execute individual questions using the respective buttons.
3. Observe live output directly inside the styled web terminal and browser DevTools Console (`F12`).
