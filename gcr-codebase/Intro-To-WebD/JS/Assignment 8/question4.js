/**
 * ASSIGNMENT 8 - QUESTION 4
 * Topic: Employee Inheritance & Runtime Polymorphism
 * 
 * Objective:
 * Create classes Employee and Manager.
 *   - Employee -> properties: name, department
 *   - Manager -> inherits Employee and overrides a work() method
 * Create objects and show runtime polymorphism.
 */

"use strict";

console.log("====================================================================");
console.log("        Q4: EMPLOYEE INHERITANCE & RUNTIME POLYMORPHISM             ");
console.log("====================================================================\n");

/**
 * Base Employee class.
 */
class Employee {
  /**
   * @param {string} name - Employee's full name
   * @param {string} department - Department name
   */
  constructor(name, department) {
    if (!name || typeof name !== "string") {
      throw new Error("Employee name must be a valid string.");
    }
    if (!department || typeof department !== "string") {
      throw new Error("Department must be a valid string.");
    }

    this.name = name;
    this.department = department;
  }

  /**
   * Base work method for general employee tasks.
   * @returns {string} Description of the work done
   */
  work() {
    return `${this.name} is executing core operational tasks in the ${this.department} department.`;
  }

  /**
   * Returns details of the employee.
   * @returns {string} Formatted string
   */
  getDetails() {
    return `[Role: Employee] Name: ${this.name} | Dept: ${this.department}`;
  }
}

/**
 * Derived Manager class inheriting from Employee.
 */
class Manager extends Employee {
  /**
   * @param {string} name - Manager's full name
   * @param {string} department - Managed department
   * @param {number} teamSize - Number of direct reports
   */
  constructor(name, department, teamSize = 5) {
    // Invoke parent constructor using super()
    super(name, department);

    if (typeof teamSize !== "number" || teamSize <= 0) {
      throw new Error("Team size must be a positive number.");
    }

    this.teamSize = teamSize;
  }

  /**
   * Overridden work() method specifically tailored for managerial roles.
   * Demonstrates Method Overriding in ES6 Classes.
   * @override
   * @returns {string} Description of the managerial work
   */
  work() {
    return `${this.name} is leading a team of ${this.teamSize} members in ${this.department}, conducting reviews and driving strategy.`;
  }

  /**
   * Manager-specific method.
   * @returns {string} Formatted string
   */
  conductMeeting() {
    return `${this.name} scheduled a weekly sprint review for the ${this.department} team.`;
  }
}

// ==========================================
// DEMONSTRATION: OBJECT CREATION & RUNTIME POLYMORPHISM
// ==========================================

console.log("--- Creating Employee & Manager Objects ---\n");

const emp1 = new Employee("Vikram Aditya", "Software Development");
const emp2 = new Employee("Ananya Roy", "Quality Assurance");
const mgr1 = new Manager("Rajesh Sharma", "Engineering", 12);
const mgr2 = new Manager("Sneha Kapoor", "Human Resources", 6);

console.log("Individual object details:");
console.log(emp1.getDetails());
console.log(emp2.getDetails());
console.log(`[Role: Manager] Name: ${mgr1.name} | Dept: ${mgr1.department} | Team: ${mgr1.teamSize}`);
console.log(`[Role: Manager] Name: ${mgr2.name} | Dept: ${mgr2.department} | Team: ${mgr2.teamSize}`);

console.log("\n====================================================================");
console.log("             DEMONSTRATING RUNTIME POLYMORPHISM                     ");
console.log("====================================================================\n");

/**
 * Polymorphic Demonstration:
 * We store instances of both Employee and Manager in a single polymorphic collection.
 * When we iterate and call staff.work(), JavaScript dynamically resolves which
 * work() method to invoke at runtime based on the actual object instance type,
 * without needing conditionals (if/else or switch).
 */
const staffMembers = [emp1, mgr1, emp2, mgr2];

staffMembers.forEach((staff, index) => {
  console.log(`[Item ${index + 1}] Invoking .work() on instance of ${staff.constructor.name}:`);
  console.log(`  -> ${staff.work()}\n`);
});

// Prototype inspection to verify inheritance hierarchy
console.log("--- Prototype Chain Verification ---");
console.log(`mgr1 instanceof Manager  : ${mgr1 instanceof Manager}`);   // true
console.log(`mgr1 instanceof Employee : ${mgr1 instanceof Employee}`);  // true
console.log(`emp1 instanceof Manager  : ${emp1 instanceof Manager}`);   // false
console.log(`emp1 instanceof Employee : ${emp1 instanceof Employee}`);  // true

// Export for Node and browser
if (typeof module !== "undefined" && module.exports) {
  module.exports = { Employee, Manager };
}
