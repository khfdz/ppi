import React from 'react';
import { Activity, Shield, Users, Stethoscope, Building2, ClipboardCheck, Eye, Droplets } from 'lucide-react';
import Swal from 'sweetalert2';
import Navbar from '../components/Navbar';

const HomePage = ({ onNavigate, onLogout, user }) => {
  const menuItems = [
    {
      id: 'monitoring-benda-tajam',
      title: 'Monitoring Benda Tajam dan Jarum',
      description: 'Monitoring keamanan penggunaan benda tajam dan jarum suntik',
      icon: Activity,
      color: 'from-red-500 to-pink-600',
      bgColor: 'from-red-50 to-pink-50',
      borderColor: 'border-red-200',
      onClick: () => onNavigate({ modul: 'MBTJ' })
    },
    {
      id: 'monitoring-kebersihan',
      title: 'Monitoring Penatalaksanaan Kebersihan',
      description: 'Pemantauan standar kebersihan dan sanitasi fasilitas',
      icon: Droplets,
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'from-blue-50 to-cyan-50',
      borderColor: 'border-blue-200',
      onClick: () => onNavigate({ modul: 'MPKDA' })
    },
    {
      id: 'supervisi-perawat',
      title: 'Supervisi TW I - Perawat & Bidan',
      description: 'Supervisi triwulan pertama untuk tenaga perawat dan bidan',
      icon: Users,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'from-green-50 to-emerald-50',
      borderColor: 'border-green-200',
      onClick: () => handleComingSoon('Supervisi TW I - Perawat & Bidan')
    },
    {
      id: 'supervisi-penunjang',
      title: 'Supervisi TW I - Penunjang Medis',
      description: 'Supervisi triwulan pertama untuk tenaga penunjang medis',
      icon: Stethoscope,
      color: 'from-purple-500 to-violet-600',
      bgColor: 'from-purple-50 to-violet-50',
      borderColor: 'border-purple-200',
      onClick: () => handleComingSoon('Supervisi TW I - Penunjang Medis')
    },
    {
      id: 'supervisi-tps',
      title: 'Supervisi TW I - TPS',
      description: 'Supervisi triwulan pertama untuk Tempat Pengelolaan Sampah',
      icon: Building2,
      color: 'from-orange-500 to-amber-600',
      bgColor: 'from-orange-50 to-amber-50',
      borderColor: 'border-orange-200',
      onClick: () => handleComingSoon('Supervisi TW I - TPS')
    },
    {
      id: 'audit-apd',
      title: 'Formulir AUDIT APD',
      description: 'Audit penggunaan Alat Pelindung Diri (APD)',
      icon: Shield,
      color: 'from-teal-500 to-cyan-600',
      bgColor: 'from-teal-50 to-cyan-50',
      borderColor: 'border-teal-200',
      onClick: () => handleComingSoon('Formulir AUDIT APD')
    },
    {
      id: 'audit-ruangan',
      title: 'Formulir AUDIT RUANGAN',
      description: 'Audit kondisi dan kebersihan ruangan fasilitas kesehatan',
      icon: Eye,
      color: 'from-indigo-500 to-blue-600',
      bgColor: 'from-indigo-50 to-blue-50',
      borderColor: 'border-indigo-200',
      onClick: () => handleComingSoon('Formulir AUDIT RUANGAN')
    },
    {
      id: 'audit-hh',
      title: 'Formulir AUDIT HH',
      description: 'Audit Hand Hygiene (Kebersihan Tangan)',
      icon: ClipboardCheck,
      color: 'from-rose-500 to-pink-600',
      bgColor: 'from-rose-50 to-pink-50',
      borderColor: 'border-rose-200',
      onClick: () => handleComingSoon('Formulir AUDIT Hand Hygiene')
    }
  ];

  const handleComingSoon = (featureName) => {
    Swal.fire({
      title: '🚧 Coming Soon',
      html: `
        <div class="text-center">
          <div class="text-6xl mb-4">🔜</div>
          <p class="text-gray-600 mb-2">Fitur <strong>${featureName}</strong> sedang dalam pengembangan</p>
          <p class="text-sm text-gray-500">Akan segera tersedia di update mendatang!</p>
        </div>
      `,
      icon: 'info',
      confirmButtonText: '👍 Oke, Mengerti',
      customClass: {
        confirmButton: 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200',
        popup: 'rounded-2xl shadow-2xl border-0',
        title: 'text-gray-800',
        htmlContainer: 'text-left'
      },
      buttonsStyling: false,
      showClass: {
        popup: 'animate__animated animate__bounceIn animate__faster'
      },
      hideClass: {
        popup: 'animate__animated animate__bounceOut animate__faster'
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100">
      <Navbar onLogout={onLogout} namaUnit={user?.nama_unit || 'User'} />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-xl mb-2">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text py-2 text-transparent mb-2">
            Pencegahan dan Pengendalian Infeksi
          </h1>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Sistem monitoring dan audit komprehensif untuk meningkatkan kualitas pencegahan dan pengendalian infeksi di fasilitas kesehatan
          </p>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={item.onClick}
                className={`group relative overflow-hidden bg-gradient-to-br ${item.bgColor} hover:shadow-2xl rounded-2xl border ${item.borderColor} p-6 transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02] text-left`}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-current rounded-full"></div>
                  <div className="absolute -left-2 -bottom-2 w-16 h-16 bg-current rounded-full"></div>
                </div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${item.color} rounded-xl shadow-lg mb-4 group-hover:scale-110 transition-transform duration-200`}>
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors duration-200">
                    {item.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-200 leading-relaxed">
                    {item.description}
                  </p>
                  
                  {/* Arrow Icon */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-2 group-hover:translate-x-0">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
                
                {/* Hover Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-all duration-300`}></div>
              </button>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Statistik Sistem</h2>
            <p className="text-gray-600">Overview penggunaan sistem PPI</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="text-2xl font-bold text-gray-800">8</div>
              <div className="text-sm text-gray-600">Total Modul</div>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="text-2xl font-bold text-gray-800">2</div>
              <div className="text-sm text-gray-600">Modul Aktif</div>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-2xl font-bold text-gray-800">6</div>
              <div className="text-sm text-gray-600">Coming Soon</div>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="text-2xl font-bold text-gray-800">100%</div>
              <div className="text-sm text-gray-600">Uptime</div>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            © 2025 PPI RS Permata Keluarga Karawang. Sistem Pencegahan dan Pengendalian Infeksi.
          </p>
        </div>
      </main>
    </div>
  );
};

export default HomePage;