/**
 * ASSIGNMENT 5 - JAVASCRIPT FUNCTIONS & PROTOTYPES
 * Question 5: Prototypal Inheritance (Person -> Student)
 * 
 * Objective:
 * Create a Person constructor with property name. Then create a Student constructor
 * that inherits from Person and adds property branch. Add methods to print both
 * name and branch using prototypes. Demonstrate the prototype chain working.
 * 
 * Environment: Node.js & Browser Console
 */

"use strict";

console.log("====================================================================");
console.log("   ASSIGNMENT 5 - Q5: PROTOTYPAL INHERITANCE (Person -> Student)     ");
console.log("====================================================================\n");

// ====================================================================
// 1. Parent Constructor: Person
// ====================================================================

/**
 * Person Constructor
 * @param {string} name - Name of the person
 */
function Person(name) {
    this.name = name;
}

/**
 * Prototype method to print the person's name.
 */
Person.prototype.printName = function () {
    console.log(`[Person Prototype] Name: ${this.name}`);
    return this.name;
};

// ====================================================================
// 2. Child Constructor: Student
// ====================================================================

/**
 * Student Constructor inheriting from Person
 * @param {string} name - Name of the student
 * @param {string} branch - Academic major/branch
 */
function Student(name, branch) {
    // Call parent constructor to initialize 'name' on the student instance
    Person.call(this, name);
    this.branch = branch;
}

// ====================================================================
// 3. Establishing the Prototype Inheritance Chain
// ====================================================================

// Link Student.prototype to Person.prototype via Object.create
Student.prototype = Object.create(Person.prototype);

// Restore the constructor reference on Student.prototype (otherwise it points to Person)
Student.prototype.constructor = Student;

/**
 * Prototype method on Student to print the student's branch.
 */
Student.prototype.printBranch = function () {
    console.log(`[Student Prototype] Branch: ${this.branch}`);
    return this.branch;
};

/**
 * Additional method demonstrating accessing both own and inherited properties
 */
Student.prototype.printFullDetails = function () {
    console.log(`[Student Full Details] Student: ${this.name} | Specialization: ${this.branch}`);
};

// ====================================================================
// 4. Demonstration & Method Calls
// ====================================================================

console.log("--- Creating an instance of Student ---");
const student1 = new Student("Aaditya Gupta", "Computer Science & Engineering");

console.log("\nInvoking printName() [inherited from Person.prototype]:");
student1.printName();

console.log("\nInvoking printBranch() [defined on Student.prototype]:");
student1.printBranch();

console.log("\nInvoking printFullDetails():");
student1.printFullDetails();

// ====================================================================
// 5. Demonstrating and Verifying the Prototype Chain
// ====================================================================

console.log("\n====================================================================");
console.log("                 PROTOTYPE CHAIN VERIFICATION                       ");
console.log("====================================================================\n");

// Checking 'instanceof' up the prototype hierarchy
console.log("instanceof Checks:");
console.log(`- student1 instanceof Student : ${student1 instanceof Student}`); // true
console.log(`- student1 instanceof Person  : ${student1 instanceof Person}`);  // true
console.log(`- student1 instanceof Object  : ${student1 instanceof Object}`);  // true

// Inspecting __proto__ / Object.getPrototypeOf chain
const protoLevel1 = Object.getPrototypeOf(student1);
const protoLevel2 = Object.getPrototypeOf(protoLevel1);
const protoLevel3 = Object.getPrototypeOf(protoLevel2);
const protoLevel4 = Object.getPrototypeOf(protoLevel3);

console.log("\nPrototype Chain Traversal:");
console.log("Level 1 (student1 -> Student.prototype)        :", protoLevel1 === Student.prototype); // true
console.log("Level 2 (Student.prototype -> Person.prototype):", protoLevel2 === Person.prototype);  // true
console.log("Level 3 (Person.prototype -> Object.prototype) :", protoLevel3 === Object.prototype);  // true
console.log("Level 4 (Object.prototype -> null)             :", protoLevel4 === null);              // true

console.log(`
Visual Prototype Chain:
┌────────────────────────┐
│ student1               │  Properties: name: "Aaditya Gupta", branch: "Computer Science..."
│   [[Prototype]] ───────┼───► ┌────────────────────────┐
└────────────────────────┘     │ Student.prototype      │  Methods: printBranch(), printFullDetails()
                               │   [[Prototype]] ───────┼───► ┌────────────────────────┐
                               └────────────────────────┘     │ Person.prototype       │  Methods: printName()
                                                              │   [[Prototype]] ───────┼───► ┌────────────────────────┐
                                                              └────────────────────────┘     │ Object.prototype       │  Methods: toString(), ...
                                                                                             │   [[Prototype]] ───────┼───► null
                                                                                             └────────────────────────┘
`);

// Export for module systems (Node.js) if required
if (typeof module !== "undefined" && module.exports) {
    module.exports = { Person, Student, student1 };
}
