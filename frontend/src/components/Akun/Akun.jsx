import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

/**
 * Komponen untuk menampilkan informasi akun yang berhasil dibuat
 * @param {Object} props - Properties komponen
 * @param {string} props.username - Username akun yang dibuat
 * @param {string} props.password - Password akun yang dibuat 
 */
const Akun = ({ username, password }) => {
  // Mengecek apakah URL saat ini mengandung '/admin'
  const isAdmin = window.location.pathname.includes('/admin');
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
      {/* Icon centang hijau */}
      <div className="flex justify-center mb-6">
        <FaCheckCircle size={64} className="text-emerald-700" />
      </div>

      {/* Judul */}
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
        Akun Telah Berhasil Dibuat!
      </h2>

      {/* Informasi akun */}
      <div className="space-y-4 bg-gray-50 p-4 rounded-lg mb-8">
        <div>
          <p className="text-gray-600">Username:</p>
          <p className="font-mono text-lg">{username}</p>
        </div>
        <div>
          <p className="text-gray-600">Password:</p>
          <p className="font-mono text-lg">{password}</p>
        </div>
      </div>

      {/* Instruksi */}
      <p className="text-gray-600 text-center mb-6">
        Silahkan klik tombol login di bawah ini untuk masuk ke akun Anda.
      </p>

      {/* Tombol login */}
      <Link
        to="/login"
        className="block w-full bg-emerald-700 text-white px-8 py-3 rounded-lg hover:bg-emerald-600 transition-colors duration-300 font-medium text-lg text-center"
      >
        Login Sekarang
      </Link>

      {/* Link kembali */}
      <div className="text-center mt-4">
        <button
          onClick={() => window.location.href = isAdmin ? '/admin/pendaftaran' : '/pendaftaran'}
          className="text-emerald-700 hover:text-emerald-600 transition-colors duration-300"
        >
          Kembali ke Form Pendaftaran
        </button>
      </div>
    </div>
  );
};

export default Akun;