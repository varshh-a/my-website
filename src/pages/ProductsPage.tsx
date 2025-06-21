import React, { useState, useEffect } from 'react';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';
import { Search, SlidersHorizontal, X } from 'lucide-react';

const ProductsPage: React.FC = () => {
  const { products } = useProducts();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Extract unique categories
  const categories = Array.from(new Set(products.map(product => product.category)));

  // Filter products based on search, category and price range
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const addToCart = (product: Product) => {
    // In a real application, this would add the product to a cart
    // For now, we'll just show an alert
    alert(`${product.title} added to cart!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">All Products</h1>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-lg">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          {/* Filter Button (Mobile) */}
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="md:hidden flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <SlidersHorizontal className="h-5 w-5 mr-2" />
            Filters
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters (Desktop) */}
        <div className="hidden md:block w-64 space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Categories</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  id="all-categories"
                  name="category"
                  type="radio"
                  checked={selectedCategory === ''}
                  onChange={() => setSelectedCategory('')}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                />
                <label htmlFor="all-categories" className="ml-3 text-sm text-gray-700">
                  All Categories
                </label>
              </div>
              
              {categories.map((category) => (
                <div key={category} className="flex items-center">
                  <input
                    id={`category-${category}`}
                    name="category"
                    type="radio"
                    checked={selectedCategory === category}
                    onChange={() => setSelectedCategory(category)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                  />
                  <label htmlFor={`category-${category}`} className="ml-3 text-sm text-gray-700">
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Price Range</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="min-price" className="block text-sm text-gray-700">
                  Min Price: ${priceRange[0]}
                </label>
                <input
                  type="range"
                  id="min-price"
                  min="0"
                  max="1000"
                  step="10"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              
              <div>
                <label htmlFor="max-price" className="block text-sm text-gray-700">
                  Max Price: ${priceRange[1]}
                </label>
                <input
                  type="range"
                  id="max-price"
                  min="0"
                  max="1000"
                  step="10"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>

          <button 
            onClick={() => {
              setSelectedCategory('');
              setPriceRange([0, 1000]);
              setSearchTerm('');
            }}
            className="text-sm text-primary-600 hover:text-primary-800"
          >
            Reset Filters
          </button>
        </div>

        {/* Filters (Mobile) */}
        {isFilterOpen && (
          <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
            <div className="bg-white w-4/5 h-full overflow-y-auto p-6 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900">Filters</h3>
                <button onClick={() => setIsFilterOpen(false)}>
                  <X className="h-6 w-6 text-gray-500" />
                </button>
              </div>
              
              <div className="space-y-6 flex-1">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Categories</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        id="all-categories-mobile"
                        name="category-mobile"
                        type="radio"
                        checked={selectedCategory === ''}
                        onChange={() => setSelectedCategory('')}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                      />
                      <label htmlFor="all-categories-mobile" className="ml-3 text-sm text-gray-700">
                        All Categories
                      </label>
                    </div>
                    
                    {categories.map((category) => (
                      <div key={category} className="flex items-center">
                        <input
                          id={`category-${category}-mobile`}
                          name="category-mobile"
                          type="radio"
                          checked={selectedCategory === category}
                          onChange={() => setSelectedCategory(category)}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                        />
                        <label htmlFor={`category-${category}-mobile`} className="ml-3 text-sm text-gray-700">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Price Range</h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="min-price-mobile" className="block text-sm text-gray-700">
                        Min Price: ${priceRange[0]}
                      </label>
                      <input
                        type="range"
                        id="min-price-mobile"
                        min="0"
                        max="1000"
                        step="10"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="max-price-mobile" className="block text-sm text-gray-700">
                        Max Price: ${priceRange[1]}
                      </label>
                      <input
                        type="range"
                        id="max-price-mobile"
                        min="0"
                        max="1000"
                        step="10"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button 
                  onClick={() => {
                    setSelectedCategory('');
                    setPriceRange([0, 1000]);
                    setSearchTerm('');
                  }}
                  className="text-sm text-primary-600 hover:text-primary-800 block w-full text-center"
                >
                  Reset Filters
                </button>
                
                <button 
                  onClick={() => setIsFilterOpen(false)}
                  className="w-full py-2 px-4 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={user?.role === 'customer' ? addToCart : undefined}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;