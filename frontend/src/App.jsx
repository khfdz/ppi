// import React, { useEffect, useState } from 'react';
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
//   useNavigate,
// } from 'react-router-dom';

// import LoginPage from './pages/LoginPage';
// import HomePage from './pages/HomePage';
// import MonitoringPage from './pages/MonitoringPage';

// const getUserFromStorage = () => {
//   try {
//     const userString = localStorage.getItem('user');
//     if (userString && userString !== 'undefined') {
//       return JSON.parse(userString);
//     }
//   } catch (error) {
//     console.error("❌ Gagal parse user dari localStorage:", error);
//     localStorage.removeItem('user');
//   }
//   return null;
// };

// const AppRoutes = () => {
//   const [token, setToken] = useState(localStorage.getItem('token'));
//   const [user, setUser] = useState(getUserFromStorage());
//   const navigate = useNavigate();

//   const handleLoginSuccess = (receivedToken, userData) => {
//     localStorage.setItem('token', receivedToken);
//     localStorage.setItem('user', JSON.stringify(userData));
//     setToken(receivedToken);
//     setUser(userData);
//     navigate('/');
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     setToken(null);
//     setUser(null);
//     navigate('/login');
//   };

//   return (
//     <Routes>
//       <Route
//         path="/login"
//         element={
//           token ? <Navigate to="/" /> : <LoginPage onLoginSuccess={handleLoginSuccess} />
//         }
//       />
//       <Route
//         path="/"
//         element={
//           token ? (
//             <HomePage onNavigate={() => navigate('/monitoring')} onLogout={handleLogout} user={user} />
//           ) : (
//             <Navigate to="/login" />
//           )
//         }
//       />
//       <Route
//         path="/monitoring"
//         element={
//           token ? (
//             <MonitoringPage token={token} onBack={() => navigate('/')} onLogout={handleLogout} user={user}/>
//           ) : (
//             <Navigate to="/login" />
//           )
//         }
//       />
      
//     </Routes>
//   );
// };

// const App = () => {
//   return (
//     <Router>
//       <AppRoutes />
//     </Router>
//   );
// };

// export default App;

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
import AmbulancePage from './pages/AmbulancePage';

// Ambil user dari localStorage
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

// Komponen berisi semua route (agar useNavigate bisa dipakai)
const AppRoutes = ({ token, setToken, user, setUser }) => {
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

  // Mapping modul → path
  const moduleToPathMap = {
    MBTJ: '/monitoring',
    MPKDA: '/ambulance',
    // Tambahkan modul baru di sini:
    // XYZ: '/xyz-page',
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
            <HomePage
              user={user}
              onLogout={handleLogout}
              onNavigate={({ modul }) => {
                const path = moduleToPathMap[modul];
                if (path) {
                  navigate(path);
                } else {
                  console.warn(`❗ Modul tidak dikenali: ${modul}`);
                }
              }}
            />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/monitoring"
        element={
          token ? (
            <MonitoringPage
              token={token}
              user={user}
              onLogout={handleLogout}
              onBack={() => navigate('/')}
            />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/ambulance"
        element={
          token ? (
            <AmbulancePage
              token={token}
              user={user}
              onLogout={handleLogout}
              onBack={() => navigate('/')}
            />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
};

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(getUserFromStorage());

  return (
    <Router>
      <AppRoutes token={token} setToken={setToken} user={user} setUser={setUser} />
    </Router>
  );
};

export default App;
