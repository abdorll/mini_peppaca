export interface Seller {
  id: string;
  name: string;
  email: string;
  address: string;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  profile_picture: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  full_description: string;
  price: number;
  image: string;
  seller_id: string;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  seller: Seller;
}
export interface FavoritesContextType {
  favorites: string[];
  addToFavorites: (productId: string) => void;
  removeFromFavorites: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
}