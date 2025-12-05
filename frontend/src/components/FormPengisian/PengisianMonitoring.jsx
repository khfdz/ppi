import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

export default function FormPengisianIndikator({ indikatorList, userId }) {
  const [jawaban, setJawaban] = useState({});
  const [tanggal, setTanggal] = useState(
    new Date().toISOString().slice(0, 10) // ← AUTO TANGGAL HARI INI
  );

  const handleChange = (indikatorId, value) => {
    setJawaban((prev) => ({
      ...prev,
      [indikatorId]: value,
    }));
  };

  const handleSubmit = async () => {
    const entries = Object.entries(jawaban);

    if (entries.length === 0) {
      return alert("Belum ada jawaban yang diisi");
    }

    for (const [indikator_id, nilai] of entries) {
      await axiosInstance.post("/monitoring-pengisian/tambah", {
        indikator_id: parseInt(indikator_id),
        user_id: userId,
        jawaban: nilai,
        tanggal_input: tanggal, // ← PAKAI TANGGAL YANG SUDAH DISET
      });
    }

    alert("Berhasil menyimpan semua jawaban!");
  };

  return (
    <div className="mt-10 border p-4 rounded">
      <h2 className="text-xl font-bold mb-4">Isi Jawaban Indikator</h2>

      {/* Input tanggal DIPINDAH KE LUAR TABEL */}
      <div className="my-4">
        <label className="font-semibold mr-2">Tanggal Input:</label>
        <input
          type="date"
          value={tanggal}
          onChange={(e) => setTanggal(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      <table className="w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 w-12">No</th>
            <th className="border p-2">Indikator</th>
            <th className="border p-2 w-40">Jawaban</th>
          </tr>
        </thead>

        <tbody>
          {indikatorList.map((item, index) => (
            <tr key={index}>
              <td className="border p-2 text-center">{index + 1}</td>
              <td className="border p-2">{item.indikator_isi}</td>

              <td className="border p-2 text-center">
                <label className="mr-4">
                  <input
                    type="radio"
                    name={`indikator-${index}`}
                    onChange={() => handleChange(item.id, 1)}
                  />{" "}
                  Ya
                </label>

                <label>
                  <input
                    type="radio"
                    name={`indikator-${index}`}
                    onChange={() => handleChange(item.id, 0)}
                  />{" "}
                  Tidak
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Simpan Jawaban
      </button>
    </div>
  );
}
