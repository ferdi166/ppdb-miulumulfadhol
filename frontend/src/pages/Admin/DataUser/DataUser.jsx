import React, { useState, useEffect } from 'react';
import Table from '../../../components/Table/Table';
import { FaEdit } from 'react-icons/fa';
import EditUser from './EditUser';
import { getAllUser, updateUser } from '../../../services/user.service';
import { baseURL } from '../../../services/api.service';
import { toast } from 'react-toastify';

/**
 * Halaman Data User untuk menampilkan daftar user
 * Menampilkan informasi user dalam format tabel
 */
const DataUser = () => {
    // State untuk status sidebar dan modal
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    // State untuk menyimpan data user
    const [dataUser, setDataUser] = useState([]);

    // State untuk loading dan mounted
    const [isLoading, setIsLoading] = useState(true);
    const [isMounted, setIsMounted] = useState(false);

    // Fungsi untuk mengambil data user
    const fetchUsers = async () => {
        if (!isMounted) return;
        
        try {
            setIsLoading(true);
            const data = await getAllUser();
            if (isMounted) {
                setDataUser(data);
                console.log('Data berhasil diambil:', data); // Debug log
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            if (isMounted) {
                toast.error('Gagal mengambil data user');
            }
        } finally {
            if (isMounted) {
                setIsLoading(false);
            }
        }
    };

    // Handle submit form edit user
    const handleSubmit = async (formData) => {
        try {
            setIsLoading(true);
            await updateUser(selectedUser.id_user, formData);
            await fetchUsers(); // Refresh data setelah update
            setShowModal(false);
            toast.success('Data user berhasil diperbarui');
        } catch (error) {
            console.error('Error updating user:', error);
            toast.error('Gagal mengupdate user: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Fungsi untuk menangani klik tombol edit dan membuka modal
    const handleEdit = (id) => {
        const user = dataUser.find(user => user.id_user === id);
        setSelectedUser(user);
        setShowModal(true);
    };

    // Toggle sidebar saat event diterima
    useEffect(() => {
        const handleToggle = () => setIsCollapsed(!isCollapsed);
        window.addEventListener('toggleSidebar', handleToggle);
        return () => window.removeEventListener('toggleSidebar', handleToggle);
    }, [isCollapsed]);

    // Set mounted state saat komponen dimount
    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    // Fetch data user saat komponen dimount dan mounted state berubah
    useEffect(() => {
        if (isMounted) {
            console.log('Fetching users...'); // Debug log
            fetchUsers();
        }
    }, [isMounted]);


    // Konfigurasi kolom tabel
    const columns = [
        {
            header: 'ID',
            accessor: 'id_user',
            render: (row) => (
                <span className="text-gray-700">{row.id_user}</span>
            )
        },
        {
            header: 'Username',
            accessor: 'username',
            render: (row) => (
                <span className="text-gray-700">{row.username}</span>
            )
        },
        {
            header: 'Nama Lengkap',
            accessor: 'fullname',
            render: (row) => (
                <div className="flex items-center gap-3">
                    {/* Avatar/Foto */}
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        {row.foto ? (
                            <img 
                                src={`${baseURL}/uploads/users/${row.foto}`} 
                                alt={row.fullname}
                                className="w-full h-full object-contain"
                            />
                        ) : (
                            <span className="text-gray-600 font-semibold">
                                {row.fullname.charAt(0)}
                            </span>
                        )}
                    </div>
                    <div className="font-semibold text-gray-900">{row.fullname}</div>
                </div>
            )
        },
        {
            header: 'No. Telepon',
            accessor: 'nomor_telepon',
            render: (row) => (
                <span className="text-gray-700">{row.nomor_telepon}</span>
            )
        },
        {
            header: 'Alamat',
            accessor: 'alamat',
            render: (row) => (
                <span className="text-gray-700">{row.alamat}</span>
            )
        },
        {
            header: 'Jenis Kelamin',
            accessor: 'jenis_kelamin',
            render: (row) => (
                <span className="text-gray-700">{row.jenis_kelamin}</span>
            )
        },
        {
            header: 'Grup User',
            accessor: 'id_grup_user',
            render: (row) => (
                <span className={`px-3 py-1 rounded-full text-sm font-medium 
                    ${row.id_grup_user === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 
                      row.id_grup_user === 'KEPALA SEKOLAH' ? 'bg-green-100 text-green-700' : 
                      'bg-blue-100 text-blue-700'}`}
                >
                    {row.id_grup_user === 'ADMIN' ? 'Admin' :
                     row.id_grup_user === 'KEPALA SEKOLAH' ? 'Kepala Sekolah' :
                     'Pendaftar'}
                </span>
            )
        },
        {
            header: 'Aksi',
            accessor: 'actions',
            render: (row) => (
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => handleEdit(row.id_user)}
                        className="p-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        title="Edit data user"
                    >
                        <FaEdit className="w-4 h-4" />
                    </button>
                </div>
            )
        },
    ];

    return (
        <>
            <div className="space-y-6">
                {/* Header */}
                <div className="px-2 mb-4">
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Data User
                    </h1>
                    <p className="mt-2 text-sm text-gray-600">Kelola data pengguna sistem PPDB</p>                
                </div>

                {/* Tabel dengan container responsif */}
                <div className="flex justify-center">
                    <div className="w-full">
                        {isLoading ? (
                            <div className="flex justify-center items-center h-32">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                            </div>
                        ) : (
                            <Table 
                                data={dataUser}
                                columns={columns}
                                showCheckbox={false}
                                isSidebarOpen={!isCollapsed}
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* Modal Edit User */}
            <EditUser 
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                userData={selectedUser}
                onSubmit={handleSubmit}
            />
        </>
    );
};

export default DataUser;
