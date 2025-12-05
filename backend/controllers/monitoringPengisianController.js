const db = require("../config/db");

// ===============================
// 1. TAMBAH PENGISIAN
// ===============================
exports.tambahPengisian = async (req, res) => {
  let { indikator_id, user_id, jawaban, tanggal_input } = req.body;

  // default tanggal: hari ini
  if (!tanggal_input) {
    tanggal_input = new Date().toISOString().slice(0, 10);
  }

  // hitung minggu ke otomatis
  const day = new Date(tanggal_input).getDate();
  let minggu_ke = Math.ceil(day / 7);
  if (minggu_ke > 4) minggu_ke = 4;

  try {
    // CEK apakah user sudah mengisi minggu ini untuk indikator ini
    const [cek] = await db.execute(
      `SELECT id FROM monitoring_pengisian 
       WHERE indikator_id = ? AND user_id = ? AND minggu_ke = ?`,
      [indikator_id, user_id, minggu_ke]
    );

    if (cek.length > 0) {
      return res.status(400).json({
        success: false,
        message: `User sudah mengisi indikator ini di minggu ${minggu_ke}!`
      });
    }

    // SIMPAN DATA
    const query = `
      INSERT INTO monitoring_pengisian (indikator_id, user_id, minggu_ke, jawaban, tanggal_input)
      VALUES (?, ?, ?, ?, ?)
    `;

    await db.execute(query, [
      indikator_id,
      user_id,
      minggu_ke,
      jawaban,
      tanggal_input
    ]);

    return res.json({
      success: true,
      message: `Pengisian berhasil disimpan untuk minggu ${minggu_ke}`
    });

  } catch (error) {
    console.error("❌ Error tambahPengisian:", error);
    return res.status(500).json({ message: error.message });
  }
};




// ===============================
// 2. GET PENGISIAN BY USER
// ===============================
exports.getPengisianByUser = async (req, res) => {
  const { user_id } = req.params;

  try {
    const [rows] = await db.execute(
      `SELECT mp.*, mi.indikator_isi 
       FROM monitoring_pengisian mp
       JOIN monitoring_indikator mi ON mp.indikator_id = mi.id
       WHERE mp.user_id = ?
       ORDER BY mp.dibuat_pada DESC`,
      [user_id]
    );

    return res.json(rows);
  } catch (error) {
    console.error("❌ Error getPengisianByUser:", error);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};


// ===============================
// 3. GET PENGISIAN BY MINGGU
// ===============================
exports.getPengisianByMinggu = async (req, res) => {
  const { minggu_ke } = req.params;

  try {
    const [rows] = await db.execute(
      `SELECT mp.*, mi.indikator_isi, u.nama_user
       FROM monitoring_pengisian mp
       JOIN monitoring_indikator mi ON mp.indikator_id = mi.id
       JOIN user u ON mp.user_id = u.user_id
       WHERE mp.minggu_ke = ?
       ORDER BY mp.indikator_id ASC`,
      [minggu_ke]
    );

    return res.json(rows);
  } catch (error) {
    console.error("❌ Error getPengisianByMinggu:", error);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};


// ===============================
// 4. REKAP PER INDIKATOR (berapa yg jawab YA/TIDAK)
// ===============================
exports.getRekapIndikator = async (req, res) => {
  try {
    const query = `
      SELECT 
        mi.id AS indikator_id,
        mi.indikator_isi,
        SUM(mp.jawaban = 1) AS jumlah_ya,
        SUM(mp.jawaban = 0) AS jumlah_tidak,
        COUNT(*) AS total
      FROM monitoring_indikator mi
      LEFT JOIN monitoring_pengisian mp ON mp.indikator_id = mi.id
      GROUP BY mi.id
      ORDER BY mi.id ASC
    `;

    const [rows] = await db.execute(query);

    return res.json(rows);

  } catch (error) {
    console.error("❌ Error getRekapIndikator:", error);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

exports.getAllPengisianIndikator = async (req, res) => {
  try {
    const { user, indikator_id, minggu_ke, jawaban, tanggal } = req.query;

    let query = `
      SELECT mp.*, mi.indikator_isi, u.nama_user
      FROM monitoring_pengisian mp
      JOIN monitoring_indikator mi ON mp.indikator_id = mi.id
      JOIN user u ON mp.user_id = u.user_id
      WHERE 1=1
    `;

    const params = [];

    if (user) {
      query += " AND u.nama_user LIKE ?";
      params.push(`%${user}%`);
    }

    if (indikator_id) {
      query += " AND mp.indikator_id = ?";
      params.push(indikator_id);
    }

    if (minggu_ke) {
      query += " AND mp.minggu_ke = ?";
      params.push(minggu_ke);
    }

    if (jawaban) {
      query += " AND mp.jawaban = ?";
      params.push(jawaban);
    }

    if (tanggal) {
      query += " AND DATE(mp.tanggal_input) = ?";
      params.push(tanggal);
    }

    query += " ORDER BY mp.minggu_ke ASC, mp.indikator_id ASC";

    const [rows] = await db.execute(query, params);

    res.json({ success: true, data: rows });
  } catch (err) {
    console.error("Error fetching pengisian indikator:", err);
    res.status(500).json({ message: "Gagal mengambil data pengisian indikator" });
  }
};
