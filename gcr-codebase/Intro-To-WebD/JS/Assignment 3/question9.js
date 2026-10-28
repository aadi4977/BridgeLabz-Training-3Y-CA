/**
 * Q9 – JSON Audit
 * 
 * Objective:
 * Implement a robust JSON parser and data validation pipeline using try...catch.
 * Detect syntax errors in malformed JSON strings, validate schema requirements (user, age),
 * record line/index-referenced audit logs, demonstrate step-by-step error control flow,
 * and filter adults (age >= 18) after numeric type normalization.
 * 
 * Given Data:
 * const rawData = [
 *   '{"user":"Alex","age":25}',
 *   '{"id":2}',
 *   '{invalid}',
 *   '{"user":"Mina","age":"22"}'
 * ];
 * 
 * Tasks:
 * 1. Parse each entry in a loop using try...catch.
 * 2. Detect missing keys (user, age) and invalid JSON.
 * 3. Push valid entries to a clean array; log errors with line numbers.
 * 4. Debug step-by-step to see how control flows on error.
 * 5. Add bonus: convert age to Number and filter under-18 users.
 */

"use strict";

console.log("====================================================================");
console.log("                   Q9: JSON AUDIT PIPELINE                          ");
console.log("====================================================================\n");

// Given dataset augmented with a minor under-18 to fully test the bonus filter
const rawData = [
    '{"user":"Alex","age":25}',
    '{"id":2}',
    '{invalid}',
    '{"user":"Mina","age":"22"}',
    // Bonus test case: Valid user schema but age under 18
    '{"user":"Leo","age":"16"}'
];

// Target storage
const validEntries = [];
const auditErrorLogs = [];
const adultUsers = [];

console.log("--- 1 & 4. PARSING LOOP & CONTROL FLOW TRACE ---");

for (let i = 0; i < rawData.length; i++) {
    const lineNumber = i + 1; // 1-based index / line number
    const entryString = rawData[i];

    console.log(`\n[Line ${lineNumber}] Processing entry: ${entryString}`);
    
    let parsedObj = null;

    try {
        console.log(`  -> Flow: Entering TRY block...`);

        // Task 1: Attempt JSON Parsing
        try {
            parsedObj = JSON.parse(entryString);
            console.log(`  -> Flow: JSON.parse() succeeded.`);
        } catch (parseErr) {
            // Task 2: Invalid JSON Syntax
            throw new Error(`Invalid JSON syntax: ${parseErr.message}`);
        }

        // Task 2: Validate Schema (Missing keys: user, age)
        if (!parsedObj || typeof parsedObj !== "object" || Array.isArray(parsedObj)) {
            throw new Error("Parsed data is not a valid JSON object.");
        }

        const missingKeys = [];
        if (!("user" in parsedObj)) missingKeys.push("user");
        if (!("age" in parsedObj)) missingKeys.push("age");

        if (missingKeys.length > 0) {
            throw new Error(`Schema Violation: Missing mandatory key(s): [${missingKeys.join(", ")}]`);
        }

        // Validate types
        if (typeof parsedObj.user !== "string" || parsedObj.user.trim() === "") {
            throw new Error(`Validation Error: 'user' must be a non-empty string.`);
        }

        // Task 5: Convert age to Number
        const numericAge = Number(parsedObj.age);
        if (Number.isNaN(numericAge) || numericAge < 0) {
            throw new Error(`Validation Error: 'age' must be a valid non-negative number. Received: "${parsedObj.age}"`);
        }

        // Standardized record
        const cleanRecord = {
            lineNumber: lineNumber,
            user: parsedObj.user.trim(),
            age: numericAge
        };

        // Task 3: Push valid entries to clean array
        validEntries.push(cleanRecord);
        console.log(`  -> Flow: Record validated successfully! Stored: ${JSON.stringify(cleanRecord)}`);

        // Task 5 Bonus: Filter under-18 users
        if (cleanRecord.age >= 18) {
            adultUsers.push(cleanRecord);
            console.log(`  -> Flow: [BONUS CHECK] User ${cleanRecord.user} (Age: ${cleanRecord.age}) is an adult (>= 18). Passed.`);
        } else {
            console.log(`  -> Flow: [BONUS CHECK] User ${cleanRecord.user} (Age: ${cleanRecord.age}) is UNDER 18. Filtered out from adult list.`);
        }

    } catch (err) {
        // Task 3: Catch & Log error with line number
        console.log(`  -> Flow: Intercepted in CATCH block!`);
        console.error(`  -> [ERROR on Line ${lineNumber}]: ${err.message}`);

        auditErrorLogs.push({
            line: lineNumber,
            rawInput: entryString,
            errorMessage: err.message
        });

    } finally {
        console.log(`  -> Flow: FINALLY block executed for Line ${lineNumber}.`);
    }
}

// Reports
console.log("\n==================== JSON AUDIT REPORT ====================");
console.log(`Total Entries Audited   : ${rawData.length}`);
console.log(`Valid Schema Records    : ${validEntries.length}`);
console.log(`Rejected Entries        : ${auditErrorLogs.length}`);
console.log(`Adult Users (Age >= 18) : ${adultUsers.length}`);

console.log("\n--- VALID CLEAN ENTRIES (AFTER NUMERIC CONVERSION) ---");
console.log("Line".padEnd(8) + "User".padEnd(16) + "Age (Number)".padEnd(16) + "Adult Status");
console.log("-".repeat(56));
validEntries.forEach(item => {
    const isAdult = item.age >= 18 ? "Adult (>= 18)" : "Minor (< 18)";
    console.log(
        String(item.lineNumber).padEnd(8) +
        item.user.padEnd(16) +
        String(item.age).padEnd(16) +
        isAdult
    );
});

console.log("\n--- REJECTED ENTRIES & PARSE ERRORS (WITH LINE NUMBERS) ---");
auditErrorLogs.forEach(log => {
    console.log(`[Line ${log.line}] Input: "${log.rawInput}"`);
    console.log(`          Reason: ${log.errorMessage}`);
});

console.log("\n--- BONUS FILTERED ADULT USERS ARRAY (age >= 18) ---");
console.log(JSON.stringify(adultUsers, null, 2));
console.log("===========================================================\n");
