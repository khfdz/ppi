import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";

import IndikatorTipeToolbar from "../components/indikatorTipe/IndikatorTipeToolbar";
import IndikatorTipeForm from "../components/indikatorTipe/IndikatorTipeForm";
import IndikatorTipeTable from "../components/indikatorTipe/IndikatorTipeTable";

export default function IndikatorTipePage() {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const loadData = useCallback(async () => {
    try {
      setError(null);
      const res = await axios.get("/indikator-tipe");
      setData(res.data.data);
    } catch (err) {
      setError("Gagal mengambil data");
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleCreate = async (newData) => {
    await axios.post("/indikator-tipe", newData);
    await loadData();
    setShowForm(false);
  };

  return (
    <div className="p-6">
      <IndikatorTipeToolbar
        showForm={showForm}
        onToggleForm={() => setShowForm((v) => !v)}
        onBack={() => navigate("/admin")}
        onRefresh={loadData}
      />

      {showForm && (
        <IndikatorTipeForm
          onCreate={handleCreate}
          onCancel={() => setShowForm(false)}
        />
      )}

      {error && <div className="text-red-600 text-sm mb-2">{error}</div>}

      <IndikatorTipeTable data={data} />
    </div>
  );
}
