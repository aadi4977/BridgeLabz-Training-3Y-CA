/**
 * ASSIGNMENT 8 - QUESTION 8
 * Topic: Movie Ticket Booking System (Inheritance & Prototype Chain)
 * 
 * Objective:
 * Create a class MovieTicket with properties:
 *   - movieName
 *   - seatNo
 *   - price
 * Then create a class OnlineTicket that inherits and adds:
 *   - convenienceFee
 *   - method getTotalAmount()
 * Additionally:
 *   - Add a method to MovieTicket.prototype called printTicket()
 *   - Call it using OnlineTicket objects (demonstrate prototype chain working)
 */

"use strict";

console.log("====================================================================");
console.log("     Q8: MOVIE TICKET BOOKING SYSTEM (PROTOTYPE CHAIN WORKING)      ");
console.log("====================================================================\n");

/**
 * Base Class for standard Movie Tickets.
 */
class MovieTicket {
  /**
   * @param {string} movieName - Title of the movie
   * @param {string} seatNo - Allocated seat number (e.g., "F-12")
   * @param {number} price - Base ticket price
   */
  constructor(movieName, seatNo, price) {
    if (!movieName || typeof movieName !== "string") {
      throw new Error("Movie name must be a valid non-empty string.");
    }
    if (!seatNo || typeof seatNo !== "string") {
      throw new Error("Seat number must be specified.");
    }
    if (typeof price !== "number" || isNaN(price) || price < 0) {
      throw new Error("Ticket price must be a non-negative number.");
    }

    this.movieName = movieName;
    this.seatNo = seatNo;
    this.price = price;
  }
}

/**
 * Derived Class for tickets booked through digital platforms.
 * Inherits from MovieTicket.
 */
class OnlineTicket extends MovieTicket {
  /**
   * @param {string} movieName - Title of the movie
   * @param {string} seatNo - Allocated seat number
   * @param {number} price - Base ticket price
   * @param {number} [convenienceFee=45] - Platform handling / internet convenience fee
   */
  constructor(movieName, seatNo, price, convenienceFee = 45) {
    // Pass core properties to parent MovieTicket constructor
    super(movieName, seatNo, price);

    if (typeof convenienceFee !== "number" || convenienceFee < 0) {
      throw new Error("Convenience fee must be a non-negative number.");
    }

    this.convenienceFee = convenienceFee;
  }

  /**
   * Calculates total ticket bill inclusive of platform convenience fee.
   * @returns {number} Total payable amount
   */
  getTotalAmount() {
    return this.price + this.convenienceFee;
  }
}

// ====================================================================
// ADDING METHOD DIRECTLY TO MovieTicket.prototype
// ====================================================================
/**
 * As per assignment requirement:
 * "Add a method to MovieTicket.prototype called printTicket()"
 */
MovieTicket.prototype.printTicket = function() {
  console.log("┌────────────────────────────────────────────────────────┐");
  console.log("│                    CINEMA PASS                         │");
  console.log("├────────────────────────────────────────────────────────┤");
  console.log(`│ Movie       : ${this.movieName.padEnd(41)}│`);
  console.log(`│ Seat No     : ${this.seatNo.padEnd(41)}│`);
  console.log(`│ Base Price  : Rs. ${this.price.toString().padEnd(37)}│`);
  
  // If invoked on an OnlineTicket instance, also print the convenience fee and total
  if (this.convenienceFee !== undefined) {
    console.log(`│ Convenience : Rs. ${this.convenienceFee.toString().padEnd(37)}│`);
    console.log(`│ Total Paid  : Rs. ${this.getTotalAmount().toString().padEnd(37)}│`);
    console.log(`│ Booking Type: Online Web Booking                       │`);
  } else {
    console.log(`│ Booking Type: Box Office Counter                       │`);
  }
  console.log("└────────────────────────────────────────────────────────┘");
};

// ==========================================
// DEMONSTRATION & PROTOTYPE CHAIN INSPECTION
// ==========================================

console.log("--- Creating OnlineTicket Instances ---");

const ticket1 = new OnlineTicket("Interstellar (IMAX 70mm)", "H-14", 450, 50);
const ticket2 = new OnlineTicket("Oppenheimer", "D-08", 380, 45);

console.log("Ticket 1 Total Amount via getTotalAmount(): Rs.", ticket1.getTotalAmount());
console.log("Ticket 2 Total Amount via getTotalAmount(): Rs.", ticket2.getTotalAmount());
console.log("");

console.log("====================================================================");
console.log("CALLING printTicket() ON OnlineTicket OBJECTS");
console.log("(Proves printTicket() is found by traversing up the prototype chain)");
console.log("====================================================================");

ticket1.printTicket();
ticket2.printTicket();

console.log("\n====================================================================");
console.log("             PROTOTYPE CHAIN STEP-BY-STEP VERIFICATION              ");
console.log("====================================================================");

console.log("1. Does ticket1 have 'printTicket' as its own property?");
console.log("   -> Object.hasOwn(ticket1, 'printTicket'):", Object.hasOwn(ticket1, "printTicket")); // false

console.log("2. Does OnlineTicket.prototype have 'printTicket'?");
console.log("   -> Object.hasOwn(OnlineTicket.prototype, 'printTicket'):", Object.hasOwn(OnlineTicket.prototype, "printTicket")); // false

console.log("3. Does MovieTicket.prototype have 'printTicket'?");
console.log("   -> Object.hasOwn(MovieTicket.prototype, 'printTicket'):", Object.hasOwn(MovieTicket.prototype, "printTicket")); // true!

console.log("\n4. Prototype Chain Links:");
const proto1 = Object.getPrototypeOf(ticket1);
console.log("   - Object.getPrototypeOf(ticket1) === OnlineTicket.prototype :", proto1 === OnlineTicket.prototype);

const proto2 = Object.getPrototypeOf(proto1);
console.log("   - Object.getPrototypeOf(OnlineTicket.prototype) === MovieTicket.prototype :", proto2 === MovieTicket.prototype);

const proto3 = Object.getPrototypeOf(proto2);
console.log("   - Object.getPrototypeOf(MovieTicket.prototype) === Object.prototype :", proto3 === Object.prototype);

const proto4 = Object.getPrototypeOf(proto3);
console.log("   - Object.getPrototypeOf(Object.prototype) === null :", proto4 === null);

// Export for testing
if (typeof module !== "undefined" && module.exports) {
  module.exports = { MovieTicket, OnlineTicket };
}
