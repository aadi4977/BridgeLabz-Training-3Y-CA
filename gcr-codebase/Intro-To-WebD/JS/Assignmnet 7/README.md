# JavaScript Assignment 7: Core DOM Manipulation Suite

This repository directory contains the complete solution set for **Assignment 7 (DOM Manipulation, Event Delegation, Capturing Phase, and Form Handling)**.

---

## 📁 Directory Structure

```text
Assignment 7/
├── index.html         # Master interactive browser dashboard for all 9 questions
├── question1.html     # Standalone demo for Question 1
├── question1.js       # Q1: Dynamic Product List Manager (Event Delegation & Auto-Save)
├── question2.html     # Standalone demo for Question 2
├── question2.js       # Q2: Live Character Counter with Warning & preventDefault()
├── question3.html     # Standalone demo for Question 3
├── question3.js       # Q3: Multi-Step Form with Next/Back & Step Validation
├── question4.html     # Standalone demo for Question 4
├── question4.js       # Q4: Theme Switcher Using setAttribute() Manipulation
├── question5.html     # Standalone demo for Question 5
├── question5.js       # Q5: Image Gallery with Modal Preview & stopPropagation()
├── question6.html     # Standalone demo for Question 6
├── question6.js       # Q6: Real-Time Table Filter Using input Event
├── question7.html     # Standalone demo for Question 7
├── question7.js       # Q7: Mouse Path & Coordinates Logger (400x400 Box)
├── question8.html     # Standalone demo for Question 8
├── question8.js       # Q8: Custom Dropdown without <select> (Capturing Phase)
├── question9.html     # Standalone demo for Question 9
├── question9.js       # Q9: Form Submit Blocker with preventDefault() & Live Errors
└── README.md          # Comprehensive assignment documentation
```

---

## 🚀 How to Run the Solutions

### Option 1: Running in Node.js (Terminal)
Every script contains a dual-environment runner. When run in Node.js, each script executes unit test simulations and logic verifications directly in the terminal:

```bash
# Navigate to the assignment folder
cd "Assignment 7"

# Run any question individually via Node.js
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

### Option 2: Running in the Browser (Interactive Dashboard & Standalone Pages)
1. Open `Assignment 7/index.html` in your browser (e.g., using VS Code **Live Server** extension or double-clicking the file).
2. The dashboard contains tabbed interactive previews for each question where you can test events, outside clicks, keyboard blockers, coordinate tracking, and themes.
3. You can also open any standalone page directly (e.g., `question1.html` through `question9.html`) to test individual questions in isolation.

---

## 📝 Detailed Question Breakdown

### [Q1. Dynamic Product List Manager](question1.js)
- **Concepts**: DOM Event Delegation, Inline Text Editing, Document Click Detection, Auto-Save.
- **Implementation**:
  - Attached a single click event listener on the parent `<ul>` element.
  - Used `event.target.closest("button[data-action]")` to intercept Edit and Delete actions dynamically for all items.
  - Edit mode replaces the text with an `<input>` element.
  - Attached an outside-click listener on `document` to auto-commit and save pending edits when clicking anywhere outside the active list item.

### [Q2. Live Character Counter with Warning Behavior](question2.js)
- **Concepts**: Textarea tracking, dynamic styling, warning thresholds, keyboard interception via `event.preventDefault()`.
- **Implementation**:
  - Tracks remaining characters out of a 100-character maximum.
  - Turns warning color **yellow** when remaining characters $\le 20$.
  - Turns **red** at $0$ remaining and prevents further character additions using `event.preventDefault()` on `keydown` while preserving navigation keys (Backspace, Delete, Arrows, Shortcuts).
  - "Reset" button clears the textarea and restores counter and default styles.

### [Q3. Multi-Step Form with Next/Back & Validation](question3.js)
- **Concepts**: Multi-step wizard state management, step validation, progressive disclosure.
- **Implementation**:
  - Step 1: Validates Name (non-empty, minimum 2 characters).
  - Step 2: Validates Email (standard format with `@` and domain).
  - Step 3: Validates Password (minimum 6 characters).
  - "Next" advances only if the current step passes validation.
  - "Back" allows returning to previous steps without data loss.
  - Completing all 3 steps presents a formatted summary view.

### [Q4. Theme Switcher Using Attribute Manipulation](question4.js)
- **Concepts**: DOM Attribute Manipulation (`setAttribute()`), Custom Data Attributes (`data-theme`), CSS variables.
- **Implementation**:
  - Supports 3 distinct themes: **Light**, **Dark**, and **Blue**.
  - All theme changes are applied strictly using `setAttribute()`:
    - `document.body.setAttribute('class', 'theme-' + theme)`
    - `document.body.setAttribute('data-theme', theme)`
  - Demonstrates CSS theme variable switching across components.

### [Q5. Image Gallery with Modal Preview](question5.js)
- **Concepts**: Responsive grid, Modal overlay, Event Bubbling, `event.stopPropagation()`.
- **Implementation**:
  - Renders a 6-item responsive image gallery.
  - Clicking any card opens a modal overlay showing an enlarged preview.
  - Clicking outside the modal (on the backdrop) closes the modal.
  - Applied `event.stopPropagation()` on the inner modal dialog container so clicks inside the modal do not propagate to the backdrop and close it.

### [Q6. Real-Time Table Filter Using input Event](question6.js)
- **Concepts**: Real-time reactive filtering, `input` event, Case-insensitive string search.
- **Implementation**:
  - Displays a table of student records with Name, Branch, and CGPA.
  - Listens to the `input` event on the search box for instant responsiveness.
  - Case-insensitive comparison checks all student attributes.
  - Only matching rows remain visible; displays a styled "No results found" placeholder when no rows match.

### [Q7. Detect Mouse Path & Coordinates Logger](question7.js)
- **Concepts**: Mouse Event Tracking (`mousemove`, `dblclick`), Coordinates math (`clientX`, `clientY`, `offsetX`, `offsetY`), Dynamic element creation.
- **Implementation**:
  - Sized at an exact `400px × 400px` interactive box container.
  - Tracks live mouse movements and displays live `clientX` and `clientY` coordinates.
  - On double-click inside, calculates click position and appends a red dot marker (`div.red-dot`).
  - Includes live dot counter and a "Clear All Dots" button.

### [Q8. Custom Dropdown Using Only JavaScript (No <select> Tag)](question8.js)
- **Concepts**: Custom UI components, DOM traversal, Event Capturing Phase (`useCapture: true`).
- **Implementation**:
  - Built entirely without the native `<select>` tag.
  - Toggle button shows and hides options menu.
  - Selecting an option updates the button label and closes the dropdown.
  - Outside click closing mechanism is registered in the **Capturing Phase**:
    `document.addEventListener("click", handleOutsideClick, true)`
    intercepting clicks top-down before bubbling.

### [Q9. Form Submit Blocker with preventDefault() and Live Errors](question9.js)
- **Concepts**: Form submission blocking, `event.preventDefault()`, live error clearance on correction.
- **Implementation**:
  - Form fields: Name (required), Email (required, must contain `@`), Password (min 6 chars).
  - Form submit handler calls `event.preventDefault()` to stop browser reload.
  - Displays inline error messages beneath each invalid field.
  - Listens to `input` events on all inputs to automatically remove errors the moment the input becomes valid.
  - Displays a final "🎉 Form Submitted Successfully!" confirmation banner when all fields are valid.

---

## 🛠️ Technologies Used
- **HTML5**: Semantic tags, accessible forms, responsive layouts.
- **CSS3**: Modern CSS Variables, Flexbox, CSS Grid, Transitions & Animations.
- **Core JavaScript (ES6+)**: Event Delegation, Capturing Phase, `stopPropagation()`, `preventDefault()`, `setAttribute()`.
- **Node.js**: Headless console test runners and validation simulations.
