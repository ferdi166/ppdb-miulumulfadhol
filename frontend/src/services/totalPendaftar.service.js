import api from './api.service'

export const getTotalPendaftar = async () => {
    try {
        const response = await api.get('/pendaftaran/total-pendaftar');
        // Data yang dikembalikan sudah dalam format yang sesuai dari backend
        return response.data.data;
    } catch (error) {
        console.error('Error fetching total pendaftar:', error);
        throw error;
    }
}
