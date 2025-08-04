const pool = require('../config/database');

// GET all indikators
const getAllIndikators = async (req, res) => {
  try {
    const { jenis } = req.query;

    let query = 'SELECT * FROM indikators';
    const params = [];

    if (jenis) {
      query += ' WHERE indikator_jenis = ?';
      params.push(jenis);
    }

    query += ' ORDER BY indikator_id DESC';

    const [rows] = await pool.execute(query, params);

    res.status(200).json({
      success: true,
      message: 'Data indikator berhasil diambil',
      data: rows
    });
  } catch (error) {
    console.error('Error fetching indikators:', error);
    res.status(500).json({
      success: false,
      message: 'Gagal mengambil data indikator',
      error: error.message
    });
  }
};


// GET indikator by ID
const getIndikatorById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.execute('SELECT * FROM indikators WHERE indikator_id = ?', [id]);
        
        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Indikator tidak ditemukan'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Data indikator berhasil diambil',
            data: rows[0]
        });
    } catch (error) {
        console.error('Error fetching indikator by ID:', error);
        res.status(500).json({
            success: false,
            message: 'Gagal mengambil data indikator',
            error: error.message
        });
    }
};

// CREATE new indikator
const createIndikator = async (req, res) => {
    try {
        const { indikator_jenis, indikator_isi } = req.body;
        
        // Validasi input
        if (!indikator_jenis || !indikator_isi) {
            return res.status(400).json({
                success: false,
                message: 'indikator_jenis dan indikator_isi harus diisi'
            });
        }
        
        const [result] = await pool.execute(
            'INSERT INTO indikators (indikator_jenis, indikator_isi) VALUES (?, ?)',
            [indikator_jenis, indikator_isi]
        );
        
        res.status(201).json({
            success: true,
            message: 'Indikator berhasil dibuat',
            data: {
                indikator_id: result.insertId,
                indikator_jenis,
                indikator_isi
            }
        });
    } catch (error) {
        console.error('Error creating indikator:', error);
        res.status(500).json({
            success: false,
            message: 'Gagal membuat indikator',
            error: error.message
        });
    }
};

// UPDATE indikator
const updateIndikator = async (req, res) => {
    try {
        const { id } = req.params;
        const { indikator_jenis, indikator_isi } = req.body;
        
        // Validasi input
        if (!indikator_jenis || !indikator_isi) {
            return res.status(400).json({
                success: false,
                message: 'indikator_jenis dan indikator_isi harus diisi'
            });
        }
        
        // Cek apakah indikator exists
        const [existingRows] = await pool.execute('SELECT * FROM indikators WHERE indikator_id = ?', [id]);
        if (existingRows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Indikator tidak ditemukan'
            });
        }
        
        const [result] = await pool.execute(
            'UPDATE indikators SET indikator_jenis = ?, indikator_isi = ? WHERE indikator_id = ?',
            [indikator_jenis, indikator_isi, id]
        );
        
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Indikator tidak ditemukan'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Indikator berhasil diupdate',
            data: {
                indikator_id: parseInt(id),
                indikator_jenis,
                indikator_isi
            }
        });
    } catch (error) {
        console.error('Error updating indikator:', error);
        res.status(500).json({
            success: false,
            message: 'Gagal mengupdate indikator',
            error: error.message
        });
    }
};

// DELETE indikator
const deleteIndikator = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Cek apakah indikator exists
        const [existingRows] = await pool.execute('SELECT * FROM indikators WHERE indikator_id = ?', [id]);
        if (existingRows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Indikator tidak ditemukan'
            });
        }
        
        const [result] = await pool.execute('DELETE FROM indikators WHERE indikator_id = ?', [id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Indikator tidak ditemukan'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Indikator berhasil dihapus'
        });
    } catch (error) {
        console.error('Error deleting indikator:', error);
        res.status(500).json({
            success: false,
            message: 'Gagal menghapus indikator',
            error: error.message
        });
    }
};

module.exports = {
    getAllIndikators,
    getIndikatorById,
    createIndikator,
    updateIndikator,
    deleteIndikator
};