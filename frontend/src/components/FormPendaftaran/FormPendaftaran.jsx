import React, { useState, useEffect } from 'react'
import { FaUser, FaSchool } from 'react-icons/fa'
import { useFormStore } from '../../context/FormContext'
import Akun from '../Akun/Akun'
import { getJadwalPendaftaranById } from '../../services/penjadwalan.service'
import { checkKuotaPendaftaran } from '../../services/checkKuota.service'
import moment from 'moment-timezone'
import { toast } from 'react-toastify'

/**
 * Komponen untuk menampilkan formulir pendaftaran peserta didik baru
 * Menampilkan informasi akun setelah berhasil submit
 */
const FormPendaftaran = ({ mode = 'create' }) => {
  // State untuk tracking status submit dan kredensial akun
  const [isSuccess, setIsSuccess] = useState(false)
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [isJadwalAktif, setIsJadwalAktif] = useState(true)
  const [pesanJadwal, setPesanJadwal] = useState('')
  const [kuotaTersedia, setKuotaTersedia] = useState(true)
  const [infoKuota, setInfoKuota] = useState(null)
  
  // Menggunakan form context
  const { formData, errors, handleChange, handleSubmit: handleFormSubmit } = useFormStore()

  // Fungsi untuk mengecek kuota pendaftaran
  const cekKuotaPendaftaran = async () => {
    try {
      const response = await checkKuotaPendaftaran();
      setKuotaTersedia(response.data.kuotaTersedia);
      setInfoKuota(response.data);
    } catch (error) {
      console.error('Error mengecek kuota pendaftaran:', error);
      setKuotaTersedia(false);
    }
  };

  // Cek jadwal pendaftaran dan kuota saat komponen dimount dan hanya untuk pendaftaran baru
  useEffect(() => {
    const cekJadwalPendaftaran = async () => {
      // Skip pengecekan jika mode edit
      if (mode === 'edit') {
        setIsJadwalAktif(true);
        setKuotaTersedia(true);
        return;
      }

      try {
        const jadwalPendaftaran = await getJadwalPendaftaranById(1) // ID 1 untuk pendaftaran online
        if (jadwalPendaftaran) {
          const now = moment().tz('Asia/Jakarta')
          const mulai = moment.tz(jadwalPendaftaran.tanggal_mulai, 'Asia/Jakarta')
          const selesai = moment.tz(jadwalPendaftaran.tanggal_selesai, 'Asia/Jakarta')

          if (now.isBefore(mulai)) {
            setIsJadwalAktif(false)
            setPesanJadwal(`Pendaftaran akan dibuka pada ${mulai.format('DD MMMM YYYY HH:mm')}`);
          } else if (now.isAfter(selesai)) {
            setIsJadwalAktif(false)
            setPesanJadwal(`Pendaftaran telah ditutup pada ${selesai.format('DD MMMM YYYY HH:mm')}`);
          }
        };

        // Jika jadwal aktif dan mode create, cek kuota
        if (isJadwalAktif && mode === 'create') {
          await cekKuotaPendaftaran();
        }
      } catch (error) {
        console.error('Error mengecek jadwal pendaftaran:', error)
        setIsJadwalAktif(false)
        setPesanJadwal('Terjadi kesalahan saat mengecek jadwal pendaftaran')
      }
    }

    cekJadwalPendaftaran()
  }, [])

  // Handle submit form dengan menampilkan informasi akun
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Cek jadwal dan kuota hanya untuk mode create
    if (mode === 'create') {
      if (!isJadwalAktif) {
        toast.error(pesanJadwal)
        return
      }
      if (!kuotaTersedia) {
        toast.error('Mohon maaf, kuota pendaftaran sudah penuh')
        return
      }
    }
    
    try {
      // Panggil handleSubmit dari context
      const result = await handleFormSubmit(e)

      if (result.success) {
        if (result.message) {
          // Mode edit - tunggu toast muncul sebelum redirect (0.5 detik)
          setTimeout(() => {
            window.location.href = '/admin/data-pendaftar'
          }, 100)
        } else {
          // Mode create - tampilkan credentials
          setCredentials({
            username: result.nik,
            password: result.password
          })
          setIsSuccess(true)
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  // Tampilkan pesan jika kuota sudah penuh (hanya untuk mode create)
  if (mode === 'create' && !kuotaTersedia && infoKuota) {
    return (
      <div className="w-full bg-red-200 rounded p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">KUOTA PENDAFTARAN PENUH</h2>
        <p className="text-gray-600">
          Mohon maaf, kuota pendaftaran sudah penuh.<br />
          Total Kuota: {infoKuota.totalKuota}<br />
          Jumlah Pendaftar: {infoKuota.jumlahPendaftar}
        </p>
      </div>
    )
  }

  // Tampilkan pesan jika jadwal tidak aktif (hanya untuk mode create)
  if (mode === 'create' && !isJadwalAktif) {
    return (
      <div className="w-full bg-red-200 rounded p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">PENDAFTARAN SUDAH DITUTUP</h2>
        <p className="text-gray-600">Pendaftaran online Program Penerimaan Siswa Baru sudah ditutup.</p>
      </div>
    )
  }

  // Jika form berhasil disubmit, tampilkan komponen Akun
  if (isSuccess) {
    return (
      <Akun 
        username={credentials.username}
        password={credentials.password}
      />
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto border border-gray-300 rounded-lg w-full">
      <div className="space-y-8">
        {/* Data Pribadi */}
        <div className="p-6 rounded-lg">
          <h3 className="text-lg sm:text-xl font-semibold text-emerald-700 mb-4 sm:mb-6 flex items-center gap-2 border-b pb-3 sm:pb-4">
            <FaUser className="text-emerald-700 text-2xl" />
            Data Pribadi
          </h3>
          
          <div className="space-y-6">
            {/* NIK - 1 kolom penuh */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                NIK <span className="text-red-500">*</span>
              </label>
              <input
                type="text" 
                name="nik"
                value={formData.nik}
                onChange={(e) => {
                  // Hanya terima angka
                  const value = e.target.value.replace(/\D/g, '')
                  // Batasi maksimal 16 digit
                  if (value.length <= 16) {
                    handleChange({
                      target: {
                        name: 'nik',
                        value: value
                      }
                    })
                  }
                }}
                placeholder="Masukkan NIK 16 digit"
                maxLength="16"
                className={`w-full px-4 py-2.5 rounded-lg border ${errors.nik ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-emerald-700 focus:outline-none focus:border-transparent transition duration-200`}
                required
              />
              {errors.nik && (
                <p className="mt-1 text-sm text-red-500">{errors.nik}</p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                Masukkan 16 digit NIK sesuai KK
              </p>
            </div>

            {/* Nama Siswa - 1 kolom penuh */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                Nama Siswa <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="namaSiswa"
                value={formData.namaSiswa}
                onChange={handleChange}
                placeholder="Masukkan nama lengkap siswa"
                className={`w-full px-4 py-2.5 rounded-lg border ${errors.namaSiswa ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-emerald-700 focus:outline-none focus:border-transparent transition duration-200`}
                required
              />
              {errors.namaSiswa && (
                <p className="mt-1 text-sm text-red-500">{errors.namaSiswa}</p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                Masukkan nama lengkap sesuai KK (tanpa gelar)
              </p>
            </div>

            {/* Grid 2 kolom untuk tempat dan tanggal lahir */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                  Tempat Lahir <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="tempatLahir"
                  value={formData.tempatLahir}
                  onChange={handleChange}
                  placeholder="Masukkan tempat lahir"
                  className={`w-full px-4 py-2.5 rounded-lg border ${errors.tempatLahir ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-emerald-700 focus:outline-none focus:border-transparent transition duration-200`}
                  required
                />
                {errors.tempatLahir && (
                  <p className="mt-1 text-sm text-red-500">{errors.tempatLahir}</p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  Masukkan tempat lahir sesuai KK
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                  Tanggal Lahir <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="tanggalLahir"
                  value={formData.tanggalLahir}
                  onChange={handleChange}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border ${errors.tanggalLahir ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-emerald-700 focus:outline-none focus:border-transparent transition duration-200`}
                  required
                />
                {errors.tanggalLahir && (
                  <p className="mt-1 text-sm text-red-500">{errors.tanggalLahir}</p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  Umur harus 6-7 tahun
                </p>
              </div>
            </div>

            {/* Jenis Kelamin - menggunakan radio button */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                Jenis Kelamin <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-6">
                {/* Radio untuk Laki-laki */}
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="jenisKelamin"
                    value="L"
                    checked={formData.jenisKelamin === "L"}
                    onChange={handleChange}
                    className="w-4 h-4 text-emerald-700"
                    required
                  />
                  <span className="ml-2 text-gray-700">Laki-laki</span>
                </label>

                {/* Radio untuk Perempuan */}
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="jenisKelamin"
                    value="P"
                    checked={formData.jenisKelamin === "P"}
                    onChange={handleChange}
                    className="w-4 h-4 text-emerald-700"
                  />
                  <span className="ml-2 text-gray-700">Perempuan</span>
                </label>
              </div>
            </div>

            {/* Nama Orang Tua - 1 kolom penuh */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                Nama Orang Tua <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="namaOrangTua"
                value={formData.namaOrangTua}
                onChange={handleChange}
                placeholder="Masukkan nama lengkap orang tua"
                className={`w-full px-4 py-2.5 rounded-lg border ${errors.namaOrangTua ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-emerald-700 focus:outline-none focus:border-transparent transition duration-200`}
                required
              />
              {errors.namaOrangTua && (
                <p className="mt-1 text-sm text-red-500">{errors.namaOrangTua}</p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                Masukkan nama lengkap orang tua/wali (tanpa gelar)
              </p>
            </div>

            {/* Nomor Telepon - 1 kolom penuh */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                Nomor Telepon <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="telepon" 
                value={formData.telepon}
                onChange={(e) => {
                  // Hanya terima angka
                  const value = e.target.value.replace(/\D/g, '')
                  // Batasi maksimal 13 digit
                  if (value.length <= 13) {
                    handleChange({
                      target: {
                        name: 'telepon',
                        value: value
                      }
                    })
                  }
                }}
                placeholder="Contoh: 081234567890"
                maxLength="13"
                className={`w-full px-4 py-2.5 rounded-lg border ${errors.telepon ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-emerald-700 focus:outline-none focus:border-transparent transition duration-200`}
                required
              />
              {errors.telepon && (
                <p className="mt-1 text-sm text-red-500">{errors.telepon}</p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                Masukkan nomor telepon aktif yang bisa dihubungi
              </p>
            </div>                  

            {/* Alamat - 1 kolom penuh */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                Alamat Lengkap <span className="text-red-500">*</span>
              </label>
              <textarea
                name="alamat"
                value={formData.alamat}
                onChange={handleChange}
                rows="3"
                placeholder="Masukkan alamat lengkap"
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-700 focus:outline-none focus:border-transparent transition duration-200"
                required
              ></textarea>
            </div>
          </div>
        </div>

        {/* Data Sekolah Asal */}
        <div className="p-6 rounded-lg">
          <h3 className="text-lg sm:text-xl font-semibold text-emerald-700 mb-4 sm:mb-6 flex items-center gap-2 border-b pb-3 sm:pb-4">
            <FaSchool className="text-emerald-700 text-2xl" />
            Data Sekolah Asal
          </h3>
          
          <div className="space-y-6">
            {/* Grid 3 kolom untuk jenjang sekolah dan nama sekolah */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                  Jenjang Sekolah <span className="text-red-500">*</span>
                </label>
                <select
                  name="id_jenjang_asal_sekolah"
                  value={formData.id_jenjang_asal_sekolah}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-700 focus:outline-none focus:border-transparent transition duration-200"
                  required
                >
                  <option value="">Pilih Jenjang</option>
                  {/* Opsi jenjang sekolah akan diisi dari API */}
                  <option value="01">TK</option>
                  <option value="02">RA</option>                  
                </select>
              </div>

              <div className="col-span-1 sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                  Nama Sekolah Asal <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nama_asal_sekolah"
                  value={formData.nama_asal_sekolah}
                  onChange={handleChange}
                  placeholder="Masukkan nama sekolah asal"
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-700 focus:outline-none focus:border-transparent transition duration-200"
                  required
                />
              </div>
            </div>

            {/* Tahun Lulus - 1 kolom penuh */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                Tahun Lulus <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="tahunLulus"
                value={formData.tahunLulus}
                onChange={(e) => {
                  // Hanya terima angka
                  const value = e.target.value.replace(/\D/g, '')
                  // Batasi maksimal 4 digit dan minimal 2020
                  if (value.length <= 4) {
                    const year = parseInt(value) || 0
                    if (year <= 2100) { // Batasi tahun maksimal 2100
                      handleChange({
                        target: {
                          name: 'tahunLulus',
                          value: value
                        }
                      })
                    }
                  }
                }}
                placeholder="Contoh: 2025"
                maxLength="4"
                className={`w-full px-4 py-2.5 rounded-lg border ${errors.tahunLulus ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-emerald-700 focus:outline-none focus:border-transparent transition duration-200`}
                required
              />
              {errors.tahunLulus && (
                <p className="mt-1 text-sm text-red-500">{errors.tahunLulus}</p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                Masukkan tahun lulus (minimal 2020)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tombol Submit */}
      <div className="p-6">
        <button
          type="submit"
          className="w-full bg-emerald-700 text-white px-8 py-3 rounded-lg hover:bg-emerald-800 transition-colors duration-300 font-medium text-lg"
        >
          Simpan
        </button>
      </div>
    </form>
  )
}

export default FormPendaftaran