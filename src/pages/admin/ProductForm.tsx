// imports
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import { useAuth } from '../../context/AuthContext';

import { ArrowLeft, Save } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, addProduct, updateProduct } = useProducts();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: 'Electronics',
    image: '',
    stock: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { value: 'Electronics', label: 'Electronics' },
    { value: 'Clothing', label: 'Clothing' },
    { value: 'Home', label: 'Home' },
    { value: 'Furniture', label: 'Furniture' },
    { value: 'Food', label: 'Food' },
  ];

  useEffect(() => {
    if (id) {
      const product = products.find(p => p.id === id);
      if (product) {
        setFormData({
          title: product.title,
          price: product.price.toString(),
          description: product.description,
          category: product.category,
          image: product.image,
          stock: product.stock.toString(),
        });
      } else {
        navigate('/admin/products');
      }
    }
  }, [id, products, navigate]);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.price.trim() || isNaN(Number(formData.price)) || Number(formData.price) <= 0)
      newErrors.price = 'Price must be a positive number';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.image.trim() || !/^https?:\/\/.+/.test(formData.image))
      newErrors.image = 'Valid image URL is required';
    if (!formData.stock.trim() || isNaN(Number(formData.stock)) || Number(formData.stock) < 0)
      newErrors.stock = 'Stock must be a non-negative number';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const productData = {
        title: formData.title,
        price: parseFloat(formData.price),
        description: formData.description,
        category: formData.category,
        image: formData.image,
        stock: parseInt(formData.stock),
        createdBy: user?.id || '',
      };

      if (id) {
        await updateProduct(id, productData);
        toast.success('Product updated successfully!');
      } else {
        await addProduct(productData);
        toast.success('Product added successfully!');
      }

      navigate('/admin/products');
    } catch (error) {
      toast.error('Something went wrong while saving the product.');
      console.error('Error saving product:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/admin/products')}
        className="flex items-center text-primary-600 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Products
      </button>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">
            {id ? 'Edit Product' : 'Add New Product'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block font-medium text-gray-700">
              Product Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleInputChange}
              className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 ${
                errors.title ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
              }`}
              required
            />
            {errors.title && <p className="text-red-600 mt-1">{errors.title}</p>}
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="block font-medium text-gray-700">
              Price ($)
            </label>
            <input
              id="price"
              name="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={handleInputChange}
              className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 ${
                errors.price ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
              }`}
              required
            />
            {errors.price && <p className="text-red-600 mt-1">{errors.price}</p>}
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block font-medium text-gray-700">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 ${
                errors.category ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
              }`}
              required
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
            {errors.category && <p className="text-red-600 mt-1">{errors.category}</p>}
          </div>

          {/* Stock */}
          <div>
            <label htmlFor="stock" className="block font-medium text-gray-700">
              Stock Quantity
            </label>
            <input
              id="stock"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleInputChange}
              className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 ${
                errors.stock ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
              }`}
              required
            />
            {errors.stock && <p className="text-red-600 mt-1">{errors.stock}</p>}
          </div>

          {/* Image URL */}
          <div>
            <label htmlFor="image" className="block font-medium text-gray-700">
              Image URL
            </label>
            <input
              id="image"
              name="image"
              type="text"
              value={formData.image}
              onChange={handleInputChange}
              className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 ${
                errors.image ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
              }`}
              required
            />
            {errors.image && <p className="text-red-600 mt-1">{errors.image}</p>}
            {formData.image && (
              <img
                src={formData.image}
                alt="Preview"
                className="h-24 object-cover mt-2 rounded"
              />
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 ${
                errors.description ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
              }`}
              required
            />
            {errors.description && <p className="text-red-600 mt-1">{errors.description}</p>}
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/admin/products')}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : id ? 'Update Product' : 'Add Product'}
              <Save size={16} className="ml-2" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
