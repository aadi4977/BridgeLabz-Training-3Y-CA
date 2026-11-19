/**
 * ASSIGNMENT 8 - QUESTION 6
 * Topic: E-Commerce Inventory System (Array Methods: filter, sort, reduce)
 * 
 * Objective:
 * You have an array of product objects with:
 *   { id, name, category, price, stock }
 * Write functions using array methods:
 *   1. getLowStockProducts() → using filter()
 *   2. sortProductsByPrice() → using sort()
 *   3. calculateTotalInventoryValue() → using reduce()
 *   4. groupByCategory() → using reduce() + object grouping
 * Test using multiple category products.
 */

"use strict";

console.log("====================================================================");
console.log("          Q6: E-COMMERCE INVENTORY SYSTEM (ARRAY METHODS)           ");
console.log("====================================================================\n");

// Multi-category Inventory Dataset
const inventory = [
  { id: 1, name: "Noise Cancelling Headphones", category: "Electronics", price: 14999, stock: 12 },
  { id: 2, name: "Mechanical Gaming Keyboard", category: "Electronics", price: 6499, stock: 3 },
  { id: 3, name: "Wireless Ergonomic Mouse", category: "Electronics", price: 2999, stock: 24 },
  { id: 4, name: "Running Shoes - Nike Air", category: "Footwear", price: 7999, stock: 4 },
  { id: 5, name: "Leather Formal Shoes", category: "Footwear", price: 4499, stock: 15 },
  { id: 6, name: "Ceramic Coffee Mug Set", category: "Home & Kitchen", price: 899, stock: 35 },
  { id: 7, name: "Stainless Steel Air Fryer", category: "Home & Kitchen", price: 5499, stock: 2 },
  { id: 8, name: "Atomic Habits (Hardcover)", category: "Books", price: 599, stock: 50 },
  { id: 9, name: "Clean Code by Uncle Bob", category: "Books", price: 1299, stock: 5 },
  { id: 10, name: "Cotton Oversized T-Shirt", category: "Clothing", price: 999, stock: 1 },
  { id: 11, name: "Slim Fit Denim Jeans", category: "Clothing", price: 2499, stock: 18 }
];

console.log("--- Initial Inventory Catalog (11 Items across 5 Categories) ---");
console.table(inventory);

/**
 * 1. Filters products that have stock less than or equal to the specified threshold.
 * Uses Array.prototype.filter()
 * 
 * @param {Array<object>} products - Array of product objects
 * @param {number} [threshold=5] - Stock alert threshold
 * @returns {Array<object>} Filtered low stock products
 */
function getLowStockProducts(products, threshold = 5) {
  if (!Array.isArray(products)) {
    throw new Error("Products must be an array.");
  }
  return products.filter(product => product.stock <= threshold);
}

/**
 * 2. Sorts products by price in ascending or descending order without mutating original array.
 * Uses Array.prototype.sort()
 * 
 * @param {Array<object>} products - Array of product objects
 * @param {'asc'|'desc'} [order='asc'] - Sorting order
 * @returns {Array<object>} New sorted array of products
 */
function sortProductsByPrice(products, order = "asc") {
  if (!Array.isArray(products)) {
    throw new Error("Products must be an array.");
  }

  // Create shallow copy to prevent mutating the original inventory
  return [...products].sort((a, b) => {
    return order === "desc" ? b.price - a.price : a.price - b.price;
  });
}

/**
 * 3. Calculates the total monetary valuation of all items in inventory (price * stock).
 * Uses Array.prototype.reduce()
 * 
 * @param {Array<object>} products - Array of product objects
 * @returns {number} Total valuation in INR
 */
function calculateTotalInventoryValue(products) {
  if (!Array.isArray(products)) {
    throw new Error("Products must be an array.");
  }

  return products.reduce((accumulator, product) => {
    const itemTotal = product.price * product.stock;
    return accumulator + itemTotal;
  }, 0);
}

/**
 * 4. Groups inventory products by their category.
 * Uses Array.prototype.reduce() + Object Grouping
 * 
 * @param {Array<object>} products - Array of product objects
 * @returns {Record<string, Array<object>>} Grouped products dictionary
 */
function groupByCategory(products) {
  if (!Array.isArray(products)) {
    throw new Error("Products must be an array.");
  }

  return products.reduce((grouped, product) => {
    const { category } = product;

    // If category key doesn't exist yet, initialize it as empty array
    if (!grouped[category]) {
      grouped[category] = [];
    }

    grouped[category].push({
      id: product.id,
      name: product.name,
      price: product.price,
      stock: product.stock
    });

    return grouped;
  }, {});
}

// ==========================================
// TEST EXECUTION & RESULTS PRESENTATION
// ==========================================

console.log("\n====================================================================");
console.log("1. Low Stock Products (Stock <= 5) [filter()]");
console.log("====================================================================");
const lowStock = getLowStockProducts(inventory, 5);
console.table(lowStock);

console.log("\n====================================================================");
console.log("2. Products Sorted by Price (Ascending: Low to High) [sort()]");
console.log("====================================================================");
const sortedByPriceAsc = sortProductsByPrice(inventory, "asc");
console.table(sortedByPriceAsc);

console.log("\n====================================================================");
console.log("3. Total Inventory Valuation [reduce()]");
console.log("====================================================================");
const totalValuation = calculateTotalInventoryValue(inventory);
console.log(`💰 Total Inventory Asset Value: Rs. ${totalValuation.toLocaleString("en-IN")}`);

console.log("\n====================================================================");
console.log("4. Inventory Grouped by Category [reduce() + Object Grouping]");
console.log("====================================================================");
const groupedInventory = groupByCategory(inventory);
Object.keys(groupedInventory).forEach(cat => {
  console.log(`\n📂 Category: ${cat} (${groupedInventory[cat].length} items)`);
  groupedInventory[cat].forEach(p => {
    console.log(`   - [ID: ${p.id}] ${p.name.padEnd(32)} | Rs. ${p.price.toString().padEnd(6)} | In Stock: ${p.stock}`);
  });
});

// Export for Node and browser
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    inventory,
    getLowStockProducts,
    sortProductsByPrice,
    calculateTotalInventoryValue,
    groupByCategory
  };
}
