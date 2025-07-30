import React, { useState } from 'react';

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


const MonitoringTable = ({ data }) => {
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
        <p className="text-gray-500 text-center">Data monitoring akan muncul setelah Anda menginput data</p>
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
    
    // Filter berdasarkan tahun
    if (selectedYear !== 'all' && year !== parseInt(selectedYear)) {
      return false;
    }
    
    // Filter berdasarkan bulan
    if (selectedMonth !== 'all' && `${month}-${year}` !== selectedMonth) {
      return false;
    }
    
    return true;
  });

  // Filter bulan yang tersedia berdasarkan tahun yang dipilih
  const availableMonths = selectedYear === 'all' 
    ? allMonthYears 
    : allMonthYears.filter(({ year }) => year === parseInt(selectedYear));

  const indikatorMap = {};
  filteredData.forEach(item => {
    indikatorMap[item.indikator_id] = {
      indikator_isi: item.indikator_isi,
      indikator_jenis: item.indikator_jenis,
    };
  });

  const indikatorList = Object.keys(indikatorMap)
    .sort((a, b) => Number(a) - Number(b))
    .map(id => ({
      indikator_id: id,
      ...indikatorMap[id],
    }));

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
    setSelectedMonth('all'); // Reset month filter when year changes
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
          {/* Year Filter */}
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

          {/* Month Filter */}
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

        {/* Data Summary */}
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 text-blue-800">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium">
              Menampilkan {filteredData.length} data dari {indikatorList.length} indikator
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
                <th rowSpan="2" className="border border-white/20 p-4 text-center text-xl font-semibold bg-blue-600">
                  No
                </th>
                <th rowSpan="2" className="border border-white/20 p-4 text-center text-2xl font-semibold min-w-[470px] bg-blue-600">
                  Indikator
                </th>
                {Object.entries(groupedByMonth).map(([key]) => {
                  const [month, year] = key.split('-').map(Number);
                  return (
                    <th key={key} colSpan={4} className="border border-white/20 p-4 text-center font-semibold text-xl bg-blue-600">
                      {monthNames[month]}
                    </th>
                  );
                })}
              </tr>
              <tr className="bg-gradient-to-r from-blue-400 to-indigo-400 text-white">
                {Object.entries(groupedByMonth).map(([key]) =>
                  [1, 2, 3, 4].map((minggu) => (
                    <th key={`${key}-m${minggu}`} className="border border-white/20 p-3 text-center font-medium bg-blue-500 min-w-[80px]">
                      {minggu}
                    </th>
                  ))
                )}
              </tr>
            </thead>

            <tbody>
              {indikatorList.length === 0 ? (
                <tr>
                  <td colSpan={2 + kolom.length} className="p-8 text-center text-gray-500">
                    <div className="flex flex-col items-center gap-2">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                      <span>Tidak ada data untuk filter yang dipilih</span>
                    </div>
                  </td>
                </tr>
              ) : (
                indikatorList.map((indikator, index) => (
                  <tr key={indikator.indikator_id} className="hover:bg-blue-50 transition-colors duration-150">
                    <td className="border border-gray-200 text-center p-4 font-medium bg-gray-50">
                      {index + 1}
                    </td>
                    <td className="border border-gray-200 p-4 font-medium text-gray-800">
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
                            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          </div>
                        );
                        cellClass = 'text-green-600';
                      } else {
                        cellContent = (
                          <div className="flex items-center justify-center">
                            <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                              <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </div>
                          </div>
                        );
                        cellClass = 'text-red-600';
                      }
                      
                      return (
                        <td key={`${indikator.indikator_id}-${i}`} className={`border border-gray-200 text-center p-4 ${cellClass}`}>
                          {cellContent}
                        </td>
                      );
                    })}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Statistics Summary */}
      {indikatorList.length > 0 && (
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
              <div className="text-2xl font-bold text-blue-600">{indikatorList.length}</div>
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

export default MonitoringTable;