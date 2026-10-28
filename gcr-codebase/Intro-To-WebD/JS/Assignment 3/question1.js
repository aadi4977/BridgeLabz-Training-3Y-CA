/**
 * Q1 – Dynamic Data Parser
 * 
 * Objective:
 * Process mixed API data, convert each value into Number, Boolean, and String forms,
 * filter out invalid numbers, build categorized arrays, and print a comprehensive report.
 * 
 * Input:
 * const apiData = ["25", "true", "false", "NaN", " ", "100px", "3.14", null, undefined];
 * 
 * Tasks:
 * 1. Convert each value into a Number, Boolean, and String form.
 * 2. Skip invalid numbers (NaN, " ", "100px") but log them separately.
 * 3. Build two arrays — one for valid numeric data, one for invalid.
 * 4. Print a detailed report using loops and conditional formatting.
 */

"use strict";

console.log("====================================================================");
console.log("              Q1: DYNAMIC DATA PARSER REPORT                        ");
console.log("====================================================================\n");

// 1. Raw API Data
const apiData = ["25", "true", "false", "NaN", " ", "100px", "3.14", null, undefined];

// 2. Storage arrays for categorization
const validNumericData = [];
const invalidData = [];
const fullConversionAudit = [];

/**
 * Validates whether a given raw value represents a legitimate numeric value.
 * 
 * Logic & Type Coercion Notes:
 * - Number(" ") evaluates to 0, and Number(null) evaluates to 0 in standard JS coercion.
 * - However, in real-world API data parsing, empty strings, whitespace, null, and booleans
 *   are NOT valid numbers and should be classified as invalid.
 * - Number("100px") results in NaN.
 * - Number("NaN") results in NaN.
 * - Number(undefined) results in NaN.
 */
function isValidNumber(val) {
    // Reject null and undefined immediately
    if (val === null || val === undefined) {
        return false;
    }

    // Reject boolean values (true coerces to 1, false to 0 via Number(), which is deceptive)
    if (typeof val === "boolean") {
        return false;
    }

    // If string, reject empty string or whitespace-only string
    if (typeof val === "string" && val.trim() === "") {
        return false;
    }

    // Attempt numeric conversion
    const num = Number(val);

    // Ensure conversion is not NaN and is finite
    return !Number.isNaN(num) && Number.isFinite(num);
}

// 3. Process each item in apiData
for (let i = 0; i < apiData.length; i++) {
    const rawValue = apiData[i];

    // Explicit Type Conversions
    const asNumber = Number(rawValue);
    const asBoolean = Boolean(rawValue);
    const asString = String(rawValue);

    // Save full conversion audit record
    fullConversionAudit.push({
        index: i,
        raw: rawValue,
        type: typeof rawValue,
        numberForm: asNumber,
        booleanForm: asBoolean,
        stringForm: asString
    });

    // Check validity
    if (isValidNumber(rawValue)) {
        const parsedNumber = Number(rawValue);
        validNumericData.push({
            index: i,
            raw: rawValue,
            parsedValue: parsedNumber
        });
    } else {
        // Determine the reason for failure
        let reason = "";
        if (rawValue === null) reason = "Null value";
        else if (rawValue === undefined) reason = "Undefined value";
        else if (typeof rawValue === "string" && rawValue.trim() === "") reason = "Whitespace/Empty string";
        else if (Number.isNaN(asNumber)) reason = "Number() resulted in NaN";
        else reason = "Non-numeric type coercion";

        invalidData.push({
            index: i,
            raw: rawValue,
            reason: reason,
            coercedNumber: asNumber
        });
    }
}

// 4. Output detailed report using conditional formatting
console.log("--- 1. TYPE CONVERSION AUDIT TABLE ---");
console.log(
    "Index".padEnd(8) +
    "Raw Value".padEnd(16) +
    "Original Type".padEnd(16) +
    "Number Form".padEnd(16) +
    "Boolean Form".padEnd(16) +
    "String Form"
);
console.log("-".repeat(85));

for (const record of fullConversionAudit) {
    const rawDisplay = record.raw === null ? "null" : record.raw === undefined ? "undefined" : `"${record.raw}"`;
    const numDisplay = Number.isNaN(record.numberForm) ? "NaN" : String(record.numberForm);
    const boolDisplay = String(record.booleanForm);
    const strDisplay = `"${record.stringForm}"`;

    console.log(
        String(record.index).padEnd(8) +
        rawDisplay.padEnd(16) +
        record.type.padEnd(16) +
        numDisplay.padEnd(16) +
        boolDisplay.padEnd(16) +
        strDisplay
    );
}

console.log("\n--- 2. VALID NUMERIC DATA ARRAY ---");
if (validNumericData.length > 0) {
    validNumericData.forEach(item => {
        console.log(`  [VALID] Index ${item.index}: Raw = "${item.raw}" -> Parsed Number = ${item.parsedValue}`);
    });
} else {
    console.log("  No valid numbers found.");
}
console.log(`Total Valid Numbers: ${validNumericData.length}`);

console.log("\n--- 3. INVALID NUMERIC DATA (SEPARATELY LOGGED) ---");
invalidData.forEach(item => {
    const rawDisplay = item.raw === null ? "null" : item.raw === undefined ? "undefined" : `"${item.raw}"`;
    console.log(`  [SKIPPED] Index ${item.index}: Raw = ${rawDisplay.padEnd(12)} | Reason: ${item.reason} (Number() = ${item.coercedNumber})`);
});
console.log(`Total Invalid Entries: ${invalidData.length}`);

console.log("\n==================== SUMMARY ====================");
console.log(`Total Processed Items : ${apiData.length}`);
console.log(`Valid Numeric Values  : [${validNumericData.map(v => v.parsedValue).join(", ")}]`);
console.log(`Invalid Raw Values    : [${invalidData.map(v => v.raw === null ? "null" : v.raw === undefined ? "undefined" : `"${v.raw}"`).join(", ")}]`);
console.log("=================================================\n");
