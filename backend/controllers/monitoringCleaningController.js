const pool = require('../config/db');
const createError = require('http-errors');

exports.createHeader = async (req, res) => {
    const {
        periode_laporan, 
        tahun_monitoring,
        tanggal_audit,
        petugas_mengamati,
        petugas_diaudit,
        cara_kebersihan_tangan,
        keterangan
    } = req.body;

    if (!periode_laporan) throw createError(400, 'Periode laporan wajib diisi');

    const [result] = await pool.query(
        `INSERT INTO monitoring_cleaning_service
        (
        periode_laporan,
        tahun_monitoring,
        tanggal_audit,
        petugas_mengamati,
        petugas_diaudit,
        cara_kebersihan_tangan,
        keterangan
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
            periode_laporan,
            tahun_monitoring,
            tanggal_audit,
            petugas_mengamati,
            petugas_diaudit,
            cara_kebersihan_tangan,
            keterangan
        ]
        )
        
        res.json({
            success: true,
            id: result.insertId
        })

}

exports.createDetail = async (req, res) => {
    const {
        monitoring_id, 
        moment_id,
        hasil
    } = req.body;
    
    if (!monitoring_id || !moment_id) throw createError(400, 'Monitoring id dan moment id wajib diisi');

    await pool.query(
        `
        INSERT INTO monitoring_cleaning_service_detail
        (
        monitoring_id,
        moment_id,
        hasil
        ) VALUES (?, ?, ?)`,
         [
            monitoring_id,
            moment_id,
            hasil
         ]
    )

    res.json({
        success: true,
        message: "Data berhasil disimpan"
    })
}

exports.createFull = async (req, res) => {
    const conn = await pool.getConnection();
    const { header, detail } = req.body;

    if (!header) throw createError(400, 'Header wajib diisi');
    if (!detail || !Array.isArray(detail)) {
        throw createError(400, 'Detail wajib berupa array');
    }

    await conn.beginTransaction();

    const [headerInsert] = await conn.query(
        `INSERT INTO monitoring_cleaning_service
        (periode_laporan, tahun_monitoring, tanggal_audit, petugas_mengamati, petugas_diaudit, cara_kebersihan_tangan, keterangan) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
            header.periode_laporan,
            header.tahun_monitoring,
            header.tanggal_audit,
            header.petugas_mengamati,
            header.petugas_diaudit,
            header.cara_kebersihan_tangan,
            header.keterangan
        ]
    )

    const headerId = headerInsert.insertId;

    for (const d of detail) {
        if (!d.moment_id) throw createError(400, "moment_id wajib diisi");

        await conn.query(
            `
            INSERT INTO monitoring_cleaning_service_detail
            (monitoring_id, moment_id, hasil)
            VALUES (?, ?, ?)           
            `,
            [headerId, d.moment_id, d.hasil]
        )
    }

    await conn.commit();
    conn.release();

    res.json({ success: true, id:headerId });
}

exports.getById = async (req, res) => {
    const { id } = req.params;

    if (!id) throw createError(400, "ID tidak boleh kosong");

        const [[header]] = await pool.query(
            `SELECT * FROM monitoring_cleaning_service WHERE id = ?`,
            [id]
        )
        
    if (!header) throw createError(404, "Data monitoring tidak ditemukan");

    const [detail] = await pool.query(
        `SELECT d.*, m.nama_moment, m.urutan
        FROM monitoring_cleaning_service_detail d
        LEFT JOIN master_moment m ON m.id = d.moment_id
        WHERE d.monitoring_id = ?
        ORDER BY m.urutan ASC`, 
        [id]
    );
    
    
    res.json({ success: true, header, detail });


}