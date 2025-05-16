import api from "./api.service";

export const getDayaTampung = async () => {
    try {
        const response = await api.get('/daya-tampung');
        return response.data.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message || 'Terjadi kesalahan saat mengambil data daya tampung');
    }
}

export const updateDayaTampung = async (id_daya_tampung, formData) => {
    try {
        const response = await api.put(`/daya-tampung/${id_daya_tampung}`, formData);
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message || 'Terjadi kesalahan saat memperbarui data daya tampung');
    }
}