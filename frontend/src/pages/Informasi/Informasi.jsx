import React from 'react'
import Background from '../../components/background/background'
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop'
import { FaUserGraduate, FaMoneyBill, FaCalendarAlt, FaClipboardList, FaUsers } from 'react-icons/fa'

// Halaman untuk menampilkan informasi
const Informasi = () => {
  return (
    <main className="min-h-screen overflow-hidden">
      {/* Header dengan background */}
      <div className="bg-emerald-700 relative overflow-hidden h-48 md:h-72">
        <Background />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative h-full flex items-center">
          <div className="text-center w-full">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-4">INFORMASI</h2>
            <p className="text-sm md:text-base text-white/80 max-w-md mx-auto">
              Informasi lengkap mengenai penerimaan peserta didik baru.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Persyaratan PPDB */}
        <div className="p-4 md:p-8 bg-white rounded-xl shadow-lg">
          <h2 className="text-xl md:text-2xl font-bold text-emerald-700 mb-6 flex items-center gap-3">
            <FaClipboardList className="text-xl md:text-2xl" />
            Persyaratan Pendaftaran
          </h2>

          {/* Persyaratan Umum */}
          <div className="mb-8 bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200">
            <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="bg-emerald-100 p-2 rounded-lg">
                <FaUserGraduate className="text-emerald-700 text-lg md:text-xl" />
              </span>
              Persyaratan Umum
            </h3>
            <ul className="list-none space-y-3 text-gray-600 ml-2">              
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                <span className="text-sm md:text-base">Scan Kartu Keluarga (1 lembar)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                <span className="text-sm md:text-base">Scan Akta Kelahiran (1 lembar)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                <span className="text-sm md:text-base">Scan foto berwarna 3x4 (1 lembar)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                <span className="text-sm md:text-base">Scan KTP orang tua (1 lembar)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                <span className="text-sm md:text-base">Scan Ijazah terakhir (1 lembar)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                <span className="text-sm md:text-base">Scan Bukti Pembayaran (1 lembar)</span>
              </li>
            </ul>
          </div>

          {/* Biaya Pendaftaran */}
          <div className="mb-8 bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200">
            <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="bg-emerald-100 p-2 rounded-lg">
                <FaMoneyBill className="text-emerald-700 text-lg md:text-xl" />
              </span>
              Biaya Pendaftaran
            </h3>
            <div className="bg-white p-4 rounded-lg shadow-sm ml-2">
              <p className="text-base md:text-lg font-medium text-emerald-700">Rp 25.000</p>
              <p className="text-xs md:text-sm text-gray-500 mt-2">*Biaya pendaftaran tidak dapat dikembalikan</p>
            </div>
          </div>

          {/* Jadwal Pendaftaran */}
          {/* <div className="mb-8 bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200">
            <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="bg-emerald-100 p-2 rounded-lg">
                <FaCalendarAlt className="text-emerald-700 text-lg md:text-xl" />
              </span>
              Jadwal Pendaftaran
            </h3>
            <div className="bg-white p-4 rounded-lg shadow-sm ml-2">
              <p className="text-gray-600">1 Januari - 31 Maret 2025</p>
              <p className="text-sm text-gray-500 mt-4">*Pendaftaran ditutup jika kuota sudah terpenuhi</p>
            </div>
          </div> */}

          {/* Kuota Penerimaan */}
          <div className="mb-8 bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200">
            <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="bg-emerald-100 p-2 rounded-lg">
                <FaUsers className="text-emerald-700 text-lg md:text-xl" />
              </span>
              Kuota Penerimaan
            </h3>
            <div className="bg-white p-4 rounded-lg shadow-sm ml-2">
              <p className="text-gray-600">Kuota siswa baru: 40 siswa</p>
              <p className="text-sm text-gray-500 mt-4">*Kuota dapat berubah sesuai kebijakan sekolah</p>
            </div>
          </div>

          {/* Tahapan Seleksi */}
          <div className="mb-8 bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200">
            <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="bg-emerald-100 p-2 rounded-lg">
                <FaClipboardList className="text-emerald-700 text-lg md:text-xl" />
              </span>
              Tahapan Seleksi
            </h3>
            <div className="space-y-6 ml-2">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-semibold shadow-sm">1</div>
                <div>
                  <h4 className="font-medium text-gray-800">Pendaftaran Online</h4>
                  <p className="text-gray-600">Mengisi formulir pendaftaran secara online melalui website</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-semibold shadow-sm">2</div>
                <div>
                  <h4 className="font-medium text-gray-800">Verifikasi Berkas</h4>
                  <p className="text-gray-600">Panitia akan memeriksa berkas persyaratan yang telah diupload</p>
                </div>
              </div>              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-semibold shadow-sm">3</div>
                <div>
                  <h4 className="font-medium text-gray-800">Pengumuman</h4>
                  <p className="text-gray-600">Pengumuman hasil seleksi dapat dilihat melalui website</p>
                </div>
              </div>
            </div>
          </div>          
        </div>
      </div>

      {/* Tombol scroll ke atas */}
      <ScrollToTop />
    </main>
  )
}

export default Informasi
