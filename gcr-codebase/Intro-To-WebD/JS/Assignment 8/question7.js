/**
 * ASSIGNMENT 8 - QUESTION 7
 * Topic: Banking Application (Encapsulation with Private Fields #balance)
 * 
 * Objective:
 * Create a BankAccount class with private fields:
 *   - #balance
 * Add methods:
 *   - deposit(amount)
 *   - withdraw(amount) (throw error if insufficient balance)
 *   - getBalance()
 * Demonstrate:
 *   - valid deposits
 *   - invalid withdrawals (handled using try/catch)
 */

"use strict";

console.log("====================================================================");
console.log("          Q7: BANKING APPLICATION (PRIVATE FIELDS #balance)         ");
console.log("====================================================================\n");

/**
 * BankAccount Class demonstrating true OOP Encapsulation with ES2022 Private Fields.
 */
class BankAccount {
  // Private field declaration (accessible only within this class body)
  #balance;
  #accountNumber;

  /**
   * @param {string} accountHolder - Name of the account holder
   * @param {number} [initialDeposit=0] - Initial opening balance
   */
  constructor(accountHolder, initialDeposit = 0) {
    if (!accountHolder || typeof accountHolder !== "string") {
      throw new Error("Account holder name must be a valid non-empty string.");
    }
    if (typeof initialDeposit !== "number" || isNaN(initialDeposit) || initialDeposit < 0) {
      throw new Error("Initial deposit must be a non-negative number.");
    }

    this.accountHolder = accountHolder;
    this.#balance = initialDeposit;
    // Generate a simulated private 10-digit account number
    this.#accountNumber = "SB-" + Math.floor(1000000000 + Math.random() * 9000000000);
  }

  /**
   * Returns current account balance.
   * Controlled public getter providing read-only access to private #balance.
   * 
   * @returns {number} Current balance
   */
  getBalance() {
    return this.#balance;
  }

  /**
   * Deposits money into the bank account.
   * 
   * @param {number} amount - Amount to deposit
   * @returns {number} New balance after deposit
   * @throws {Error} If deposit amount is non-positive or non-numeric
   */
  deposit(amount) {
    if (typeof amount !== "number" || isNaN(amount) || amount <= 0) {
      throw new Error(`Deposit failed: Amount must be a positive number. Received: ${amount}`);
    }

    this.#balance += amount;
    console.log(`[DEPOSIT] Successfully deposited Rs. ${amount.toLocaleString("en-IN")}. Current Balance: Rs. ${this.#balance.toLocaleString("en-IN")}`);
    return this.#balance;
  }

  /**
   * Withdraws money from the bank account.
   * Throws an error if withdrawal amount exceeds current balance or is invalid.
   * 
   * @param {number} amount - Amount to withdraw
   * @returns {number} Remaining balance after withdrawal
   * @throws {Error} When funds are insufficient or amount is invalid
   */
  withdraw(amount) {
    if (typeof amount !== "number" || isNaN(amount) || amount <= 0) {
      throw new Error(`Withdrawal failed: Amount must be a positive number. Received: ${amount}`);
    }

    if (amount > this.#balance) {
      throw new Error(`Withdrawal declined: Insufficient funds. Requested: Rs. ${amount.toLocaleString("en-IN")}, Available: Rs. ${this.#balance.toLocaleString("en-IN")}`);
    }

    this.#balance -= amount;
    console.log(`[WITHDRAWAL] Successfully withdrew Rs. ${amount.toLocaleString("en-IN")}. Remaining Balance: Rs. ${this.#balance.toLocaleString("en-IN")}`);
    return this.#balance;
  }

  /**
   * Safe public method returning masked account summary.
   * @returns {string} Formatted string
   */
  getAccountSummary() {
    const maskedAcct = this.#accountNumber.slice(0, 5) + "XXXX" + this.#accountNumber.slice(-2);
    return `Holder: ${this.accountHolder} | Acct: ${maskedAcct} | Balance: Rs. ${this.#balance.toLocaleString("en-IN")}`;
  }
}

// ==========================================
// DEMONSTRATION & TEST SCENARIOS
// ==========================================

console.log("--- Creating a new Bank Account ---");
const myAccount = new BankAccount("Aaditya Gupta", 10000);
console.log(myAccount.getAccountSummary());
console.log(`Initial Balance via getBalance(): Rs. ${myAccount.getBalance()}\n`);

console.log("--------------------------------------------------------------------");
console.log("DEMONSTRATION 1: Valid Deposits");
console.log("--------------------------------------------------------------------");
try {
  myAccount.deposit(5000);
  myAccount.deposit(2500);
  console.log(`Updated Balance: Rs. ${myAccount.getBalance()}\n`);
} catch (err) {
  console.error("Deposit Error:", err.message);
}

console.log("--------------------------------------------------------------------");
console.log("DEMONSTRATION 2: Valid Withdrawals");
console.log("--------------------------------------------------------------------");
try {
  myAccount.withdraw(3000);
  myAccount.withdraw(4500);
  console.log(`Updated Balance: Rs. ${myAccount.getBalance()}\n`);
} catch (err) {
  console.error("Withdrawal Error:", err.message);
}

console.log("--------------------------------------------------------------------");
console.log("DEMONSTRATION 3: Invalid Withdrawals Handled using try/catch");
console.log("--------------------------------------------------------------------");

// Test Case A: Exceeding available balance
console.log("Attempting to withdraw Rs. 20,000 (Available is Rs. 10,000):");
try {
  myAccount.withdraw(20000);
} catch (error) {
  console.error(`❌ Caught Error: ${error.message}\n`);
}

// Test Case B: Negative withdrawal amount
console.log("Attempting to withdraw negative amount (-500):");
try {
  myAccount.withdraw(-500);
} catch (error) {
  console.error(`❌ Caught Error: ${error.message}\n`);
}

// Test Case C: Invalid non-numeric input
console.log("Attempting to withdraw invalid input ('one thousand'):");
try {
  myAccount.withdraw("one thousand");
} catch (error) {
  console.error(`❌ Caught Error: ${error.message}\n`);
}

console.log("--------------------------------------------------------------------");
console.log("DEMONSTRATION 4: Proof of Encapsulation (Private Field Protection)");
console.log("--------------------------------------------------------------------");

console.log(`Direct property access myAccount.balance: ${myAccount.balance} (undefined - not publicly exposed)`);

try {
  // Direct access to private identifier #balance from outside class is a compile/runtime SyntaxError in JS
  eval("myAccount.#balance = 9999999;");
} catch (err) {
  console.log(`Attempt to access private field (#balance) directly resulted in:`);
  console.log(`  -> ${err.name}: ${err.message}`);
}

console.log(`\nFinal verified balance via getBalance(): Rs. ${myAccount.getBalance()}`);

// Export for Node and browser
if (typeof module !== "undefined" && module.exports) {
  module.exports = { BankAccount };
}
