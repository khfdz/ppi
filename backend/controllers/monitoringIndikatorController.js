const pool = require("../config/db");

// GET semua indikator by monitoring_kode
exports.getIndikatorByMonitoring = async (req, res) => {
  const { monitoring_kode } = req.params;

  try {
    let query = `
      SELECT 
        mi.id, 
        mi.indikator_isi, 
        it.nama_tipe AS indikator_tipe, 
        mi.indikator_tipe_id,
        mi.monitoring_kode,
        mi.dibuat_pada
      FROM monitoring_indikator mi
      JOIN indikator_tipe_master it 
        ON mi.indikator_tipe_id = it.id
    `;

    let values = [];

    // jika ada monitoring_kode → filter
    if (monitoring_kode) {
      query += " WHERE mi.monitoring_kode = ?";
      values.push(monitoring_kode);
    }

    query += " ORDER BY mi.dibuat_pada DESC";

    const [rows] = await pool.query(query, values);

    res.json({
      success: true,
      message: monitoring_kode
        ? `Berhasil mengambil indikator untuk monitoring_kode ${monitoring_kode}`
        : "Berhasil mengambil semua indikator",
      total: rows.length,
      data: rows,
    });

  } catch (err) {
    console.error("Error fetching indikator:", err);
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data indikator"
    });
  }
};


// CREATE indikator baru
exports.createIndikator = async (req, res) => {
  const { monitoring_kode, indikator_tipe_id, indikator_isi } = req.body;

  try {
    await pool.query(
      "INSERT INTO monitoring_indikator (monitoring_kode, indikator_tipe_id, indikator_isi) VALUES (?, ?, ?)",
      [monitoring_kode, indikator_tipe_id, indikator_isi]
    );

    res.json({ message: "Indikator berhasil ditambahkan" });
  } catch (err) {
    console.error("Error creating indikator:", err);
    res.status(500).json({ message: "Gagal menambahkan indikator" });
  }
};



// DELETE indikator
exports.deleteIndikator = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM monitoring_indikator WHERE id=?", [id]);
    res.json({ message: "Indikator berhasil dihapus" });
  } catch (err) {
    console.error("Error deleting indikator:", err);
    res.status(500).json({ message: "Gagal menghapus indikator" });
  }
};

// UPDATE indikator
exports.updateIndikator = async (req, res) => {
  const { id } = req.params;
  const { monitoring_kode, indikator_tipe_id, indikator_isi } = req.body;
  try {
    await pool.query(
      "UPDATE monitoring_indikator SET monitoring_kode=?, indikator_tipe_id=?, indikator_isi=? WHERE id=?",
      [monitoring_kode, indikator_tipe_id, indikator_isi, id]
    );
    res.json({ message: "Indikator berhasil diperbarui" });
  } catch (err) {
    console.error("Error updating indikator:", err);
    res.status(500).json({ message: "Gagal memperbarui indikator" });
  }
};
