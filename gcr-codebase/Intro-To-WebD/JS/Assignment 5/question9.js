/**
 * ASSIGNMENT 5 - JAVASCRIPT FUNCTIONS & PROTOTYPES
 * Question 9: ES6 Classes (extends & super) vs Prototypal Inheritance
 * 
 * Objective:
 * Rewrite your Person -> Student inheritance example using ES6 classes with extends and super().
 * Show that both class and prototype versions behave the same.
 * 
 * Environment: Node.js & Browser Console
 */

"use strict";

console.log("====================================================================");
console.log("   ASSIGNMENT 5 - Q9: ES6 CLASSES (extends & super) VS PROTOTYPES   ");
console.log("====================================================================\n");

// ====================================================================
// Approach 1: ES5 Constructor Function & Prototypal Inheritance (from Q5)
// ====================================================================

function PersonProto(name) {
    this.name = name;
}
PersonProto.prototype.printName = function () {
    console.log(`[ES5 Proto] Name: ${this.name}`);
    return this.name;
};

function StudentProto(name, branch) {
    PersonProto.call(this, name); // Super constructor call
    this.branch = branch;
}
// Set up prototype chain
StudentProto.prototype = Object.create(PersonProto.prototype);
StudentProto.prototype.constructor = StudentProto;

StudentProto.prototype.printBranch = function () {
    console.log(`[ES5 Proto] Branch: ${this.branch}`);
    return this.branch;
};

// ====================================================================
// Approach 2: ES6 Class Syntax (extends & super)
// ====================================================================

class PersonClass {
    constructor(name) {
        this.name = name;
    }

    printName() {
        console.log(`[ES6 Class] Name: ${this.name}`);
        return this.name;
    }
}

class StudentClass extends PersonClass {
    constructor(name, branch) {
        super(name); // Invokes PersonClass constructor with 'this'
        this.branch = branch;
    }

    printBranch() {
        console.log(`[ES6 Class] Branch: ${this.branch}`);
        return this.branch;
    }
}

// ====================================================================
// Demonstration: Side-by-Side Execution
// ====================================================================

console.log("--- 1. Creating Instances ---");
const protoStudent = new StudentProto("Aaditya Gupta", "Computer Science");
const classStudent = new StudentClass("Aaditya Gupta", "Computer Science");

console.log("\n--- 2. Executing Methods on ES5 Prototype Instance ---");
protoStudent.printName();
protoStudent.printBranch();

console.log("\n--- 3. Executing Methods on ES6 Class Instance ---");
classStudent.printName();
classStudent.printBranch();

// ====================================================================
// Proving Both Versions Behave the Same
// ====================================================================

console.log("\n====================================================================");
console.log("             BEHAVIORAL & ARCHITECTURAL PARITY CHECK                ");
console.log("====================================================================\n");

// 1. Instance Properties check
console.log("1. Instance Properties (Own Properties):");
console.log("   - protoStudent own properties:", Object.keys(protoStudent)); // ['name', 'branch']
console.log("   - classStudent own properties:", Object.keys(classStudent)); // ['name', 'branch']
console.log("   Are property structures identical?:", 
    JSON.stringify(Object.keys(protoStudent)) === JSON.stringify(Object.keys(classStudent))); // true

// 2. Methods reside on Prototype, NOT on the instance
console.log("\n2. Method Placement (Prototype vs Instance):");
console.log("   - protoStudent has own 'printName'?:", Object.hasOwn(protoStudent, "printName")); // false
console.log("   - classStudent has own 'printName'?:", Object.hasOwn(classStudent, "printName")); // false
console.log("   - protoStudent has own 'printBranch'?:", Object.hasOwn(protoStudent, "printBranch")); // false
console.log("   - classStudent has own 'printBranch'?:", Object.hasOwn(classStudent, "printBranch")); // false

// 3. Inheritance chain check using instanceof
console.log("\n3. 'instanceof' Hierarchy Checks:");
console.log("   ES5 Proto Version:");
console.log("     protoStudent instanceof StudentProto :", protoStudent instanceof StudentProto); // true
console.log("     protoStudent instanceof PersonProto  :", protoStudent instanceof PersonProto);  // true
console.log("     protoStudent instanceof Object       :", protoStudent instanceof Object);       // true

console.log("   ES6 Class Version:");
console.log("     classStudent instanceof StudentClass :", classStudent instanceof StudentClass); // true
console.log("     classStudent instanceof PersonClass  :", classStudent instanceof PersonClass);  // true
console.log("     classStudent instanceof Object       :", classStudent instanceof Object);       // true

// 4. Prototype Chain Linkage comparison
console.log("\n4. Prototype Chain Linkage Parity:");
const protoParentOfStudentProto = Object.getPrototypeOf(StudentProto.prototype);
const classParentOfStudentClass = Object.getPrototypeOf(StudentClass.prototype);

console.log("   StudentProto.prototype parent === PersonProto.prototype :", 
    protoParentOfStudentProto === PersonProto.prototype); // true
console.log("   StudentClass.prototype parent === PersonClass.prototype :", 
    classParentOfStudentClass === PersonClass.prototype); // true

// ====================================================================
// Technical Deep Dive: Why ES6 Classes are "Syntactic Sugar"
// ====================================================================

console.log("\n====================================================================");
console.log("                   WHAT DOES 'SYNTACTIC SUGAR' MEAN?                 ");
console.log("====================================================================\n");

console.log(`
Behind the Scenes in ES6:
1. 'class Student extends Person' under the hood sets up the EXACT same prototype chain:
   Object.setPrototypeOf(StudentClass.prototype, PersonClass.prototype);

2. 'super(name)' acts identically to calling:
   PersonProto.call(this, name);

3. Methods defined inside 'class' bodies are attached directly to StudentClass.prototype,
   just like 'StudentProto.prototype.printBranch = ...'.

Key Differences & Guardrails added by ES6 Classes:
● 'class' constructors cannot be invoked without 'new' (throws a TypeError: Class constructor cannot be invoked without 'new').
● Class bodies are automatically in Strict Mode ("use strict").
● Methods defined inside a class are non-enumerable by default (enumerable: false).
● Static methods are inherited automatically via constructor-to-constructor prototype links.
`);

// Export for module systems (Node.js) if required
if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        PersonProto,
        StudentProto,
        PersonClass,
        StudentClass,
        protoStudent,
        classStudent
    };
}
