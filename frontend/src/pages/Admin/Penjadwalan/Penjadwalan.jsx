import React, { useState, useEffect } from 'react';
import Table from '../../../components/Table/Table';
import { FaEdit } from 'react-icons/fa';
import EditJadwal from './EditJadwal';
import { getAllJadwalPendaftaran } from '../../../services/penjadwalan.service';

/**
 * Halaman Data Penjadwalan untuk menampilkan daftar penjadwalan
 * Menampilkan informasi penjadwalan dalam format tabel
 */
const Penjadwalan = () => {
    // State untuk status sidebar dan modal
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedJadwal, setSelectedJadwal] = useState(null);

    // State untuk menyimpan data jadwal
    const [dataJadwal, setDataJadwal] = useState([]);

    // Fungsi untuk fetch data jadwal
    const fetchJadwal = async () => {
        try {
            const data = await getAllJadwalPendaftaran();
            setDataJadwal(data);
        } catch (error) {
            console.error('Error fetching jadwal:', error);
            alert('Gagal mengambil data jadwal');
        }
    };

    // Handle setelah jadwal berhasil diupdate
    const handleSubmit = () => {
        fetchJadwal(); // Refresh data setelah update
    };

    // Fungsi untuk menangani klik tombol edit dan membuka modal
    const handleEdit = (id) => {
        const jadwal = dataJadwal.find(jadwal => jadwal.id_jadwal_pendaftaran === id);
        setSelectedJadwal(jadwal);
        setShowModal(true);
    };

    // Fetch data jadwal saat komponen dimount
    useEffect(() => {
        fetchJadwal();
    }, []);

    // Konfigurasi kolom tabel
    const columns = [
        {
            header: 'No',
            accessor: 'id_jadwal_pendaftaran',
            render: (row) => (
                <span className="text-gray-700">{row.id_jadwal_pendaftaran}</span>
            )
        },
        {
            header: 'Tanggal Mulai',
            accessor: 'tanggal_mulai',
            render: (row) => (
                <span className="text-gray-700">{row.tanggal_mulai}</span>
            )
        },
        {
            header: 'Tanggal Selesai', 
            accessor: 'tanggal_selesai',
            render: (row) => (
                <span className="text-gray-700">{row.tanggal_selesai}</span>
            )
        },
        {
            header: 'Kegiatan',
            accessor: 'kegiatan',
            render: (row) => (
                <span className="text-gray-700">{row.kegiatan}</span>
            )
        },
        {
            header: 'Aksi',
            accessor: 'actions',
            render: (row) => (
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => handleEdit(row.id_jadwal_pendaftaran)}
                        className="p-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        title="Edit jadwal"
                    >
                        <FaEdit className="w-4 h-4" />
                    </button>
                </div>
            )
        }
    ];

    // Listen untuk event toggle sidebar
    useEffect(() => {
        const handleToggle = () => setIsCollapsed(!isCollapsed);
        window.addEventListener('toggleSidebar', handleToggle);
        return () => window.removeEventListener('toggleSidebar', handleToggle);
    }, [isCollapsed]);

    return (
        <>
            <div className="space-y-6">
                {/* Header */}
                <div className="px-2 mb-4">
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Data Penjadwalan
                    </h1>
                    <p className="mt-2 text-sm text-gray-600">Data penjadwalan</p>                
                </div>

                {/* Tabel dengan container responsif */}
                <div className="flex justify-center">
                    <div className="w-full">
                        <Table 
                            data={dataJadwal}
                            columns={columns}
                            showCheckbox={false}
                            isSidebarOpen={!isCollapsed}
                        />
                    </div>
                </div>
            </div>

            {/* Modal Edit User */}
            <EditJadwal 
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                jadwalData={selectedJadwal}
                onSubmit={handleSubmit}
            />
        </>
    );
};

export default Penjadwalan;
