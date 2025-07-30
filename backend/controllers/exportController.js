const ExcelJS = require('exceljs');
const pool = require('../config/database'); // pastikan ini path ke koneksi MySQL kamu

const exportMonitoring = async (req, res) => {
  try {
    const [rows] = await pool.execute(
      `SELECT m.*, 
              i.indikator_isi, 
              i.indikator_jenis,
              u.nama_unit AS user_nama_unit
       FROM monitoring_benda_tajam m
       JOIN indikators i ON m.indikator_id = i.indikator_id
       JOIN user u ON m.user_id = u.user_id
       WHERE m.user_id = ?
       ORDER BY m.waktu DESC`,
      [req.user.user_id]
    );

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Monitoring');

    // Header
    worksheet.columns = [
      { header: 'No', key: 'no', width: 5 },
      { header: 'Tanggal', key: 'tanggal', width: 15 },
      { header: 'Minggu Ke-', key: 'minggu', width: 12 },
      { header: 'Indikator', key: 'indikator', width: 40 },
      { header: 'Jenis', key: 'jenis', width: 10 },
      { header: 'Ya / Tidak', key: 'nilai_str', width: 12 },
      { header: 'Nama Unit', key: 'nama_unit', width: 20 }
    ];

    // Data rows
    rows.forEach((row, index) => {
      worksheet.addRow({
        no: index + 1,
        tanggal: new Date(row.waktu).toLocaleDateString('id-ID'),
        minggu: row.minggu,
        indikator: row.indikator_isi,
        jenis: row.indikator_jenis,
        nilai_str: row.nilai === 1 ? 'Ya' : 'Tidak',
        nama_unit: row.user_nama_unit
      });
    });

    // Response setup
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=monitoring.xlsx'
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({
      success: false,
      message: 'Export gagal'
    });
  }
};

module.exports = { exportMonitoring };
