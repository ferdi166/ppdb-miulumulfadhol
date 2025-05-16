import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { LoginProvider } from './context/loginContext';
import { DashboardProvider } from './context/DashboardContext';

// Import komponen
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/header/header';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

// Import halaman
import Beranda from './pages/Beranda/Beranda';
import PendaftaranAdmin from './pages/Admin/Pendaftaran/Pendaftaran';
import Pendaftaran from './pages/Pendaftaran/Pendaftaran';

import Pengumuman from './pages/Pengumuman/Pengumuman';
import Informasi from './pages/Informasi/Informasi';
import Penerimaan from './pages/Admin/Penerimaan/Penerimaan';
import Login from './pages/Login/Login';
import DataPendaftar from './pages/Admin/DataPendaftar/DataPendaftar';
import EditDataPendaftar from './pages/Admin/DataPendaftar/EditDataPendaftar';
import DataDiterima from './pages/Admin/DataDiterima/DataDiterima';
import DataUser from './pages/Admin/DataUser/DataUser';
import DayaTampung from './pages/Admin/DayaTampung/DayaTampung';
import Penjadwalan from './pages/Admin/Penjadwalan/Penjadwalan';
import Profile from './pages/Admin/Profile/Profile';
import DashboardAdmin from './pages/Admin/Dashboard/Dashboard';

// Import halaman Kepala Sekolah
import DashboardKepalaSekolah from './pages/KepalaSekolah/Dashboard/Dashboard';
import DataPendaftarKepalaSekolah from './pages/KepalaSekolah/DataPendaftar/DataPendaftar';
import DataDiterimaKepalaSekolah from './pages/KepalaSekolah/DataDiterima/DataDiterima';
import KepalaSekolahProfile from './pages/KepalaSekolah/Profile/Profile';

// Import halaman Pendaftar
import DashboardPendaftar from './pages/Pendaftar/Dashboard/Dashboard';
import UploadDokumen from './pages/Pendaftar/UploadDokumen/UploadDokumen';
import CetakBuktiPenerimaan from './pages/Pendaftar/CetakBuktiPenerimaan/CetakBuktiPenerimaan';
import ProfilePendaftar from './pages/Pendaftar/Profile/Profile';

// Layout untuk halaman admin
const AdminLayout = () => {
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <ProtectedRoute allowedGroups={[1]}> {/* Hanya grup user 1 (admin) yang bisa akses */}
                {/* Container utama dengan overflow yang tepat */}
                <div className="flex min-h-screen bg-gray-50">
                    {/* Sidebar */}
                    <Sidebar />

                    {/* Konten utama dengan margin yang sesuai */}
                    <div className="flex-1 transition-all duration-300">
                        <Header />

                        {/* Area konten utama dengan padding dan scroll */}
                        <main className="p-4 lg:p-6 overflow-auto min-h-[calc(100vh-64px)]">
                            <div className="max-w-[1536px] mx-auto">
                                <DashboardProvider>
                                    <Routes>
                                        <Route path="/admin/dashboard" element={<DashboardAdmin />} />
                                        <Route path="/admin/penerimaan" element={<Penerimaan />} />
                                        <Route path="/admin/pendaftaran" element={<PendaftaranAdmin />} />
                                        <Route path="/admin/penjadwalan" element={<Penjadwalan />} />
                                        <Route path="/admin/daya-tampung" element={<DayaTampung />} />
                                        <Route path="/admin/data-pendaftar" element={<DataPendaftar />} />
                                        <Route path="/admin/data-pendaftar/edit/:id" element={<EditDataPendaftar />} />
                                        <Route path="/admin/data-diterima" element={<DataDiterima />} />
                                        <Route path="/admin/data-user" element={<DataUser />} />
                                        <Route path="/admin/profile" element={<Profile />} />
                                    </Routes>
                                </DashboardProvider>
                            </div>
                        </main>
                    </div>
                </div>
            </ProtectedRoute>
        </>
    );
};

// Layout untuk halaman Kepala Sekolah
const KepalaSekolah = () => {
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <ProtectedRoute allowedGroups={[2]}> {/* Hanya grup user 2 (kepala sekolah) yang bisa akses */}
                {/* Container utama dengan overflow yang tepat */}
                <div className="flex min-h-screen bg-gray-50">
                    {/* Sidebar */}
                    <Sidebar />

                    {/* Konten utama dengan margin yang sesuai */}
                    <div className="flex-1 transition-all duration-300">
                        <Header />

                        {/* Area konten utama dengan padding dan scroll */}
                        <main className="p-4 lg:p-6 overflow-auto min-h-[calc(100vh-64px)]">
                            <div className="max-w-[1536px] mx-auto">
                                <DashboardProvider>
                                    <Routes>
                                        <Route path="/kepala-sekolah/dashboard" element={<DashboardKepalaSekolah />} />
                                        <Route path="/kepala-sekolah/data-pendaftar" element={<DataPendaftarKepalaSekolah />} />
                                        <Route path="/kepala-sekolah/data-diterima" element={<DataDiterimaKepalaSekolah />} />
                                        <Route path="/kepala-sekolah/profile" element={<KepalaSekolahProfile />} />
                                    </Routes>
                                </DashboardProvider>
                            </div>
                        </main>
                    </div>
                </div>
            </ProtectedRoute>
        </>
    );
};

// Layout untuk halaman Pendaftar
const Pendaftar = () => {
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <ProtectedRoute allowedGroups={[3]}> {/* Hanya grup user 3 (pendaftar) yang bisa akses */}
                <div className="flex min-h-screen bg-gray-50">
                    {/* Sidebar */}
                    <Sidebar />

                    {/* Konten utama dengan margin yang sesuai */}
                    <div className="flex-1 transition-all duration-300">
                        <Header />

                        {/* Area konten utama dengan padding dan scroll */}
                        <main className="p-4 lg:p-6 overflow-auto min-h-[calc(100vh-64px)]">
                            <div className="max-w-[1536px] mx-auto">
                                <Routes>
                                    <Route path="/pendaftar/dashboard" element={<DashboardPendaftar />} />
                                    <Route path="/pendaftar/upload-dokumen" element={<UploadDokumen />} />
                                    <Route path="/pendaftar/cetak-bukti-penerimaan" element={<CetakBuktiPenerimaan />} />
                                    <Route path="/pendaftar/profile" element={<ProfilePendaftar />} />
                                </Routes>
                            </div>
                        </main>
                    </div>
                </div>
            </ProtectedRoute>
        </>
    );
};

// Komponen utama aplikasi
const App = () => {
    const location = useLocation();
    // Menggunakan exact path untuk halaman publik
    const isPublicPage = ["/", "/pendaftaran", "/pengumuman", "/informasi"].includes(location.pathname);
    const isAdminPage = location.pathname.startsWith('/admin');
    const isKepalaSekolahPage = location.pathname.startsWith('/kepala-sekolah');
    const isPendaftarPage = location.pathname.startsWith('/pendaftar');
    const isLoginPage = location.pathname === '/login';

    // Render layout berdasarkan jenis halaman
    if (isPublicPage) {
        return (
            <div className="min-h-screen flex flex-col">
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
                {/* Navbar tetap di atas halaman */}
                <Navbar />

                {/* Konten utama dengan padding atas agar tidak tertutup navbar */}
                <main className="flex-grow pt-16">
                    <Routes>
                        <Route path="/" element={<Beranda />} />
                        <Route path="/pendaftaran" element={<Pendaftaran />} />
                        <Route path="/pengumuman" element={<Pengumuman />} />
                        <Route path="/informasi" element={<Informasi />} />
                    </Routes>
                </main>

                {/* Footer */}
                <Footer />
            </div>
        );
    }

    if (isLoginPage) {
        return (
            <LoginProvider>
                <Routes>
                    <Route path="/login" element={<Login />} />
                </Routes>
            </LoginProvider>
        );
    }

    if (isAdminPage) {
        return <AdminLayout />;
    }

    if (isKepalaSekolahPage) {
        return <KepalaSekolah />;
    }

    if (isPendaftarPage) {
        return <Pendaftar />;
    }

    // Redirect ke halaman login jika tidak ada route yang cocok
    return (
        <>
            <LoginProvider>
                <Routes>
                    <Route path="*" element={<Login />} />
                </Routes>
            </LoginProvider>
        </>
    );
};

export default App;
