import React, { useState, useEffect } from 'react'
import { FaArrowUp } from 'react-icons/fa'

// Komponen untuk tombol scroll ke atas
const ScrollToTop = () => {
  // State untuk menampilkan/menyembunyikan tombol
  const [isVisible, setIsVisible] = useState(false)

  // Fungsi untuk mengecek posisi scroll
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  // Fungsi untuk scroll ke atas
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  // Effect untuk menambahkan event listener scroll
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 bg-emerald-500 text-white p-3 rounded-full shadow-lg hover:bg-emerald-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
          aria-label="Scroll ke atas"
        >
          <FaArrowUp className="text-xl" />
        </button>
      )}
    </>
  )
}

export default ScrollToTop
