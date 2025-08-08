import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { submitMedis, fetchMedisData } from '../api/medisApi';
import { fetchIndikators } from '../api/indikatorApi';

const MedisInput = ({ token, minggu, onCancel, onComplete, completedWeeks = [] }) => {
  const [indikators, setIndikators] = useState([]);
  const [groupedIndikators, setGroupedIndikators] = useState({});
  const [answers, setAnswers] = useState({});
  const [currentTipe, setCurrentTipe] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Fetch indicators
        const indikatorData = await fetchIndikators(token, { jenis: 'STPM' });
        console.log('Data indikators:', indikatorData);
        if (!indikatorData || indikatorData.length === 0) {
          throw new Error('Tidak ada indikator yang ditemukan');
        }
        setIndikators(indikatorData);

        // Group indicators by indikator_tipe
        const grouped = indikatorData.reduce((acc, indikator) => {
          const tipe = indikator.indikator_tipe || 'Umum';
          if (!acc[tipe]) acc[tipe] = [];
          acc[tipe].push(indikator);
          return acc;
        }, {});
        console.log('Grouped indikators:', grouped);
        setGroupedIndikators(grouped);

        // Fetch existing answers for the selected week
        const medisData = await fetchMedisData(token);
        console.log('Data medis:', medisData);
        const weekData = medisData.filter(item => Number(item.minggu) === Number(minggu));
        console.log(`Data untuk minggu ${minggu}:`, weekData);

        // Initialize answers with existing data
        const initialAnswers = {};
        indikatorData.forEach(indicator => {
          const existingAnswer = weekData.find(data => String(data.indikator_id) === String(indicator.indikator_id));
          initialAnswers[indicator.indikator_id] = existingAnswer
            ? {
                pertanyaan: indicator.indikator_isi,
                jawaban: existingAnswer.nilai,
                jawaban_text: existingAnswer.nilai === 1 ? 'Ya' : 'Tidak',
              }
            : null;
        });
        console.log('Initial answers:', initialAnswers);
        setAnswers(initialAnswers);

        // Set default tipe to the first available group
        const firstTipe = Object.keys(grouped)[0];
        if (firstTipe) setCurrentTipe(firstTipe);
        else setErrorMsg('Tidak ada kategori indikator yang tersedia');
      } catch (err) {
        setErrorMsg('Gagal mengambil data indikator atau jawaban: ' + err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (token && minggu) loadData();
  }, [token, minggu]);

  const handleAnswer = async (jawaban) => {
    const indikator = groupedIndikators[currentTipe][currentIndex];
    const updatedAnswer = {
      pertanyaan: indikator.indikator_isi,
      jawaban: jawaban,
      jawaban_text: jawaban === 1 ? 'Ya' : 'Tidak',
    };
    setAnswers((prev) => ({
      ...prev,
      [indikator.indikator_id]: updatedAnswer,
    }));

    setIsSubmitting(true);
    try {
      await submitMedis(token, {
        indikator_id: indikator.indikator_id,
        minggu: parseInt(minggu),
        nilai: jawaban,
      });
    } catch (err) {
      console.error('Gagal menyimpan jawaban:', err);
      Swal.fire({
        title: '⚠️ Gagal Menyimpan',
        text: 'Gagal menyimpan jawaban. Silakan coba lagi.',
        icon: 'warning',
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg',
          popup: 'rounded-2xl shadow-2xl border-0',
        },
        buttonsStyling: false,
      });
      setIsSubmitting(false);
      return;
    }
    setIsSubmitting(false);

    // Move to the next question in the current type
    if (currentIndex < groupedIndikators[currentTipe].length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      const tipeList = Object.keys(groupedIndikators);
      const currentTipeIndex = tipeList.indexOf(currentTipe);
      if (currentTipeIndex < tipeList.length - 1) {
        setCurrentTipe(tipeList[currentTipeIndex + 1]);
        setCurrentIndex(0);
      }
    }
  };

  const handleTipeChange = (tipe) => {
    setCurrentTipe(tipe);
    setCurrentIndex(0);
  };

  const handleNext = () => {
    if (currentIndex < groupedIndikators[currentTipe].length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      const tipeList = Object.keys(groupedIndikators);
      const currentTipeIndex = tipeList.indexOf(currentTipe);
      if (currentTipeIndex < tipeList.length - 1) {
        setCurrentTipe(tipeList[currentTipeIndex + 1]);
        setCurrentIndex(0);
      }
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      const tipeList = Object.keys(groupedIndikators);
      const currentTipeIndex = tipeList.indexOf(currentTipe);
      if (currentTipeIndex > 0) {
        setCurrentTipe(tipeList[currentTipeIndex - 1]);
        setCurrentIndex(groupedIndikators[tipeList[currentTipeIndex - 1]].length - 1);
      }
    }
  };

  const handleSubmitAll = async () => {
    const answeredCount = Object.values(answers).filter(a => a !== null).length;
    const total = indikators.length;

    if (answeredCount < total) {
      const result = await Swal.fire({
        title: '⚠️ Belum Semua Dijawab',
        html: `<div class="text-left">
          <p class="mb-3">Anda baru menjawab <strong>${answeredCount}</strong> dari <strong>${total}</strong> pertanyaan.</p>
          <p class="text-sm text-gray-600">Apakah Anda ingin mengirim jawaban yang sudah diisi sekarang?</p>
          <p class="text-xs text-gray-500 mt-2">⚠️ Anda dapat melanjutkan pengisian nanti.</p>
        </div>`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '✅ Kirim Sekarang',
        cancelButtonText: '❌ Lanjutkan Mengisi',
        customClass: {
          confirmButton: 'bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg',
          cancelButton: 'bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg',
          popup: 'rounded-2xl shadow-2xl border-0',
        },
        buttonsStyling: false,
      });

      if (!result.isConfirmed) return;
    }

    setIsSubmitting(true);
    try {
      const submitPromises = Object.entries(answers)
        .filter(([_, answer]) => answer !== null)
        .map(([indikator_id, answer]) => {
          const data = {
            indikator_id,
            minggu: parseInt(minggu),
            nilai: answer.jawaban,
          };
          return submitMedis(token, data);
        });

      await Promise.all(submitPromises);

      await Swal.fire({
        title: '🎉 Data Berhasil Dikirim!',
        html: `
          <div class="text-left">
            <div class="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <div class="flex items-center gap-2 mb-2">
                <div class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="font-semibold text-green-800">Minggu ${minggu} - ${answeredCount}/${total} Pertanyaan</span>
              </div>
              <p class="text-sm text-green-700">Data medis telah tersimpan dalam sistem</p>
            </div>
            <p class="text-sm text-gray-600">Anda dapat melanjutkan pengisian untuk pertanyaan yang tersisa kapan saja.</p>
          </div>
        `,
        icon: 'success',
        confirmButtonText: '🏠 Kembali ke Dashboard',
        customClass: {
          confirmButton: 'bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg',
          popup: 'rounded-2xl shadow-2xl border-0',
        },
        buttonsStyling: false,
      });

      onComplete && onComplete();
    } catch (err) {
      console.error('Gagal submit:', err);
      Swal.fire({
        title: '❌ Gagal Mengirim Data',
        text: err.response?.data?.message || err.message,
        icon: 'error',
        confirmButtonText: '🔄 Coba Lagi',
        customClass: {
          confirmButton: 'bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg',
          popup: 'rounded-2xl shadow-2xl border-0',
        },
        buttonsStyling: false,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCompletionStats = () => {
    const answered = Object.values(answers).filter(answer => answer !== null).length;
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

  const currentIndikator = groupedIndikators[currentTipe]?.[currentIndex];
  const completionStats = getCompletionStats();
  const currentAnswer = answers[currentIndikator?.indikator_id];

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
      <div className="bg-gray-100 h-3">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500 ease-out"
          style={{ width: `${completionStats.percentage}%` }}
        ></div>
      </div>

      <div className="p-6 sm:p-8">
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
                Pertanyaan {currentIndex + 1} dari {groupedIndikators[currentTipe]?.length} ({currentTipe})
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">{completionStats.answered}/{completionStats.total}</div>
            <div className="text-xs text-gray-500">Terjawab</div>
          </div>
        </div>

        <div className="mb-6 bg-gray-50 rounded-xl p-4">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Pilih Kategori Indikator:</h4>
          <div className="flex flex-wrap gap-2">
            {Object.keys(groupedIndikators).map(tipe => {
              const answeredInTipe = groupedIndikators[tipe].filter(ind => answers[ind.indikator_id] !== null).length;
              return (
                <button
                  key={tipe}
                  onClick={() => handleTipeChange(tipe)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                    currentTipe === tipe
                      ? 'bg-blue-500 text-white shadow-lg'
                      : answeredInTipe === groupedIndikators[tipe].length
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {tipe} ({answeredInTipe}/{groupedIndikators[tipe].length})
                </button>
              );
            })}
          </div>
        </div>

        <div className="mb-6 bg-gray-50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Progress Pengisian:</span>
            <span className="text-sm font-semibold text-blue-600">{Math.round(completionStats.percentage)}%</span>
          </div>
          <div className="mt-2 flex gap-1">
            {groupedIndikators[currentTipe]?.map((indikator, index) => (
              <div
                key={indikator.indikator_id}
                className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                  answers[indikator.indikator_id] !== null
                    ? 'bg-green-400'
                    : index === currentIndex
                    ? 'bg-blue-400'
                    : 'bg-gray-200'
                }`}
              ></div>
            ))}
          </div>
        </div>

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

        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0 && Object.keys(groupedIndikators).indexOf(currentTipe) === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              currentIndex === 0 && Object.keys(groupedIndikators).indexOf(currentTipe) === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md transform hover:-translate-y-0.5'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          <div className="flex items-center gap-2">
            {(() => {
              const total = groupedIndikators[currentTipe]?.length || 0;
              const maxButtons = 4;
              let startIndex = Math.max(0, currentIndex - 1);
              let endIndex = Math.min(total, startIndex + maxButtons);

              if (endIndex - startIndex < maxButtons && total > maxButtons) {
                startIndex = Math.max(0, endIndex - maxButtons);
              }

              if (total <= maxButtons) {
                startIndex = 0;
                endIndex = total;
              }

              const buttons = [];
              for (let i = startIndex; i < endIndex; i++) {
                const indikator = groupedIndikators[currentTipe][i];
                buttons.push(
                  <button
                    key={indikator.indikator_id}
                    onClick={() => setCurrentIndex(i)}
                    className={`w-8 h-8 rounded-full text-sm font-medium transition-all duration-200 ${
                      i === currentIndex
                        ? 'bg-blue-500 text-white shadow-lg'
                        : answers[indikator.indikator_id] !== null
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    {answers[indikator.indikator_id] !== null ? (
                      <svg className="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      i + 1
                    )}
                  </button>
                );
              }

              if (startIndex > 0) {
                buttons.unshift(
                  <span key="start-ellipsis" className="text-gray-500">
                    ...
                  </span>
                );
              }
              if (endIndex < total) {
                buttons.push(
                  <span key="end-ellipsis" className="text-gray-500">
                    ...
                  </span>
                );
              }

              return buttons;
            })()}
          </div>

          <button
            onClick={handleNext}
            disabled={currentIndex === groupedIndikators[currentTipe]?.length - 1 && Object.keys(groupedIndikators).indexOf(currentTipe) === Object.keys(groupedIndikators).length - 1}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              currentIndex === groupedIndikators[currentTipe]?.length - 1 && Object.keys(groupedIndikators).indexOf(currentTipe) === Object.keys(groupedIndikators).length - 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md transform hover:-translate-y-0.5'
            }`}
          >
            Next
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="border-t pt-6">
          <button
            onClick={handleSubmitAll}
            disabled={isSubmitting}
            className={`w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 ${
              isSubmitting
                ? 'bg-blue-400 text-white cursor-wait'
                : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1'
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Mengirim Data...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Kirim Data Medis
              </>
            )}
          </button>
        </div>

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

export default MedisInput;