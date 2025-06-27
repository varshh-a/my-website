// 
import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  Shield,
  Truck,
  CreditCard,
  ChevronRight,
} from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';

const Home: React.FC = () => {
  const { products } = useProducts();
  const featuredProducts = products.slice(0, 3); // Display first 3 products as featured

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div
        className="text-black relative bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://plus.unsplash.com/premium_photo-1679852311462-733ae167dbc3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGFuZGljcmFmdHMlMjBpbmR1c3RyeSUyMGxvZ298ZW58MHx8MHx8fDA%3D')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Empowering rural artisans through digital marketing
              </h1>
              <p className="text-lg text-white mb-8">
                Discover quality products with secure shopping and fast delivery. Your one-stop
                destination for all your shopping needs.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/products"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-primary-700 bg-white hover:bg-primary-50 transition-colors"
                >
                  Browse Products
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/signup"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-white/20 hover:bg-white/30 transition-colors"
                >
                  Create Account
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              {/* <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl8Z1rT_gXdQrvmIcRVgFz4lDPqplDUAr9Fw&s"
                alt="Shopping"
                className="w-[500px] h-[600px] rounded-lg shadow-2xl object-cover"
              /> */}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Discover our handpicked selection of premium products that our customers love.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/products"
            className="inline-flex items-center text-primary-600 hover:text-primary-800 font-medium"
          >
            View All Products
            <ChevronRight className="ml-1 h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Shop With Us</h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              We pride ourselves on providing the best shopping experience for our customers.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center p-6 border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center p-3 bg-primary-100 rounded-full mb-4">
                <ShoppingBag className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Quality Products</h3>
              <p className="text-gray-600 text-sm">Carefully selected products that meet our high standards.</p>
            </div>

            <div className="text-center p-6 border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center p-3 bg-primary-100 rounded-full mb-4">
                <Shield className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Secure Checkout</h3>
              <p className="text-gray-600 text-sm">Your payment information is always protected.</p>
            </div>

            <div className="text-center p-6 border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center p-3 bg-primary-100 rounded-full mb-4">
                <Truck className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-gray-600 text-sm">Get your products quickly with our expedited shipping.</p>
            </div>

            <div className="text-center p-6 border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center p-3 bg-primary-100 rounded-full mb-4">
                <CreditCard className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Easy Returns</h3>
              <p className="text-gray-600 text-sm">Not satisfied? Our hassle-free return policy has you covered.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
