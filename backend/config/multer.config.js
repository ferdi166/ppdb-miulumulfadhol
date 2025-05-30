import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Konfigurasi penyimpanan untuk foto user
export const userStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Menentukan folder penyimpanan foto user
        cb(null, 'uploads/users/');
    },
    filename: (req, file, cb) => {
        // Membuat nama file unik dengan timestamp dan username
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'user-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Filter file yang diizinkan
export const fileFilter = (req, file, cb) => {
    // Daftar tipe file yang diizinkan
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    
    if (allowedTypes.includes(file.mimetype)) {
        // File diterima
        cb(null, true);
    } else {
        // File ditolak
        cb(new Error('Format file tidak didukung. Gunakan format JPG, JPEG atau PNG'), false);
    }
};

// Konfigurasi multer untuk user
export const uploadUser = multer({
    storage: userStorage,
    fileFilter: fileFilter,
    limits: {
        // Batasan ukuran file (2MB)
        fileSize: 2 * 1024 * 1024
    }
});

// Konfigurasi penyimpanan file
const documentStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Tentukan folder berdasarkan jenis dokumen
        let uploadPath = './uploads/pendaftar';
        
        // Buat folder jika belum ada
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        // Format nama file: timestamp_jenis-dokumen_nama-asli
        const timestamp = new Date().getTime();
        const originalName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, `${timestamp}_${file.fieldname}_${originalName}`);
    }
});

// Filter file yang diizinkan
const documentFileFilter = (req, file, cb) => {
    // Daftar ekstensi yang diizinkan
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.pdf'];
    
    // Cek ekstensi file
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedExtensions.includes(ext)) {
        cb(null, true);
    } else {
        cb(new Error('Tipe file tidak diizinkan. File harus berupa JPG, JPEG, PNG, atau PDF.'), false);
    }
};

// Konfigurasi upload untuk setiap jenis dokumen
export const uploadDocument = multer({
    storage: documentStorage,
    fileFilter: documentFileFilter,
    limits: {
        fileSize: 2 * 1024 * 1024 // Maksimal 2MB
    }
}).fields([
    { 
        name: 'dok_bukti_pembayaran', 
        maxCount: 1,
        // Deskripsi: Bukti pembayaran pendaftaran
    },
    { 
        name: 'dok_kk', 
        maxCount: 1,
        // Deskripsi: Kartu Keluarga
    },
    { 
        name: 'dok_akta', 
        maxCount: 1,
        // Deskripsi: Akta Kelahiran
    },
    { 
        name: 'dok_ijazah', 
        maxCount: 1,
        // Deskripsi: Ijazah/Surat Keterangan Lulus
    },
    { 
        name: 'dok_ktp_orang_tua', 
        maxCount: 1,
        // Deskripsi: KTP Orang Tua/Wali
    },
    { 
        name: 'dok_foto', 
        maxCount: 1,
        // Deskripsi: Pas Foto Siswa
    }
]);

// Penanganan error multer
export const handleMulterError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                status: false,
                message: 'Ukuran file terlalu besar. Maksimal 2MB'
            });
        }
        return res.status(400).json({
            status: false,
            message: 'Error pada upload file'
        });
    }
    
    if (err) {
        return res.status(400).json({
            status: false,
            message: err.message
        });
    }
    next();
};
