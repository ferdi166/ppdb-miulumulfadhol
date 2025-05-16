import api from './api.service'

export const getTotalPendaftar = async () => {
    try {
        const response = await api.get('/pendaftaran/total-pendaftar');
        return response.data;
    } catch (error) {
        console.error('Error fetching total pendaftar:', error);
        throw error;
    }
}
