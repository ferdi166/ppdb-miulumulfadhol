import React, { useState, useEffect } from 'react';
import { FaUsers, FaSchool, FaUserGraduate, FaCalendarAlt, FaCheckCircle, FaClock } from 'react-icons/fa';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import moment from 'moment-timezone';
import { formatRangeTanggal } from '../../utils/dateFormat';
import { getAllJadwalPendaftaran } from '../../services/penjadwalan.service';

// Registrasi komponen ChartJS yang dibutuhkan
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement);

/**
 * Komponen untuk statistik card
 * @param {Object} props - Props komponen
 * @param {React.ComponentType} props.icon - Komponen ikon
 * @param {string} props.title - Judul statistik
 * @param {string|number} props.value - Nilai statistik
 * @param {string} props.colorClass - Kelas warna untuk background (bg-color-500)
 */
const StatisticCard = ({ icon: Icon, title, value, colorClass }) => (
    <div className={`${colorClass} rounded-lg shadow-lg p-6`}>
        <div className="flex items-center justify-between">
            <div>
                <p className="text-white text-sm font-medium mb-1">{title}</p>
                <h3 className="text-white text-2xl font-bold">{value}</h3>
            </div>
            <div className="bg-white/20 rounded-full p-3">
                <Icon className="h-8 w-8 text-white" />
            </div>
        </div>
    </div>
);

/**
 * Komponen untuk menampilkan statistik dashboard dan informasi
 * @param {Object} props - Props komponen
 * @param {Object} props.stats - Data statistik
 * @param {number} props.stats.totalDiterima - Total siswa yang diterima
 * @param {number} props.stats.totalPendaftar - Total pendaftar
 * @param {number} props.stats.totalLakiLaki - Total pendaftar laki-laki
 * @param {number} props.stats.totalPerempuan - Total pendaftar perempuan
 * @param {number} props.stats.dayaTampung - Daya tampung sekolah
 */
const DashboardStats = ({ stats = { 
    totalDiterima: 0, 
    totalPendaftar: 0, 
    totalLakiLaki: 0,
    totalPerempuan: 0,
    dayaTampung: 0 
} }) => {
    const [jadwalKegiatan, setJadwalKegiatan] = useState([]);
    const [currentDate, setCurrentDate] = useState(moment());
    const [activeKegiatan, setActiveKegiatan] = useState([]);

    useEffect(() => {
        const loadJadwal = async () => {
            try {
                const response = await getAllJadwalPendaftaran();
                const jadwal = response.map(item => ({
                    ...item,
                    tanggal_mulai: moment(item.tanggal_mulai),
                    tanggal_selesai: moment(item.tanggal_selesai)
                }));
                setJadwalKegiatan(jadwal);

                // Update active kegiatan
                const active = jadwal.filter(kegiatan => 
                    moment().isBetween(kegiatan.tanggal_mulai, kegiatan.tanggal_selesai, 'day', '[]')
                );
                setActiveKegiatan(active);
            } catch (error) {
                console.error('Error loading jadwal:', error);
            }
        };

        loadJadwal();

        // Update current date every minute
        const timer = setInterval(() => {
            setCurrentDate(moment());
        }, 60000);

        return () => clearInterval(timer);
    }, []);
    return (
        <div className="space-y-8">
            {/* Grid Statistik */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Total Diterima */}
                <StatisticCard 
                    icon={FaUserGraduate}
                    title="Total Diterima"
                    value={stats.totalDiterima}
                    colorClass="bg-green-500"
                />

                {/* Total Pendaftar */}
                <StatisticCard 
                    icon={FaUsers}
                    title="Total Pendaftar"
                    value={stats.totalPendaftar}
                    colorClass="bg-blue-500"
                />

                {/* Daya Tampung */}
                <StatisticCard 
                    icon={FaSchool}
                    title="Daya Tampung"
                    value={stats.dayaTampung}
                    colorClass="bg-purple-500"
                />
            </div>

            {/* Area untuk charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
                {/* Pie Chart Kapasitas - Kolom 1 */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-800">Kapasitas Penerimaan</h2>
                        <div className="flex gap-4">
                            <div className="flex items-center">
                                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                                <span className="text-sm text-gray-600">Terisi</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 rounded-full bg-gray-200 mr-2"></div>
                                <span className="text-sm text-gray-600">Tersedia</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative h-64">
                        <Pie 
                            data={{
                                labels: ['Terisi', 'Tersedia'],
                                datasets: [{
                                    data: [stats.totalPendaftar, Math.max(0, stats.dayaTampung - stats.totalPendaftar)],
                                    backgroundColor: ['#3B82F6', '#E5E7EB'],
                                    borderColor: ['#2563EB', '#D1D5DB'],
                                    borderWidth: 2,
                                    borderRadius: 5,
                                    hoverOffset: 4
                                }]
                            }}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        display: false
                                    },
                                    tooltip: {
                                        callbacks: {
                                            label: (context) => {
                                                const value = context.raw;
                                                const total = stats.dayaTampung;
                                                const percentage = ((value / total) * 100).toFixed(1);
                                                return `${value} siswa (${percentage}%)`;
                                            }
                                        }
                                    }
                                },
                                animation: {
                                    animateScale: true,
                                    animateRotate: true
                                }
                            }}
                        />
                    </div>
                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">
                            Total Kapasitas: {stats.dayaTampung} siswa
                        </p>
                    </div>
                </div>

                {/* Bar Chart Status Pendaftar */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-800">Total Pendaftar</h2>
                        <div className="flex gap-4">
                            <div className="flex items-center">
                                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                                <span className="text-sm text-gray-600">Laki-laki</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                                <span className="text-sm text-gray-600">Perempuan</span>
                            </div>
                        </div>
                    </div>
                    <div className="h-64">
                        <Bar
                            data={{
                                labels: ['Laki-laki', 'Perempuan'],
                                datasets: [
                                    {
                                        label: 'Jumlah Pendaftar',
                                        data: [
                                            stats.totalLakiLaki || 0,
                                            stats.totalPerempuan || 0
                                        ],
                                        backgroundColor: ['#10B981', '#F59E0B'],
                                        borderRadius: 6,
                                        borderWidth: 0,
                                        barThickness: 40
                                    }
                                ]
                            }}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                indexAxis: 'x',
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        grid: {
                                            color: '#f0f0f0',
                                            drawBorder: false
                                        },
                                        ticks: {
                                            font: {
                                                size: 12
                                            },
                                            color: '#6B7280'
                                        }
                                    },
                                    x: {
                                        grid: {
                                            display: false
                                        },
                                        ticks: {
                                            font: {
                                                size: 12,
                                                weight: 'bold'
                                            },
                                            color: '#374151'
                                        }
                                    }
                                },
                                plugins: {
                                    legend: {
                                        display: false
                                    },
                                    tooltip: {
                                        callbacks: {
                                            label: (context) => {
                                                const value = context.raw;
                                                const total = stats.totalPendaftar;
                                                const percentage = ((value / total) * 100).toFixed(1);
                                                return `${value} siswa (${percentage}%)`;
                                            }
                                        }
                                    }
                                },
                                animation: {
                                    duration: 1000,
                                    easing: 'easeInOutQuart'
                                },
                                hover: {
                                    mode: 'nearest',
                                    intersect: true
                                }
                            }}
                        />
                    </div>
                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">
                            Total Pendaftar: {stats.totalPendaftar} siswa
                        </p>
                    </div>
                </div>
            </div>

            {/* Area untuk timeline */}
            <div className="mt-8">
                {/* Timeline Kegiatan */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-800">Timeline Kegiatan</h2>
                        <div className="flex items-center gap-2">
                            <FaClock className="text-blue-500" />
                            <span className="text-sm text-gray-600">Jadwal Terkini</span>
                        </div>
                    </div>

                    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        {jadwalKegiatan.map((kegiatan, index) => {
                            const now = moment();
                            const startDate = moment(kegiatan.tanggal_mulai);
                            const endDate = moment(kegiatan.tanggal_selesai);
                            const isActive = now.isBetween(startDate, endDate, 'day', '[]');
                            const isPast = now.isAfter(endDate);
                            const duration = endDate.diff(startDate, 'days');
                            const elapsed = now.diff(startDate, 'days');
                            const progress = Math.min(100, Math.max(0, (elapsed / duration) * 100));

                            return (
                                <div key={kegiatan.id_jadwal_pendaftaran} 
                                     className="flex items-start gap-4 p-4 rounded-xl bg-white border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-200">
                                    <div className="flex-shrink-0">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center
                                            ${isPast ? 'bg-green-100' : isActive ? 'bg-blue-100' : 'bg-gray-100'}`}>
                                            {isPast ? (
                                                <FaCheckCircle className="text-green-500" />
                                            ) : isActive ? (
                                                <FaClock className="text-blue-500" />
                                            ) : (
                                                <FaClock className="text-gray-400" />
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="text-sm font-semibold text-gray-800">{kegiatan.kegiatan}</h3>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {formatRangeTanggal(kegiatan.tanggal_mulai, kegiatan.tanggal_selesai)}
                                        </p>
                                        {isActive && (
                                            <div className="mt-2 flex items-center gap-2">
                                                <div className="h-2 flex-grow bg-gray-200 rounded-full overflow-hidden">
                                                    <div 
                                                        className={`h-full rounded-full transition-all duration-500
                                                            ${isPast ? 'bg-green-500' : 'bg-blue-500'}`}
                                                        style={{ width: `${progress}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-xs text-gray-600">{Math.round(progress)}%</span>
                                            </div>
                                        )}
                                        {!isActive && !isPast && (
                                            <span className="inline-block mt-2 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                                                Akan Datang
                                            </span>
                                        )}
                                        {isPast && (
                                            <span className="inline-block mt-2 px-2 py-1 text-xs bg-green-100 text-green-600 rounded">
                                                Selesai
                                            </span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardStats;
