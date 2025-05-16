import api from "./api.service";

export const konfirmasiPenerimaan = async (id_pendaftaran) => {
    try {
        const response = await api.put(`/pendaftaran/konfirmasi-penerimaan/${id_pendaftaran}`);
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message || 'Terjadi kesalahan saat konfirmasi penerimaan');
    }
};