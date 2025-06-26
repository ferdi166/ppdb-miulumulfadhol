import axios from 'axios';

// Base URL untuk API
export const baseURL = 'http://localhost:5000';

// Buat instance axios dengan konfigurasi default
const api = axios.create({
    baseURL: `${baseURL}/api`,
    timeout: 10000
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

export default api;
