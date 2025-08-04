const pool = require('../config/database');

const getAllMonitoringAmbulance = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const { tahun, bulan } = req.query;

    let query = `
      SELECT m.*, 
             i.indikator_isi, 
             i.indikator_jenis,
             u.nama_unit AS user_nama_unit
      FROM monitoring_ambulance m
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
    console.error('Get ambulance monitoring error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

const createMonitoringAmbulance = async (req, res) => {
  try {
    const { indikator_id, minggu, nilai } = req.body;
    const user_id = req.user.user_id;

    if (!indikator_id || !minggu || nilai === undefined) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

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

    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    const [check] = await pool.execute(
      `SELECT id FROM monitoring_ambulance 
       WHERE user_id = ? 
       AND indikator_id = ? 
       AND minggu = ? 
       AND MONTH(waktu) = ? 
       AND YEAR(waktu) = ?`,
      [user_id, indikator_id, minggu, currentMonth, currentYear]
    );

    if (check.length > 0) {
      const idToUpdate = check[0].id;

      await pool.execute(
        `UPDATE monitoring_ambulance 
         SET nilai = ?, waktu = NOW()
         WHERE id = ?`,
        [nilai, idToUpdate]
      );

      const [updatedData] = await pool.execute(
        `SELECT id, indikator_id, minggu, nilai, user_id, waktu 
         FROM monitoring_ambulance 
         WHERE id = ?`,
        [idToUpdate]
      );

      return res.status(200).json({
        success: true,
        message: 'Data ambulance berhasil diperbarui',
        data: updatedData[0]
      });
    }

    const [insertResult] = await pool.execute(
      `INSERT INTO monitoring_ambulance 
       (user_id, indikator_id, minggu, nilai, waktu) 
       VALUES (?, ?, ?, ?, NOW())`,
      [user_id, indikator_id, minggu, nilai]
    );

    const [newData] = await pool.execute(
      `SELECT id, indikator_id, minggu, nilai, user_id, waktu 
       FROM monitoring_ambulance 
       WHERE id = ?`,
      [insertResult.insertId]
    );

    res.status(201).json({
      success: true,
      message: 'Data ambulance berhasil ditambahkan',
      data: newData[0]
    });
  } catch (error) {
    console.error('Create ambulance monitoring error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

const updateMonitoringAmbulance = async (req, res) => {
  try {
    const { id } = req.params;
    const { indikator_id, minggu, nilai } = req.body;

    const [result] = await pool.execute(
      `UPDATE monitoring_ambulance 
       SET indikator_id = ?, minggu = ?, nilai = ?, waktu = NOW()
       WHERE id = ? AND user_id = ?`,
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
      message: 'Data ambulance berhasil diperbarui'
    });
  } catch (error) {
    console.error('Update ambulance monitoring error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

const deleteMonitoringAmbulance = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.execute(
      'DELETE FROM monitoring_ambulance WHERE id = ? AND user_id = ?',
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
      message: 'Data ambulance berhasil dihapus'
    });
  } catch (error) {
    console.error('Delete ambulance monitoring error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

module.exports = {
  getAllMonitoringAmbulance,
  createMonitoringAmbulance,
  updateMonitoringAmbulance,
  deleteMonitoringAmbulance
};
