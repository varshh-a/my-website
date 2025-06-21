import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';

// Layout components
import Navbar from './components/Navbar';

// Public pages
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import NotFound from './pages/NotFound';

// Protected pages
import AdminDashboard from './pages/admin/Dashboard';
import ProductsManagement from './pages/admin/ProductsManagement';
import ProductForm from './pages/admin/ProductForm';
import CustomerDashboard from './pages/customer/Dashboard';

// Protected route component
const ProtectedRoute: React.FC<{ 
  children: React.ReactNode; 
  allowedRole?: 'admin' | 'customer';
}> = ({ children, allowedRole }) => {
  const { isAuthenticated, user } = useAuth();
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // If role is specified and user doesn't have the required role, redirect to home
  if (allowedRole && user?.role !== allowedRole) {
    return <Navigate to="/" />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Admin Routes */}
                <Route 
                  path="/admin/dashboard" 
                  element={
                    <ProtectedRoute allowedRole="admin">
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/products" 
                  element={
                    <ProtectedRoute allowedRole="admin">
                      <ProductsManagement />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/products/add" 
                  element={
                    <ProtectedRoute allowedRole="admin">
                      <ProductForm />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/products/edit/:id" 
                  element={
                    <ProtectedRoute allowedRole="admin">
                      <ProductForm />
                    </ProtectedRoute>
                  } 
                />

                {/* Customer Routes */}
                <Route 
                  path="/customer/dashboard" 
                  element={
                    <ProtectedRoute allowedRole="customer">
                      <CustomerDashboard />
                    </ProtectedRoute>
                  } 
                />

                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <footer className="bg-gray-800 text-white py-8">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p>&copy; {new Date().getFullYear()} ShopEase E-Commerce. All rights reserved.</p>
              </div>
            </footer>
          </div>
        </Router>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;