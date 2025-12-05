import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import FormPengisianIndikator from "../../components/FormPengisian/PengisianMonitoring";
import TabelPengisianMonitoring from "../../components/FormPengisian/TabelPengisianMonitoring";
import TabelPengisianMonitoringMatrix from "../../components/FormPengisian/TabelPengisianMonitoringMatrix";

export default function MonitoringDetail() {
  const { kode } = useParams();

  const [indikatorList, setIndikatorList] = useState([]);
  const [pengisianList, setPengisianList] = useState([]);
  const [loadingPengisian, setLoadingPengisian] = useState(true);
  const [editMinggu, setEditMinggu] = useState(null);

  const handleEditWeek = (mingguKe) => {
  setEditMinggu(mingguKe);
};



  const [bulan, setBulan] = useState("");
  const [tahun, setTahun] = useState("");

  // GET indikator
  useEffect(() => {
    axiosInstance.get(`/monitoring/${kode}/detail`).then((res) => {
      const data = res.data.data;

      const flat = data.flatMap((tipe) =>
        tipe.indikator.map((obj) => ({
          id: obj.indikator_id,
          indikator_isi: obj.indikator_isi,
        }))
      );

      setIndikatorList(flat);
    });
  }, [kode]);

  // GET pengisian
  useEffect(() => {
    axiosInstance
      .get(`/monitoring-pengisian`, {
        params: { bulan: bulan || undefined, tahun: tahun || undefined },
      })
      .then((res) => {
        setPengisianList(res.data.data || []);
        setLoadingPengisian(false);
      });
  }, [bulan, tahun]);

  return (
    <div className="p-6">

      {/* Filter */}
      <h2 className="text-xl font-semibold mb-2">Filter Per Bulan</h2>
      <div className="mb-4">
        <select
          value={bulan}
          onChange={(e) => setBulan(e.target.value)}
          className="border p-2 mr-2"
        >
          <option value="">Pilih Bulan</option>
          {[...Array(12)].map((_, i) => (
            <option value={i + 1} key={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Tahun"
          value={tahun}
          onChange={(e) => setTahun(e.target.value)}
          className="border p-2 w-24"
        />
      </div>

      {/* Tabel pengisian */}
      <h2 className="text-xl font-semibold mb-2">Hasil Pengisian</h2>

      {loadingPengisian ? (
        <p>Loading...</p>
      ) : (
        <TabelPengisianMonitoring pengisianList={pengisianList} />
      )}

      {/* Form Input */}
      <FormPengisianIndikator indikatorList={indikatorList} userId={1} />

      <h2 className="text-xl font-semibold mb-2">Rekap Per Minggu (Matrix)</h2>

<TabelPengisianMonitoringMatrix
  indikatorList={indikatorList}
  pengisianList={pengisianList}
  bulan={bulan}
  tahun={tahun}
  onEditWeek={handleEditWeek}
/>


    </div>
  );
}
