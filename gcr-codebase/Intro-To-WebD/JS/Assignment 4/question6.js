/**
 * Q6: Employee Management System (Classes + Object Methods)
 * 
 * Objective:
 * Create an Employee class with properties: id, name, department, salary.
 * Add methods:
 *   - getAnnualSalary(): calculates the total annual base salary (monthly salary * 12)
 *   - applyBonus(percent): calculates and awards a bonus percentage
 * Create 5 employee objects and calculate the annual salary for each.
 * Use Array.prototype.reduce() to calculate the total annual payout of the company.
 * 
 * Environment: Node.js & Browser Console
 */

"use strict";

console.log("====================================================================");
console.log("      Q6: EMPLOYEE MANAGEMENT SYSTEM (CLASSES + METHODS)            ");
console.log("====================================================================\n");

/**
 * Class representing a Corporate Employee.
 */
class Employee {
    /**
     * Initializes an Employee instance.
     * @param {number|string} id - Unique employee ID
     * @param {string} name - Full employee name
     * @param {string} department - Department name
     * @param {number} salary - Monthly base salary
     */
    constructor(id, name, department, salary) {
        if (typeof salary !== "number" || salary < 0 || isNaN(salary)) {
            throw new TypeError(`Salary for ${name} must be a valid positive number.`);
        }
        this.id = id;
        this.name = name;
        this.department = department;
        this.salary = salary; // Monthly salary
        this.bonusPercent = 0;
        this.bonusAmount = 0;
    }

    /**
     * Calculates the standard annual base salary (12 months).
     * @returns {number} Total annual salary
     */
    getAnnualSalary() {
        return Number((this.salary * 12).toFixed(2));
    }

    /**
     * Applies an annual performance bonus percentage.
     * @param {number} percent - Percentage of bonus (e.g., 10 for 10%)
     * @returns {number} The bonus dollar amount
     */
    applyBonus(percent) {
        if (typeof percent !== "number" || percent < 0) {
            console.error(`Invalid bonus percentage for ${this.name}: ${percent}`);
            return 0;
        }
        this.bonusPercent = percent;
        const annualBase = this.getAnnualSalary();
        this.bonusAmount = Number(((annualBase * percent) / 100).toFixed(2));
        return this.bonusAmount;
    }

    /**
     * Calculates total compensation including base annual salary and bonus.
     * @returns {number} Total annual compensation
     */
    getTotalCompensation() {
        return Number((this.getAnnualSalary() + this.bonusAmount).toFixed(2));
    }

    /**
     * Formatted string row for tabular display.
     * @returns {string}
     */
    getDetails() {
        const idStr = String(this.id).padEnd(6);
        const nameStr = this.name.padEnd(18);
        const deptStr = this.department.padEnd(14);
        const monthlyStr = `$${this.salary.toLocaleString("en-US", { minimumFractionDigits: 2 })}`.padStart(12);
        const annualStr = `$${this.getAnnualSalary().toLocaleString("en-US", { minimumFractionDigits: 2 })}`.padStart(14);
        const bonusStr = `${this.bonusPercent}% (+$${this.bonusAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })})`.padStart(18);
        const totalCompStr = `$${this.getTotalCompensation().toLocaleString("en-US", { minimumFractionDigits: 2 })}`.padStart(14);

        return `${idStr} | ${nameStr} | ${deptStr} | ${monthlyStr} | ${annualStr} | ${bonusStr} | ${totalCompStr}`;
    }
}

// -----------------------------------------------------------------------------
// Demonstration & Testing
// -----------------------------------------------------------------------------

// 1. Create 5 employee objects
const workforce = [
    new Employee(1001, "Alice Johnson", "Engineering", 7500.00),
    new Employee(1002, "Bob Martinez", "Product", 6800.00),
    new Employee(1003, "Clara Oswald", "Design", 5400.00),
    new Employee(1004, "David Beckham", "Marketing", 5900.00),
    new Employee(1005, "Elena Rostova", "DevOps", 7100.00)
];

// 2. Calculate annual salary for each and apply performance bonuses
const bonusAllocations = [12, 10, 8, 10, 15]; // Bonus percentages for each employee
workforce.forEach((emp, index) => {
    emp.applyBonus(bonusAllocations[index]);
});

// Display detailed workforce compensation table
console.log("ID     | Name               | Department     | Monthly Base | Annual Base    | Bonus Awarded      | Total Payout  ");
console.log("-------+--------------------+----------------+--------------+----------------+--------------------+---------------");
workforce.forEach(emp => console.log(emp.getDetails()));
console.log("-------+--------------------+----------------+--------------+----------------+--------------------+---------------");

// 3. Use reduce() to calculate total annual base payout of the company
const totalBaseAnnualPayout = workforce.reduce((accumulatedTotal, currentEmployee) => {
    return accumulatedTotal + currentEmployee.getAnnualSalary();
}, 0);

// 4. Use reduce() to calculate total annual payout including bonuses
const totalCompanyPayoutWithBonuses = workforce.reduce((accumulatedTotal, currentEmployee) => {
    return accumulatedTotal + currentEmployee.getTotalCompensation();
}, 0);

const totalBonusesDistributed = workforce.reduce((acc, emp) => acc + emp.bonusAmount, 0);

console.log(`\n--- Company Annual Compensation Analytics (via Array.prototype.reduce) ---`);
console.log(` * Total Base Annual Payroll:      $${totalBaseAnnualPayout.toLocaleString("en-US", { minimumFractionDigits: 2 })}`);
console.log(` * Total Performance Bonuses Paid: $${totalBonusesDistributed.toLocaleString("en-US", { minimumFractionDigits: 2 })}`);
console.log(` * Total Annual Company Payout:    $${totalCompanyPayoutWithBonuses.toLocaleString("en-US", { minimumFractionDigits: 2 })}`);
console.log(` * Average Compensation / Head:    $${(totalCompanyPayoutWithBonuses / workforce.length).toLocaleString("en-US", { minimumFractionDigits: 2 })}`);

// Export for module systems
if (typeof module !== "undefined" && module.exports) {
    module.exports = { Employee, workforce, totalBaseAnnualPayout, totalCompanyPayoutWithBonuses };
}
