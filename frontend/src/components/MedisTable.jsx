import React, { useState } from 'react';

const url = `${import.meta.env.VITE_API_URL}/monitoring/export`;

const getMonthYear = (isoDateStr) => {
  const date = new Date(isoDateStr);
  const month = date.getMonth();
  const year = date.getFullYear();
  return { month, year };
};

const monthNames = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

const getMonthYearLabel = ({ month }) => monthNames[month];

const MedisTable = ({ data }) => {
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-600 mb-2">Tidak ada data</h3>
        <p className="text-gray-500 text-center">Data akan muncul setelah Anda menginput data</p>
      </div>
    );
  }

  // Ambil semua bulan-tahun unik
  const allMonthYears = Array.from(
    new Set(data.map(item => {
      const { month, year } = getMonthYear(item.waktu);
      return `${month}-${year}`;
    }))
  ).map(str => {
    const [month, year] = str.split('-').map(Number);
    return { month, year };
  }).sort((a, b) => a.year - b.year || a.month - b.month);

  // Ambil semua tahun unik
  const allYears = Array.from(
    new Set(data.map(item => getMonthYear(item.waktu).year))
  ).sort((a, b) => a - b);

  // Filter berdasarkan tahun dan bulan
  const filteredData = data.filter(item => {
    const { month, year } = getMonthYear(item.waktu);
    
    if (selectedYear !== 'all' && year !== parseInt(selectedYear)) {
      return false;
    }
    
    if (selectedMonth !== 'all' && `${month}-${year}` !== selectedMonth) {
      return false;
    }
    
    return true;
  });

  // Filter bulan yang tersedia berdasarkan tahun yang dipilih
  const availableMonths = selectedYear === 'all' 
    ? allMonthYears 
    : allMonthYears.filter(({ year }) => year === parseInt(selectedYear));

  // Kelompokkan indikator berdasarkan indikator_tipe
  const indikatorMap = {};
  filteredData.forEach(item => {
    if (!indikatorMap[item.indikator_tipe]) {
      indikatorMap[item.indikator_tipe] = {};
    }
    indikatorMap[item.indikator_tipe][item.indikator_id] = {
      indikator_isi: item.indikator_isi,
      indikator_tipe: item.indikator_tipe,
    };
  });

  // Buat daftar indikator yang dikelompokkan berdasarkan indikator_tipe
  let groupIndex = 0;
  const groupedIndikatorList = Object.keys(indikatorMap).sort().map(tipe => {
    groupIndex += 1;
    let localIndex = 0;
    const indikators = Object.keys(indikatorMap[tipe])
      .sort((a, b) => Number(a) - Number(b))
      .map(id => {
        localIndex += 1;
        return {
          indikator_id: id,
          nomor_urut: localIndex, // Nomor urut lokal per tipe
          indikator_isi: indikatorMap[tipe][id].indikator_isi,
          indikator_tipe: indikatorMap[tipe][id].indikator_tipe,
        };
      });
    return { tipe, indikators, groupIndex }; // Simpan groupIndex untuk nomor kelompok
  });

  const kolom = [];
  availableMonths.forEach(({ month, year }) => {
    if (selectedMonth !== 'all' && `${month}-${year}` !== selectedMonth) return;

    for (let minggu = 1; minggu <= 4; minggu++) {
      kolom.push({
        key: `${month}-${year}-m${minggu}`,
        label: `M${minggu}`,
        month,
        year,
        minggu,
      });
    }
  });

  const groupedByMonth = {};
  kolom.forEach(k => {
    const key = `${k.month}-${k.year}`;
    if (!groupedByMonth[key]) groupedByMonth[key] = [];
    groupedByMonth[key].push(k);
  });

  const handleYearChange = (year) => {
    setSelectedYear(year);
    setSelectedMonth('all');
  };

  const handleExport = async () => {
    try {
      const token = localStorage.getItem('token');
      
      const params = new URLSearchParams();

      if (selectedYear !== 'all') params.append('tahun', selectedYear);
      if (selectedMonth !== 'all') {
        const [bulan] = selectedMonth.split('-');
        params.append('bulan', parseInt(bulan) + 1);
      }

      const fullUrl = `${import.meta.env.VITE_API_URL}/api/medis/export?${params.toString()}`;
      console.log("Mengekspor ke URL:", fullUrl);

      const response = await fetch(fullUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Gagal mengekspor data');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'medis.xlsx';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert('Export gagal');
    }
  };

  return (
    <div className="w-full">
      {/* Filter Section */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Filter Data</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter Tahun:
            </label>
            <select
              value={selectedYear}
              onChange={(e) => handleYearChange(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            >
              <option value="all">Semua Tahun</option>
              {allYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter Bulan:
            </label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              disabled={availableMonths.length === 0}
            >
              <option value="all">Semua Bulan</option>
              {availableMonths.map(({ month, year }) => (
                <option key={`${month}-${year}`} value={`${month}-${year}`}>
                  {getMonthYearLabel({ month, year })}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col items-start space-y-2">
          <label className='block text-sm font-medium text-gray-700 mt-2'>Download Data :</label>
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-green-500 text-white rounded cursor-pointer"
          >
            Export Excel
          </button>
        </div>

        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 text-blue-800">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium">
              Menampilkan {filteredData.length} jawaban dari {groupedIndikatorList.reduce((sum, group) => sum + group.indikators.length, 0)} indikator
            </span>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                <th rowSpan="2" className="border border-white/20 p-2 sm:p-4 text-center text-xs sm:text-xl font-semibold bg-blue-600">
                  No
                </th>
                <th rowSpan="2" className="border border-white/20 p-2 sm:p-4 text-center text-xs sm:text-xl font-semibold min-w-[150px] sm:min-w-[200px] bg-blue-600">
                  Indikator Tipe
                </th>
                <th rowSpan="2" className="border border-white/20 p-2 sm:p-4 text-center text-xs sm:text-xl font-semibold bg-blue-600">
                  No
                </th>
                <th rowSpan="2" className="border border-white/20 p-2 sm:p-4 text-center text-sm sm:text-2xl font-semibold min-w-[200px] sm:min-w-[470px] bg-blue-600">
                  Indikator
                </th>
                {Object.entries(groupedByMonth).map(([key]) => {
                  const [month, year] = key.split('-').map(Number);
                  return (
                    <th key={key} colSpan={4} className="border border-white/20 p-2 sm:p-4 text-center font-semibold text-xs sm:text-xl bg-blue-600">
                      {monthNames[month]}
                    </th>
                  );
                })}
              </tr>
              <tr className="bg-gradient-to-r from-blue-400 to-indigo-400 text-white">
                {Object.entries(groupedByMonth).map(([key]) =>
                  [1, 2, 3, 4].map((minggu) => (
                    <th
                      key={`${key}-m${minggu}`}
                      className="border border-white/20 p-1 sm:p-3 text-center font-medium text-[10px] sm:text-base bg-blue-500 min-w-[48px] sm:min-w-[80px]"
                    >
                      {minggu}
                    </th>
                  ))
                )}
              </tr>
            </thead>

            <tbody>
              {groupedIndikatorList.length === 0 ? (
                <tr>
                  <td colSpan={4 + kolom.length} className="p-8 text-center text-gray-500">
                    <div className="flex flex-col items-center gap-2">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                      <span>Tidak ada data untuk filter yang dipilih</span>
                    </div>
                  </td>
                </tr>
              ) : (
                groupedIndikatorList.map((group, groupIdx) => (
                  <React.Fragment key={group.tipe}>
                    {group.indikators.map((indikator, indikatorIdx) => (
                      <tr key={indikator.indikator_id} className="hover:bg-blue-50 transition-colors duration-150">
                        {indikatorIdx === 0 && (
                          <td
                            rowSpan={group.indikators.length}
                            className="border border-gray-200 text-center p-2 sm:p-4 text-xs sm:text-sm bg-gray-50 font-medium"
                          >
                            {group.groupIndex}
                          </td>
                        )}
                        {indikatorIdx === 0 && (
                          <td
                            rowSpan={group.indikators.length}
                            className="border border-gray-200 p-2 sm:p-4 text-xs sm:text-sm text-gray-800 font-medium"
                          >
                            {indikator.indikator_tipe}
                          </td>
                        )}
                        <td className="border border-gray-200 text-center p-2 sm:p-4 text-xs sm:text-sm bg-gray-50 font-medium">
                          {indikator.nomor_urut}
                        </td>
                        <td className="border border-gray-200 p-2 sm:p-4 text-xs sm:text-sm text-gray-800 font-medium">
                          {indikator.indikator_isi}
                        </td>
                        {kolom.map(({ month, year, minggu }, i) => {
                          const item = filteredData.find(d =>
                            d.indikator_id.toString() === indikator.indikator_id.toString() &&
                            getMonthYear(d.waktu).month === month &&
                            getMonthYear(d.waktu).year === year &&
                            d.minggu === minggu
                          );

                          let cellContent, cellClass;
                          if (!item) {
                            cellContent = '-';
                            cellClass = 'text-gray-400';
                          } else if (item.nilai === 1) {
                            cellContent = (
                              <div className="flex items-center justify-center">
                                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-100 rounded-full flex items-center justify-center">
                                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                              </div>
                            );
                            cellClass = 'text-green-600';
                          } else {
                            cellContent = (
                              <div className="flex items-center justify-center">
                                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-red-100 rounded-full flex items-center justify-center">
                                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </div>
                              </div>
                            );
                            cellClass = 'text-red-600';
                          }

                          return (
                            <td key={`${indikator.indikator_id}-${i}`} className={`border border-gray-200 text-center p-1 sm:p-4 text-xs sm:text-sm ${cellClass}`}>
                              {cellContent}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Statistics Summary */}
      {groupedIndikatorList.length > 0 && (
        <div className="mt-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Ringkasan Statistik</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">
                {groupedIndikatorList.reduce((sum, group) => sum + group.indikators.length, 0)}
              </div>
              <div className="text-sm text-blue-700">Total Indikator</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="text-2xl font-bold text-green-600">
                {filteredData.filter(d => d.nilai === 1).length}
              </div>
              <div className="text-sm text-green-700">Jawaban Ya</div>
            </div>
            <div className="bg-red-50 rounded-lg p-4 border border-red-200">
              <div className="text-2xl font-bold text-red-600">
                {filteredData.filter(d => d.nilai === 0).length}
              </div>
              <div className="text-sm text-red-700">Jawaban Tidak</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedisTable;