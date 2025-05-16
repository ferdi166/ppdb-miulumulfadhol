import axios from 'axios';

// Base URL untuk API
export const baseURL = 'http://localhost:5000';

// Buat instance axios dengan konfigurasi default
const api = axios.create({
    baseURL: `${baseURL}/api`,
    timeout: 10000,
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
});

export default api;
