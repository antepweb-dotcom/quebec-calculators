# Outils Financiers Québec 2026

A comprehensive suite of 16 financial calculators for Quebec residents, built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🧮 16 Professional Financial Calculators
- 💰 Accurate 2026 Quebec & Federal calculations
- 📊 Interactive charts and visualizations
- 📱 Fully responsive design
- 🇫🇷 Canadian French UI (Français Québécois)
- 🔒 Secure Admin Dashboard with Basic Auth
- ⚡ Built with Next.js 14 App Router

## Available Calculators

### Revenu & Impôts
- 💰 Calcul d'Impôt (Tax Calculator)
- ⏱️ Taux Horaire (Hourly Rate)
- 🛡️ Assurance-Emploi (Employment Insurance)
- ✈️ Paie de Vacances (Vacation Pay)
- 🍽️ Pourboire (Tip Calculator)
- 🧾 TPS/TVQ (Sales Tax)

### Immobilier
- 🏠 Hypothèque (Mortgage Calculator)
- 💰 Capacité d'Emprunt (Borrowing Capacity)
- 💵 Taxe de Bienvenue (Transfer Tax)
- 📈 Augmentation Loyer (Rent Increase)

### Famille & Futur
- 🚗 Prêt Auto (Auto Loan)
- 🎓 Prêt Étudiant (Student Loan)
- 💳 Remboursement Dette (Debt Repayment)
- 👶 Frais de Garde (Daycare Costs)
- 📊 Épargne-Retraite (Retirement Savings)
- 📉 Inflation (Inflation Calculator)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Admin Dashboard

Access the admin panel at `/admin` with Basic Authentication:
- **Username:** `admin`
- **Password:** `quebec-master-2026`

Features:
- 📊 Overview with revenue and traffic stats
- 📈 Performance analytics for all tools
- 💰 Ad management (Google AdSense configuration)
- 🚨 Global alerts and announcements
- 🌐 Bilingual support (Turkish/English)

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Icons:** Lucide React
- **Security:** Next.js Middleware (Basic Auth)
- **UI Language:** Canadian French

## Project Structure

```
├── app/
│   ├── admin/                    # Admin dashboard
│   ├── [16 calculator routes]/   # Individual calculator pages
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage
│   └── globals.css               # Global styles
├── components/
│   ├── Navbar.tsx                # Navigation component
│   ├── [19 calculator components]
│   └── DonutChart.tsx            # Chart visualization
├── utils/
│   └── [17 logic files]          # Calculation logic
└── middleware.ts                 # Admin route protection
```

## Deployment

This project can be deployed on:
- **Vercel** (Recommended - Zero config)
- **Netlify**
- **Railway**
- **AWS Amplify**
- **DigitalOcean App Platform**

## License

MIT
