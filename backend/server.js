import express from 'express';
import cors from 'cors';
import db from './config/db.config.js';
import informasiRouter from './routes/informasi.route.js';
import jadwalPendaftaranRouter from './routes/jadwal_pendaftaran.route.js';
import grupUserRouter from './routes/grup_user.route.js';
import jenisKelaminRouter from './routes/jenis_kelamin.route.js';
import userRouter from './routes/user.route.js';
import loginRouter from './routes/login.route.js';
import provinsiRouter from './routes/provinsi.route.js';
import kabupatenKotaRouter from './routes/kabupaten_kota.route.js';
import jenjangAsalSekolahRouter from './routes/jenjang_asal_sekolah.route.js';
import pendaftaranRouter from './routes/pendaftaran.route.js';
import dayaTampungRouter from './routes/daya_tampung.route.js';

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Route utama
app.get('/', (req, res) => {
    res.send('API berjalan');
});

// Route API
app.use('/api/informasi', informasiRouter);
app.use('/api/jadwal-pendaftaran', jadwalPendaftaranRouter);
app.use('/api/grup-user', grupUserRouter);
app.use('/api/jenis-kelamin', jenisKelaminRouter);
app.use('/api/user', userRouter);
app.use('/api/login', loginRouter);
app.use('/api/provinsi', provinsiRouter);
app.use('/api/kabupaten-kota', kabupatenKotaRouter);
app.use('/api/jenjang-asal-sekolah', jenjangAsalSekolahRouter);
app.use('/api/pendaftaran', pendaftaranRouter);
app.use('/api/daya-tampung', dayaTampungRouter);

// Koneksi database dan jalankan server
db.authenticate()
    .then(() => {
        console.log('Database konek');
        // Sinkronkan model dengan database
        return db.sync();
    })
    .then(() => {
        console.log('Database telah tersinkronisasi');
        // Jalankan server setelah database terkoneksi dan tersinkronisasi
        app.listen(port, () => console.log(`API Berjalan pada http://localhost:${port}`));
    })
    .catch((error) => {
        console.error('Database tidak konek:', error);
    });