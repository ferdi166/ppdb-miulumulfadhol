import GrupUser from "../models/grup_user.model.js";
import Sequelize from 'sequelize';

/**
 * Controller untuk mengelola grup user
 */

/**
 * Mendapatkan semua data grup user
 * @param {Request} req - Express Request
 * @param {Response} res - Express Response
 */
export const getAllGrupUser = async (req, res) => {
    try {
        const grupUser = await GrupUser.findAll({
            order: [['id_grup_user', 'ASC']] // Urutkan berdasarkan ID
        });

        if (grupUser.length === 0) {
            return res.status(404).json({
                status: false,
                message: "Data grup user masih kosong"
            });
        }

        res.json({
            status: true,
            message: "Berhasil mengambil data grup user",
            data: grupUser
        });
    } catch (error) {
        res.status(500).json({ 
            status: false,
            message: "Terjadi kesalahan saat mengambil data grup user",
            error: error.message
        });
    }
}

/**
 * Mendapatkan data grup user berdasarkan ID
 * @param {Request} req - Express Request dengan parameter id
 * @param {Response} res - Express Response
 */
export const getGrupUserById = async (req, res) => {
    try {
        const grupUser = await GrupUser.findOne({
            where: { id_grup_user: req.params.id }
        });

        if (!grupUser) {
            return res.status(404).json({
                status: false,
                message: "Data grup user tidak ditemukan"
            });
        }

        res.json({
            status: true,
            message: "Berhasil mengambil data grup user",
            data: grupUser
        });
    } catch (error) {
        res.status(500).json({ 
            status: false,
            message: "Terjadi kesalahan saat mengambil data grup user",
            error: error.message
        });
    }
}

/**
 * Membuat data grup user baru
 * @param {Request} req - Express Request dengan body berisi nama
 * @param {Response} res - Express Response
 */
export const createGrupUser = async (req, res) => {
    try {
        const { nama } = req.body;

        // Validasi input
        if (!nama) {
            return res.status(400).json({
                status: false,
                message: "Nama grup user harus diisi"
            });
        }

        // Cek apakah nama grup sudah ada
        const existingGrup = await GrupUser.findOne({
            where: { nama }
        });

        if (existingGrup) {
            return res.status(400).json({
                status: false,
                message: "Nama grup user sudah digunakan"
            });
        }

        const grupUser = await GrupUser.create({
            nama
        });

        res.status(201).json({
            status: true,
            message: "Berhasil membuat data grup user",
            data: grupUser
        });
    } catch (error) {
        res.status(500).json({ 
            status: false,
            message: "Terjadi kesalahan saat membuat data grup user",
            error: error.message
        });
    }
}

/**
 * Mengupdate data grup user berdasarkan ID
 * @param {Request} req - Express Request dengan parameter id dan body berisi nama
 * @param {Response} res - Express Response
 */
export const updateGrupUser = async (req, res) => {
    try {
        const { nama } = req.body;
        const id_grup_user = req.params.id;

        // Validasi input
        if (!nama) {
            return res.status(400).json({
                status: false,
                message: "Nama grup user harus diisi"
            });
        }

        // Cek apakah data ada
        const existingGrupUser = await GrupUser.findOne({
            where: { id_grup_user }
        });

        if (!existingGrupUser) {
            return res.status(404).json({
                status: false,
                message: "Data grup user tidak ditemukan"
            });
        }

        // Cek apakah nama baru sudah digunakan grup lain
        const duplicateGrup = await GrupUser.findOne({
            where: { 
                nama,
                id_grup_user: { [Sequelize.Op.ne]: id_grup_user }
            }
        });

        if (duplicateGrup) {
            return res.status(400).json({
                status: false,
                message: "Nama grup user sudah digunakan"
            });
        }

        // Update data
        await GrupUser.update({ nama }, {
            where: { id_grup_user }
        });

        // Ambil data yang sudah diupdate
        const updatedGrupUser = await GrupUser.findOne({
            where: { id_grup_user }
        });

        res.json({
            status: true,
            message: "Berhasil mengupdate data grup user",
            data: updatedGrupUser
        });
    } catch (error) {
        res.status(500).json({ 
            status: false,
            message: "Terjadi kesalahan saat mengupdate data grup user",
            error: error.message
        });
    }
}

/**
 * Menghapus data grup user berdasarkan ID
 * @param {Request} req - Express Request dengan parameter id
 * @param {Response} res - Express Response
 */
export const deleteGrupUser = async (req, res) => {
    try {
        const id_grup_user = req.params.id;

        // Cek apakah data ada
        const grupUser = await GrupUser.findOne({
            where: { id_grup_user }
        });

        if (!grupUser) {
            return res.status(404).json({
                status: false,
                message: "Data grup user tidak ditemukan"
            });
        }

        // Hapus data
        await GrupUser.destroy({
            where: { id_grup_user }
        });

        res.json({
            status: true,
            message: "Berhasil menghapus data grup user",
            data: grupUser
        });
    } catch (error) {
        res.status(500).json({ 
            status: false,
            message: "Terjadi kesalahan saat menghapus data grup user",
            error: error.message
        });
    }
}