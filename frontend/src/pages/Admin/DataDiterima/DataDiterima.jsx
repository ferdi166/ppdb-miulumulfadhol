import React, { useState, useEffect } from 'react';
import Table from '../../../components/Table/Table';
import useDiterimaColumns from '../../../components/TableColumns/DiterimaColumns';
import { getPendaftaranDiterima } from '../../../services/diterima.service';
/**
 * Halaman Data Diterima untuk menampilkan daftar penerimaan
 * Menampilkan informasi penerimaan dalam format tabel
 */
const DataDiterima = () => {
    // State untuk status sidebar
    const [isCollapsed, setIsCollapsed] = useState(false);
    // State untuk data pendaftar
    const [dataDiterima, setDataDiterima] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    // Listen untuk event toggle sidebar
    useEffect(() => {
        const handleToggle = () => setIsCollapsed(!isCollapsed);
        window.addEventListener('toggleSidebar', handleToggle);
        return () => window.removeEventListener('toggleSidebar', handleToggle);
    }, [isCollapsed]);



    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getPendaftaranDiterima();
                setDataDiterima(data);
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

    // Menggunakan kolom dari komponen terpisah
    const columns = useDiterimaColumns();

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="px-2 mb-4">
                <h1 className="text-2xl font-semibold text-gray-800">
                    Data Diterima
                </h1>
                <p className="mt-2 text-sm text-gray-600">Daftar calon siswa yang telah diterima</p>
            </div>

            {/* Tabel dengan container responsif */}
            <div className="flex justify-center">
                <div className="w-full">
                    <Table
                        data={dataDiterima}
                        columns={columns}
                        showCheckbox={false}
                        isSidebarOpen={!isCollapsed}
                    />
                </div>
            </div>
        </div>
    );
};

export default DataDiterima;