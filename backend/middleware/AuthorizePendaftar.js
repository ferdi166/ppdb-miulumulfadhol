import User from '../models/user.model.js';
import GrupUser from '../models/grup_user.model.js';

// Middleware untuk mengecek apakah user adalah pendaftar
export const AuthorizePendaftar = async (req, res, next) => {
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

        // Cek apakah grup user adalah PENDAFTAR
        if (user.grup_user.id_grup_user !== 2) {
            return res.status(403).json({
                status: false,
                message: "Akses ditolak. Anda bukan pendaftar"
            });
        }

        // Jika admin, lanjutkan ke middleware/controller berikutnya
        next();
        
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Terjadi kesalahan saat mengotorisasi pendaftar",
            error: error.message
        });
    }
}