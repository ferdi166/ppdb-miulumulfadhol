import api from "./api.service";
import moment from 'moment-timezone';

export const getAllPendaftaran = async () => {
    try {
        const response = await api.get('/pendaftaran');
        // Transform data dari response API
        const transformedData = response.data.data.map(item => ({
            id: item.id_pendaftaran,
            no_pendaftaran: item.no_pendaftaran,
            nama_siswa: item.nama_siswa,
            jenis_kelamin: item.jenis_kelamin === 1 ? 'Laki-laki' : 'Perempuan',
            alamat: item.alamat,
            nomor_telepon: item.nomor_telepon,
            tempat_lahir: item.tempat_lahir,
            foto: item.dok_foto,
            tanggal_lahir: moment(item.tanggal_lahir).format('DD/MM/YYYY'),
            ttl: `${item.tempat_lahir}, ${moment(item.tanggal_lahir).format('DD/MM/YYYY')}`,
            daya_tampung: item.daya_tampung?.nama || '-',
            status: item.is_diterima === 1 ? 'Diterima' : 'Belum Diverifikasi',
            waktu_daftar: item.waktu_daftar,
            dokumen: [
                {
                    nama: 'Akte Kelahiran',
                    status: item.dok_akta ? 'Lengkap' : 'Belum Upload',
                    file: item.dok_akta
                },
                {
                    nama: 'Kartu Keluarga',
                    status: item.dok_kk ? 'Lengkap' : 'Belum Upload',
                    file: item.dok_kk
                },
                {
                    nama: 'Ijazah',
                    status: item.dok_ijazah ? 'Lengkap' : 'Belum Upload',
                    file: item.dok_ijazah
                },
                {
                    nama: 'Bukti Pembayaran',
                    status: item.dok_bukti_pembayaran ? 'Lengkap' : 'Belum Upload',
                    file: item.dok_bukti_pembayaran
                },
                {
                    nama: 'KTP Orang Tua',
                    status: item.dok_ktp_orang_tua ? 'Lengkap' : 'Belum Upload',
                    file: item.dok_ktp_orang_tua
                },
                {
                    nama: 'Foto',
                    status: item.dok_foto ? 'Lengkap' : 'Belum Upload',
                    file: item.dok_foto
                }
            ]
        }));
        return transformedData;
    } catch (error) {
        console.error('Error fetching pendaftaran:', error);
        throw error;
    }
};

export const getPendaftaranById = async (id_pendaftaran) => {
    try {
        const response = await api.get(`/pendaftaran/${id_pendaftaran}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching pendaftaran:', error);
        throw error;
    }
}

/**
 * Membuat pendaftaran baru
 * @param {Object} formData - Data pendaftaran
 * @param {string} formData.nik - NIK siswa (16 digit)
 * @param {string} formData.nama_siswa - Nama lengkap siswa
 * @param {string} formData.jenis_kelamin - Jenis kelamin (L/P)
 * @param {string} formData.tempat_lahir - Tempat lahir
 * @param {string} formData.tanggal_lahir - Tanggal lahir (YYYY-MM-DD)
 * @param {string} formData.nama_orang_tua - Nama orang tua/wali
 * @param {string} formData.nomor_telepon - Nomor telepon (10-13 digit)
 * @param {string} formData.alamat - Alamat lengkap
 * @param {number} formData.id_jenjang_asal_sekolah - ID jenjang asal sekolah
 * @param {string} formData.nama_asal_sekolah - Nama asal sekolah
 * @param {string} formData.tahun_lulus - Tahun lulus
 * @returns {Promise<Object>} Data pendaftaran dan akun
 */
export const createPendaftaran = async (formData) => {
    try {
        const response = await api.post('/pendaftaran', formData);
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message || 'Terjadi kesalahan saat membuat pendaftaran');
    }
}

// Mengambil data pendaftaran berdasarkan id_user
export const getPendaftaranByUserId = async (id_user) => {
    try {
        const response = await api.get(`/pendaftaran/user/${id_user}`);
        const item = response.data.data;
        
        // Transform data dari response API
        return {
            id: item.id_pendaftaran,
            no_pendaftaran: item.no_pendaftaran,
            nama_siswa: item.nama_siswa,
            nik: item.nik,
            jenis_kelamin: item.jenis_kelamin === 1 ? 'Laki-laki' : 'Perempuan',
            alamat: item.alamat,
            tempat_lahir: item.tempat_lahir,
            tanggal_lahir: moment(item.tanggal_lahir).format('DD/MM/YYYY'),
            ttl: `${item.tempat_lahir}, ${moment(item.tanggal_lahir).format('DD/MM/YYYY')}`,
            daya_tampung: item.daya_tampung?.nama || '-',
            nama_asal_sekolah: item.nama_asal_sekolah || '-',
            tahun_lulus: item.tahun_lulus || '-',
            nama_orang_tua: item.nama_orang_tua || '-',
            nomor_telepon: item.nomor_telepon || '-',
            foto: item.foto || '-',
            status: item.is_diterima === 1 ? 'Diterima' : 'Belum Diverifikasi',
            waktu_daftar: item.waktu_daftar,
            dokumen: [
                {
                    nama: 'Akte Kelahiran',
                    status: item.dok_akta ? 'Lengkap' : 'Belum Upload',
                    file: item.dok_akta
                },
                {
                    nama: 'Kartu Keluarga',
                    status: item.dok_kk ? 'Lengkap' : 'Belum Upload',
                    file: item.dok_kk
                },
                {
                    nama: 'Ijazah',
                    status: item.dok_ijazah ? 'Lengkap' : 'Belum Upload',
                    file: item.dok_ijazah
                },
                {
                    nama: 'Bukti Pembayaran',
                    status: item.dok_bukti_pembayaran ? 'Lengkap' : 'Belum Upload',
                    file: item.dok_bukti_pembayaran
                },
                {
                    nama: 'KTP Orang Tua',
                    status: item.dok_ktp_orang_tua ? 'Lengkap' : 'Belum Upload',
                    file: item.dok_ktp_orang_tua
                },
                {
                    nama: 'Foto',
                    status: item.dok_foto ? 'Lengkap' : 'Belum Upload',
                    file: item.dok_foto
                }
            ]
        };
    } catch (error) {
        throw error;
    }
};

export const updatePendaftaran = async (id_pendaftaran, formData) => {
    try {
        const response = await api.put(`/pendaftaran/${id_pendaftaran}`, formData);
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message || 'Terjadi kesalahan saat memperbarui pendaftaran');
    }
}
