/**
 * Q4: Custom Form Builder (Forms + Classes)
 * 
 * Objective:
 * Build a dynamic form generator using a FormBuilder class.
 * The class accepts an array of field configuration objects (e.g., {type: 'text', label: 'Username', name: 'username'})
 * and dynamically renders an interactive HTML form using `innerHTML`.
 * 
 * Key Method:
 *   - getFormData(): extracts and returns all entered input values as a clean JavaScript object
 *     when the user clicks "Submit".
 * 
 * Environment: Node.js (markup generation & simulation) & Browser (interactive dynamic rendering)
 */

"use strict";

console.log("====================================================================");
console.log("          Q4: CUSTOM FORM BUILDER (FORMS + CLASSES)                 ");
console.log("====================================================================\n");

/**
 * Class representing a Dynamic Form Builder.
 */
class FormBuilder {
    /**
     * Initializes the FormBuilder with field definitions.
     * @param {Array<Object>} fields - Array of field configuration objects
     * @param {string} [formId="customDynamicForm"] - HTML ID for the form element
     */
    constructor(fields = [], formId = "customDynamicForm") {
        if (!Array.isArray(fields)) {
            throw new TypeError("FormBuilder expects an array of field specifications.");
        }
        this.fields = fields;
        this.formId = formId;
        this.formElement = null;
        this.latestFormData = null;
    }

    /**
     * Generates HTML markup for a single form field based on its configuration.
     * @param {Object} field - Field specification
     * @returns {string} HTML string for the field
     */
    buildFieldHTML(field) {
        const id = `${this.formId}_${field.name || field.label.toLowerCase().replace(/\s+/g, "_")}`;
        const name = field.name || field.label.toLowerCase().replace(/\s+/g, "_");
        const placeholder = field.placeholder ? `placeholder="${field.placeholder}"` : "";
        const required = field.required ? "required" : "";

        if (field.type === "select") {
            const optionsHTML = (field.options || [])
                .map(opt => `<option value="${opt}">${opt}</option>`)
                .join("");
            return `
        <div class="form-group" style="margin-bottom: 15px;">
            <label for="${id}" style="display: block; font-weight: 600; margin-bottom: 5px;">${field.label}</label>
            <select id="${id}" name="${name}" class="form-control" ${required} style="width: 100%; padding: 8px 12px; border-radius: 6px; border: 1px solid #475569; background: #1e293b; color: #f8fafc;">
                ${optionsHTML}
            </select>
        </div>`;
        }

        if (field.type === "textarea") {
            return `
        <div class="form-group" style="margin-bottom: 15px;">
            <label for="${id}" style="display: block; font-weight: 600; margin-bottom: 5px;">${field.label}</label>
            <textarea id="${id}" name="${name}" ${placeholder} ${required} rows="${field.rows || 3}" class="form-control" style="width: 100%; padding: 8px 12px; border-radius: 6px; border: 1px solid #475569; background: #1e293b; color: #f8fafc;"></textarea>
        </div>`;
        }

        return `
        <div class="form-group" style="margin-bottom: 15px;">
            <label for="${id}" style="display: block; font-weight: 600; margin-bottom: 5px;">${field.label}</label>
            <input type="${field.type || 'text'}" id="${id}" name="${name}" ${placeholder} ${required} class="form-control" style="width: 100%; padding: 8px 12px; border-radius: 6px; border: 1px solid #475569; background: #1e293b; color: #f8fafc;" />
        </div>`;
    }

    /**
     * Generates the complete HTML string for the form using innerHTML patterns.
     * @returns {string} The full HTML form markup
     */
    generateHTML() {
        const fieldsMarkup = this.fields.map(f => this.buildFieldHTML(f)).join("\n");
        return `
    <form id="${this.formId}" class="dynamic-generated-form" style="display: flex; flex-direction: column;">
        ${fieldsMarkup}
        <button type="submit" style="background: #38bdf8; color: #0f172a; border: none; padding: 10px 20px; font-weight: 600; border-radius: 6px; cursor: pointer; margin-top: 10px;">
            Submit Form
        </button>
    </form>`;
    }

    /**
     * Dynamically mounts the form into a DOM container element using innerHTML.
     * @param {string|HTMLElement} container - DOM element or CSS selector
     * @param {Function} [onSubmitCallback] - Optional callback receiving the form data object
     */
    render(container, onSubmitCallback) {
        if (typeof document === "undefined") {
            console.warn("DOM is not available. Skipping interactive render.");
            return;
        }

        const containerEl = typeof container === "string" ? document.querySelector(container) : container;
        if (!containerEl) {
            console.error(`Target container "${container}" not found.`);
            return;
        }

        // Dynamically insert using innerHTML
        containerEl.innerHTML = this.generateHTML();
        this.formElement = document.getElementById(this.formId);

        if (this.formElement) {
            this.formElement.addEventListener("submit", (e) => {
                e.preventDefault();
                const formData = this.getFormData();
                this.latestFormData = formData;
                console.log("[FormBuilder] Captured form data object on submit:", formData);

                if (typeof onSubmitCallback === "function") {
                    onSubmitCallback(formData);
                }
            });
        }
    }

    /**
     * Extracts all entered values from the form inputs and returns them as a key-value object.
     * @returns {Object} Entered values mapped by field name
     */
    getFormData() {
        if (!this.formElement && typeof document !== "undefined") {
            this.formElement = document.getElementById(this.formId);
        }

        if (!this.formElement) {
            console.warn("Form element has not been rendered into DOM yet.");
            return {};
        }

        const data = {};
        const inputs = this.formElement.querySelectorAll("input, select, textarea");
        inputs.forEach(input => {
            if (input.name) {
                if (input.type === "checkbox") {
                    data[input.name] = input.checked;
                } else if (input.type === "radio") {
                    if (input.checked) data[input.name] = input.value;
                } else {
                    data[input.name] = input.value;
                }
            }
        });
        return data;
    }
}

// -----------------------------------------------------------------------------
// Sample Field Definition & Node.js Demonstration
// -----------------------------------------------------------------------------
const sampleFieldConfigs = [
    { type: "text", label: "Username", name: "username", placeholder: "e.g. jdoe99", required: true },
    { type: "email", label: "Work Email", name: "email", placeholder: "e.g. john@enterprise.com", required: true },
    { type: "password", label: "Account Password", name: "password", placeholder: "Enter secure password", required: true },
    { type: "select", label: "Department", name: "department", options: ["Engineering", "Design", "DevOps", "Marketing"] },
    { type: "textarea", label: "Bio / Remarks", name: "bio", placeholder: "Brief summary...", rows: 3 }
];

const sampleBuilder = new FormBuilder(sampleFieldConfigs, "userRegistrationForm");

console.log("--- 1. Generating Dynamic Form HTML String using FormBuilder ---");
const generatedHTML = sampleBuilder.generateHTML();
console.log(generatedHTML.trim());

console.log("\n--- 2. Simulating getFormData() Output ---");
// In a simulated or headless environment:
const simulatedSubmittedData = {
    username: "aaditya_g",
    email: "aadi@domain.com",
    password: "Password#999",
    department: "Engineering",
    bio: "Passionate full-stack developer working on modern web architectures."
};
console.log("Simulated form extraction payload:");
console.log(JSON.stringify(simulatedSubmittedData, null, 2));

// Export for module systems
if (typeof module !== "undefined" && module.exports) {
    module.exports = { FormBuilder, sampleFieldConfigs };
}
