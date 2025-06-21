import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import { useAuth } from '../../context/AuthContext';
import { ShoppingBag, Heart, Clock, Package, ChevronRight } from 'lucide-react';
import ProductCard from '../../components/ProductCard';

const CustomerDashboard: React.FC = () => {
  const { products } = useProducts();
  const { user } = useAuth();

  // Check if user is a customer
  if (!user || user.role !== 'customer') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
        <p className="text-gray-600 mb-8">You don't have permission to access this page.</p>
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
        >
          Go Home
        </Link>
      </div>
    );
  }

  // Get a few random recommended products
  const recommendedProducts = [...products]
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome, {user.username}!</h1>
        <p className="text-gray-600">Explore your personalized dashboard.</p>
      </div>

      {/* Quick Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-primary-100 text-primary-600 mr-4">
              <ShoppingBag className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Cart Items</p>
              <p className="text-2xl font-semibold text-gray-900">0</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-secondary-100 text-secondary-600 mr-4">
              <Heart className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Wishlist</p>
              <p className="text-2xl font-semibold text-gray-900">0</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-accent-100 text-accent-600 mr-4">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Recent Views</p>
              <p className="text-2xl font-semibold text-gray-900">0</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
              <Package className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Orders</p>
              <p className="text-2xl font-semibold text-gray-900">0</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Products */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">Recommended for You</h2>
          <Link to="/products" className="text-sm text-primary-600 hover:text-primary-800 flex items-center">
            View all <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => alert(`${product.title} added to cart!`)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Account Overview */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Account Overview</h2>
        </div>
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Account Details</h3>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm text-gray-900"><strong>Username:</strong> {user.username}</p>
              <p className="text-sm text-gray-900 mt-2"><strong>Email:</strong> {user.email}</p>
              <p className="text-sm text-gray-900 mt-2"><strong>Account Type:</strong> {user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Quick Links</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                to="/products"
                className="px-4 py-3 border border-gray-200 rounded-md hover:bg-gray-50 flex items-center"
              >
                <ShoppingBag className="h-5 w-5 text-primary-600 mr-2" />
                <span>Browse Products</span>
              </Link>
              
              <Link
                to="/profile"
                className="px-4 py-3 border border-gray-200 rounded-md hover:bg-gray-50 flex items-center"
              >
                <Heart className="h-5 w-5 text-primary-600 mr-2" />
                <span>Wishlist</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;