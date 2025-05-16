<div align="center">

# 📚 Sistem PPDB Online MI ULUMUL FADHOL

![Status](https://img.shields.io/badge/status-active-success.svg)
![GitHub Pull Requests](https://img.shields.io/github/issues-pr/ferdi166/ppdb-miulumulfadhol)
![GitHub Issues](https://img.shields.io/github/issues/ferdi166/ppdb-miulumulfadhol)

### 🏫 Sistem Penerimaan Peserta Didik Baru Modern untuk MI ULUMUL FADHOL

[Lihat Demo](https://ppdb-miulumulfadhol.netlify.app) • [Laporkan Bug](https://github.com/ferdi166/ppdb-miulumulfadhol/issues) • [Ajukan Fitur](https://github.com/ferdi166/ppdb-miulumulfadhol/issues)

</div>

---

## 🌟 Fitur Unggulan

🔐 **Pendaftaran Online**
- Form pendaftaran yang mudah digunakan
- Validasi data otomatis
- Upload dokumen digital
- Notifikasi status pendaftaran

👨‍💼 **Dashboard Admin**
- Kelola data pendaftar secara efisien
- Atur kuota pendaftaran
- Monitor statistik real-time
- Kelola informasi sekolah

📅 **Manajemen Jadwal**
- Atur periode pendaftaran
- Pengingat otomatis
- Status pendaftaran real-time

📊 **Laporan & Analitik**
- Statistik pendaftaran
- Export data ke Excel
- Grafik interaktif

## 🛠️ Tech Stack

**Frontend:**
```bash
📱 React.js + Vite     # Framework UI modern
🎨 Tailwind CSS       # Styling yang fleksibel
📦 React Context      # State management
🔄 Axios              # HTTP client
⏰ Moment.js          # Manajemen waktu
```

**Backend:**
```bash
⚡ Node.js + Express   # Server yang cepat & ringan
🗄️ MySQL Database     # Database yang handal
📤 Multer            # Upload file mudah
🔒 JWT               # Autentikasi aman
```

## 🚀 Panduan Penggunaan

### 📥 1. Clone & Install

```bash
# Clone repository
git clone https://github.com/ferdi166/ppdb-miulumulfadhol.git

# Masuk ke direktori project
cd ppdb-miulumulfadhol

# Install dependencies frontend
cd frontend && npm install

# Install dependencies backend
cd ../backend && npm install
```

### ⚙️ 2. Konfigurasi

```bash
# Setup Database
1. Buat database MySQL baru
2. Import file SQL dari /backend/database/
3. Sesuaikan .env dengan kredensial database

# Konfigurasi Environment
1. Copy .env.example ke .env
2. Sesuaikan variabel sesuai kebutuhan
```

### 🎯 3. Menjalankan Aplikasi

```bash
# Terminal 1 - Frontend
cd frontend
npm run dev

# Terminal 2 - Backend
cd backend
node server
```

Buka http://localhost:5173 di browser Anda! 🎉

## 📂 Struktur Project

```bash
📁 ppdb-miulumulfadhol/
├── 📓 frontend/                # Aplikasi React
│   ├── src/
│   │   ├── components/        # Komponen reusable
│   │   ├── context/           # React Context
│   │   ├── pages/             # Halaman aplikasi
│   │   ├── services/          # API services
│   │   └── utils/             # Helper functions
│   └── public/                # Asset statis
│
├── 📒 backend/                 # Server Node.js
│   ├── config/               # Konfigurasi
│   ├── controllers/          # Logic handlers
│   ├── models/              # Database models
│   ├── routes/              # API routes
│   └── database/            # SQL & migrations
│
└── 📙 docs/                    # Dokumentasi
```

## ✅ Validasi Form

```bash
🔢 NIK
   - 16 digit angka
   - Format: XXXXXXXXXXXXXXXX

📱 Nomor Telepon
   - 10-13 digit
   - Diawali dengan 08
   - Format: 08XXXXXXXXXX

📄 Dokumen
   - Format: PDF/JPG/PNG
   - Ukuran max: 2MB
   - Resolusi min: 300dpi
```

## ⏰ Manajemen Waktu

```bash
🌎 Timezone: Asia/Jakarta
📅 Format: YYYY-MM-DD HH:mm:ss
⏳ Validasi: Otomatis per menit
```

## 👨‍💻 Kontributor

<table align="center">
  <tr>
    <td align="center">
      <a href="https://github.com/ferdi166">
        <img src="https://avatars.githubusercontent.com/ferdi166" width="100px" style="border-radius:50%"/><br />
        <b>Ferdi</b>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/BrianAinu">
        <img src="https://avatars.githubusercontent.com/BrianAinu" width="100px" style="border-radius:50%"/><br />
        <b>Brian Ainu</b>
      </a>
    </td>
  </tr>
</table>

## 📑 Lisensi

Dibuat dengan ❤️ oleh Tim IT MI ULUMUL FADHOL
