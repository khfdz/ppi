import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { fetchIndikators } from '../api/indikatorApi';
import { submitAmbulance } from '../api/ambulanceApi';

const AmbulanceInput = ({ token, minggu, onCancel, completedWeeks = [] }) => {
  const [indikators, setIndikators] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadIndikators = async () => {
      setLoading(true);
      try {
        const data = await fetchIndikators(token, { jenis: 'MPKDA' }); // Filter MBTJ
        setIndikators(data);

        // Initialize empty answers for all indicators
        const initialAnswers = {};
        data.forEach(indicator => {
          initialAnswers[indicator.indikator_id] = null;
        });
        setAnswers(initialAnswers);
      } catch (err) {
        setErrorMsg('Gagal mengambil data indikator');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (token) loadIndikators();
  }, [token]);

  const handleAnswer = (jawaban) => {
    const indikator = indikators[currentIndex];
    setAnswers((prev) => ({
      ...prev,
      [indikator.indikator_id]: {
        pertanyaan: indikator.indikator_isi,
        jawaban: jawaban,
        jawaban_text: jawaban === 1 ? 'Ya' : 'Tidak',
      },
    }));
  };

  const handleNext = () => {
    if (currentIndex < indikators.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleSubmitAll = async () => {
    // Check if all questions are answered
    const unansweredQuestions = indikators.filter(indicator => 
      answers[indicator.indikator_id] === null || answers[indicator.indikator_id] === undefined
    );

    if (unansweredQuestions.length > 0) {
      Swal.fire({
        title: '⚠️ Belum Lengkap',
        html: `<div class="text-left">
          <p class="mb-3">Masih ada <strong>${unansweredQuestions.length}</strong> pertanyaan yang belum dijawab:</p>
          <ul class="list-disc list-inside text-sm text-gray-600 space-y-1">
            ${unansweredQuestions.slice(0, 3).map((q, i) => 
              `<li>Pertanyaan ${indikators.findIndex(ind => ind.indikator_id === q.indikator_id) + 1}: ${q.indikator_isi.substring(0, 50)}...</li>`
            ).join('')}
            ${unansweredQuestions.length > 3 ? `<li class="text-gray-500">... dan ${unansweredQuestions.length - 3} lainnya</li>` : ''}
          </ul>
        </div>`,
        icon: 'warning',
        confirmButtonText: 'Lanjutkan Mengisi',
        customClass: {
          confirmButton: 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200',
          popup: 'rounded-2xl shadow-2xl border-0'
        },
        buttonsStyling: false
      });
      return;
    }

    // Show confirmation dialog
    const result = await Swal.fire({
      title: '🚑 Kirim Data Ambulance?',
      html: `<div class="text-left">
        <p class="mb-3">Anda akan mengirim data ambulance untuk <strong>Minggu ${minggu}</strong></p>
        <p class="text-sm text-gray-600">Total jawaban: <strong>${indikators.length}</strong> pertanyaan</p>
        <p class="text-xs text-gray-500 mt-2">⚠️ Data yang sudah dikirim tidak dapat diubah</p>
      </div>`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: '✅ Ya, Kirim Sekarang',
      cancelButtonText: '❌ Batal',
      customClass: {
        confirmButton: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 mr-3',
        cancelButton: 'bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200',
        popup: 'rounded-2xl shadow-2xl border-0'
      },
      buttonsStyling: false
    });

    if (!result.isConfirmed) return;

    setIsSubmitting(true);

    try {
      // Submit all answers
      const submitPromises = indikators.map(indikator => {
        const answer = answers[indikator.indikator_id];
        const data = {
          indikator_id: indikator.indikator_id,
          minggu: parseInt(minggu),
          nilai: answer.jawaban,
        };
        return submitAmbulance(token, data);
      });

      await Promise.all(submitPromises);

      // Show success message with summary
      const resultHtml = Object.values(answers)
        .map((item, index) =>
          `<div class="mb-4 p-4 bg-gray-50 rounded-lg border-l-4 ${item.jawaban === 1 ? 'border-green-500' : 'border-red-500'}">
            <div class="font-semibold text-gray-800 mb-2">${index + 1}. ${item.pertanyaan}</div>
            <div class="flex items-center gap-2">
              <span class="text-sm text-gray-600">Jawaban:</span>
              <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${item.jawaban === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                ${item.jawaban === 1 ? '✓' : '✗'} ${item.jawaban_text}
              </span>
            </div>
          </div>`
        )
        .join('');

      await Swal.fire({
        title: `<div class="text-2xl font-bold text-gray-800 mb-2">🎉 Data Berhasil Dikirim!</div>`,
        html: `
          <div class="text-left">
            <div class="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <div class="flex items-center gap-2 mb-2">
                <div class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="font-semibold text-green-800">Minggu ${minggu} - Lengkap</span>
              </div>
              <p class="text-sm text-green-700">Data ambulance telah tersimpan dalam sistem</p>
            </div>
            <h4 class="font-semibold text-gray-800 mb-3">📋 Rekap Jawaban:</h4>
            <div class="max-h-96 overflow-y-auto">${resultHtml}</div>
          </div>
        `,
        icon: 'success',
        confirmButtonText: '🏠 Kembali ke Dashboard',
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

      // Call onCancel to go back to main view
      onCancel && onCancel();

    } catch (err) {
      console.error('Gagal submit:', err.response?.data?.message || err.message);

      Swal.fire({
        title: '❌ Gagal Mengirim Data',
        html: `
          <div class="text-left">
            <p class="mb-3">Terjadi kesalahan saat mengirim data ambulance:</p>
            <div class="bg-red-50 border border-red-200 rounded-lg p-3">
              <p class="text-sm text-red-700">${err.response?.data?.message || err.message}</p>
            </div>
            <p class="text-sm text-gray-600 mt-3">Silakan periksa koneksi internet dan coba lagi.</p>
          </div>
        `,
        icon: 'error',
        confirmButtonText: '🔄 Coba Lagi',
        customClass: {
          confirmButton: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200',
          popup: 'rounded-2xl shadow-2xl border-0'
        },
        buttonsStyling: false
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCompletionStats = () => {
    const answered = Object.values(answers).filter(answer => answer !== null && answer !== undefined).length;
    const total = indikators.length;
    return { answered, total, percentage: total > 0 ? (answered / total) * 100 : 0 };
  };

  const isWeekCompleted = completedWeeks.includes(parseInt(minggu));

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

  const currentIndikator = indikators[currentIndex];
  const completionStats = getCompletionStats();
  const currentAnswer = answers[currentIndikator?.indikator_id];

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
      {/* Progress Bar */}
      <div className="bg-gray-100 h-3">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500 ease-out"
          style={{ width: `${completionStats.percentage}%` }}
        ></div>
      </div>

      <div className="p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center relative">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {isWeekCompleted && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-gray-800">Minggu {minggu}</h3>
                {isWeekCompleted && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    ✓ Selesai
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500">
                Pertanyaan {currentIndex + 1} dari {indikators.length}
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">{completionStats.answered}/{completionStats.total}</div>
            <div className="text-xs text-gray-500">Terjawab</div>
          </div>
        </div>

        {/* Completion Status */}
        <div className="mb-6 bg-gray-50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Progress Pengisian:</span>
            <span className="text-sm font-semibold text-blue-600">{Math.round(completionStats.percentage)}%</span>
          </div>
          <div className="mt-2 flex gap-1">
            {indikators.map((_, index) => (
              <div
                key={index}
                className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                  answers[indikators[index]?.indikator_id] !== null && answers[indikators[index]?.indikator_id] !== undefined
                    ? 'bg-green-400' 
                    : index === currentIndex 
                    ? 'bg-blue-400' 
                    : 'bg-gray-200'
                }`}
              ></div>
            ))}
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
                {currentIndikator?.indikator_isi}
              </p>
            </div>
          </div>
        </div>

        {/* Answer Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <button
            onClick={() => handleAnswer(1)}
            className={`group flex-1 relative overflow-hidden font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 ${
              currentAnswer?.jawaban === 1
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white ring-4 ring-green-200'
                : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white'
            }`}
          >
            <div className="flex items-center justify-center gap-3">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-lg">Ya</span>
              {currentAnswer?.jawaban === 1 && (
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              )}
            </div>
          </button>
          
          <button
            onClick={() => handleAnswer(0)}
            className={`group flex-1 relative overflow-hidden font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 ${
              currentAnswer?.jawaban === 0
                ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white ring-4 ring-red-200'
                : 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white'
            }`}
          >
            <div className="flex items-center justify-center gap-3">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <span className="text-lg">Tidak</span>
              {currentAnswer?.jawaban === 0 && (
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              )}
            </div>
          </button>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              currentIndex === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md transform hover:-translate-y-0.5'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            {indikators.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-8 h-8 rounded-full text-sm font-medium transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-blue-500 text-white shadow-lg'
                    : answers[indikators[index]?.indikator_id] !== null && answers[indikators[index]?.indikator_id] !== undefined
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {answers[indikators[index]?.indikator_id] !== null && answers[indikators[index]?.indikator_id] !== undefined ? (
                  <svg className="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  index + 1
                )}
              </button>
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={currentIndex === indikators.length - 1}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              currentIndex === indikators.length - 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md transform hover:-translate-y-0.5'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Submit Button */}
        <div className="border-t pt-6">
          <button
            onClick={handleSubmitAll}
            disabled={completionStats.answered < completionStats.total || isSubmitting}
            className={`w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 ${
              completionStats.answered < completionStats.total
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : isSubmitting
                ? 'bg-blue-400 text-white cursor-wait'
                : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1'
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Mengirim Data...
              </>
            ) : completionStats.answered < completionStats.total ? (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                Jawab Semua Pertanyaan ({completionStats.total - completionStats.answered} tersisa)
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Kirim Data Ambulance
              </>
            )}
          </button>
          
          {completionStats.answered < completionStats.total && (
            <p className="text-center text-sm text-gray-500 mt-3">
              Silakan jawab semua pertanyaan sebelum mengirim data
            </p>
          )}
        </div>

        {/* Cancel Button */}
        <div className="mt-4">
          <button
            onClick={onCancel}
            className="w-full py-3 px-4 text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200"
          >
            ← Kembali ke Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default AmbulanceInput;