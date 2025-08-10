import React from 'react';
import { Heart, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface FavoritesViewProps {
  favoriteProducts: Product[];
  onProductClick: (product: Product) => void;
  onBackToProducts: () => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  favoriteProducts,
  onProductClick,
  onBackToProducts
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Heart className="h-8 w-8 text-red-500" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Favorites</h1>
            <p className="text-gray-600 mt-1">
              {favoriteProducts.length} {favoriteProducts.length === 1 ? 'item' : 'items'} saved
            </p>
          </div>
        </div>

        {/* Back to Products Button - Only show when there are favorites */}
        {favoriteProducts.length > 0 && (
          <button
            onClick={onBackToProducts}
            className="inline-flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors border border-gray-200"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Products</span>
          </button>
        )}
      </div>

      {/* Content */}
      {favoriteProducts.length === 0 ? (
        <div className="text-center py-16">
          <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">No favorites yet</h3>
          <p className="text-gray-500 mb-6">Start browsing and add products to your favorites!</p>
          <button
            onClick={onBackToProducts}
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <ShoppingBag className="h-5 w-5" />
            <span>Browse Products</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onProductClick={onProductClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};