/**
 * Q3: Library Management System (Classes + Objects)
 * 
 * Objective:
 * Design a Book class with properties: title, author, ISBN, isIssued.
 * Create methods:
 *   - issueBook(): marks the book as issued if available
 *   - returnBook(): marks the book as returned/available
 * Create an array of book objects representing a library inventory.
 * Display all available books (not issued) using Array.prototype.filter().
 * Allow a user to issue a book by searching for its ISBN.
 * 
 * Environment: Node.js & Browser Console
 */

"use strict";

console.log("====================================================================");
console.log("        Q3: LIBRARY MANAGEMENT SYSTEM (CLASSES + OBJECTS)           ");
console.log("====================================================================\n");

/**
 * Class representing a Book in the library.
 */
class Book {
    /**
     * Creates an instance of Book.
     * @param {string} title - Title of the book
     * @param {string} author - Author of the book
     * @param {string} isbn - International Standard Book Number
     * @param {boolean} [isIssued=false] - Current issue status of the book
     */
    constructor(title, author, isbn, isIssued = false) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.isIssued = Boolean(isIssued);
    }

    /**
     * Issues the book if it is currently available.
     * @returns {boolean} True if successfully issued, false if already issued
     */
    issueBook() {
        if (this.isIssued) {
            console.log(`[Status: FAILED] "${this.title}" (ISBN: ${this.isbn}) is ALREADY issued.`);
            return false;
        }
        this.isIssued = true;
        console.log(`[Status: SUCCESS] Successfully issued "${this.title}" to patron.`);
        return true;
    }

    /**
     * Returns an issued book back to the available catalog.
     * @returns {boolean} True if successfully returned, false if was not issued
     */
    returnBook() {
        if (!this.isIssued) {
            console.log(`[Status: FAILED] "${this.title}" was not issued. Cannot return.`);
            return false;
        }
        this.isIssued = false;
        console.log(`[Status: SUCCESS] Successfully returned "${this.title}". It is now available.`);
        return true;
    }

    /**
     * Returns a formatted string representation of the book.
     * @returns {string} Formatted book details
     */
    getDetails() {
        const status = this.isIssued ? "[ISSUED]" : "[AVAILABLE]";
        return `${status.padEnd(12)} "${this.title}" by ${this.author} | ISBN: ${this.isbn}`;
    }
}

/**
 * Class representing the Library manager managing book collections.
 */
class Library {
    constructor(initialBooks = []) {
        this.books = [...initialBooks];
    }

    /**
     * Adds a new Book to the library catalog.
     * @param {Book} book
     */
    addBook(book) {
        if (book instanceof Book) {
            this.books.push(book);
        } else {
            console.error("Invalid book object.");
        }
    }

    /**
     * Finds and returns all available books (isIssued === false).
     * @returns {Book[]} Array of available Book instances
     */
    getAvailableBooks() {
        return this.books.filter(book => !book.isIssued);
    }

    /**
     * Displays all available books in the console.
     */
    displayAvailableBooks() {
        const available = this.getAvailableBooks();
        console.log(`\n--- Currently Available Books (${available.length} / ${this.books.length}) ---`);
        if (available.length === 0) {
            console.log("No books are currently available in the catalog.");
            return;
        }
        available.forEach((book, index) => {
            console.log(` ${index + 1}. ${book.getDetails()}`);
        });
    }

    /**
     * Finds a book by its ISBN.
     * @param {string} isbn
     * @returns {Book|undefined} The matched Book or undefined
     */
    findBookByISBN(isbn) {
        return this.books.find(book => book.isbn.trim() === isbn.trim());
    }

    /**
     * Issues a book by searching its ISBN.
     * @param {string} isbn - Target book ISBN
     * @returns {boolean} Whether operation succeeded
     */
    issueBookByISBN(isbn) {
        console.log(`\n[Search Action] Searching for ISBN: "${isbn}"...`);
        const book = this.findBookByISBN(isbn);
        if (!book) {
            console.log(`[Status: NOT FOUND] No book found with ISBN: ${isbn}`);
            return false;
        }
        return book.issueBook();
    }

    /**
     * Returns a book by searching its ISBN.
     * @param {string} isbn - Target book ISBN
     * @returns {boolean} Whether operation succeeded
     */
    returnBookByISBN(isbn) {
        console.log(`\n[Return Action] Searching for ISBN: "${isbn}"...`);
        const book = this.findBookByISBN(isbn);
        if (!book) {
            console.log(`[Status: NOT FOUND] No book found with ISBN: ${isbn}`);
            return false;
        }
        return book.returnBook();
    }
}

// -----------------------------------------------------------------------------
// Demonstration & Testing
// -----------------------------------------------------------------------------

// 1. Create an array of book objects
const initialBooks = [
    new Book("Clean Code", "Robert C. Martin", "978-0132350884", false),
    new Book("You Don't Know JS: Scope & Closures", "Kyle Simpson", "978-1449335588", false),
    new Book("The Pragmatic Programmer", "David Thomas & Andrew Hunt", "978-0135957059", true),
    new Book("Eloquent JavaScript", "Marijn Haverbeke", "978-1593279509", false),
    new Book("Design Patterns", "Erich Gamma et al.", "978-0201633610", false)
];

const cityLibrary = new Library(initialBooks);

// 2. Display all available books
cityLibrary.displayAvailableBooks();

// 3. User issues a book by searching ISBN (Success case)
cityLibrary.issueBookByISBN("978-0132350884");

// 4. Try issuing the same book again (Should fail because it's already issued)
cityLibrary.issueBookByISBN("978-0132350884");

// 5. Try issuing a book with an unknown ISBN
cityLibrary.issueBookByISBN("999-0000000000");

// 6. Display available books again to verify state changes
cityLibrary.displayAvailableBooks();

// 7. Patron returns the book
cityLibrary.returnBookByISBN("978-0132350884");

// 8. Display available books after return
cityLibrary.displayAvailableBooks();

// Export for module systems
if (typeof module !== "undefined" && module.exports) {
    module.exports = { Book, Library, cityLibrary };
}
