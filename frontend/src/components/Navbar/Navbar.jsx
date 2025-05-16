import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'

// Komponen Navbar yang berisi menu navigasi utama
const Navbar = () => {
  // State untuk mengontrol hamburger menu
  const [isOpen, setIsOpen] = useState(false)

  // Daftar menu navigasi
  const menuItems = [
    { path: '/', label: 'Beranda' },
    { path: '/pendaftaran', label: 'Pendaftaran' },
    { path: '/pengumuman', label: 'Pengumuman' },
    { path: '/informasi', label: 'Informasi' },
  ]

  return (
    <nav className="bg-white shadow fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo dan Nama Sekolah */}
          <div className="flex-shrink-0 flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-3">
              <img
                className="h-12 w-auto"
                src={assets.logo}
                alt="Logo MI Ulumul Fadhol"
              />
              <div className="flex flex-col">
                <span className="text-emerald-700 font-bold text-xl">MI Ulumul Fadhol</span>
                <span className="text-emerald-700 text-xs">Madrasah Ibtidaiyah</span>
              </div>
            </Link>
          </div>

          {/* Hamburger Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-emerald-700 hover:bg-gray-100 focus:outline-none"
            >
              <span className="sr-only">Buka menu utama</span>
              {/* Icon hamburger */}
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Icon close */}
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center">
            <div className="hidden md:flex space-x-8">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-md font-medium transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Mobile */}
        <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-white`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-gray-700 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar