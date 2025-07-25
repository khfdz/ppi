// src/App.jsx
import React, { useState } from 'react';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import MonitoringPage from './pages/MonitoringPage';

const App = () => {
  const [token, setToken] = useState(null);
  const [page, setPage] = useState('login');

  const handleLoginSuccess = (receivedToken) => {
    console.log("Token diterima saat login:", receivedToken);
    setToken(receivedToken);
    setPage('home');
  };

  const handleLogout = () => {
    setToken(null);
    setPage('login');
  };

  if (page === 'login') return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  if (page === 'home') return <HomePage onNavigate={() => setPage('monitoring')} onLogout={handleLogout} />;
  if (page === 'monitoring') return <MonitoringPage token={token} onBack={() => setPage('home')} />;

  return null;
};

export default App;
