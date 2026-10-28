/**
 * Q3 – Transaction Validator
 * 
 * Objective:
 * Validate financial transaction records, throw descriptive custom errors
 * for negative amounts, missing properties, and null entries, catch and categorize
 * errors into respective arrays, print a detailed summary report, and provide
 * debugging hooks/instructions for VS Code breakpoints.
 * 
 * Given Data:
 * const transactions = [
 *   { id: 1, amount: 2000 },
 *   { id: 2, amount: -500 },
 *   { id: 3 },
 *   null
 * ];
 * 
 * Tasks:
 * 1. Loop through each transaction.
 * 2. Throw custom errors for:
 *    - Negative amount
 *    - Missing amount or id
 *    - Null entries
 * 3. Catch and categorize each error type in arrays (invalid, valid).
 * 4. Print final reports with counts of successful and failed transactions.
 * 5. Use a breakpoint to watch variable states.
 */

"use strict";

console.log("====================================================================");
console.log("               Q3: TRANSACTION VALIDATOR                            ");
console.log("====================================================================\n");

// --- CUSTOM ERROR CLASSES ---
class TransactionError extends Error {
    constructor(message, errorType) {
        super(message);
        this.name = this.constructor.name;
        this.errorType = errorType;
    }
}

class NullEntryError extends TransactionError {
    constructor(message = "Transaction entry cannot be null or undefined") {
        super(message, "NULL_ENTRY");
    }
}

class MissingFieldError extends TransactionError {
    constructor(missingField) {
        super(`Transaction is missing mandatory property: "${missingField}"`, "MISSING_FIELD");
        this.missingField = missingField;
    }
}

class NegativeAmountError extends TransactionError {
    constructor(amount) {
        super(`Transaction amount cannot be negative: ₹${amount}`, "NEGATIVE_AMOUNT");
        this.amount = amount;
    }
}

// Given Input Transactions
const transactions = [
    { id: 1, amount: 2000 },
    { id: 2, amount: -500 },
    { id: 3 },
    null
];

// Categorization Arrays
const validTransactions = [];
const invalidTransactions = [];

/**
 * Validates an individual transaction object.
 * Throws corresponding custom error if invalid.
 * 
 * @param {Object} tx - The transaction object
 */
function validateTransaction(tx) {
    /**
     * DEBUGGING NOTE (Task 5):
     * Set a breakpoint on the line below or uncomment `debugger;` when running
     * in VS Code Debugger (F5) or Chrome DevTools.
     * Watch variables to monitor:
     * - `tx`
     * - `tx?.id`
     * - `tx?.amount`
     */
    // debugger; // Uncomment to trigger breakpoint during debugging

    // Check 1: Null or undefined entry
    if (tx === null || tx === undefined) {
        throw new NullEntryError();
    }

    // Check 2: Missing id
    if (!("id" in tx) || tx.id === null || tx.id === undefined) {
        throw new MissingFieldError("id");
    }

    // Check 3: Missing amount
    if (!("amount" in tx) || tx.amount === null || tx.amount === undefined) {
        throw new MissingFieldError("amount");
    }

    // Check 4: Type validation for amount
    if (typeof tx.amount !== "number" || Number.isNaN(tx.amount)) {
        throw new TransactionError(`Invalid amount type: "${tx.amount}". Must be a valid number.`, "INVALID_TYPE");
    }

    // Check 5: Negative amount
    if (tx.amount < 0) {
        throw new NegativeAmountError(tx.amount);
    }

    return true;
}

// 1. Loop through each transaction
console.log("--- START TRANSACTION PROCESSING ---");
for (let i = 0; i < transactions.length; i++) {
    const tx = transactions[i];
    const indexLabel = `Transaction #${i + 1}`;

    try {
        validateTransaction(tx);
        // If validation passed, push to validTransactions
        validTransactions.push({
            index: i + 1,
            id: tx.id,
            amount: tx.amount
        });
        console.log(`[PASS] ${indexLabel} (ID: ${tx.id}) -> ₹${tx.amount} processed successfully.`);

    } catch (err) {
        // 3. Catch and categorize each error type
        const errorRecord = {
            index: i + 1,
            raw: tx,
            errorType: err instanceof TransactionError ? err.errorType : "UNKNOWN_ERROR",
            errorClass: err.name,
            errorMessage: err.message
        };

        invalidTransactions.push(errorRecord);
        console.error(`[FAIL] ${indexLabel} -> [${errorRecord.errorType}] ${err.message}`);
    }
}

// 4. Final reports with counts of successful and failed transactions
console.log("\n==================== TRANSACTION REPORT ====================");
console.log(`Total Transactions Evaluated : ${transactions.length}`);
console.log(`Successful Transactions      : ${validTransactions.length}`);
console.log(`Failed Transactions          : ${invalidTransactions.length}`);
console.log(`Success Rate                 : ${((validTransactions.length / transactions.length) * 100).toFixed(1)}%`);

console.log("\n--- VALID TRANSACTIONS ---");
if (validTransactions.length > 0) {
    validTransactions.forEach(t => {
        console.log(`  ID: ${t.id} | Amount: ₹${t.amount}`);
    });
} else {
    console.log("  None");
}

console.log("\n--- INVALID TRANSACTIONS (CATEGORIZED BY ERROR TYPE) ---");
invalidTransactions.forEach(t => {
    const rawStr = t.raw === null ? "null" : JSON.stringify(t.raw);
    console.log(`  Item #${t.index}: ${rawStr}`);
    console.log(`    Category : ${t.errorType} (${t.errorClass})`);
    console.log(`    Details  : ${t.errorMessage}`);
});

console.log("\n================= DEBUGGING INSTRUCTIONS (TASK 5) =================");
console.log("How to watch variable states in VS Code Debugger:");
console.log("1. Open 'question3.js' in VS Code.");
console.log("2. Set a breakpoint on line 78 (inside validateTransaction).");
console.log("3. Press F5 (Run & Debug) -> Select 'Node.js'.");
console.log("4. In the 'WATCH' panel on the left sidebar, add expressions:");
console.log("   - `tx`");
console.log("   - `tx?.amount`");
console.log("   - `validTransactions.length`");
console.log("   - `invalidTransactions.length`");
console.log("5. Use F10 (Step Over) and F11 (Step Into) to observe state transitions.");
console.log("===================================================================\n");
