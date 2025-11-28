// Admin Panel JavaScript with Firebase

// Firebase Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, onValue, remove } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { firebaseConfig, isFirebaseConfigured } from "./firebase-config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Configuration
const ADMIN_PASSWORD = 'admin123'; // Change this to secure password

// Global variables
let applications = [];
let filteredApplications = [];

// Initialize
document.addEventListener('DOMContentLoaded', function () {
    // Check if already logged in
    if (sessionStorage.getItem('admin_logged_in') === 'true') {
        showDashboard();
    }

    // Login form
    document.getElementById('loginForm').addEventListener('submit', handleLogin);

    // Dashboard controls
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);
    document.getElementById('refreshBtn').addEventListener('click', loadApplications);
    document.getElementById('searchInput').addEventListener('input', handleSearch);
    document.getElementById('exportCSV').addEventListener('click', exportToCSV);
    document.getElementById('exportJSON').addEventListener('click', exportToJSON);
    document.getElementById('clearAllData').addEventListener('click', clearAllData);
    document.getElementById('closeModal').addEventListener('click', closeModal);
    document.getElementById('closeModalBtn').addEventListener('click', closeModal);
});

// Login Handler
function handleLogin(e) {
    e.preventDefault();
    const password = document.getElementById('adminPassword').value;

    if (password === ADMIN_PASSWORD) {
        sessionStorage.setItem('admin_logged_in', 'true');
        showDashboard();
    } else {
        alert('❌ Incorrect password! Default is: admin123');
        document.getElementById('adminPassword').value = '';
    }
}

// Logout Handler
function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        sessionStorage.removeItem('admin_logged_in');
        document.getElementById('loginScreen').style.display = 'flex';
        document.getElementById('adminDashboard').style.display = 'none';
    }
}

// Show Dashboard
function showDashboard() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'block';
    loadApplications();
}

// Load Applications
function loadApplications() {
    // HYBRID MODE: Check configuration
    if (isFirebaseConfigured()) {
        // --- ONLINE MODE (Firebase) ---
        const appsRef = ref(db, 'applications');

        onValue(appsRef, (snapshot) => {
            const data = snapshot.val();
            processData(data, 'online');
        }, (error) => {
            console.error("Error fetching data:", error);
            alert("Error fetching data from Firebase: " + error.message);
        });
    } else {
        // --- OFFLINE MODE (LocalStorage) ---
        try {
            const localData = JSON.parse(localStorage.getItem('bmcc_applications') || '[]');
            // Convert array to object-like structure for consistency
            const data = {};
            localData.forEach((app, index) => {
                data[`local_${index}`] = app;
            });
            processData(data, 'offline');
        } catch (e) {
            console.error("Error loading local data", e);
            applications = [];
            renderTable();
        }
    }

    function processData(data, mode) {
        if (data) {
            applications = Object.entries(data).map(([key, value]) => ({
                firebaseKey: key,
                ...value,
                source: mode
            }));
        } else {
            applications = [];
        }

        // Sort by date (newest first)
        applications.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));

        filteredApplications = [...applications];
        updateStatistics();
        renderTable();

        // Show mode indicator
        const headerText = document.querySelector('.header-text p');
        if (headerText) {
            headerText.innerHTML = `Manage & View Applications <span style="font-size:10px; background:${mode === 'online' ? '#10b981' : '#f59e0b'}; color:white; padding:2px 6px; border-radius:4px; margin-left:5px;">${mode.toUpperCase()} MODE</span>`;
        }
    }
}

// Update Statistics
function updateStatistics() {
    const total = applications.length;
    const completed = applications.filter(app => app.status === 'completed').length;

    // Today's applications
    const today = new Date().toDateString();
    const todayCount = applications.filter(app => {
        if (!app.submittedAt) return false;
        const appDate = new Date(app.submittedAt).toDateString();
        return appDate === today;
    }).length;

    // Last updated
    let lastUpdated = 'N/A';
    if (applications.length > 0) {
        const latest = applications[0]; // Already sorted
        lastUpdated = formatTime(latest.submittedAt);
    }

    document.getElementById('totalApplications').textContent = total;
    document.getElementById('completedApplications').textContent = completed;
    document.getElementById('todayApplications').textContent = todayCount;
    document.getElementById('lastUpdated').textContent = lastUpdated;
}

// Render Table
function renderTable() {
    const tbody = document.getElementById('applicationsTableBody');
    const resultCount = document.getElementById('resultCount');

    if (filteredApplications.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" class="no-data">No applications found</td></tr>';
        resultCount.textContent = '0 applications';
        return;
    }

    resultCount.textContent = `${filteredApplications.length} application${filteredApplications.length !== 1 ? 's' : ''}`;

    tbody.innerHTML = filteredApplications.map((app, index) => `
        <tr>
            <td>${index + 1}</td>
            <td><strong>${app.applicationId || 'N/A'}</strong></td>
            <td>${app.fullName || 'N/A'}</td>
            <td>${app.email || 'N/A'}</td>
            <td>${app.mobile || 'N/A'}</td>
            <td>${app.programPreference1 || 'N/A'}</td>
            <td>${formatDate(app.submittedAt)}</td>
            <td>
                <button class="action-btn btn-view" onclick="window.viewApplication(${index})">👁️ View</button>
                <button class="action-btn btn-delete" onclick="window.deleteApplication('${app.firebaseKey}')">🗑️</button>
            </td>
        </tr>
    `).join('');
}

// Search Handler
function handleSearch(e) {
    const query = e.target.value.toLowerCase();

    if (!query) {
        filteredApplications = [...applications];
    } else {
        filteredApplications = applications.filter(app => {
            return (
                (app.fullName && app.fullName.toLowerCase().includes(query)) ||
                (app.email && app.email.toLowerCase().includes(query)) ||
                (app.mobile && app.mobile.includes(query)) ||
                (app.applicationId && app.applicationId.toLowerCase().includes(query))
            );
        });
    }

    renderTable();
}

// View Application Details
window.viewApplication = function (index) {
    const app = filteredApplications[index];
    const modalBody = document.getElementById('modalBody');

    modalBody.innerHTML = `
        <div class="detail-section">
            <h3>📋 Application Information</h3>
            <div class="detail-row">
                <div class="detail-label">Application ID:</div>
                <div class="detail-value"><strong>${app.applicationId || 'N/A'}</strong></div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Submitted On:</div>
                <div class="detail-value">${formatDateTime(app.submittedAt)}</div>
            </div>
        </div>

        <div class="detail-section">
            <h3>👤 Personal Information</h3>
            <div class="detail-row">
                <div class="detail-label">Full Name:</div>
                <div class="detail-value">${app.fullName || 'N/A'}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Date of Birth:</div>
                <div class="detail-value">${app.dob || 'N/A'}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Age:</div>
                <div class="detail-value">${app.age || 'N/A'}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Gender:</div>
                <div class="detail-value">${app.gender || 'N/A'}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Category:</div>
                <div class="detail-value">${app.category || 'N/A'}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Religion:</div>
                <div class="detail-value">${app.religion || 'N/A'}</div>
            </div>
        </div>

        <div class="detail-section">
            <h3>🎓 Educational Qualifications</h3>
            <h4 style="margin: 12px 0;">SSC (10th)</h4>
            <div class="detail-row">
                <div class="detail-label">Board:</div>
                <div class="detail-value">${app.ssc_board || 'N/A'}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">School:</div>
                <div class="detail-value">${app.ssc_school || 'N/A'}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Year of Passing:</div>
                <div class="detail-value">${app.ssc_year || 'N/A'}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Percentage:</div>
                <div class="detail-value">${app.ssc_percentage || 'N/A'}%</div>
            </div>

            <h4 style="margin: 20px 0 12px;">HSC (12th)</h4>
            <div class="detail-row">
                <div class="detail-label">Board:</div>
                <div class="detail-value">${app.hsc_board || 'N/A'}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Stream:</div>
                <div class="detail-value">${app.hsc_stream || 'N/A'}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">College:</div>
                <div class="detail-value">${app.hsc_college || 'N/A'}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Year of Passing:</div>
                <div class="detail-value">${app.hsc_year || 'N/A'}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Percentage:</div>
                <div class="detail-value">${app.hsc_percentage || 'N/A'}%</div>
            </div>
        </div>

        <div class="detail-section">
            <h3>📝 CET Examination Details</h3>
            <div class="detail-row">
                <div class="detail-label">Program Preference 1:</div>
                <div class="detail-value">${app.programPreference1 || 'N/A'}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Program Preference 2:</div>
                <div class="detail-value">${app.programPreference2 || 'N/A'}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">CET Application ID:</div>
                <div class="detail-value">${app.cet_application_id || 'N/A'}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">CET Marks:</div>
                <div class="detail-value">${app.cet_marks || 'N/A'}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">CET Percentile:</div>
                <div class="detail-value">${app.cet_percentile || 'N/A'}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">MH Rank:</div>
                <div class="detail-value">${app.cet_rank_mh || 'N/A'}</div>
            </div>
        </div>

        <div class="detail-section">
            <h3>💳 Bank Details & Contact</h3>
            <div class="detail-row">
                <div class="detail-label">Email:</div>
                <div class="detail-value">${app.email || 'N/A'}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Mobile:</div>
                <div class="detail-value">${app.mobile || 'N/A'}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Bank Name:</div>
                <div class="detail-value">${app.bankName || 'N/A'}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Account Number:</div>
                <div class="detail-value">${app.accountNumber || 'N/A'}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">IFSC Code:</div>
                <div class="detail-value">${app.ifscCode || 'N/A'}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">Address:</div>
                <div class="detail-value">${app.address || 'N/A'}</div>
            </div>
        </div>
    `;

    showModal();
}

// Delete Application
window.deleteApplication = function (firebaseKey) {
    if (confirm('Are you sure you want to delete this application? This cannot be undone.')) {
        if (isFirebaseConfigured()) {
            // --- ONLINE MODE ---
            const appRef = ref(db, `applications/${firebaseKey}`);
            remove(appRef)
                .then(() => alert('✅ Application deleted successfully!'))
                .catch((error) => alert('Error deleting application: ' + error.message));
        } else {
            // --- OFFLINE MODE ---
            try {
                const appToDelete = applications.find(app => app.firebaseKey === firebaseKey);
                if (appToDelete) {
                    const localData = JSON.parse(localStorage.getItem('bmcc_applications') || '[]');
                    const newLocalData = localData.filter(app => app.applicationId !== appToDelete.applicationId);
                    localStorage.setItem('bmcc_applications', JSON.stringify(newLocalData));
                    alert('✅ Application deleted locally!');
                    loadApplications(); // Reload table
                }
            } catch (e) {
                console.error(e);
                alert('Error deleting local data');
            }
        }
    }
}

// Export to CSV
function exportToCSV() {
    if (applications.length === 0) {
        alert('❌ No data to export!');
        return;
    }

    const headers = ['Application ID', 'Full Name', 'Email', 'Mobile', 'DOB', 'Gender', 'Category',
        'SSC Board', 'SSC %', 'HSC Board', 'HSC %', 'Program Preference',
        'CET Marks', 'CET Percentile', 'Bank Name', 'Submitted On'];

    const csvData = applications.map(app => [
        app.applicationId,
        app.fullName,
        app.email,
        app.mobile,
        app.dob,
        app.gender,
        app.category,
        app.ssc_board,
        app.ssc_percentage,
        app.hsc_board,
        app.hsc_percentage,
        app.programPreference1,
        app.cet_marks,
        app.cet_percentile,
        app.bankName,
        formatDateTime(app.submittedAt)
    ]);

    let csv = headers.join(',') + '\n';
    csvData.forEach(row => {
        csv += row.map(field => `"${field || ''}"`).join(',') + '\n';
    });

    downloadFile(csv, 'bmcc-applications.csv', 'text/csv');
    alert('✅ CSV exported successfully!');
}

// Export to JSON
function exportToJSON() {
    if (applications.length === 0) {
        alert('❌ No data to export!');
        return;
    }

    const json = JSON.stringify(applications, null, 2);
    downloadFile(json, 'bmcc-applications.json', 'application/json');
    alert('✅ JSON exported successfully!');
}

// Clear All Data
function clearAllData() {
    if (confirm('⚠️ WARNING: This will permanently delete ALL application data! Are you absolutely sure?')) {
        if (confirm('This action cannot be undone. Continue?')) {
            if (isFirebaseConfigured()) {
                // --- ONLINE MODE ---
                const appsRef = ref(db, 'applications');
                remove(appsRef)
                    .then(() => alert('✅ All data cleared successfully!'))
                    .catch((error) => alert('Error clearing data: ' + error.message));
            } else {
                // --- OFFLINE MODE ---
                localStorage.removeItem('bmcc_applications');
                alert('✅ All local data cleared successfully!');
                loadApplications();
            }
        }
    }
}

// Show Modal
function showModal() {
    document.getElementById('detailsModal').classList.add('show');
}

// Close Modal
function closeModal() {
    document.getElementById('detailsModal').classList.remove('show');
}

// Utility Functions
function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

function formatTime(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

function formatDateTime(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function downloadFile(content, filename, contentType) {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
}

// Close modal when clicking outside
window.addEventListener('click', function (e) {
    const modal = document.getElementById('detailsModal');
    if (e.target === modal) {
        closeModal();
    }
});
