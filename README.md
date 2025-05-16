# Sistem Penerimaan Peserta Didik Baru (PPDB) MI ULMUL FADHOL

Aplikasi web untuk mengelola proses penerimaan peserta didik baru di MI ULMUL FADHOL. Dibangun menggunakan React.js untuk frontend dan Node.js untuk backend.

## Fitur Utama

- Form pendaftaran siswa baru dengan validasi
- Manajemen jadwal pendaftaran
- Dashboard admin untuk:
  - Kelola data pendaftar
  - Atur kuota pendaftaran
  - Kelola informasi sekolah
  - Laporan dan statistik pendaftaran
- Upload dan verifikasi dokumen
- Notifikasi status pendaftaran

## Teknologi yang Digunakan

### Frontend
- React.js dengan Vite
- React Context untuk state management
- Tailwind CSS untuk styling
- Axios untuk HTTP requests
- Moment.js untuk manajemen waktu

### Backend
- Node.js dengan Express
- MySQL database
- Multer untuk upload file
- JWT untuk autentikasi

## Instalasi

1. Clone repository
```bash
git clone https://github.com/ferdi166/ppdb-miulumulfadhol.git
cd ppdb-miulumulfadhol
```

2. Install dependencies frontend
```bash
cd frontend
npm install
```

3. Install dependencies backend
```bash
cd backend
npm install
```

4. Setup database
- Buat database MySQL
- Import struktur database dari file SQL yang disediakan
- Sesuaikan konfigurasi database di `backend/config/db.config.js`

5. Jalankan aplikasi
```bash
# Terminal 1 - Frontend
cd frontend
npm run dev

# Terminal 2 - Backend
cd backend
node server
```

## Struktur Project

```
ppdb-sd-swasta/
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── context/         # React Context
│   │   ├── pages/          # Halaman aplikasi
│   │   ├── services/       # API services
│   │   └── utils/          # Helper functions
│   └── ...
├── backend/
│   ├── config/            # Konfigurasi
│   ├── controllers/       # Logic handlers
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   └── ...
└── README.md
```

## Validasi Form

- NIK: 16 digit angka
- Nomor Telepon: 10-13 digit, diawali dengan 08
- Dokumen yang diunggah: PDF/JPG/PNG (max 2MB)

## Manajemen Waktu

- Menggunakan timezone Asia/Jakarta
- Format waktu: YYYY-MM-DD HH:mm:ss
- Validasi jadwal pendaftaran otomatis
