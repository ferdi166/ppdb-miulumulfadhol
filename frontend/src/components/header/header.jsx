import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RiNotificationLine, RiMoonLine, RiUserLine, RiLogoutBoxLine } from 'react-icons/ri';
import { getCurrentUser } from '../../services/user.service';
import { baseURL } from '../../services/api.service';

// Komponen untuk tombol header
const HeaderButton = ({ icon: Icon, onClick, title }) => (
    <button
        className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700
          transition-colors duration-200"
        onClick={onClick}
        title={title}
    >
        <Icon className="w-5 h-5" />
    </button>
);

// Komponen untuk tombol hamburger
const HamburgerButton = ({ onClick }) => (
    <button
        className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700
          transition-colors duration-200 border border-gray-200"
        onClick={onClick}
        title="Toggle Menu"
    >
        <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
        >
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16"
            />
        </svg>
    </button>
);

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
        const width = window.innerWidth;
        return width < 1024;
    });
    const user = getCurrentUser();

    useEffect(() => {
        const handleSidebarToggle = () => {
            setIsSidebarCollapsed(prev => !prev);
        };

        window.addEventListener('toggleSidebar', handleSidebarToggle);
        return () => window.removeEventListener('toggleSidebar', handleSidebarToggle);
    }, []);

    // Fungsi untuk mendapatkan judul header berdasarkan path dan grup user
    const getHeaderTitle = () => {
        const path = location.pathname;
        const grupUser = user?.grup_user?.id_grup_user;

        // Judul untuk Pendaftar (grup_user = 3)
        const pendaftarTitles = {
            '/pendaftar/dashboard': 'Dashboard',
            '/pendaftar/upload-dokumen': 'Upload Dokumen',
            '/pendaftar/cetak-bukti-penerimaan': 'Cetak Bukti',
            '/pendaftar/profile': 'Profile'
        };

        // Judul untuk Kepala Sekolah (grup_user = 2)
        const kepalaSekolahTitles = {
            '/kepala-sekolah/dashboard': 'Dashboard',
            '/kepala-sekolah/data-pendaftar': 'Data Pendaftar',
            '/kepala-sekolah/data-diterima': 'Data Diterima',
            '/kepala-sekolah/profile': 'Profile'
        };

        // Judul untuk Admin (grup_user = 1)
        const adminTitles = {
            '/admin/dashboard': 'Dashboard',
            '/admin/penerimaan': 'Penerimaan',
            '/admin/pendaftaran': 'Pendaftaran',
            '/admin/penjadwalan': 'Penjadwalan',
            '/admin/daya-tampung': 'Daya Tampung',
            '/admin/data-pendaftar': 'Data Pendaftar',
            '/admin/data-diterima': 'Data Diterima',
            '/admin/data-user': 'Data User',
            '/admin/profile': 'Profile'
        };

        // Pilih judul berdasarkan grup user
        let titles;
        if (grupUser === 3) {
            titles = pendaftarTitles;
        } else if (grupUser === 2) {
            titles = kepalaSekolahTitles;
        } else {
            titles = adminTitles;
        }

        return titles[Object.keys(titles).find(key => path.includes(key))] || 'Dashboard';
    };

    // Handle logout
    const handleLogout = () => {
        // Hapus token dari localStorage
        localStorage.removeItem('token');
        // Reset state dan navigasi ke halaman utama
        setShowDropdown(false);
        navigate('/');
    };

    // Handle profile
    const handleProfile = () => {
        const grupUser = user?.grup_user?.id_grup_user;
        
        // Menentukan path profile berdasarkan grup user
        let profilePath = '/admin/profile';
        if (grupUser === 3) {
            profilePath = '/pendaftar/profile';
        } else if (grupUser === 2) {
            profilePath = '/kepala-sekolah/profile';
        }
        
        navigate(profilePath);
        setShowDropdown(false); // Menutup dropdown setelah navigasi
    };

    return (
        <header className={`layout-header bg-white border-b border-gray-200 ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
            <div className="flex items-center justify-between px-4 py-3">
                {/* Bagian Kiri */}
                <div className="flex items-center gap-2">
                    <HamburgerButton 
                        onClick={() => {
                            const event = new CustomEvent('toggleSidebar');
                            window.dispatchEvent(event);
                        }}
                    />
                    <h1 className="text-lg font-semibold text-gray-800 ml-2">
                        {getHeaderTitle()}
                    </h1>
                </div>

                {/* Bagian Kanan */}
                <div className="flex items-center gap-2">                
                    {/* Tombol Notifikasi */}
                    <div className="relative">
                        <HeaderButton 
                            icon={RiNotificationLine}
                            onClick={() => {}}
                            title="Notifikasi"
                        />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                    </div>

                    {/* Tombol Dark Mode */}
                    <HeaderButton 
                        icon={RiMoonLine}
                        onClick={() => {}}
                        title="Dark Mode"
                    />

                    {/* Avatar dengan Dropdown */}
                    <div className="relative">
                        <button 
                            className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                            onClick={() => setShowDropdown(!showDropdown)}
                        >
                            <img
                                src={user?.foto ? `${baseURL}/uploads/users/${user.foto}` : `https://ui-avatars.com/api/?name=${user?.fullname || 'User'}&background=random`}
                                alt={user?.fullname || 'User'}
                                className="w-8 h-8 rounded-full object-cover object-top"
                                style={{ objectPosition: 'center 15%' }}
                            />
                            <span className="text-sm font-medium text-gray-700 hidden md:block">
                                {user?.fullname || 'User'}
                            </span>
                        </button>

                        {/* Dropdown Menu */}
                        {showDropdown && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                                <button
                                    onClick={handleProfile}
                                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                                >
                                    <RiUserLine className="text-lg" />
                                    Profile
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full"
                                >
                                    <RiLogoutBoxLine className="text-lg" />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;