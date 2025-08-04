import React, { useEffect, useState } from 'react';
import MonitoringTable from '../components/MonitoringTable';
import MonitoringInput from '../components/MonitoringInput';
import { fetchMonitoringData } from '../api/monitoringApi';
import Navbar from "../components/Navbar";

const MonitoringPage = ({ token, onBack, onLogout, user  }) => {
  const [monitoringData, setMonitoringData] = useState([]);
  const [bulan, setBulan] = useState('');
  const [mingguDipilih, setMingguDipilih] = useState('');
  const [completedWeeks, setCompletedWeeks] = useState([]);

  const fetchData = async () => {
    try {
      const data = await fetchMonitoringData(token);
      setMonitoringData(data);

      if (data.length > 0) {
        const tanggal = new Date(data[0].waktu);
        const namaBulan = tanggal.toLocaleDateString('id-ID', { month: 'long' });
        setBulan(namaBulan.charAt(0).toUpperCase() + namaBulan.slice(1));

        // Extract completed weeks from monitoring data
        const weeks = [...new Set(data.map(item => item.minggu))];
        setCompletedWeeks(weeks.sort((a, b) => a - b));
      } else {
        setCompletedWeeks([]);
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

  const getWeekStatus = (weekNumber) => {
    return completedWeeks.includes(weekNumber);
  };

  const getWeekCompletionStats = () => {
    const total = 4; // Total weeks in a month
    const completed = completedWeeks.length;
    return { completed, total, percentage: (completed / total) * 100 };
  };

  const stats = getWeekCompletionStats();

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
              {/* Progress Summary */}
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">{stats.completed} selesai</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                  <span className="text-sm text-gray-600">{stats.total - stats.completed} belum</span>
                </div>
                <div className="text-sm font-medium text-blue-600">
                  {Math.round(stats.percentage)}% lengkap
                </div>
              </div>
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
              <div className="flex justify-between items-center gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Input Data Minggu {mingguDipilih}
                    </h3>
                    {getWeekStatus(mingguDipilih) && (
                      <p className="text-sm text-amber-600 font-medium">
                        ⚠️ Minggu ini sudah diisi sebelumnya
                      </p>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => setMingguDipilih('')} 
                  className="group relative overflow-hidden bg-gradient-to-r from-gray-400 to-gray-500 hover:from-red-400 hover:to-red-500 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                  title="Batalkan input"
                >
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="hidden sm:inline">Batal</span>
                  </div>
                </button>
              </div>
              <MonitoringInput 
                minggu={mingguDipilih} 
                token={token} 
                onComplete={handleInputComplete} 
                onCancel={() => setMingguDipilih('')}
                completedWeeks={completedWeeks}
              />
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Pilih Minggu untuk Input Data
                    </h3>
                    <p className="text-sm text-gray-600">
                      {bulan && `Bulan: ${bulan} • `}
                      {stats.completed} dari {stats.total} minggu telah terisi
                    </p>
                  </div>
                </div>

                {/* Progress Ring */}
                <div className="relative w-16 h-16">
                  <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      className="stroke-gray-200"
                      strokeWidth="3"
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      className="stroke-blue-500"
                      strokeWidth="3"
                      strokeDasharray={`${stats.percentage} 100`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold text-gray-700">
                      {Math.round(stats.percentage)}%
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((m) => {
                  const isCompleted = getWeekStatus(m);
                  return (
                    <button
                      key={m}
                      onClick={() => setMingguDipilih(m)}
                      className={`group relative overflow-hidden border-2 rounded-xl p-4 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg ${
                        isCompleted
                          ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 hover:border-green-300 hover:from-green-100 hover:to-emerald-100'
                          : 'bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-200 hover:border-indigo-300 hover:from-indigo-100 hover:to-blue-100'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className={`relative w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform duration-200 ${
                          isCompleted
                            ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                            : 'bg-gradient-to-r from-indigo-400 to-blue-500'
                        }`}>
                          {isCompleted ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            m
                          )}
                          
                          {isCompleted && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                              <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          )}
                        </div>
                        
                        <div className="text-center">
                          <span className={`text-sm font-medium ${
                            isCompleted 
                              ? 'text-green-700 group-hover:text-green-900' 
                              : 'text-gray-700 group-hover:text-gray-900'
                          }`}>
                            Minggu {m}
                          </span>
                          
                          <div className={`text-xs mt-1 font-medium ${
                            isCompleted 
                              ? 'text-green-600' 
                              : 'text-gray-500'
                          }`}>
                            {isCompleted ? (
                              <span className="flex items-center justify-center gap-1">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Selesai
                              </span>
                            ) : (
                              <span className="flex items-center justify-center gap-1">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Kosong
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Hover effect overlay */}
                      <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-200 ${
                        isCompleted ? 'bg-green-500' : 'bg-blue-500'
                      }`}></div>
                    </button>
                  );
                })}
              </div>

              {/* Week Status Summary */}
              <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">
                        <strong>{stats.completed}</strong> minggu selesai
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                      <span className="text-sm text-gray-700">
                        <strong>{stats.total - stats.completed}</strong> minggu belum diisi
                      </span>
                    </div>
                  </div>
                  
                  {stats.completed === stats.total && (
                    <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Bulan Lengkap
                    </div>
                  )}
                </div>

                {/* Progress bar */}
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Progress bulan ini</span>
                    <span>{Math.round(stats.percentage)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${stats.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Data Table Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012-2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Data Monitoring {bulan && `- ${bulan}`}
              </h3>
           
            </div>
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