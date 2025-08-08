# 🛍️ Mini Peppaca – Backend

A Node.js + Express backend API for the Mini Peppaca e-commerce marketplace, featuring GraphQL for product queries and REST API for favorites management.

## 🚀 Features

- **GraphQL API** for flexible product and seller queries
- **REST API** for favorites management
- **Supabase Integration** with PostgreSQL database
- **Error Handling** with comprehensive error responses
- **Database Seeding** with sample data
- **CORS Support** for frontend integration

## 🛠️ Tech Stack

- Node.js + Express.js
- GraphQL with Apollo Server
- Supabase (PostgreSQL)
- ES6 Modules

## 📋 Prerequisites

- Node.js (v16 or higher)
- Supabase account and project
- npm or yarn

## ⚙️ Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Configuration

Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

Fill in your Supabase credentials:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
PORT=3001
NODE_ENV=development
```

### 3. Database Setup

Run these SQL commands in your Supabase SQL Editor:

```sql
-- Create sellers table
CREATE TABLE IF NOT EXISTS sellers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  profile_picture TEXT NOT NULL,
  address TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL CHECK (price > 0),
  image TEXT NOT NULL,
  seller_id UUID NOT NULL REFERENCES sellers(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create favorites table
CREATE TABLE IF NOT EXISTS favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_seller_id ON products(seller_id);
CREATE INDEX IF NOT EXISTS idx_products_title ON products USING gin(to_tsvector('english', title));
CREATE INDEX IF NOT EXISTS idx_products_description ON products USING gin(to_tsvector('english', description));
CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_product_id ON favorites(product_id);

-- Enable Row Level Security (optional, for future authentication)
ALTER TABLE sellers ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- Create policies to allow all operations (since no authentication is required)
CREATE POLICY "Allow all operations on sellers" ON sellers FOR ALL USING (true);
CREATE POLICY "Allow all operations on products" ON products FOR ALL USING (true);
CREATE POLICY "Allow all operations on favorites" ON favorites FOR ALL USING (true);
```

### 4. Seed Database

```bash
npm run seed
```

### 5. Start Development Server

```bash
npm run dev
```

The server will start on `http://localhost:3001`

## 📚 API Documentation

### GraphQL Endpoint

- **URL**: `http://localhost:3001/graphql`
- **Playground**: Available in development mode

#### Sample Queries

```graphql
# Get all products
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

# Get product by ID
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

# Search products
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

### REST API Endpoints

#### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

#### Sellers
- `GET /api/sellers` - Get all sellers
- `GET /api/sellers/:id` - Get seller by ID
- `POST /api/sellers` - Create new seller
- `PUT /api/sellers/:id` - Update seller
- `DELETE /api/sellers/:id` - Delete seller

#### Favorites
- `GET /api/favorites/:userId` - Get user's favorites
- `POST /api/favorites` - Add to favorites
- `DELETE /api/favorites/:userId/:productId` - Remove from favorites
- `GET /api/favorites/:userId/:productId/check` - Check if favorited

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run seed` - Seed database with sample data

### Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js          # Supabase configuration
│   ├── models/
│   │   ├── Product.js           # Product model
│   │   ├── Seller.js            # Seller model
│   │   └── Favorite.js          # Favorite model
│   ├── graphql/
│   │   ├── typeDefs.js          # GraphQL schema
│   │   └── resolvers.js         # GraphQL resolvers
│   ├── routes/
│   │   ├── products.js          # Product REST routes
│   │   ├── sellers.js           # Seller REST routes
│   │   └── favorites.js         # Favorites REST routes
│   ├── middleware/
│   │   └── errorHandler.js      # Error handling middleware
│   ├── scripts/
│   │   └── seedDatabase.js      # Database seeding script
│   └── server.js                # Main server file
├── .env.example                 # Environment variables template
├── package.json
└── README.md
```

## 🚀 Deployment

For production deployment:

1. Set `NODE_ENV=production` in your environment
2. Update CORS origins in `server.js`
3. Ensure all environment variables are set
4. Run `npm start`

## 🤝 Integration with Frontend

The backend is designed to work seamlessly with the Mini Peppaca frontend. Update the frontend's API calls to point to your backend URL:

```javascript
// Replace mock data calls with actual API calls
const response = await fetch('http://localhost:3001/api/products');
const data = await response.json();
```

## 📝 Notes

- No authentication is implemented as per requirements
- All tables have RLS enabled but with permissive policies
- Database includes proper indexes for performance
- Error handling provides detailed responses for debugging
- GraphQL playground is available in development mode