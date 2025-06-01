import User from '../models/user.model.js';
import GrupUser from '../models/grup_user.model.js';

// Middleware untuk mengecek apakah user adalah admin atau kepsek
export const AuthorizeAdminKepsek = async (req, res, next) => {
    try {
        // Ambil id_user dari request (yang sudah diset oleh VerifyToken middleware)
        const userId = req.userId;
        
        // Cari user beserta grup usernya
        const user = await User.findOne({
            where: { id_user: userId },
            include: [GrupUser]
        });

        // Jika user tidak ditemukan
        if (!user) {
            return res.status(404).json({
                status: false,
                message: "User tidak ditemukan"
            });
        }

        // Cek apakah user adalah admin atau kepsek
        if (user.grup_user.nama === 'ADMIN' || user.grup_user.nama === 'KEPALA SEKOLAH') {
            next();
        } else {
            return res.status(403).json({
                status: false,
                message: "Akses ditolak. Anda tidak memiliki izin."
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Terjadi kesalahan saat autorisasi: " + error.message
        });
    }
};
