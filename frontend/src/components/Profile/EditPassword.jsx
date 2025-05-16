import React, { useState } from 'react';
import { baseURL } from '../../services/api.service';
import { editPassword } from '../../services/editPassword.service';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const EditPassword = ({ isOpen, onClose, userData }) => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State untuk toggle password visibility

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!password) {
      toast.error('Password tidak boleh kosong');
      return;
    }

    try {
      setIsLoading(true);
      await editPassword(userData.id_user, password);
      toast.success('Password berhasil diubah');
      setPassword(''); // Reset form
      onClose();
    } catch (error) {
      toast.error(error.message || 'Gagal mengubah password');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        {/* Header dengan info user */}
        <div className="flex items-center gap-4 mb-6">
          {userData.foto ? (
                    <div className="w-20 h-20 rounded-full bg-gray-200 flex-shrink-0 mb-4 sm:mb-0 overflow-hidden">
                      <img 
                        src={`${baseURL}/uploads/users/${userData.foto}`} 
                        alt={userData.fullname} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-semibold flex-shrink-0 mb-4 sm:mb-0">
                      {userData.fullname[0]}
                    </div>
                  )}
          <div>
            <h2 className="text-lg font-semibold">{userData?.fullname}</h2>
            <p className="text-sm text-gray-600">{userData?.grup_user?.nama_grup_user}</p>
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-4">Edit Password</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 mb-2">
              Masukan password baru
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                placeholder="Password"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPassword;