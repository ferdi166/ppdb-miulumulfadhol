import KabupatenKota from "../models/kabupaten_kota.model.js";
import Provinsi from "../models/provinsi.model.js";

/**
 * Controller untuk mengelola data kabupaten/kota
 * @author Cascade
 */

/**
 * Mengambil semua data kabupaten/kota
 * @param {object} req - Request dari client
 * @param {object} res - Response untuk client
 */
export const getAllKabupatenKota = async (req, res) => {
    try {
        // Mengambil semua data kabupaten/kota dari database beserta data provinsinya
        const kabupatenKota = await KabupatenKota.findAll({
            include: [{
                model: Provinsi,
                attributes: ['nama_provinsi']
            }],
            order: [['nama_kabupaten_kota', 'ASC']] // Mengurutkan berdasarkan nama
        });
        
        // Mengirim response sukses dengan data kabupaten/kota
        res.status(200).json({
            status: 'success',
            data: kabupatenKota
        });
    } catch (error) {
        // Mengirim response error jika terjadi kesalahan
        res.status(500).json({
            status: 'error',
            message: error.message || 'Terjadi kesalahan saat mengambil data kabupaten/kota'
        });
    }
}

/**
 * Mengambil data kabupaten/kota berdasarkan ID
 * @param {object} req - Request dari client
 * @param {object} res - Response untuk client
 */
export const getKabupatenKotaById = async (req, res) => {
    try {
        // Mengambil ID kabupaten/kota dari parameter URL
        const { id } = req.params;
        
        // Mencari kabupaten/kota berdasarkan ID beserta data provinsinya
        const kabupatenKota = await KabupatenKota.findByPk(id, {
            include: [{
                model: Provinsi,
                attributes: ['nama_provinsi']
            }]
        });
        
        // Jika kabupaten/kota tidak ditemukan
        if (!kabupatenKota) {
            return res.status(404).json({
                status: 'error',
                message: 'Kabupaten/Kota tidak ditemukan'
            });
        }
        
        // Mengirim response sukses dengan data kabupaten/kota
        res.status(200).json({
            status: 'success',
            data: kabupatenKota
        });
    } catch (error) {
        // Mengirim response error jika terjadi kesalahan
        res.status(500).json({
            status: 'error',
            message: error.message || 'Terjadi kesalahan saat mengambil data kabupaten/kota'
        });
    }
}

/**
 * Mengambil data kabupaten/kota berdasarkan ID Provinsi
 * @param {object} req - Request dari client
 * @param {object} res - Response untuk client
 */
export const getKabupatenKotaByProvinsi = async (req, res) => {
    try {
        // Mengambil ID provinsi dari parameter URL
        const { provinsiId } = req.params;
        
        // Mencari semua kabupaten/kota berdasarkan ID provinsi
        const kabupatenKota = await KabupatenKota.findAll({
            where: {
                id_provinsi: provinsiId
            },
            include: [{
                model: Provinsi,
                attributes: ['nama_provinsi']
            }],
            order: [['nama_kabupaten_kota', 'ASC']] // Mengurutkan berdasarkan nama
        });
        
        // Jika tidak ada kabupaten/kota yang ditemukan
        if (kabupatenKota.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'Tidak ada kabupaten/kota yang ditemukan untuk provinsi ini'
            });
        }
        
        // Mengirim response sukses dengan data kabupaten/kota
        res.status(200).json({
            status: 'success',
            data: kabupatenKota
        });
    } catch (error) {
        // Mengirim response error jika terjadi kesalahan
        res.status(500).json({
            status: 'error',
            message: error.message || 'Terjadi kesalahan saat mengambil data kabupaten/kota'
        });
    }
}
