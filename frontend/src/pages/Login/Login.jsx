import React from 'react';
import { useLogin } from '../../context/loginContext';
import { FiEye, FiEyeOff } from 'react-icons/fi';

// Komponen Login untuk halaman masuk admin
const Login = () => {
  const {
    formData,
    showPassword,
    error,
    handleChange,
    handleSubmit,
    togglePasswordVisibility
  } = useLogin();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-sm w-full space-y-6">
        {/* Header */}
        <div className="text-center">
          <img
            className="mx-auto h-20 w-auto"
            src="/logo.png"
            alt="Logo Sekolah"
          />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Selamat Datang
          </h2>
          <p className="mt-2 text-base text-gray-600">
            Silakan masuk untuk mengakses sistem PPDB
          </p>
        </div>

        {/* Form Login */}
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Input Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                placeholder="Masukkan username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            {/* Input Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="Masukkan password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {/* Toggle Password Visibility */}
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <FiEyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <FiEye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          {/* Tombol Submit */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Masuk
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;