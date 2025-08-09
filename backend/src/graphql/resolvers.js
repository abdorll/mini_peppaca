import { Product } from '../models/Product.js';
import { Seller } from '../models/Seller.js';
import { Favorite } from '../models/Favorite.js';

export const resolvers = {
  Query: {
    products: async (_, { filter = {} }) => {
      try {
        console.log('🔄 GraphQL: Fetching products with filter:', filter);
        const products = await Product.findAll(filter);
        console.log('✅ GraphQL: Products fetched successfully:', products.length);
        return products;
      } catch (error) {
        console.error('❌ GraphQL: Error fetching products:', error);
        throw new Error(`Failed to fetch products: ${error.message}`);
      }
    },

    product: async (_, { id }) => {
      try {
        console.log('🔄 GraphQL: Fetching product by ID:', id);
        const product = await Product.findById(id);
        console.log('✅ GraphQL: Product fetched successfully:', product?.title);
        return product;
      } catch (error) {
        console.error('❌ GraphQL: Error fetching product:', error);
        throw new Error(`Failed to fetch product: ${error.message}`);
      }
    },

    sellers: async () => {
      try {
        console.log('🔄 GraphQL: Fetching sellers');
        const sellers = await Seller.findAll();
        console.log('✅ GraphQL: Sellers fetched successfully:', sellers.length);
        return sellers;
      } catch (error) {
        console.error('❌ GraphQL: Error fetching sellers:', error);
        throw new Error(`Failed to fetch sellers: ${error.message}`);
      }
    },

    seller: async (_, { id }) => {
      try {
        console.log('🔄 GraphQL: Fetching seller by ID:', id);
        const seller = await Seller.findById(id);
        console.log('✅ GraphQL: Seller fetched successfully:', seller?.name);
        return seller;
      } catch (error) {
        console.error('❌ GraphQL: Error fetching seller:', error);
        throw new Error(`Failed to fetch seller: ${error.message}`);
      }
    },

    favorites: async () => {
      try {
        console.log('🔄 GraphQL: Fetching favorites');
        const favorites = await Favorite.findByUserId();
        console.log('✅ GraphQL: Favorites fetched successfully:', favorites.length);
        return favorites;
      } catch (error) {
        console.error('❌ GraphQL: Error fetching favorites:', error);
        throw new Error(`Failed to fetch favorites: ${error.message}`);
      }
    },

    isFavorite: async (_, { productId }) => {
      try {
        console.log('🔄 GraphQL: Checking if product is favorite:', productId);
        const isFavorite = await Favorite.isFavorite(productId);
        console.log('✅ GraphQL: Favorite status checked:', isFavorite);
        return isFavorite;
      } catch (error) {
        console.error('❌ GraphQL: Error checking favorite status:', error);
        throw new Error(`Failed to check favorite status: ${error.message}`);
      }
    }
  },

  Mutation: {
    createProduct: async (_, { input }) => {
      try {
        console.log('🔄 GraphQL: Creating product:', input.title);
        const product = await Product.create(input);
        console.log('✅ GraphQL: Product created successfully:', product.title);
        return product;
      } catch (error) {
        console.error('❌ GraphQL: Error creating product:', error);
        throw new Error(`Failed to create product: ${error.message}`);
      }
    },

    updateProduct: async (_, { id, input }) => {
      try {
        console.log('🔄 GraphQL: Updating product:', id);
        const product = await Product.update(id, input);
        console.log('✅ GraphQL: Product updated successfully:', product.title);
        return product;
      } catch (error) {
        console.error('❌ GraphQL: Error updating product:', error);
        throw new Error(`Failed to update product: ${error.message}`);
      }
    },

    deleteProduct: async (_, { id }) => {
      try {
        console.log('🔄 GraphQL: Deleting product:', id);
        const result = await Product.delete(id);
        console.log('✅ GraphQL: Product deleted successfully');
        return result;
      } catch (error) {
        console.error('❌ GraphQL: Error deleting product:', error);
        throw new Error(`Failed to delete product: ${error.message}`);
      }
    },

    createSeller: async (_, { input }) => {
      try {
        console.log('🔄 GraphQL: Creating seller:', input.name);
        const seller = await Seller.create(input);
        console.log('✅ GraphQL: Seller created successfully:', seller.name);
        return seller;
      } catch (error) {
        console.error('❌ GraphQL: Error creating seller:', error);
        throw new Error(`Failed to create seller: ${error.message}`);
      }
    },

    updateSeller: async (_, { id, input }) => {
      try {
        console.log('🔄 GraphQL: Updating seller:', id);
        const seller = await Seller.update(id, input);
        console.log('✅ GraphQL: Seller updated successfully:', seller.name);
        return seller;
      } catch (error) {
        console.error('❌ GraphQL: Error updating seller:', error);
        throw new Error(`Failed to update seller: ${error.message}`);
      }
    },

    deleteSeller: async (_, { id }) => {
      try {
        console.log('🔄 GraphQL: Deleting seller:', id);
        const result = await Seller.delete(id);
        console.log('✅ GraphQL: Seller deleted successfully');
        return result;
      } catch (error) {
        console.error('❌ GraphQL: Error deleting seller:', error);
        throw new Error(`Failed to delete seller: ${error.message}`);
      }
    },

    addToFavorites: async (_, { productId }) => {
      try {
        console.log('🔄 GraphQL: Adding to favorites:', productId);
        const favorite = await Favorite.create(productId);
        console.log('✅ GraphQL: Added to favorites successfully');
        return favorite;
      } catch (error) {
        console.error('❌ GraphQL: Error adding to favorites:', error);
        throw new Error(`Failed to add to favorites: ${error.message}`);
      }
    },

    removeFromFavorites: async (_, { productId }) => {
      try {
        console.log('🔄 GraphQL: Removing from favorites:', productId);
        const result = await Favorite.delete(productId);
        console.log('✅ GraphQL: Removed from favorites successfully');
        return result;
      } catch (error) {
        console.error('❌ GraphQL: Error removing from favorites:', error);
        throw new Error(`Failed to remove from favorites: ${error.message}`);
      }
    }
  },

  Product: {
    fullDescription: (parent) => {
      return parent.full_description || parent.fullDescription || null;
    },
    sellerId: (parent) => {
      return parent.seller_id || parent.sellerId;
    },
    createdAt: (parent) => {
      return parent.created_at || parent.createdAt;
    },
    updatedAt: (parent) => {
      return parent.updated_at || parent.updatedAt;
    }
  },

  Seller: {
    profilePicture: (parent) => {
      return parent.profile_picture || parent.profilePicture || null;
    },
    createdAt: (parent) => {
      return parent.created_at || parent.createdAt;
    },
    updatedAt: (parent) => {
      return parent.updated_at || parent.updatedAt;
    }
  },

  Favorite: {
    userId: (parent) => {
      return parent.user_id || parent.userId;
    },
    productId: (parent) => {
      return parent.product_id || parent.productId;
    },
    createdAt: (parent) => {
      return parent.created_at || parent.createdAt;
    }
  }
};