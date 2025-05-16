import React, { useState } from 'react';
import LihatDokumen from '../LihatDokumen/LihatDokumen';
import { baseURL } from '../../services/api.service';

/**
 * Komponen untuk mendefinisikan kolom-kolom tabel pendaftar yang diterima
 * @returns {Array} Array konfigurasi kolom untuk komponen Table
 */
const useDiterimaColumns = () => {
    return [
        {
            header: 'No. Pendaftaran',
            accessor: 'no_pendaftaran',
            render: (row) => (
                <span className="text-gray-700">{row.no_pendaftaran}</span>
            )
        },
        {
            header: 'Nama',
            accessor: 'nama_siswa',
            render: (row) => (
                <div className="flex items-center gap-3">
                    {/* Avatar placeholder */}
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        {row.foto ? (
                            <img 
                                src={`${baseURL}/uploads/pendaftar/${row.foto}`} 
                                alt={row.nama_siswa}
                                className="w-full h-full object-contain"
                            />
                        ) : (
                            <span className="text-gray-600 font-semibold">
                                {row.nama_siswa.charAt(0)}
                            </span>
                        )}
                    </div>                    
                    <div>
                        <div className="font-semibold text-gray-900">{row.nama_siswa}</div>                        
                    </div>
                </div>
            )
        },
        {
            header: 'No. Telepon',
            accessor: 'nomor_telepon',
            render: (row) => (
                <span className="text-gray-700">{row.nomor_telepon}</span>
            )
        },
        {
            header: 'Jenis Kelamin',
            accessor: 'jenis_kelamin',
            render: (row) => (
                <span className="text-gray-700">{row.jenis_kelamin}</span>
            )
        },
        {
            header: 'Tempat, Tanggal Lahir',
            accessor: 'ttl',
            render: (row) => (
                <span className="text-gray-700">{row.ttl}</span>
            )
        },
        {
            header: 'Alamat',
            accessor: 'alamat',
            render: (row) => (
                <span className="text-gray-700">{row.alamat}</span>
            )
        },
        {
            header: 'Status',
            accessor: 'status',
            render: (row) => (
                <span className={`px-3 py-1 rounded-full text-sm ${
                    row.status === 'Diterima' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                }`}>
                    {row.status}
                </span>
            )
        },
        // {
        //     header: 'Asal Sekolah',
        //     accessor: 'alamat',
        //     render: (row) => (
        //         <span className="text-gray-700">{row.alamat}</span>
        //     )
        // },
        {
            header: 'Dokumen',
            accessor: 'team',
            render: (row) => (
                <CellDokumen data={row} />
            )
        },
        {
            header: 'Waktu Diterima',
            accessor: 'waktu_diterima',
            render: (row) => (
                <span className="text-gray-700">{row.waktu_diterima}</span>
            )
        }
    ];
};

// Komponen untuk cell dokumen dengan modal sendiri
const CellDokumen = ({ data }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="text-blue-600 hover:text-blue-700 cursor-pointer"
            >
                Lihat Dokumen
            </button>
            <LihatDokumen
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                data={data}
            />
        </>
    );
};

export default useDiterimaColumns;
