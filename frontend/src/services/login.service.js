import api from './api.service';
import { jwtDecode } from "jwt-decode";

// Service untuk login
export const login = async (data) => {
    try {
        const res = await api.post('/login', data);
        if (res.data.status) {
            const token = res.data.data.token;
            const decoded = jwtDecode(token);
            return {
                success: true,
                token: token,
                grupUser: decoded.grupUser
            };
        }
        return { success: false };
    } catch {
        return { success: false };
    }
};