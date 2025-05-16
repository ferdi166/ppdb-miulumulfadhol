import api from './api.service'

export const getTotalDiterima = async () => {
    try {
        const response = await api.get('/pendaftaran/total-pendaftar-diterima');
        return response.data;
    } catch (error) {
        console.error('Error fetching total diterima:', error);
        throw error;
    }
}
