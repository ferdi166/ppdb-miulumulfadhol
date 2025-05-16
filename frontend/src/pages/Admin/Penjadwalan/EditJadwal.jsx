import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { updateJadwalPendaftaran } from '../../../services/penjadwalan.service';
import { toast } from 'react-toastify';

/**
 * Komponen Modal Edit Jadwal
 * @param {Object} props - Props komponen
 * @param {boolean} props.isOpen - Status modal terbuka/tertutup
 * @param {function} props.onClose - Fungsi untuk menutup modal
 * @param {Object} props.jadwalData - Data jadwal yang akan diedit
 * @param {function} props.onSubmit - Fungsi untuk handle submit form
 */
const EditJadwal = ({ isOpen, onClose, jadwalData, onSubmit }) => {
    if (!isOpen) return null;

    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // Ambil nilai form secara langsung
            const formValues = {
                tanggal_mulai: e.target.tanggal_mulai.value,
                tanggal_selesai: e.target.tanggal_selesai.value,
                kegiatan: e.target.kegiatan.value
            };

            // Validasi tanggal mulai harus lebih awal dari tanggal selesai
            const tanggalMulai = new Date(formValues.tanggal_mulai);
            const tanggalSelesai = new Date(formValues.tanggal_selesai);
            
            if (tanggalMulai >= tanggalSelesai) {
                setError('Tanggal mulai harus lebih awal dari tanggal selesai');
                return;
            }

            // Update jadwal menggunakan service
            await updateJadwalPendaftaran(jadwalData.id_jadwal_pendaftaran, formValues);
            toast.success('Jadwal berhasil diperbarui!');
            onSubmit(); // Callback setelah berhasil update
            onClose(); // Tutup modal
        } catch (error) {
            console.error('Error updating jadwal:', error);
            toast.error(error.message || 'Terjadi kesalahan saat mengupdate jadwal');
        }
    };

    return (
        <div className="fixed inset-0 z-[9999] overflow-y-auto flex items-center justify-center" style={{ isolation: 'isolate' }}>
            <div className="relative w-full max-w-xl px-4">
                <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" aria-hidden="true"></div>

                <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium text-gray-900">Edit Jadwal Pendaftaran</h3>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <FaTimes className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Form Edit Jadwal */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Tanggal Mulai</label>
                                    <input
                                        type="datetime-local"
                                        name="tanggal_mulai"
                                        defaultValue={jadwalData?.tanggal_mulai}
                                        className="mt-1 px-3 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Tanggal Selesai</label>
                                    <input
                                        type="datetime-local"
                                        name="tanggal_selesai"
                                        defaultValue={jadwalData?.tanggal_selesai}
                                        className="mt-1 px-3 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 outline-none"
                                        required
                                    />
                                </div>
                            </div>
                            {error && (
                                <p className="text-red-500 text-sm">
                                    {error}
                                </p>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Kegiatan</label>
                                <textarea
                                    name="kegiatan"
                                    defaultValue={jadwalData?.kegiatan}
                                    className="mt-1 px-3 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 outline-none"
                                    rows="3"
                                    readOnly
                                />
                            </div>

                            <div className="bg-gray-50 flex flex-col-reverse sm:flex-row-reverse gap-2">
                                <button
                                    type="submit"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2.5 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto"
                                >
                                    Simpan
                                </button>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2.5 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto"
                                >
                                    Batal
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditJadwal;