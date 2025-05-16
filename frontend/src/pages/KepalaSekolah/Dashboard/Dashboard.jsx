import React from 'react';
import DashboardStats from '../../../components/Dashboard/DashboardStats';
import { useDashboard } from '../../../context/DashboardContext';

/**
 * Halaman Dashboard Kepala Sekolah
 */
const DashboardKepalaSekolah = () => {
    const { stats, loading, error } = useDashboard();

    if (loading) {
        return (
            <div className="px-2 space-y-6">
                <p>Memuat data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="px-2 space-y-6">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="px-2 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Monitoring PPDB</h1>
                    <p className="text-sm text-gray-600 mt-1">Pantau perkembangan penerimaan siswa baru</p>
                </div>
            </div>

            <DashboardStats stats={stats} />
        </div>
    );
};

export default DashboardKepalaSekolah;