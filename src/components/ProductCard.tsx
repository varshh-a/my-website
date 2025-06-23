import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onAddToWishlist?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onAddToWishlist }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
      <img
        src={product.image || '/placeholder.png'}
        alt={product.title}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.title}</h3>
      <p className="text-sm text-gray-600 mb-2">{product.category}</p>
      <p className="text-md font-bold text-primary-600 mb-4">${product.price.toFixed(2)}</p>
      <div className="mt-auto flex flex-col gap-2">
        {onAddToCart && (
          <button
            onClick={() => onAddToCart(product)}
            className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
          >
            Add to Cart
          </button>
        )}
        {onAddToWishlist && (
          <button
            onClick={() => onAddToWishlist(product)}
            className="text-sm text-primary-600 hover:underline"
          >
            Add to Wishlist
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
