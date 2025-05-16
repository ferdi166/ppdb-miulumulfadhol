import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FormProvider from '../../../context/FormContext';
import FormPendaftaran from '../../../components/FormPendaftaran/FormPendaftaran';
import { getPendaftaranById } from '../../../services/pendaftar.service';

/**
 * Halaman Edit Data Pendaftar
 * Menggunakan FormProvider untuk state management form pendaftaran
 */
const EditDataPendaftar = () => {
    const { id } = useParams(); // Ambil ID dari URL
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getPendaftaranById(id);
                // Transform data untuk form
                const data = {
                    nik: response.data.nik,
                    namaSiswa: response.data.nama_siswa,
                    jenisKelamin: response.data.jenis_kelamin === 1 ? 'L' : 'P',
                    tempatLahir: response.data.tempat_lahir,
                    tanggalLahir: response.data.tanggal_lahir,
                    namaOrangTua: response.data.nama_orang_tua,
                    telepon: response.data.nomor_telepon,
                    alamat: response.data.alamat,
                    id_jenjang_asal_sekolah: response.data.id_jenjang_asal_sekolah.toString(),
                    nama_asal_sekolah: response.data.nama_asal_sekolah,
                    tahunLulus: response.data.tahun_lulus.toString()
                };
                setFormData(data);
            } catch (err) {
                console.error('Error fetching data:', err);
                alert('Gagal mengambil data pendaftar');
                navigate('/admin/data-pendaftar');
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [id, navigate]);

    // Tampilkan loading state
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
        );
    }

    return (
        <FormProvider mode="edit" pendaftaranId={id} initialData={formData}>
            <div className="px-4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold">Edit Data Pendaftar</h1>
                    <button
                        onClick={() => navigate('/admin/data-pendaftar')}
                        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                        Kembali
                    </button>
                </div>
                <FormPendaftaran isAdmin={true} />
            </div>
        </FormProvider>
    );
};

export default EditDataPendaftar;
