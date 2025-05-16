import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../../../components/Table/Table';
import usePendaftarColumns from '../../../components/TableColumns/PendaftarColumns';
import { getAllPendaftaran } from '../../../services/pendaftar.service';
/**
 * Halaman Data Pendaftar untuk menampilkan daftar pendaftar
 * Menampilkan informasi pendaftar dalam format tabel
 * dengan kolom: No. Pendaftaran, Nama, Jenis Kelamin, Alamat, Asal Sekolah, Dokumen, dan Waktu Daftar
 */
const DataPendaftarKepalaSekolah = () => {
    // State untuk status sidebar
    const [isCollapsed, setIsCollapsed] = useState(false);
    const navigate = useNavigate();

    // Listen untuk event toggle sidebar
    useEffect(() => {
        const handleToggle = () => setIsCollapsed(!isCollapsed);
        window.addEventListener('toggleSidebar', handleToggle);
        return () => window.removeEventListener('toggleSidebar', handleToggle);
    }, [isCollapsed]);

    // State untuk data pendaftar
    const [dataPendaftar, setDataPendaftar] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllPendaftaran();
                setDataPendaftar(data);
                setIsLoading(false);
            } catch (err) {
                setError('Terjadi kesalahan saat mengambil data pendaftar');
                setIsLoading(false);
                console.error(err);
            }
        };

        fetchData();
    }, []);

    if (isLoading) return <div className="text-center py-4">Memuat data...</div>;
    if (error) return <div className="text-center text-red-500 py-4">{error}</div>;

    // Menggunakan kolom dari komponen terpisah dengan opsi showActions
    const columns = usePendaftarColumns();

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="px-2 mb-4">
                <h1 className="text-2xl font-semibold text-gray-800">
                    Data Pendaftar
                </h1>
                <p className="mt-2 text-sm text-gray-600">Daftar calon siswa yang telah mendaftar</p>
            </div>

            {/* Tabel dengan container responsif */}
            <div className="flex justify-center">
                <div className="w-full">
                    <Table 
                        data={dataPendaftar}
                        columns={columns}
                        showCheckbox={false}
                        isSidebarOpen={!isCollapsed}
                    />
                </div>
            </div>
        </div>
    );
};

export default DataPendaftarKepalaSekolah;
