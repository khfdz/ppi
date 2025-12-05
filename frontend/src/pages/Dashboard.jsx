import React from "react";
import { getUser, logout } from "../utils/auth";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const user = getUser();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-3">📊 Dashboard</h1>
      <p>Selamat datang, <b>{user.nama_unit}</b> ({user.role})</p>

      <div className="flex gap-4 mt-4">
        <Link to="/home" className="bg-gray-200 px-4 py-2 rounded">Halaman Utama</Link>
        {user.role === "admin" && (
          <Link to="/admin" className="bg-blue-600 text-white px-4 py-2 rounded">
            Admin Panel
          </Link>
        )}
        <button onClick={logout} className="bg-red-500 text-white px-3 py-2 rounded">
          Logout
        </button>
      </div>
    </div>
  );
}
