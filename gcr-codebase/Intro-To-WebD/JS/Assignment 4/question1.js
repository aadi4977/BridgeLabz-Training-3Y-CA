/**
 * Q1: E-Commerce Product Manager (Classes + Objects)
 * 
 * Objective:
 * Build an E-commerce Admin Panel product management module using ES6 Classes.
 * Create a Product class with properties: id, name, price, and category.
 * Add methods to:
 *   - Apply a percentage discount (e.g., 10%)
 *   - Display product details in a formatted string
 * Create multiple product objects stored in an array.
 * Display products with price > 1000 in the console using Array.prototype.filter().
 * 
 * Environment: Node.js & Browser Console
 */

"use strict";

console.log("====================================================================");
console.log("        Q1: E-COMMERCE PRODUCT MANAGER (CLASSES + OBJECTS)          ");
console.log("====================================================================\n");

/**
 * Class representing an E-Commerce Product.
 */
class Product {
    /**
     * Creates an instance of Product.
     * @param {number|string} id - Unique identifier for the product
     * @param {string} name - Name of the product
     * @param {number} price - Original retail price of the product
     * @param {string} category - Category the product belongs to
     */
    constructor(id, name, price, category) {
        if (typeof price !== "number" || price < 0 || isNaN(price)) {
            throw new TypeError(`Invalid price for product ${name}: ${price}`);
        }
        this.id = id;
        this.name = name;
        this.price = Number(price.toFixed(2));
        this.category = category;
        this.originalPrice = this.price;
        this.discountApplied = 0;
    }

    /**
     * Applies a discount percentage to the product price.
     * @param {number} discountPercent - Discount percentage (e.g., 10 for 10%)
     * @returns {number} The updated price after applying the discount
     */
    applyDiscount(discountPercent) {
        if (typeof discountPercent !== "number" || discountPercent < 0 || discountPercent > 100) {
            console.error(`[Error] Invalid discount percentage (${discountPercent}%) for ${this.name}. Must be 0-100.`);
            return this.price;
        }

        const discountAmount = (this.price * discountPercent) / 100;
        this.price = Number((this.price - discountAmount).toFixed(2));
        this.discountApplied += discountPercent;

        console.log(`[Discount Applied] ${discountPercent}% off on "${this.name}". Discount Amount: $${discountAmount.toFixed(2)}. New Price: $${this.price.toFixed(2)}`);
        return this.price;
    }

    /**
     * Formats and displays the product details as a readable string.
     * @returns {string} Formatted product details
     */
    displayDetails() {
        const discountInfo = this.discountApplied > 0 
            ? ` (Orig: $${this.originalPrice.toFixed(2)}, Saved: ${this.discountApplied}%)` 
            : "";
        return `[ID: ${this.id}] ${this.name.padEnd(20)} | Category: ${this.category.padEnd(14)} | Price: $${this.price.toFixed(2)}${discountInfo}`;
    }
}

// -----------------------------------------------------------------------------
// Demonstration & Testing
// -----------------------------------------------------------------------------

// 1. Create multiple product objects and store them in an array
const inventory = [
    new Product(101, "MacBook Pro 16\"", 2499.00, "Electronics"),
    new Product(102, "Wireless Mouse", 29.99, "Accessories"),
    new Product(103, "4K Gaming Monitor", 1199.50, "Electronics"),
    new Product(104, "Ergonomic Chair", 450.00, "Furniture"),
    new Product(105, "Smart Smartphone", 1099.00, "Electronics"),
    new Product(106, "Mechanical Keyboard", 120.00, "Accessories"),
    new Product(107, "Standing Desk", 1050.00, "Furniture")
];

console.log("--- Initial Inventory (All Products) ---");
inventory.forEach(product => console.log(product.displayDetails()));

// 2. Display products with price > 1000 using Array.prototype.filter()
console.log("\n--- Premium Products (Price > $1,000) using filter() ---");
const premiumThreshold = 1000;
const premiumProducts = inventory.filter(product => product.price > premiumThreshold);

if (premiumProducts.length > 0) {
    premiumProducts.forEach(product => console.log(` * ${product.displayDetails()}`));
} else {
    console.log("No products found with price > $1000.");
}
console.log(`Total premium products found: ${premiumProducts.length}`);

// 3. Apply discount method demonstration
console.log("\n--- Applying Discounts ---");
console.log("Applying 10% discount on MacBook Pro 16\":");
inventory[0].applyDiscount(10);

console.log("Applying 15% discount on 4K Gaming Monitor:");
inventory[2].applyDiscount(15);

// 4. Re-check premium products after discounts
console.log("\n--- Updated Details After Discounts ---");
console.log(inventory[0].displayDetails());
console.log(inventory[2].displayDetails());

// Export for Node.js or browser global
if (typeof module !== "undefined" && module.exports) {
    module.exports = { Product, inventory };
}
