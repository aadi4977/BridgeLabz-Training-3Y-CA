/**
 * ASSIGNMENT 5 - JAVASCRIPT FUNCTIONS & PROTOTYPES
 * Question 6: Multi-Level Prototype Chain (Person -> Faculty -> Professor)
 * 
 * Objective:
 * Create a prototype chain using constructor functions:
 *   ● Person -> Faculty -> Professor
 * Each should have its own property and method.
 * Show how a Professor object can access all methods up the chain.
 * 
 * Environment: Node.js & Browser Console
 */

"use strict";

console.log("====================================================================");
console.log("  ASSIGNMENT 5 - Q6: MULTI-LEVEL PROTOTYPE CHAIN INHERITANCE        ");
console.log("====================================================================\n");

// ====================================================================
// Level 1: Person (Base Constructor)
// ====================================================================

function Person(name) {
    this.name = name;
}

Person.prototype.getPersonInfo = function () {
    const msg = `[Person Method] Name: ${this.name}`;
    console.log(msg);
    return msg;
};

// ====================================================================
// Level 2: Faculty (Intermediate Constructor inheriting from Person)
// ====================================================================

function Faculty(name, department) {
    // Steal/borrow constructor from Person
    Person.call(this, name);
    this.department = department;
}

// Link Faculty prototype to Person prototype
Faculty.prototype = Object.create(Person.prototype);
Faculty.prototype.constructor = Faculty;

Faculty.prototype.getFacultyInfo = function () {
    const msg = `[Faculty Method] Department: ${this.department}`;
    console.log(msg);
    return msg;
};

// ====================================================================
// Level 3: Professor (Derived Constructor inheriting from Faculty)
// ====================================================================

function Professor(name, department, researchArea) {
    // Steal/borrow constructor from Faculty
    Faculty.call(this, name, department);
    this.researchArea = researchArea;
}

// Link Professor prototype to Faculty prototype
Professor.prototype = Object.create(Faculty.prototype);
Professor.prototype.constructor = Professor;

Professor.prototype.getProfessorInfo = function () {
    const msg = `[Professor Method] Research Area: ${this.researchArea}`;
    console.log(msg);
    return msg;
};

// Bonus composite method utilizing all levels
Professor.prototype.getFullAcademicProfile = function () {
    const summary = `Academic Profile: Prof. ${this.name} | Dept: ${this.department} | Research: ${this.researchArea}`;
    console.log(`[Summary] ${summary}`);
    return summary;
};

// ====================================================================
// Demonstration: Instantiating Professor and Calling All Methods
// ====================================================================

console.log("--- Creating a Professor Instance ---");
const prof = new Professor(
    "Dr. Alan Turing",
    "Computer Science and Engineering",
    "Machine Intelligence & Theoretical Computation"
);

console.log("\n--- Calling Methods Across the Entire Prototype Chain ---");

// 1. Calling method defined on Professor.prototype (Immediate Level)
console.log("\n1. Calling Professor.prototype method:");
prof.getProfessorInfo();

// 2. Calling method defined on Faculty.prototype (Parent Level)
console.log("\n2. Calling Faculty.prototype method (Inherited 1 level up):");
prof.getFacultyInfo();

// 3. Calling method defined on Person.prototype (Grandparent Level)
console.log("\n3. Calling Person.prototype method (Inherited 2 levels up):");
prof.getPersonInfo();

// 4. Calling method defined on Object.prototype (Root Level)
console.log("\n4. Calling Object.prototype method (Inherited 3 levels up):");
console.log("prof.hasOwnProperty('researchArea') :", prof.hasOwnProperty("researchArea")); // true
console.log("prof.hasOwnProperty('getPersonInfo') :", prof.hasOwnProperty("getPersonInfo")); // false (lives on prototype)

// 5. Calling composite profile
console.log("\n5. Composite method:");
prof.getFullAcademicProfile();

// ====================================================================
// Prototype Chain Verification & Diagram
// ====================================================================

console.log("\n====================================================================");
console.log("                 PROTOTYPE CHAIN VALIDATION & PROOF                 ");
console.log("====================================================================\n");

console.log("instanceof Verification:");
console.log(`- prof instanceof Professor : ${prof instanceof Professor}`); // true
console.log(`- prof instanceof Faculty   : ${prof instanceof Faculty}`);   // true
console.log(`- prof instanceof Person    : ${prof instanceof Person}`);    // true
console.log(`- prof instanceof Object    : ${prof instanceof Object}`);    // true

console.log("\nStep-by-step __proto__ inspection:");
const step1 = Object.getPrototypeOf(prof);
const step2 = Object.getPrototypeOf(step1);
const step3 = Object.getPrototypeOf(step2);
const step4 = Object.getPrototypeOf(step3);
const step5 = Object.getPrototypeOf(step4);

console.log("prof -> Professor.prototype :", step1 === Professor.prototype); // true
console.log("Professor.prototype -> Faculty.prototype :", step2 === Faculty.prototype); // true
console.log("Faculty.prototype -> Person.prototype   :", step3 === Person.prototype); // true
console.log("Person.prototype -> Object.prototype    :", step4 === Object.prototype); // true
console.log("Object.prototype -> null                :", step5 === null);             // true

console.log(`
Prototype Resolution Hierarchy:
  [prof Object]
      │
      ▼
  [Professor.prototype]  -> owns getProfessorInfo()
      │
      ▼
  [Faculty.prototype]    -> owns getFacultyInfo()
      │
      ▼
  [Person.prototype]     -> owns getPersonInfo()
      │
      ▼
  [Object.prototype]     -> owns hasOwnProperty(), toString()
      │
      ▼
    null (end of prototype chain)
`);

// Export for module systems (Node.js) if required
if (typeof module !== "undefined" && module.exports) {
    module.exports = { Person, Faculty, Professor, prof };
}
