import React, { useState } from "react";
import axios from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function MonitoringCreate() {
  const [kode, setKode] = useState("");
  const [judul, setJudul] = useState("");
  const [keterangan, setKeterangan] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/monitoring", { kode, judul, keterangan });
      alert("Monitoring berhasil ditambahkan");
      navigate("/monitoring/list");
    } catch (err) {
      console.error(err);
      alert("Gagal menambah monitoring");
    }
  };

  return (
    <div className="p-6 max-w-lg">
      <h1 className="text-xl font-semibold mb-4">➕ Tambah Monitoring</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">

        <input
          type="text"
          placeholder="Kode Monitoring"
          className="border px-3 py-2 rounded"
          value={kode}
          onChange={(e) => setKode(e.target.value)}
        />

        <input
          type="text"
          placeholder="Judul Monitoring"
          className="border px-3 py-2 rounded"
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
        />

        <textarea
          placeholder="Keterangan"
          className="border px-3 py-2 rounded"
          value={keterangan}
          onChange={(e) => setKeterangan(e.target.value)}
        />

        <button
          type="submit"
          className="px-4 py-2 border rounded bg-blue-500 text-white"
        >
          Simpan
        </button>

        <button
          type="button"
          onClick={() => navigate("/monitoring/list")}
          className="px-4 py-2 border rounded hover:bg-gray-100"
        >
          Kembali
        </button>
      </form>
    </div>
  );
}
