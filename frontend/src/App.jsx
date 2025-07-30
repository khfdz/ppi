import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import MonitoringPage from './pages/MonitoringPage';

const getUserFromStorage = () => {
  try {
    const userString = localStorage.getItem('user');
    if (userString && userString !== 'undefined') {
      return JSON.parse(userString);
    }
  } catch (error) {
    console.error("❌ Gagal parse user dari localStorage:", error);
    localStorage.removeItem('user');
  }
  return null;
};

const AppRoutes = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(getUserFromStorage());
  const navigate = useNavigate();

  const handleLoginSuccess = (receivedToken, userData) => {
    localStorage.setItem('token', receivedToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(receivedToken);
    setUser(userData);
    navigate('/');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={
          token ? <Navigate to="/" /> : <LoginPage onLoginSuccess={handleLoginSuccess} />
        }
      />
      <Route
        path="/"
        element={
          token ? (
            <HomePage onNavigate={() => navigate('/monitoring')} onLogout={handleLogout} user={user} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/monitoring"
        element={
          token ? (
            <MonitoringPage token={token} onBack={() => navigate('/')} onLogout={handleLogout} user={user}/>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
};

const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
