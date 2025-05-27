import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'

// Komponen Hero
// Menampilkan bagian utama halaman dengan judul, deskripsi, dan tombol aksi
const Hero = () => {
  return (
    <div className="bg-white min-h-screen md:min-h-[600px] flex items-center relative overflow-hidden py-12 md:py-20">
      {/* Hiasan dekoratif bagian kanan atas */}
      <div className="absolute right-0 top-0 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-emerald-600/20 transform translate-x-32 translate-y-[-100px] rotate-45"></div>
      <div className="absolute right-0 bottom-0 w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-emerald-100 transform translate-x-20 translate-y-[100px] rotate-45"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Bagian kiri - Teks dan tombol */}
          <div className="space-y-4 md:space-y-6">
            <div className="space-y-4 md:space-y-6">
              <h1 className="text-emerald-700 text-2xl md:text-5xl font-bold leading-[1.1]">
                Penerimaan Peserta Didik Baru
              </h1>
              <div className="space-y-1">
                <h2 className="text-lg md:text-2xl font-bold text-emerald-700/90">
                  MI Ulumul Fadhol
                </h2>
                <p className="text-base md:text-lg text-emerald-700">
                  Madrasah Ibtidaiyah
                </p>
              </div>
            </div>
            <p className="text-gray-600 text-sm md:text-md leading-relaxed max-w-xl">
              Mari bergabung dengan keluarga besar MI Ulumul Fadhol. Kami membuka pendaftaran untuk tahun ajaran baru dengan konsep pendidikan yang mengutamakan akhlakul karimah dan prestasi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-6">
              {/* Tombol pendaftaran */}
              <Link
                to="/pendaftaran"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 sm:px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 text-center shadow-lg hover:shadow-xl"
              >
                Daftar Sekarang!
              </Link>
              {/* Tombol masuk */}
              <Link
                to="/login"
                className="bg-gray-100 hover:bg-gray-200 text-emerald-700 px-6 sm:px-8 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center shadow-md hover:shadow-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                Masuk
              </Link>
            </div>
          </div>

          {/* Bagian kanan - Gambar */}
          <div className="block relative mt-0">
            {/* Hiasan di belakang gambar */}
            <div className="absolute -top-6 -right-6 w-56 md:w-72 h-56 md:h-72 bg-[#434794]/10 rounded-full blur-sm"></div>
            <div className="absolute -bottom-8 -left-8 w-48 md:w-64 h-48 md:h-64 bg-blue-100 rounded-full blur-sm"></div>
            <div className="absolute top-1/2 -right-4 w-20 md:w-24 h-20 md:h-24 bg-yellow-100 rounded-full transform -translate-y-1/2 blur-sm"></div>
            
            {/* Gambar utama */}
            <div className="relative z-10 p-2 md:p-0">
              <img
                src={assets.hero}
                alt="Ilustrasi Sekolah MI Ulumul Fadhol"
                className="w-full h-auto object-cover rounded-xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero