import React, { useState, useEffect } from 'react'
import Background from '../../components/background/background'
import { getJadwalPendaftaranById } from '../../services/penjadwalan.service'
import moment from 'moment-timezone'

/**
 * Halaman untuk menampilkan pengumuman hasil seleksi
 * Menampilkan tombol untuk membuka file hasil seleksi di tab baru
 */
const Pengumuman = () => {
  const [isPengumumanAktif, setIsPengumumanAktif] = useState(false)
  const [loading, setLoading] = useState(true)

  // Cek jadwal pengumuman saat komponen dimount
  useEffect(() => {
    const cekJadwalPengumuman = async () => {
      try {
        const jadwalPengumuman = await getJadwalPendaftaranById(3) // ID 3 untuk pengumuman hasil seleksi
        if (jadwalPengumuman) {
          const now = moment().tz('Asia/Jakarta')
          const mulai = moment.tz(jadwalPengumuman.tanggal_mulai, 'Asia/Jakarta')
          const selesai = moment.tz(jadwalPengumuman.tanggal_selesai, 'Asia/Jakarta')

          setIsPengumumanAktif(now.isBetween(mulai, selesai))
        }
      } catch (error) {
        console.error('Error mengecek jadwal pengumuman:', error)
        setIsPengumumanAktif(false)
      } finally {
        setLoading(false)
      }
    }

    cekJadwalPengumuman()
  }, [])

  // Fungsi untuk membuka hasil seleksi di tab baru
  const handleLihatHasil = () => {
    window.open('/lihat-pengumuman', '_blank')
  }

  return (
    <main className="min-h-screen overflow-hidden">
      {/* Header dengan background */}
      <div className="bg-emerald-700 relative overflow-hidden h-72">
        <Background />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative h-full flex items-center">
          <div className="text-center w-full">
            <h2 className="text-3xl font-bold text-white mb-4">PENGUMUMAN</h2>
            <p className="text-white/80">
              Pengumuman hasil seleksi penerimaan peserta didik baru.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto mt-16 px-4">
        {loading ? (
          <div className="text-center">
            <p>Memuat...</p>
          </div>
        ) : !isPengumumanAktif ? (
          <div className="w-full bg-red-200 rounded p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">PENGUMUMAN BELUM DIBUKA</h2>
            <p className="text-gray-600">Mohon menunggu hingga jadwal pengumuman dibuka sesuai dengan timeline yang telah ditentukan. Silahkan cek kembali di lain waktu.</p>
          </div>
        ) : (
          <div className="border border-gray-300 rounded-lg p-6">
            {/* Hasil Seleksi */}
            <div className="bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold text-emerald-700 mb-4">
                Pengumuman Hasil Seleksi
              </h3>

              {/* Informasi pengumuman */}
              <div className="space-y-4 mb-8 text-gray-600">
                <p>
                  Kepada seluruh calon peserta didik baru yang telah mendaftar,
                  hasil seleksi penerimaan peserta didik baru dapat dilihat melalui tombol di bawah ini.
                </p>
              </div>

              {/* Tombol Lihat Hasil */}
              <button
                onClick={handleLihatHasil}
                className="flex items-center justify-center gap-2 w-full md:w-auto bg-emerald-700 text-white px-6 py-2.5 rounded-lg hover:bg-emerald-600 transition-colors duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                Lihat Hasil Seleksi
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default Pengumuman
