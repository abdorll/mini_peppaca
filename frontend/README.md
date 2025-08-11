# 🛍️ Mini Peppaca Frontend

A modern, responsive e-commerce frontend built with React, TypeScript, and GraphQL. This application provides a seamless shopping experience with real-time product browsing, favorites management, and intuitive user interface.

![Mini Peppaca Frontend](https://img.shields.io/badge/React-18.2.0-blue?logo=react)|
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-4.4.0-purple?logo=vite)
![GraphQL](https://img.shields.io/badge/GraphQL-Query-blue?logo=graphql)

## ✨ Features

### 🎯 Core Functionality
- **Product Browsing**: Browse through a curated collection of products with rich details
- **Smart Search**: Real-time search and filtering across product titles and descriptions
- **Favorites System**: Add/remove products to favorites with persistent state management
- **Product Details**: Comprehensive product information in elegant modal views
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### 🚀 Advanced Features
- **GraphQL Integration**: Modern data fetching with GraphQL queries and mutations
- **Optimistic Updates**: Instant UI feedback for better user experience
- **Toast Notifications**: Real-time feedback for user actions
- **Loading States**: Elegant loading indicators and error handling
- **Image Fallbacks**: Graceful handling of missing product images

### 🎨 User Experience
- **Dual View Mode**: Toggle between all products and favorites view
- **Smooth Animations**: CSS transitions and hover effects
- **Accessibility**: Keyboard navigation and screen reader support
- **Error Boundaries**: Graceful error handling with user-friendly messages

## 🛠️ Tech Stack

### Frontend Framework
- **React 18.2.0** - Modern React with hooks and concurrent features
- **TypeScript 5.0** - Type-safe development with enhanced IDE support
- **Vite 4.4.0** - Lightning-fast build tool and development server

### State Management
- **React Context API** - Global state management for favorites
- **React Hooks** - useState, useEffect, useMemo for local state
- **Custom Hooks** - Reusable logic for API calls and state management

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful, customizable icons
- **CSS Modules** - Scoped styling for components

### Data Layer
- **REST API** - Product data fetching via Axios
- **GraphQL** - Favorites management with queries and mutations
- **Axios** - HTTP client for REST API requests
- **Custom GraphQL Client** - Optimized for favorites operations

### Development Tools
- **ESLint** - Code linting and quality enforcement
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Header.tsx     # Navigation and search bar
│   │   ├── ProductCard.tsx # Individual product display
│   │   ├── ProductGrid.tsx # Product grid layout
│   │   ├── ProductDetailModal.tsx # Product detail modal
│   │   └── FavoritesView.tsx # Favorites page component
│   │
│   ├── context/           # React Context providers
│   │   ├── FavoritesContext.tsx # Favorites state management
│   │   └── ToastContext.tsx # Toast notifications
│   │
│   ├── data/              # API and data handling
│   │   ├── fetchProducts.ts # Product fetching logic
│   │   └── favoritesApi.ts # Favorites API operations
│   │
│   ├── graphql/           # GraphQL operations
│   │   ├── queries.ts     # GraphQL queries
│   │   └── mutations.ts   # GraphQL mutations
│   │
│   ├── types/             # TypeScript type definitions
│   │   └── index.ts       # Product, Seller, and API types
│   │
│   ├── utils/             # Utility functions
│   │   └── graphqlClient.ts # GraphQL client configuration
│   │
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # Application entry point
│   └── index.css         # Global styles
│
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite build configuration
└── tailwind.config.js    # Tailwind CSS configuration
```

## 🚀 Getting Started

### Prerequisites

Before running this application, ensure you have:

- **Node.js** (v16.0.0 or higher)
- **npm** (v8.0.0 or higher) or **Yarn** (v1.22.0 or higher)
- **Backend Server** running (see backend README for setup)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/abdorll/mini_peppaca.git
   cd mini_peppaca/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env` file in the frontend directory:
   ```env
   VITE_API_URL=http://localhost:3001
   VITE_GRAPHQL_URL=http://localhost:3001/graphql
   ```
   
   **Note**: For production, the app uses:
   - **API Base URL**: `https://api-mini-peppaca.onrender.com/api`
   - **GraphQL URL**: `https://api-mini-peppaca.onrender.com/graphql`

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:5173](http://localhost:5173)

## 🌐 Live Version

The live version of this frontend application is available at:
**🔗 [mini-peppaca.netlify.app](https://mini-peppaca.netlify.app)**

This production version connects to the live backend API at `https://api-mini-peppaca.onrender.com/api`.

## 🔧 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check

# Lint code
npm run lint

# Format code
npm run format
```

### Development Workflow

1. **Component Development**: Create new components in `src/components/`
2. **State Management**: Use Context API for global state, hooks for local state
3. **API Integration**: Add new GraphQL queries/mutations in `src/graphql/`
4. **Styling**: Use Tailwind CSS classes for consistent design
5. **Testing**: Write tests for critical user flows

## 📱 Features in Detail

### Product Browsing
- **Grid Layout**: Responsive product grid with hover effects
- **Search Functionality**: Real-time search across product titles and descriptions
- **Product Cards**: Rich product information with images, prices, and seller details

### Favorites Management
- **Add to Favorites**: One-click favorite addition with optimistic updates
- **Remove from Favorites**: Instant removal with visual feedback
- **Favorites View**: Dedicated page showing all favorited products
- **Persistent State**: Favorites persist across browser sessions

### Product Details
- **Modal Interface**: Elegant modal for detailed product information
- **Seller Information**: Complete seller profile with contact details
- **Full Description**: Extended product descriptions
- **High-Quality Images**: Product images with fallback handling

### User Experience
- **Loading States**: Skeleton loaders and spinners for better UX
- **Error Handling**: Graceful error messages and retry options
- **Toast Notifications**: Success and error feedback for user actions
- **Responsive Design**: Mobile-first approach with breakpoint optimization

## 🔌 API Integration

### REST API Endpoints

The frontend communicates with the backend through REST API for products:

- **Products Query**: Fetch all products with filtering options via `GET /api/products`

### GraphQL Endpoints

The frontend uses GraphQL for favorites management:

- **Favorites Query**: Retrieve user's favorite products
- **Add to Favorites**: Add a product to favorites
- **Remove from Favorites**: Remove a product from favorites
- **Check Favorite Status**: Check if a product is in favorites

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3B82F6) - Main actions and highlights
- **Secondary**: Gray (#6B7280) - Text and borders
- **Success**: Green (#10B981) - Success states
- **Error**: Red (#EF4444) - Error states and warnings
- **Background**: Light gray (#F9FAFB) - Page backgrounds

### Typography
- **Headings**: Inter font family for clear hierarchy
- **Body Text**: System fonts for optimal readability
- **Responsive**: Fluid typography that scales with viewport

### Components
- **Cards**: Consistent product card design with shadows
- **Buttons**: Primary and secondary button styles
- **Modals**: Overlay modals with backdrop blur
- **Forms**: Clean input fields with validation states

## 🚀 Deployment

### Production Build

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Preview the build**
   ```bash
   npm run preview
   ```

3. **Deploy to your preferred platform**
   - Vercel (recommended)
   - Netlify
   - AWS S3 + CloudFront
   - GitHub Pages

### Environment Variables

Set these environment variables in production:

```env
VITE_API_URL=https://api-mini-peppaca.onrender.com/api
VITE_GRAPHQL_URL=https://api-mini-peppaca.onrender.com/graphql
```

**Current Production URLs:**
- **Frontend**: [mini-peppaca.netlify.app](https://mini-peppaca.netlify.app)
- **Backend API**: [https://api-mini-peppaca.onrender.com/api](https://api-mini-peppaca.onrender.com/api)
- **GraphQL Endpoint**: [https://api-mini-peppaca.onrender.com/graphql](https://api-mini-peppaca.onrender.com/graphql)

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Follow the existing code style

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Abdullah Opadeji**

- LinkedIn: [Abdullah Opadeji](https://www.linkedin.com/in/abdullah-opadeji-06385b20b/)
- Portfolio: [take a look](https://abdorll.github.io)
- GitHub: [@abdorll](https://github.com/abdorll)
- Email: abdullahopadeji50@gmail.com.com

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Vite Team** for the fast build tool
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for the beautiful icons
- **GraphQL** for the modern API query language

---

⭐ **Star this repository if you found it helpful!**