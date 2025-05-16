import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * Komponen Table untuk menampilkan data dalam format tabel
 * Fitur:
 * - Checkbox untuk seleksi baris
 * - Input pencarian data
 * - Pilihan jumlah data per halaman
 * - Export data (Copy, Excel, CSV, PDF)
 * - Pagination
 * - Responsive dengan horizontal scroll
 * 
 * @param {Object} props - Properties komponen
 * @param {Array} props.data - Array berisi data yang akan ditampilkan
 * @param {Array} props.columns - Array berisi konfigurasi kolom
 * @param {boolean} props.showCheckbox - Menampilkan checkbox di setiap baris jika true
 * @param {boolean} props.isSidebarOpen - Menampilkan sidebar jika true
 * @returns {JSX.Element} Komponen Table
 */
const Table = ({ 
  data, 
  columns, 
  showCheckbox = false, 
  isSidebarOpen = true,
  onCheckboxChange,
  selectedRows = []
}) => {
  // State untuk input pencarian dan pagination
  const [searchQuery, setSearchQuery] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showCopyMessage, setShowCopyMessage] = useState(false);

  // Filter data berdasarkan input pencarian
  const filteredData = data.filter(row => {
    return columns.some(column => {
      const value = row[column.accessor];
      return value && value.toString().toLowerCase().includes(searchQuery.toLowerCase());
    });
  });

  // Reset halaman saat mengubah pencarian
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, itemsPerPage]);

  // Hitung total halaman
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  
  // Hitung data yang ditampilkan di halaman sekarang
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  // Handler untuk checkbox individual
  const handleSelectRow = (id) => {
    if (onCheckboxChange) {
      const isSelected = selectedRows.includes(id);
      onCheckboxChange(!isSelected, id);
    }
  };

  // Fungsi untuk mengubah halaman
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Fungsi untuk halaman sebelumnya
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  // Fungsi untuk halaman selanjutnya
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  // Generate array nomor halaman yang ditampilkan
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  // Fungsi untuk mengkonversi data ke format CSV
  const convertToCSV = (data) => {
    const headers = columns.map(col => col.header).join(',');
    const rows = data.map(row => 
      columns.map(col => {
        const value = row[col.accessor];
        return typeof value === 'string' && value.includes(',') 
          ? `"${value}"` 
          : value;
      }).join(',')
    );
    return [headers, ...rows].join('\n');
  };

  // Fungsi untuk mengkonversi data ke format Excel (CSV dengan BOM)
  const convertToExcel = (data) => {
    const BOM = '\uFEFF';
    return BOM + convertToCSV(data);
  };

  // Fungsi untuk download file
  const downloadFile = (content, fileName, mimeType) => {
    const blob = new Blob([content], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  // Handler untuk tombol Copy
  const handleCopy = async () => {
    const csvContent = convertToCSV(filteredData);
    try {
      await navigator.clipboard.writeText(csvContent);
      setShowCopyMessage(true);
      setTimeout(() => setShowCopyMessage(false), 2000);
    } catch (err) {
      console.error('Gagal menyalin data:', err);
    }
  };

  // Handler untuk tombol Excel
  const handleExcel = () => {
    const excelContent = convertToExcel(filteredData);
    const fileName = `data_${new Date().toISOString().split('T')[0]}.xlsx`;
    downloadFile(excelContent, fileName, 'application/vnd.ms-excel');
  };

  // Handler untuk tombol CSV
  const handleCSV = () => {
    const csvContent = convertToCSV(filteredData);
    const fileName = `data_${new Date().toISOString().split('T')[0]}.csv`;
    downloadFile(csvContent, fileName, 'text/csv');
  };

  // Handler untuk tombol PDF
  const handlePDF = () => {
    window.print();
  };

  return (
    <div className={`max-w-[330px] mx-auto sm:max-w-[770px] ${isSidebarOpen ? 'lg:max-w-[1040px]' : 'lg:max-w-[1200px]'} bg-white rounded-xl border border-gray-300 p-2 sm:p-4`}>
      {/* Header Tabel */}
      <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:items-center lg:justify-between mb-4">
        {/* Bagian Atas Mobile: Search dan Items Per Page */}
        <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:items-center w-full lg:w-auto">        
          {/* Pilihan jumlah data per halaman */}
          <div className="flex items-center">
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span className="text-sm text-gray-600 ml-2">per halaman</span>
          </div>
        </div>

        {/* Tombol Export */}
        <div className="flex items-center justify-start lg:justify-end space-x-2 w-full lg:w-auto">
          <button 
            onClick={handleCopy}
            className="px-2 sm:px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 relative"
          >
            Copy
            {showCopyMessage && (
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                Tersalin!
              </div>
            )}
          </button>
          <button 
            onClick={handleExcel}
            className="px-2 sm:px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800"
          >
            Excel
          </button>
          <button 
            onClick={handleCSV}
            className="px-2 sm:px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800"
          >
            CSV
          </button>
          <button 
            onClick={handlePDF}
            className="px-2 sm:px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800"
          >
            PDF
          </button>
        </div>

        {/* Input pencarian */}
        <div className="relative w-full lg:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari data..."
            className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Tabel dengan overflow dan padding yang responsif */}
      <div className="overflow-x-auto -mx-2 sm:-mx-4">
        <div className="inline-block min-w-full align-middle px-2 sm:px-4">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                {showCheckbox && (
                  <th scope="col" className="px-3 sm:px-6 py-3">
                    <div className="flex items-center">                    
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Pilih</span>
                    </div>
                  </th>
                )}
                {columns.map((column, index) => (
                  <th
                    key={index}
                    scope="col"
                    className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {showCheckbox && (
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                          checked={selectedRows.includes(row.id)}
                          onChange={() => handleSelectRow(row.id)}
                        />
                      </div>
                    </td>
                  )}
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      {column.render ? column.render(row) : row[column.accessor]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination dengan tampilan responsif */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-4">
        <div className="text-xs sm:text-sm text-gray-700 text-center sm:text-left">
          Menampilkan {startIndex + 1} sampai {Math.min(endIndex, filteredData.length)} dari {filteredData.length} data
        </div>
        <div className="flex items-center justify-center space-x-1 sm:space-x-2">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs sm:text-sm ${
              currentPage === 1
                ? 'text-gray-400 border-gray-200 cursor-not-allowed'
                : 'text-gray-600 border-gray-300 hover:bg-gray-100 border'
            }`}
            aria-label="Halaman sebelumnya"
          >
            &laquo;
          </button>
          {getPageNumbers().map(number => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs sm:text-sm ${
                currentPage === number
                  ? 'bg-blue-600 text-white border border-blue-600'
                  : 'text-gray-600 border-gray-300 hover:bg-gray-100 border'
              }`}
              aria-label={`Halaman ${number}`}
            >
              {number}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs sm:text-sm ${
              currentPage === totalPages
                ? 'text-gray-400 border-gray-200 cursor-not-allowed'
                : 'text-gray-600 border-gray-300 hover:bg-gray-100 border'
            }`}
            aria-label="Halaman selanjutnya"
          >
            &raquo;
          </button>
        </div>
      </div>
    </div>
  );
};

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string.isRequired,
      accessor: PropTypes.string.isRequired,
    })
  ).isRequired,
  showCheckbox: PropTypes.bool,
  isSidebarOpen: PropTypes.bool,
  onCheckboxChange: PropTypes.func,
  selectedRows: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
};

export default Table;