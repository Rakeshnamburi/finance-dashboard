# 🌟 FinDash — Interactive Finance Dashboard

> A premium, interactive, dark-themed financial dashboard built to demonstrate frontend proficiency, reactive state management, and modern user interface design.

## 🚀 Overview

FinDash is a beautifully designed, intuitive frontend application tailored for tracking personal or corporate finances. It requires no backend and purely relies on the powerful **React Context API** coupled with a `useReducer` paradigm for robust, localized state-management. 

From deep transactional filtering to complex responsive data visualizations, this dashboard delivers a flawless "wow" experience right in the browser.

## ✨ Key Features

### 📊 Comprehensive Dashboard
- **Live Summary Cards:** Real-time calculation of balances, income, expenses, and savings rates.
- **Interactive Visualizations:** Time-lapse spending trends via area charts and clear categorical expenditure breakdowns.
- **Quick Insights:** Actionable activity feeds and predictive budget progress markers.

### 💸 Powerful Transaction Management
- **Smart Filtering:** Find transactions instantly using category and type (income/expense) filters.
- **Sorting & Searching:** Organize data dynamically by date or amount, complete with a global text search input.
- **Data Exporting:** Instantly export filtered records into **CSV** or **JSON** format.

### 🎭 Role-Based Access Control (RBAC)
- Client-side mock user roles natively baked into the interface.
- **Viewer Mode:** Can explore and interact with analytics but cannot alter data.
- **Admin Mode:** Gains elevated controls to seamlessly Add, Edit, or Delete specific transactions.

### 📈 Deep Analytics & Insights
- **Top Categories:** Automatically ranks highest-draining expenditure categories.
- **Monthly Trend Tracking:** Analyzes net savings and visually identifies break-even paths.
- **Financial Health Score:** Proprietary formula displaying your current financial stability out of 100 with dynamic svg rings.
- **Spending Radar:** An animated Rechart Radar to easily spot lifestyle drift in spending across axes.

## 🛠️ Technology Stack

- **Framework:** React + Vite
- **Styling:** Tailwind CSS (Custom extended dark color palette)
- **State Management:** Context API + `useReducer`
- **Charts:** Recharts
- **Icons:** Lucide-React
- **Animations:** Custom CSS Animations + Tailwind transition utilities

## 🏃‍♂️ Getting Started

### Prerequisites
Make sure you have Node.js and NPM installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Rakeshnamburi/finance-dashboard.git
   cd finance-dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Navigate to:** `http://localhost:5173` in your browser.

## 🌐 Deployment & Hosting

This project is optimized and configured for instant deployment on **Vercel** via its native Vite integration.

### Steps to Deploy:
1. Push this repository to your GitHub account.
2. Sign in to your [Vercel Dashboard](https://vercel.com/) and click **Add New > Project**.
3. Import this GitHub repository (`finance-dashboard`).
4. Ensure the **Framework Preset** is recognized as **Vite**.
5. Keep the default Build Command (`npm run build`) and Output Directory (`dist`).
6. Click **Deploy**. Vercel will safely compile and host the app automatically via HTTPS!

> Note: Because this app relies entirely on React State (Context API) for page transitions, there is absolutely no need for a complex `vercel.json` routing fallback.

## 🎨 Design Philosophy
This app follows a strictly enforced **"Premium Fintech"** aesthetic. Generic templates were actively avoided in favor of bespoke glassmorphism elements, custom micro-animations, neon-accented gradients, and a soothing dark background palette.

## 📝 License
This project is open-source and available under the [MIT License](LICENSE).
