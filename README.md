# BMCC Admission Form - BBA Programs 2024-25

A premium, modern, and user-friendly admission form for Brihan Maharashtra College of Commerce (BMCC), Deccan Education Society, Pune.

## 🎓 Programs Offered

- **BBA Computer Application (BBA CA)**
- **BBA International Business (BBA IB)**
- **BBA General**

## ✨ Features

### 🎨 Premium Design
- **Modern Dark Theme** with animated gradient backgrounds
- **Glassmorphism Effects** with backdrop blur
- **Smooth Animations** and micro-interactions
- **Responsive Design** - works on all devices
- **Accessibility** compliant with ARIA labels

### 📝 Multi-Step Form
- **5 Progressive Steps**:
  1. Personal Information
  2. Educational Qualifications (10th & 12th)
  3. CET Examination Details
  4. Documentation Upload
  5. Bank Details & Contact Information

### 🔧 Smart Features
- **Auto-calculations**:
  - Age from Date of Birth
  - Percentage from marks (10th & 12th)
- **File Upload** with drag-and-drop support
- **Form Validation** with helpful error messages
- **Auto-save** - Progress saved every 30 seconds
- **Keyboard Shortcuts** for power users
- **Success Modal** with application ID generation

### 📋 Comprehensive Fields

#### Personal Information
- Full Name, DOB, Age (auto-calculated)
- Gender, Blood Group
- Category/Caste, Religion
- Nationality, Mother Tongue

#### Educational Details
**10th Standard (SSC)**:
- Board, Year of Passing, School Name
- Subjects, Marks, Percentage (auto-calculated)
- Marksheet upload, School LC upload

**12th Standard (HSC)**:
- Board, Year of Passing, Stream, College Name
- Subjects, Marks, Percentage (auto-calculated)
- Marksheet upload, College LC upload

#### CET Examination
- Program choice (BBA CA/IB/General)
- Preferences list
- Application ID, Exam Date
- CET Marks, Percentile
- MH Rank, All India Rank
- Registration form, Hall ticket, Verification form, Score card upload

#### Documentation
**Caste & Income Related**:
- Caste Certificate
- Caste Validity Certificate
- Income Certificate
- Non-Creamy Layer Certificate

**Identity Documents**:
- Aadhar Card ✓ (required)
- PAN Card
- Passport Photo ✓ (required)
- Signature ✓ (required)

**Additional Documents**:
- Gap Certificate (if applicable)
- NOC (if applicable)
- Transfer Certificate
- Domicile Certificate

#### Bank & Contact Details
**Bank Information**:
- Bank Name, Branch
- Account Number, IFSC Code
- Account Holder Name
- Cancelled Cheque/Passbook upload

**Contact Information**:
- Email, Mobile Number
- Alternate Mobile, Landline
- Complete Address with Pincode

**Parent/Guardian Information**:
- Father's Name, Occupation, Contact
- Mother's Name, Occupation, Contact
- Guardian details (if applicable)

**Admission Enquiry**:
- Source of information
- Additional remarks

## ⌨️ Keyboard Shortcuts

- `Alt + Right Arrow` - Next Step
- `Alt + Left Arrow` - Previous Step
- `Escape` - Close Modal

## 🚀 Getting Started

### Installation

1. Clone or download this repository
2. Open `index.html` in a modern web browser

### No Build Required

This is a pure HTML/CSS/JavaScript application with no dependencies. Simply open the `index.html` file in your browser to start using the form.

## 📁 File Structure

```
admission-form-ui-project/
│
├── index.html          # Main HTML file
├── style.css           # Comprehensive styling
├── script.js           # Form logic and interactions
└── README.md          # This file
```

## 🎯 Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with custom properties, animations
- **Vanilla JavaScript** - No frameworks/libraries
- **Google Fonts** - Inter & Poppins

## 🌐 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: < 768px

## 🔒 Data Privacy

- Form data is saved locally in browser's localStorage
- No data is transmitted to any server by default
- Replace the `handleFormSubmit` function in `script.js` with your actual API endpoint

## 🎨 Customization

### Colors

Edit CSS variables in `style.css`:

```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    --accent-color: #ec4899;
    /* ... more colors */
}
```

### Adding/Removing Fields

1. Add HTML input in appropriate `form-step` section
2. Update validation in `script.js` if needed
3. Add styling in `style.css` if custom styling required

## 🐛 Known Issues

None currently. Please report any issues you find.

## 📞 Support

For technical support or queries related to the admission process, contact:

- **Email**: admissions@bmcc.edu
- **Phone**: +91-20-2567-XXXX
- **Website**: www.bmcc.edu

## 📄 License

© 2024 Brihan Maharashtra College of Commerce, Deccan Education Society. All rights reserved.

## 🙏 Credits

Designed and developed with ❤️ for BMCC

---

**Note**: This is a front-end implementation. You'll need to integrate it with a backend service to actually process and store the form submissions.
