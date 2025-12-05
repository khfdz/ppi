// src/components/monitoring/MonitoringForm.jsx
import React, { useState } from "react";

/**
 * Props:
 * - onCreate({ kode, judul, keterangan }) => Promise
 * - onCancel() optional
 */
export default function MonitoringForm({ onCreate, onCancel }) {
  const [kode, setKode] = useState("");
  const [judul, setJudul] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const reset = () => {
    setKode("");
    setJudul("");
    setKeterangan("");
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!kode.trim() || !judul.trim()) {
      setError("Kode dan Judul wajib diisi.");
      return;
    }

    try {
      setLoading(true);
      await onCreate({ kode: kode.trim(), judul: judul.trim(), keterangan: keterangan.trim() });
      reset();
    } catch (err) {
      const msg = err?.message || (err?.response?.data?.message) || "Gagal menambah monitoring";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 max-w-lg">
      <div className="flex flex-col gap-2 mb-2">
        <input
          type="text"
          placeholder="Kode (contoh: R05)"
          value={kode}
          onChange={(e) => setKode(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Judul"
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <textarea
          placeholder="Keterangan (opsional)"
          value={keterangan}
          onChange={(e) => setKeterangan(e.target.value)}
          className="border px-3 py-2 rounded"
        />
      </div>

      {error && <div className="text-sm text-red-600 mb-2">{error}</div>}

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
