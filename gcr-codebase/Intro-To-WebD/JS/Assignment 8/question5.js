/**
 * ASSIGNMENT 8 - QUESTION 5
 * Topic: Ride-Sharing Application (Inheritance & Error Handling)
 * 
 * Objective:
 * Create classes:
 *   - User -> name, rating
 *   - Driver -> inherits from User, vehicle details
 *   - Trip -> fromLocation, toLocation, distance
 * Scenario:
 *   - Write a calculateFare() method inside Trip using distance.
 *   - Throw an error if distance is negative or not provided.
 *   - Use try/catch to handle the error and show a proper message.
 */

"use strict";

console.log("====================================================================");
console.log("     Q5: RIDE-SHARING APPLICATION (INHERITANCE & ERROR HANDLING)    ");
console.log("====================================================================\n");

/**
 * Base User Class.
 */
class User {
  /**
   * @param {string} name - Full name of the user
   * @param {number} rating - Rating between 1.0 and 5.0
   */
  constructor(name, rating = 5.0) {
    if (!name || typeof name !== "string") {
      throw new Error("User name must be a non-empty string.");
    }
    if (typeof rating !== "number" || rating < 1.0 || rating > 5.0) {
      throw new Error("Rating must be a numeric score between 1.0 and 5.0.");
    }

    this.name = name;
    this.rating = rating;
  }

  getProfile() {
    return `${this.name} (⭐ ${this.rating.toFixed(1)})`;
  }
}

/**
 * Driver Class inheriting from User.
 */
class Driver extends User {
  /**
   * @param {string} name - Driver's name
   * @param {number} rating - Driver's rating
   * @param {string|object} vehicleDetails - Vehicle model and license number
   */
  constructor(name, rating, vehicleDetails) {
    super(name, rating);

    if (!vehicleDetails) {
      throw new Error("Vehicle details are required for Driver registration.");
    }

    this.vehicleDetails = vehicleDetails;
  }

  getDriverDetails() {
    const vehicle = typeof this.vehicleDetails === "object" 
      ? `${this.vehicleDetails.model} [${this.vehicleDetails.plateNumber}]` 
      : this.vehicleDetails;
    return `Driver: ${this.name} | Rating: ⭐ ${this.rating.toFixed(1)} | Vehicle: ${vehicle}`;
  }
}

/**
 * Trip Class to manage ride details and fare computation.
 */
class Trip {
  /**
   * @param {string} fromLocation - Pickup location
   * @param {string} toLocation - Dropoff location
   * @param {number} distance - Distance in kilometers
   * @param {User} [rider=null] - Optional rider object
   * @param {Driver} [driver=null] - Optional driver object
   */
  constructor(fromLocation, toLocation, distance, rider = null, driver = null) {
    if (!fromLocation || !toLocation) {
      throw new Error("Trip must have both pickup and drop-off locations.");
    }

    this.fromLocation = fromLocation;
    this.toLocation = toLocation;
    this.distance = distance;
    this.rider = rider;
    this.driver = driver;
  }

  /**
   * Calculates the trip fare based on distance.
   * Throws an error if distance is negative, omitted, or not a number.
   * 
   * @param {number} [ratePerKm=14] - Rate per kilometer in INR
   * @param {number} [baseFare=50] - Standard base booking fare in INR
   * @returns {number} Computed trip fare
   * @throws {Error} If distance is missing, not a number, or negative
   */
  calculateFare(ratePerKm = 14, baseFare = 50) {
    // Validation check: distance is not provided or null
    if (this.distance === undefined || this.distance === null) {
      throw new Error("Distance is missing: A valid trip distance must be provided to calculate fare.");
    }

    // Validation check: non-numeric or NaN
    if (typeof this.distance !== "number" || isNaN(this.distance)) {
      throw new Error(`Invalid distance value '${this.distance}'. Distance must be a numeric value.`);
    }

    // Validation check: negative distance
    if (this.distance < 0) {
      throw new Error(`Distance cannot be negative. Provided distance: ${this.distance} km.`);
    }

    // Edge case: 0 km
    if (this.distance === 0) {
      return baseFare;
    }

    const calculatedFare = baseFare + (this.distance * ratePerKm);
    return Math.round(calculatedFare);
  }

  /**
   * Generates a readable trip summary.
   * @returns {string} Trip overview
   */
  getSummary() {
    const riderName = this.rider ? this.rider.name : "Guest";
    const driverName = this.driver ? this.driver.name : "Unassigned";
    return `Route: [${this.fromLocation} ➔ ${this.toLocation}] | Distance: ${this.distance} km | Rider: ${riderName} | Driver: ${driverName}`;
  }
}

// ==========================================
// TEST SCENARIOS WITH TRY/CATCH ERROR HANDLING
// ==========================================

console.log("--- Initializing Users and Drivers ---");
const passenger = new User("Priya Deshmukh", 4.9);
const cabDriver = new Driver("Harish Patel", 4.8, { model: "Hyundai Aura CNG", plateNumber: "MH 02 EE 4091" });

console.log("Rider Profile  :", passenger.getProfile());
console.log("Driver Profile :", cabDriver.getDriverDetails());
console.log("");

/**
 * Helper to process a trip fare calculation inside a try/catch block.
 * @param {Trip} trip 
 */
function processTripFare(trip) {
  console.log(`Evaluating Trip: ${trip.fromLocation} to ${trip.toLocation}...`);
  try {
    const fare = trip.calculateFare();
    console.log(`✅ Fare Calculation Successful!`);
    console.log(`   ${trip.getSummary()}`);
    console.log(`   💰 Total Estimated Fare: Rs. ${fare}\n`);
  } catch (error) {
    console.error(`❌ Fare Calculation Failed: ${error.message}\n`);
  }
}

console.log("--- Running Scenarios (Valid and Invalid Trips) ---\n");

// Scenario 1: Valid city commute
const trip1 = new Trip("Bandra Kurla Complex", "Chhatrapati Shivaji Airport", 8.5, passenger, cabDriver);
processTripFare(trip1);

// Scenario 2: Valid long-distance highway commute
const trip2 = new Trip("Mumbai Central", "Pune Station", 148.0, passenger, cabDriver);
processTripFare(trip2);

// Scenario 3: Negative distance error (Testing error throw and catch)
const tripWithNegativeDistance = new Trip("Andheri East", "Powai Lake", -12.5, passenger, cabDriver);
processTripFare(tripWithNegativeDistance);

// Scenario 4: Distance not provided (undefined) (Testing error throw and catch)
const tripWithoutDistance = new Trip("Colaba", "Marine Drive", undefined, passenger, cabDriver);
processTripFare(tripWithoutDistance);

// Scenario 5: Non-numeric distance value (Testing error throw and catch)
const tripWithInvalidDistance = new Trip("Dadar", "Thane", "ten kilometers", passenger, cabDriver);
processTripFare(tripWithInvalidDistance);

// Export for testing
if (typeof module !== "undefined" && module.exports) {
  module.exports = { User, Driver, Trip, processTripFare };
}
