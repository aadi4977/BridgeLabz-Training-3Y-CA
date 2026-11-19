# Assignment 8: Object-Oriented Programming (OOP) & Array Pipelines in JavaScript

This directory contains complete, industry-standard solutions for **Assignment 8 (OOP & Functional Array Methods in JavaScript)** based on `"Submission of OOP.pdf"`.

Each question is solved in an independent, self-contained file with comprehensive error handling, modular ES6+ classes/constructors, JSDoc annotations, and descriptive test runs.

---

## 📁 Directory Structure

```text
Assignment 8/
├── index.html        # Interactive browser test runner with visual dark-themed terminals
├── README.md         # Comprehensive documentation & execution guide
├── question1.js      # Q1: Student Result Processing (reduce + Classes)
├── question2.js      # Q2: Online Food Ordering (map + Error Handling)
├── question3.js      # Q3: Product Discount System (Constructor Function & Abstraction)
├── question4.js      # Q4: Employee Inheritance & Runtime Polymorphism
├── question5.js      # Q5: Ride-Sharing Application (Inheritance & Error Handling)
├── question6.js      # Q6: E-Commerce Inventory System (filter, sort, reduce, groupBy)
├── question7.js      # Q7: Banking Application (Encapsulation with Private Fields #balance)
├── question8.js      # Q8: Movie Ticket Booking System (Prototype Chain Demonstration)
└── question9.js      # Q9: Fitness App Analytics (Classes, Array Processing & Validations)
```

---

## 🚀 How to Run the Solutions

### Option 1: Running with Node.js in Terminal (Recommended)

Run any question directly from your terminal:

```bash
# Navigate to Assignment 8 folder
cd "Assignment 8"

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
```

### Option 2: Running via VS Code Live Server / Browser

Open `index.html` in your browser:
- Click **"Run All Questions"** to execute all demonstrations in parallel.
- Click individual **"Run QX"** buttons to run specific questions.
- View structured outputs and error handling in interactive terminal windows.

---

## 📋 Detailed Question Overview & OOP Concepts Demonstrated

### **Q1. Student Result Processing (`question1.js`)**
- **OOP / Functional Concept**: ES6 Classes, Accumulation with `Array.prototype.reduce()`.
- **Implementation**:
  - Class `Student` with `name` and `marks[]`.
  - `calculateAverage()` uses `reduce()` to sum scores and returns the numerical average.
  - `getGrade()` assigns grades based on average:
    - **A**: $\ge 90$
    - **B**: $75 - 89.99$
    - **C**: $50 - 74.99$
    - **F**: $< 50$
  - Tested across 4 student profiles including failing and passing grades.

### **Q2. Online Food Ordering (`question2.js`)**
- **OOP / Functional Concept**: Transformation with `map()`, aggregation with `reduce()`, Custom Error Throwing & `try/catch`.
- **Implementation**:
  - `calculateBill(orderItems)` maps ordered items against a menu catalog to retrieve unit prices and calculate sub-totals.
  - Computes total bill using `reduce()`.
  - Throws descriptive errors if an item is not found or has an invalid quantity.
  - Demonstrates `try/catch` wrapping for safe user-facing message logging.

### **Q3. Product Discount System (`question3.js`)**
- **OOP Concept**: Constructor Functions, Prototypes, and **Abstraction**.
- **Implementation**:
  - `Product(name, price)` constructor function.
  - Prototype method `Product.prototype.applyDiscount(percent)` returning the new discounted price.
  - Tested with 3 products applying different percentage discounts.
  - Demonstrates **Abstraction** by hiding the underlying calculation, rounding logic, and boundary validations behind a simple, intuitive public method.

### **Q4. Employee Inheritance (`question4.js`)**
- **OOP Concept**: Classical Inheritance (`extends`, `super()`), Method Overriding & **Runtime Polymorphism**.
- **Implementation**:
  - Base class `Employee(name, department)` with `.work()` method.
  - Subclass `Manager(name, department, teamSize)` overriding `.work()`.
  - Demonstrates **Runtime Polymorphism** by iterating a heterogeneous collection of `Employee` and `Manager` instances and executing `.work()`, with JavaScript dynamically resolving the appropriate method implementation at runtime.

### **Q5. Ride-Sharing Application (`question5.js`)**
- **OOP Concept**: Multi-level Domain Modeling, Inheritance (`User` ➔ `Driver`), Error Handling.
- **Implementation**:
  - Classes: `User(name, rating)`, `Driver(name, rating, vehicleDetails)`, `Trip(fromLocation, toLocation, distance)`.
  - `Trip.prototype.calculateFare()` method validates `distance` and throws errors for negative, missing, or non-numeric inputs.
  - Uses `try/catch` to display clear user-friendly notifications for valid commutes and error conditions.

### **Q6. E-Commerce Inventory System (`question6.js`)**
- **Functional Concept**: Array Pipeline Combinations (`filter()`, `sort()`, `reduce()`, Object Grouping).
- **Implementation**:
  - Multi-category product dataset (`{ id, name, category, price, stock }`).
  - 1. `getLowStockProducts()`: Filters items where `stock <= threshold` using `filter()`.
  - 2. `sortProductsByPrice()`: Non-mutating price sorting using `sort()`.
  - 3. `calculateTotalInventoryValue()`: Computes total asset valuation using `reduce()`.
  - 4. `groupByCategory()`: Groups items by category dictionary using `reduce()`.

### **Q7. Banking Application (`question7.js`)**
- **OOP Concept**: **Encapsulation** using ES2022 Private Fields (`#balance`).
- **Implementation**:
  - `BankAccount` class with private `#balance` and private `#accountNumber`.
  - Public getter `getBalance()` providing read-only access.
  - `deposit(amount)` adds funds with positive amount validation.
  - `withdraw(amount)` verifies sufficient balance, throwing an error on overdraft.
  - Demonstrates that external direct access to `#balance` is blocked at syntax/runtime level.

### **Q8. Movie Ticket Booking System (`question8.js`)**
- **OOP Concept**: Prototype Chain Traversal & Inheritance.
- **Implementation**:
  - Base class `MovieTicket(movieName, seatNo, price)`.
  - Subclass `OnlineTicket` adding `convenienceFee` and `getTotalAmount()`.
  - Method `printTicket()` attached directly to `MovieTicket.prototype`.
  - Demonstrates that calling `ticket.printTicket()` on an `OnlineTicket` instance successfully resolves up the prototype chain (`OnlineTicket.prototype` ➔ `MovieTicket.prototype` ➔ `Object.prototype`).

### **Q9. Fitness App Analytics (`question9.js`)**
- **OOP / Functional Concept**: Data Analytics Pipeline within Classes, Dataset Validation.
- **Implementation**:
  - Class `FitnessAnalytics` initialized with user workout data (`[{ user, steps, calories }]`).
  - `getActiveUsers()`: Filters users with `steps > 7000` via `filter()`.
  - `getAverageCalories()`: Computes average calories burned via `reduce()`.
  - `getUserSummary()`: Formats summary strings via `map()`.
  - Robust error handling: Throws an explicit error if the dataset is empty, tested via `try/catch`.

---

## 👨‍💻 Author
- Repository: [BridgeLabz-Training-3Y-CA](https://github.com/aadi4977/BridgeLabz-Training-3Y-CA)
- Branch: `html-practice`
