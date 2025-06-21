import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductContextType } from '../types';
import { demoProducts } from '../data/demoProducts';

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = () => {
      try {
        const savedProducts = localStorage.getItem('products');
        if (savedProducts) {
          setProducts(JSON.parse(savedProducts));
        } else {
          setProducts(demoProducts);
          localStorage.setItem('products', JSON.stringify(demoProducts));
        }
      } catch (err) {
        setError('Failed to load products');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const addProduct = async (product: Omit<Product, 'id' | 'createdAt'>) => {
    try {
      const newProduct: Product = {
        ...product,
        id: Math.random().toString(36).substring(2, 15),
        createdAt: new Date(),
      };

      const updatedProducts = [...products, newProduct];
      setProducts(updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      return newProduct;
    } catch (err) {
      setError('Failed to add product');
      console.error(err);
      throw err;
    }
  };

  const updateProduct = async (id: string, updatedFields: Partial<Product>) => {
    try {
      const updatedProducts = products.map((product) =>
        product.id === id ? { ...product, ...updatedFields } : product
      );
      
      setProducts(updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
    } catch (err) {
      setError('Failed to update product');
      console.error(err);
      throw err;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const filteredProducts = products.filter((product) => product.id !== id);
      setProducts(filteredProducts);
      localStorage.setItem('products', JSON.stringify(filteredProducts));
    } catch (err) {
      setError('Failed to delete product');
      console.error(err);
      throw err;
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        isLoading,
        error,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};