import moment from 'moment-timezone'

// Mapping nama bulan ke bahasa Indonesia
export const namaBulan = {
  1: 'Januari',
  2: 'Februari',
  3: 'Maret',
  4: 'April',
  5: 'Mei',
  6: 'Juni',
  7: 'Juli',
  8: 'Agustus',
  9: 'September',
  10: 'Oktober',
  11: 'November',
  12: 'Desember'
}

/**
 * Format tanggal ke format Indonesia
 * @param {moment} date - Objek moment
 * @returns {Object} Objek berisi tanggal, bulan, dan tahun
 */
export const formatTanggalIndo = (date) => {
  const tanggal = date.format('DD')
  const bulan = namaBulan[parseInt(date.format('M'))]
  const tahun = date.format('YYYY')
  return { tanggal, bulan, tahun }
}

/**
 * Format range tanggal ke string Indonesia
 * @param {string} tanggalMulai - Tanggal mulai dalam format ISO
 * @param {string} tanggalSelesai - Tanggal selesai dalam format ISO (opsional)
 * @returns {string} String tanggal dalam format Indonesia
 */
export const formatRangeTanggal = (tanggalMulai, tanggalSelesai = null) => {
  const startDate = moment.tz(tanggalMulai, 'Asia/Jakarta')
  const endDate = tanggalSelesai ? moment.tz(tanggalSelesai, 'Asia/Jakarta') : null

  if (!endDate) {
    const { tanggal, bulan, tahun } = formatTanggalIndo(startDate)
    return `${tanggal} ${bulan} ${tahun}`
  }

  // Cek apakah bulan dan tahun sama
  const samaBulan = startDate.month() === endDate.month()
  const samaTahun = startDate.year() === endDate.year()

  const startDateIndo = formatTanggalIndo(startDate)
  const endDateIndo = formatTanggalIndo(endDate)

  if (samaBulan && samaTahun) {
    // Jika bulan dan tahun sama, tampilkan bulan dan tahun sekali
    return `${startDateIndo.tanggal} - ${endDateIndo.tanggal} ${startDateIndo.bulan} ${startDateIndo.tahun}`
  } else if (samaTahun) {
    // Jika hanya tahun yang sama
    return `${startDateIndo.tanggal} ${startDateIndo.bulan} - ${endDateIndo.tanggal} ${endDateIndo.bulan} ${startDateIndo.tahun}`
  } else {
    // Jika bulan dan tahun berbeda
    return `${startDateIndo.tanggal} ${startDateIndo.bulan} ${startDateIndo.tahun} - ${endDateIndo.tanggal} ${endDateIndo.bulan} ${endDateIndo.tahun}`
  }
}
