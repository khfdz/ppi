// src/components/MonitoringTable.jsx
import React from 'react';

const MonitoringTable = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>Tidak ada data untuk ditampilkan.</p>;
  }

  // Ambil daftar indikator unik, lalu urutkan berdasarkan indikator_id
  const indikatorMap = {};
  data.forEach(item => {
    indikatorMap[item.indikator_id] = {
      indikator_isi: item.indikator_isi,
      indikator_jenis: item.indikator_jenis,
    };
  });

  const indikatorList = Object.keys(indikatorMap)
    .sort((a, b) => Number(a) - Number(b))
    .map(id => ({
      indikator_id: id,
      ...indikatorMap[id],
    }));

  // Ambil minggu unik
  const mingguSet = new Set(data.map(item => item.minggu));
  const mingguList = [...mingguSet].sort((a, b) => a - b);

  return (
    <table className="table-auto w-full border border-gray-400 text-sm">
      <thead>
        <tr>
          <th rowSpan="2" className="border p-2 bg-gray-200">Indikator</th>
          <th colSpan={mingguList.length} className="border p-2 bg-gray-100">Minggu</th>
        </tr>
        <tr>
          {mingguList.map(minggu => (
            <th key={minggu} className="border p-2 bg-gray-100">Minggu {minggu}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {indikatorList.map(indikator => (
          <tr key={indikator.indikator_id}>
            <td className="border p-2">{indikator.indikator_isi}</td>
            {mingguList.map(minggu => {
              const nilaiItem = data.find(item =>
                item.indikator_id.toString() === indikator.indikator_id.toString() &&
                item.minggu === minggu
              );
              const nilai = nilaiItem ? (nilaiItem.nilai === 1 ? '✔️' : '❌') : '-';
              return <td key={minggu} className="border text-center">{nilai}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MonitoringTable;
