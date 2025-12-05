// src/components/indikatorTipe/IndikatorTipeForm.jsx
import React, { useState } from "react";

export default function IndikatorTipeForm({ onCreate, onCancel }) {
  const [monitoringKode, setMonitoringKode] = useState("");
  const [namaTipe, setNamaTipe] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const reset = () => {
    setMonitoringKode("");
    setNamaTipe("");
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!monitoringKode.trim() || !namaTipe.trim()) {
      setError("Semua field wajib diisi.");
      return;
    }

    try {
      setLoading(true);
      await onCreate({
        monitoring_kode: monitoringKode.trim(),
        nama_tipe: namaTipe.trim()
      });
      reset();
    } catch (err) {
      setError(err?.response?.data?.message || "Gagal menambah data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 max-w-lg">
      <div className="flex flex-col gap-2 mb-2">
        <input
          type="text"
          placeholder="Monitoring Kode"
          value={monitoringKode}
          onChange={(e) => setMonitoringKode(e.target.value)}
          className="border px-3 py-2 rounded"
        />

        <input
          type="text"
          placeholder="Nama Tipe"
          value={namaTipe}
          onChange={(e) => setNamaTipe(e.target.value)}
          className="border px-3 py-2 rounded"
        />
      </div>

      {error && <div className="text-red-600 text-sm mb-2">{error}</div>}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 border rounded bg-blue-500 text-white"
        >
          {loading ? "Menyimpan..." : "Simpan"}
        </button>

        <button
          type="button"
          onClick={() => { reset(); if (onCancel) onCancel(); }}
          className="px-4 py-2 border rounded hover:bg-gray-100"
        >
          Batal
        </button>
      </div>
    </form>
  );
}
