import React from 'react';
import { LogOut, UserCircle2 } from 'lucide-react';
import Swal from 'sweetalert2';

const Navbar = ({ onLogout, namaUnit }) => {
  const handleLogout = () => {
    Swal.fire({
      title: '🚪 Logout Konfirmasi',
      text: 'Apakah Anda yakin ingin keluar dari aplikasi?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Ya, Logout',
      cancelButtonText: 'Batal',
      reverseButtons: true,
      customClass: {
        confirmButton: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 mr-3',
        cancelButton: 'bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200',
        popup: 'rounded-2xl shadow-2xl border-0',
        title: 'text-gray-800',
        content: 'text-gray-600'
      },
      buttonsStyling: false,
      backdrop: 'rgba(0,0,0,0.4)',
      showClass: {
        popup: 'animate__animated animate__fadeInDown animate__faster'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp animate__faster'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // Show success message before logout
        Swal.fire({
          title: '👋 Sampai Jumpa!',
          text: 'Anda telah berhasil logout dari sistem',
          icon: 'success',
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
          customClass: {
            popup: 'rounded-2xl shadow-2xl border-0'
          },
          showClass: {
            popup: 'animate__animated animate__zoomIn animate__faster'
          },
          hideClass: {
            popup: 'animate__animated animate__zoomOut animate__faster'
          }
        }).then(() => {
          if (onLogout) {
            onLogout();
          }
        });
      }
    });
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-xl sticky top-0 z-50 backdrop-blur-sm">
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          {/* Logo and Title Section */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
              <div className="w-8 h-8 bg-gradient-to-br from-white to-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white drop-shadow-sm">
                Rumah Sakit Permata Keluarga
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <p className="text-sm font-medium text-blue-100">
                  Karawang
                </p>
              </div>
            </div>
          </div>

          {/* User Section */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* User Info */}
            <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm px-4 py-1 rounded-xl shadow-lg border border-white/30">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center shadow-md">
                <UserCircle2 className="text-white" size={20} />
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-semibold text-white drop-shadow-sm">
                  {namaUnit}
                </div>
              </div>
              <div className="sm:hidden text-sm font-semibold text-white">
                {namaUnit}
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="group relative overflow-hidden bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 border border-red-400/30"
            >
              <div className="flex items-center gap-2">
                <LogOut size={18} className="group-hover:rotate-12 transition-transform duration-200" />
                <span className="hidden sm:inline text-sm font-semibold">Logout</span>
              </div>
              
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </button>
          </div>
        </div>

        {/* Mobile User Info */}
        <div className="sm:hidden mt-3 p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
          <div className="flex items-center gap-2 text-blue-100">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-sm">Unit Kerja: <span className="text-white font-medium">{namaUnit}</span></span>
          </div>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
    </header>
  );
};

export default Navbar;