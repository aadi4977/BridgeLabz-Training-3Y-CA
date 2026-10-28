/**
 * Q7 – Smart Calculator
 * 
 * Objective:
 * Implement a robust mathematical evaluation engine using a switch statement,
 * incorporating custom error hierarchies for arithmetic domain errors (division by zero,
 * negative root) and invalid operation dispatch. Safely execute operations using
 * try...catch blocks and output a formatted audit summary.
 * 
 * Input:
 * const operations = ["add", "divide", "power", "root", "subtract"];
 * const num1 = 25, num2 = 0;
 * 
 * Tasks:
 * 1. Use a switch to handle each operation.
 * 2. Add custom error handling for divide by 0 and root of negative number.
 * 3. If operation not recognized, throw InvalidOperationError.
 * 4. Wrap in try...catch and print results in a formatted summary.
 */

"use strict";

console.log("====================================================================");
console.log("                 Q7: SMART CALCULATOR ENGINE                        ");
console.log("====================================================================\n");

// --- CUSTOM ERROR DEFINITIONS ---
class CalculatorError extends Error {
    constructor(message, code) {
        super(message);
        this.name = this.constructor.name;
        this.code = code;
    }
}

class DivideByZeroError extends CalculatorError {
    constructor(message = "Division by zero is mathematically undefined.") {
        super(message, "ERR_DIVIDE_BY_ZERO");
    }
}

class NegativeRootError extends CalculatorError {
    constructor(value, degree = 2) {
        super(`Cannot calculate real root of negative number (${value}) with degree ${degree}.`, "ERR_NEGATIVE_ROOT");
        this.value = value;
        this.degree = degree;
    }
}

class InvalidOperationError extends CalculatorError {
    constructor(op) {
        super(`Operation "${op}" is not recognized. Supported operations: add, subtract, multiply, divide, power, root.`, "ERR_INVALID_OP");
        this.operation = op;
    }
}

/**
 * Executes a calculation using a switch block.
 * 
 * @param {string} op - The operation identifier
 * @param {number} a - First operand
 * @param {number} b - Second operand
 * @returns {number} The calculation result
 */
function calculate(op, a, b) {
    if (typeof a !== "number" || typeof b !== "number" || Number.isNaN(a) || Number.isNaN(b)) {
        throw new CalculatorError("Both operands must be valid numeric values.", "ERR_INVALID_OPERAND");
    }

    switch (op.toLowerCase().trim()) {
        case "add":
            return a + b;

        case "subtract":
            return a - b;

        case "divide":
            if (b === 0) {
                throw new DivideByZeroError(`Cannot divide ${a} by zero.`);
            }
            return a / b;

        case "power":
            return Math.pow(a, b);

        case "root":
            // If b is 0, degree 0 root is mathematically undefined (1/0 exponent)
            if (b === 0) {
                // If treating b=0 as requesting square root of 'a':
                if (a < 0) {
                    throw new NegativeRootError(a, 2);
                }
                return Math.sqrt(a);
            }
            if (a < 0 && b % 2 === 0) {
                throw new NegativeRootError(a, b);
            }
            return Math.pow(a, 1 / b);

        default:
            // Task 3: Throw InvalidOperationError for unrecognized operation
            throw new InvalidOperationError(op);
    }
}

// Given inputs
const operations = ["add", "divide", "power", "root", "subtract"];
const num1 = 25;
const num2 = 0;

// Extra test suite to demonstrate all custom errors and valid executions
const testScenarios = [
    // Standard given operations with (25, 0)
    ...operations.map(op => ({ op, a: num1, b: num2, desc: `Given Input: ${op}(${num1}, ${num2})` })),
    // Edge case: Negative root demonstration
    { op: "root", a: -25, b: 2, desc: "Edge Case: root(-25, 2) [Square root of negative number]" },
    // Edge case: Unrecognized operation demonstration
    { op: "modulus", a: 25, b: 4, desc: "Edge Case: unrecognized operation 'modulus'" },
    // Successful division demonstration
    { op: "divide", a: 25, b: 5, desc: "Valid Operation: divide(25, 5)" }
];

const auditResults = [];

console.log("--- RUNNING CALCULATION TESTS ---");
for (const scenario of testScenarios) {
    try {
        const result = calculate(scenario.op, scenario.a, scenario.b);
        const record = {
            scenario: scenario.desc,
            operation: scenario.op,
            operands: `(${scenario.a}, ${scenario.b})`,
            status: "SUCCESS",
            result: result,
            error: null
        };
        auditResults.push(record);
        console.log(`[SUCCESS] ${scenario.desc.padEnd(52)} => ${result}`);

    } catch (err) {
        const record = {
            scenario: scenario.desc,
            operation: scenario.op,
            operands: `(${scenario.a}, ${scenario.b})`,
            status: "FAILED",
            result: null,
            error: `${err.name} [${err.code || "GENERAL"}]: ${err.message}`
        };
        auditResults.push(record);
        console.error(`[CAUGHT]  ${scenario.desc.padEnd(52)} => ${err.name}: ${err.message}`);
    }
}

// Formatted Summary Table
console.log("\n======================== CALCULATION AUDIT SUMMARY ========================");
console.log(
    "Operation".padEnd(12) +
    "Operands".padEnd(14) +
    "Status".padEnd(12) +
    "Result / Error Message"
);
console.log("-".repeat(80));

auditResults.forEach(r => {
    const outcome = r.status === "SUCCESS" ? String(r.result) : r.error;
    console.log(
        r.operation.padEnd(12) +
        r.operands.padEnd(14) +
        r.status.padEnd(12) +
        outcome
    );
});
console.log("===========================================================================\n");
