export interface Seller {
  id: string;
  name: string;
  email: string;
  address: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  profilePicture: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  price: number;
  image: string;
  sellerId: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  seller: Seller;
}

export interface FavoritesContextType {
  favorites: string[];
  isLoading: boolean;
  error: string | null;
  addToFavorites: (productId: string) => Promise<void>;
  removeFromFavorites: (productId: string) => Promise<void>;
  isFavorite: (productId: string) => boolean;
  refreshFavorites: () => Promise<void>;
}