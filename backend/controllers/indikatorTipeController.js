const pool = require("../config/db");

// GET tipe indikator by monitoring_kode
exports.getTipeIndikator = async (req, res) => {
  const { monitoring_kode } = req.params;

  try {
    let query = "SELECT * FROM indikator_tipe_master";
    let values = [];

    // Jika ada monitoring_kode → filter
    if (monitoring_kode) {
      query += " WHERE monitoring_kode = ?";
      values.push(monitoring_kode);
    }

    const [rows] = await pool.query(query, values);

    res.json({
      success: true,
      message: monitoring_kode
        ? `Berhasil mengambil tipe indikator untuk monitoring_kode ${monitoring_kode}`
        : "Berhasil mengambil semua tipe indikator",
      total: rows.length,
      data: rows,
    });
  } catch (err) {
    console.error("Error fetching tipe indikator:", err);
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data tipe indikator",
    });
  }
};


// CREATE tipe indikator
exports.createTipe = async (req, res) => {
  const { monitoring_kode, nama_tipe } = req.body;
  try {
    await pool.query(
      "INSERT INTO indikator_tipe_master (monitoring_kode, nama_tipe) VALUES (?, ?)",
      [monitoring_kode, nama_tipe]
    );
    res.json({ message: "Tipe indikator berhasil ditambahkan" });
  } catch (err) {
    console.error("Error creating tipe indikator:", err);
    res.status(500).json({ message: "Gagal menambahkan tipe indikator" });
  }
};

// UPDATE tipe indikator
exports.updateTipe = async (req, res) => {
  const { id } = req.params;
  const { monitoring_kode, nama_tipe } = req.body;
  try {
    await pool.query(
      "UPDATE indikator_tipe_master SET monitoring_kode=?, nama_tipe=? WHERE id=?",
      [monitoring_kode, nama_tipe, id]
    );
    res.json({ message: "Tipe indikator berhasil diperbarui" });
  } catch (err) {
    console.error("Error updating tipe indikator:", err);
    res.status(500).json({ message: "Gagal memperbarui tipe indikator" });
  }
};

// DELETE tipe indikator
exports.deleteTipe = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM indikator_tipe_master WHERE id=?", [id]);
    res.json({ message: "Tipe indikator berhasil dihapus" });
  } catch (err) {
    console.error("Error deleting tipe indikator:", err);
    res.status(500).json({ message: "Gagal menghapus tipe indikator" });
  }
};