import React from "react";

export default function TabelPengisianMonitoring({ pengisianList }) {
  const grouped = pengisianList.reduce((acc, row) => {
    if (!acc[row.minggu_ke]) acc[row.minggu_ke] = [];
    acc[row.minggu_ke].push(row);
    return acc;
  }, {});

  return (
    <table className="w-full border border-gray-300 text-sm">
      <thead className="bg-gray-100">
        <tr>
          <th className="border p-2 w-12">Minggu</th>
          <th className="border p-2">Indikator</th>
          <th className="border p-2">Jawaban</th>
          <th className="border p-2">Tanggal Input</th>
        </tr>
      </thead>

      <tbody>
        {Object.keys(grouped).length === 0 ? (
          <tr>
            <td colSpan="4" className="border p-2 text-center">
              Tidak ada data
            </td>
          </tr>
        ) : (
          Object.entries(grouped).map(([minggu, rows]) =>
            rows.map((row, index) => (
              <tr key={`${row.id}-${row.indikator_id}-${index}`}>
                {index === 0 && (
                  <td className="border p-2 text-center font-bold" rowSpan={rows.length}>
                    {minggu}
                  </td>
                )}

                <td className="border p-2">{row.indikator_isi}</td>
                <td className="border p-2 text-center">
                  {row.jawaban === 1 ? "Ya" : "Tidak"}
                </td>
                <td className="border p-2">
                  {new Date(row.tanggal_input).toLocaleDateString("id-ID")}
                </td>
              </tr>
            ))
          )
        )}
      </tbody>
    </table>
  );
}
