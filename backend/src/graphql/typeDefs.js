import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Seller {
    id: ID!
    name: String!
    email: String!
    profilePicture: String
    address: String!
    createdAt: String!
    updatedAt: String!
  }

  type Product {
    id: ID!
    title: String!
    description: String!
    fullDescription: String
    price: Float!
    image: String!
    sellerId: ID!
    seller: Seller!
    createdAt: String!
    updatedAt: String!
  }

  type Favorite {
    id: ID!
    userId: String!
    productId: ID!
    product: Product!
    createdAt: String!
  }

  input ProductFilter {
    search: String
    sellerId: ID
    minPrice: Float
    maxPrice: Float
    limit: Int
    offset: Int
  }

  input ProductInput {
    title: String!
    description: String!
    fullDescription: String
    price: Float!
    image: String!
    sellerId: ID!
  }

  input SellerInput {
    name: String!
    email: String!
    profilePicture: String
    address: String!
  }

  type Query {
    # Product queries
    products(filter: ProductFilter): [Product!]!
    product(id: ID!): Product
    
    # Seller queries
    sellers: [Seller!]!
    seller(id: ID!): Seller
    
    # Favorite queries
    favorites: [Favorite!]!
    isFavorite(productId: ID!): Boolean!
  }

  type Mutation {
    # Product mutations
    createProduct(input: ProductInput!): Product!
    updateProduct(id: ID!, input: ProductInput!): Product!
    deleteProduct(id: ID!): Boolean!
    
    # Seller mutations
    createSeller(input: SellerInput!): Seller!
    updateSeller(id: ID!, input: SellerInput!): Seller!
    deleteSeller(id: ID!): Boolean!
    
    # Favorite mutations
    addToFavorites(productId: ID!): Favorite!
    removeFromFavorites(productId: ID!): Boolean!
  }
`;