import React, { useEffect, useState } from 'react';
import MonitoringTable from '../components/MonitoringTable';

const MonitoringPage = ({ token, onBack }) => {
  const [monitoringData, setMonitoringData] = useState([]);
  const [bulan, setBulan] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:6969/api/monitoring', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setMonitoringData(data.data);

        if (data.data.length > 0) {
          const tanggal = new Date(data.data[0].waktu);
          const namaBulan = tanggal.toLocaleDateString('id-ID', { month: 'long' });
          setBulan(namaBulan.charAt(0).toUpperCase() + namaBulan.slice(1)); // Kapitalisasi
        }

      } catch (error) {
        console.error('Gagal mengambil data monitoring:', error.message);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Monitoring Benda Tajam</h2>
      <button onClick={onBack} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">
        Kembali
      </button>

      {monitoringData.length === 0 ? (
        <p>Loading / Tidak ada data</p>
      ) : (
        <MonitoringTable data={monitoringData} bulan={bulan} />
      )}
    </div>
  );
};

export default MonitoringPage;
