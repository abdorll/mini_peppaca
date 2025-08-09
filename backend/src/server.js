import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './graphql/typeDefs.js';
import { resolvers } from './graphql/resolvers.js';
import { testConnection } from './config/database.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import productsRouter from './routes/products.js';
import sellersRouter from './routes/sellers.js';
import favoritesRouter from './routes/favorites.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://your-frontend-domain.com']
    : ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Mini Peppaca API is running!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/test-graphql', (req, res) => {
  res.json({
    success: true,
    message: 'GraphQL endpoint should be available at /graphql',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/products', productsRouter);
app.use('/api/sellers', sellersRouter);
app.use('/api/favorites', favoritesRouter);

const createApolloServer = async () => {
  try {
    console.log('🔄 Creating Apollo Server...');

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req }) => {
        return {
          req,
        };
      },
      introspection: process.env.NODE_ENV !== 'production',
      playground: process.env.NODE_ENV !== 'production',
      formatError: (error) => {
        console.error('GraphQL Error:', error);
        return {
          message: error.message,
          path: error.path,
        };
      },
    });

    console.log('🔄 Starting Apollo Server...');
    await server.start();

    console.log('🔄 Applying Apollo middleware...');
    server.applyMiddleware({
      app,
      path: '/graphql',
      cors: {
        origin: process.env.NODE_ENV === 'production'
          ? ['https://your-frontend-domain.com']
          : ['http://localhost:3000', 'http://localhost:5173'],
        credentials: true
      }
    });

    console.log('✅ Apollo Server created and middleware applied successfully');
    return server;
  } catch (error) {
    console.error('❌ Error creating Apollo Server:', error);
    throw error;
  }
};

const startServer = async () => {
  try {
    console.log('🔍 Testing database connection...');
    const dbConnected = await testConnection();

    if (!dbConnected) {
      console.error('❌ Failed to connect to database. Please check your Supabase configuration.');
      process.exit(1);
    }

    console.log('🚀 Setting up GraphQL server...');
    const apolloServer = await createApolloServer();

    app.use(notFound);
    app.use(errorHandler);

    app.listen(PORT, () => {
      console.log('\n🎉 Mini Peppaca Backend Server Started!');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`🌐 Server running on: http://localhost:${PORT}`);
      console.log(`📊 GraphQL Endpoint: http://localhost:${PORT}${apolloServer.graphqlPath}`);
      console.log(`🎮 GraphQL Playground: http://localhost:${PORT}${apolloServer.graphqlPath}`);
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
      console.log(`   GET    /api/favorites/`);
      console.log(`   POST   /api/favorites`);
      console.log(`   DELETE /api/favorites/:productId`);
      console.log(`   GET    /api/favorites/:productId/check`);
      console.log('\n📋 Available GraphQL Endpoints:');
      console.log(`   POST   /graphql`);
      console.log(`   GET    /graphql (Playground)`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('👋 SIGINT received. Shutting down gracefully...');
  process.exit(0);
});

startServer();