import api from "./api.service"

export const uploadDokumen = async (id_pendaftaran, files) => {
    try {
        const response = await api.put(`/pendaftaran/upload-dokumen/${id_pendaftaran}`, files);
        return response.data;
    } catch (error) {
        console.error('Error upload dokumen:', error);
        throw new Error(error?.response?.data?.message || 'Terjadi kesalahan saat mengupload dokumen');
    }
}
