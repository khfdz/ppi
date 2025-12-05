// src/components/monitoring/MonitoringTable.jsx
import React from "react";

/**
 * Props:
 * - data: array
 * - onRowClick(item) optional
 */
export default function MonitoringTable({ data = [], onRowClick }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1 text-left">Kode</th>
            <th className="border px-2 py-1 text-left">Judul</th>
            <th className="border px-2 py-1 text-left">Keterangan</th>
            <th className="border px-2 py-1 text-left">Dibuat</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center py-3">Tidak ada data</td>
            </tr>
          ) : (
            data.map((m) => (
              <tr
                key={m.id}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => onRowClick && onRowClick(m)}
              >
                <td className="border px-2 py-1">{m.kode}</td>
                <td className="border px-2 py-1">{m.judul}</td>
                <td className="border px-2 py-1">{m.keterangan}</td>
                <td className="border px-2 py-1">{new Date(m.dibuat_pada).toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
