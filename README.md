# 🛍️ Mini Peppaca - Full-Stack E-Commerce Platform

A modern, full-stack e-commerce platform built with React, Node.js, and GraphQL. Mini Peppaca provides a seamless shopping experience with real-time product browsing, favorites management, and intuitive user interface.

![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-18.0.0-green?logo=node.js)
![GraphQL](https://img.shields.io/badge/GraphQL-Apollo-blue?logo=graphql)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supabase-blue?logo=postgresql)

## ✨ Features

### 🎯 Core Functionality
- **Product Browsing**: Browse through a curated collection of products with rich details
- **Smart Search**: Real-time search and filtering across product titles and descriptions
- **Favorites System**: Add/remove products to favorites with persistent state management
- **Product Details**: Comprehensive product information in elegant modal views
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### 🚀 Advanced Features
- **Dual API Architecture**: REST API for products, GraphQL for favorites
- **Real-time Database**: Supabase PostgreSQL with real-time capabilities
- **Optimistic Updates**: Instant UI feedback for better user experience
- **Toast Notifications**: Real-time feedback for user actions
- **Loading States**: Elegant loading indicators and error handling

### 🛡️ Technical Excellence
- **Type Safety**: Full TypeScript implementation across frontend and backend
- **Modern Architecture**: Clean separation of concerns with modular design
- **Performance Optimized**: Database indexes, efficient queries, and optimized builds
- **Developer Experience**: Hot reloading, comprehensive documentation, and clear structure

## 🛠️ Tech Stack

### Frontend
- **React 18.2.0** - Modern React with hooks and concurrent features
- **TypeScript 5.0** - Type-safe development with enhanced IDE support
- **Vite 4.4.0** - Lightning-fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful, customizable icons

### Backend
- **Node.js 18.0.0** - JavaScript runtime environment
- **Express.js 4.18.0** - Fast, unopinionated web framework
- **GraphQL** - Query language for APIs with Apollo Server
- **REST API** - Standard RESTful endpoints for products
- **Supabase** - Open source Firebase alternative with PostgreSQL

### Development Tools
- **ESLint** - Code linting and quality enforcement
- **Prettier** - Code formatting
- **Nodemon** - Development server with auto-restart
- **Dotenv** - Environment variable management

## 📁 Project Structure

```
mini_peppaca/
├── frontend/                    # React + TypeScript frontend
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── context/           # React Context providers
│   │   ├── data/              # API and data handling
│   │   ├── graphql/           # GraphQL operations
│   │   ├── types/             # TypeScript type definitions
│   │   ├── utils/             # Utility functions
│   │   └── App.tsx           # Main application component
│   ├── package.json
│   └── README.md              # Frontend documentation
│
├── backend/                    # Node.js + Express backend
│   ├── src/
│   │   ├── config/            # Database configuration
│   │   ├── models/            # Data models and operations
│   │   ├── graphql/           # GraphQL schema and resolvers
│   │   ├── routes/            # REST API routes
│   │   ├── middleware/        # Express middleware
│   │   └── server.js          # Main server file
│   ├── package.json
│   └── README.md              # Backend documentation
│
└── README.md                  # This file
```

## 🚀 Quick Start

### Prerequisites

Before running this application, ensure you have:

- **Node.js** (v16.0.0 or higher)
- **npm** (v8.0.0 or higher) or **Yarn** (v1.22.0 or higher)
- **Supabase Account** with a project created
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/abdorll/mini_peppaca.git
   cd mini_peppaca
   ```

2. **Set up the backend**
   ```bash
   cd backend
   npm install
   
   # Create .env file with your Supabase credentials
   cp .env.example .env
   # Edit .env with your Supabase URL and keys
   
   # Set up database (see backend README for SQL commands)
   npm run seed
   npm run dev
   ```

3. **Set up the frontend**
   ```bash
   cd ../frontend
   npm install
   
   # Create .env file
   echo "VITE_API_URL=http://localhost:3001/api" > .env
   echo "VITE_GRAPHQL_URL=http://localhost:3001/graphql" >> .env
   
   npm run dev
   ```

4. **Access the application**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend API: [http://localhost:3001](http://localhost:3001)
   - GraphQL Playground: [http://localhost:3001/graphql](http://localhost:3001/graphql)

## 🔌 API Architecture

### REST API (Products)
The backend provides RESTful endpoints for product management:

```http
GET    /api/products              # Get all products
GET    /api/products/:id          # Get product by ID
POST   /api/products              # Create new product
PUT    /api/products/:id          # Update product
DELETE /api/products/:id          # Delete product
```

### GraphQL API (Favorites)
GraphQL is used for favorites management with flexible queries:

```graphql
# Get favorites
query GetFavorites {
  favorites {
    id
    productId
    product {
      title
      price
      image
    }
  }
}

# Add to favorites
mutation AddToFavorites($productId: ID!) {
  addToFavorites(productId: $productId) {
    id
    productId
  }
}
```

## 🎨 User Interface

### Key Components
- **Product Grid**: Responsive grid layout with hover effects
- **Search Bar**: Real-time search with instant results
- **Product Cards**: Rich product information with images and prices
- **Product Modal**: Detailed product view with seller information
- **Favorites View**: Dedicated page for favorited products
- **Toast Notifications**: Success and error feedback

### Design Features
- **Responsive Design**: Mobile-first approach with breakpoint optimization
- **Smooth Animations**: CSS transitions and hover effects
- **Loading States**: Skeleton loaders and spinners
- **Error Handling**: Graceful error messages and retry options
- **Accessibility**: Keyboard navigation and screen reader support

## 🗄️ Database Schema

### Core Tables
- **Products**: Product information with seller relationships
- **Sellers**: Seller profiles with contact information
- **Favorites**: User favorites with product relationships

### Performance Features
- **Database Indexes**: Optimized for common queries
- **Full-Text Search**: PostgreSQL text search capabilities
- **Row Level Security**: Database-level security policies
- **Real-time Updates**: Supabase real-time subscriptions

## 🔧 Development

### Available Scripts

**Backend**
```bash
cd backend
npm run dev          # Start development server
npm run seed         # Seed database with sample data
npm start            # Start production server
```

**Frontend**
```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Development Workflow

1. **Backend Development**
   - Add new routes in `backend/src/routes/`
   - Create models in `backend/src/models/`
   - Update GraphQL schema in `backend/src/graphql/typeDefs.js`
   - Implement resolvers in `backend/src/graphql/resolvers.js`

2. **Frontend Development**
   - Create components in `frontend/src/components/`
   - Add GraphQL queries in `frontend/src/graphql/queries.ts`
   - Update types in `frontend/src/types/index.ts`
   - Style with Tailwind CSS classes

## 🚀 Deployment

### Backend Deployment
1. Set environment variables for production
2. Deploy to your preferred platform (Heroku, Railway, AWS, etc.)
3. Update CORS origins for your frontend domain

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy to Vercel, Netlify, or your preferred platform
3. Update environment variables for production API endpoints

### Environment Variables

**Backend (.env)**
```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
PORT=3001
NODE_ENV=production
```

**Frontend (.env)**
```env
VITE_API_URL=https://your-backend-domain.com/api
VITE_GRAPHQL_URL=https://your-backend-domain.com/graphql
```

## 🛡️ Security & Performance

### Security Features
- **CORS Configuration**: Properly configured for frontend integration
- **Input Validation**: Comprehensive request validation
- **SQL Injection Protection**: Using parameterized queries
- **Row Level Security**: Database-level security policies

### Performance Optimizations
- **Database Indexes**: Strategic indexes for common queries
- **Query Optimization**: Efficient GraphQL and REST queries
- **Image Optimization**: Responsive images with fallbacks
- **Code Splitting**: Lazy loading for better performance

## 📊 Monitoring & Health Checks

### Health Endpoints
- **Backend Health**: `GET /health`
- **GraphQL Test**: `GET /test-graphql`
- **Frontend Status**: Built-in error boundaries and loading states

### Error Handling
- **Frontend**: Toast notifications and error boundaries
- **Backend**: Comprehensive error responses and logging
- **Database**: Connection monitoring and retry logic

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

## 📚 Documentation

For detailed documentation, see the individual README files:

- 🔗 **[Frontend Documentation](frontend/README.md)** - React components, styling, and frontend setup
- 🔗 **[Backend Documentation](backend/README.md)** - API endpoints, database schema, and backend setup

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Abdullah Opadeji**

- LinkedIn: [Abdullah Opadeji](https://www.linkedin.com/in/abdullah-opadeji-06385b20b/)
- Portfolio: [take a look](https://abdorll.github.io)
- GitHub: [@abdorll](https://github.com/abdorll)
- Email: abdullahopadeji50@gmail.com

## 🙏 Acknowledgments

- **React Team** for the amazing frontend framework
- **Express.js Team** for the robust backend framework
- **Apollo GraphQL** for the GraphQL server
- **Supabase Team** for the excellent database platform
- **Tailwind CSS** for the utility-first CSS framework
- **Vite Team** for the fast build tool

## 🎯 Roadmap

### Planned Features
- **User Authentication**: JWT-based authentication system
- **Shopping Cart**: Add to cart functionality
- **Order Management**: Complete order processing
- **Payment Integration**: Stripe or PayPal integration
- **Admin Dashboard**: Seller and admin management interface
- **Real-time Chat**: Customer-seller messaging
- **Product Reviews**: Rating and review system
- **Advanced Search**: Filters, sorting, and faceted search

### Technical Improvements
- **Testing**: Unit and integration tests
- **CI/CD**: Automated testing and deployment
- **Caching**: Redis integration for performance
- **Monitoring**: Application performance monitoring
- **Analytics**: User behavior tracking

---

⭐ **Star this repository if you found it helpful!**

🚀 **Ready to build the future of e-commerce? Start contributing today!**
