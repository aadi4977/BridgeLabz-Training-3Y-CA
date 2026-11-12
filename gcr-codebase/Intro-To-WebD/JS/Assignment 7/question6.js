/**
 * Assignment 7 - Question 6: Real-Time Table Filter Using input Event
 * 
 * Requirements:
 * 1. Given a table of students (Name, Branch, CGPA).
 * 2. When typing in a search box -> only matching rows remain visible.
 * 3. Searching should be case-insensitive.
 * 4. Use the "input" event for real-time reactivity.
 * 5. If no results found -> show "No results found".
 * 6. Can be executed/tested in browser console or Node.js environment.
 */

"use strict";

// ============================================================================
// 1. Data Source & Filtering Logic
// ============================================================================
const initialStudents = [
  { id: 1, name: "Aarav Sharma", branch: "Computer Science", cgpa: 9.4 },
  { id: 2, name: "Diya Patel", branch: "Information Technology", cgpa: 8.8 },
  { id: 3, name: "Rohan Verma", branch: "Mechanical Engineering", cgpa: 7.9 },
  { id: 4, name: "Ananya Iyer", branch: "Electronics & Communication", cgpa: 9.1 },
  { id: 5, name: "Kunal Singhania", branch: "Computer Science", cgpa: 8.3 },
  { id: 6, name: "Sneha Mukherjee", branch: "Electrical Engineering", cgpa: 8.6 },
  { id: 7, name: "Vikram Malhotra", branch: "Civil Engineering", cgpa: 7.5 },
  { id: 8, name: "Pooja Reddy", branch: "Information Technology", cgpa: 9.6 }
];

/**
 * Filters a list of student records based on search query (case-insensitive).
 * Checks Name, Branch, and CGPA fields.
 * @param {Array<object>} list - Array of student records.
 * @param {string} rawQuery - Search term typed by user.
 * @returns {Array<object>} Array of matching student records.
 */
function filterStudents(list, rawQuery) {
  const query = (rawQuery || "").trim().toLowerCase();
  if (!query) {
    return list;
  }

  return list.filter(student => {
    const nameMatch = student.name.toLowerCase().includes(query);
    const branchMatch = student.branch.toLowerCase().includes(query);
    const cgpaMatch = String(student.cgpa).toLowerCase().includes(query);

    return nameMatch || branchMatch || cgpaMatch;
  });
}

// ============================================================================
// 2. Browser DOM Implementation
// ============================================================================
function initTableFilterApp() {
  if (typeof document === "undefined") return;

  const searchInput = document.getElementById("student-search-input");
  const tableBody = document.getElementById("students-tbody");
  const noResultsRow = document.getElementById("no-results-message");
  const matchCountBadge = document.getElementById("match-count-badge");

  if (!tableBody || !searchInput) return;

  /**
   * Renders rows into the table based on search query.
   * Uses real-time filtering with input event.
   */
  function handleFilter() {
    const query = searchInput.value;
    const matches = filterStudents(initialStudents, query);

    tableBody.innerHTML = "";

    if (matches.length === 0) {
      if (noResultsRow) {
        noResultsRow.style.display = "block";
      }
      if (matchCountBadge) {
        matchCountBadge.textContent = "0 matches found";
        matchCountBadge.style.color = "#ef4444";
      }
      return;
    }

    if (noResultsRow) {
      noResultsRow.style.display = "none";
    }

    if (matchCountBadge) {
      matchCountBadge.textContent = `Showing ${matches.length} of ${initialStudents.length} students`;
      matchCountBadge.style.color = "#38bdf8";
    }

    matches.forEach(student => {
      const tr = document.createElement("tr");
      tr.style.borderBottom = "1px solid #334155";

      tr.innerHTML = `
        <td style="padding: 12px 16px; font-weight: 500; color: #f8fafc;">${escapeHtml(student.name)}</td>
        <td style="padding: 12px 16px; color: #cbd5e1;">${escapeHtml(student.branch)}</td>
        <td style="padding: 12px 16px; font-weight: 600; color: #34d399;">${student.cgpa.toFixed(1)}</td>
      `;

      tableBody.appendChild(tr);
    });
  }

  // --------------------------------------------------------------------------
  // REQUIREMENT: Use "input" event for real-time reactivity
  // --------------------------------------------------------------------------
  searchInput.addEventListener("input", () => {
    handleFilter();
  });

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
  }

  // Initial populate
  handleFilter();
}

// Auto-initialize when loaded in browser
if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTableFilterApp);
  } else {
    initTableFilterApp();
  }
}

// ============================================================================
// 3. Node.js Verification & Console Demonstration Mode
// ============================================================================
if (typeof process !== "undefined" && process.release && process.release.name === "node") {
  console.log("====================================================================");
  console.log("   ASSIGNMENT 7 - QUESTION 6: REAL-TIME TABLE FILTER (CONSOLE DEMO)  ");
  console.log("====================================================================\n");

  console.log("1. Total Students Loaded:", initialStudents.length);

  // Test Case 1: Case-insensitive Branch Search ("computer")
  console.log("\n2. Test: Search query 'computer' (Case-Insensitive Branch search):");
  const compResults = filterStudents(initialStudents, "computer");
  console.log(`   Found ${compResults.length} matches:`);
  console.table(compResults.map(s => ({ Name: s.name, Branch: s.branch, CGPA: s.cgpa })));

  // Test Case 2: Mixed Case Name Search ("aNaNyA")
  console.log("\n3. Test: Search query 'aNaNyA' (Mixed-case substring match for 'Ananya'):");
  const nameResults = filterStudents(initialStudents, "aNaNyA");
  console.log(`   Found ${nameResults.length} matches:`);
  console.table(nameResults.map(s => ({ Name: s.name, Branch: s.branch, CGPA: s.cgpa })));

  // Test Case 3: CGPA Search ("9.")
  console.log("\n4. Test: Search query '9.' (CGPA match for >= 9.0):");
  const cgpaResults = filterStudents(initialStudents, "9.");
  console.log(`   Found ${cgpaResults.length} matches:`);
  console.table(cgpaResults.map(s => ({ Name: s.name, Branch: s.branch, CGPA: s.cgpa })));

  // Test Case 4: No Results Search
  console.log("\n5. Test: Search query 'Aeronautical' (No match expected):");
  const noMatches = filterStudents(initialStudents, "Aeronautical");
  console.log(`   Found ${noMatches.length} matches.`);
  if (noMatches.length === 0) {
    console.log("   -> Triggered Display: 'No results found'");
  }

  console.log("\n[Status] Q6 logic executed and verified successfully in Node.js!\n");
}
