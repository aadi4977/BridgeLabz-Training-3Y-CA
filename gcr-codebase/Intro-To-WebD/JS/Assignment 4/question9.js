/**
 * Q9: Shopping Cart Total (Classes + RegExp for Coupon)
 * 
 * Objective:
 * Build an e-commerce shopping cart system using ES6 Cart class.
 * Features:
 *   - Add items with properties: name, price, quantity
 *   - Calculate cart subtotal using getTotal()
 *   - Apply coupon validation using RegExp:
 *       Format must match prefixes like SAVE or DISC followed by percentage numbers (e.g., SAVE20, DISC10)
 *       RegExp Pattern: /^(SAVE|DISC)(\d{1,2})$/i
 *   - If coupon is valid, calculate and deduct corresponding percentage discount and output final total.
 * 
 * Environment: Node.js & Browser Console/DOM
 */

"use strict";

console.log("====================================================================");
console.log("     Q9: SHOPPING CART TOTAL (CLASSES + REGEXP FOR COUPON)          ");
console.log("====================================================================\n");

/**
 * Regular expression validating coupon codes with prefix (SAVE or DISC) and discount percentage.
 * Example: SAVE20 -> Prefix: SAVE, Percentage: 20%
 *          DISC10 -> Prefix: DISC, Percentage: 10%
 */
const COUPON_REGEX = /^(SAVE|DISC)(\d{1,2})$/i;

/**
 * Class representing an Item in the Shopping Cart.
 */
class CartItem {
    constructor(name, price, quantity = 1) {
        if (typeof price !== "number" || price < 0 || isNaN(price)) {
            throw new TypeError(`Invalid price for item ${name}: ${price}`);
        }
        if (typeof quantity !== "number" || quantity <= 0 || !Number.isInteger(quantity)) {
            throw new TypeError(`Quantity must be a positive integer.`);
        }
        this.name = name;
        this.price = Number(price.toFixed(2));
        this.quantity = quantity;
    }

    getSubtotal() {
        return Number((this.price * this.quantity).toFixed(2));
    }
}

/**
 * Class representing the Shopping Cart.
 */
class Cart {
    constructor() {
        this.items = [];
        this.couponCode = null;
        this.discountPercent = 0;
    }

    /**
     * Adds an item to the shopping cart. If already present, increments quantity.
     * @param {string} name 
     * @param {number} price 
     * @param {number} [quantity=1] 
     */
    addItem(name, price, quantity = 1) {
        const existing = this.items.find(item => item.name.toLowerCase() === name.toLowerCase());
        if (existing) {
            existing.quantity += quantity;
            console.log(`[Cart] Updated "${name}" quantity to ${existing.quantity}.`);
        } else {
            const newItem = new CartItem(name, price, quantity);
            this.items.push(newItem);
            console.log(`[Cart] Added "${name}" (${quantity}x @ $${price.toFixed(2)})`);
        }
    }

    /**
     * Calculates the subtotal price of all items in cart before discounts.
     * @returns {number} Subtotal
     */
    getTotal() {
        const subtotal = this.items.reduce((total, item) => total + item.getSubtotal(), 0);
        return Number(subtotal.toFixed(2));
    }

    /**
     * Validates and applies a promotional coupon code using regular expressions.
     * @param {string} couponInput 
     * @returns {{isValid: boolean, message: string, discountPercent?: number, finalTotal?: number}}
     */
    applyCoupon(couponInput) {
        const trimmed = String(couponInput || "").trim();
        const match = trimmed.match(COUPON_REGEX);

        if (!match) {
            console.warn(`[Coupon Rejected] "${trimmed}" is invalid. Format must be like SAVE20 or DISC10.`);
            return {
                isValid: false,
                message: `Invalid coupon format "${trimmed}". Must start with SAVE or DISC followed by discount percentage (e.g., SAVE20, DISC10).`
            };
        }

        const prefix = match[1].toUpperCase();
        const discountPercent = parseInt(match[2], 10);

        if (discountPercent <= 0 || discountPercent > 90) {
            return {
                isValid: false,
                message: `Discount percentage must be between 1% and 90%. Found ${discountPercent}%.`
            };
        }

        this.couponCode = `${prefix}${discountPercent}`;
        this.discountPercent = discountPercent;

        const subtotal = this.getTotal();
        const discountAmount = Number(((subtotal * discountPercent) / 100).toFixed(2));
        const finalTotal = Number((subtotal - discountAmount).toFixed(2));

        console.log(`[Coupon Applied] "${this.couponCode}": ${discountPercent}% off applied. Subtotal: $${subtotal.toFixed(2)} - Discount: $${discountAmount.toFixed(2)} = Final: $${finalTotal.toFixed(2)}`);

        return {
            isValid: true,
            message: `Coupon "${this.couponCode}" applied successfully! You saved ${discountPercent}%.`,
            discountPercent,
            discountAmount,
            finalTotal
        };
    }

    /**
     * Calculates the final total after applying any valid coupon discount.
     * @returns {number} Final total payable
     */
    getFinalTotal() {
        const subtotal = this.getTotal();
        if (this.discountPercent > 0) {
            const discountAmount = (subtotal * this.discountPercent) / 100;
            return Number((subtotal - discountAmount).toFixed(2));
        }
        return subtotal;
    }

    /**
     * Clears any applied coupon.
     */
    removeCoupon() {
        this.couponCode = null;
        this.discountPercent = 0;
    }

    /**
     * Formats an itemized receipt for console or UI display.
     * @returns {string}
     */
    getReceipt() {
        const subtotal = this.getTotal();
        const discountAmount = Number(((subtotal * this.discountPercent) / 100).toFixed(2));
        const finalTotal = this.getFinalTotal();

        let receipt = "--------------------------------------------------------\n";
        receipt += "                 SHOPPING CART RECEIPT                  \n";
        receipt += "--------------------------------------------------------\n";
        this.items.forEach(item => {
            const line = `${item.name.padEnd(24)} x${item.quantity} @ $${item.price.toFixed(2)}`;
            const sub = `$${item.getSubtotal().toFixed(2)}`.padStart(15);
            receipt += ` ${line}${sub}\n`;
        });
        receipt += "--------------------------------------------------------\n";
        receipt += ` Subtotal:                                    $${subtotal.toFixed(2).padStart(8)}\n`;
        if (this.couponCode) {
            receipt += ` Coupon (${this.couponCode} - ${this.discountPercent}% OFF):           -$${discountAmount.toFixed(2).padStart(7)}\n`;
        }
        receipt += "========================================================\n";
        receipt += ` Final Payable Total:                         $${finalTotal.toFixed(2).padStart(8)}\n`;
        receipt += "========================================================";
        return receipt;
    }
}

// -----------------------------------------------------------------------------
// Browser DOM Integration
// -----------------------------------------------------------------------------
function setupShoppingCartDOM() {
    if (typeof document === "undefined") return;

    const cart = new Cart();
    cart.addItem("Mechanical Keyboard", 120.00, 1);
    cart.addItem("Wireless Gaming Mouse", 45.00, 2);
    cart.addItem("USB-C Multiport Adapter", 35.00, 1);

    const receiptDisplay = document.getElementById("cart-receipt-display");
    const couponForm = document.getElementById("couponForm");
    const couponInput = document.getElementById("cart-coupon-input");
    const couponFeedback = document.getElementById("cart-coupon-feedback");

    function renderCartUI() {
        if (receiptDisplay) {
            receiptDisplay.textContent = cart.getReceipt();
        }
    }

    renderCartUI();

    if (couponForm && couponInput && couponFeedback) {
        couponForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const code = couponInput.value.trim();
            const res = cart.applyCoupon(code);

            if (res.isValid) {
                couponFeedback.style.color = "#10b981";
                couponFeedback.textContent = res.message;
            } else {
                couponFeedback.style.color = "#ef4444";
                couponFeedback.textContent = res.message;
            }
            renderCartUI();
        });
    }
}

if (typeof window !== "undefined" && typeof document !== "undefined") {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", setupShoppingCartDOM);
    } else {
        setupShoppingCartDOM();
    }
}

// -----------------------------------------------------------------------------
// Node.js Automated Demonstration
// -----------------------------------------------------------------------------
if (typeof process !== "undefined" && process.versions && process.versions.node) {
    const demoCart = new Cart();

    console.log("--- 1. Adding Items to Cart ---");
    demoCart.addItem("Mechanical Keyboard", 120.00, 1);
    demoCart.addItem("Wireless Gaming Mouse", 45.00, 2); // $90.00
    demoCart.addItem("USB-C Multiport Adapter", 35.00, 1); // $35.00
    // Total subtotal: 120 + 90 + 35 = 245.00

    console.log(`\nCart Subtotal via getTotal(): $${demoCart.getTotal().toFixed(2)}`);

    console.log("\n--- 2. Testing Invalid Coupon Formats with RegExp ---");
    demoCart.applyCoupon("INVALID_CODE");
    demoCart.applyCoupon("DISCOUNT50");
    demoCart.applyCoupon("SAVE");

    console.log("\n--- 3. Testing Valid Coupon Code (SAVE20 -> 20% Discount) ---");
    demoCart.applyCoupon("SAVE20");
    console.log("\nReceipt with SAVE20:");
    console.log(demoCart.getReceipt());

    console.log("\n--- 4. Testing Another Valid Coupon Code (DISC10 -> 10% Discount) ---");
    demoCart.applyCoupon("DISC10");
    console.log("\nReceipt with DISC10:");
    console.log(demoCart.getReceipt());
}

// Export for module systems
if (typeof module !== "undefined" && module.exports) {
    module.exports = { Cart, CartItem, COUPON_REGEX };
}
