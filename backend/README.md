# 🛍️ Mini Peppaca Backend

A robust, scalable Node.js backend API powering the Mini Peppaca e-commerce platform. Built with Express.js, GraphQL, and Supabase, this backend provides both REST and GraphQL APIs for seamless product management and favorites functionality.

![Node.js](https://img.shields.io/badge/Node.js-18.0.0-green?logo=node.js)
![Express](https://img.shields.io/badge/Express-4.18.0-black?logo=express)
![GraphQL](https://img.shields.io/badge/GraphQL-Apollo-blue?logo=graphql)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supabase-blue?logo=postgresql)

## ✨ Features

### 🚀 Core Functionality
- **Dual API Architecture**: REST API for products, GraphQL for favorites
- **Real-time Database**: Supabase PostgreSQL with real-time capabilities
- **Flexible Querying**: GraphQL for complex data relationships
- **RESTful Endpoints**: Standard REST API for CRUD operations
- **Comprehensive Error Handling**: Detailed error responses and logging

### 🔧 Advanced Features
- **Database Seeding**: Automated sample data generation
- **Performance Optimization**: Database indexes and query optimization
- **CORS Configuration**: Secure cross-origin resource sharing
- **Environment Management**: Flexible configuration for different environments
- **Health Monitoring**: Built-in health check endpoints

### 🛡️ Security & Reliability
- **Input Validation**: Comprehensive request validation
- **Error Boundaries**: Graceful error handling and recovery
- **Database Security**: Row Level Security (RLS) policies
- **Rate Limiting Ready**: Infrastructure for future rate limiting
- **Logging**: Detailed request and error logging

## 🛠️ Tech Stack

### Backend Framework
- **Node.js 18.0.0** - JavaScript runtime environment
- **Express.js 4.18.0** - Fast, unopinionated web framework
- **ES6 Modules** - Modern JavaScript module system

### API Technologies
- **GraphQL** - Query language for APIs with Apollo Server
- **REST API** - Standard RESTful endpoints for products
- **Apollo Server Express** - GraphQL server integration

### Database & Storage
- **Supabase** - Open source Firebase alternative
- **PostgreSQL** - Advanced open source database
- **Row Level Security** - Database-level security policies

### Development Tools
- **Nodemon** - Development server with auto-restart
- **Dotenv** - Environment variable management
- **ESLint** - Code linting and quality enforcement

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js          # Supabase client configuration
│   │
│   ├── models/
│   │   ├── Product.js           # Product data model and operations
│   │   ├── Seller.js            # Seller data model and operations
│   │   └── Favorite.js          # Favorite data model and operations
│   │
│   ├── graphql/
│   │   ├── typeDefs.js          # GraphQL schema definitions
│   │   └── resolvers.js         # GraphQL resolver functions
│   │
│   ├── routes/
│   │   ├── products.js          # Product REST API routes
│   │   ├── sellers.js           # Seller REST API routes
│   │   └── favorites.js         # Favorites REST API routes
│   │
│   ├── middleware/
│   │   └── errorHandler.js      # Global error handling middleware
│   │
│   ├── scripts/
│   │   └── seedDatabase.js      # Database seeding utilities
│   │
│   └── server.js                # Main application entry point
│
├── .env.example                 # Environment variables template
├── package.json                 # Dependencies and scripts
└── README.md                    # This file
```

## 🚀 Getting Started

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
   cd mini_peppaca/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env` file in the backend directory:
   ```env
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   PORT=3001
   NODE_ENV=development
   ```

4. **Database Setup**
   Run the SQL commands in your Supabase SQL Editor (see Database Schema section)

5. **Seed the database**
   ```bash
   npm run seed
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

7. **Verify the server is running**
   Navigate to [http://localhost:3001/health](http://localhost:3001/health)

## 🌐 Live Deployment

The backend API is now live and deployed on **Render**:

**🔗 Production Base URL**: `https://api-mini-peppaca.onrender.com/api`

**🔗 Production GraphQL Endpoint**: `https://api-mini-peppaca.onrender.com/graphql`

**🔗 Health Check**: [https://api-mini-peppaca.onrender.com/health](https://api-mini-peppaca.onrender.com/health)

The production API is fully functional and serves the live frontend at [mini-peppaca.netlify.app](https://mini-peppaca.netlify.app).

## 🗄️ Database Schema

### Tables Structure

```sql
-- Sellers table
CREATE TABLE IF NOT EXISTS sellers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  profile_picture TEXT,
  address TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  full_description TEXT,
  price DECIMAL(10,2) NOT NULL CHECK (price > 0),
  image TEXT NOT NULL,
  seller_id UUID NOT NULL REFERENCES sellers(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Favorites table
CREATE TABLE IF NOT EXISTS favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);
```

### Performance Indexes

```sql
-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_seller_id ON products(seller_id);
CREATE INDEX IF NOT EXISTS idx_products_title ON products USING gin(to_tsvector('english', title));
CREATE INDEX IF NOT EXISTS idx_products_description ON products USING gin(to_tsvector('english', description));
CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_product_id ON favorites(product_id);
```

### Security Policies

```sql
-- Enable Row Level Security
ALTER TABLE sellers ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- Create permissive policies (for development)
CREATE POLICY "Allow all operations on sellers" ON sellers FOR ALL USING (true);
CREATE POLICY "Allow all operations on products" ON products FOR ALL USING (true);
CREATE POLICY "Allow all operations on favorites" ON favorites FOR ALL USING (true);
```

## 🔌 API Documentation

### REST API Endpoints

#### Products Management
```http
GET    /api/products              # Get all products
GET    /api/products/:id          # Get product by ID
POST   /api/products              # Create new product
PUT    /api/products/:id          # Update product
DELETE /api/products/:id          # Delete product
```

**Query Parameters for Products:**
- `search` - Search in title and description
- `sellerId` - Filter by seller
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter
- `limit` - Number of results to return
- `offset` - Number of results to skip

#### Sellers Management
```http
GET    /api/sellers               # Get all sellers
GET    /api/sellers/:id           # Get seller by ID
POST   /api/sellers               # Create new seller
PUT    /api/sellers/:id           # Update seller
DELETE /api/sellers/:id           # Delete seller
```

#### Favorites Management
```http
GET    /api/favorites             # Get all favorites
POST   /api/favorites             # Add to favorites
DELETE /api/favorites/:productId  # Remove from favorites
GET    /api/favorites/:productId/check  # Check if favorited
```

### GraphQL API

#### Endpoint
- **URL**: `http://localhost:3001/graphql`
- **Playground**: Available in development mode

#### Sample Queries

**Get All Products**
```graphql
query GetProducts {
  products {
    id
    title
    description
    price
    image
    seller {
      id
      name
      email
      profilePicture
    }
  }
}
```

**Get Product by ID**
```graphql
query GetProduct($id: ID!) {
  product(id: $id) {
    id
    title
    fullDescription
    price
    image
    seller {
      name
      email
      address
      profilePicture
    }
  }
}
```

**Search Products**
```graphql
query SearchProducts($search: String!) {
  products(filter: { search: $search }) {
    id
    title
    description
    price
    image
  }
}
```

**Get Favorites**
```graphql
query GetFavorites {
  favorites {
    id
    productId
    product {
      id
      title
      description
      price
      image
      seller {
        name
        profilePicture
      }
    }
  }
}
```

#### Sample Mutations

**Add to Favorites**
```graphql
mutation AddToFavorites($productId: ID!) {
  addToFavorites(productId: $productId) {
    id
    productId
    createdAt
  }
}
```

**Remove from Favorites**
```graphql
mutation RemoveFromFavorites($productId: ID!) {
  removeFromFavorites(productId: $productId)
}
```

## 🔧 Development

### Available Scripts

```bash
# Start development server with auto-restart
npm run dev

# Start production server
npm start

# Seed database with sample data
npm run seed

# Check for linting issues
npm run lint

# Format code
npm run format
```

### Development Workflow

1. **API Development**: Add new routes in `src/routes/`
2. **Database Models**: Create models in `src/models/`
3. **GraphQL Schema**: Update `src/graphql/typeDefs.js`
4. **GraphQL Resolvers**: Implement in `src/graphql/resolvers.js`
5. **Error Handling**: Add to `src/middleware/errorHandler.js`

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `SUPABASE_URL` | Supabase project URL | Yes | - |
| `SUPABASE_ANON_KEY` | Supabase anonymous key | Yes | - |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | Yes | - |
| `PORT` | Server port | No | 3001 |
| `NODE_ENV` | Environment mode | No | development |

## 🚀 Deployment

### Production Build

1. **Set environment variables**
   ```bash
   NODE_ENV=production
   PORT=3001
   SUPABASE_URL=your_production_supabase_url
   SUPABASE_ANON_KEY=your_production_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_production_service_key
   ```

2. **Install dependencies**
   ```bash
   npm install --production
   ```

3. **Start the server**
   ```bash
   npm start
   ```

### Deployment Platforms

- **Render** ✅ **Currently Deployed** - Production backend running at [https://api-mini-peppaca.onrender.com](https://api-mini-peppaca.onrender.com)
- **Heroku**: Easy deployment with Git integration
- **Railway**: Modern deployment platform
- **DigitalOcean App Platform**: Scalable container deployment
- **AWS EC2**: Full control over server configuration
- **Vercel**: Serverless deployment option

### Environment Configuration

For production, ensure:
- CORS origins are properly configured
- Database connection is optimized
- Error logging is set up
- Health check endpoints are monitored

## 🔍 Monitoring & Health Checks

### Health Endpoint
```http
GET /health
```

**Response:**
```json
{
  "success": true,
  "message": "Mini Peppaca API is running!",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "production"
}
```

### GraphQL Test Endpoint
```http
GET /test-graphql
```

## 🤝 Integration with Frontend

The backend is designed to work seamlessly with the Mini Peppaca frontend:

### Frontend Configuration

**For Local Development:**
```env
VITE_API_URL=http://localhost:3001/api
VITE_GRAPHQL_URL=http://localhost:3001/graphql
```

**For Production (Frontend at mini-peppaca.netlify.app):**
```env
VITE_API_URL=https://api-mini-peppaca.onrender.com/api
VITE_GRAPHQL_URL=https://api-mini-peppaca.onrender.com/graphql
```

### API Integration Examples

**REST API (Products)**
```javascript
// Local development
const response = await fetch('http://localhost:3001/api/products');

// Production
const response = await fetch('https://api-mini-peppaca.onrender.com/api/products');

const products = await response.json();
```

**GraphQL (Favorites)**
```javascript
// Local development
const response = await fetch('http://localhost:3001/graphql', {

// Production
const response = await fetch('https://api-mini-peppaca.onrender.com/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: `query { favorites { id productId } }`
  })
});
```

## 🛡️ Security Considerations

### Current Implementation
- **No Authentication**: As per requirements, no user authentication
- **CORS Configuration**: Properly configured for frontend integration
- **Input Validation**: Basic validation on all endpoints
- **SQL Injection Protection**: Using parameterized queries

### Future Enhancements
- **JWT Authentication**: User authentication and authorization
- **Rate Limiting**: API rate limiting for abuse prevention
- **Request Validation**: Comprehensive input validation
- **API Keys**: Optional API key authentication
- **HTTPS Enforcement**: SSL/TLS encryption

## 📊 Performance Optimization

### Database Optimization
- **Indexes**: Strategic database indexes for common queries
- **Query Optimization**: Efficient GraphQL and REST queries
- **Connection Pooling**: Optimized database connections

### API Optimization
- **Caching**: Ready for Redis integration
- **Compression**: Response compression for large payloads
- **Pagination**: Built-in pagination support

## 🐛 Troubleshooting

### Common Issues

**Database Connection Failed**
```bash
# Check environment variables
echo $SUPABASE_URL
echo $SUPABASE_ANON_KEY

# Test connection
curl http://localhost:3001/health
```

**GraphQL Endpoint Not Found**
```bash
# Check if Apollo Server is running
curl http://localhost:3001/graphql

# Verify middleware order in server.js
```

**CORS Errors**
```bash
# Check CORS configuration in server.js
# Ensure frontend URL is in allowed origins
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow Node.js best practices
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
- Email: abdullahopadeji50@gmail.com

## 🙏 Acknowledgments

- **Express.js Team** for the amazing web framework
- **Apollo GraphQL** for the GraphQL server
- **Supabase Team** for the excellent database platform
- **Node.js Community** for the robust runtime environment

---

⭐ **Star this repository if you found it helpful!**