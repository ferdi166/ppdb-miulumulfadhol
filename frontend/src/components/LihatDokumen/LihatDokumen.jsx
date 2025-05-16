import React from 'react';
import { IoClose } from 'react-icons/io5';
import { FaCheckCircle, FaTimesCircle, FaEye } from 'react-icons/fa';
import { baseURL } from '../../services/api.service';

/**
 * Komponen modal untuk menampilkan dan mengunduh dokumen pendaftar
 * 
 * @param {Object} props.data - Data dokumen pendaftar
 * @param {function} props.onClose - Fungsi untuk menutup modal
 * @param {boolean} props.isOpen - Status modal terbuka/tertutup
 */
const LihatDokumen = ({ data, onClose, isOpen }) => {
    if (!isOpen) return null;

    // Fungsi untuk melihat dokumen
    const handleLihatDokumen = (file) => {
        if (!file) {
            alert('Dokumen belum diupload');
            return;
        }
        // Buka file di tab baru (asumsi file disimpan di folder public)
        window.open(`${baseURL}/uploads/pendaftar/${file}`, '_blank');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-xl mx-4">
                {/* Header */}
                <div className="flex justify-between items-center p-5">
                    <h3 className="text-lg font-medium text-gray-900">
                        Detail Dokumen - {data?.nama || 'Pendaftar'}
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-1 text-gray-400 hover:text-gray-500"
                    >
                        <IoClose className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-5">
                    <h4 className="font-medium text-gray-700 mb-4">Status Dokumen</h4>
                    <div className="space-y-3">
                        {data?.dokumen?.map((dok, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center space-x-3">
                                    {dok.status === 'Lengkap' ? (
                                        <FaCheckCircle className="w-5 h-5 text-green-500" />
                                    ) : (
                                        <FaTimesCircle className="w-5 h-5 text-red-500" />
                                    )}
                                    <span className="text-gray-700">{dok.nama}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className={`px-2 py-1 text-sm rounded-full ${
                                        dok.status === 'Lengkap' 
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                    }`}>
                                        {dok.status}
                                    </span>
                                    <button
                                        onClick={() => handleLihatDokumen(dok.file)}
                                        className={`p-2 rounded-full ${
                                            dok.file 
                                                ? 'text-blue-600 hover:bg-blue-100' 
                                                : 'text-gray-400 cursor-not-allowed'
                                        }`}
                                        disabled={!dok.file}
                                    >
                                        <FaEye className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LihatDokumen;