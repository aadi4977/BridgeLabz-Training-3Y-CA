/**
 * ASSIGNMENT 8 - QUESTION 1
 * Topic: Student Result Processing (reduce + Classes)
 * 
 * Objective:
 * You are given an array of marks of a student.
 * Create a Student class with properties: name and marks[].
 * Add method:
 *   - calculateAverage() using reduce()
 *   - Return grade based on average: A/B/C/F
 * Test the class for 3 students.
 */

"use strict";

console.log("====================================================================");
console.log("         Q1: STUDENT RESULT PROCESSING (REDUCE + CLASSES)           ");
console.log("====================================================================\n");

/**
 * Represents a student with academic marks and result calculation methods.
 */
class Student {
  /**
   * @param {string} name - Student's full name
   * @param {number[]} marks - Array of scores scored by the student
   */
  constructor(name, marks = []) {
    if (!name || typeof name !== "string") {
      throw new Error("Student name must be a non-empty string.");
    }
    if (!Array.isArray(marks)) {
      throw new Error("Marks must be provided as an array of numbers.");
    }

    this.name = name;
    this.marks = marks;
  }

  /**
   * Calculates the average marks using Array.prototype.reduce().
   * @returns {number} Average marks (rounded to 2 decimal places)
   */
  calculateAverage() {
    if (this.marks.length === 0) {
      return 0;
    }

    // Using reduce to accumulate the sum of marks
    const totalMarks = this.marks.reduce((accumulator, currentMark) => {
      if (typeof currentMark !== "number" || isNaN(currentMark) || currentMark < 0) {
        throw new Error(`Invalid mark '${currentMark}' encountered for student ${this.name}.`);
      }
      return accumulator + currentMark;
    }, 0);

    const average = totalMarks / this.marks.length;
    return Number(average.toFixed(2));
  }

  /**
   * Determines letter grade based on the average marks:
   *   - A : 90 to 100
   *   - B : 75 to 89.99
   *   - C : 50 to 74.99
   *   - F : Below 50
   * @returns {string} Letter grade (A, B, C, or F)
   */
  getGrade() {
    const avg = this.calculateAverage();

    if (avg >= 90) return "A";
    if (avg >= 75) return "B";
    if (avg >= 50) return "C";
    return "F";
  }

  /**
   * Returns a formatted report card summary.
   * @returns {object} Formatted student report object
   */
  getReport() {
    const average = this.calculateAverage();
    const grade = this.getGrade();

    return {
      name: this.name,
      marks: this.marks,
      totalSubjects: this.marks.length,
      averageMarks: average,
      grade: grade,
      status: grade === "F" ? "Needs Improvement" : "Passed"
    };
  }

  /**
   * Prints the student's result card in console.
   */
  displayResult() {
    const report = this.getReport();
    console.log(`Student: ${report.name}`);
    console.log(`Marks: [${report.marks.join(", ")}]`);
    console.log(`Average: ${report.averageMarks}%`);
    console.log(`Grade: ${report.grade} (${report.status})`);
    console.log("--------------------------------------------------------------------");
  }
}

// ==========================================
// TEST SCENARIOS (Testing for 3 Students)
// ==========================================

console.log("--- Testing Student Class with 3 Students ---\n");

try {
  // Student 1: High performer (Grade A)
  const student1 = new Student("Aarav Sharma", [95, 92, 88, 96, 91]);
  student1.displayResult();

  // Student 2: Consistent performer (Grade B)
  const student2 = new Student("Diya Patel", [78, 82, 74, 80, 85]);
  student2.displayResult();

  // Student 3: Average performer / Needs support (Grade C / F)
  const student3 = new Student("Rohan Verma", [42, 55, 48, 60, 52]);
  student3.displayResult();

  // Student 4: Additional test case for failing grade (Grade F)
  const student4 = new Student("Kabir Khan", [35, 40, 28, 45, 30]);
  student4.displayResult();

  // Summary Table of all students
  const classSummary = [student1, student2, student3, student4].map(s => s.getReport());
  console.log("\n--- Class Performance Summary Table ---");
  console.table(classSummary);

} catch (error) {
  console.error("An error occurred during student result processing:", error.message);
}

// Export for Node and browser environments
if (typeof module !== "undefined" && module.exports) {
  module.exports = { Student };
}
