import React, { useState, useMemo, useEffect } from 'react';
import { FavoritesProvider, useFavorites } from './context/FavoritesContext';
import { Header } from './components/Header';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import { FavoritesView } from './components/FavoritesView';
// import { mockProducts } from './data/mockData';
import { fetchProducts } from './data/fetchProducts';
import { Product } from './types';

const AppContent: React.FC = () => {
  const [currentView, setCurrentView] = useState<'products' | 'favorites'>('products');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

    const [products, setProducts] = useState<Product[]>([]);

  const { favorites } = useFavorites();

  // TODO: Replace mock data with API call: GET /api/products
  // This should include pagination, filtering, and sorting parameters


  useEffect(() => {
    const load = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };

    load();
  }, []);


const filteredProducts = useMemo(() => {
  console.log(products); // this should now reflect actual fetched data
  return products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
}, [searchQuery, products]); // ← fix: add `products` here


  const favoriteProducts = useMemo(() => {
    return products.filter(product => favorites.includes(product.id));
  }, [favorites]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    // TODO: On product click: GET /api/products/:id for detailed information
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onViewChange={setCurrentView}
        currentView={currentView}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        favoritesCount={favorites.length}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'products' ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">Products</h1>
              <div className="text-sm text-gray-600">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
              </div>
            </div>
            <ProductGrid 
              products={filteredProducts} 
              onProductClick={handleProductClick}
            />
          </div>
        ) : (
          <FavoritesView
            favoriteProducts={favoriteProducts}
            onProductClick={handleProductClick}
            onBackToProducts={() => setCurrentView('products')}
          />
        )}
      </main>

      <ProductDetailModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

function App() {
  return (
    <FavoritesProvider>
      <AppContent />
    </FavoritesProvider>
  );
}

export default App;
