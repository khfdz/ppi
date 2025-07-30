// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { loginUser } from '../api/authApi';

const LoginPage = ({ onLoginSuccess }) => {
  const [namaUnit, setNamaUnit] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  try {
    const res = await loginUser(namaUnit, password);
    console.log('🔥 Respon login:', res);

    const token = res.token;
    console.log('Token:', token);

    const user = res.user;
    console.log('User:', user);

    if (token) {
      onLoginSuccess(token, user);
    } else {
      throw new Error('Token tidak ditemukan dalam response.');
    }
  } catch (err) {
    console.error(err);
    setError(err.message || 'Login gagal');
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-200 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-indigo-600 mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nama_unit" className="block text-sm font-medium text-gray-700">
              Nama Unit
            </label>
            <input
              id="nama_unit"
              type="text"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Nama Unit"
              value={namaUnit}
              onChange={(e) => setNamaUnit(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
