-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 29, 2025 at 04:39 PM
-- Server version: 8.0.30
-- PHP Version: 8.2.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ppdb-mi`
--

-- --------------------------------------------------------

--
-- Table structure for table `daya_tampung`
--

CREATE TABLE `daya_tampung` (
  `id_daya_tampung` int NOT NULL,
  `nama` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `daya_tampung` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `daya_tampung`
--

INSERT INTO `daya_tampung` (`id_daya_tampung`, `nama`, `daya_tampung`) VALUES
(1, 'Maksimal Daya Tampung Pendaftaran', 21);

-- --------------------------------------------------------

--
-- Table structure for table `grup_user`
--

CREATE TABLE `grup_user` (
  `id_grup_user` int NOT NULL,
  `nama` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `grup_user`
--

INSERT INTO `grup_user` (`id_grup_user`, `nama`) VALUES
(1, 'ADMIN'),
(2, 'KEPALA SEKOLAH'),
(3, 'PENDAFTAR');

-- --------------------------------------------------------

--
-- Table structure for table `informasi`
--

CREATE TABLE `informasi` (
  `id_informasi` int NOT NULL,
  `judul` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `deskripsi` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jadwal_pendaftaran`
--

CREATE TABLE `jadwal_pendaftaran` (
  `id_jadwal_pendaftaran` int NOT NULL,
  `tanggal_mulai` timestamp NULL DEFAULT NULL,
  `tanggal_selesai` timestamp NULL DEFAULT NULL,
  `kegiatan` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `jadwal_pendaftaran`
--

INSERT INTO `jadwal_pendaftaran` (`id_jadwal_pendaftaran`, `tanggal_mulai`, `tanggal_selesai`, `kegiatan`) VALUES
(1, '2025-01-05 00:00:00', '2025-05-31 00:00:00', 'Pendaftaran Online'),
(2, '2025-05-15 00:00:00', '2025-06-02 16:00:00', 'Verifikasi Berkas'),
(3, '2025-05-22 00:00:00', '2025-07-20 23:00:00', 'Pengumuman Hasil Seleksi');

-- --------------------------------------------------------

--
-- Table structure for table `jenis_kelamin`
--

CREATE TABLE `jenis_kelamin` (
  `id_jenis_kelamin` int NOT NULL,
  `nama` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `jenis_kelamin`
--

INSERT INTO `jenis_kelamin` (`id_jenis_kelamin`, `nama`) VALUES
(1, 'LAKI-LAKI'),
(2, 'PEREMPUAN');

-- --------------------------------------------------------

--
-- Table structure for table `jenjang_asal_sekolah`
--

CREATE TABLE `jenjang_asal_sekolah` (
  `id_jenjang_asal_sekolah` varchar(100) NOT NULL,
  `slug` varchar(100) DEFAULT NULL,
  `nama` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `jenjang_asal_sekolah`
--

INSERT INTO `jenjang_asal_sekolah` (`id_jenjang_asal_sekolah`, `slug`, `nama`) VALUES
('01', 'TK', 'Taman Kanak-Kanak'),
('02', 'RA', 'Raudhatul Atfal');

-- --------------------------------------------------------

--
-- Table structure for table `pendaftaran`
--

CREATE TABLE `pendaftaran` (
  `id_pendaftaran` int NOT NULL,
  `no_pendaftaran` varchar(100) DEFAULT NULL,
  `nik` varchar(100) DEFAULT NULL,
  `nama_siswa` varchar(100) DEFAULT NULL,
  `jenis_kelamin` int DEFAULT NULL,
  `tempat_lahir` varchar(100) DEFAULT NULL,
  `tanggal_lahir` date DEFAULT NULL,
  `nama_orang_tua` varchar(100) DEFAULT NULL,
  `nomor_telepon` varchar(100) DEFAULT NULL,
  `alamat` text,
  `id_jenjang_asal_sekolah` varchar(100) DEFAULT NULL,
  `nama_asal_sekolah` varchar(100) DEFAULT NULL,
  `tahun_lulus` int DEFAULT NULL,
  `id_user` varchar(100) DEFAULT NULL,
  `dok_bukti_pembayaran` varchar(255) DEFAULT NULL,
  `dok_kk` varchar(255) DEFAULT NULL,
  `dok_akta` varchar(255) DEFAULT NULL,
  `dok_ijazah` varchar(255) DEFAULT NULL,
  `dok_ktp_orang_tua` varchar(255) DEFAULT NULL,
  `dok_foto` varchar(255) DEFAULT NULL,
  `waktu_daftar` timestamp NULL DEFAULT NULL,
  `is_diterima` int DEFAULT NULL,
  `waktu_diterima` timestamp NULL DEFAULT NULL,
  `id_daya_tampung` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `pendaftaran`
--

INSERT INTO `pendaftaran` (`id_pendaftaran`, `no_pendaftaran`, `nik`, `nama_siswa`, `jenis_kelamin`, `tempat_lahir`, `tanggal_lahir`, `nama_orang_tua`, `nomor_telepon`, `alamat`, `id_jenjang_asal_sekolah`, `nama_asal_sekolah`, `tahun_lulus`, `id_user`, `dok_bukti_pembayaran`, `dok_kk`, `dok_akta`, `dok_ijazah`, `dok_ktp_orang_tua`, `dok_foto`, `waktu_daftar`, `is_diterima`, `waktu_diterima`, `id_daya_tampung`) VALUES
(1, '01-0516184731', '3508134567890011', 'Budi Santosos', 1, 'BLITAR', '2025-05-06', 'Parsan', '081231610044', 'adegedis', '01', 'TK Suka Cita', 2025, '3508134567890011', 'dok_bukti_pembayaran/1747751476712_dok_bukti_pembayaran_download.png', 'dok_kk/1747751476698_dok_kk_download-(3).jpeg', 'dok_akta/1747751555498_dok_akta_download-(2).jpeg', 'dok_ijazah/1747751476699_dok_ijazah_download.jpeg', 'dok_ktp_orang_tua/1747751476700_dok_ktp_orang_tua_ktp.jpeg', 'dok_foto/1747894490057_dok_foto_photo.jpg', '2025-05-16 11:47:32', 1, '2025-05-22 06:13:28', 1),
(2, '01-0522131925', '3508134567890001', 'Eda Santoso', 1, 'Blitar', '2018-01-23', 'Ahmad Santoso', '081231610777', 'jl.dr sutomo', '01', 'TK Suka Cita', 2025, '3508134567890001', 'dok_bukti_pembayaran/1747895277487_dok_bukti_pembayaran_download.png', 'dok_kk/1747895277476_dok_kk_download-(3).jpeg', 'dok_akta/1747895277475_dok_akta_download.jpeg', 'dok_ijazah/1747895277476_dok_ijazah_download-(1).jpeg', 'dok_ktp_orang_tua/1747895277482_dok_ktp_orang_tua_ktp.jpeg', 'dok_foto/1747895277487_dok_foto_photo.jpg', '2025-05-22 06:19:26', 1, '2025-05-29 16:37:34', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id_user` varchar(100) NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `fullname` varchar(100) DEFAULT NULL,
  `nomor_telepon` varchar(100) DEFAULT NULL,
  `alamat` text,
  `foto` varchar(255) DEFAULT NULL,
  `jenis_kelamin` int DEFAULT NULL,
  `id_grup_user` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `username`, `password`, `fullname`, `nomor_telepon`, `alamat`, `foto`, `jenis_kelamin`, `id_grup_user`) VALUES
('1', 'admin1', '$2b$10$nirLEEw5VVbEtHwwTR/Bg.1/46Am7rA73trf05OF1x5qvEF0yD9FS', 'Samroji', '0897777231123', 'Jl.Akai', 'user-1746863178230-620138237.png', 2, 1),
('2', 'kepalasekolah', '$2b$10$yGpnzuE1G/sRtHst/R/bMe0p./eufiw20MWUCOENQqXa/6yOcvY/y', 'Sutini', '0897777231123', 'Jl.test', 'user-1746274690994-629008759.png', 2, 2),
('3508134567890001', '3508134567890001', '$2b$10$NhKcVYtFi56Y2iJLyPzFT.nhQL5Z47RSPrhpDfpJKuS6oRjsBLtGu', 'Eda Santoso', '081231610777', 'jl.dr sutomo', '1747895277487_dok_foto_photo.jpg', 1, 3),
('3508134567890011', '3508134567890011', '$2b$10$6sgTgg/k/MGHExBmPxOkpO7bJmF5RCzG84obd3SLJoXnMjI.hzPdS', 'Budi Santoso', '081231610044', 'dasdadasdada', '1747894490057_dok_foto_photo.jpg', 1, 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `daya_tampung`
--
ALTER TABLE `daya_tampung`
  ADD PRIMARY KEY (`id_daya_tampung`);

--
-- Indexes for table `grup_user`
--
ALTER TABLE `grup_user`
  ADD PRIMARY KEY (`id_grup_user`);

--
-- Indexes for table `informasi`
--
ALTER TABLE `informasi`
  ADD PRIMARY KEY (`id_informasi`);

--
-- Indexes for table `jadwal_pendaftaran`
--
ALTER TABLE `jadwal_pendaftaran`
  ADD PRIMARY KEY (`id_jadwal_pendaftaran`);

--
-- Indexes for table `jenis_kelamin`
--
ALTER TABLE `jenis_kelamin`
  ADD PRIMARY KEY (`id_jenis_kelamin`);

--
-- Indexes for table `jenjang_asal_sekolah`
--
ALTER TABLE `jenjang_asal_sekolah`
  ADD PRIMARY KEY (`id_jenjang_asal_sekolah`);

--
-- Indexes for table `pendaftaran`
--
ALTER TABLE `pendaftaran`
  ADD PRIMARY KEY (`id_pendaftaran`),
  ADD KEY `id_jenjang_asal_sekolah` (`id_jenjang_asal_sekolah`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_daya_tampung` (`id_daya_tampung`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`),
  ADD KEY `id_grup_user` (`id_grup_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `daya_tampung`
--
ALTER TABLE `daya_tampung`
  MODIFY `id_daya_tampung` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `grup_user`
--
ALTER TABLE `grup_user`
  MODIFY `id_grup_user` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `informasi`
--
ALTER TABLE `informasi`
  MODIFY `id_informasi` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `jadwal_pendaftaran`
--
ALTER TABLE `jadwal_pendaftaran`
  MODIFY `id_jadwal_pendaftaran` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `jenis_kelamin`
--
ALTER TABLE `jenis_kelamin`
  MODIFY `id_jenis_kelamin` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `pendaftaran`
--
ALTER TABLE `pendaftaran`
  MODIFY `id_pendaftaran` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `pendaftaran`
--
ALTER TABLE `pendaftaran`
  ADD CONSTRAINT `pendaftaran_ibfk_1` FOREIGN KEY (`id_jenjang_asal_sekolah`) REFERENCES `jenjang_asal_sekolah` (`id_jenjang_asal_sekolah`) ON UPDATE CASCADE,
  ADD CONSTRAINT `pendaftaran_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON UPDATE CASCADE,
  ADD CONSTRAINT `pendaftaran_ibfk_3` FOREIGN KEY (`id_daya_tampung`) REFERENCES `daya_tampung` (`id_daya_tampung`) ON UPDATE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`id_grup_user`) REFERENCES `grup_user` (`id_grup_user`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
