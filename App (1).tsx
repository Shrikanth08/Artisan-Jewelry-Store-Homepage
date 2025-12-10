import { useState, useRef, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FeaturedCollections } from './components/FeaturedCollections';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { CartModal } from './components/CartModal';
import { Product } from './components/ProductCard';
import { productsAPI, cartAPI } from './services/api';
import { AlertCircle } from 'lucide-react';

function AppContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [showBackendWarning, setShowBackendWarning] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Load products on mount
  useEffect(() => {
    loadProducts();
    loadCartCount();
  }, []);

  // Load products when search query changes
  useEffect(() => {
    if (searchQuery) {
      loadProducts(searchQuery);
    } else {
      loadProducts();
    }
  }, [searchQuery]);

  const loadProducts = async (search?: string) => {
    try {
      setLoading(true);
      const data = await productsAPI.getAll(search);
      setProducts(data);
      setShowBackendWarning(false);
    } catch (error) {
      console.error('Failed to load products:', error);
      // Show warning that we're using mock data
      setShowBackendWarning(true);
      // Try again - the API will return mock data
      const mockData = await productsAPI.getAll(search);
      setProducts(mockData);
    } finally {
      setLoading(false);
    }
  };

  const loadCartCount = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setCartCount(0);
        return;
      }
      
      const cartData = await cartAPI.getCart();
      const count = cartData.items.reduce((sum: number, item: any) => sum + item.quantity, 0);
      setCartCount(count);
    } catch (error) {
      // User not logged in or cart is empty
      setCartCount(0);
    }
  };

  const handleSearchFocus = () => {
    searchInputRef.current?.focus();
    searchInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        onSearchFocus={handleSearchFocus}
        onCartClick={() => setCartModalOpen(true)}
        onAuthClick={() => setAuthModalOpen(true)}
        cartCount={cartCount}
      />
      
      {showBackendWarning && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center gap-2 text-amber-800 text-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <p>
              Backend not connected - using demo mode. To enable full features (auth, cart, orders), start your Python Flask backend.
            </p>
          </div>
        </div>
      )}
      
      <HeroSection
        ref={searchInputRef}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      {loading ? (
        <div className="py-16 text-center">
          <p className="text-gray-500">Loading products...</p>
        </div>
      ) : (
        <FeaturedCollections
          products={products}
          searchQuery={searchQuery}
          onProductUpdate={loadCartCount}
        />
      )}
      
      <Footer />

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />

      <CartModal
        isOpen={cartModalOpen}
        onClose={() => setCartModalOpen(false)}
        cartCount={cartCount}
        onCartUpdate={loadCartCount}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}