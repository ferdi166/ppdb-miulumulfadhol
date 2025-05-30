import { jwtDecode } from "jwt-decode";
import api from "./api.service";

// Fungsi untuk mendapatkan data user dari token
export const getCurrentUser = () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) return null;
        const decoded = jwtDecode(token);
        return {
            id_user: decoded.userId,
            username: decoded.username,
            fullname: decoded.fullname,
            foto: decoded.foto,
            grup_user: {
                id_grup_user: decoded.grupUser,
                nama_grup_user: decoded.grupUser === 1 ? 'Admin' : 
                              decoded.grupUser === 2 ? 'Kepala Sekolah' : 
                              'Pendaftar'
            },
            nomor_telepon: decoded.nomor_telepon || '-',
            alamat: decoded.alamat || '-',
            jenis_kelamin: decoded.jenis_kelamin === 1 ? 'Laki-laki' : 'Perempuan'
        };
    } catch {
        localStorage.removeItem('token');
        return null;
    }
};

export const getAllUser = async () => {
    try {
        const response = await api.get('/user');
        const users = response.data.data;
        const transformedData = users.map(item => ({
            id_user: item.id_user,
            username: item.username,
            password: item.password,
            fullname: item.fullname,
            nomor_telepon: item.nomor_telepon,
            alamat: item.alamat,
            foto: item.foto,
            jenis_kelamin: item.jenis_kelamin === 1 ? 'Laki-laki' : 'Perempuan',
            id_grup_user: item.grup_user?.nama || 'Tidak ada grup'
        }))
        return transformedData;
    } catch (error) {
        console.error('Error fetching pendaftaran:', error);
        throw error;
    }
}

export const getUserById = async (id_user) => {
    try {
        const response = await api.get(`/user/${id_user}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
}

export const updateUser = async (id_user, data) => {
    try {
        // Buat FormData untuk mengirim file
        const formData = new FormData();
        
        // Tambahkan semua field ke FormData
        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        });

        const response = await api.put(`/user/${id_user}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}