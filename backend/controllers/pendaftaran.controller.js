import Pendaftaran from '../models/pendaftaran.model.js';
import User from '../models/user.model.js';
import JenjangAsalSekolah from '../models/jenjang_asal_sekolah.model.js';
import DayaTampung from '../models/daya_tampung.model.js';

import { Op } from 'sequelize';
import path from 'path';
import fs from 'fs';
import bcrypt from 'bcrypt';
import moment from 'moment-timezone';

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

// Fungsi untuk mendapatkan semua data pendaftaran
export const getAllPendaftaran = async (req, res) => {
    try {
        // Mengambil data dengan relasi
        const response = await Pendaftaran.findAll({            
            order: [['id_pendaftaran', 'ASC']],
            include: [User, JenjangAsalSekolah, DayaTampung]
        });
        
        // Format tanggal untuk response
        const formattedResponse = response.map((data) => {
            return {
                ...data.dataValues,
                waktu_daftar: formatTanggal(data.waktu_daftar)
            };
        });
        
        res.status(200).json({
            status: true,
            message: 'Data pendaftaran berhasil diambil',
            data: formattedResponse
        });
    } catch (error) {
        // Mengirim response error
        res.status(500).json({ 
            status: false,
            message: 'Terjadi kesalahan saat mengambil data pendaftaran',
            error: error.message                
        });
    }
}

// Fungsi untuk mendapatkan data pendaftaran berdasarkan ID
export const getPendaftaranById = async (req, res) => {
    try {
        // Mencari data berdasarkan ID
        const response = await Pendaftaran.findOne({
            where: {
                id_pendaftaran: req.params.id
            },
            include: [User, JenjangAsalSekolah, DayaTampung]
        });
        
        if (!response) {
            return res.status(404).json({ message: 'Data pendaftaran tidak ditemukan' });
        }
        
        // Format tanggal untuk response
        const formattedResponse = {
            ...response.dataValues,
            waktu_daftar: formatTanggal(response.waktu_daftar)
        };
        
        res.status(200).json({
            status: true,
            message: 'Data pendaftaran berhasil diambil',
            data: formattedResponse
        });
    } catch (error) {
        res.status(500).json({ 
            status: false,
            message: 'Terjadi kesalahan saat mengambil data pendaftaran',
            error: error.message
        });
    }
}

export const getPendaftaranDiterima = async (req, res) => {
    try {
        // Mengambil data pendaftaran dengan is_diterima = 1
        const response = await Pendaftaran.findAll({
            where: {
                is_diterima: 1
            },
            include: [User, JenjangAsalSekolah, DayaTampung],
        });

        if (!response) {
            return res.status(404).json({ message: 'Data pendaftaran tidak ditemukan' });
        }

        // Format tanggal untuk response
        const formattedResponse = response.map((data) => {
            return {
                ...data.dataValues,
                waktu_diterima: formatTanggal(data.waktu_diterima)
            };
        });
        
        res.status(200).json({
            success: true,
            message: "Data pendaftaran yang diterima berhasil diambil",
            data: formattedResponse
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Terjadi kesalahan saat mengambil data pendaftaran yang diterima",
            error: error.message
        });
    }
}

export const getPendaftaranBelumDiterima = async (req, res) => {
    try {
        // Mengambil data pendaftaran dengan is_diterima = 0
        const response = await Pendaftaran.findAll({
            where: {
                is_diterima: 0
            },
            include: [User, JenjangAsalSekolah, DayaTampung],
        });

        if (!response) {
            return res.status(404).json({ message: 'Data pendaftaran tidak ditemukan' });
        }

        // Format tanggal untuk response
        const formattedResponse = response.map((data) => {
            return {
                ...data.dataValues,
                waktu_daftar: formatTanggal(data.waktu_daftar)
            };
        });
        
        res.status(200).json({
            success: true,
            message: "Data pendaftaran yang belum diterima berhasil diambil",
            data: formattedResponse
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Terjadi kesalahan saat mengambil data pendaftaran yang belum diterima",
            error: error.message
        });
    }
}

// Fungsi untuk mengambil data pendaftaran berdasarkan id_user
export const getPendaftaranByUserId = async (req, res) => {
    try {
        const response = await Pendaftaran.findOne({
            where: {
                id_user: req.params.id_user
            },
            include: [User, JenjangAsalSekolah, DayaTampung],
        });

        if (!response) {
            return res.status(404).json({ message: 'Data pendaftaran tidak ditemukan' });
        }

        // Format tanggal untuk response
        const formattedResponse = {
            ...response.dataValues,
            waktu_daftar: formatTanggal(response.waktu_daftar),
            waktu_diterima: formatTanggal(response.waktu_diterima)
        };

        return res.status(200).json({
            success: true,
            message: "Data pendaftaran berhasil diambil",
            data: formattedResponse
        });
    } catch (error) {
        console.error('Error fetching pendaftaran by user ID:', error);
        return res.status(500).json({
            success: false,
            message: "Terjadi kesalahan saat mengambil data pendaftaran",
            error: error.message
        });
    }
};

// Fungsi untuk menampilkan total pendaftaran keseluruhan dan berdasarkan jenis kelamin
export const getTotalPendaftaran = async (req, res) => {
    try {
        // Hitung total semua pendaftar
        const totalPendaftar = await Pendaftaran.count();
        
        // Hitung total pendaftar laki-laki
        const totalLakiLaki = await Pendaftaran.count({
            where: {
                jenis_kelamin: 'L'
            }
        });
        
        // Hitung total pendaftar perempuan
        const totalPerempuan = await Pendaftaran.count({
            where: {
                jenis_kelamin: 'P'
            }
        });

        res.status(200).json({
            success: true,
            message: "Total pendaftaran berhasil diambil",
            data: {
                total: totalPendaftar,
                laki_laki: totalLakiLaki,
                perempuan: totalPerempuan
            }
        });
    } catch (error) {
        console.error('Error fetching total pendaftaran:', error);
        return res.status(500).json({
            success: false,
            message: "Terjadi kesalahan saat mengambil total pendaftaran",
            error: error.message
        });
    }
};

// Fungsi untuk menampilkan total pendaftaran yang diterima
export const getTotalPendaftaranDiterima = async (req, res) => {
    try {
        const response = await Pendaftaran.count({
            where: {
                is_diterima: 1
            }
        });
        res.status(200).json({
            success: true,
            message: "Total pendaftaran yang diterima berhasil diambil",
            data: response
        });
    } catch (error) {
        console.error('Error fetching total pendaftaran yang diterima:', error);
        return res.status(500).json({
            success: false,
            message: "Terjadi kesalahan saat mengambil total pendaftaran yang diterima",
            error: error.message
        });
    }
};

// Fungsi internal untuk cek kuota pendaftaran
const checkKuotaPendaftaranInternal = async () => {
    const dayaTampung = await DayaTampung.findOne({
        where: { id_daya_tampung: 1 }
    });

    if (!dayaTampung) {
        throw new Error('Data daya tampung tidak ditemukan');
    }

    const jumlahPendaftar = await Pendaftaran.count({
        where: { id_daya_tampung: 1 }
    });

    return {
        kuotaTersedia: jumlahPendaftar < dayaTampung.daya_tampung,
        totalKuota: dayaTampung.daya_tampung,
        jumlahPendaftar
    };
};

// Fungsi endpoint untuk cek kuota pendaftaran
export const checkKuotaPendaftaran = async (req, res) => {
    try {
        const kuotaInfo = await checkKuotaPendaftaranInternal();
        return res.status(200).json({
            success: true,
            message: "Kuota pendaftaran berhasil diambil",
            data: kuotaInfo
        });
    } catch (error) {
        console.error('Error checking kuota:', error);
        return res.status(500).json({ 
            success: false, 
            message: 'Terjadi kesalahan saat mengecek kuota',
            error: error.message 
        });
    }
};

// Fungsi untuk membuat data pendaftaran baru
export const createPendaftaran = async (req, res) => {
    try {
        // Validasi input
        const requiredFields = {
            nik: 'NIK',
            nama_siswa: 'Nama Siswa',
            jenis_kelamin: 'Jenis Kelamin',
            tempat_lahir: 'Tempat Lahir',
            tanggal_lahir: 'Tanggal Lahir',
            nama_orang_tua: 'Nama Orang Tua',
            nomor_telepon: 'Nomor Telepon',
            alamat: 'Alamat',
            id_jenjang_asal_sekolah: 'Jenjang Asal Sekolah',
            nama_asal_sekolah: 'Nama Asal Sekolah',
            tahun_lulus: 'Tahun Lulus'
        };

        // Cek setiap field yang wajib diisi
        const emptyFields = [];
        for (const [field, label] of Object.entries(requiredFields)) {
            if (!req.body[field]) {
                emptyFields.push(label);
            }
        }

        // Jika ada field yang kosong, kirim pesan error
        if (emptyFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Field berikut harus diisi: ${emptyFields.join(', ')}`
            });
        }

        // Cek apakah NIK sudah terdaftar
        const existingPendaftaran = await Pendaftaran.findOne({
            where: {
                nik: req.body.nik
            }
        });

        if (existingPendaftaran) {
            return res.status(400).json({
                success: false,
                message: "Mohon maaf, Anda sudah mendaftar"
            });
        }

        // Cek kuota pendaftaran
        const kuotaInfo = await checkKuotaPendaftaranInternal();
        
        if (!kuotaInfo.kuotaTersedia) {
            return res.status(400).json({
                success: false,
                message: `Mohon maaf, kuota pendaftaran sudah penuh. Total kuota: ${kuotaInfo.totalKuota}, Pendaftar saat ini: ${kuotaInfo.jumlahPendaftar}`
            });
        }

        // Siapkan data untuk user
        const username = req.body.nik;
        const defaultPassword = req.body.nik;
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(defaultPassword, salt);

        // Ambil data jenjang asal sekolah
        const jenjang = await JenjangAsalSekolah.findOne({
            where: {
                id_jenjang_asal_sekolah: req.body.id_jenjang_asal_sekolah
            }
        });

        if (!jenjang) {
            throw new Error('Jenjang asal sekolah tidak ditemukan');
        }

        // Generate nomor pendaftaran menggunakan moment timezone
        const currentDate = moment().tz('Asia/Jakarta');
        const bulan = currentDate.format('MM');
        const tanggal = currentDate.format('DD');
        const jam = currentDate.format('HH');
        const menit = currentDate.format('mm');
        const detik = currentDate.format('ss');
        
        // Format: [ID_JENJANG]-[BULAN][TANGGAL][JAM][MENIT][DETIK]
        // Contoh: 01-2093028 (untuk TK yang mendaftar bulan 2, tanggal 9, jam 30:28)
        const noPendaftaran = `${req.body.id_jenjang_asal_sekolah}-${bulan}${tanggal}${jam}${menit}${detik}`;

        // Membuat data pendaftaran terlebih dahulu tanpa id_user
        const pendaftaran = await Pendaftaran.create({
            no_pendaftaran: noPendaftaran,
            nik: req.body.nik,
            nama_siswa: req.body.nama_siswa,
            jenis_kelamin: req.body.jenis_kelamin,
            tempat_lahir: req.body.tempat_lahir,
            tanggal_lahir: req.body.tanggal_lahir,
            nama_orang_tua: req.body.nama_orang_tua,
            nomor_telepon: req.body.nomor_telepon,
            alamat: req.body.alamat,
            id_jenjang_asal_sekolah: req.body.id_jenjang_asal_sekolah,
            nama_asal_sekolah: req.body.nama_asal_sekolah,
            tahun_lulus: req.body.tahun_lulus,
            id_daya_tampung: 1,
            waktu_daftar: currentDate.toDate(),
            is_diterima: 0
        });

        // Jika pendaftaran berhasil, buat akun user
        const newUser = await User.create({
            id_user: req.body.nik,
            username: username,
            password: hashPassword,
            fullname: req.body.nama_siswa,
            nomor_telepon: req.body.nomor_telepon,
            alamat: req.body.alamat,
            jenis_kelamin: req.body.jenis_kelamin,
            id_grup_user: 3 // ID grup user untuk siswa
        });

        // Update id_user pada data pendaftaran
        await pendaftaran.update({
            id_user: newUser.id_user
        });
        
        // Format tanggal untuk response
        const formattedResponse = {
            ...pendaftaran.dataValues,
            waktu_daftar: formatTanggal(pendaftaran.waktu_daftar),
            id_user: newUser.id_user
        };
        
        res.status(201).json({
            success: true,
            message: 'Data pendaftaran berhasil dibuat',
            data: {
                pendaftaran: formattedResponse,
                akun: {
                    username: username,
                    password: defaultPassword, // Mengirim password default (belum di-hash)
                    pesan: 'Harap segera ganti password Anda setelah login dan lengkapi dokumen pendaftaran!'
                }
            }
        });
    } catch (error) {
        console.error('Error creating pendaftaran:', error);
        res.status(500).json({ 
            success: false,
            message: 'Terjadi kesalahan saat membuat data pendaftaran',
            error: error.message 
        });
    }
}

// Fungsi untuk mengupdate data pendaftaran
export const updatePendaftaran = async (req, res) => {
    try {
        // Mencari data yang akan diupdate
        const pendaftaran = await Pendaftaran.findOne({
            where: {
                id_pendaftaran: req.params.id
            },
            include: [User, JenjangAsalSekolah, DayaTampung]
        });

        if (!pendaftaran) {
            return res.status(404).json({ message: 'Data pendaftaran tidak ditemukan' });
        }

        // Menyiapkan data untuk update
        const updateData = {
            no_pendaftaran: req.body.no_pendaftaran,
            nik: req.body.nik,
            nama_siswa: req.body.nama_siswa,
            jenis_kelamin: req.body.jenis_kelamin,
            tempat_lahir: req.body.tempat_lahir,
            tanggal_lahir: req.body.tanggal_lahir,
            nama_orang_tua: req.body.nama_orang_tua,
            nomor_telepon: req.body.nomor_telepon,
            alamat: req.body.alamat,
            id_jenjang_asal_sekolah: req.body.id_jenjang_asal_sekolah,
            nama_asal_sekolah: req.body.nama_asal_sekolah,
            tahun_lulus: req.body.tahun_lulus,
            id_user: req.body.id_user,
            is_diterima: req.body.is_diterima,
            waktu_diterima: req.body.is_diterima === 1 ? moment().tz('Asia/Jakarta').toDate() : null,
            daya_tampung: req.body.daya_tampung
        };

        // Update dokumen jika ada file baru
        if (req.files) {
            const dokumenFields = [
                { field: 'dok_bukti_pembayaran', folder: 'dok_bukti_pembayaran' },
                { field: 'dok_kk', folder: 'dok_kk' },
                { field: 'dok_akta', folder: 'dok_akta' },
                { field: 'dok_ijazah', folder: 'dok_ijazah' },
                { field: 'dok_ktp_orang_tua', folder: 'dok_ktp_orang_tua' },
                { field: 'dok_foto', folder: 'dok_foto' }
            ];

            dokumenFields.forEach(({ field, folder }) => {
                if (req.files[field]?.[0]?.filename) {
                    // Hapus file lama jika ada
                    if (pendaftaran[field]) {
                        const oldFilePath = path.join('./uploads/pendaftar', folder, pendaftaran[field]);
                        if (fs.existsSync(oldFilePath)) {
                            fs.unlinkSync(oldFilePath);
                        }
                    }

                    // Pastikan folder ada
                    const uploadDir = path.join('./uploads/pendaftar', folder);
                    if (!fs.existsSync(uploadDir)) {
                        fs.mkdirSync(uploadDir, { recursive: true });
                    }

                    // Pindahkan file ke folder yang sesuai
                    const oldPath = path.join('./uploads/pendaftar', req.files[field][0].filename);
                    const newPath = path.join(uploadDir, req.files[field][0].filename);
                    
                    if (fs.existsSync(oldPath)) {
                        fs.renameSync(oldPath, newPath);
                    }
                    
                    // Gunakan forward slash untuk path yang disimpan di database
                    updateData[field] = `${folder}/${req.files[field][0].filename}`;

                    // // Update foto user jika yang diupload adalah dok_foto
                    // if (field === 'dok_foto') {
                    //     User.update(
                    //         { foto: updateData[field] },
                    //         { where: { id_user: pendaftaran.id_user } }
                    //     );
                    // }
                }
            });
        }

        // Melakukan update data
        await Pendaftaran.update(updateData, {
            where: {
                id_pendaftaran: req.params.id
            }
        });

        res.status(200).json({
            message: 'Data pendaftaran berhasil diupdate',
            data: updateData
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Terjadi kesalahan saat mengupdate data pendaftaran',
            error: error.message 
        });
    }
}

export const uploadDokumen = async (req, res) => {
    try {
        const id_pendaftaran = req.params.id; // mengambil id dari parameter route

        // Cek apakah ada file yang diupload
        if (!req.files) {
            return res.status(400).json({ message: 'Tidak ada file yang diupload' });
        }

        // Cek data pendaftaran
        const pendaftaran = await Pendaftaran.findOne({
            where: { id_pendaftaran }
        });

        if (!pendaftaran) {
            return res.status(404).json({ message: 'Data pendaftaran tidak ditemukan' });
        }

        // Data yang akan diupdate
        const updateData = {};

        // List dokumen yang valid
        const dokumenList = [
            'dok_bukti_pembayaran',
            'dok_kk', 
            'dok_akta',
            'dok_ijazah',
            'dok_ktp_orang_tua',
            'dok_foto'
        ];

        // Proses setiap file yang diupload
        for (const field of dokumenList) {
            const file = req.files[field]?.[0];
            if (file) {
                // Buat folder jika belum ada
                const uploadDir = `./uploads/pendaftar/${field}`;
                if (!fs.existsSync(uploadDir)) {
                    fs.mkdirSync(uploadDir, { recursive: true });
                }

                // Hapus file lama
                if (pendaftaran[field]) {
                    const oldPath = `./uploads/pendaftar/${pendaftaran[field]}`;
                    if (fs.existsSync(oldPath)) {
                        fs.unlinkSync(oldPath);
                    }
                }

                // Pindahkan file baru
                fs.renameSync(
                    `./uploads/pendaftar/${file.filename}`,
                    `${uploadDir}/${file.filename}`
                );

                // Simpan path ke database
                updateData[field] = `${field}/${file.filename}`;

                // Update foto user jika yang diupload adalah dok_foto
                if (field === 'dok_foto') {
                    // Salin file ke folder users
                    const usersDir = './uploads/users';
                    if (!fs.existsSync(usersDir)) {
                        fs.mkdirSync(usersDir, { recursive: true });
                    }

                    // Copy file dari folder pendaftar ke folder users
                    fs.copyFileSync(
                        `${uploadDir}/${file.filename}`,
                        `${usersDir}/${file.filename}`
                    );

                    // Update data user dengan path foto yang baru
                    await User.update(
                        { foto: file.filename }, // Simpan hanya nama file untuk user
                        { where: { id_user: pendaftaran.id_user } }
                    );
                }
            }
        }

        // Update data pendaftaran
        await Pendaftaran.update(updateData, {
            where: { id_pendaftaran }
        });

        res.status(200).json({
            message: 'Dokumen berhasil diupload',
            data: updateData
        });
    } catch (error) {
        console.error('Error upload dokumen:', error);
        res.status(500).json({
            message: 'Gagal mengupload dokumen',
            error: error.message
        });
    }
}

// Fungsi untuk menghapus data pendaftaran
export const deletePendaftaran = async (req, res) => {
    try {
        // Mencari data yang akan dihapus
        const pendaftaran = await Pendaftaran.findOne({
            where: {
                id_pendaftaran: req.params.id
            }
        });

        if (!pendaftaran) {
            return res.status(404).json({ message: 'Data pendaftaran tidak ditemukan' });
        }

        // Hapus file dokumen jika ada
        const dokumenFields = [
            'dok_bukti_pembayaran',
            'dok_kk',
            'dok_akta',
            'dok_ijazah',
            'dok_ktp_orang_tua',
            'dok_foto'
        ];

        dokumenFields.forEach(field => {
            if (pendaftaran[field]) {
                const filePath = path.join('./uploads/pendaftar', pendaftaran[field]);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            }
        });

        // Hapus data dari database
        await Pendaftaran.destroy({
            where: {
                id_pendaftaran: req.params.id
            }
        });

        res.status(200).json({
            message: 'Data pendaftaran berhasil dihapus'
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Terjadi kesalahan saat menghapus data pendaftaran',
            error: error.message 
        });
    }
}

// Fungsi untuk konfirmasi penerimaan pendaftaran
export const konfirmasiPenerimaan = async (req, res) => {
    try {
        // Validasi input
        if (!req.params.id) {
            return res.status(400).json({
                status: false,
                message: 'ID pendaftaran diperlukan'
            });
        }

        // Cari pendaftaran berdasarkan ID
        const pendaftaran = await Pendaftaran.findOne({
            where: {
                id_pendaftaran: req.params.id
            }
        });

        // Jika pendaftaran tidak ditemukan
        if (!pendaftaran) {
            return res.status(404).json({
                status: false,
                message: 'Data pendaftaran tidak ditemukan'
            });
        }

        // Update status dan waktu diterima
        // Gunakan moment-timezone untuk format waktu Indonesia
        const waktuDiterima = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
        
        await pendaftaran.update({
            is_diterima: 1, // 1 untuk status diterima
            waktu_diterima: parseTanggal(waktuDiterima), // Konversi ke UTC untuk database
            keterangan: req.body.keterangan || 'Selamat! Anda telah diterima'
        });

        // Ambil data yang sudah diupdate
        const updatedPendaftaran = await Pendaftaran.findOne({
            where: {
                id_pendaftaran: req.params.id
            },
            include: [User, JenjangAsalSekolah, DayaTampung]
        });

        // Format tanggal untuk response
        const formattedResponse = {
            ...updatedPendaftaran.dataValues,
            waktu_daftar: formatTanggal(updatedPendaftaran.waktu_daftar),
            waktu_diterima: formatTanggal(updatedPendaftaran.waktu_diterima)
        };

        res.status(200).json({
            status: true,
            message: 'Konfirmasi penerimaan berhasil',
            data: formattedResponse
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Terjadi kesalahan saat konfirmasi penerimaan',
            error: error.message
        });
    }
}