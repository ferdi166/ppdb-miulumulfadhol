import React, { useEffect, useState } from 'react'
import { getPendaftaranByUserId } from '../../../services/pendaftar.service'
import { getCurrentUser } from '../../../services/user.service'

const DashboardPendaftar = () => {
    const [formData, setFormData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const currentUser = getCurrentUser()
                if (!currentUser) {
                    setError('User tidak ditemukan')
                    return
                }

                const data = await getPendaftaranByUserId(currentUser.id_user)
                if (!data) {
                    setError('Data pendaftaran tidak ditemukan')
                    return
                }

                setFormData({
                    id: data.id,
                    no_pendaftaran: data.no_pendaftaran,
                    nama_lengkap: data.nama_siswa,
                    nik: data.nik || '-',
                    jenis_kelamin: data.jenis_kelamin,
                    tempat_lahir: data.tempat_lahir,
                    tanggal_lahir: data.tanggal_lahir,
                    ttl: data.ttl,
                    alamat: data.alamat,
                    sekolah_tujuan: data.daya_tampung,
                    status_pendaftaran: data.status,
                    waktu_daftar: data.waktu_daftar,
                    dokumen_kk: data.dokumen.find(d => d.nama === 'Kartu Keluarga')?.status === 'Lengkap',
                    dokumen_akta: data.dokumen.find(d => d.nama === 'Akte Kelahiran')?.status === 'Lengkap',
                    dokumen_ijazah: data.dokumen.find(d => d.nama === 'Ijazah')?.status === 'Lengkap',
                    dokumen_bukti_pembayaran: data.dokumen.find(d => d.nama === 'Bukti Pembayaran')?.status === 'Lengkap',
                    dokumen_ktp_ortu: data.dokumen.find(d => d.nama === 'KTP Orang Tua')?.status === 'Lengkap',
                    dokumen_foto: data.dokumen.find(d => d.nama === 'Foto')?.status === 'Lengkap',
                    dokumen_lengkap: data.dokumen.every(d => d.status === 'Lengkap')
                })
            } catch (err) {
                setError('Gagal mengambil data pendaftaran')
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    // Fungsi format tanggal sederhana
    const formatTanggal = (tanggal) => {
        if (!tanggal) return '-'
        const [tahun, bulan, hari] = tanggal.split('-')
        return `${hari}/${bulan}/${tahun}`
    }

    // Menghitung progress pendaftaran
    const calculateProgress = () => {
        if (!formData) return 0
        
        // Daftar semua dokumen yang diperlukan
        const requiredDocs = [
            'dokumen_ijazah',           // Dokumen Ijazah
            'dokumen_bukti_pembayaran', // Dokumen Bukti Pembayaran
            'dokumen_ktp_ortu',         // Dokumen KTP Orang Tua
            'dokumen_kk',               // Dokumen KK
            'dokumen_akta',             // Dokumen Akta
            'dokumen_foto'              // Dokumen Foto
        ]

        // Hitung jumlah dokumen yang sudah diupload
        const uploadedDocs = requiredDocs.filter(doc => formData[doc]).length
        
        // Hitung persentase (pembulatan ke bawah)
        const progress = Math.floor((uploadedDocs / requiredDocs.length) * 100)
        
        return progress
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                <span className="ml-3">Memuat data...</span>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Error! </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            </div>
        )
    }

    if (!formData) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Perhatian! </strong>
                    <span className="block sm:inline">Data pendaftaran belum tersedia</span>
                </div>
            </div>
        )
    }

    return (
        <div className="px-2 space-y-6">
            {/* Status Dokumen Card */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-xl font-semibold mb-4">Status Dokumen</h2>
                <p className="text-gray-600 mb-4">Silakan lengkapi persyaratan pendaftaran</p>
                
                <div className="space-y-2 mb-4">                
                    <div className="flex items-center">
                        <div className={`w-4 h-4 rounded-full mr-2 ${formData.dokumen_lengkap ? 'bg-green-500' : 'bg-gray-300'}`} />
                        <span>Dokumen Lengkap</span>
                    </div>
                </div>

                <div className="mb-2">Progress: {calculateProgress()}%</div>
                {/* Custom Progress Bar */}
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-blue-500 transition-all duration-300"
                        style={{ width: `${calculateProgress()}%` }}
                    />
                </div>
            </div>

            {/* Data Diri Card */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-xl font-semibold mb-4">Data Diri</h2>
                <div className="space-y-4">
                    <DataRow label="NIK" value={formData.nik} />
                    <DataRow label="Nama Lengkap" value={formData.nama_lengkap} />
                    <DataRow 
                        label="Tempat, Tanggal Lahir" 
                        value={formData.ttl} 
                    />
                    <DataRow label="Alamat" value={formData.alamat} />                    
                    <DataRow 
                        label="Status Pendaftaran" 
                        value={formData.status_pendaftaran} 
                        className={
                            formData.status_pendaftaran === 'Diterima' 
                                ? 'text-green-600' 
                                : 'text-gray-700'
                        }
                    />
                </div>
            </div>
        </div>
    )
}

// Komponen untuk menampilkan baris data
const DataRow = ({ label, value, className = 'text-gray-700' }) => (
    <div className="flex">
        <div className="w-1/3 text-gray-600">{label}</div>
        <div className="w-2/3">: <span className={className}>{value || '-'}</span></div>
    </div>
)

export default DashboardPendaftar
