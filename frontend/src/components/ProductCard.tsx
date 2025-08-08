import React from 'react';
import { Heart, User, MapPin } from 'lucide-react';
import { Product } from '../types';
import { useFavorites } from '../context/FavoritesContext';

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onProductClick }) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const isProductFavorite = isFavorite(product.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isProductFavorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product.id);
    }
  };

  return (
    <div
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-100 overflow-hidden group"
      onClick={() => onProductClick(product)}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors"
        >
          <Heart
            className={`h-5 w-5 transition-colors ${
              isProductFavorite
                ? 'text-red-500 fill-red-500'
                : 'text-gray-600 hover:text-red-500'
            }`}
          />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-gray-900 line-clamp-1">{product.title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2 mt-1">{product.description}</p>
        </div>

        <div className="text-2xl font-bold text-gray-900">${product.price}</div>

        {/* Seller Info */}
        <div className="flex items-center space-x-3 pt-2 border-t border-gray-100">
          <img
            src={product.seller.profile_picture}
            alt={product.seller.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-1">
              <User className="h-3 w-3 text-gray-400" />
              <span className="text-sm font-medium text-gray-700 truncate">{product.seller.name}</span>
            </div>
            <div className="flex items-center space-x-1 mt-0.5">
              <MapPin className="h-3 w-3 text-gray-400" />
              <span className="text-xs text-gray-500 truncate">
                {product.seller.address.split(',')[1]?.trim() || product.seller.address}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};