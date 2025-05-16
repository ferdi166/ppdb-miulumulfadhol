import User from '../models/user.model.js';
import GrupUser from '../models/grup_user.model.js';
import bcrypt from 'bcrypt';
import fs from 'fs';
import path from 'path';

/**
 * Controller untuk mengelola data user
 */

/**
 * Mendapatkan semua data user
 * @param {Request} req - Express Request
 * @param {Response} res - Express Response
 */
export const getAllUser = async (req, res) => {
    try {
        const users = await User.findAll({
            include: [GrupUser],
            order: [['id_user', 'ASC']] // Urutkan berdasarkan ID
        });

        if (users.length === 0) {
            return res.status(404).json({
                status: false,
                message: "Data user masih kosong"
            });
        }

        res.json({
            status: true,
            message: "Berhasil mengambil data user",
            data: users
        });
    } catch (error) {
        res.status(500).json({ 
            status: false,
            message: "Terjadi kesalahan saat mengambil data user",
            error: error.message 
        });
    }
}

/**
 * Mendapatkan data user berdasarkan ID
 * @param {Request} req - Express Request dengan parameter id
 * @param {Response} res - Express Response
 */
export const getUserById = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                id_user: req.params.id
            },
            include: [GrupUser]
        });
        
        if (!user) {
            return res.status(404).json({
                status: false,
                message: "Data user tidak ditemukan"
            });
        }
        
        res.json({
            status: true,
            message: "Berhasil mengambil data user",
            data: user
        });
    } catch (error) {
        res.status(500).json({ 
            status: false,
            message: "Terjadi kesalahan saat mengambil data user",
            error: error.message
        });
    }
}

/**
 * Membuat data user baru
 * @param {Request} req - Express Request dengan body berisi data user
 * @param {Response} res - Express Response
 */
export const createUser = async (req, res) => {
    try {
        const { id_user, username, password, fullname, nomor_telepon, alamat, jenis_kelamin, id_grup_user } = req.body;

        // Validasi input
        if (!id_user || !username || !password || !fullname || !id_grup_user || !jenis_kelamin) {
            return res.status(400).json({       
                status: false,
                message: "Username, password, fullname, id_grup_user, jenis_kelamin harus diisi"
            });
        }

        // Cek apakah username sudah ada
        const existingUser = await User.findOne({
            where: { username }
        });

        if (existingUser) {
            return res.status(400).json({
                status: false,
                message: "Username sudah digunakan"
            });
        }

        // Cek apakah jenis kelamin ada
        // const jenisKelamin = await JenisKelamin.findOne({
        //     where: { id_jenis_kelamin }
        // });

        // if (!jenisKelamin) {
        //     return res.status(400).json({
        //         status: false,
        //         message: "Jenis kelamin tidak ditemukan"
        //     });
        // }

        // Cek apakah grup user ada
        const grupUser = await GrupUser.findOne({
            where: { id_grup_user }
        });

        if (!grupUser) {
            return res.status(400).json({
                status: false,
                message: "Grup user tidak ditemukan"
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);

        // Menyimpan nama file foto jika ada
        let foto = null;
        if (req.file) {
            foto = req.file.filename;
        }

        const user = await User.create({
            id_user,
            username,
            password: hashPassword,
            fullname,
            nomor_telepon,
            alamat,
            foto,
            jenis_kelamin,
            id_grup_user
        });

        // Ambil data user yang baru dibuat dengan relasinya
        const newUser = await User.findOne({
            where: { id_user: user.id_user },
            include: [GrupUser]
        });

        res.status(201).json({
            status: true,
            message: "Berhasil membuat data user",
            data: newUser
        });
    } catch (error) {
        // Hapus file foto jika terjadi error saat membuat user
        if (req.file) {
            fs.unlink(req.file.path, (err) => {
                if (err) console.error('Error menghapus file:', err);
            });
        }

        res.status(500).json({ 
            status: false,
            message: "Terjadi kesalahan saat membuat data user",
            error: error.message
        });
    }
}

/**
 * Mengupdate data user berdasarkan ID
 * @param {Request} req - Express Request dengan parameter id dan body berisi data user
 * @param {Response} res - Express Response
 */
export const updateUser = async (req, res) => {
    try {
        const id_user = req.params.id;
        const { password } = req.body;

        // Cek apakah user ada
        const existingUser = await User.findOne({
            where: { id_user }
        });
        
        if (!existingUser) {
            return res.status(404).json({
                status: false,
                message: "Data user tidak ditemukan"
            });
        }

        // Jika ada update password, hash password baru
        if (password) {
            const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(password, salt);
            req.body.password = hashPassword;
        }

        // Jika ada file foto baru
        if (req.file) {
            // Hapus foto lama jika ada
            if (existingUser.foto) {
                const oldPhotoPath = path.join('uploads/users/', existingUser.foto);
                if (fs.existsSync(oldPhotoPath)) {
                    fs.unlinkSync(oldPhotoPath);
                }
            }
            // Set nama file foto baru
            req.body.foto = req.file.filename;
        }

        // Update data user
        await User.update(req.body, {
            where: { id_user }
        });

        // Ambil data user yang sudah diupdate
        const updatedUser = await User.findOne({
            where: { id_user },
            include: [GrupUser]
        });

        res.json({
            status: true,
            message: "Berhasil mengupdate data user",
            data: updatedUser
        });
    } catch (error) {
        // Hapus file foto baru jika terjadi error saat update
        if (req.file) {
            fs.unlink(req.file.path, (err) => {
                if (err) console.error('Error menghapus file:', err);
            });
        }

        res.status(500).json({ 
            status: false,
            message: "Terjadi kesalahan saat mengupdate data user",
            error: error.message
        });
    }
}

/**
 * Menghapus data user berdasarkan ID
 * @param {Request} req - Express Request dengan parameter id
 * @param {Response} res - Express Response
 */
export const deleteUser = async (req, res) => {
    try {
        const id_user = req.params.id;

        // Cek apakah user ada
        const user = await User.findOne({
            where: { id_user }
        });
        
        if (!user) {
            return res.status(404).json({
                status: false,
                message: "Data user tidak ditemukan"
            });
        }

        // Hapus foto user jika ada
        if (user.foto) {
            const photoPath = path.join('uploads/users/', user.foto);
            if (fs.existsSync(photoPath)) {
                fs.unlinkSync(photoPath);
            }
        }

        // Hapus data user
        await User.destroy({
            where: { id_user }
        });

        res.json({
            status: true,
            message: "Berhasil menghapus data user"
        });
    } catch (error) {
        res.status(500).json({ 
            status: false,
            message: "Terjadi kesalahan saat menghapus data user",
            error: error.message
        });
    }
}

export const editPassword = async (req, res) => {
    try {
        const id_user = req.params.id;
        const { password } = req.body;

        // Cek apakah user ada
        const user = await User.findOne({
            where: { id_user }
        });
        
        if (!user) {
            return res.status(404).json({
                status: false,
                message: "Data user tidak ditemukan"
            });
        }

        // Hash password baru
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);

        // Update password
        await User.update({ password: hashPassword }, {
            where: { id_user }
        });

        res.json({
            status: true,
            message: "Berhasil mengubah password",
            data: user
        });
    } catch (error) {
        res.status(500).json({ 
            status: false,
            message: "Terjadi kesalahan saat mengubah password",
            error: error.message
        });
    }
}