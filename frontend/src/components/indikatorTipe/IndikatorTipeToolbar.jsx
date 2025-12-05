// src/components/indikatorTipe/IndikatorTipeToolbar.jsx
import React from "react";

export default function IndikatorTipeToolbar({ onBack, onToggleForm, showForm, onRefresh }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-xl font-semibold">🏷️ Indikator Tipe Master</h1>

      <div className="flex gap-2">
        <button
          onClick={onBack}
          className="px-3 py-1 border rounded hover:bg-gray-100"
        >
          ← Kembali
        </button>

        <button
          onClick={onToggleForm}
          className="px-3 py-1 border rounded bg-blue-500 text-white"
        >
          {showForm ? "✖ Tutup" : "➕ Tambah"}
        </button>

        <button
          onClick={onRefresh}
          className="px-3 py-1 border rounded hover:bg-gray-100"
        >
          🔄 Refresh
        </button>
      </div>
    </div>
  );
}
