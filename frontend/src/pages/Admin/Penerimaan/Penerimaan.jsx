import React, { useState, useEffect } from 'react';
import Table from '../../../components/Table/Table';
import usePendaftarColumns from '../../../components/TableColumns/PendaftarColumns';
import { FaSave } from 'react-icons/fa';
import { getPendaftaranBelumDiverifikasi } from '../../../services/belumDiverifikasi.service';
import { konfirmasiPenerimaan } from '../../../services/konfirmasipenerimaan.service';
import { getJadwalPendaftaranById } from '../../../services/penjadwalan.service';
import moment from 'moment-timezone';
import { toast } from 'react-toastify';
/**
 * Halaman Penerimaan untuk menampilkan dan memproses data pendaftar
 * yang akan diterima. Menampilkan informasi pendaftar dalam format tabel
 * dengan fitur checkbox untuk memilih data yang akan diproses.
 */
const Penerimaan = () => {
    // State untuk status sidebar dan data yang dipilih
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    // State untuk data pendaftar
    const [dataBelumDiverifikasi, setDataBelumDiverifikasi] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isJadwalAktif, setIsJadwalAktif] = useState(true);

    // Listen untuk event toggle sidebar
    useEffect(() => {
        const handleToggle = () => setIsCollapsed(!isCollapsed);
        window.addEventListener('toggleSidebar', handleToggle);
        return () => window.removeEventListener('toggleSidebar', handleToggle);
    }, [isCollapsed]);

    // Fungsi untuk menangani perubahan checkbox
    const handleCheckboxChange = (checked, id) => {
        if (checked) {
            setSelectedRows([...selectedRows, id]);
        } else {
            setSelectedRows(selectedRows.filter(rowId => rowId !== id));
        }
    };

    // Fungsi untuk menyimpan dan mengkonfirmasi penerimaan data yang dipilih
    const handleSimpanData = async () => {
        if (selectedRows.length === 0) {
            toast.error('Pilih minimal satu data untuk dikonfirmasi');
            return;
        }

        try {
            setIsLoading(true);
            // Proses semua data yang dipilih secara berurutan
            for (const id of selectedRows) {
                await konfirmasiPenerimaan(id);
            }

            toast.success('Berhasil mengkonfirmasi penerimaan');
            // Reset pilihan dan refresh data
            setSelectedRows([]);
            fetchData(); // Refresh data setelah konfirmasi
        } catch (error) {
            toast.error(error.message || 'Gagal mengkonfirmasi penerimaan');
        } finally {
            setIsLoading(false);
        }
    };

    // Fungsi untuk mengambil data pendaftar yang belum diverifikasi
    const fetchData = async () => {
        try {
            setIsLoading(true);
            const data = await getPendaftaranBelumDiverifikasi();
            setDataBelumDiverifikasi(data);
        } catch (err) {
            setError('Terjadi kesalahan saat mengambil data pendaftar');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    // Cek jadwal penerimaan
    const cekJadwalPenerimaan = async () => {
        try {
            const jadwalPenerimaan = await getJadwalPendaftaranById(2); // ID 2 untuk penerimaan
            if (jadwalPenerimaan) {
                const now = moment().tz('Asia/Jakarta');
                const mulai = moment.tz(jadwalPenerimaan.tanggal_mulai, 'Asia/Jakarta');
                const selesai = moment.tz(jadwalPenerimaan.tanggal_selesai, 'Asia/Jakarta');

                setIsJadwalAktif(now.isBetween(mulai, selesai));
            }
        } catch (error) {
            console.error('Error mengecek jadwal penerimaan:', error);
            setIsJadwalAktif(false);
        }
    };

    // Load data dan cek jadwal saat komponen dimount
    useEffect(() => {
        fetchData();
        cekJadwalPenerimaan();
    }, []);

    if (isLoading) return <div className="text-center py-4">Memuat data...</div>;
    if (error) return <div className="text-center text-red-500 py-4">{error}</div>;

    // Menggunakan kolom dari komponen terpisah
    const baseColumns = usePendaftarColumns();

    // Menggunakan kolom dari PendaftarColumns tanpa menambah kolom checkbox
    const columns = [...baseColumns];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="px-2 mb-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
                            Penerimaan
                        </h1>
                        <p className="mt-2 text-sm text-gray-600">
                            Pilih calon siswa yang akan diterima
                        </p>
                    </div>
                    <button
                        onClick={handleSimpanData}
                        disabled={selectedRows.length === 0 || !isJadwalAktif}
                        className={`flex items-center gap-2 w-full sm:w-auto justify-center px-4 py-2 rounded-lg text-white
                            ${selectedRows.length === 0 || !isJadwalAktif
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700'}`}
                        title={!isJadwalAktif ? 'Jadwal penerimaan sudah berakhir' : ''}
                    >
                        <FaSave className="w-4 h-4" />
                        Simpan Data
                    </button>
                </div>
            </div>

            {/* Tabel dengan container responsif */}
            <div className="flex justify-center">
                <div className="w-full">
                    <Table
                        data={dataBelumDiverifikasi}
                        columns={columns}
                        showCheckbox={true}
                        isSidebarOpen={!isCollapsed}
                        onCheckboxChange={handleCheckboxChange}
                        selectedRows={selectedRows}
                    />
                </div>
            </div>
        </div>
    );
};

export default Penerimaan;
