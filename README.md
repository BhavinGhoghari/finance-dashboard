# FinTrack — Finance Dashboard

A clean, interactive finance dashboard built with **React + Vite**, **Material UI (MUI)**, **Recharts**, and **Zustand**.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation & Run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Dashboard/          # Overview page
│   ├── Transactions/       # Transactions table + modal
│   ├── Insights/           # Insights & observations
│   └── Layout/             # Sidebar + responsive AppBar
├── store/useStore.js       # Zustand global state + persistence
├── data/mockData.js        # 6 months of mock transactions
├── theme/theme.js          # MUI light/dark theme
└── utils/helpers.js        # Formatters, CSV export, aggregations
```

---

## Features

- **Dashboard** — Summary cards, balance trend chart, spending donut, recent transactions
- **Transactions** — Searchable, filterable, sortable table with pagination + CSV export
- **Role-Based UI** — Admin (add/edit/delete) vs Viewer (read-only), switchable via sidebar
- **Insights** — Top category, monthly comparison, savings rate, daily spend, observations
- **Dark Mode** — Full dark/light theme toggle, persisted to localStorage
- **Responsive** — Mobile, tablet, and desktop layouts

## Tech Stack

React 18 + Vite · Material UI v5 · Recharts · Zustand · Day.js
