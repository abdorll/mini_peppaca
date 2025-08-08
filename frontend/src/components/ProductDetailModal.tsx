import React from 'react';
import { X, Heart, User, Mail, MapPin } from 'lucide-react';
import { Product } from '../types';
import { useFavorites } from '../context/FavoritesContext';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose
}) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  if (!isOpen || !product) return null;

  const isProductFavorite = isFavorite(product.id);

  const handleFavoriteClick = () => {
    if (isProductFavorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product.id);
    }
  };

  // TODO: Replace with API call: GET /api/products/:id for detailed product information

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Product Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Product Information */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
                <p className="text-4xl font-bold text-blue-600">${product.price}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">{product.fullDescription}</p>
              </div>

              {/* Seller Information */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Seller Information
                </h3>
                <div className="flex items-start space-x-4">
                  <img
                    src={product.seller.profilePicture}
                    alt={product.seller.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1 space-y-2">
                    <h4 className="font-semibold text-gray-900">{product.seller.name}</h4>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Mail className="h-4 w-4" />
                      <span className="text-sm">{product.seller.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{product.seller.address}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={handleFavoriteClick}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl border-2 transition-colors ${
                    isProductFavorite
                      ? 'border-red-500 bg-red-50 text-red-600'
                      : 'border-gray-300 hover:border-red-500 hover:bg-red-50 hover:text-red-600'
                  }`}
                >
                  <Heart
                    className={`h-5 w-5 ${isProductFavorite ? 'fill-red-600' : ''}`}
                  />
                  <span>{isProductFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};