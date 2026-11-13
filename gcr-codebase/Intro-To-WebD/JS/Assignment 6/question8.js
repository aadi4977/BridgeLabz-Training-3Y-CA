/**
 * ASSIGNMENT 6 - QUESTION 8
 * Topic: Order Processing Flow: Async Retry Mechanism
 * 
 * Objective:
 * Implement a robust asynchronous retry mechanism to handle flaky API operations.
 * 
 * Requirements:
 * 1. Create submitOrder() returning a Promise that fails 50% of the time (Math.random() < 0.5).
 * 2. Create an async function processOrder() that:
 *    - Tries up to 3 times using a loop + await.
 *    - Logs "Attempt X: Success" or "Attempt X: Failed".
 *    - Throws "Order could not be processed" if all attempts fail.
 * 3. Use try/catch to handle final failure gracefully.
 */

"use strict";

console.log("====================================================================");
console.log("      Q8: ORDER PROCESSING FLOW: ASYNC RETRY MECHANISM              ");
console.log("====================================================================\n");

/**
 * Simulates submitting an order to an unstable payment gateway / backend API.
 * 50% success probability, 50% failure probability.
 * 
 * @param {object} orderData - Information about the order
 * @returns {Promise<object>}
 */
function submitOrder(orderData = { orderId: "ORD-9842", amount: 149.99 }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 50% failure rate simulation
      const isSuccess = Math.random() >= 0.5;

      if (isSuccess) {
        resolve({
          orderId: orderData.orderId,
          transactionId: "TXN_" + Math.random().toString(36).substring(2, 9).toUpperCase(),
          status: "CONFIRMED"
        });
      } else {
        reject(new Error("Gateway connection reset or timeout"));
      }
    }, 600); // 600ms latency per attempt
  });
}

/**
 * Retries submitting the order up to maxAttempts times.
 * 
 * @param {number} maxAttempts - Maximum attempts allowed (default 3)
 * @returns {Promise<object>} The confirmed order object
 */
async function processOrder(maxAttempts = 3) {
  console.log(`Starting order processing (Max allowed attempts: ${maxAttempts})...\n`);

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      // Attempt the async operation with await
      const result = await submitOrder();
      console.log(`Attempt ${attempt}: Success`);
      return result; // Exit early on success
    } catch (err) {
      console.log(`Attempt ${attempt}: Failed (${err.message})`);

      // If we haven't reached the limit, wait briefly before retrying
      if (attempt < maxAttempts) {
        console.log(`  -> Retrying in 500ms...\n`);
        await new Promise((res) => setTimeout(res, 500));
      }
    }
  }

  // Requirement: Throws "Order could not be processed" if all fail.
  throw new Error("Order could not be processed");
}

// ============================================================================
// Execution & Graceful Error Handling with try/catch
// ============================================================================

async function runCheckout() {
  try {
    const finalConfirmation = await processOrder(3);
    console.log("\n================ ORDER RECEIPT ================");
    console.log(`Order ID:       ${finalConfirmation.orderId}`);
    console.log(`Transaction ID: ${finalConfirmation.transactionId}`);
    console.log(`Status:         ${finalConfirmation.status}`);
    console.log("Your order has been placed successfully!");
    console.log("===============================================\n");
  } catch (error) {
    // Graceful handling of the final failure
    console.error("\n================ TRANSACTION FAILED ================");
    console.error(`Final Status: ${error.message}`);
    console.error("Notice: We could not process your transaction after 3 attempts.");
    console.error("Please verify your payment details or try again later.");
    console.error("====================================================\n");
  }
}

runCheckout();
