import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
    RiMenuLine,
    RiDashboardLine,
    RiUserLine,
    RiFileUserLine,
    RiUserFollowLine,
    RiUserAddLine,
    RiDatabaseLine,
    RiCalendarCheckLine,
    RiFileUploadLine,
    RiPrinterLine,
    RiCloseLine
} from 'react-icons/ri'
import { getCurrentUser } from '../../services/user.service';

// Komponen untuk menu item dengan submenu
const MenuItem = ({ icon: Icon, label, to, submenu, isActive, isCollapsed }) => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  
  // Cek jika submenu item aktif
  const isSubmenuActive = submenu?.some(item => location.pathname === item.to)
  
  return (
    <div className={`mb-1 ${isCollapsed ? 'flex justify-center' : ''}`}>
      <Link
        to={to}
        className={`group flex items-center ${isCollapsed ? 'p-2 justify-center' : 'p-3'} rounded-lg cursor-pointer transition-all duration-200
          ${(isActive || isSubmenuActive) ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50 text-gray-600 hover:text-blue-600'}`}
        onClick={(e) => submenu && (e.preventDefault(), setIsOpen(!isOpen))}
      >
        <div className="relative flex items-center">
          <Icon className={`w-5 h-5 transition-all duration-200 ${isCollapsed ? '' : 'mr-3'}`} />
          {isCollapsed && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded 
              opacity-0 group-hover:opacity-100 whitespace-nowrap z-50">
              {label}
            </div>
          )}
        </div>
        {!isCollapsed && (
          <>
            <span className="flex-1 font-medium text-sm whitespace-nowrap">{label}</span>
            {submenu && (
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
          </>
        )}
      </Link>
      {submenu && isOpen && !isCollapsed && (
        <div className="ml-4 mt-1 pl-4 border-l-2 border-gray-100">
          {submenu.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className={`block py-2 px-4 rounded-lg text-sm transition-colors duration-200 whitespace-nowrap
                ${location.pathname === item.to 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

const Sidebar = () => {    
    const location = useLocation()
    const user = getCurrentUser();
    
    // State untuk collapsed dan window width
    const [isCollapsed, setIsCollapsed] = useState(() => {
        // Default state berdasarkan window width
        const width = window.innerWidth
        return width < 1024
    })

    // Handle window resize dengan debounce
    useEffect(() => {
        let timeoutId = null
        
        const handleResize = () => {
            if (timeoutId) clearTimeout(timeoutId)
            
            timeoutId = setTimeout(() => {
                const width = window.innerWidth
                // Update state berdasarkan breakpoint
                setIsCollapsed(width < 1024)
            }, 100) // Debounce 100ms
        }

        window.addEventListener('resize', handleResize)
        // Initial check
        handleResize()
        
        return () => {
            window.removeEventListener('resize', handleResize)
            if (timeoutId) clearTimeout(timeoutId)
        }
    }, [])

    // Listen for toggle event from Header
    useEffect(() => {
        const handleToggle = () => {
            setIsCollapsed(prev => !prev)
        }

        window.addEventListener('toggleSidebar', handleToggle)
        return () => window.removeEventListener('toggleSidebar', handleToggle)
    }, [])

    // Data menu sidebar berdasarkan grup user
    const getMenuItems = () => {
        const grupUser = user?.grup_user?.id_grup_user;

        // Menu untuk Pendaftar (grup_user = 3)
        if (grupUser === 3) {
            return [
                {
                    icon: RiDashboardLine,
                    label: 'Dashboard',
                    to: '/pendaftar/dashboard',
                },
                {
                    icon: RiFileUploadLine,
                    label: 'Upload Dokumen',
                    to: '/pendaftar/upload-dokumen',
                },
                {
                    icon: RiPrinterLine,
                    label: 'Cetak Bukti',
                    to: '/pendaftar/cetak-bukti-penerimaan',
                },
                {
                    icon: RiUserLine,
                    label: 'Profile',
                    to: '/pendaftar/profile',
                }
            ];
        }

        // Menu untuk Kepala Sekolah (grup_user = 2)
        if (grupUser === 2) {
            return [
                {
                    icon: RiDashboardLine,
                    label: 'Dashboard',
                    to: '/kepala-sekolah/dashboard',
                },
                {
                    icon: RiFileUserLine,
                    label: 'Data Pendaftar',
                    to: '/kepala-sekolah/data-pendaftar',
                },
                {
                    icon: RiFileUserLine,
                    label: 'Data Diterima',
                    to: '/kepala-sekolah/data-diterima',
                },
                {
                    icon: RiUserLine,
                    label: 'Profile',
                    to: '/kepala-sekolah/profile',
                }
            ];
        }

        // Menu untuk Admin (grup_user = 1)
        return [
            {
                icon: RiDashboardLine,
                label: 'Dashboard',
                to: '/admin/dashboard',
            },
            {
                icon: RiUserFollowLine,
                label: 'Penerimaan',
                to: '/admin/penerimaan',
            },
            {
                icon: RiUserAddLine,
                label: 'Pendaftaran',
                to: '/admin/pendaftaran',
            },
            {
                icon: RiFileUserLine,
                label: 'Data Pendaftar',
                to: '/admin/data-pendaftar',
            },
            {
                icon: RiFileUserLine,
                label: 'Data Diterima',
                to: '/admin/data-diterima',
            },
            {
                icon: RiFileUserLine,
                label: 'Data User',
                to: '/admin/data-user',
            },
            {
                icon: RiDatabaseLine,
                label: 'Daya Tampung',
                to: '/admin/daya-tampung',
            },
            {
                icon: RiCalendarCheckLine,
                label: 'Penjadwalan',
                to: '/admin/penjadwalan',
            },
            {
                icon: RiUserLine,
                label: 'Profile',
                to: '/admin/profile',
            }
        ];
    };

    const menuItems = getMenuItems();

    return (
        <>
            {/* Mobile Sidebar Backdrop */}
            <div 
                className={`fixed inset-0 bg-gray-900/50 transition-opacity duration-300 lg:hidden
                    ${isCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                onClick={() => setIsCollapsed(true)}
            />

            {/* Sidebar */}
            <div 
                className={`fixed lg:sticky top-0 left-0 z-20 flex flex-col h-screen
                    bg-white border-r border-gray-200 transition-all duration-300 
                    ${isCollapsed ? 'lg:w-[4.5rem] -translate-x-full lg:translate-x-0' : 'w-72 lg:w-64 translate-x-0'}`}
            >
                {/* Header */}
                <div className="p-4 flex items-center mt-2">
                    <div className="flex items-center min-w-0">
                        <img src="/logo.png" alt="Logo" className={`w-8 h-8 flex-shrink-0 ${isCollapsed ? 'mx-auto' : ''}`} />
                        {!isCollapsed && (
                            <span className="ml-3 font-semibold text-gray-800 truncate">
                                MI Ulumul Fadhol
                            </span>
                        )}
                    </div>
                    
                    {/* Close button for mobile */}
                    {!isCollapsed && (
                        <button 
                            className="ml-auto p-2 rounded-lg hover:bg-gray-100 text-gray-500 
                                hover:text-gray-700 transition-colors duration-200 lg:hidden"
                            onClick={() => setIsCollapsed(true)}
                        >
                            <RiCloseLine className="w-5 h-5" />
                        </button>
                    )}
                </div>

                {/* Menu */}
                <nav className={`flex-1 p-4 ${isCollapsed ? 'overflow-visible' : 'overflow-y-auto'}`}>
                    {menuItems.map((item, index) => (
                        <MenuItem
                            key={index}
                            {...item}
                            isActive={location.pathname === item.to}
                            isCollapsed={isCollapsed}
                        />
                    ))}
                </nav>
            </div>
        </>
    )
}

export default Sidebar
