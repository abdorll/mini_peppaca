# 🛍️ Mini Peppaca – Frontend

This is the **frontend** of the Product Listing Web App, a modern React-based e-commerce interface that allows users to:

- View products
- Search and filter items
- View product details in a modal
- Add/remove favorites
- Toggle between all products and favorites view

This project connects to a backend RESTful API to fetch real product data and demonstrate state management and modular React architecture.

---

## ⚙️ Tech Stack

- ⚛️ React (with Hooks)
- 🪄 TypeScript
- 📦 Vite
- 💅 CSS Modules
- 🧠 Context API (Favorites)
- 🌐 REST API Integration

---

## 📁 Folder Structure
```
frontend/
├── components/ # Reusable UI components
│ ├── Header.tsx
│ ├── ProductCard.tsx
│ ├── ProductGrid.tsx
│ ├── ProductDetailModal.tsx
│ └── FavoritesView.tsx
│
├── context/ # Global state management (FavoritesContext)
│ └── FavoritesContext.tsx
│
├── data/ # API and mock data handlers
│ ├── fetchProducts.ts
│ └── mockData.ts
│
├── types/ # TypeScript type definitions
│ └── index.ts
│
├── App.tsx # Main application component
├── main.tsx # Entry point
├── index.css # Global styles
└── vite.config.ts # Vite config
```

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

---

### 🔧 Installation

1. Clone the repository:

```bash
git clone https://github.com/abdorll/mini_peppaca.git
cd frontend

npm install
# or
yarn install
```

## ▶️ Running the App
Make sure the backend is running at http://localhost:3000 (or update the API endpoint in `fetchProducts.ts`).

To start the frontend dev server:
```bash
npm run dev
# or
yarn dev
```
The app will be live at:
👉 http://localhost:5173

## 📦 Features
- 🔍 Search and filter products
- ❤️ Add/remove favorites using Context API
- 🧩 Product modal with detailed view
- 🌐 Data fetching from API
- 🔄 Toggle between all products and favorites
- 💡 Clean and modular component-based architecture

## 📌 Notes
Products are fetched via `fetchProducts.ts` using a GET `/api/products` endpoint.
You can temporarily use `mockData.ts` for testing without backend by replacing the fetch call in `App.tsx.`

## ✍️ Author
Developed by Abdullah Opadeji
Feel free to reach out on [LinkedIn](https://www.linkedin.com/in/abdullah-opadeji-06385b20b/)