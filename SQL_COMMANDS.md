# Supabase SQL Commands for Mini Peppaca

Run these commands in your Supabase SQL Editor to set up the database schema for Mini Peppaca.

## 🗄️ Database Schema Setup

### 1. Create Sellers Table

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
```

### 2. Create Products Table

```sql
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
```

### 3. Create Favorites Table

```sql
-- Create favorites table
CREATE TABLE IF NOT EXISTS favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);
```

### 4. Create Database Indexes

```sql
-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_seller_id ON products(seller_id);
CREATE INDEX IF NOT EXISTS idx_products_title ON products USING gin(to_tsvector('english', title));
CREATE INDEX IF NOT EXISTS idx_products_description ON products USING gin(to_tsvector('english', description));
CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_product_id ON favorites(product_id);
```

### 5. Enable Row Level Security

```sql
-- Enable Row Level Security (optional, for future authentication)
ALTER TABLE sellers ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
```

### 6. Create Security Policies

```sql
-- Create policies to allow all operations (since no authentication is required)
CREATE POLICY "Allow all operations on sellers" ON sellers FOR ALL USING (true);
CREATE POLICY "Allow all operations on products" ON products FOR ALL USING (true);
CREATE POLICY "Allow all operations on favorites" ON favorites FOR ALL USING (true);
```

## 🔧 Optional: Update Triggers

```sql
-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_sellers_updated_at BEFORE UPDATE ON sellers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## 📊 Verify Schema

```sql
-- Check if all tables were created successfully
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('sellers', 'products', 'favorites');

-- Check table structures
\d sellers
\d products
\d favorites
```

## 🧹 Reset Database (if needed)

```sql
-- WARNING: This will delete all data!
-- Only run if you need to reset the database

DROP TABLE IF EXISTS favorites CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS sellers CASCADE;
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;
```

## 📝 Notes

- All tables use UUID primary keys for better scalability
- Foreign key constraints ensure data integrity
- Indexes are created for commonly queried fields
- RLS is enabled but with permissive policies (no authentication required)
- Timestamps are automatically managed with triggers
- The `favorites` table uses a composite unique constraint to prevent duplicate favorites

After running these commands, your database will be ready for the Mini Peppaca backend!