import React, { useEffect, useState } from "react";
import axios from "../utils/axiosInstance"; // sesuaikan folder kamu
import { useNavigate } from "react-router-dom";

export default function MonitoringList() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await axios.get("/monitoring");
      setData(res.data.data);
    } catch (err) {
      console.error(err);
      alert("Gagal mengambil data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">📁 Daftar Monitoring</h1>

      <button
        onClick={() => navigate("/monitoring/create")}
        className="px-4 py-2 border rounded mb-4 hover:bg-gray-100"
      >
        ➕ Tambah Monitoring
      </button>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">Kode</th>
            <th className="border px-2 py-1">Judul</th>
            <th className="border px-2 py-1">Keterangan</th>
            <th className="border px-2 py-1">Dibuat</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center py-3">
                Tidak ada data
              </td>
            </tr>
          ) : (
            data.map((m) => (
              <tr key={m.id}>
                <td className="border px-2 py-1">{m.kode}</td>
                <td className="border px-2 py-1">{m.judul}</td>
                <td className="border px-2 py-1">{m.keterangan}</td>
                <td className="border px-2 py-1">
                  {new Date(m.dibuat_pada).toLocaleString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
