import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { ShoppingCart, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface ProductCardProps {
  product: Product;
  onDelete?: (id: string) => void;
  onAddToCart?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onDelete, 
  onAddToCart 
}) => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:scale-[1.01]">
      <div className="relative h-48 overflow-hidden bg-gray-200">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover"
        />
        {product.stock <= 5 && product.stock > 0 && (
          <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
            Only {product.stock} left!
          </div>
        )}
        {product.stock === 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            Out of stock
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{product.title}</h3>
        <p className="text-primary-600 font-bold mt-1">${product.price.toFixed(2)}</p>
        <p className="text-gray-600 text-sm mt-2 line-clamp-2">{product.description}</p>
        
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-gray-500">{product.category}</span>
          
          {isAdmin ? (
            <div className="flex space-x-2">
              <Link 
                to={`/admin/products/edit/${product.id}`}
                className="p-1.5 text-blue-600 hover:text-blue-800 transition-colors"
              >
                <Edit size={18} />
              </Link>
              {onDelete && (
                <button 
                  onClick={() => onDelete(product.id)}
                  className="p-1.5 text-red-600 hover:text-red-800 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link 
                to={`/products/${product.id}`}
                className="text-sm text-primary-600 hover:text-primary-800 transition-colors"
              >
                View Details
              </Link>
              {product.stock > 0 && onAddToCart && (
                <button
                  onClick={() => onAddToCart(product)}
                  className="p-1.5 text-primary-600 hover:text-primary-800 transition-colors"
                  disabled={product.stock === 0}
                >
                  <ShoppingCart size={18} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;