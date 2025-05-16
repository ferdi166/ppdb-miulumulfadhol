import React from 'react'
import Hero from '../../components/Hero/Hero'
import Jadwal from '../../components/Jadwal/Jadwal'
import Kontak from '../../components/Kontak/Kontak'

// Halaman Beranda yang menampilkan informasi utama sekolah
const Beranda = () => {
  return (
    <div>
      {/* Bagian hero untuk menampilkan banner utama */}
      <Hero />
      
      {/* Bagian jadwal untuk menampilkan informasi pendaftaran */}
      <Jadwal />

      {/* Bagian kontak untuk menampilkan informasi kontak panitia */}
      <Kontak />
    </div>
  )
}

export default Beranda