# 🎓 BMCC Admission Form 2024-25

<div align="center">

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

**A Professional Multi-Step Admission Form for Brihan Maharashtra College of Commerce**

[Live Demo](https://bmccadmissionform2024-25.netlify.app/) • [Features](#-features) • [Documentation](#-documentation)

</div>

---

## 📋 Overview

Professional web-based admission form for **BBA programs** (BBA CA, BBA IB, BBA General) at BMCC through CET examination. Features a modern, user-friendly multi-step interface with smart validation and auto-save functionality.

---

## ✨ Features

### 🎯 Core Features

- **📝 Multi-Step Form Design** - 5 logical steps for better UX
- **✅ Smart Validation** - Real-time field validation with error messages
- **🔄 Auto-Calculations** - Age and percentage auto-calculation
- **📁 File Upload** - Drag-and-drop document upload
- **💾 Auto-Save** - Progress saved every 30 seconds to localStorage
- **👁️ Preview Mode** - Toggle validation for easy testing
- **⌨️ Keyboard Navigation** - Alt+Arrow keys for quick navigation
- **📱 Responsive Design** - Works on all devices
- **♿ Accessible** - ARIA labels and keyboard support

### 🎨 Design

- **Professional Black & White Theme** - Clean and accessible
- **Smooth Animations** - Enhanced user experience
- **BMCC Branding** - Official logo and colors
- **Modern UI/UX** - Intuitive navigation

---

## 🚀 Live Demo

**Live Site:** [https://bmccadmissionform2024-25.netlify.app/](https://bmccadmissionform2024-25.netlify.app/)

---

## 📸 Screenshots

### Homepage
![Admission Form Homepage](https://via.placeholder.com/800x400/000000/FFFFFF?text=BMCC+Admission+Form)

### Multi-Step Progress
![Form Steps](https://via.placeholder.com/800x400/000000/FFFFFF?text=Multi-Step+Form)

---

## 🛠️ Technologies Used

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Fonts:** Google Fonts (Inter, Poppins)
- **Storage:** localStorage API
- **Deployment:** Netlify

**No frameworks or dependencies** - Pure web technologies for optimal performance!

---

## 📂 Project Structure

```
bmcc-admission-form/
├── index.html          # Main HTML structure (~900 lines)
├── style.css           # Complete styling (~900 lines)
├── script.js           # Form functionality (~650 lines)
├── logo.jpg            # BMCC logo
├── README.md           # Documentation
├── PRESENTATION_GUIDE.md    # Class presentation guide
├── QUICK_DEMO_SCRIPT.md     # 5-min demo script
└── FEATURE_HIGHLIGHTS.md    # Feature documentation
```

---

## 🎯 Form Steps

### Step 1: Personal Information
- Full Name, DOB (auto-calculates age)
- Gender, Blood Group
- Category/Caste, Religion
- Nationality, Mother Tongue

### Step 2: Educational Qualifications
- **10th/SSC Details:** Board, Year, School, Subjects, Marks (auto-calculates %)
- **12th/HSC Details:** Board, Year, Stream, College, Subjects, Marks (auto-calculates %)
- Document uploads for marksheets and certificates

### Step 3: CET Examination Details
- Program preferences (BBA CA, BBA IB, BBA General)
- CET Application ID, Exam Date
- CET Marks, Percentile, Ranks (MH & All India)
- CET document uploads

### Step 4: Required Documents
- Caste & Income certificates
- Aadhar Card, PAN Card
- Passport photo & Signature
- Additional documents (Gap certificate, NOC, etc.)

### Step 5: Bank Details & Contact
- Bank account information
- Email and mobile numbers
- Complete address
- Parent/Guardian information

---

## 💻 Key Features Explained

### 1. Multi-Step Navigation
```javascript
// Navigate between steps with validation
- Click "Next" to proceed (validates current step)
- Click "Previous" to go back (no validation)
- Click progress circles to jump to steps
- Use Alt+Arrow keys for keyboard navigation
```

### 2. Auto-Calculations
```javascript
// Age from Date of Birth
dobInput.addEventListener('change', function() {
    const age = calculateAge(this.value);
    ageInput.value = age;
});

// Percentage from marks
const percentage = (obtained / total) * 100;
```

### 3. Preview Mode (Unique Feature!)
```javascript
// Toggle button to skip validation for testing
togglePreviewBtn.addEventListener('click', function() {
    testMode = !testMode;
    // Now can navigate without filling required fields
});
```

### 4. Form Validation
- Real-time validation
- Pattern matching (email, phone, IFSC)
- Visual error indicators
- Auto-scroll to errors

### 5. Progress Auto-Save
```javascript
// Saves form data every 30 seconds
setInterval(saveFormProgress, 30000);
// Prevents data loss if browser closes
```

---

## 🎨 Design Philosophy

### Color Scheme
- **Primary:** Black (#000000)
- **Secondary:** White (#FFFFFF)
- **Accents:** Grays for depth
- **Rationale:** Professional, accessible, print-friendly

### Typography
- **Headers:** Poppins (Bold, Modern)
- **Body:** Inter (Clean, Readable)
- **Code:** Monospace for IDs

### User Experience
- Progressive disclosure (multi-step)
- Clear visual feedback
- Intuitive navigation
- Accessible design

---

## 🚀 Getting Started

### Local Setup

1. **Clone the repository**
```bash
git clone https://github.com/ptusb/bmcc-admission-form.git
cd bmcc-admission-form
```

2. **Open in browser**
```bash
# Simply open index.html in any browser
# No build process or server required!
```

3. **Or use Live Server** (Optional)
```bash
# With VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

---

## 🌐 Deployment

### Deploy to Netlify (Free)

1. **Drag & Drop Method:**
   - Go to [netlify.com](https://netlify.com)
   - Drag the project folder
   - Done! Site is live

2. **GitHub Integration:**
   - Connect this repository
   - Auto-deploys on every push

### Deploy to GitHub Pages

```bash
# Enable GitHub Pages in repository settings
# Select main branch
# Site will be live at: https://ptusb.github.io/bmcc-admission-form
```

---

## 📊 Project Statistics

- **Total Lines:** ~2,500+
- **Form Fields:** 50+
- **File Uploads:** 15+
- **Form Steps:** 5
- **Validation Rules:** 20+
- **Auto-Calculations:** 5
- **Features:** 10 major features

---

## 🎯 Use Cases

- ✅ **Educational Institutions** - College admission forms
- ✅ **Class Projects** - Web development demonstrations
- ✅ **Portfolio** - Showcase multi-step form expertise
- ✅ **Learning** - Study modern form design patterns

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

---

## 📄 License

This project is **open source** and available for educational and personal use.

---

## 👨‍💻 Developer

**Created by:** [ptusb](https://github.com/ptusb)

**Skills:** Full Stack Development • Web Development • UI/UX Design • DevOps

---

## 🙏 Acknowledgments

- **BMCC** - Brihan Maharashtra College of Commerce
- **Deccan Education Society** - Institution branding
- **Google Fonts** - Inter & Poppins fonts
- **Netlify** - Free hosting platform

---

## 📞 Support

For questions or support:
- 📧 Create an issue on GitHub
- 💬 Contact: [ptusb](https://github.com/ptusb)

---

<div align="center">

**⭐ Star this repo if you found it helpful! ⭐**

Made with ❤️ by [ptusb](https://github.com/ptusb)

</div>
