import axios from 'axios';

// Base URL untuk API
export const baseURL = 'http://localhost:5000';

// Buat instance axios dengan konfigurasi default
const api = axios.create({
    baseURL: `${baseURL}/api`,
    timeout: 30000, // Naikkan timeout (mobile butuh waktu lebih lama)
    headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache' // Hindari cache yang korup
    },
    withCredentials: false // Matikan jika tidak pakai auth
});

// Tambahkan interceptor untuk mengambil token terbaru setiap request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.code === 'ERR_NETWORK') {
            // Jaringan mobile tidak stabil
            return Promise.reject({
                message: 'Koneksi terputus. Coba lagi!'
            });
        }
        return Promise.reject(error);
    }
);

export default api;
