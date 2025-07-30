import React, { useEffect, useState } from 'react';
import MonitoringTable from '../components/MonitoringTable';
import MonitoringInput from '../components/MonitoringInput';
import { fetchMonitoringData } from '../api/monitoringApi';
import Navbar from "../components/Navbar";

const MonitoringPage = ({ token, onBack, onLogout, user  }) => {
  const [monitoringData, setMonitoringData] = useState([]);
  const [bulan, setBulan] = useState('');
  const [mingguDipilih, setMingguDipilih] = useState('');

  const fetchData = async () => {
    try {
      const data = await fetchMonitoringData(token);
      setMonitoringData(data);

      if (data.length > 0) {
        const tanggal = new Date(data[0].waktu);
        const namaBulan = tanggal.toLocaleDateString('id-ID', { month: 'long' });
        setBulan(namaBulan.charAt(0).toUpperCase() + namaBulan.slice(1));
      }
    } catch (error) {
      console.error('Gagal mengambil data monitoring:', error.message);
    }
  };

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  const handleInputComplete = () => {
    fetchData();
    setMingguDipilih('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100">
      <Navbar onLogout={onLogout} namaUnit={user?.nama_unit || 'User'} />
      <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Monitoring Benda Tajam
              </h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">
                Kelola dan pantau data monitoring dengan mudah
              </p>
            </div>
            <button 
              onClick={onBack} 
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 self-start sm:self-auto"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Kembali
            </button>
          </div>
        </div>

        {/* Week Selection or Input Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-8">
          {mingguDipilih ? (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Input Data Minggu {mingguDipilih}
                </h3>
              </div>
              <MonitoringInput minggu={mingguDipilih} token={token} onComplete={handleInputComplete} onCancel={() => setMingguDipilih('')} />
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Pilih Minggu untuk Input Data
                </h3>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[1, 2, 3, 4].map((m) => (
                  <button
                    key={m}
                    onClick={() => setMingguDipilih(m)}
                    className="group relative overflow-hidden bg-gradient-to-r from-indigo-50 to-blue-50 hover:from-indigo-100 hover:to-blue-100 border-2 border-indigo-200 hover:border-indigo-300 rounded-xl p-4 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 bg-gradient-to-r from-indigo-400 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform duration-200">
                        {m}
                      </div>
                      <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                        Minggu {m}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Data Table Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              Data Monitoring
            </h3>
          </div>

          {monitoringData.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h4 className="text-lg font-medium text-gray-600 mb-2">Tidak ada data tersedia</h4>
              <p className="text-gray-500 text-sm">
                Data monitoring akan muncul setelah Anda menginput data pada minggu yang dipilih
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl border border-gray-200">
              <MonitoringTable data={monitoringData} bulan={bulan} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MonitoringPage;