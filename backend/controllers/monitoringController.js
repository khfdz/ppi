const pool = require('../config/database');

const getAllMonitoring = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const { tahun, bulan } = req.query;

    let query = `
      SELECT m.*, 
             i.indikator_isi, 
             i.indikator_jenis,
             u.nama_unit AS user_nama_unit
      FROM monitoring_benda_tajam m
      JOIN indikators i ON m.indikator_id = i.indikator_id
      JOIN user u ON m.user_id = u.user_id
      WHERE m.user_id = ?
    `;

    const queryParams = [user_id];

    if (tahun) {
      query += ` AND YEAR(m.waktu) = ?`;
      queryParams.push(tahun);
    }

    if (bulan) {
      query += ` AND MONTH(m.waktu) = ?`;
      queryParams.push(bulan);
    }

    query += ` ORDER BY m.waktu DESC`;

    const [rows] = await pool.execute(query, queryParams);

    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Get monitoring error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};


const createMonitoring = async (req, res) => {
  try {
    const { indikator_id, minggu, nilai } = req.body;
    const user_id = req.user.user_id;

    // Validasi input
    if (!indikator_id || !minggu || nilai === undefined) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // 1. Cek apakah indikator_id ada di tabel 'indikators'
    const [indikatorExists] = await pool.execute(
      'SELECT indikator_id FROM indikators WHERE indikator_id = ?',
      [indikator_id]
    );

    if (indikatorExists.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Indikator tidak tersedia.'
      });
    }

    // 2. Validasi apakah user sudah mengisi indikator ini di bulan dan tahun yang sama
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

const [indikatorCheck] = await pool.execute(
  `SELECT id FROM monitoring_benda_tajam 
   WHERE user_id = ? 
   AND indikator_id = ? 
   AND minggu = ?
   AND MONTH(Waktu) = ? 
   AND YEAR(Waktu) = ?`,
  [user_id, indikator_id, minggu, currentMonth, currentYear]
);


    if (indikatorCheck.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Indikator telah diisi, silakan pilih indikator lain.'
      });
    }

    // 3. Insert data
    const [result] = await pool.execute(
      `INSERT INTO monitoring_benda_tajam 
       (user_id, indikator_id, minggu, nilai, Waktu) 
       VALUES (?, ?, ?, ?, NOW())`,
      [user_id, indikator_id, minggu, nilai]
    );

    const [rows] = await pool.execute(
      `SELECT id, indikator_id, minggu, nilai, user_id, Waktu AS waktu 
       FROM monitoring_benda_tajam 
       WHERE id = ?`,
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: 'Monitoring data created successfully',
      data: rows[0]
    });
  } catch (error) {
    console.error('Create monitoring error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};




const updateMonitoring = async (req, res) => {
  try {
    const { id } = req.params;
    const { indikator_id, minggu, nilai } = req.body;

    const [result] = await pool.execute(
      'UPDATE monitoring_benda_tajam SET indikator_id = ?, minggu = ?, nilai = ?, Waktu = NOW() WHERE id = ? AND user_id = ?',
      [indikator_id, minggu, nilai, id, req.user.user_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Data not found or unauthorized'
      });
    }

    res.json({
      success: true,
      message: 'Monitoring data updated successfully'
    });
  } catch (error) {
    console.error('Update monitoring error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

const deleteMonitoring = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.execute(
      'DELETE FROM monitoring_benda_tajam WHERE id = ? AND user_id = ?',
      [id, req.user.user_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Data not found or unauthorized'
      });
    }

    res.json({
      success: true,
      message: 'Monitoring data deleted successfully'
    });
  } catch (error) {
    console.error('Delete monitoring error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

module.exports = {
  getAllMonitoring,
  createMonitoring,
  updateMonitoring,
  deleteMonitoring
};