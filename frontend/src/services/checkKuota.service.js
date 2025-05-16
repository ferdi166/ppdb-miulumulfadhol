import api from "./api.service";

// Service untuk mengecek kuota pendaftaran
export const checkKuotaPendaftaran = async () => {
    try {
        const response = await api.get('/pendaftaran/check-kuota');
        return response.data;
    } catch (error) {
        console.error('Error checking kuota:', error);
        throw error;
    }
};
