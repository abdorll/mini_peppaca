import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './graphql/typeDefs.js';
import { resolvers } from './graphql/resolvers.js';
import { testConnection } from './config/database.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

// Import routes
import productsRouter from './routes/products.js';
import sellersRouter from './routes/sellers.js';
import favoritesRouter from './routes/favorites.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://your-frontend-domain.com']
    : ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Mini Peppaca API is running!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// REST API Routes
app.use('/api/products', productsRouter);
app.use('/api/sellers', sellersRouter);
app.use('/api/favorites', favoritesRouter);

// Create Apollo Server for GraphQL
const createApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      // Add any context data here (user info, etc.)
      return {
        req,
        // user: req.user, // if you add authentication later
      };
    },
    introspection: process.env.NODE_ENV !== 'production',
    playground: process.env.NODE_ENV !== 'production'
  });

  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });
  
  return server;
};

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
const startServer = async () => {
  try {
    // Test database connection
    console.log('🔍 Testing database connection...');
    const dbConnected = await testConnection();
    
    if (!dbConnected) {
      console.error('❌ Failed to connect to database. Please check your Supabase configuration.');
      process.exit(1);
    }

    // Create Apollo Server
    console.log('🚀 Setting up GraphQL server...');
    const apolloServer = await createApolloServer();

    // Start Express server
    app.listen(PORT, () => {
      console.log('\n🎉 Mini Peppaca Backend Server Started!');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`🌐 Server running on: http://localhost:${PORT}`);
      console.log(`📊 GraphQL Playground: http://localhost:${PORT}${apolloServer.graphqlPath}`);
      console.log(`🔗 Health Check: http://localhost:${PORT}/health`);
      console.log('\n📋 Available REST Endpoints:');
      console.log(`   GET    /api/products`);
      console.log(`   GET    /api/products/:id`);
      console.log(`   POST   /api/products`);
      console.log(`   PUT    /api/products/:id`);
      console.log(`   DELETE /api/products/:id`);
      console.log(`   GET    /api/sellers`);
      console.log(`   GET    /api/sellers/:id`);
      console.log(`   POST   /api/sellers`);
      console.log(`   PUT    /api/sellers/:id`);
      console.log(`   DELETE /api/sellers/:id`);
      console.log(`   GET    /api/favorites/:userId`);
      console.log(`   POST   /api/favorites`);
      console.log(`   DELETE /api/favorites/:userId/:productId`);
      console.log(`   GET    /api/favorites/:userId/:productId/check`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('👋 SIGINT received. Shutting down gracefully...');
  process.exit(0);
});

startServer();