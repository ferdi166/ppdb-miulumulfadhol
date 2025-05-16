import Provinsi from "../models/provinsi.model.js";

/**
 * Controller untuk mengelola data provinsi
 * @author Cascade
 */

/**
 * Mengambil semua data provinsi
 * @param {object} req - Request dari client
 * @param {object} res - Response untuk client
 */
export const getAllProvinsi = async (req, res) => {
    try {
        // Mengambil semua data provinsi dari database
        const provinsi = await Provinsi.findAll({
            order: [['nama_provinsi', 'ASC']] // Mengurutkan berdasarkan nama provinsi
        });
        
        // Mengirim response sukses dengan data provinsi
        res.status(200).json({
            status: 'success',
            data: provinsi
        });
    } catch (error) {
        // Mengirim response error jika terjadi kesalahan
        res.status(500).json({
            status: 'error',
            message: error.message || 'Terjadi kesalahan saat mengambil data provinsi'
        });
    }
}

/**
 * Mengambil data provinsi berdasarkan ID
 * @param {object} req - Request dari client
 * @param {object} res - Response untuk client
 */
export const getProvinsiById = async (req, res) => {
    try {
        // Mengambil ID provinsi dari parameter URL
        const { id } = req.params;
        
        // Mencari provinsi berdasarkan ID
        const provinsi = await Provinsi.findByPk(id);
        
        // Jika provinsi tidak ditemukan
        if (!provinsi) {
            return res.status(404).json({
                status: 'error',
                message: 'Provinsi tidak ditemukan'
            });
        }
        
        // Mengirim response sukses dengan data provinsi
        res.status(200).json({
            status: 'success',
            data: provinsi
        });
    } catch (error) {
        // Mengirim response error jika terjadi kesalahan
        res.status(500).json({
            status: 'error',
            message: error.message || 'Terjadi kesalahan saat mengambil data provinsi'
        });
    }
}