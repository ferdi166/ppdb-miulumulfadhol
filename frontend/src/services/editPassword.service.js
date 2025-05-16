import api from "./api.service";

export const editPassword = async (id_user, password) => {
    try {
        const response = await api.put(`/user/edit-password/${id_user}`, { password });
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message || 'Terjadi kesalahan saat mengubah password');
    }
}
