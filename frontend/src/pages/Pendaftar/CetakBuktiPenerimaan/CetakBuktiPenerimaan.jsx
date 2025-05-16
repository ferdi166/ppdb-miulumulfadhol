import React, { useState, useEffect } from 'react';
import { FaPrint } from 'react-icons/fa';
import { getCurrentUser } from '../../../services/user.service';
import { getPendaftaranByUserId } from '../../../services/pendaftar.service';
import { baseURL } from '../../../services/api.service';

/**
 * Komponen untuk menampilkan dan mencetak bukti penerimaan siswa
 * Responsif untuk tampilan mobile dan desktop
 */
const CetakBuktiPenerimaan = () => {
    const [dataSiswa, setDataSiswa] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const currentUser = getCurrentUser();
                if (!currentUser) {
                    setError('User tidak ditemukan');
                    return;
                }

                const data = await getPendaftaranByUserId(currentUser.id_user);                
                // Cari foto dari dokumen
                const fotoDokumen = data.dokumen.find(d => d.nama === 'Foto');

                setDataSiswa({
                    noPendaftaran: data.no_pendaftaran,
                    nama: data.nama_siswa,
                    tempatTanggalLahir: data.ttl,
                    sekolahAsal: data.nama_asal_sekolah || '-',
                    namaOrangTua: data.nama_orang_tua || '-',
                    alamat: data.alamat,
                    noTelp: data.nomor_telepon || '-',
                    foto: fotoDokumen?.file || '-',
                });
            } catch (err) {
                setError('Gagal mengambil data pendaftaran');
                console.error('Error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleCetak = () => {
        window.print();
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                <span className="ml-3 text-gray-600">Memuat data...</span>
            </div>
        );
    }

    if (error || !dataSiswa) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="text-red-500 text-lg mb-2">❌</div>
                    <div className="text-gray-600">{error || 'Data tidak ditemukan'}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-2 sm:px-4">
            {/* Header Halaman */}
            <div className="bg-white rounded-xl p-4 sm:p-8 print:p-0 print:bg-white">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 mb-6">
                    <h1 className="text-lg sm:text-xl font-semibold text-gray-800">Cetak Bukti Penerimaan</h1>
                    <button
                        onClick={handleCetak}
                        className="flex items-center gap-2 px-4 sm:px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors print:hidden w-full sm:w-auto justify-center"
                    >
                        <FaPrint />
                        <span>CETAK</span>
                    </button>
                </div>

                {/* Wrapper Preview */}
                <div className="bg-gray-100 rounded-xl p-2 sm:p-8 print:p-0 print:bg-white overflow-x-auto">
                    {/* Preview Formulir Penerimaan */}
                    <div className="bg-white rounded-lg shadow-lg mx-auto w-full sm:w-[210mm] min-h-[297mm] relative">
                        {/* Header Formulir Penerimaan */}
                        <div className="p-4 sm:p-8 sm:py-16">
                            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
                                <div className="flex-shrink-0 sm:ml-12">
                                    <img 
                                        src="/logo.png" 
                                        alt="Logo Sekolah"
                                        className="w-16 h-16 sm:w-24 sm:h-24 object-contain" 
                                    />
                                </div>
                                <div className="flex-1 text-center">
                                    <h1 className="text-base sm:text-lg font-semibold mb-2">FORMULIR PENERIMAAN</h1>
                                    <h1 className="text-base sm:text-lg font-semibold mb-2">CALON PESERTA DIDIK BARU MI ULUMUL FADHOL</h1>
                                    <h1 className="text-base sm:text-lg font-semibold mb-1">TAHUN AJARAN 2025/2026</h1>
                                </div>
                            </div>
                        </div>

                        {/* Data Siswa */}
                        <div className="px-4 sm:px-12 pb-8 space-y-4 sm:space-y-6">
                            <div className="flex flex-col sm:flex-row sm:items-baseline">
                                <div className="w-full sm:w-64 font-medium sm:font-normal">1. No. Pendaftaran</div>
                                <div className="flex-1 mt-1 sm:mt-0">
                                    <span className="mr-4 hidden sm:inline">:</span>
                                    <span className="border-b-2 border-gray-400 pb-0.5 inline-block w-full sm:w-[95%]">{dataSiswa.noPendaftaran}</span>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-baseline">
                                <div className="w-full sm:w-64 font-medium sm:font-normal">2. Nama Calon Siswa</div>
                                <div className="flex-1 mt-1 sm:mt-0">
                                    <span className="mr-4 hidden sm:inline">:</span>
                                    <span className="border-b-2 border-gray-400 pb-0.5 inline-block w-full sm:w-[95%]">{dataSiswa.nama}</span>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-baseline">
                                <div className="w-full sm:w-64 font-medium sm:font-normal">3. Tempat, Tanggal Lahir</div>
                                <div className="flex-1 mt-1 sm:mt-0">
                                    <span className="mr-4 hidden sm:inline">:</span>
                                    <span className="border-b-2 border-gray-400 pb-0.5 inline-block w-full sm:w-[95%]">{dataSiswa.tempatTanggalLahir}</span>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-baseline">
                                <div className="w-full sm:w-64 font-medium sm:font-normal">4. Sekolah Asal</div>
                                <div className="flex-1 mt-1 sm:mt-0">
                                    <span className="mr-4 hidden sm:inline">:</span>
                                    <span className="border-b-2 border-gray-400 pb-0.5 inline-block w-full sm:w-[95%]">{dataSiswa.sekolahAsal}</span>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-baseline">
                                <div className="w-full sm:w-64 font-medium sm:font-normal">5. Nama Orang Tua</div>
                                <div className="flex-1 mt-1 sm:mt-0">
                                    <span className="mr-4 hidden sm:inline">:</span>
                                    <span className="border-b-2 border-gray-400 pb-0.5 inline-block w-full sm:w-[95%]">{dataSiswa.namaOrangTua}</span>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-baseline">
                                <div className="w-full sm:w-64 font-medium sm:font-normal">6. Alamat Rumah</div>
                                <div className="flex-1 mt-1 sm:mt-0">
                                    <span className="mr-4 hidden sm:inline">:</span>
                                    <span className="border-b-2 border-gray-400 pb-0.5 inline-block w-full sm:w-[95%]">{dataSiswa.alamat}</span>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-baseline">
                                <div className="w-full sm:w-64 font-medium sm:font-normal">7. No. Telp/HP</div>
                                <div className="flex-1 mt-1 sm:mt-0">
                                    <span className="mr-4 hidden sm:inline">:</span>
                                    <span className="border-b-2 border-gray-400 pb-0.5 inline-block w-full sm:w-[95%]">{dataSiswa.noTelp}</span>
                                </div>
                            </div>
                        </div>

                        {/* Foto Siswa */}
                        <div className="flex justify-center sm:justify-end px-4 sm:px-12 mt-8 sm:mt-32 pb-8 sm:pb-0">
                            <div className="w-24 h-32 sm:w-32 sm:h-40 border-2 border-gray-400 flex items-center justify-center bg-gray-50">
                                {dataSiswa.foto && dataSiswa.foto !== '-' ? (
                                    <img 
                                        src={`${baseURL}/uploads/pendaftar/${dataSiswa.foto}`}
                                        alt="Foto Siswa"
                                        className="w-full h-full object-contain" 
                                    />
                                ) : (
                                    <div className="text-gray-400 text-sm text-center p-2">
                                        Foto belum diupload
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Print Styles */}
                <style dangerouslySetInnerHTML={{ __html: `
                    @media print {
                        @page {
                            size: A4;
                            margin: 0;
                        }
                        body * {
                            visibility: hidden;
                        }
                        .bg-white.rounded-lg.shadow-lg,
                        .bg-white.rounded-lg.shadow-lg * {
                            visibility: visible;
                        }
                        .bg-white.rounded-lg.shadow-lg {
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 210mm;
                            min-height: 297mm;
                            margin: 0;
                            padding: 0;
                            box-shadow: none !important;
                            border-radius: 0 !important;
                        }
                        .bg-gray-100 {
                            background: white !important;
                            padding: 0 !important;
                        }
                    }
                `}} />

            </div>
        </div>
    );
};

export default CetakBuktiPenerimaan;
