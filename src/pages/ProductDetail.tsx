import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { ShoppingCart, ArrowLeft, Check } from 'lucide-react';
import Button from '../components/Button';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products } = useProducts();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
        <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Button 
          onClick={() => navigate('/products')}
          variant="primary"
          icon={<ArrowLeft size={16} />}
        >
          Back to Products
        </Button>
      </div>
    );
  }

  const addToCart = () => {
    // In a real application, this would add the product to a cart
    // For now, we'll just show an alert
    alert(`${product.title} added to cart!`);
  };

  const formattedDate = new Date(product.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button 
        onClick={() => navigate('/products')}
        className="flex items-center text-primary-600 hover:text-primary-800 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to products
      </button>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          {/* Product Image */}
          <div className="md:w-1/2 h-96 overflow-hidden bg-gray-200">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Product Details */}
          <div className="md:w-1/2 p-8">
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="mb-2">
                  <span className="inline-block bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.title}</h1>
                <p className="text-2xl font-bold text-primary-600 mb-6">${product.price.toFixed(2)}</p>
                
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
                  <p className="text-gray-600">{product.description}</p>
                </div>
                
                <div className="mb-6 space-y-3">
                  <div className="flex items-center">
                    <div className={`mr-2 ${product.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {product.stock > 0 ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <X className="h-5 w-5" />
                      )}
                    </div>
                    <span className={`${product.stock > 0 ? 'text-green-700' : 'text-red-700'}`}>
                      {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                    </span>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    Added on {formattedDate}
                  </div>
                </div>
              </div>
              
              {user?.role === 'customer' && (
                <div className="mt-6">
                  <Button
                    onClick={addToCart}
                    variant="primary"
                    size="lg"
                    fullWidth
                    disabled={product.stock === 0}
                    icon={<ShoppingCart size={18} />}
                  >
                    {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;