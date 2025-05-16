import React from 'react';
import { FaEdit } from 'react-icons/fa';
import { baseURL } from '../../services/api.service';

const ProfileComponent = ({ userData, onEditPassword }) => {
  return (
    <div className="bg-white rounded-lg shadow-md max-w-4xl mx-auto p-6">
      <div className="flex flex-col sm:flex-row items-center mb-6">
        {userData.foto ? (
          <div className="w-20 h-20 rounded-full bg-gray-200 flex-shrink-0 mb-4 sm:mb-0 overflow-hidden">
            <img 
              src={`${baseURL}/uploads/users/${userData.foto}`} 
              alt={userData.fullname} 
              className="w-full h-full object-cover object-top"
              style={{ objectPosition: 'center 15%' }}
            />
          </div>
        ) : (
          <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-semibold flex-shrink-0 mb-4 sm:mb-0">
            {userData.fullname[0]}
          </div>
        )}
        <div className="ml-0 sm:ml-4 flex-grow text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">{userData.fullname}</h2>
              <p className="text-gray-600">{userData.grup_user?.nama_grup_user}</p>
            </div>
            <button 
              onClick={onEditPassword}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors duration-200 w-full sm:w-auto justify-center"
            >
              <FaEdit className="w-4 h-4" />
              <span>Edit Password</span>
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="">
          <h3 className="text-xl font-semibold mb-4">Informasi Pribadi</h3>
          <div className="mb-4 space-y-1">
            <span className="text-gray-600">Username</span>
            <p className="font-medium">{userData.username}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-gray-600">Nama Lengkap</span>
              <p className="font-medium">{userData.fullname}</p>
            </div>
            <div className="space-y-1">
              <span className="text-gray-600">Jenis Kelamin</span>
              <p className="font-medium">{userData.jenis_kelamin}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="space-y-1">
              <span className="text-gray-600">Nomor Telepon</span>
              <p className="font-medium">{userData.nomor_telepon}</p>
            </div>
            <div className="space-y-1">
              <span className="text-gray-600">Alamat</span>
              <p className="font-medium">{userData.alamat}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;