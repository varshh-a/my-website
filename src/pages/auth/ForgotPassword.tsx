// src/auth/ForgotPassword.tsx

import React, { useState } from 'react';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const mockUsers = [
      { email: 'admin@example.com' },
      { email: 'customer@example.com' },
    ];

    const userExists = mockUsers.some(u => u.email === email);

    if (userExists) {
      setMessage('A password reset link has been sent (simulated).');
      setError('');
    } else {
      setError('No account found with this email.');
      setMessage('');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          className="w-full p-2 border rounded"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-primary-600 text-white py-2 rounded hover:bg-primary-700">
          Reset Password
        </button>
        {message && <p className="text-green-600">{message}</p>}
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;
