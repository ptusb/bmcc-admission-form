// ===========================
// Firebase Configuration
// ===========================

export const firebaseConfig = {
    apiKey: "AIzaSyBrzXIXqptcPcXQE6DW1V-ZWjX7Cty_s14",
    authDomain: "bmcc-admission-form.firebaseapp.com",
    databaseURL: "https://bmcc-admission-form-default-rtdb.firebaseio.com",
    projectId: "bmcc-admission-form",
    storageBucket: "bmcc-admission-form.firebasestorage.app",
    messagingSenderId: "173516804832",
    appId: "1:173516804832:web:1555d1d236fda8bf343685",
    measurementId: "G-PREVXYPPEL"
};

// Helper to check if Firebase is configured
export function isFirebaseConfigured() {
    return firebaseConfig.apiKey !== "YOUR_API_KEY_HERE";
}
