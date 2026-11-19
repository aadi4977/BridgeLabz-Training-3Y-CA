/**
 * ASSIGNMENT 8 - QUESTION 3
 * Topic: Product Discount System
 * 
 * Objective:
 * Create a Product constructor function with:
 *   - name
 *   - price
 * Add a prototype method applyDiscount(percent) that returns new price.
 * Now create 3 products and apply different discounts.
 * Show how abstraction helps simplify operations.
 */

"use strict";

console.log("====================================================================");
console.log("           Q3: PRODUCT DISCOUNT SYSTEM (PROTOTYPE & ABSTRACTION)    ");
console.log("====================================================================\n");

/**
 * Product constructor function.
 * Initializes a new product with name and base price.
 * 
 * @constructor
 * @param {string} name - Name of the product
 * @param {number} price - Original retail price in INR
 */
function Product(name, price) {
  if (!name || typeof name !== "string") {
    throw new Error("Product name must be a non-empty string.");
  }
  if (typeof price !== "number" || isNaN(price) || price < 0) {
    throw new Error("Product price must be a non-negative number.");
  }

  this.name = name;
  this.price = price;
}

/**
 * Prototype method to apply a discount percentage and return the new discounted price.
 * Demonstrates Abstraction:
 * The caller does not need to know how the discount is computed, rounded,
 * or validated; they only provide the percentage and receive the final price.
 * 
 * @param {number} percent - Discount percentage (0 - 100)
 * @returns {number} Discounted final price
 */
Product.prototype.applyDiscount = function(percent) {
  if (typeof percent !== "number" || isNaN(percent) || percent < 0 || percent > 100) {
    throw new Error(`Invalid discount percentage: ${percent}%. Must be between 0 and 100.`);
  }

  // Abstracted internal business logic:
  const discountAmount = (this.price * percent) / 100;
  const finalPrice = this.price - discountAmount;

  // Round to 2 decimal places for currency accuracy
  return Number(finalPrice.toFixed(2));
};

/**
 * Prototype method to return an item summary object.
 * @param {number} discountPercent
 * @returns {object} Summary details
 */
Product.prototype.getDiscountDetails = function(discountPercent) {
  const discountedPrice = this.applyDiscount(discountPercent);
  const savings = Number((this.price - discountedPrice).toFixed(2));

  return {
    productName: this.name,
    originalPrice: `Rs. ${this.price}`,
    discountPercent: `${discountPercent}%`,
    savings: `Rs. ${savings}`,
    finalPrice: `Rs. ${discountedPrice}`
  };
};

// ==========================================
// DEMONSTRATION & TESTING FOR 3 PRODUCTS
// ==========================================

console.log("--- Creating 3 Products using Constructor Function ---");

const product1 = new Product("MacBook Air M2", 99990);
const product2 = new Product("Sony WH-1000XM5 Headphones", 29990);
const product3 = new Product("Logitech MX Master 3S Mouse", 8995);

console.log(`1. Created: ${product1.name} (Original Price: Rs. ${product1.price})`);
console.log(`2. Created: ${product2.name} (Original Price: Rs. ${product2.price})`);
console.log(`3. Created: ${product3.name} (Original Price: Rs. ${product3.price})\n`);

console.log("--- Applying Different Discounts via Prototype Method ---");

const discountReport = [
  product1.getDiscountDetails(15), // 15% off on MacBook
  product2.getDiscountDetails(20), // 20% off on Sony Headphones
  product3.getDiscountDetails(10)  // 10% off on Logitech Mouse
];

console.table(discountReport);

// ==========================================
// EXPLANATION: HOW ABSTRACTION SIMPLIFIES OPERATIONS
// ==========================================

console.log("====================================================================");
console.log("           HOW ABSTRACTION HELPS SIMPLIFY OPERATIONS                ");
console.log("====================================================================");
console.log(`
1. Hiding Complexity:
   The consumer of the Product object does not need to know the underlying
   arithmetic: ((price * percent) / 100), edge-case bounds checking, or floating
   point rounding with .toFixed(2). They simply invoke .applyDiscount(15).

2. Consistency & Single Source of Truth:
   By defining applyDiscount on Product.prototype, every instance shares one
   centralized implementation. If company discount tax laws change tomorrow,
   we only modify the prototype method without rewriting code in hundreds of places.

3. Interface Simplicity:
   The user interacts with a clean, intuitive public interface:
     const newPrice = product.applyDiscount(15);
   This decouples client code from the internal representation of data.
====================================================================\n`);

// Export for Node and browser
if (typeof module !== "undefined" && module.exports) {
  module.exports = { Product };
}
