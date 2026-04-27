# 🚀 AdFlow Pro - Premium Advertising Marketplace

AdFlow Pro is a state-of-the-art SaaS platform designed to streamline the buying and selling of advertising placements. Featuring a cutting-edge "Cyber-Glass" aesthetic, the platform provides a seamless experience for Sellers to monetize their space and for Buyers to launch high-impact campaigns.

---

## ✨ Key Features

### 🛡️ Role-Based Access Control
- **Sellers**: Post new ad listings, manage active campaigns, and track earnings through a dedicated analytics dashboard.
- **Buyers**: Explore the marketplace, add placements to a persistent cart, and execute instant checkouts.
- **Admins**: Full oversight of platform statistics, user management, and payment verification.

### 🛒 Advanced Marketplace Logic
- **Cyber-Glass UI**: A premium, glassmorphic dark theme built with Tailwind CSS and Framer Motion for smooth interactions.
- **Persistent Cart**: Add multiple advertising packages and review them in a dedicated cart view before finalizing.
- **Simulated Checkout**: A complete end-to-end checkout flow with real-time processing states and success confirmations.

### 📊 Real-Time Analytics
- Dynamic data visualization for campaign performance, platform revenue, and user growth.
- Role-specific stats cards with custom color palettes and interactive hover effects.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14+](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Database/Auth**: [Supabase](https://supabase.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/muhammadshahzaib585/Midterm-Project-AWT-048.git
cd adflow-pro
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_DEMO_MODE=true
```
*Note: Set `NEXT_PUBLIC_DEMO_MODE=true` to run the application using the built-in persistent mock system without a live Supabase connection.*

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🎨 Design Philosophy
AdFlow Pro follows a **Cyber-Glass** design language:
- **Glassmorphism**: Heavy use of backdrop blurs and semi-transparent borders.
- **Vibrant Gradients**: Indigo to Purple color schemes for a premium feel.
- **Micro-animations**: Subtle hover transitions and reveal-up animations for high engagement.

---

## 🛡️ License
Distributed under the MIT License. See `LICENSE` for more information.

---
Developed with ❤️ by [Muhammad Shahzaib](https://github.com/muhammadshahzaib585)
