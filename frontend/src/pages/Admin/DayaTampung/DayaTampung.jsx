import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getDayaTampung, updateDayaTampung } from '../../../services/dayaTampung.service';

const DayaTampung = () => {
  const [maxPendaftar, setMaxPendaftar] = useState('');
  const [loading, setLoading] = useState(false);
  const [idDayaTampung, setIdDayaTampung] = useState(null);

  // Handle perubahan input dengan validasi
  const handleChange = (e) => {
    const value = e.target.value;
    // Hanya izinkan angka
    if (value === '' || /^[0-9]+$/.test(value)) {
      setMaxPendaftar(value);
    }
  };

  // Mengambil data daya tampung saat komponen dimount
  useEffect(() => {
    const fetchDayaTampung = async () => {
      try {
        const data = await getDayaTampung();
        if (data && data.length > 0) {
          // Ambil data pertama karena berbentuk array
          const dayaTampung = data[0];
          setMaxPendaftar(parseInt(dayaTampung.daya_tampung));
          setIdDayaTampung(dayaTampung.id_daya_tampung);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchDayaTampung();
  }, []);

  // Handle submit form untuk update daya tampung
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = {
        daya_tampung: parseInt(maxPendaftar)
      };

      await updateDayaTampung(idDayaTampung, formData);
      toast.success('Daya tampung berhasil diperbarui');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-blue-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Daya Tampung</h1>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-blue-800">Tentukan jumlah maksimal siswa yang dapat diterima di sekolah. Angka ini akan menjadi batasan dalam proses penerimaan siswa baru.</p>
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="maxPendaftar" className="block text-sm font-medium text-gray-700 mb-2">
            Maksimal Daya Tampung
          </label>
          <div className="relative">
            <input
              id="maxPendaftar"
              type="number"
              value={maxPendaftar}
              onChange={handleChange}
              placeholder="Contoh: 100"
              inputMode="numeric"
              pattern="[0-9]*"
              onKeyDown={(e) => {
                if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                  e.preventDefault()
                }
                if (['-', '+', '.', 'e', 'E'].includes(e.key)) {
                  e.preventDefault()
                }
              }}
              required
              className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-lg"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <span className="text-gray-500">siswa</span>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-500">Masukkan hanya angka tanpa spasi atau karakter khusus</p>
        </div>

        <button 
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Menyimpan...</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Simpan Perubahan</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default DayaTampung;