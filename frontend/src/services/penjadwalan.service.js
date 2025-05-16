import api from "./api.service";

export const getAllJadwalPendaftaran = async () => {
    try {
        const response = await api.get('/jadwal-pendaftaran');

        const data = response.data.data.map(item => ({
            id_jadwal_pendaftaran: item.id_jadwal_pendaftaran,
            tanggal_mulai: item.tanggal_mulai,
            tanggal_selesai: item.tanggal_selesai,
            kegiatan: item.kegiatan
        }))
        return data;
    } catch (error) {
        console.error('Error fetching pendaftaran:', error);
        throw error;
    }
}

export const getJadwalPendaftaranById = async (id_jadwal_pendaftaran) => {
    try {
        const response = await api.get(`/jadwal-pendaftaran/${id_jadwal_pendaftaran}`);
        // Response dari backend berupa single object, bukan array
        const item = response.data.data;
        return {
            id_jadwal_pendaftaran: item.id_jadwal_pendaftaran,
            tanggal_mulai: item.tanggal_mulai,
            tanggal_selesai: item.tanggal_selesai,
            kegiatan: item.kegiatan
        };
    } catch (error) {
        console.error('Error fetching jadwal pendaftaran:', error);
        throw error;
    }
}

export const updateJadwalPendaftaran = async (id_jadwal_pendaftaran, formData) => {
    try {
        const response = await api.put(`/jadwal-pendaftaran/${id_jadwal_pendaftaran}`, formData);
        return response.data;
    } catch (error) {
        console.error('Error updating jadwal pendaftaran:', error);
        throw error;
    }
}
