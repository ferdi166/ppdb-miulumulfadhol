import React, { createContext, useContext, useState, useEffect } from 'react';
import { getTotalDiterima } from '../services/totalDiterima.service';
import { getTotalPendaftar } from '../services/totalPendaftar.service';
import { getDayaTampung } from '../services/dayaTampung.service';

// Buat context
const DashboardContext = createContext();

// Custom hook untuk menggunakan dashboard context
export const useDashboard = () => {
    const context = useContext(DashboardContext);
    if (!context) {
        throw new Error('useDashboard harus digunakan di dalam DashboardProvider');
    }
    return context;
};

// Provider component
export const DashboardProvider = ({ children }) => {
    // State untuk menyimpan data statistik
    const [stats, setStats] = useState({
        totalDiterima: 0,
        totalPendaftar: 0,
        totalLakiLaki: 0,
        totalPerempuan: 0,
        dayaTampung: 0
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fungsi untuk mengambil data statistik
    const fetchStats = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const [totalDiterimaData, totalPendaftarData, dayaTampungData] = await Promise.all([
                getTotalDiterima(),
                getTotalPendaftar(),
                getDayaTampung()
            ]);

            setStats({
                totalDiterima: totalDiterimaData?.data || 0,
                totalPendaftar: totalPendaftarData?.total || 0,
                totalLakiLaki: totalPendaftarData?.laki_laki || 0,
                totalPerempuan: totalPendaftarData?.perempuan || 0,
                dayaTampung: Array.isArray(dayaTampungData) ? dayaTampungData[0]?.daya_tampung || 0 : 0
            });
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
            setError('Gagal mengambil data statistik');
        } finally {
            setLoading(false);
        }
    };

    // Mengambil data saat provider dimount dan setup event listener
    useEffect(() => {
        // Ambil data pertama kali
        fetchStats();

        // Setup event listener untuk refresh stats
        const handleRefresh = () => {
            fetchStats();
        };

        // Subscribe ke event refresh_dashboard
        window.addEventListener('refresh_dashboard', handleRefresh);

        // Cleanup event listener saat component unmount
        return () => {
            window.removeEventListener('refresh_dashboard', handleRefresh);
        };
    }, []);

    // Nilai yang akan dishare ke consumer
    const value = {
        stats,
        loading,
        error,
        refreshStats: fetchStats // Untuk memperbarui data manual jika diperlukan
    };

    return (
        <DashboardContext.Provider value={value}>
            {children}
        </DashboardContext.Provider>
    );
};
