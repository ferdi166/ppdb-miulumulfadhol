import React, { useState, useEffect } from 'react'
import Background from '../background/background'
import { getAllJadwalPendaftaran } from '../../services/penjadwalan.service'
import { formatRangeTanggal } from '../../utils/dateFormat'
import moment from 'moment-timezone'

// Komponen untuk menampilkan jadwal pendaftaran PPDB
const Jadwal = () => {
  // State untuk menyimpan data jadwal
  const [jadwalKegiatan, setJadwalKegiatan] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Format tanggal dan waktu

  const formatWaktu = (tanggalMulai, tanggalSelesai) => {
    const formatJam = 'HH:mm'
    const jamMulai = moment.tz(tanggalMulai, 'Asia/Jakarta').format(formatJam)
    
    if (tanggalSelesai) {
      const jamSelesai = moment.tz(tanggalSelesai, 'Asia/Jakarta').format(formatJam)
      return `${jamMulai} - ${jamSelesai} WIB`
    }
    return `${jamMulai} WIB`
  }

  // Mengambil data jadwal dari API
  useEffect(() => {
    const fetchJadwal = async () => {
      try {
        const data = await getAllJadwalPendaftaran()
        const formattedData = data.map((item, index) => ({
          no: index + 1,
          nama: item.kegiatan,
          tanggal: formatRangeTanggal(item.tanggal_mulai, item.tanggal_selesai),
          jam: formatWaktu(item.tanggal_mulai, item.tanggal_selesai)
        }))
        setJadwalKegiatan(formattedData)
        setLoading(false)
      } catch (err) {
        setError('Gagal memuat data jadwal')
        setLoading(false)
        console.error('Error:', err)
      }
    }

    fetchJadwal()
  }, [])

  return (
    <section className="py-10 md:py-16 bg-emerald-700 relative overflow-hidden">
      {/* Menggunakan komponen Background */}
      <Background />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Judul section */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4">JADWAL PENDAFTARAN</h2>
          <p className="text-sm md:text-base text-white/80 px-4">
            Berikut adalah jadwal Pendaftaran Peserta Didik Baru (PPDB) MI Ulumul Fadhol
            Tahun Ajaran 2025/2026
          </p>
        </div>

        {/* Tabel jadwal */}
        {loading ? (
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 text-center">
            <p className="text-gray-600">Memuat data jadwal...</p>
          </div>
        ) : error ? (
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 text-center">
            <p className="text-red-600">{error}</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Tampilan Mobile */}
            <div className="block md:hidden">
              {jadwalKegiatan.map((item) => (
                <div key={item.no} className="p-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-semibold text-sm">
                      {item.no}
                    </span>
                    <h3 className="font-medium text-gray-900">{item.nama}</h3>
                  </div>
                  <div className="ml-11 space-y-1">
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {item.tanggal}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {item.jam}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tampilan Desktop */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">No</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Kegiatan</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Tanggal</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Waktu</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {jadwalKegiatan.map((item) => (
                    <tr key={item.no} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-md text-gray-600">{item.no}</td>
                    <td className="px-6 py-4 text-md text-gray-600">{item.nama}</td>
                    <td className="px-6 py-4 text-md text-gray-600">{item.tanggal}</td>
                    <td className="px-6 py-4 text-md text-gray-600">{item.jam}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Jadwal