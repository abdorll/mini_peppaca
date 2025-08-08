import { Product } from '../models/Product.js';
import { Seller } from '../models/Seller.js';
import { Favorite } from '../models/Favorite.js';

export const resolvers = {
  Query: {
    // Product resolvers
    products: async (_, { filter = {} }) => {
      try {
        return await Product.findAll(filter);
      } catch (error) {
        throw new Error(`Failed to fetch products: ${error.message}`);
      }
    },

    product: async (_, { id }) => {
      try {
        return await Product.findById(id);
      } catch (error) {
        throw new Error(`Failed to fetch product: ${error.message}`);
      }
    },

    // Seller resolvers
    sellers: async () => {
      try {
        return await Seller.findAll();
      } catch (error) {
        throw new Error(`Failed to fetch sellers: ${error.message}`);
      }
    },

    seller: async (_, { id }) => {
      try {
        return await Seller.findById(id);
      } catch (error) {
        throw new Error(`Failed to fetch seller: ${error.message}`);
      }
    },

    // Favorite resolvers
    favorites: async (_, { userId }) => {
      try {
        return await Favorite.findByUserId(userId);
      } catch (error) {
        throw new Error(`Failed to fetch favorites: ${error.message}`);
      }
    },

    isFavorite: async (_, { userId, productId }) => {
      try {
        return await Favorite.isFavorite(userId, productId);
      } catch (error) {
        throw new Error(`Failed to check favorite status: ${error.message}`);
      }
    }
  },

  Mutation: {
    // Product mutations
    createProduct: async (_, { input }) => {
      try {
        return await Product.create(input);
      } catch (error) {
        throw new Error(`Failed to create product: ${error.message}`);
      }
    },

    updateProduct: async (_, { id, input }) => {
      try {
        return await Product.update(id, input);
      } catch (error) {
        throw new Error(`Failed to update product: ${error.message}`);
      }
    },

    deleteProduct: async (_, { id }) => {
      try {
        return await Product.delete(id);
      } catch (error) {
        throw new Error(`Failed to delete product: ${error.message}`);
      }
    },

    // Seller mutations
    createSeller: async (_, { input }) => {
      try {
        return await Seller.create(input);
      } catch (error) {
        throw new Error(`Failed to create seller: ${error.message}`);
      }
    },

    updateSeller: async (_, { id, input }) => {
      try {
        return await Seller.update(id, input);
      } catch (error) {
        throw new Error(`Failed to update seller: ${error.message}`);
      }
    },

    deleteSeller: async (_, { id }) => {
      try {
        return await Seller.delete(id);
      } catch (error) {
        throw new Error(`Failed to delete seller: ${error.message}`);
      }
    },

    // Favorite mutations
    addToFavorites: async (_, { userId, productId }) => {
      try {
        return await Favorite.create(userId, productId);
      } catch (error) {
        throw new Error(`Failed to add to favorites: ${error.message}`);
      }
    },

    removeFromFavorites: async (_, { userId, productId }) => {
      try {
        return await Favorite.delete(userId, productId);
      } catch (error) {
        throw new Error(`Failed to remove from favorites: ${error.message}`);
      }
    }
  }
};