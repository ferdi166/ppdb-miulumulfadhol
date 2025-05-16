import User from '../models/user.model.js';
import GrupUser from '../models/grup_user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import moment from 'moment-timezone';

// Set default timezone ke Indonesia/Jakarta
moment.tz.setDefault('Asia/Jakarta');

// Controller untuk login user
export const login = async (req, res) => {
    try {
        // Ambil data dari request body
        const { username, password } = req.body;

        // Cari user berdasarkan username
        const user = await User.findOne({
            where: { username },
            include: [GrupUser]
        });

        // Jika user tidak ditemukan
        if (!user) {
            return res.status(404).json({
                status: false,
                message: "Username tidak ditemukan"
            });
        }

        // Verifikasi password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({
                status: false,
                message: "Password salah"
            });
        }

        // Generate token JWT
        const token = jwt.sign(
            { 
                userId: user.id_user,
                username: user.username,
                fullname: user.fullname,
                foto: user.foto,
                grupUser: user.grup_user.id_grup_user,
                nomor_telepon: user.nomor_telepon,
                alamat: user.alamat,
                jenis_kelamin: user.jenis_kelamin
            },
            'your_jwt_secret_key',
            { expiresIn: '24h' }
        );

        // Kirim response sukses
        res.status(200).json({
            status: true,
            message: "Login berhasil",
            data: {
                token: token
            }
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Terjadi kesalahan saat login",
            error: error.message
        });
    }
}