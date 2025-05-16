import React from 'react';
import DashboardStats from '../../../components/Dashboard/DashboardStats';
import { useDashboard } from '../../../context/DashboardContext';

/**
 * Halaman Dashboard Admin
 */
const DashboardAdmin = () => {
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
                    <h1 className="text-2xl font-bold text-gray-800">Pengelolaan PPDB</h1>
                    <p className="text-sm text-gray-600 mt-1">Statistik dan informasi terkini proses PPDB</p>
                </div>
            </div>

            <DashboardStats stats={stats} />
        </div>
    );
};

export default DashboardAdmin;
