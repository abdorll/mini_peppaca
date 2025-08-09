import { GraphQLClient } from '../utils/graphqlClient';
import { Product } from '../types';

export interface AddToFavoritesResponse {
  addToFavorites: {
    id: string;
    productId: string;
    product: Product;
    createdAt: string;
  };
}

export interface RemoveFromFavoritesResponse {
  removeFromFavorites: boolean;
}

const ADD_TO_FAVORITES_MUTATION = `
  mutation AddToFavorites($productId: ID!) {
    addToFavorites(productId: $productId) {
      id
      productId
      createdAt
      product {
        id
        title
        description
        fullDescription
        price
        image
        sellerId
        createdAt
        updatedAt
        seller {
          id
          name
          email
          address
          createdAt
          updatedAt
          profilePicture
        }
      }
    }
  }
`;

const REMOVE_FROM_FAVORITES_MUTATION = `
  mutation RemoveFromFavorites($productId: ID!) {
    removeFromFavorites(productId: $productId)
  }
`;

export const addToFavoritesGraphQL = async (productId: string): Promise<void> => {
  try {
    await GraphQLClient.mutation<AddToFavoritesResponse>(ADD_TO_FAVORITES_MUTATION, { productId });
    console.log('✅ Added to favorites successfully via GraphQL');
  } catch (error) {
    console.error('❌ Error adding to favorites via GraphQL:', error);
    throw error;
  }
};

export const removeFromFavoritesGraphQL = async (productId: string): Promise<void> => {
  try {
    await GraphQLClient.mutation<RemoveFromFavoritesResponse>(REMOVE_FROM_FAVORITES_MUTATION, { productId });
    console.log('✅ Removed from favorites successfully via GraphQL');
  } catch (error) {
    console.error('❌ Error removing from favorites via GraphQL:', error);
    throw error;
  }
}; 