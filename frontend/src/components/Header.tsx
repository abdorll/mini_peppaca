import React from 'react';
import { ShoppingBag, Heart, Search } from 'lucide-react';

interface HeaderProps {
  onViewChange: (view: 'products' | 'favorites') => void;
  currentView: 'products' | 'favorites';
  searchQuery: string;
  onSearchChange: (query: string) => void;
  favoritesCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onViewChange,
  currentView,
  searchQuery,
  onSearchChange,
  favoritesCount
}) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <ShoppingBag className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Mini Peppaca</h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-4">
            <button
              onClick={() => onViewChange('products')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentView === 'products'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Products
            </button>
            <button
              onClick={() => onViewChange('favorites')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                currentView === 'favorites'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Heart className="h-5 w-5" />
              <span>Favorites</span>
              {favoritesCount > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};