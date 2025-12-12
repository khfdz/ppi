const pool = require('../config/db');
const createError = require('http-errors');

exports.getMomentByUnit = async (req, res) => {
    const { unit } = req.params;

    if (!unit) throw createError(400, 'Unit wajib diisi');

    const [rows] = await pool.query(
        `SELECT id, unit, nama_moment, urutan
        FROM master_moment
        WHERE unit = ?
        ORDER BY urutan ASC
        `,
        [unit]
    )

    if (rows.length === 0) throw createError(404, 'Moment tidak ditemukan');

    res.json({
        success: true,
        total: rows.length,
        data: rows
    })
}


