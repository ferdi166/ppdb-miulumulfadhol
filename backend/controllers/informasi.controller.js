import Informasi from "../models/informasi.model.js";

/**
 * Controller untuk mengelola informasi
 */

// Mendapatkan semua informasi
export const getAllInformasi = async (req, res) => {
    try {
        const informasi = await Informasi.findAll({});

        if (informasi.length === 0) {
            return res.status(404).json({
                status: false,
                message: "Data informasi masih kosong"
            });
        }

        res.json({
            status: true,
            message: "Berhasil mengambil data informasi",
            data: informasi
        });
    } catch (error) {
        res.status(500).json({ 
            status: false,
            message: "Terjadi kesalahan saat mengambil data informasi",
            error: error.message
        });
    }
}

/**
 * Mengambil data informasi berdasarkan id
 */
export const getAllInformasiById = async (req, res) => {
    try {
        const informasi = await Informasi.findOne({
            where: { id_informasi: req.params.id }
        });

        if (!informasi) {
            return res.status(404).json({
                status: false,
                message: "Data informasi tidak ditemukan"
            });
        }

        res.json({
            status: true,
            message: "Berhasil mengambil data informasi",
            data: informasi
        });
    } catch (error) {
        res.status(500).json({ 
            status: false,
            message: "Terjadi kesalahan saat mengambil data informasi",
            error: error.message
        });
    }
}

/**
 * Menambahkan data informasi baru
 */
export const createInformasi = async (req, res) => {
    try {
        const { judul, deskripsi } = req.body;

        // Validasi input
        if (!judul || !deskripsi) {
            return res.status(400).json({
                status: false,
                message: "Judul dan deskripsi harus diisi"
            });
        }

        const informasi = await Informasi.create({
            judul,
            deskripsi
        });

        res.status(201).json({
            status: true,
            message: "Berhasil membuat data informasi",
            data: informasi
        });
    } catch (error) {
        res.status(500).json({ 
            status: false,
            message: "Terjadi kesalahan saat membuat data informasi",
            error: error.message
        });
    }
}

/**
 * Mengupdate data informasi berdasarkan id
 */
export const updateInformasi = async (req, res) => {
    try {
        const { judul, deskripsi } = req.body;
        const id_informasi = req.params.id;

        // Validasi input
        if (!judul || !deskripsi) {
            return res.status(400).json({
                status: false,
                message: "Judul dan deskripsi harus diisi"
            });
        }

        // Cek apakah data ada
        const existingInformasi = await Informasi.findOne({
            where: { id_informasi }
        });

        if (!existingInformasi) {
            return res.status(404).json({
                status: false,
                message: "Data informasi tidak ditemukan"
            });
        }

        // Update data
        await Informasi.update({
            judul,
            deskripsi
        }, {
            where: { id_informasi }
        });

        // Ambil data yang sudah diupdate
        const updatedInformasi = await Informasi.findOne({
            where: { id_informasi }
        });

        res.json({
            status: true,
            message: "Berhasil mengupdate data informasi",
            data: updatedInformasi
        });
    } catch (error) {
        res.status(500).json({ 
            status: false,
            message: "Terjadi kesalahan saat mengupdate data informasi",
            error: error.message
        });
    }
}

/**
 * Menghapus data informasi berdasarkan id
 */
export const deleteInformasi = async (req, res) => {
    try {
        const id_informasi = req.params.id;

        // Cek apakah data ada
        const existingInformasi = await Informasi.findOne({
            where: { id_informasi }
        });

        if (!existingInformasi) {
            return res.status(404).json({
                status: false,
                message: "Data informasi tidak ditemukan"
            });
        }

        // Hapus data
        await Informasi.destroy({
            where: { id_informasi }
        });

        res.json({
            status: true,
            message: "Berhasil menghapus data informasi",
            data: existingInformasi
        });
    } catch (error) {
        res.status(500).json({ 
            status: false,
            message: "Terjadi kesalahan saat menghapus data informasi",
            error: error.message
        });
    }
}