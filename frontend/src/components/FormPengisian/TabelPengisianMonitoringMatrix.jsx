import React, { useState, useMemo } from "react";

const namaBulan = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

// Ambil bulan & tahun dari tanggal_input (real data)
const getBulanTahunDariTanggal = (tanggalInput) => {
  const date = new Date(tanggalInput);
  return {
    bulan: date.getMonth() + 1,
    tahun: date.getFullYear(),
  };
};

export default function TabelPengisianMonitoringMatrix({
  indikatorList,
  pengisianList = [],
}) {
  // State modal
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIndikatorId, setSelectedIndikatorId] = useState(null);
  const [selectedMingguKe, setSelectedMingguKe] = useState(null);
  const [selectedJawaban, setSelectedJawaban] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null); // untuk tanggal_input

  const openModal = (indikatorId, mingguKe, item) => {
    setSelectedIndikatorId(indikatorId);
    setSelectedMingguKe(mingguKe);
    setSelectedJawaban(item ? item.jawaban : null);
    setSelectedItem(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedIndikatorId(null);
    setSelectedMingguKe(null);
    setSelectedJawaban(null);
    setSelectedItem(null);
  };

  const handleSave = () => {
    console.log("Simpan update:", {
      id: selectedItem?.id,
      indikator_id: selectedIndikatorId,
      minggu_ke: selectedMingguKe,
      jawaban: selectedJawaban,
    });
    closeModal();
  };

  // Ambil data terbaru per indikator + minggu
  const latestPengisian = useMemo(() => {
    const map = new Map();
    pengisianList.forEach((item) => {
      const key = `${item.indikator_id}-${item.minggu_ke}`;
      const existing = map.get(key);
      if (!existing || new Date(item.dibuat_pada) > new Date(existing.dibuat_pada)) {
        map.set(key, item);
      }
    });
    return map;
  }, [pengisianList]);

  // Build matrix
  const matrix = indikatorList.map((indikator) => {
    const mingguData = { 1: null, 2: null, 3: null, 4: null };
    [1, 2, 3, 4].forEach((m) => {
      const key = `${indikator.id}-${m}`;
      const data = latestPengisian.get(key);
      if (data) mingguData[m] = data;
    });
    return { ...indikator, minggu: mingguData };
  });

  return (
    <div style={{ position: "relative" }}>
      <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem", color: "#333" }}>
        Rekap Pengisian Monitoring (Berdasarkan Tanggal Input)
      </h2>

      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
        <thead>
          {/* Baris 1: Bulan & Tahun REAL dari data tanggal_input */}
          <tr style={{ backgroundColor: "#e3f2fd" }}>
            <th style={{ border: "1px solid #999", padding: "12px", width: "420px", textAlign: "left" }}>
              Indikator
            </th>
            {[1, 2, 3, 4].map((m) => {
              // Cari ada tidaknya data di minggu ini (dari semua indikator)
              let bulanDisplay = "-";
              let tahunDisplay = "";

              for (const item of latestPengisian.values()) {
                if (item.minggu_ke === m) {
                  const { bulan, tahun } = getBulanTahunDariTanggal(item.tanggal_input);
                  bulanDisplay = namaBulan[bulan - 1];
                  tahunDisplay = tahun;
                  break;
                }
              }

              return (
                <th key={m} style={{ border: "1px solid #999", padding: "12px", textAlign: "center" }}>
                  {bulanDisplay} {tahunDisplay}
                </th>
              );
            })}
          </tr>

          {/* Baris 2: Minggu 1 - 4 */}
          <tr style={{ backgroundColor: "#bbdefb" }}>
            <th style={{ border: "1px solid #999", padding: "12px", textAlign: "left" }}>Indikator</th>
            {[1, 2, 3, 4].map((m) => (
              <th key={m} style={{ border: "1px solid #999", padding: "12px", textAlign: "center" }}>
                Minggu {m}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {matrix.map((row) => (
            <tr key={row.id}>
              <td style={{ border: "1px solid #999", padding: "12px", verticalAlign: "top" }}>
                {row.indikator_isi}
              </td>
              {[1, 2, 3, 4].map((m) => {
                const item = row.minggu[m];
                const jawaban = item ? item.jawaban : null;

                return (
                  <td
                    key={m}
                    style={{
                      border: "1px solid #999",
                      padding: "12px",
                      textAlign: "center",
                      cursor: "pointer",
                      backgroundColor: jawaban === 1 ? "#c8e6c9" : jawaban === 0 ? "#ffcdd2" : "#fff",
                      fontWeight: jawaban !== null ? "bold" : "normal",
                    }}
                    onClick={() => openModal(row.id, m, item)}
                  >
                    {item ? (jawaban === 1 ? "Ya" : "Tidak") : "—"}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL */}
      {modalOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999 }} onClick={closeModal}>
          <div style={{ background: "#fff", padding: "30px", borderRadius: "10px", width: "400px" }} onClick={e => e.stopPropagation()}>
            <h3>Edit Jawaban - Minggu {selectedMingguKe}</h3>
            {selectedItem && (
              <p style={{ color: "#555", fontSize: "14px" }}>
                Diinput pada: <strong>{new Date(selectedItem.tanggal_input).toLocaleDateString("id-ID")}</strong>
              </p>
            )}
            <div style={{ margin: "20px 0" }}>
              <label style={{ marginRight: "20px" }}>
                <input type="radio" checked={selectedJawaban === 1} onChange={() => setSelectedJawaban(1)} /> Ya
              </label>
              <label>
                <input type="radio" checked={selectedJawaban === 0} onChange={() => setSelectedJawaban(0)} /> Tidak
              </label>
            </div>
            <div style={{ textAlign: "right" }}>
              <button onClick={closeModal} style={{ marginRight: "10px" }}>Batal</button>
              <button onClick={handleSave} style={{ background: "#1976d2", color: "white", border: "none", padding: "10px 20px", borderRadius: "4px" }}>
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}