import DayaTampung from "../models/daya_tampung.model.js";

// Fungsi untuk mendapatkan semua data daya tampung
export const getDayaTampung = async (req, res) => {
    try {
        // Mengambil semua data daya tampung
        const response = await DayaTampung.findAll({
            order: [['id_daya_tampung', 'ASC']]
        });
        res.status(200).json({
            status: true,
            message: "Data daya tampung berhasil didapatkan",
            data: response
        });
    } catch (error) {
        // Menangani error dan mengirim response error
        console.error('Error in getDayaTampung:', error);
        res.status(500).json({ 
            status: false,
            message: "Terjadi kesalahan saat mengambil data daya tampung",
            error: error.message 
        });
    }
}

// Fungsi untuk mendapatkan data daya tampung berdasarkan ID
export const getDayaTampungById = async (req, res) => {
    try {
        // Mengambil data daya tampung berdasarkan ID
        const response = await DayaTampung.findOne({
            where: {
                id_daya_tampung: req.params.id
            }
        });
        
        if (!response) {
            return res.status(404).json({ 
                status: false,
                message: "Data daya tampung tidak ditemukan" 
            });
        }
        
        res.status(200).json({
            status: true,
            message: "Data daya tampung berhasil didapatkan",
            data: response
        });
    } catch (error) {
        console.error('Error in getDayaTampungById:', error);
        res.status(500).json({ 
            status: false,
            message: "Terjadi kesalahan saat mengambil data daya tampung",
            error: error.message 
        });
    }
}

// Fungsi untuk membuat data daya tampung baru
export const createDayaTampung = async (req, res) => {
    try {
        // Validasi input
        const { nama_daya_tampung, daya_tampung } = req.body;
        if (!nama_daya_tampung || !daya_tampung) {
            return res.status(400).json({ 
                status: false,
                message: "Nama dan jumlah daya tampung harus diisi" 
            });
        }

        // Membuat data daya tampung baru
        const response = await DayaTampung.create({
            nama_daya_tampung: nama_daya_tampung,
            daya_tampung: daya_tampung
        });
        
        res.status(201).json({
            status: true,
            message: "Data daya tampung berhasil dibuat",
            data: response
        });
    } catch (error) {
        console.error('Error in createDayaTampung:', error);
        res.status(500).json({ 
            status: false,
            message: "Terjadi kesalahan saat membuat data daya tampung",
            error: error.message 
        });
    }
}

// Fungsi untuk mengupdate data daya tampung
export const updateDayaTampung = async (req, res) => {
    try {
        // Validasi input
        const { daya_tampung } = req.body;
        if (!daya_tampung) {
            return res.status(400).json({ 
                status: false,
                message: "Jumlah daya tampung harus diisi" 
            });
        }

        // Mencari data yang akan diupdate
        const dayaTampung = await DayaTampung.findOne({
            where: {
                id_daya_tampung: req.params.id
            }
        });

        if (!dayaTampung) {
            return res.status(404).json({ 
                status: false,
                message: "Data daya tampung tidak ditemukan" 
            });
        }

        // Mengupdate data
        await DayaTampung.update({
            daya_tampung: daya_tampung
        }, {
            where: {
                id_daya_tampung: req.params.id
            }
        });

        res.status(200).json({
            status: true,
            message: "Data daya tampung berhasil diupdate"
        });
    } catch (error) {
        console.error('Error in updateDayaTampung:', error);
        res.status(500).json({ 
            status: false,
            message: "Terjadi kesalahan saat mengupdate data daya tampung",
            error: error.message 
        });
    }
}

// Fungsi untuk menghapus data daya tampung
export const deleteDayaTampung = async (req, res) => {
    try {
        // Mencari data yang akan dihapus
        const dayaTampung = await DayaTampung.findOne({
            where: {
                id_daya_tampung: req.params.id
            }
        });

        if (!dayaTampung) {
            return res.status(404).json({ 
                status: false,
                message: "Data daya tampung tidak ditemukan" 
            });
        }

        // Menghapus data
        await DayaTampung.destroy({
            where: {
                id_daya_tampung: req.params.id
            }
        });

        res.status(200).json({
            status: true,
            message: "Data daya tampung berhasil dihapus"
        });
    } catch (error) {
        console.error('Error in deleteDayaTampung:', error);
        res.status(500).json({ 
            status: false,
            message: "Terjadi kesalahan saat menghapus data daya tampung",
            error: error.message 
        });
    }
}