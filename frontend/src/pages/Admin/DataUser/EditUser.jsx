import React, { useState, useEffect } from 'react';
import { FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa';
import { baseURL } from '../../../services/api.service';

/**
 * Komponen Modal Edit User
 * @param {Object} props - Props komponen
 * @param {boolean} props.isOpen - Status modal terbuka/tertutup
 * @param {function} props.onClose - Fungsi untuk menutup modal
 * @param {Object} props.userData - Data user yang akan diedit
 * @param {function} props.onSubmit - Fungsi untuk handle submit form
 */
const EditUser = ({ isOpen, onClose, userData, onSubmit }) => {
    const [showPassword, setShowPassword] = useState(false);
    
    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const form = e.target;
        
        // Validasi data wajib
        if (!form.username.value || !form.fullname.value || !form.nomor_telepon.value || 
            !form.alamat.value || !form.jenis_kelamin.value || !form.id_grup_user.value) {
            throw new Error('Semua field wajib harus diisi');
        }

        // Buat object data
        const formValues = {
            username: form.username.value,
            fullname: form.fullname.value,
            nomor_telepon: form.nomor_telepon.value,
            alamat: form.alamat.value,
            jenis_kelamin: form.jenis_kelamin.value === 'Laki-laki' ? 1 : 2,
            id_grup_user: form.id_grup_user.value
        };
        
        // Data opsional
        if (form.password.value) formValues.password = form.password.value;
        if (form.foto.files[0]) formValues.foto = form.foto.files[0];

        try {
            await onSubmit(formValues);            
            onClose();
        } catch (error) {
            console.error('Error:', error);
            console.log('Gagal update: ' + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div className="fixed inset-0 z-[9999] overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                </div>

                <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium text-gray-900">Edit User</h3>
                            <button 
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <FaTimes className="w-5 h-5" />
                            </button>
                        </div>
                        
                        {/* Form Edit User */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Username</label>
                                    <input 
                                        type="text" 
                                        name="username"
                                        defaultValue={userData?.username}
                                        className="mt-1 px-3 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Password</label>
                                    <div className="relative">
                                        <input 
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            placeholder="Kosongkan jika tidak diubah"
                                            className="mt-1 px-3 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pr-10"
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 mt-1 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <FaEyeSlash className="h-5 w-5" />
                                            ) : (
                                                <FaEye className="h-5 w-5" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
                                <input 
                                    type="text" 
                                    name="fullname"
                                    defaultValue={userData?.fullname}
                                    className="mt-1 px-3 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">No. Telepon</label>
                                    <input 
                                        type="tel" 
                                        name="nomor_telepon"
                                        defaultValue={userData?.nomor_telepon}
                                        className="mt-1 px-3 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Kelamin</label>
                                    <div className="flex gap-4">
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                id="laki-laki"
                                                name="jenis_kelamin"
                                                value="Laki-laki"
                                                defaultChecked={userData?.jenis_kelamin === 'Laki-laki'}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                                required
                                            />
                                            <label htmlFor="laki-laki" className="ml-2 text-sm text-gray-700">
                                                Laki-laki
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                id="perempuan"
                                                name="jenis_kelamin"
                                                value="Perempuan"
                                                defaultChecked={userData?.jenis_kelamin === 'Perempuan'}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                                required
                                            />
                                            <label htmlFor="perempuan" className="ml-2 text-sm text-gray-700">
                                                Perempuan
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Alamat</label>
                                <textarea 
                                    name="alamat"
                                    defaultValue={userData?.alamat}
                                    className="mt-1 px-3 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    rows="3"
                                    required
                                ></textarea>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Foto</label>
                                    <div className="mt-1 flex items-center space-x-4">
                                        <div className="flex-shrink-0">
                                            <div className="relative inline-block">
                                                <div className="w-16 h-16 rounded-full ring-2 ring-gray-200">
                                                    <img 
                                                        src={userData?.foto ? `${baseURL}/uploads/users/${userData.foto}` : `https://ui-avatars.com/api/?name=${userData?.fullname || 'User'}&background=random`}
                                                        alt={userData?.fullname || 'User'}
                                                        className="w-full h-full rounded-full object-cover"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <input
                                            type="file"
                                            name="foto"
                                            accept="image/*"
                                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Grup User</label>
                                    <div className="flex space-x-6">
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                id="admin"
                                                name="id_grup_user"
                                                value="1"
                                                defaultChecked={userData?.id_grup_user?.toUpperCase() === 'ADMIN'}
                                                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                                required
                                            />
                                            <label htmlFor="admin" className="ml-2 text-sm text-gray-700">Admin</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                id="kepala_sekolah"
                                                name="id_grup_user"
                                                value="2"
                                                defaultChecked={userData?.id_grup_user?.toUpperCase() === 'KEPALA SEKOLAH'}
                                                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                                required
                                            />
                                            <label htmlFor="kepala_sekolah" className="ml-2 text-sm text-gray-700">Kepala Sekolah</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                id="pendaftar"
                                                name="id_grup_user"
                                                value="3"
                                                defaultChecked={userData?.id_grup_user?.toUpperCase() === 'PENDAFTAR'}
                                                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                                required
                                            />
                                            <label htmlFor="pendaftar" className="ml-2 text-sm text-gray-700">Pendaftar</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 flex flex-col-reverse sm:flex-row-reverse gap-2">
                                <button
                                    type="submit"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2.5 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto"
                                >
                                    Simpan
                                </button>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2.5 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto"
                                >
                                    Batal
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditUser;