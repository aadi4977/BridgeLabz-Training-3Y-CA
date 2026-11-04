/**
 * Q5: Movie Ticket Booking (Objects + RegExp)
 * 
 * Objective:
 * Build a movie ticket booking system with rigorous user input validation using RegExp:
 *   - Name: Alphabets only (spaces allowed between names)
 *   - Email: Proper RFC-like email format
 *   - Seats: Integer between 1 and 10 only
 * 
 * Post-Validation:
 *   - Store confirmed booking info in an object: { name, email, seats }
 *   - Display complete ticket receipt details in console and DOM.
 * 
 * Environment: Node.js & Browser Console/DOM
 */

"use strict";

console.log("====================================================================");
console.log("        Q5: MOVIE TICKET BOOKING (OBJECTS + REGEXP)                 ");
console.log("====================================================================\n");

/**
 * Validation patterns for booking form.
 */
const BOOKING_REGEX = {
    name: /^[A-Za-z]+(?: [A-Za-z]+)*$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    seats: /^(?:[1-9]|10)$/ // Matches exactly integers 1 through 10
};

const PRICE_PER_TICKET = 15.00;

/**
 * Validates movie booking fields using regular expressions.
 * @param {string} name 
 * @param {string} email 
 * @param {string|number} seats 
 * @returns {{isValid: boolean, errors: Object, cleanData?: Object}}
 */
function validateBookingInput(name, email, seats) {
    const trimmedName = String(name ?? "").trim();
    const trimmedEmail = String(email ?? "").trim();
    const strSeats = String(seats ?? "").trim();

    const errors = {};

    if (!trimmedName) {
        errors.name = "Name is required.";
    } else if (!BOOKING_REGEX.name.test(trimmedName)) {
        errors.name = "Name must contain alphabets only.";
    }

    if (!trimmedEmail) {
        errors.email = "Email is required.";
    } else if (!BOOKING_REGEX.email.test(trimmedEmail)) {
        errors.email = "Invalid email format (e.g., patron@domain.com).";
    }

    if (strSeats === "") {
        errors.seats = "Number of seats is required.";
    } else if (!BOOKING_REGEX.seats.test(strSeats)) {
        errors.seats = "Seats must be a number between 1 and 10 only.";
    }

    const isValid = Object.keys(errors).length === 0;

    return {
        isValid,
        errors,
        cleanData: isValid ? {
            name: trimmedName,
            email: trimmedEmail,
            seats: parseInt(strSeats, 10)
        } : null
    };
}

/**
 * Creates and formats a movie booking object.
 * @param {string} name 
 * @param {string} email 
 * @param {number} seats 
 * @param {string} [movieTitle="Interstellar (IMAX 70mm)"]
 * @returns {Object} Booking receipt object
 */
function createBooking(name, email, seats, movieTitle = "Interstellar (IMAX 70mm)") {
    const validation = validateBookingInput(name, email, seats);
    if (!validation.isValid) {
        throw new Error(`Validation failed: ${JSON.stringify(validation.errors)}`);
    }

    const bookingId = "TCK-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    const numSeats = validation.cleanData.seats;
    const totalPrice = Number((numSeats * PRICE_PER_TICKET).toFixed(2));

    // Stored booking info object matching requirements: { name, email, seats, ... }
    const bookingInfo = {
        name: validation.cleanData.name,
        email: validation.cleanData.email,
        seats: numSeats,
        bookingId,
        movieTitle,
        pricePerSeat: PRICE_PER_TICKET,
        totalPrice,
        bookedAt: new Date().toISOString()
    };

    return bookingInfo;
}

/**
 * Formats ticket details for console or UI display.
 * @param {Object} booking 
 * @returns {string} Formatted ticket string
 */
function formatTicket(booking) {
    return `
+-------------------------------------------------------+
|                 CINEMA TICKET PASS                    |
+-------------------------------------------------------+
  Booking ID   : ${booking.bookingId}
  Movie        : ${booking.movieTitle}
  Patron Name  : ${booking.name}
  Patron Email : ${booking.email}
  Seats Booked : ${booking.seats} seat(s)
  Price / Seat : $${booking.pricePerSeat.toFixed(2)}
  Total Paid   : $${booking.totalPrice.toFixed(2)}
  Timestamp    : ${booking.bookedAt}
+-------------------------------------------------------+`;
}

// -----------------------------------------------------------------------------
// Browser DOM Integration
// -----------------------------------------------------------------------------
function setupMovieBookingDOM() {
    if (typeof document === "undefined") return;

    const form = document.getElementById("movieBookingForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const nameVal = document.getElementById("movie-name")?.value;
        const emailVal = document.getElementById("movie-email")?.value;
        const seatsVal = document.getElementById("movie-seats")?.value;
        const resultContainer = document.getElementById("movie-ticket-result");

        const validation = validateBookingInput(nameVal, emailVal, seatsVal);

        // Update error UI
        const nameErr = document.getElementById("movie-name-error");
        const emailErr = document.getElementById("movie-email-error");
        const seatsErr = document.getElementById("movie-seats-error");

        if (nameErr) nameErr.textContent = validation.errors.name || "";
        if (emailErr) emailErr.textContent = validation.errors.email || "";
        if (seatsErr) seatsErr.textContent = validation.errors.seats || "";

        if (!validation.isValid) {
            if (resultContainer) {
                resultContainer.innerHTML = `<div style="color: #ef4444; margin-top: 10px;">Please correct the errors above.</div>`;
            }
            return;
        }

        const ticket = createBooking(nameVal, emailVal, seatsVal);
        console.log("[MovieBooking] Successful booking object:", ticket);

        if (resultContainer) {
            resultContainer.innerHTML = `
                <div style="background: #1e293b; border: 2px dashed #38bdf8; border-radius: 8px; padding: 16px; margin-top: 15px; color: #f8fafc;">
                    <div style="font-size: 18px; font-weight: bold; color: #38bdf8; margin-bottom: 8px;">🎬 Ticket Confirmed!</div>
                    <div><strong>Booking ID:</strong> ${ticket.bookingId}</div>
                    <div><strong>Movie:</strong> ${ticket.movieTitle}</div>
                    <div><strong>Name:</strong> ${ticket.name}</div>
                    <div><strong>Email:</strong> ${ticket.email}</div>
                    <div><strong>Seats:</strong> ${ticket.seats}</div>
                    <div><strong>Total:</strong> $${ticket.totalPrice.toFixed(2)}</div>
                </div>
            `;
        }
    });
}

if (typeof window !== "undefined" && typeof document !== "undefined") {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", setupMovieBookingDOM);
    } else {
        setupMovieBookingDOM();
    }
}

// -----------------------------------------------------------------------------
// Node.js Automated Demonstration
// -----------------------------------------------------------------------------
if (typeof process !== "undefined" && process.versions && process.versions.node) {
    console.log("--- 1. Testing Valid Booking Request ---");
    const validBooking = createBooking("Samantha Reed", "samantha@cinema.org", 4);
    console.log(formatTicket(validBooking));

    console.log("\n--- 2. Testing Invalid Booking Inputs ---");
    const invalidInputs = [
        { name: "Sam123", email: "sam@domain.com", seats: 2, label: "Invalid Name (digits)" },
        { name: "Sam Reed", email: "samdomain.com", seats: 3, label: "Invalid Email (missing @)" },
        { name: "Sam Reed", email: "sam@domain.com", seats: 12, label: "Invalid Seats (> 10)" },
        { name: "Sam Reed", email: "sam@domain.com", seats: 0, label: "Invalid Seats (< 1)" }
    ];

    invalidInputs.forEach(item => {
        const check = validateBookingInput(item.name, item.email, item.seats);
        console.log(`[Validation Test: ${item.label}] -> Valid: ${check.isValid}, Errors:`, check.errors);
    });
}

// Export for module systems
if (typeof module !== "undefined" && module.exports) {
    module.exports = { validateBookingInput, createBooking, formatTicket };
}
