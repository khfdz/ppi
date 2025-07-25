// src/pages/HomePage.jsx
import React from 'react';

const HomePage = ({ onNavigate, onLogout }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Selamat Datang di Aplikasi</h1>

      <div className="space-x-4">
        <button 
          onClick={onNavigate} 
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Monitoring Benda Tajam
        </button>

        <button 
          onClick={onLogout} 
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default HomePage;
