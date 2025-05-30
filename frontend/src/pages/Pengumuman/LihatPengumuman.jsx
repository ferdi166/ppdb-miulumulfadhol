import React, { useEffect, useState } from 'react';
import { getPendaftaranDiterima } from '../../services/diterima.service';
import styles from './LihatPengumuman.module.css';

/**
 * Komponen untuk menampilkan hasil seleksi PPDB
 * Menampilkan daftar siswa yang diterima dalam format tabel
 * Dapat dicetak dengan tombol print atau shortcut Ctrl + P
 */
const LihatPengumuman = () => {
    const [dataSiswa, setDataSiswa] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Memuat data saat komponen dimount
    useEffect(() => {
        loadData();
    }, []);

    // Fungsi untuk memuat data dari API
    const loadData = async () => {
        try {
            const response = await getPendaftaranDiterima();
            const filteredData = response
                .filter(item => item.status === 'Diterima')
                .map((item, index) => ({
                    no: index + 1,
                    registrasi: item.no_pendaftaran,
                    nama: item.nama_siswa,
                    nama_asal_sekolah: item.nama_asal_sekolah
                }));
            setDataSiswa(filteredData);
            setLoading(false);
        } catch (error) {
            console.error('Error:', error);
            setError('Gagal memuat data siswa yang diterima');
            setLoading(false);
        }
    };

    // Fungsi untuk mencetak halaman
    const handlePrint = () => {
        window.print();
    };

    // Event listener untuk shortcut print (Ctrl + P)
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.ctrlKey && e.key === 'p') {
                e.preventDefault();
                handlePrint();
            }
        };

        document.addEventListener('keydown', handleKeyPress);
        return () => document.removeEventListener('keydown', handleKeyPress);
    }, []);

    // Tampilkan loading state
    if (loading) {
        return <div className="loading">Memuat data...</div>;
    }

    // Tampilkan error jika ada
    if (error) {
        return <div className="error">{error}</div>;
    }

    // Fungsi untuk membagi data menjadi beberapa halaman
    const itemsPerPage = 15; // Jumlah item per halaman
    const pages = [];
    for (let i = 0; i < dataSiswa.length; i += itemsPerPage) {
        pages.push(dataSiswa.slice(i, i + itemsPerPage));
    }

    // Header yang akan ditampilkan di setiap halaman
    const PageHeader = () => (
        <div className={styles.header}>
            <img src="/logo.png" alt="Logo Sekolah" className={styles.logo} />
            <div className={styles.title}>HASIL SELEKSI PPDB</div>
            <div className={styles.schoolName}>MI Ulumul Fadhol</div>
            <div className={styles.subtitle}>TAHUN AJARAN 2025/2026</div>
        </div>
    );

    // Tampilkan data dalam format tabel
    return (
        <div className={styles.container}>
            <div className={styles.paper}>
                {pages.map((pageData, pageIndex) => (
                    <div key={pageIndex} className={styles.page}>
                        <PageHeader />
                        <div className={styles.tableContainer}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th style={{ width: '5%' }}>No</th>
                                        <th style={{ width: '30%' }}>Nomor Registrasi</th>
                                        <th style={{ width: '35%' }}>Nama Siswa</th>
                                        <th style={{ width: '30%' }}>Nama Asal Sekolah</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pageData.map((siswa) => (
                                        <tr key={siswa.registrasi}>
                                            <td>{siswa.no}</td>
                                            <td>{siswa.registrasi}</td>
                                            <td>{siswa.nama}</td>
                                            <td>{siswa.nama_asal_sekolah}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}

                {/* Tombol Print */}
                <button onClick={handlePrint} className={styles.printButton}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    Cetak Hasil
                </button>
            </div>
        </div>
    );
};

export default LihatPengumuman;