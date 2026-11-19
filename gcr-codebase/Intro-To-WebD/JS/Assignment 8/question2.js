/**
 * ASSIGNMENT 8 - QUESTION 2
 * Topic: Online Food Ordering (map + Error Handling)
 * 
 * Objective:
 * You have an array of menu items with prices.
 * Write a function calculateBill(orderItems) that:
 *   - Uses map() to get price list
 *   - Uses reduce() to calculate the total
 *   - Throws an error if an invalid item is ordered
 *   - Use try-catch to show meaningful messages
 */

"use strict";

console.log("====================================================================");
console.log("        Q2: ONLINE FOOD ORDERING (MAP + ERROR HANDLING)             ");
console.log("====================================================================\n");

// Master Menu Catalog
const MENU = [
  { id: 101, name: "Margherita Pizza", price: 299 },
  { id: 102, name: "Veggie Burger", price: 149 },
  { id: 103, name: "Peri Peri Fries", price: 99 },
  { id: 104, name: "Cold Coffee", price: 79 },
  { id: 105, name: "Chocolate Brownie", price: 129 },
  { id: 106, name: "Pasta Alfredo", price: 249 }
];

console.log("--- Restaurant Menu ---");
console.table(MENU);

/**
 * Calculates the total bill for a given list of ordered items.
 * 
 * @param {Array<string|{name: string, quantity?: number}>} orderItems - Array of ordered item names or items with quantities
 * @returns {object} Object containing itemized details and total bill amount
 * @throws {Error} When order items list is invalid or contains an unknown item
 */
function calculateBill(orderItems) {
  if (!Array.isArray(orderItems) || orderItems.length === 0) {
    throw new Error("Order rejected: Order items must be a non-empty list.");
  }

  // Step 1: Use map() to resolve each ordered item against the MENU and get price list
  const itemizedPrices = orderItems.map((item, index) => {
    // Standardize item representation (supports string name or object { name, quantity })
    const itemName = typeof item === "string" ? item.trim() : item?.name?.trim();
    const quantity = typeof item === "object" && item.quantity !== undefined ? item.quantity : 1;

    if (!itemName) {
      throw new Error(`Item at position #${index + 1} is invalid or has no name.`);
    }

    if (typeof quantity !== "number" || quantity <= 0 || !Number.isInteger(quantity)) {
      throw new Error(`Invalid quantity (${quantity}) specified for "${itemName}". Quantity must be a positive integer.`);
    }

    // Lookup menu item (case-insensitive)
    const menuItem = MENU.find(m => m.name.toLowerCase() === itemName.toLowerCase());

    if (!menuItem) {
      throw new Error(`Item "${itemName}" is not available on our menu.`);
    }

    const lineTotal = menuItem.price * quantity;

    return {
      name: menuItem.name,
      unitPrice: menuItem.price,
      quantity: quantity,
      lineTotal: lineTotal
    };
  });

  // Step 2: Use reduce() to compute the final bill total from the mapped prices
  const totalAmount = itemizedPrices.reduce((runningTotal, currentItem) => {
    return runningTotal + currentItem.lineTotal;
  }, 0);

  return {
    items: itemizedPrices,
    totalAmount: totalAmount
  };
}

/**
 * Helper to process an order safely inside a try-catch block and log meaningful messages.
 * 
 * @param {string} customerName - Name of the customer placing the order
 * @param {Array} orderItems - Ordered items
 */
function placeOrder(customerName, orderItems) {
  console.log(`\nProcessing Order for: ${customerName}...`);
  try {
    const bill = calculateBill(orderItems);

    console.log(`✅ Order Confirmed for ${customerName}!`);
    console.log("   Itemized Summary:");
    bill.items.forEach((item, idx) => {
      console.log(`     ${idx + 1}. ${item.name} x ${item.quantity} @ Rs.${item.unitPrice} = Rs.${item.lineTotal}`);
    });
    console.log(`   ---------------------------------------------`);
    console.log(`   💰 TOTAL PAYABLE: Rs. ${bill.totalAmount}\n`);
    return bill;
  } catch (error) {
    console.error(`❌ Order Failed for ${customerName}: ${error.message}\n`);
    return null;
  }
}

// ==========================================
// TEST SCENARIOS
// ==========================================

console.log("--- Executing Test Scenarios with try-catch ---");

// Test Case 1: Valid order with simple item names
placeOrder("Aaditya Gupta", ["Margherita Pizza", "Peri Peri Fries", "Cold Coffee"]);

// Test Case 2: Valid order with quantities
placeOrder("Pooja Sharma", [
  { name: "Veggie Burger", quantity: 2 },
  { name: "Pasta Alfredo", quantity: 1 },
  { name: "Chocolate Brownie", quantity: 3 }
]);

// Test Case 3: Invalid item ordered (Not on menu) -> Triggers Error
placeOrder("Vikram Singh", ["Veggie Burger", "Sushi Platter", "Cold Coffee"]);

// Test Case 4: Invalid quantity (zero / negative) -> Triggers Error
placeOrder("Neha Verma", [
  { name: "Margherita Pizza", quantity: -2 }
]);

// Test Case 5: Empty order list -> Triggers Error
placeOrder("Rahul Mehta", []);

// Export for testing
if (typeof module !== "undefined" && module.exports) {
  module.exports = { MENU, calculateBill, placeOrder };
}
