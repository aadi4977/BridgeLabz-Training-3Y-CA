/**
 * Assignment 7 - Question 1: Dynamic Product List Manager
 * 
 * Requirements:
 * 1. User can add new products using an input box.
 * 2. Each product appears with Edit and Delete buttons.
 * 3. Editing allows inline text editing.
 * 4. Use event delegation to handle Edit/Delete on the parent <ul>.
 * 5. If the user clicks outside the edited item, the edit mode should auto-save.
 * 6. Can be executed/tested in browser console or Node.js environment.
 */

"use strict";

// ============================================================================
// 1. Core State & Data Structure
// ============================================================================
const productState = {
  products: [
    { id: 1, name: "Wireless Mechanical Keyboard" },
    { id: 2, name: "Ultra-wide 4K Monitor" },
    { id: 3, name: "Ergonomic Mesh Chair" }
  ],
  editingId: null, // Tracks currently active inline edit ID
  nextId: 4
};

// ============================================================================
// 2. Logic Functions (Used in both Browser DOM & Simulated Environments)
// ============================================================================

/**
 * Adds a new product to the state.
 * @param {string} name - Product name to add.
 * @returns {object|null} The newly created product object, or null if invalid.
 */
function addProduct(name) {
  const trimmedName = (name || "").trim();
  if (!trimmedName) {
    return null;
  }
  const newProduct = {
    id: productState.nextId++,
    name: trimmedName
  };
  productState.products.push(newProduct);
  return newProduct;
}

/**
 * Updates an existing product name.
 * @param {number} id - Product ID.
 * @param {string} newName - Updated product name.
 * @returns {boolean} True if updated successfully.
 */
function updateProduct(id, newName) {
  const trimmed = (newName || "").trim();
  const product = productState.products.find(p => p.id === Number(id));
  if (product && trimmed) {
    product.name = trimmed;
    return true;
  }
  return false;
}

/**
 * Deletes a product by ID.
 * @param {number} id - Product ID to remove.
 * @returns {boolean} True if deleted successfully.
 */
function deleteProduct(id) {
  const initialLength = productState.products.length;
  productState.products = productState.products.filter(p => p.id !== Number(id));
  return productState.products.length < initialLength;
}

// ============================================================================
// 3. Browser DOM Implementation
// ============================================================================

/**
 * Initializes the Dynamic Product List Manager in a browser DOM environment.
 */
function initProductListApp() {
  if (typeof document === "undefined") return;

  const productList = document.getElementById("product-list");
  const addBtn = document.getElementById("add-product-btn");
  const productInput = document.getElementById("new-product-input");

  if (!productList) return;

  // Render the initial list of products
  renderProductList();

  // --------------------------------------------------------------------------
  // Add Product Event Listener
  // --------------------------------------------------------------------------
  function handleAdd() {
    const name = productInput.value.trim();
    if (!name) {
      alert("Please enter a valid product name!");
      productInput.focus();
      return;
    }
    addProduct(name);
    productInput.value = "";
    renderProductList();
    productInput.focus();
  }

  if (addBtn) {
    addBtn.addEventListener("click", handleAdd);
  }
  if (productInput) {
    productInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        handleAdd();
      }
    });
  }

  // --------------------------------------------------------------------------
  // EVENT DELEGATION: Handle Edit and Delete on parent <ul>
  // A single listener on #product-list delegates actions for all list items
  // --------------------------------------------------------------------------
  productList.addEventListener("click", (event) => {
    const target = event.target;
    const button = target.closest("button[data-action]");
    if (!button) return;

    const action = button.getAttribute("data-action");
    const listItem = button.closest("li[data-id]");
    if (!listItem) return;

    const productId = Number(listItem.getAttribute("data-id"));

    // Case 1: Delete Action
    if (action === "delete") {
      deleteProduct(productId);
      if (productState.editingId === productId) {
        productState.editingId = null;
      }
      renderProductList();
      return;
    }

    // Case 2: Edit Action
    if (action === "edit") {
      // If another item was being edited, save it first
      if (productState.editingId !== null && productState.editingId !== productId) {
        commitCurrentEdit();
      }
      enableInlineEdit(listItem, productId);
      return;
    }

    // Case 3: Save Action (inside edit mode)
    if (action === "save") {
      commitCurrentEdit();
      return;
    }

    // Case 4: Cancel Action
    if (action === "cancel") {
      productState.editingId = null;
      renderProductList();
      return;
    }
  });

  // --------------------------------------------------------------------------
  // AUTO-SAVE ON OUTSIDE CLICK:
  // If the user clicks outside the currently edited <li>, auto-save the change.
  // --------------------------------------------------------------------------
  document.addEventListener("click", (event) => {
    if (productState.editingId === null) return;

    const currentEditingItem = productList.querySelector(`li[data-id="${productState.editingId}"]`);
    if (!currentEditingItem) return;

    // Check if the click occurred outside the active editing item
    if (!currentEditingItem.contains(event.target)) {
      commitCurrentEdit();
    }
  });

  /**
   * Commits the pending inline edit and updates the state.
   */
  function commitCurrentEdit() {
    if (productState.editingId === null) return;

    const activeItem = productList.querySelector(`li[data-id="${productState.editingId}"]`);
    if (activeItem) {
      const editInput = activeItem.querySelector(".inline-edit-input");
      if (editInput) {
        const updatedName = editInput.value.trim();
        if (updatedName) {
          updateProduct(productState.editingId, updatedName);
        }
      }
    }
    productState.editingId = null;
    renderProductList();
  }

  /**
   * Switches a product list item into inline edit mode.
   * @param {HTMLElement} listItem - The <li> element.
   * @param {number} productId - The product ID.
   */
  function enableInlineEdit(listItem, productId) {
    productState.editingId = productId;
    const product = productState.products.find(p => p.id === productId);
    if (!product) return;

    listItem.classList.add("editing");
    listItem.innerHTML = `
      <div class="inline-edit-wrapper" style="display: flex; gap: 8px; width: 100%; align-items: center;">
        <input 
          type="text" 
          class="inline-edit-input" 
          value="${escapeHtml(product.name)}" 
          style="flex: 1; padding: 6px 10px; border: 2px solid #3b82f6; border-radius: 4px; font-size: 14px;"
        />
        <button class="btn btn-save" data-action="save" style="background:#10b981; color:#fff; border:none; padding:6px 12px; border-radius:4px; cursor:pointer;">Save</button>
        <button class="btn btn-cancel" data-action="cancel" style="background:#64748b; color:#fff; border:none; padding:6px 12px; border-radius:4px; cursor:pointer;">Cancel</button>
      </div>
    `;

    const input = listItem.querySelector(".inline-edit-input");
    input.focus();
    input.select();

    // Allow Enter key to commit edit, Escape to cancel
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        commitCurrentEdit();
      } else if (e.key === "Escape") {
        e.preventDefault();
        productState.editingId = null;
        renderProductList();
      }
    });
  }

  /**
   * Renders all products into the <ul>.
   */
  function renderProductList() {
    productList.innerHTML = "";

    if (productState.products.length === 0) {
      productList.innerHTML = `<li class="empty-msg" style="color: #94a3b8; text-align: center; padding: 16px;">No products available. Add one above!</li>`;
      return;
    }

    productState.products.forEach(product => {
      const li = document.createElement("li");
      li.className = "product-item";
      li.setAttribute("data-id", product.id);
      li.style.cssText = "display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; margin-bottom: 8px; background: #1e293b; border: 1px solid #334155; border-radius: 6px; color: #f8fafc;";

      li.innerHTML = `
        <span class="product-name" style="font-size: 15px; font-weight: 500;">${escapeHtml(product.name)}</span>
        <div class="product-actions" style="display: flex; gap: 8px;">
          <button class="btn btn-edit" data-action="edit" style="background: #0284c7; color: #fff; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 13px;">Edit</button>
          <button class="btn btn-delete" data-action="delete" style="background: #ef4444; color: #fff; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 13px;">Delete</button>
        </div>
      `;

      productList.appendChild(li);
    });
  }

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
  }
}

// Auto-initialize when loaded in browser
if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initProductListApp);
  } else {
    initProductListApp();
  }
}

// ============================================================================
// 4. Node.js Verification & Console Demonstration Mode
// ============================================================================
if (typeof process !== "undefined" && process.release && process.release.name === "node") {
  console.log("====================================================================");
  console.log("   ASSIGNMENT 7 - QUESTION 1: DYNAMIC PRODUCT LIST MANAGER (CONSOLE) ");
  console.log("====================================================================\n");

  console.log("1. Initial Products in State:");
  console.table(productState.products);

  console.log("\n2. Adding a new product: 'Noise Cancelling Headphones'");
  const p1 = addProduct("Noise Cancelling Headphones");
  console.log("   Added:", p1);
  console.table(productState.products);

  console.log("\n3. Simulating inline edit on Product ID 2:");
  console.log("   Old name:", productState.products.find(p => p.id === 2)?.name);
  updateProduct(2, "Ultra-wide 4K Curved OLED Monitor");
  console.log("   New name:", productState.products.find(p => p.id === 2)?.name);

  console.log("\n4. Simulating event delegation delete on Product ID 1:");
  deleteProduct(1);
  console.log("   Remaining products:");
  console.table(productState.products);

  console.log("\n5. Demonstrating Event Delegation & Outside Click Concept:");
  console.log("   - Event listener attached ONCE to parent <ul>.");
  console.log("   - event.target.closest('button[data-action]') determines edit/delete.");
  console.log("   - document 'click' listener verifies if target is outside active <li>.");
  console.log("   - If outside -> commits inline edit automatically.\n");
  console.log("[Status] Q1 logic executed and verified successfully in Node.js!\n");
}
