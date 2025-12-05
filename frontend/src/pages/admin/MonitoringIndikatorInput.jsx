import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

export default function MonitoringIndikatorInput() {
  const [monitoringKode, setMonitoringKode] = useState("");
  const [indikatorTipe, setIndikatorTipe] = useState("");
  const [indikatorIsi, setIndikatorIsi] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.post("/monitoring-indikator", {
        monitoring_kode: monitoringKode,
        indikator_tipe_id: indikatorTipe,
        indikator_isi: indikatorIsi,
      });

      alert("Berhasil ditambahkan!");
      setMonitoringKode("");
      setIndikatorTipe("");
      setIndikatorIsi("");

    } catch (err) {
      console.error(err);
      alert("Gagal menambahkan indikator!");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-xl font-semibold mb-4">📝 Input Monitoring Indikator</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">

        <input
          className="border p-2 rounded"
          placeholder="Monitoring Kode (contoh: MPKDA)"
          value={monitoringKode}
          onChange={(e) => setMonitoringKode(e.target.value)}
          required
        />

        <input
          className="border p-2 rounded"
          placeholder="Indikator Tipe (contoh: Kebersihan Umum)"
          value={indikatorTipe}
          onChange={(e) => setIndikatorTipe(e.target.value)}
          required
        />

        <textarea
          className="border p-2 rounded"
          placeholder="Isi Indikator..."
          rows="3"
          value={indikatorIsi}
          onChange={(e) => setIndikatorIsi(e.target.value)}
          required
        ></textarea>

        <button className="bg-blue-600 text-white py-2 rounded">
          Simpan
        </button>

      </form>
    </div>
  );
}
