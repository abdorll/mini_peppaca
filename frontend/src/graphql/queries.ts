import { GraphQLClient } from '../utils/graphqlClient';
import { Product } from '../types';

export interface ProductFilter {
  search?: string;
  sellerId?: string;
  minPrice?: number;
  maxPrice?: number;
  limit?: number;
  offset?: number;
}

export interface ProductsResponse {
  products: Product[];
}

export interface ProductResponse {
  product: Product;
}

export interface FavoritesResponse {
  favorites: Array<{
    id: string;
    productId: string;
    product: Product;
    createdAt: string;
  }>;
}

export interface IsFavoriteResponse {
  isFavorite: boolean;
}

const GET_PRODUCTS_QUERY = `
  query GetProducts($filter: ProductFilter) {
    products(filter: $filter) {
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
`;

const GET_PRODUCT_QUERY = `
  query GetProduct($id: ID!) {
    product(id: $id) {
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
`;

const GET_FAVORITES_QUERY = `
  query GetFavorites {
    favorites {
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

const CHECK_IS_FAVORITE_QUERY = `
  query CheckIsFavorite($productId: ID!) {
    isFavorite(productId: $productId)
  }
`;

export const fetchProductsGraphQL = async (filter?: ProductFilter): Promise<Product[]> => {
  try {
    const response = await GraphQLClient.query<ProductsResponse>(GET_PRODUCTS_QUERY, { filter });
    return response.products;
  } catch (error) {
    console.error('❌ Error fetching products via GraphQL:', error);
    throw error;
  }
};

export const fetchProductGraphQL = async (id: string): Promise<Product> => {
  try {
    const response = await GraphQLClient.query<ProductResponse>(GET_PRODUCT_QUERY, { id });
    return response.product;
  } catch (error) {
    console.error('❌ Error fetching product via GraphQL:', error);
    throw error;
  }
};

export const fetchFavoritesGraphQL = async (): Promise<string[]> => {
  try {
    const response = await GraphQLClient.query<FavoritesResponse>(GET_FAVORITES_QUERY);
    return response.favorites.map(favorite => favorite.productId);
  } catch (error) {
    console.error('❌ Error fetching favorites via GraphQL:', error);
    throw error;
  }
};

export const checkIsFavoriteGraphQL = async (productId: string): Promise<boolean> => {
  try {
    const response = await GraphQLClient.query<IsFavoriteResponse>(CHECK_IS_FAVORITE_QUERY, { productId });
    return response.isFavorite;
  } catch (error) {
    console.error('❌ Error checking favorite status via GraphQL:', error);
    return false;
  }
};