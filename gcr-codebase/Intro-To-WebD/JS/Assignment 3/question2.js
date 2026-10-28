/**
 * Q2 – Employee Bonus Calculator
 * 
 * Objective:
 * Process employee records, safely parse and convert salary and experience to numbers,
 * apply conditional bonus rules, strictly validate required properties via try...catch,
 * and format employee payout summaries using ES6 template strings.
 * 
 * Given Data:
 * const employees = [
 *   { name: "Amit", salary: "45000", years: "5" },
 *   { name: "Sara", salary: "38000", years: "2" },
 *   { name: "Kiran", salary: "52000", years: "7" }
 * ];
 * 
 * Tasks:
 * 1. Convert salary and years to numbers.
 * 2. Calculate bonus = (salary * 0.1) if years > 3 else (salary * 0.05).
 * 3. Apply strict validation using "use strict" (no implicit globals).
 * 4. Use template strings to print each employee's formatted details.
 * 5. Add try...catch to handle conversion or missing property errors.
 */

"use strict";

console.log("====================================================================");
console.log("             Q2: EMPLOYEE BONUS CALCULATOR                          ");
console.log("====================================================================\n");

// Given dataset augmented with edge cases to thoroughly demonstrate try...catch
const employees = [
    { name: "Amit", salary: "45000", years: "5" },
    { name: "Sara", salary: "38000", years: "2" },
    { name: "Kiran", salary: "52000", years: "7" },
    // Edge cases to demonstrate try...catch handling:
    { name: "Rohit", salary: "invalid_salary", years: "4" }, // Invalid salary conversion
    { name: "Ananya", years: "3" },                          // Missing salary property
    { salary: "60000", years: "1" }                          // Missing name property
];

/**
 * Calculates bonus and returns complete compensation profile for an employee.
 * Strictly throws descriptive errors when validations fail.
 * 
 * @param {Object} emp - The employee record
 * @returns {Object} Processed employee data
 */
function processEmployeeBonus(emp) {
    // 1. Validate employee object exists
    if (!emp || typeof emp !== "object") {
        throw new Error("Invalid record: Employee entry must be a valid object.");
    }

    // 2. Validate mandatory properties exist
    if (!("name" in emp) || typeof emp.name !== "string" || emp.name.trim() === "") {
        throw new Error("Validation Error: Missing or invalid 'name' property.");
    }
    if (!("salary" in emp)) {
        throw new Error(`Validation Error: Missing 'salary' for employee "${emp.name}".`);
    }
    if (!("years" in emp)) {
        throw new Error(`Validation Error: Missing 'years' of experience for employee "${emp.name}".`);
    }

    // 3. Convert salary and years to numbers
    const numSalary = Number(emp.salary);
    const numYears = Number(emp.years);

    // Validate converted numbers
    if (Number.isNaN(numSalary) || numSalary < 0) {
        throw new Error(`Conversion Error: Salary "${emp.salary}" for "${emp.name}" is not a valid positive number.`);
    }
    if (Number.isNaN(numYears) || numYears < 0) {
        throw new Error(`Conversion Error: Years "${emp.years}" for "${emp.name}" is not a valid non-negative number.`);
    }

    // 4. Calculate bonus based on tenure
    // bonus = (salary * 0.1) if years > 3 else (salary * 0.05)
    const bonusRate = numYears > 3 ? 0.10 : 0.05;
    const bonusAmount = numSalary * bonusRate;
    const totalPayout = numSalary + bonusAmount;

    return {
        name: emp.name,
        salary: numSalary,
        years: numYears,
        bonusRate: bonusRate * 100,
        bonusAmount: bonusAmount,
        totalPayout: totalPayout
    };
}

// Containers for successful and failed employee records
const processedEmployees = [];
const errorLogs = [];

// 5. Loop through each employee using try...catch
employees.forEach((emp, index) => {
    try {
        console.log(`Processing Record #${index + 1}...`);
        const result = processEmployeeBonus(emp);
        processedEmployees.push(result);

        // Print details using ES6 Template Strings
        console.log(`  [SUCCESS] Bonus calculated for ${result.name}:`);
        console.log(`    - Employee Name : ${result.name}`);
        console.log(`    - Experience    : ${result.years} years`);
        console.log(`    - Base Salary   : ₹${result.salary.toLocaleString("en-IN")}`);
        console.log(`    - Bonus Rate    : ${result.bonusRate}% (${result.years > 3 ? "> 3 years tier" : "<= 3 years tier"})`);
        console.log(`    - Bonus Amount  : ₹${result.bonusAmount.toLocaleString("en-IN")}`);
        console.log(`    - Total Payout  : ₹${result.totalPayout.toLocaleString("en-IN")}\n`);

    } catch (error) {
        // Handle conversion or missing property errors gracefully
        console.error(`  [FAILED] Record #${index + 1} Error: ${error.message}\n`);
        errorLogs.push({
            recordIndex: index + 1,
            recordData: emp,
            errorMessage: error.message
        });
    }
});

// Final Summary Report
console.log("==================== EXECUTIVE SUMMARY ====================");
console.log(`Total Employee Records Audited : ${employees.length}`);
console.log(`Successfully Processed         : ${processedEmployees.length}`);
console.log(`Failed / Malformed Records     : ${errorLogs.length}`);

console.log("\n--- Successful Payout Table ---");
console.log(
    "Name".padEnd(12) +
    "Years".padEnd(10) +
    "Base Salary".padEnd(16) +
    "Bonus Rate".padEnd(14) +
    "Bonus (₹)".padEnd(14) +
    "Total Payout (₹)"
);
console.log("-".repeat(78));

processedEmployees.forEach(e => {
    console.log(
        e.name.padEnd(12) +
        String(e.years).padEnd(10) +
        `₹${e.salary}`.padEnd(16) +
        `${e.bonusRate}%`.padEnd(14) +
        `₹${e.bonusAmount}`.padEnd(14) +
        `₹${e.totalPayout}`
    );
});

if (errorLogs.length > 0) {
    console.log("\n--- Error Log Summary ---");
    errorLogs.forEach(err => {
        console.log(`- Record #${err.recordIndex}: ${err.errorMessage}`);
    });
}
console.log("===========================================================\n");
