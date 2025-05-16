import JenisKelamin from "../models/jenis_kelamin.model.js";
import Sequelize from 'sequelize';

/**
 * Controller untuk mengelola data jenis kelamin
 */

/**
 * Mendapatkan semua data jenis kelamin
 * @param {Request} req - Express Request
 * @param {Response} res - Express Response
 */
export const getAllJenisKelamin = async (req, res) => {
    try {
        const jenisKelamin = await JenisKelamin.findAll({
            order: [['id_jenis_kelamin', 'ASC']] // Urutkan berdasarkan ID
        });

        if (jenisKelamin.length === 0) {
            return res.status(404).json({
                status: false,
                message: "Data jenis kelamin masih kosong"
            });
        }

        res.json({
            status: true,
            message: "Berhasil mengambil data jenis kelamin",
            data: jenisKelamin
        });
    } catch (error) {
        res.status(500).json({ 
            status: false,
            message: "Terjadi kesalahan saat mengambil data jenis kelamin",
            error: error.message
        });
    }
}

/**
 * Mendapatkan data jenis kelamin berdasarkan ID
 * @param {Request} req - Express Request dengan parameter id
 * @param {Response} res - Express Response
 */
export const getJenisKelaminById = async (req, res) => {
    try {
        const jenisKelamin = await JenisKelamin.findOne({
            where: { id_jenis_kelamin: req.params.id }
        });

        if (!jenisKelamin) {
            return res.status(404).json({
                status: false,
                message: "Data jenis kelamin tidak ditemukan"
            });
        }

        res.json({
            status: true,
            message: "Berhasil mengambil data jenis kelamin",
            data: jenisKelamin
        });
    } catch (error) {
        res.status(500).json({ 
            status: false,
            message: "Terjadi kesalahan saat mengambil data jenis kelamin",
            error: error.message
        });
    }
}

/**
 * Membuat data jenis kelamin baru
 * @param {Request} req - Express Request dengan body berisi nama
 * @param {Response} res - Express Response
 */
export const createJenisKelamin = async (req, res) => {
    try {
        const { nama } = req.body;

        // Validasi input
        if (!nama) {
            return res.status(400).json({
                status: false,
                message: "Nama jenis kelamin harus diisi"
            });
        }

        // Cek apakah nama jenis kelamin sudah ada
        const existingJenisKelamin = await JenisKelamin.findOne({
            where: { nama }
        });

        if (existingJenisKelamin) {
            return res.status(400).json({
                status: false,
                message: "Nama jenis kelamin sudah digunakan"
            });
        }

        const jenisKelamin = await JenisKelamin.create({
            nama
        });

        res.status(201).json({
            status: true,
            message: "Berhasil membuat data jenis kelamin",
            data: jenisKelamin
        });
    } catch (error) {
        res.status(500).json({ 
            status: false,
            message: "Terjadi kesalahan saat membuat data jenis kelamin",
            error: error.message
        });
    }
}

/**
 * Mengupdate data jenis kelamin berdasarkan ID
 * @param {Request} req - Express Request dengan parameter id dan body berisi nama
 * @param {Response} res - Express Response
 */
export const updateJenisKelamin = async (req, res) => {
    try {
        const { nama } = req.body;
        const id_jenis_kelamin = req.params.id;

        // Validasi input
        if (!nama) {
            return res.status(400).json({
                status: false,
                message: "Nama jenis kelamin harus diisi"
            });
        }

        // Cek apakah data ada
        const existingJenisKelamin = await JenisKelamin.findOne({
            where: { id_jenis_kelamin }
        });

        if (!existingJenisKelamin) {
            return res.status(404).json({
                status: false,
                message: "Data jenis kelamin tidak ditemukan"
            });
        }

        // Cek apakah nama baru sudah digunakan jenis kelamin lain
        const duplicateJenisKelamin = await JenisKelamin.findOne({
            where: { 
                nama,
                id_jenis_kelamin: { [Sequelize.Op.ne]: id_jenis_kelamin }
            }
        });

        if (duplicateJenisKelamin) {
            return res.status(400).json({
                status: false,
                message: "Nama jenis kelamin sudah digunakan"
            });
        }

        // Update data
        await JenisKelamin.update({ nama }, {
            where: { id_jenis_kelamin }
        });

        // Ambil data yang sudah diupdate
        const updatedJenisKelamin = await JenisKelamin.findOne({
            where: { id_jenis_kelamin }
        });

        res.json({
            status: true,
            message: "Berhasil mengupdate data jenis kelamin",
            data: updatedJenisKelamin
        });
    } catch (error) {
        res.status(500).json({ 
            status: false,
            message: "Terjadi kesalahan saat mengupdate data jenis kelamin",
            error: error.message
        });
    }
}

/**
 * Menghapus data jenis kelamin berdasarkan ID
 * @param {Request} req - Express Request dengan parameter id
 * @param {Response} res - Express Response
 */
export const deleteJenisKelamin = async (req, res) => {
    try {
        const id_jenis_kelamin = req.params.id;

        // Cek apakah data ada
        const jenisKelamin = await JenisKelamin.findOne({
            where: { id_jenis_kelamin }
        });

        if (!jenisKelamin) {
            return res.status(404).json({
                status: false,
                message: "Data jenis kelamin tidak ditemukan"
            });
        }

        // Hapus data
        await JenisKelamin.destroy({
            where: { id_jenis_kelamin }
        });

        res.json({
            status: true,
            message: "Berhasil menghapus data jenis kelamin",
            data: jenisKelamin
        });
    } catch (error) {
        res.status(500).json({ 
            status: false,
            message: "Terjadi kesalahan saat menghapus data jenis kelamin",
            error: error.message
        });
    }
}