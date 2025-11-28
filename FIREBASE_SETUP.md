# 🔥 Firebase Setup Guide

To make your Admission Form and Admin Panel work with the Cloud Database, you need to set up a free Firebase project.

## 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Name it `BMCC-Admission-Form`
4. Disable Google Analytics (optional)
5. Click **"Create project"**

## 2. Create Realtime Database
1. In the left menu, click **Build** > **Realtime Database**
2. Click **"Create Database"**
3. Select location (US or Singapore is fine)
4. **IMPORTANT:** Start in **Test Mode** (allows read/write access)
5. Click **Enable**

## 3. Get Configuration Keys
1. Click the **Settings Gear ⚙️** (Project Overview) > **Project settings**
2. Scroll down to "Your apps"
3. Click the **</>** icon (Web)
4. Register app (name it `AdmissionForm`)
5. You will see a code block with `firebaseConfig`

## 4. Update Your Code
1. Copy the `firebaseConfig` object (content inside `{ ... }`)
2. Open `firebase-config.js` in your project
3. Replace the placeholder values with your actual keys

## 5. Deploy
Once you've updated the config file:
1. Commit and push to GitHub
2. Your Netlify site will auto-update
3. **Done!** Your form now saves to the cloud! ☁️
