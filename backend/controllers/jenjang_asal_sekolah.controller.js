import JenjangAsalSekolah from "../models/jenjang_asal_sekolah.model.js";

/**
 * Controller untuk mengelola jenjang asal sekolah
 */

// Mendapatkan semua jenjang asal sekolah
export const getAllJenjangAsalSekolah = async (req, res) => {
    try {
        const jenjangAsalSekolah = await JenjangAsalSekolah.findAll({
            order: [['id_jenjang_asal_sekolah', 'ASC']]
        });

        if (jenjangAsalSekolah.length === 0) {
            return res.status(404).json({
                status: false,
                message: "Data jenjang asal sekolah masih kosong"
            });
        }

        res.json({
            status: true,
            message: "Berhasil mengambil data jenjang asal sekolah",
            data: jenjangAsalSekolah
        });
    } catch (error) {
        res.status(500).json({ 
            status: false,
            message: "Terjadi kesalahan saat mengambil data jenjang asal sekolah",
            error: error.message
        });
    }
}

/**
 * Mengambil data jenjang asal sekolah berdasarkan id
 */
export const getJenjangAsalSekolahById = async (req, res) => {
    try {
        const jenjangAsalSekolah = await JenjangAsalSekolah.findOne({
            where: { id_jenjang_asal_sekolah: req.params.id }
        });

        if (!jenjangAsalSekolah) {
            return res.status(404).json({
                status: false,
                message: "Data jenjang asal sekolah tidak ditemukan"
            });
        }

        res.json({
            status: true,
            message: "Berhasil mengambil data jenjang asal sekolah",
            data: jenjangAsalSekolah
        });
    } catch (error) {
        res.status(500).json({ 
            status: false,
            message: "Terjadi kesalahan saat mengambil data jenjang asal sekolah",
            error: error.message
        });
    }
}

/**
 * Menambahkan data jenjang asal sekolah baru
 */
export const createJenjangAsalSekolah = async (req, res) => {
    try {
        const { id_jenjang_asal_sekolah, nama, slug } = req.body;

        // Validasi input
        if (!id_jenjang_asal_sekolah || !nama || !slug) {
            return res.status(400).json({
                status: false,
                message: "ID, nama, dan slug jenjang asal sekolah harus diisi"
            });
        }

        // Cek apakah ID sudah ada
        const existingJenjangAsalSekolah = await JenjangAsalSekolah.findOne({
            where: { id_jenjang_asal_sekolah }
        });

        if (existingJenjangAsalSekolah) {
            return res.status(400).json({
                status: false,
                message: "ID jenjang asal sekolah sudah digunakan"
            });
        }

        const jenjangAsalSekolah = await JenjangAsalSekolah.create({
            id_jenjang_asal_sekolah,
            nama,
            slug
        });

        res.status(201).json({
            status: true,
            message: "Berhasil membuat data jenjang asal sekolah",
            data: jenjangAsalSekolah
        });
    } catch (error) {
        res.status(500).json({ 
            status: false,
            message: "Terjadi kesalahan saat membuat data jenjang asal sekolah",
            error: error.message
        });
    }
}

/**
 * Mengupdate data jenjang asal sekolah berdasarkan id
 */
export const updateJenjangAsalSekolah = async (req, res) => {
    try {
        const { nama, slug } = req.body;
        const id_jenjang_asal_sekolah = req.params.id;

        // Validasi input
        if (!nama || !slug) {
            return res.status(400).json({
                status: false,
                message: "Nama dan slug jenjang asal sekolah harus diisi"
            });
        }

        // Cek apakah data ada
        const existingJenjangAsalSekolah = await JenjangAsalSekolah.findOne({
            where: { id_jenjang_asal_sekolah }
        });

        if (!existingJenjangAsalSekolah) {
            return res.status(404).json({
                status: false,
                message: "Data jenjang asal sekolah tidak ditemukan"
            });
        }

        // Update data
        await JenjangAsalSekolah.update({
            nama,
            slug
        }, {
            where: { id_jenjang_asal_sekolah }
        });

        // Ambil data yang sudah diupdate
        const updatedJenjangAsalSekolah = await JenjangAsalSekolah.findOne({
            where: { id_jenjang_asal_sekolah }
        });

        res.json({
            status: true,
            message: "Berhasil mengupdate data jenjang asal sekolah",
            data: updatedJenjangAsalSekolah
        });
    } catch (error) {
        res.status(500).json({ 
            status: false,
            message: "Terjadi kesalahan saat mengupdate data jenjang asal sekolah",
            error: error.message
        });
    }
}

/**
 * Menghapus data jenjang asal sekolah berdasarkan id
 */
export const deleteJenjangAsalSekolah = async (req, res) => {
    try {
        const id_jenjang_asal_sekolah = req.params.id;

        // Cek apakah data ada
        const existingJenjangAsalSekolah = await JenjangAsalSekolah.findOne({
            where: { id_jenjang_asal_sekolah }
        });

        if (!existingJenjangAsalSekolah) {
            return res.status(404).json({
                status: false,
                message: "Data jenjang asal sekolah tidak ditemukan"
            });
        }

        // Hapus data
        await JenjangAsalSekolah.destroy({
            where: { id_jenjang_asal_sekolah }
        });

        res.json({
            status: true,
            message: "Berhasil menghapus data jenjang asal sekolah",
            data: existingJenjangAsalSekolah
        });
    } catch (error) {
        res.status(500).json({ 
            status: false,
            message: "Terjadi kesalahan saat menghapus data jenjang asal sekolah",
            error: error.message
        });
    }
}