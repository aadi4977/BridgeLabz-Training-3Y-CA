# JavaScript Assignment 4: Classes, Objects, Forms & RegExp

This directory contains the complete solution set for **Assignment 4 (JavaScript Classes, Objects, Dynamic Form Builders, and Regular Expressions)**.

---

## 📁 Project Structure

```text
Assignment 4/
├── index.html         # Interactive browser dashboard & runner for all 9 questions
├── question1.js       # Q1: E-Commerce Product Manager (Classes + Objects)
├── question2.js       # Q2: Student Form Validator (Forms + RegExp)
├── question3.js       # Q3: Library Management System (Classes + Objects)
├── question4.js       # Q4: Custom Form Builder (Forms + Classes)
├── question5.js       # Q5: Movie Ticket Booking (Objects + RegExp)
├── question6.js       # Q6: Employee Management System (Classes + Methods)
├── question7.js       # Q7: Login Form Validation using RegExp
├── question8.js       # Q8: Dynamic Object Updater (DOM + Objects)
├── question9.js       # Q9: Shopping Cart Total (Classes + RegExp for Coupon)
└── README.md          # Comprehensive assignment documentation
```

---

## 🚀 How to Run the Solutions

### Option 1: Running via Node.js (Terminal)
Every script is completely standalone and can be executed directly using Node.js:

```bash
# Navigate to the assignment folder
cd "Assignment 4"

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
```

### Option 2: Running in the Browser (Interactive Dashboard)
1. Open `Assignment 4/index.html` in your browser (e.g., using VS Code **Live Server** extension or by double-clicking the file).
2. The dashboard offers two views:
   - **Terminal & Script Runner**: Click **Run All 9 Questions** or any individual question card to see the terminal output stream live into a styled console window.
   - **Live Interactive Widgets**: Test the real-time form validators, movie booking ticket generator, dynamic form builder, object updater, and shopping cart coupon application directly in the browser.

---

## 📝 Detailed Question Breakdown

### [Q1. E-Commerce Product Manager](question1.js)
- **Concepts**: ES6 `class`, constructor functions, instance methods, and `Array.prototype.filter()`.
- **Implementation**:
  - `Product` class with `id`, `name`, `price`, and `category`.
  - `applyDiscount(discountPercent)`: calculates discount amount and updates product price.
  - `displayDetails()`: returns a formatted string representation with padding and discount history.
  - Filters and displays premium products where `price > 1000`.

### [Q2. Student Form Validator](question2.js)
- **Concepts**: Regular expressions (`RegExp`), input validation, form events (`input`, `blur`, `submit`), and visual UI feedback.
- **Validation Rules**:
  - **Name**: Only alphabets (`/^[A-Za-z]+(?: [A-Za-z]+)*$/`).
  - **Email**: Standard RFC-compliant email structure (`/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/`).
  - **Phone**: Exactly 10 digits (`/^\d{10}$/`).
  - **Password**: Must contain at least 1 uppercase letter, 1 number, and 1 special character.
- **Feedback**: Applies a green border for valid inputs and a red border with error text for invalid inputs.

### [Q3. Library Management System](question3.js)
- **Concepts**: Object-oriented design, book inventory tracking, state transitions (`isIssued`), and searching arrays.
- **Implementation**:
  - `Book` class with properties `title`, `author`, `isbn`, and `isIssued`.
  - Methods `issueBook()` and `returnBook()` managing checkout availability.
  - `Library` manager maintaining the book catalog.
  - Filter logic displaying all currently available (unissued) books.
  - ISBN search functionality to find and issue specific books.

### [Q4. Custom Form Builder](question4.js)
- **Concepts**: Dynamic DOM generation via `innerHTML`, component-based class abstraction, and form data collection.
- **Implementation**:
  - `FormBuilder` class that receives an array of field configuration objects (`type`, `label`, `name`, `placeholder`, `required`).
  - Dynamically constructs HTML form markup and mounts it into a DOM container.
  - `getFormData()` method that queries input elements inside the generated form and returns all entered values as an object upon submission.

### [Q5. Movie Ticket Booking](question5.js)
- **Concepts**: RegExp validation, data sanitation, object creation, and receipt formatting.
- **Validation Rules**:
  - **Name**: Alphabets only.
  - **Email**: Valid email pattern.
  - **Seats**: Integer between 1 and 10 only (`/^(?:[1-9]|10)$/`).
- **Post-Validation**:
  - Packages confirmed booking into `{ name, email, seats, bookingId, totalPrice, timestamp }`.
  - Displays a cinema pass receipt in both console and interactive UI.

### [Q6. Employee Management System](question6.js)
- **Concepts**: Classes, financial calculations, object arrays, and `Array.prototype.reduce()`.
- **Implementation**:
  - `Employee` class with properties `id`, `name`, `department`, and `salary` (monthly base).
  - `getAnnualSalary()` calculating 12 months base payout.
  - `applyBonus(percent)` computing performance bonuses.
  - Instantiates 5 employees and uses `reduce()` to aggregate:
    1. Total base annual payroll payout.
    2. Total company payout including performance bonuses.

### [Q7. Login Form Validation using RegExp](question7.js)
- **Concepts**: Granular regex checks, security constraints, and descriptive validation feedback.
- **Validation Rules**:
  - **Username**: At least 5 characters (`/^.{5,}$/`).
  - **Password**: At least 8 characters, must include lowercase, uppercase, numeric digit, and special character.
- **Feedback**:
  - Displays green success banner when validation passes.
  - Displays an itemized list of failed constraints when validation fails.

### [Q8. Dynamic Object Updater](question8.js)
- **Concepts**: In-memory JavaScript object mutation, two-way form data binding, and live DOM rendering.
- **Implementation**:
  - Initial user object: `user = { name: "John", email: "john@mail.com", age: 21 }`.
  - Form pre-populated with current object state.
  - Real-time mutation of properties upon form submission.
  - Live card display dynamically updated via DOM to reflect memory state.

### [Q9. Shopping Cart Total](question9.js)
- **Concepts**: E-commerce cart logic, quantity tracking, subtotal aggregation, and coupon validation via RegExp.
- **Implementation**:
  - `Cart` and `CartItem` classes.
  - `addItem(name, price, quantity)` and `getTotal()` subtotal calculation.
  - RegExp coupon validator (`/^(SAVE|DISC)(\d{1,2})$/i`):
    - Validates prefix (`SAVE` or `DISC`) and extracts numeric discount percentage (e.g., `SAVE20` -> 20%, `DISC10` -> 10%).
    - Rejects invalid formats with descriptive warnings.
    - Calculates discounted total and prints itemized receipt.
