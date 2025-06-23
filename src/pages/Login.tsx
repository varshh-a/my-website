// src/pages/Login.tsx or similar
import React from 'react';
import bgImage from '../assets/login-bg.jpg'; // adjust path if needed

const Login = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Login form */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-semibold text-center mb-6">Login</h2>
          <form>
            <input
              type="email"
              placeholder="Email"
              className="w-full mb-4 p-3 border rounded-lg focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full mb-6 p-3 border rounded-lg focus:outline-none"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
