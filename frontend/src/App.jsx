import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import MonitoringPage from "./pages/MonitoringPage"; // 👉 tambahkan ini
import ProtectedRoute from "./components/ProtectedRoute";
import IndikatorTipePage from "./pages/IndikatorTipePage";
import MonitoringDetail from "./pages/user/MonitoringDetail";
import MonitoringIndikatorInput from "./pages/admin/MonitoringIndikatorInput";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin", "user", "supervisor"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
  path="/admin/monitoring-indikator"
  element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <MonitoringIndikatorInput />
    </ProtectedRoute>
  }
/>


        {/* Admin Panel */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminPanel />
            </ProtectedRoute>
          }
        />

        {/* Monitoring Main Page */}
        <Route
          path="/monitoring"
          element={
            <ProtectedRoute allowedRoles={["admin", "user", "supervisor"]}>
              <MonitoringPage />
            </ProtectedRoute>
          }
        />

        <Route
  path="/indikator-tipe"
  element={
    <ProtectedRoute allowedRoles={["admin", "supervisor"]}>
      <IndikatorTipePage />
    </ProtectedRoute>
  }
/>

<Route 
  path="/user/monitoring/:kode" 
  element={
    <ProtectedRoute allowedRoles={["admin", "supervisor", "user"]}>
      <MonitoringDetail />
    </ProtectedRoute>
  }
/>





        {/* (Opsional) Tambahkan halaman monitoring lain nanti */}
        {/* 
        <Route path="/monitoring/list" ... />
        <Route path="/monitoring/tipe" ... />
        <Route path="/monitoring/indikator" ... />
        <Route path="/monitoring/report" ... />
        */}

      </Routes>
    </BrowserRouter>
  );
}
