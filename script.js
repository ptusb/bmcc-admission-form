// ===========================
// Firebase Imports & Init
// ===========================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { firebaseConfig } from "./firebase-config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ===========================
// DOM Elements
// ===========================
const form = document.getElementById('admissionForm');
const formSteps = document.querySelectorAll('.form-step');
const progressSteps = document.querySelectorAll('.progress-step');
const nextButtons = document.querySelectorAll('.next-step');
const prevButtons = document.querySelectorAll('.prev-step');
const modal = document.getElementById('successModal');

let currentStep = 1;
let testMode = false; // Set to true to skip validation and navigate freely

// ===========================
// Initialization
// ===========================
document.addEventListener('DOMContentLoaded', function () {
    initializeEventListeners();
    initializeAutoCalculations();
    initializeFileUploadLabels();
    initializePreviewModeToggle();
});

// ===========================
// Event Listeners
// ===========================
function initializeEventListeners() {
    // Next button click
    nextButtons.forEach(button => {
        button.addEventListener('click', handleNextStep);
    });

    // Previous button click
    prevButtons.forEach(button => {
        button.addEventListener('click', handlePrevStep);
    });

    // Form submission
    form.addEventListener('submit', handleFormSubmit);

    // File input change events
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
        input.addEventListener('change', handleFileChange);
    });

    // Make progress steps clickable for direct navigation
    progressSteps.forEach((step, index) => {
        step.addEventListener('click', () => {
            const targetStep = index + 1;
            // Allow navigation if in test mode or if clicking on a previous/current step
            if (testMode || targetStep <= currentStep || step.classList.contains('completed')) {
                moveToStep(targetStep);
            } else {
                showNotification('Please complete current step to navigate forward', 'warning');
            }
        });
        // Add cursor pointer style
        step.style.cursor = 'pointer';
    });
}

// ===========================
// Auto Calculations
// ===========================
function initializeAutoCalculations() {
    // Age calculation from DOB
    const dobInput = document.getElementById('dob');
    const ageInput = document.getElementById('age');

    dobInput.addEventListener('change', function () {
        const dob = new Date(this.value);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
            age--;
        }

        ageInput.value = age >= 0 ? age : '';
    });

    // SSC Percentage calculation
    const sscObtained = document.getElementById('ssc_marks_obtained');
    const sscTotal = document.getElementById('ssc_total_marks');
    const sscPercentage = document.getElementById('ssc_percentage');

    function calculateSSCPercentage() {
        const obtained = parseFloat(sscObtained.value) || 0;
        const total = parseFloat(sscTotal.value) || 0;

        if (total > 0) {
            const percentage = (obtained / total) * 100;
            sscPercentage.value = percentage.toFixed(2);
        } else {
            sscPercentage.value = '';
        }
    }

    sscObtained.addEventListener('input', calculateSSCPercentage);
    sscTotal.addEventListener('input', calculateSSCPercentage);

    // HSC Percentage calculation
    const hscObtained = document.getElementById('hsc_marks_obtained');
    const hscTotal = document.getElementById('hsc_total_marks');
    const hscPercentage = document.getElementById('hsc_percentage');

    function calculateHSCPercentage() {
        const obtained = parseFloat(hscObtained.value) || 0;
        const total = parseFloat(hscTotal.value) || 0;

        if (total > 0) {
            const percentage = (obtained / total) * 100;
            hscPercentage.value = percentage.toFixed(2);
        } else {
            hscPercentage.value = '';
        }
    }

    hscObtained.addEventListener('input', calculateHSCPercentage);
    hscTotal.addEventListener('input', calculateHSCPercentage);
}

// ===========================
// File Upload Handling
// ===========================
function initializeFileUploadLabels() {
    const fileInputs = document.querySelectorAll('input[type="file"]');

    fileInputs.forEach(input => {
        const label = input.nextElementSibling;

        if (label && label.classList.contains('file-upload-label')) {
            // Drag and drop events
            label.addEventListener('dragover', (e) => {
                e.preventDefault();
                label.style.borderColor = 'var(--primary-color)';
                label.style.background = 'rgba(99, 102, 241, 0.2)';
            });

            label.addEventListener('dragleave', (e) => {
                e.preventDefault();
                label.style.borderColor = '';
                label.style.background = '';
            });

            label.addEventListener('drop', (e) => {
                e.preventDefault();
                label.style.borderColor = '';
                label.style.background = '';

                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    input.files = files;
                    handleFileChange.call(input);
                }
            });

            // Click to select file
            label.addEventListener('click', () => {
                input.click();
            });
        }
    });
}

function handleFileChange() {
    const label = this.nextElementSibling;
    const fileText = label.querySelector('.file-text');

    if (this.files.length > 0) {
        const fileName = this.files[0].name;
        const maxLength = 30;
        const displayName = fileName.length > maxLength
            ? fileName.substring(0, maxLength - 3) + '...'
            : fileName;
        fileText.textContent = displayName;
    } else {
        fileText.textContent = 'Choose file or drag here';
    }
}

// ===========================
// Step Navigation
// ===========================
function handleNextStep() {
    // Skip validation if in test mode
    if (testMode || validateCurrentStep()) {
        if (currentStep < formSteps.length) {
            moveToStep(currentStep + 1);
        }
    }
}

function handlePrevStep() {
    if (currentStep > 1) {
        moveToStep(currentStep - 1);
    }
}

function moveToStep(stepNumber) {
    // Hide current step
    formSteps[currentStep - 1].classList.remove('active');
    progressSteps[currentStep - 1].classList.remove('active');

    // Mark completed steps
    if (stepNumber > currentStep) {
        progressSteps[currentStep - 1].classList.add('completed');
    }

    // Show new step
    currentStep = stepNumber;
    formSteps[currentStep - 1].classList.add('active');
    progressSteps[currentStep - 1].classList.add('active');

    // Scroll to top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ===========================
// Form Validation
// ===========================
function validateCurrentStep() {
    const currentFormStep = formSteps[currentStep - 1];
    const requiredFields = currentFormStep.querySelectorAll('[required]');
    let isValid = true;
    let firstInvalidField = null;

    requiredFields.forEach(field => {
        // Remove previous error styling
        field.style.borderColor = '';

        if (!field.checkValidity()) {
            isValid = false;
            field.style.borderColor = 'var(--error-color)';

            if (!firstInvalidField) {
                firstInvalidField = field;
            }

            // Show validation message
            if (!field.validity.valid) {
                showFieldError(field);
            }
        }
    });

    if (!isValid && firstInvalidField) {
        firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstInvalidField.focus();

        showNotification('Please fill in all required fields correctly', 'error');
    }

    return isValid;
}

function showFieldError(field) {
    // Create or update error message
    let errorMessage = field.parentElement.querySelector('.error-message');

    if (!errorMessage) {
        errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.style.color = 'var(--error-color)';
        errorMessage.style.fontSize = '0.875rem';
        errorMessage.style.marginTop = '0.25rem';
        field.parentElement.appendChild(errorMessage);
    }

    if (field.validity.valueMissing) {
        errorMessage.textContent = 'This field is required';
    } else if (field.validity.typeMismatch) {
        errorMessage.textContent = 'Please enter a valid value';
    } else if (field.validity.patternMismatch) {
        errorMessage.textContent = 'Please match the requested format';
    } else {
        errorMessage.textContent = 'Invalid input';
    }

    // Add input listener to remove error on correction
    field.addEventListener('input', function clearError() {
        field.style.borderColor = '';
        if (errorMessage) {
            errorMessage.remove();
        }
        field.removeEventListener('input', clearError);
    });
    return `BMCC${timestamp}${random}`;
}

function showSuccessModal(appId) {
    const appIdElement = document.getElementById('appId');
    appIdElement.textContent = appId;

    modal.classList.add('show');

    // Store application ID
    localStorage.setItem('lastApplicationId', appId);
}

function logFormData() {
    const formData = new FormData(form);
    const data = {};

    for (let [key, value] of formData.entries()) {
        if (value instanceof File) {
            data[key] = value.name;
        } else {
            data[key] = value;
        }
    }

    console.log('Form Data:', data);
    console.log('Form submitted successfully!');
}

// ===========================
// Notifications
// ===========================
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;

    // Style based on type
    const colors = {
        success: 'var(--success-color)',
        error: 'var(--error-color)',
        warning: 'var(--warning-color)',
        info: 'var(--primary-color)'
    };

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-lg);
        z-index: 9999;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
        font-weight: 500;
    `;

    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// ===========================
// Additional Features
// ===========================

// Prevent form submission on Enter key (except in textarea)
form.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();

        // Trigger next step instead
        const nextButton = formSteps[currentStep - 1].querySelector('.next-step');
        if (nextButton) {
            nextButton.click();
        }
    }
});

// Save form progress to localStorage
function saveFormProgress() {
    const formData = new FormData(form);
    const data = {};

    for (let [key, value] of formData.entries()) {
        if (!(value instanceof File)) {
            data[key] = value;
        }
    }

    localStorage.setItem('admissionFormProgress', JSON.stringify(data));
    console.log('Form progress saved');
}

// Load form progress from localStorage
function loadFormProgress() {
    const saved = localStorage.getItem('admissionFormProgress');

    if (saved) {
        try {
            const data = JSON.parse(saved);

            Object.keys(data).forEach(key => {
                const field = form.elements[key];
                if (field && !(field instanceof File)) {
                    field.value = data[key];
                }
            });

            console.log('Form progress loaded');
            showNotification('Previous form data has been restored', 'info');
        } catch (e) {
            console.error('Error loading form progress:', e);
        }
    }
}

// Auto-save form progress every 30 seconds
setInterval(saveFormProgress, 30000);

// Prompt user before leaving if form is partially filled
window.addEventListener('beforeunload', function (e) {
    const formData = new FormData(form);
    let hasData = false;

    for (let [key, value] of formData.entries()) {
        if (value && !(value instanceof File && value.size === 0)) {
            hasData = true;
            break;
        }
    }

    if (hasData && currentStep > 1) {
        e.preventDefault();
        e.returnValue = '';
        saveFormProgress();
    }
});

// Load progress on page load (optional - comment out if not needed)
// Uncomment the line below to enable auto-loading of saved progress
// loadFormProgress();

// ===========================
// Input Formatting & Validation
// ===========================

// Format mobile number inputs
const mobileInputs = document.querySelectorAll('input[type="tel"]');
mobileInputs.forEach(input => {
    input.addEventListener('input', function () {
        // Remove non-numeric characters
        this.value = this.value.replace(/[^0-9]/g, '');

        // Limit to 10 digits for mobile numbers
        if (this.name.includes('mobile')) {
            this.value = this.value.slice(0, 10);
        }
    });
});

// Format IFSC code
const ifscInput = document.getElementById('ifsc_code');
if (ifscInput) {
    ifscInput.addEventListener('input', function () {
        this.value = this.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
        this.value = this.value.slice(0, 11);
    });
}

// Format pincode
const pincodeInput = document.getElementById('pincode');
if (pincodeInput) {
    pincodeInput.addEventListener('input', function () {
        this.value = this.value.replace(/[^0-9]/g, '').slice(0, 6);
    });
}

// ===========================
// Keyboard Navigation
// ===========================
document.addEventListener('keydown', function (e) {
    // Alt + Right Arrow = Next Step
    if (e.altKey && e.key === 'ArrowRight') {
        e.preventDefault();
        const nextButton = formSteps[currentStep - 1].querySelector('.next-step');
        if (nextButton && !nextButton.disabled) {
            nextButton.click();
        }
    }

    // Alt + Left Arrow = Previous Step
    if (e.altKey && e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevButton = formSteps[currentStep - 1].querySelector('.prev-step');
        if (prevButton && !prevButton.disabled) {
            prevButton.click();
        }
    }

    // Escape = Close modal
    if (e.key === 'Escape') {
        if (modal.classList.contains('show')) {
            modal.classList.remove('show');
        }
    }
});

// ===========================
// Performance Optimization
// ===========================

// Lazy load images if any
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ===========================
// Accessibility Enhancements
// ===========================

// Add ARIA labels to progress steps
progressSteps.forEach((step, index) => {
    step.setAttribute('aria-label', `Step ${index + 1}: ${step.querySelector('.step-label').textContent}`);
    step.setAttribute('role', 'tab');
    step.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
});

// Form steps accessibility
formSteps.forEach((step, index) => {
    step.setAttribute('role', 'tabpanel');
    step.setAttribute('aria-labelledby', `step-${index + 1}`);
});

// ===========================
// Preview Mode Toggle
// ===========================
function initializePreviewModeToggle() {
    const toggleBtn = document.getElementById('togglePreviewBtn');
    const modeStatus = document.getElementById('modeStatus');

    if (!toggleBtn) return; // Exit if button doesn't exist

    toggleBtn.addEventListener('click', function () {
        testMode = !testMode;

        if (testMode) {
            toggleBtn.classList.add('active');
            modeStatus.textContent = 'ON';
            showNotification('Preview Mode Enabled - You can now navigate freely!', 'success');
        } else {
            toggleBtn.classList.remove('active');
            modeStatus.textContent = 'OFF';
            showNotification('Preview Mode Disabled - Validation is active', 'info');
        }
    });
}

// ===========================
// Console Welcome Message
// ===========================
console.log('%c🎓 BMCC Admission Form 2024-25', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cWelcome to the admission process!', 'color: #8b5cf6; font-size: 14px;');
console.log('%cKeyboard Shortcuts:', 'color: #ec4899; font-size: 12px; font-weight: bold;');
console.log('%c  Alt + Right Arrow → Next Step', 'color: #cbd5e1; font-size: 11px;');
console.log('%c  Alt + Left Arrow → Previous Step', 'color: #cbd5e1; font-size: 11px;');
console.log('%c  Escape → Close Modal', 'color: #cbd5e1; font-size: 11px;');
console.log('%c  Click on Progress Steps → Jump to that page', 'color: #cbd5e1; font-size: 11px;');
console.log('%c\nForm auto-save is enabled. Your progress will be saved every 30 seconds.', 'color: #10b981; font-size: 11px;');
console.log('%c\n🔧 Test/Preview Mode:', 'color: #f59e0b; font-size: 12px; font-weight: bold;');
console.log('%c  Type: testMode = true   (to skip validation)', 'color: #cbd5e1; font-size: 11px;');
console.log('%c  Type: testMode = false  (to enable validation)', 'color: #cbd5e1; font-size: 11px;');
