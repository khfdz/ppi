// src/components/indikatorTipe/IndikatorTipeTable.jsx
import React from "react";

export default function IndikatorTipeTable({ data }) {
  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-100">
          <th className="border px-2 py-1 text-left">Monitoring Kode</th>
          <th className="border px-2 py-1 text-left">Nama Tipe</th>
          <th className="border px-2 py-1 text-left">Dibuat</th>
        </tr>
      </thead>

      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={3} className="text-center py-3">Tidak ada data</td>
          </tr>
        ) : (
          data.map((item) => (
            <tr key={item.id}>
              <td className="border px-2 py-1">{item.monitoring_kode}</td>
              <td className="border px-2 py-1">{item.nama_tipe}</td>
              <td className="border px-2 py-1">
                {new Date(item.dibuat_pada).toLocaleString()}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
