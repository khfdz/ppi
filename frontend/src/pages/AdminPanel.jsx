import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

export default function AdminPanel() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">⚙️ Admin Panel</h1>
      <p className="mb-4">Kelola data dan monitoring di sini.</p>

      <div className="flex flex-col gap-3">

        <button 
          onClick={() => navigate("/monitoring")}
          className="px-4 py-2 border rounded hover:bg-gray-100"
        >
          📊 INPUT JUDUL KEGIATAN
        </button>

        <button 
          onClick={() => navigate("/indikator-tipe")}
          className="px-4 py-2 border rounded hover:bg-gray-100"
        >
          🏷️ Indikator Tipe Master
        </button>

        <button 
  onClick={() => navigate("/admin/monitoring-indikator")}
  className="px-4 py-2 border rounded hover:bg-gray-100"
>
  📝 Input Monitoring Indikator
</button>


        <button 
          onClick={() => navigate("/users")}
          className="px-4 py-2 border rounded hover:bg-gray-100"
        >
          👥 Manajemen User
        </button>

        <button 
          onClick={() => navigate("/settings")}
          className="px-4 py-2 border rounded hover:bg-gray-100"
        >
          ⚙️ Pengaturan Sistem
        </button>

      </div>

      <button 
        onClick={logout} 
        className="bg-red-500 text-white px-3 py-2 rounded mt-6"
      >
        Logout
      </button>
    </div>
  );
}
