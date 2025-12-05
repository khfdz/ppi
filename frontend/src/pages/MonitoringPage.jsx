// src/pages/MonitoringPage.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance"; // sesuaikan path
import MonitoringToolbar from "../components/monitoring/MonitoringToolbar";
import MonitoringForm from "../components/monitoring/MonitoringForm";
import MonitoringTable from "../components/monitoring/MonitoringTable";

export default function MonitoringPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("/monitoring");
      const list = res?.data?.data ?? res?.data ?? [];
      setData(list);
    } catch (err) {
      console.error(err);
      setError("Gagal mengambil data monitoring");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCreate = async (payload) => {
    // payload = { kode, judul, keterangan }
    try {
      await axios.post("/monitoring", payload);
      await fetchData();
      setShowForm(false);
    } catch (err) {
      // lempar error supaya MonitoringForm bisa tangani
      throw err;
    }
  };

  const handleRowClick = (item) => {
    // contoh: navigasi ke detail atau ke indikator per monitoring
    navigate(`/monitoring/${item.kode}`); // sesuaikan route detail jika ada
  };

  return (
    <div className="p-6">
      <MonitoringToolbar
        onBack={() => navigate("/dashboard")}
        onToggleForm={() => { setShowForm((s) => !s); setError(null); }}
        showForm={showForm}
        onRefresh={fetchData}
      />

      {showForm && (
        <MonitoringForm
          onCreate={handleCreate}
          onCancel={() => setShowForm(false)}
        />
      )}

      {error && <div className="text-sm text-red-600 mb-2">{error}</div>}

      {loading ? (
        <div>Loading...</div>
      ) : (
        <MonitoringTable data={data} onRowClick={handleRowClick} />
      )}
    </div>
  );
}
