import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { fetchIndikators } from '../api/indikatorApi';
import { submitMonitoring } from '../api/monitoringApi';

const MonitoringInput = ({ token, minggu, onCancel }) => {
  const [indikators, setIndikators] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleCancel = () => {
    Swal.fire({
      title: '⚠️ Batalkan Input?',
      text: 'Semua jawaban yang sudah diisi akan hilang. Apakah Anda yakin?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Batalkan',
      cancelButtonText: 'Lanjut Mengisi',
      reverseButtons: true,
      customClass: {
        confirmButton: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 mr-3',
        cancelButton: 'bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200',
        popup: 'rounded-2xl shadow-2xl border-0'
      },
      buttonsStyling: false
    }).then((result) => {
      if (result.isConfirmed) {
        if (onCancel) {
          onCancel();
        }
      }
    });
  };

  useEffect(() => {
    const loadIndikators = async () => {
      setLoading(true);
      try {
        const data = await fetchIndikators(token);
        setIndikators(data);
      } catch (err) {
        setErrorMsg('Gagal mengambil data indikator');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (token) loadIndikators();
  }, [token]);

  const handleAnswer = async (jawaban) => {
    const indikator = indikators[currentIndex];
    const data = {
      indikator_id: indikator.indikator_id,
      minggu: parseInt(minggu),
      nilai: jawaban,
    };

    try {
      await submitMonitoring(token, data);

      setAnswers((prev) => ({
        ...prev,
        [indikator.indikator_id]: {
          pertanyaan: indikator.indikator_isi,
          jawaban: jawaban === 1 ? 'Ya' : 'Tidak',
        },
      }));

      if (currentIndex + 1 === indikators.length) {
        setTimeout(() => {
          const resultHtml = Object.values({
            ...answers,
            [indikator.indikator_id]: {
              pertanyaan: indikator.indikator_isi,
              jawaban: jawaban === 1 ? 'Ya' : 'Tidak',
            },
          })
            .map(
              (item, index) =>
                `<div class="mb-4 p-4 bg-gray-50 rounded-lg border-l-4 ${item.jawaban === 'Ya' ? 'border-green-500' : 'border-red-500'}">
                  <div class="font-semibold text-gray-800 mb-2">${index + 1}. ${item.pertanyaan}</div>
                  <div class="flex items-center gap-2">
                    <span class="text-sm text-gray-600">Jawaban:</span>
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${item.jawaban === 'Ya' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                      ${item.jawaban === 'Ya' ? '✓' : '✗'} ${item.jawaban}
                    </span>
                  </div>
                </div>`
            )
            .join('');

          Swal.fire({
            title: `<div class="text-2xl font-bold text-gray-800 mb-2">📋 Rekap Minggu ke-${minggu}</div>`,
            html: `<div class="text-left max-h-96 overflow-y-auto">${resultHtml}</div>`,
            icon: 'success',
            confirmButtonText: '🎉 Selesai',
            width: 700,
            scrollbarPadding: false,
            showClass: {
              popup: 'animate__animated animate__fadeInDown animate__faster'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp animate__faster'
            },
            customClass: {
              title: 'text-left',
              htmlContainer: 'text-left',
              confirmButton: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200',
              popup: 'rounded-2xl shadow-2xl border-0'
            },
            buttonsStyling: false
          });
        }, 300);
      }

      setCurrentIndex((prev) => prev + 1);
    } catch (err) {
      console.error('Gagal submit:', err.response?.data?.message || err.message);
      setErrorMsg('Gagal mengirim jawaban');
      
      Swal.fire({
        title: 'Oops! Terjadi Kesalahan',
        text: 'Gagal mengirim jawaban. Silakan coba lagi.',
        icon: 'error',
        confirmButtonText: 'Coba Lagi',
        customClass: {
          confirmButton: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200',
          popup: 'rounded-2xl shadow-2xl border-0'
        },
        buttonsStyling: false
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20">
        <div className="flex items-center gap-3">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          <span className="text-gray-600 font-medium">Memuat data indikator...</span>
        </div>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-2xl shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <p className="text-red-700 font-semibold">{errorMsg}</p>
        </div>
      </div>
    );
  }

  if (!minggu) {
    return (
      <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-2xl shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p className="text-yellow-700 font-semibold">Minggu belum dipilih</p>
        </div>
      </div>
    );
  }

  if (currentIndex >= indikators.length) {
    return (
      <div className="p-8 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl shadow-xl">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-green-800 mb-2">Selamat! 🎉</h3>
          <p className="text-green-700 font-semibold">Input minggu {minggu} telah selesai</p>
        </div>
      </div>
    );
  }

  const currentIndikator = indikators[currentIndex];
  const progress = ((currentIndex + 1) / indikators.length) * 100;

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
      {/* Progress Bar */}
      <div className="bg-gray-100 h-2">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">Minggu {minggu}</h3>
              <p className="text-sm text-gray-500">
                Pertanyaan {currentIndex + 1} dari {indikators.length}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-2xl font-bold text-blue-600">{Math.round(progress)}%</div>
              <div className="text-xs text-gray-500">Progress</div>
            </div>
            
            {/* Cancel Button */}
            <button
              onClick={handleCancel}
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
        </div>

        {/* Question */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white font-bold text-sm">{currentIndex + 1}</span>
              </div>
              <p className="text-lg font-medium text-gray-800 leading-relaxed">
                {currentIndikator.indikator_isi}
              </p>
            </div>
          </div>
        </div>

        {/* Answer Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => handleAnswer(1)}
            className="group flex-1 relative overflow-hidden bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
          >
            <div className="flex items-center justify-center gap-3">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-lg">Ya</span>
            </div>
          </button>
          
          <button
            onClick={() => handleAnswer(0)}
            className="group flex-1 relative overflow-hidden bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
          >
            <div className="flex items-center justify-center gap-3">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <span className="text-lg">Tidak</span>
            </div>
          </button>
        </div>

        {/* Navigation Hint */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Pilih jawaban untuk melanjutkan ke pertanyaan berikutnya
          </p>
          <div className="flex justify-center mt-2 sm:hidden">
            <div className="text-lg font-bold text-blue-600">{Math.round(progress)}%</div>
            <span className="text-xs text-gray-500 ml-2 self-end">Progress</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonitoringInput;