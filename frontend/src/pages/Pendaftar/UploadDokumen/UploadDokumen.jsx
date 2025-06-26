import React, { useState, useEffect } from 'react';
import { FaUpload, FaFile, FaCheckCircle, FaTimes, FaCamera } from 'react-icons/fa';
import { getPendaftaranByUserId } from '../../../services/pendaftar.service'
import { getCurrentUser } from '../../../services/user.service'
import { baseURL } from '../../../services/api.service';
import { uploadDokumen } from '../../../services/uploadDokumen.service';
import { toast } from 'react-toastify';

/**
 * Halaman untuk upload dokumen pendaftar
 */
const UploadDokumen = () => {
    const [profileImage, setProfileImage] = useState(null);
    const [originalPhoto, setOriginalPhoto] = useState(null);
    const [isNewPhoto, setIsNewPhoto] = useState(false);
    const [isAgreed, setIsAgreed] = useState(false);
    const [documentNames, setDocumentNames] = useState({});
    const [documentPreviews, setDocumentPreviews] = useState({});
    const [originalDocuments, setOriginalDocuments] = useState({});
    const [documentStatus, setDocumentStatus] = useState({});
    const [documentFiles, setDocumentFiles] = useState({});
    const [newDocuments, setNewDocuments] = useState({});    
    const [loading, setLoading] = useState(false);

    const [documents, setDocuments] = useState([
        { 
            id: 'dok_akta', 
            name: 'Akte Kelahiran', 
            description: 'Upload scan Akte Kelahiran asli',
            status: 'Belum Upload',
            file: null
        },
        { 
            id: 'dok_kk', 
            name: 'Kartu Keluarga', 
            description: 'Upload scan Kartu Keluarga yang masih berlaku',
            status: 'Belum Upload',
            file: null
        },
        { 
            id: 'dok_ijazah', 
            name: 'Ijazah', 
            description: 'Upload scan Ijazah atau Surat Keterangan Lulus',
            status: 'Belum Upload',
            file: null
        },
        { 
            id: 'dok_ktp_orang_tua', 
            name: 'KTP Orang Tua', 
            description: 'Upload scan KTP Orang Tua/Wali yang masih berlaku',
            status: 'Belum Upload',
            file: null
        },
        { 
            id: 'dok_bukti_pembayaran', 
            name: 'Bukti Pembayaran', 
            description: 'Upload bukti pembayaran pendaftaran ke nomor rekening ini : 1234567890',
            status: 'Belum Upload',
            file: null
        }
    ]);


    // Mengambil data dokumen dari API
    const fetchData = async () => {
        setLoading(true);
        try {
            const currentUser = getCurrentUser();
            if (!currentUser) {
                toast.error('User tidak ditemukan');
                return;
            }

            const data = await getPendaftaranByUserId(currentUser.id_user);
            if (!data) {
                toast.error('Data pendaftaran tidak ditemukan');
                return;
            }

            // Update status dokumen dan preview dari API
            setDocuments(prev => prev.map(doc => {
                const apiDoc = data.dokumen.find(d => d.nama === doc.name);
                if (apiDoc) {
                    // Update document previews jika ada file
                    if (apiDoc.file) {
                        const docUrl = `${baseURL}/uploads/pendaftar/${apiDoc.file}`;
                        setDocumentPreviews(prev => ({
                            ...prev,
                            [doc.id]: docUrl
                        }));
                        // Simpan dokumen asli
                        setOriginalDocuments(prev => ({
                            ...prev,
                            [doc.id]: docUrl
                        }));

                        setDocumentStatus(prev => ({
                            ...prev,
                            [doc.id]: 'Lengkap'
                        }));
                    }

                    return {
                        ...doc,
                        status: apiDoc.status,
                        file: apiDoc.file
                    };
                }
                return doc;
            }));

            // Set profile image jika ada
            const fotoDoc = data.dokumen.find(d => d.nama === 'Foto');
            if (fotoDoc?.file) {
                const photoUrl = `${baseURL}/uploads/pendaftar/${fotoDoc.file}`;
                setProfileImage(photoUrl);
                setOriginalPhoto(photoUrl);
                setIsNewPhoto(false);
            }

        } catch (error) {
            console.error('Error fetching documents:', error);
            toast.error('Gagal mengambil data dokumen');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Cleanup URL objects when component unmounts
    useEffect(() => {
        return () => {
            // Membersihkan URL objects untuk mencegah memory leak
            Object.values(documentPreviews).forEach(url => {
                if (url) URL.revokeObjectURL(url);
            });
        };
    }, [documentPreviews]);

    // Tambahkan function untuk detect mobile
    const isMobileDevice = () => {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };

    // Handler untuk upload foto profil
    const handleProfileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validasi ukuran file (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
            toast.error('Ukuran file terlalu besar (maksimal 2MB)');
            return;
        }

        // Validasi tipe file
        if (!file.type.startsWith('image/')) {
            toast.error('File harus berupa gambar');
            return;
        }

        // Hapus URL object yang lama jika ada dan bukan dari server
        if (profileImage && !originalPhoto) {
            URL.revokeObjectURL(profileImage);
        }

        // Untuk mobile, buat copy file yang baru
        if (isMobileDevice()) {
            // Buat file copy untuk mobile compatibility
            const fileReader = new FileReader();
            fileReader.onload = function(e) {
                const arrayBuffer = e.target.result;
                const blob = new Blob([arrayBuffer], { type: file.type });
                const newFile = new File([blob], file.name, { type: file.type });
                
                setDocumentFiles(prev => ({
                    ...prev,
                    'dok_foto': newFile
                }));
            };
            fileReader.readAsArrayBuffer(file);
        } else {
            setDocumentFiles(prev => ({
                ...prev,
                'dok_foto': file
            }));
        }

        const reader = new FileReader();
        reader.onload = () => {
            setProfileImage(reader.result);
            setIsNewPhoto(true);
        };
        reader.readAsDataURL(file);
        
        // Reset input file
        e.target.value = '';
    };

    // Hapus foto profil
    const handleRemovePhoto = () => {
        // Jika ada foto asli dari server, kembalikan ke foto asli
        if (originalPhoto) {
            setProfileImage(originalPhoto);
        } else {
            setProfileImage(null);
        }
        setIsNewPhoto(false);
    };

    // Handler untuk upload dokumen
    const handleDocumentUpload = (e, docId) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validasi ukuran file (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
            toast.error('Ukuran file terlalu besar (maksimal 2MB)');
            return;
        }

        // Validasi tipe file
        if (!file.type.startsWith('image/')) {
            toast.error('Format dokumen belum sesuai (JPG/PNG/JPEG)');
            return;
        }

        // Hapus URL object yang lama jika ada dan bukan dari server
        if (documentPreviews[docId] && !originalDocuments[docId]) {
            URL.revokeObjectURL(documentPreviews[docId]);
        }

        // Untuk mobile, buat copy file yang baru
        if (isMobileDevice()) {
            const fileReader = new FileReader();
            fileReader.onload = function(e) {
                const arrayBuffer = e.target.result;
                const blob = new Blob([arrayBuffer], { type: file.type });
                const newFile = new File([blob], file.name, { type: file.type });
                
                setDocumentFiles(prev => ({
                    ...prev,
                    [docId]: newFile
                }));
            };
            fileReader.readAsArrayBuffer(file);
        } else {
            setDocumentFiles(prev => ({
                ...prev,
                [docId]: file
            }));
        }

        // Update nama file
        setDocumentNames(prev => ({
            ...prev,
            [docId]: file.name
        }));

        // Update status
        setDocumentStatus(prev => ({
            ...prev,
            [docId]: { status: 'success', message: 'File siap diupload' }
        }));

        // Buat preview URL
        const previewUrl = URL.createObjectURL(file);
        setDocumentPreviews(prev => ({
            ...prev,
            [docId]: previewUrl
        }));

        // Tandai sebagai dokumen baru
        setNewDocuments(prev => ({
            ...prev,
            [docId]: true
        }));

        // Reset input file
        e.target.value = '';

        console.log(`File ${file.name} siap diupload untuk ${docId}`);
    };

    const removeDocument = (docId) => {
        // Hapus preview URL jika bukan dari server
        if (documentPreviews[docId] && !originalDocuments[docId]) {
            URL.revokeObjectURL(documentPreviews[docId]);
        }

        // Reset state file dan nama
        setDocumentFiles(prev => {
            const newFiles = { ...prev };
            delete newFiles[docId];
            return newFiles;
        });
        setDocumentNames(prev => {
            const newNames = { ...prev };
            delete newNames[docId];
            return newNames;
        });

        // Reset state dokumen baru
        setNewDocuments(prev => {
            const newDocs = { ...prev };
            delete newDocs[docId];
            return newDocs;
        });

        // Jika ada dokumen asli dari server, kembalikan ke dokumen asli
        if (originalDocuments[docId]) {
            setDocumentPreviews(prev => ({
                ...prev,
                [docId]: originalDocuments[docId]
            }));
            // Status tetap 'Lengkap' karena masih ada dokumen asli
            setDocumentStatus(prev => ({
                ...prev,
                [docId]: 'Lengkap'
            }));
        } else {
            // Jika tidak ada dokumen asli, hapus preview dan status
            setDocumentPreviews(prev => {
                const newPreviews = { ...prev };
                delete newPreviews[docId];
                return newPreviews;
            });
            setDocumentStatus(prev => {
                const newStatus = { ...prev };
                delete newStatus[docId];
                return newStatus;
            });
        }

    };

    // Handler untuk submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isAgreed) {
            toast.warning('Silakan centang persetujuan terlebih dahulu');
            return;
        }

        // Validasi kelengkapan dokumen dan foto
        let missingItems = [];

        // Cek foto profil
        if (!profileImage && !originalPhoto) {
            missingItems.push('Foto Profil');
        }

        // Cek dokumen-dokumen lainnya
        const missingDocuments = documents.filter(doc => {
            const hasExistingDoc = doc.file;
            const hasNewDoc = documentFiles[doc.id];
            return !hasExistingDoc && !hasNewDoc;
        });

        missingItems = [...missingItems, ...missingDocuments.map(doc => doc.name)];

        if (missingItems.length > 0) {
            toast.warning(`Silakan lengkapi item berikut: ${missingItems.join(', ')}`);
            return;
        }

        setLoading(true);

        try {
            const currentUser = getCurrentUser();
            const pendaftaran = await getPendaftaranByUserId(currentUser.id_user);
            
            if (!pendaftaran) {
                toast.error('Data pendaftaran tidak ditemukan');
                return;
            }

            // Membuat FormData dengan pendekatan khusus untuk mobile
            const formData = new FormData();
            
            // Menambahkan file ke FormData jika ada
            documents.forEach(doc => {
                const file = documentFiles[doc.id];
                if (file) {
                    // Untuk mobile, pastikan file dalam format yang benar
                    if (isMobileDevice()) {
                        // Buat blob baru untuk memastikan compatibility
                        const blob = new Blob([file], { type: file.type });
                        formData.append(doc.id, blob, file.name);
                    } else {
                        formData.append(doc.id, file);
                    }
                }
            });

            // Menambahkan foto profil jika ada perubahan
            if (isNewPhoto && documentFiles['dok_foto']) {
                const fotoFile = documentFiles['dok_foto'];
                if (isMobileDevice()) {
                    const blob = new Blob([fotoFile], { type: fotoFile.type });
                    formData.append('dok_foto', blob, fotoFile.name);
                } else {
                    formData.append('dok_foto', fotoFile);
                }
            }

            // Untuk mobile, gunakan timeout yang lebih pendek dan retry mechanism
            if (isMobileDevice()) {
                let attempts = 0;
                const maxAttempts = 3;
                let lastError;

                while (attempts < maxAttempts) {
                    try {
                        await uploadDokumen(pendaftaran.id, formData);
                        break; // Sukses, keluar dari loop
                    } catch (error) {
                        lastError = error;
                        attempts++;
                        
                        if (attempts < maxAttempts) {
                            toast.info(`Mencoba lagi... (${attempts}/${maxAttempts})`);
                            await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2s
                        }
                    }
                }

                if (attempts === maxAttempts) {
                    throw lastError;
                }
            } else {
                // Untuk desktop, gunakan cara normal
                await uploadDokumen(pendaftaran.id, formData);
            }
            
            toast.success('Dokumen berhasil diupload');
            
            // Reset state
            setDocumentFiles({});
            setDocumentNames({});
            setDocumentStatus({});
            setNewDocuments({});
            if (isNewPhoto) {
                setIsNewPhoto(false);
                setOriginalPhoto(profileImage);
            }
            
            // Refresh data dari server
            await fetchData();

        } catch (error) {
            console.error('Error submitting documents:', error);
            let errorMessage = 'Terjadi kesalahan saat mengupload dokumen';
            
            if (error.response?.status === 413) {
                errorMessage = 'Ukuran file terlalu besar';
            } else if (error.response?.status === 422) {
                errorMessage = 'Format file tidak valid';
            } else if (error.message?.includes('Network Error')) {
                errorMessage = 'Masalah koneksi internet. Silakan coba lagi dengan koneksi yang lebih stabil.';
            }
            
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                <span className="ml-3 text-gray-600">Memuat data...</span>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-3 sm:p-6">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-100">
                {/* Profile Photo Section */}
                <div className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 mb-4 sm:mb-6">
                        <h2 className="text-base sm:text-lg font-semibold text-gray-800">Upload Foto</h2>
                        {profileImage && (
                            <span className="text-xs px-2 py-1 rounded-full bg-green-50 text-green-600 self-start sm:self-auto">
                                {isNewPhoto ? 'File siap diupload' : 'Foto telah diupload'}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                        <div className="flex flex-col items-center sm:flex-row sm:items-start gap-3 sm:gap-4">
                            <div className="relative">
                                <div className="w-[114px] h-[151px] border-2 border-dashed rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
                                    {profileImage ? (
                                        <img 
                                            src={profileImage} 
                                            alt="Profile" 
                                            className="w-full h-full object-contain bg-blue-50" 
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-lg font-medium">
                                            Foto 3x4
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex sm:flex-col gap-2">
                                <label className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-md cursor-pointer transition-colors">
                                    <FaCamera size={18} />
                                    <span className="text-sm font-medium whitespace-nowrap">{profileImage ? 'Ganti Foto' : 'Upload Foto'}</span>
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleProfileUpload}
                                        key={profileImage} // Reset input saat foto berubah
                                    />
                                </label>
                                {profileImage && isNewPhoto && (
                                    <button
                                        type="button"
                                        onClick={handleRemovePhoto}
                                        className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-md transition-colors"
                                    >
                                        <FaTimes size={18} />
                                        <span className="text-sm font-medium whitespace-nowrap">Hapus</span>
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="p-4 bg-blue-50 rounded-lg">
                                <h3 className="text-sm font-medium text-blue-800 mb-2">Persyaratan Foto:</h3>
                                <ul className="space-y-2">
                                    <li className="flex items-center text-sm text-blue-700">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-2"></div>
                                        Foto formal ukuran 3x4 cm
                                    </li>
                                    <li className="flex items-center text-sm text-blue-700">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-2"></div>
                                        Format file: JPG, PNG, atau JPEG
                                    </li>
                                    <li className="flex items-center text-sm text-blue-700">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-2"></div>
                                        Ukuran maksimal 2MB
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-[1px] bg-gray-100"></div>

                {/* Upload Dokumen */}
                <div className="p-4 sm:p-6">
                    <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 sm:mb-6">Upload Dokumen</h2>
                    <div className="space-y-4 sm:space-y-6">
                        {documents.map((doc) => (
                            <div key={doc.id} className="flex flex-col">
                                {/* Header dan Status */}
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0 mb-3">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-700">{doc.name}</h3>
                                        <p className="text-xs text-gray-500 mt-0.5">{doc.description}</p>
                                    </div>
                                    {(documentPreviews[doc.id] || doc.file) && (
                                        <span className="text-xs px-2 py-1 rounded-full bg-green-50 text-green-600 self-start">
                                            {newDocuments[doc.id] ? 'File siap diupload' : 'File telah diupload'}
                                        </span>
                                    )}
                                </div>
                                {/* Input File */}
                                <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                                    <div className="flex-1 px-3 py-2 bg-gray-50 border rounded-lg sm:rounded-l-lg sm:rounded-r-none text-sm text-gray-500 flex items-center">
                                        <FaFile className="text-gray-400 mr-2 flex-shrink-0" />
                                        {documentNames[doc.id] ? (
                                            <span className="truncate flex-1">{documentNames[doc.id]}</span>
                                        ) : (
                                            <span className="text-gray-400 text-xs sm:text-sm">PNG/JPG/JPEG (Maks. 2MB)</span>
                                        )}
                                        {documentNames[doc.id] && (
                                            <button 
                                                type="button"
                                                onClick={() => removeDocument(doc.id)}
                                                className="ml-2 text-gray-400 hover:text-red-500 p-1 sm:p-0"
                                            >
                                                <FaTimes />
                                            </button>
                                        )}
                                    </div>
                                    <label
                                        htmlFor={doc.id}
                                        className={`px-4 py-2 ${documentNames[doc.id] 
                                            ? 'bg-green-50 text-green-600 hover:bg-green-100' 
                                            : 'bg-blue-50 text-blue-600 hover:bg-blue-100'} 
                                            rounded-lg sm:rounded-l-none sm:rounded-r-lg cursor-pointer text-sm flex items-center justify-center sm:justify-start gap-2 transition-colors`}
                                    >
                                        {documentNames[doc.id] ? (
                                            <>
                                                <FaCheckCircle className="text-green-500" />
                                                <span className="whitespace-nowrap">Ganti File</span>
                                            </>
                                        ) : (
                                            <>
                                                <FaUpload className="text-blue-500" />
                                                <span className="whitespace-nowrap">Upload File</span>
                                            </>
                                        )}
                                    </label>
                                    <input
                                        type="file"
                                        id={doc.id}
                                        className="hidden"
                                        accept=".jpg,.jpeg,.png"
                                        onChange={(e) => handleDocumentUpload(e, doc.id)}
                                        key={documentPreviews[doc.id]} // Reset input saat dokumen berubah
                                    />
                                </div>
                                {/* Preview Dokumen */}
                                {documentPreviews[doc.id] && (
                                    <div className="mt-3 relative group flex justify-center sm:justify-start">
                                        <div className="relative">
                                            <img 
                                                src={documentPreviews[doc.id]} 
                                                alt={`Preview ${doc.name}`}
                                                className="max-w-[150px] sm:max-w-[200px] max-h-[150px] sm:max-h-[200px] rounded-lg shadow-sm border border-gray-200 object-contain bg-gray-50 hover:border-blue-300 transition-colors"
                                            />
                                            {/* Tampilkan tombol hapus hanya untuk dokumen yang baru diupload dan belum disimpan */}
                                            {newDocuments[doc.id] && documentFiles[doc.id] && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeDocument(doc.id)}
                                                    className="absolute -top-2 -right-2 bg-white rounded-full p-1.5 shadow-sm border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-300 transition-colors"
                                                >
                                                    <FaTimes size={14} />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Agreement and Submit */}
                <div className="p-4 sm:p-6">
                    <div className="flex items-start mb-4">
                        <input
                            type="checkbox"
                            id="agreement"
                            checked={isAgreed}
                            onChange={(e) => setIsAgreed(e.target.checked)}
                            className="mt-1 mr-2 flex-shrink-0"
                        />
                        <label htmlFor="agreement" className="text-sm text-gray-600 flex-1">
                        Menyatakan dengan sesungguhnya bahwa seluruh informasi/dokumen yang saya berikan pada saat pendaftaran PPDB Online ini adalah benar dan dapat dipertanggungjawabkan.
                        </label>
                    </div>
                    <button
                        type="submit"
                        disabled={!isAgreed || loading}
                        className={`w-full py-3 px-4 rounded text-white font-medium transition-colors ${
                            isAgreed && !loading 
                                ? 'bg-blue-500 hover:bg-blue-600' 
                                : 'bg-gray-400 cursor-not-allowed'
                        }`}
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                                {isMobileDevice() ? 'Mengupload (Mobile)...' : 'Mengupload...'}
                            </div>
                        ) : (
                            'Simpan'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UploadDokumen;
