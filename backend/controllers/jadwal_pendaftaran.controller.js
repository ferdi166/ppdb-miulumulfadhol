import JadwalPendaftaran from "../models/jadwal_pendaftaran.model.js";
import moment from 'moment-timezone';

/**
 * Controller untuk mengelola jadwal pendaftaran
 */

// Set default timezone ke Indonesia/Jakarta
moment.tz.setDefault('Asia/Jakarta');

// Format tanggal dari UTC ke format Indonesia
const formatTanggal = (tanggal) => {
    return moment.utc(tanggal).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
};

// Parse tanggal dari input lokal ke UTC untuk database
const parseTanggal = (tanggal) => {
    return moment.tz(tanggal, 'Asia/Jakarta').utc().format('YYYY-MM-DD HH:mm:ss');
};

// Mendapatkan semua jadwal pendaftaran
export const getAllJadwalPendaftaran = async (req, res) => {
    try {
        const jadwal = await JadwalPendaftaran.findAll({});

        if (jadwal.length === 0) {
            return res.status(404).json({
                status: false,
                message: "Data jadwal pendaftaran masih kosong"
            });
        }

        // Format tanggal untuk setiap jadwal
        const formattedJadwal = jadwal.map(item => ({
            ...item.dataValues,
            tanggal_mulai: formatTanggal(item.tanggal_mulai),
            tanggal_selesai: formatTanggal(item.tanggal_selesai)
        }));

        res.json({
            status: true,
            message: "Berhasil mengambil data jadwal pendaftaran",
            data: formattedJadwal
        });
    } catch (error) {
        res.status(500).json({ 
            status: false,
            message: "Terjadi kesalahan saat mengambil data jadwal pendaftaran",
            error: error.message
        });
    }
}

/**
 * Mengambil data jadwal pendaftaran berdasarkan id
 */
export const getJadwalPendaftaranById = async (req, res) => {
    try {
        const jadwal = await JadwalPendaftaran.findOne({
            where: { id_jadwal_pendaftaran: req.params.id }
        });

        if (!jadwal) {
            return res.status(404).json({
                status: false,
                message: "Data jadwal pendaftaran tidak ditemukan"
            });
        }

        // Format tanggal
        const formattedJadwal = {
            ...jadwal.dataValues,
            tanggal_mulai: formatTanggal(jadwal.tanggal_mulai),
            tanggal_selesai: formatTanggal(jadwal.tanggal_selesai)
        };

        res.json({
            status: true,
            message: "Berhasil mengambil data jadwal pendaftaran",
            data: formattedJadwal
        });
    } catch (error) {
        res.status(500).json({ 
            status: false,
            message: "Terjadi kesalahan saat mengambil data jadwal pendaftaran",
            error: error.message
        });
    }
}

/**
 * Menambahkan data jadwal pendaftaran baru
 */
export const createJadwalPendaftaran = async (req, res) => {
    try {
        const { id_jadwal_pendaftaran, tanggal_mulai, tanggal_selesai, kegiatan } = req.body;

        // Validasi input
        if (!tanggal_mulai || !tanggal_selesai || !kegiatan) {
            return res.status(400).json({
                status: false,
                message: "Tanggal mulai, tanggal selesai, dan kegiatan harus diisi"
            });
        }

        // Parse dan validasi tanggal
        const startDate = moment.tz(tanggal_mulai, 'YYYY-MM-DD HH:mm:ss', 'Asia/Jakarta');
        const endDate = moment.tz(tanggal_selesai, 'YYYY-MM-DD HH:mm:ss', 'Asia/Jakarta');

        // Validasi format tanggal
        if (!startDate.isValid() || !endDate.isValid()) {
            return res.status(400).json({
                status: false,
                message: "Format tanggal tidak valid"
            });
        }

        // Validasi tanggal
        if (startDate.isSameOrAfter(endDate)) {
            return res.status(400).json({
                status: false,
                message: "Tanggal mulai harus lebih awal dari tanggal selesai"
            });
        }

        // Konversi ke UTC untuk database
        const utcTanggalMulai = parseTanggal(tanggal_mulai);
        const utcTanggalSelesai = parseTanggal(tanggal_selesai);

        const jadwal = await JadwalPendaftaran.create({
            id_jadwal_pendaftaran,
            tanggal_mulai: utcTanggalMulai,
            tanggal_selesai: utcTanggalSelesai,
            kegiatan
        });

        // Format tanggal untuk response
        const formattedJadwal = {
            ...jadwal.dataValues,
            tanggal_mulai: formatTanggal(jadwal.tanggal_mulai),
            tanggal_selesai: formatTanggal(jadwal.tanggal_selesai)
        };

        res.status(201).json({
            status: true,
            message: "Berhasil membuat data jadwal pendaftaran",
            data: formattedJadwal
        });
    } catch (error) {
        res.status(500).json({ 
            status: false,
            message: "Terjadi kesalahan saat membuat data jadwal pendaftaran",
            error: error.message
        });
    }
}

/**
 * Mengupdate data jadwal pendaftaran berdasarkan id
 */
export const updateJadwalPendaftaran = async (req, res) => {
    try {
        const { tanggal_mulai, tanggal_selesai, kegiatan } = req.body;
        const id_jadwal_pendaftaran = req.params.id;

        // Validasi input
        if (!tanggal_mulai || !tanggal_selesai || !kegiatan) {
            return res.status(400).json({
                status: false,
                message: "Tanggal mulai, tanggal selesai, dan kegiatan harus diisi"
            });
        }

        // Parse dan validasi tanggal
        const startDate = moment.tz(tanggal_mulai, 'YYYY-MM-DD HH:mm:ss', 'Asia/Jakarta');
        const endDate = moment.tz(tanggal_selesai, 'YYYY-MM-DD HH:mm:ss', 'Asia/Jakarta');

        // Validasi format tanggal
        if (!startDate.isValid() || !endDate.isValid()) {
            return res.status(400).json({
                status: false,
                message: "Format tanggal tidak valid"
            });
        }

        // Validasi tanggal
        if (startDate.isSameOrAfter(endDate)) {
            return res.status(400).json({
                status: false,
                message: "Tanggal mulai harus lebih awal dari tanggal selesai"
            });
        }

        // Cek apakah data ada
        const existingJadwal = await JadwalPendaftaran.findOne({
            where: { id_jadwal_pendaftaran }
        });

        if (!existingJadwal) {
            return res.status(404).json({
                status: false,
                message: "Data jadwal pendaftaran tidak ditemukan"
            });
        }

        // Konversi ke UTC untuk database
        const utcTanggalMulai = parseTanggal(tanggal_mulai);
        const utcTanggalSelesai = parseTanggal(tanggal_selesai);

        // Update data
        await JadwalPendaftaran.update({
            tanggal_mulai: utcTanggalMulai,
            tanggal_selesai: utcTanggalSelesai,
            kegiatan
        }, {
            where: { id_jadwal_pendaftaran }
        });

        // Ambil data yang sudah diupdate
        const updatedJadwal = await JadwalPendaftaran.findOne({
            where: { id_jadwal_pendaftaran }
        });

        // Format tanggal untuk response
        const formattedJadwal = {
            ...updatedJadwal.dataValues,
            tanggal_mulai: formatTanggal(updatedJadwal.tanggal_mulai),
            tanggal_selesai: formatTanggal(updatedJadwal.tanggal_selesai)
        };

        res.json({
            status: true,
            message: "Berhasil mengupdate data jadwal pendaftaran",
            data: formattedJadwal
        });
    } catch (error) {
        res.status(500).json({ 
            status: false,
            message: "Terjadi kesalahan saat mengupdate data jadwal pendaftaran",
            error: error.message
        });
    }
}

/**
 * Menghapus data jadwal pendaftaran berdasarkan id
 */
export const deleteJadwalPendaftaran = async (req, res) => {
    try {
        const id_jadwal_pendaftaran = req.params.id;

        // Cek apakah data ada
        const existingJadwal = await JadwalPendaftaran.findOne({
            where: { id_jadwal_pendaftaran }
        });

        if (!existingJadwal) {
            return res.status(404).json({
                status: false,
                message: "Data jadwal pendaftaran tidak ditemukan"
            });
        }

        // Format tanggal untuk data yang akan dihapus
        const formattedJadwal = {
            ...existingJadwal.dataValues,
            tanggal_mulai: formatTanggal(existingJadwal.tanggal_mulai),
            tanggal_selesai: formatTanggal(existingJadwal.tanggal_selesai)
        };

        // Hapus data
        await JadwalPendaftaran.destroy({
            where: { id_jadwal_pendaftaran }
        });

        res.json({
            status: true,
            message: "Berhasil menghapus data jadwal pendaftaran",
            data: formattedJadwal
        });
    } catch (error) {
        res.status(500).json({ 
            status: false,
            message: "Terjadi kesalahan saat menghapus data jadwal pendaftaran",
            error: error.message
        });
    }
}
