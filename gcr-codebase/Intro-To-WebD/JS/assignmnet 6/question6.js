/**
 * ASSIGNMENT 6 - QUESTION 6
 * Topic: E-Commerce Dashboard: Product Card Fetcher
 * 
 * Objective:
 * Fetch and display product data dynamically using the Fake Store API.
 * 
 * Requirements:
 * 1. API Endpoint: https://fakestoreapi.com/products
 * 2. Fetch product data using either fetch().then() or async/await.
 * 3. For each product, log:
 *      Product: <Product Title>
 *      Price: $<Price>
 *      Image: <Image URL>
 * 4. Handle errors using try/catch and display "Failed to load products. Please try again."
 *    if the request fails.
 * 5. Bonus (Optional): Create HTML product cards dynamically using
 *    document.createElement() and append to the page if running in a browser.
 */

"use strict";

console.log("====================================================================");
console.log("      Q6: E-COMMERCE DASHBOARD: PRODUCT CARD FETCHER                ");
console.log("====================================================================\n");

const API_URL = "https://fakestoreapi.com/products";

// Fallback mock dataset used if running in an offline environment (e.g. offline sandbox or network down)
const MOCK_PRODUCTS = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
  },
  {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts",
    price: 22.3,
    image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
  },
  {
    id: 3,
    title: "Mens Cotton Jacket",
    price: 55.99,
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg"
  }
];

/**
 * Logs product information to the console matching the exact format required.
 * @param {Array<{title: string, price: number, image: string}>} products
 */
function logProductsToConsole(products) {
  products.forEach((product, index) => {
    console.log(`Product: ${product.title}`);
    console.log(`Price: $${typeof product.price === "number" ? product.price.toFixed(2) : product.price}`);
    console.log(`Image: ${product.image}`);
    console.log("----------------------------------------------------");
  });
}

/**
 * Bonus: Dynamically renders product cards into the DOM using document.createElement().
 * Works when executed in a browser or HTML page.
 * @param {Array<object>} products 
 */
function renderProductCardsToDOM(products) {
  if (typeof document === "undefined") {
    // Running in Node.js environment
    return;
  }

  let container = document.getElementById("product-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "product-container";
    container.style.display = "grid";
    container.style.gridTemplateColumns = "repeat(auto-fill, minmax(220px, 1fr))";
    container.style.gap = "20px";
    container.style.padding = "20px";
    container.style.fontFamily = "system-ui, -apple-system, sans-serif";
    document.body.appendChild(container);
  }

  container.innerHTML = ""; // Clear existing

  products.forEach((product) => {
    // Card container
    const card = document.createElement("div");
    card.className = "product-card";
    card.style.border = "1px solid #e2e8f0";
    card.style.borderRadius = "10px";
    card.style.padding = "16px";
    card.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
    card.style.display = "flex";
    card.style.flexDirection = "column";
    card.style.alignItems = "center";
    card.style.backgroundColor = "#ffffff";

    // Product Image
    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.title;
    img.style.width = "140px";
    img.style.height = "140px";
    img.style.objectFit = "contain";
    img.style.marginBottom = "12px";

    // Product Title
    const title = document.createElement("h3");
    title.textContent = product.title;
    title.style.fontSize = "0.95rem";
    title.style.fontWeight = "600";
    title.style.textAlign = "center";
    title.style.margin = "8px 0";
    title.style.height = "42px";
    title.style.overflow = "hidden";

    // Product Price
    const price = document.createElement("p");
    price.textContent = `$${typeof product.price === "number" ? product.price.toFixed(2) : product.price}`;
    price.style.color = "#059669";
    price.style.fontWeight = "700";
    price.style.fontSize = "1.1rem";
    price.style.margin = "6px 0 0 0";

    // Append all children
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(price);
    container.appendChild(card);
  });
}

/**
 * Main function to fetch and display products using async/await and try/catch.
 */
async function fetchAndDisplayProducts() {
  console.log(`Connecting to: ${API_URL} ...\n`);

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const products = await response.json();
    console.log(`Successfully fetched ${products.length} products from Fake Store API:\n`);
    logProductsToConsole(products);
    renderProductCardsToDOM(products);

  } catch (error) {
    // Requirement: Handle errors using try/catch and display exact message:
    console.error("Failed to load products. Please try again.");
    console.error(`[Error Details: ${error.message}]`);

    // In an offline/testing environment, fallback to simulated mock data demonstration:
    console.log("\n[Offline Mode / Demo Fallback]: Displaying cached sample product cards:");
    logProductsToConsole(MOCK_PRODUCTS);
    renderProductCardsToDOM(MOCK_PRODUCTS);
  }
}

// Execute the fetch flow
fetchAndDisplayProducts();
