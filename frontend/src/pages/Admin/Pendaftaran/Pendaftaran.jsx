import React from 'react';
import FormPendaftaran from '../../../components/FormPendaftaran/FormPendaftaran';
import FormProvider from '../../../context/FormContext';

/**
 * Halaman Pendaftaran di Admin Panel
 * Menggunakan FormProvider untuk state management form pendaftaran
 */
const PendaftaranAdmin = () => {
    return (
        <FormProvider>
            <div className="container mx-auto">
                <h1 className="text-2xl font-semibold mb-6">Form Pendaftaran Siswa</h1>
                <FormPendaftaran mode="create" />
            </div>
        </FormProvider>
    );
};

export default PendaftaranAdmin;
