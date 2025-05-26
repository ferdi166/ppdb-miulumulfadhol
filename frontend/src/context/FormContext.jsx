import React, { createContext, useContext, useState } from 'react'
import { createPendaftaran, updatePendaftaran } from '../services/pendaftar.service'
import moment from 'moment-timezone'
import { toast } from 'react-toastify'

// Membuat context untuk state form pendaftaran
const FormContext = createContext()

// Custom hook untuk menggunakan form context
export const useFormStore = () => {
  const context = useContext(FormContext)
  if (!context) {
    throw new Error('useFormStore harus digunakan di dalam FormProvider')
  }
  return context
}

// Provider component untuk form context
export const FormProvider = ({ children, mode = 'create', pendaftaranId = null, initialData = null }) => {
  // State untuk form data
  const [formData, setFormData] = useState(initialData || {
    nik: '',
    namaSiswa: '',
    jenisKelamin: '',
    tempatLahir: '',
    tanggalLahir: '',
    namaOrangTua: '',
    telepon: '',
    alamat: '',
    id_jenjang_asal_sekolah: '',
    nama_asal_sekolah: '',
    tahunLulus: ''
  })

  // State untuk error
  const [errors, setErrors] = useState({
    nik: '',
    namaSiswa: '',
    tempatLahir: '',
    namaOrangTua: '',
    telepon: '',
    tahunLulus: ''
  })

  // Fungsi untuk validasi NIK
  const validateNIK = (nik) => {
    if (nik.length !== 16) {
      return 'NIK harus 16 digit'
    }
    if (!/^\d+$/.test(nik)) {
      return 'NIK hanya boleh berisi angka'
    }
    return ''
  }

  // Fungsi untuk validasi nama (siswa dan orang tua)
  const validateNama = (nama, field) => {
    if (!nama) return ''

    if (nama.length < 3) {
      return `${field} minimal 3 karakter`
    }
    if (!/^[a-zA-Z\s.'-]+$/.test(nama)) {
      return `${field} hanya boleh berisi huruf, spasi, titik, petik, dan strip`
    }
    if (nama.length > 50) {
      return `${field} maksimal 50 karakter`
    }
    return ''
  }

  // Fungsi untuk validasi tempat lahir
  const validateTempatLahir = (tempat) => {
    if (!tempat) return ''

    if (tempat.length < 3) {
      return 'Tempat lahir minimal 3 karakter'
    }
    if (!/^[a-zA-Z\s,.'-]+$/.test(tempat)) {
      return 'Tempat lahir hanya boleh berisi huruf, spasi, titik, koma, petik, dan strip'
    }
    if (tempat.length > 50) {
      return 'Tempat lahir maksimal 50 karakter'
    }
    return ''
  }

  // Fungsi untuk validasi nomor telepon
  const validateTelepon = (telepon) => {
    if (telepon.length < 10 || telepon.length > 13) {
      return 'Nomor telepon harus 10-13 digit'
    }
    if (!/^\d+$/.test(telepon)) {
      return 'Nomor telepon hanya boleh berisi angka'
    }
    if (!telepon.startsWith('08')) {
      return 'Nomor telepon harus diawali dengan 08'
    }
    return ''
  }

  // Fungsi untuk validasi tahun lulus
  const validateTahunLulus = (tahun) => {
    if (!tahun) return ''

    const tahunNum = parseInt(tahun)
    const tahunSekarang = new Date().getFullYear()

    if (!/^\d{4}$/.test(tahun)) {
      return 'Tahun lulus harus 4 digit'
    }
    if (tahunNum < (tahunSekarang - 5)) {
      return 'Tahun lulus tidak boleh lebih dari 5 tahun yang lalu'
    }
    if (tahunNum > tahunSekarang) {
      return 'Tahun lulus tidak boleh lebih dari tahun sekarang'
    }
    return ''
  }

  // Fungsi untuk validasi tanggal lahir
  const validateTanggalLahir = (tanggal) => {
    if (!tanggal) return ''

    const tanggalLahir = moment(tanggal)
    const sekarang = moment()
    const umur = sekarang.diff(tanggalLahir, 'years')
    const minUmur = 6
    const maxUmur = 7

    if (tanggalLahir.isAfter(sekarang)) {
      return 'Tanggal lahir tidak boleh lebih dari hari ini'
    }
    if (umur < minUmur) {
      return `Umur minimal ${minUmur} tahun`
    }
    if (umur > maxUmur) {
      return `Umur maksimal ${maxUmur} tahun`
    }
    return ''
  }

  // Fungsi untuk menangani perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target

    // Validasi input
    if (name === 'nik') {
      const error = validateNIK(value)
      setErrors(prev => ({ ...prev, nik: error }))
    } else if (name === 'namaSiswa') {
      const error = validateNama(value, 'Nama siswa')
      setErrors(prev => ({ ...prev, namaSiswa: error }))
    } else if (name === 'tempatLahir') {
      const error = validateTempatLahir(value)
      setErrors(prev => ({ ...prev, tempatLahir: error }))
    } else if (name === 'namaOrangTua') {
      const error = validateNama(value, 'Nama orang tua')
      setErrors(prev => ({ ...prev, namaOrangTua: error }))
    } else if (name === 'telepon') {
      const error = validateTelepon(value)
      setErrors(prev => ({ ...prev, telepon: error }))
    } else if (name === 'tahunLulus') {
      const error = validateTahunLulus(value)
      setErrors(prev => ({ ...prev, tahunLulus: error }))
    } else if (name === 'tanggalLahir') {
      const error = validateTanggalLahir(value)
      setErrors(prev => ({ ...prev, tanggalLahir: error }))
    }

    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  // Fungsi untuk menangani pengiriman formulir
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validasi sebelum submit
    const nikError = validateNIK(formData.nik)
    const namaSiswaError = validateNama(formData.namaSiswa, 'Nama siswa')
    const tempatLahirError = validateTempatLahir(formData.tempatLahir)
    const namaOrangTuaError = validateNama(formData.namaOrangTua, 'Nama orang tua')
    const teleponError = validateTelepon(formData.telepon)
    const tahunLulusError = validateTahunLulus(formData.tahunLulus)

    // Set errors jika ada validasi yang gagal
    const newErrors = {
      nik: nikError,
      namaSiswa: namaSiswaError,
      tempatLahir: tempatLahirError,
      namaOrangTua: namaOrangTuaError,
      telepon: teleponError,
      tahunLulus: tahunLulusError
    }

    setErrors(newErrors)

    // Cek apakah ada error
    if (Object.values(newErrors).some(error => error !== '')) {
      return { success: false }
    }

    try {
      // Siapkan data untuk API
      const pendaftaranData = {
        nik: formData.nik,
        nama_siswa: formData.namaSiswa,
        jenis_kelamin: formData.jenisKelamin === 'L' ? 1 : 2,
        tempat_lahir: formData.tempatLahir,
        tanggal_lahir: moment(formData.tanggalLahir).tz('Asia/Jakarta').format('YYYY-MM-DD'),
        nama_orang_tua: formData.namaOrangTua,
        nomor_telepon: formData.telepon,
        alamat: formData.alamat,
        id_jenjang_asal_sekolah: formData.id_jenjang_asal_sekolah.toString(),
        nama_asal_sekolah: formData.nama_asal_sekolah,
        tahun_lulus: parseInt(formData.tahunLulus)
      }

      // Kirim data ke API berdasarkan mode
      let response;
      if (mode === 'edit') {
        response = await updatePendaftaran(pendaftaranId, pendaftaranData);
      } else {
        response = await createPendaftaran(pendaftaranData);
      }

      // Reset form jika mode create
      if (mode === 'create') {
        setFormData({
          nik: '',
          namaSiswa: '',
          jenisKelamin: '',
          tempatLahir: '',
          tanggalLahir: '',
          namaOrangTua: '',
          telepon: '',
          alamat: '',
          id_jenjang_asal_sekolah: '',
          nama_asal_sekolah: '',
          tahunLulus: ''
        })

        // Trigger refresh dashboard
        window.dispatchEvent(new Event('refresh_dashboard'))
      }

      setErrors({
        nik: '',
        namaSiswa: '',
        tempatLahir: '',
        namaOrangTua: '',
        telepon: '',
        tahunLulus: ''
      })

      // Return success dengan data berbeda berdasarkan mode
      const result = mode === 'edit' ? {
        success: true,
        message: 'Data berhasil diperbarui'
      } : {
        success: true,
        nik: response.data.akun.username,
        password: response.data.akun.password
      };

      // Tampilkan toast setelah data berhasil disimpan
      if (mode === 'edit') {
        toast.success(result.message);
      } else {
        toast.success('Pendaftaran berhasil dibuat!');
      }

      return result;
    } catch (error) {
      console.error('Error submitting form:', error)
      // Tampilkan alert untuk error dari API
      if (error.message === 'Mohon maaf, Anda sudah mendaftar') {
        toast.error(error.message)
      } else {
        toast.error(error.message || 'Terjadi kesalahan saat mengirim formulir')
      }
      return { success: false, error: error.message }
    }
  }

  // Nilai yang akan di-share ke komponen child
  const value = {
    formData,
    errors,
    handleChange,
    handleSubmit
  }

  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  )
}

export default FormProvider