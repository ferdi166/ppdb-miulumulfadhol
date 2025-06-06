import api from "./api.service";
import moment from 'moment-timezone'

export const getPendaftaranBelumDiverifikasi = async () => {
    try {
        const response = await api.get('/pendaftaran/belum-diverifikasi');
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
            status: item.is_diterima === 0 ? 'Belum Diverifikasi' : '',
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
}