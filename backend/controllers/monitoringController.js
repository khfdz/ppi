const pool = require("../config/db");

// GET semua monitoring
exports.getAllMonitoring = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM monitoring ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    console.error("Error fetching monitoring:", err);
    res.status(500).json({ message: "Gagal mengambil data monitoring" });
  }
};

// CREATE monitoring baru
exports.createMonitoring = async (req, res) => {
  const { kode, judul, keterangan } = req.body;

  try {
    await pool.query(
      "INSERT INTO monitoring (kode, judul, keterangan) VALUES (?, ?, ?)",
      [kode, judul, keterangan]
    );
    res.json({ message: "Monitoring berhasil ditambahkan" });
  } catch (err) {
    console.error("Error creating monitoring:", err);
    res.status(500).json({ message: "Gagal menambahkan monitoring" });
  }
};

// UPDATE monitoring
exports.updateMonitoring = async (req, res) => {
  const { id } = req.params;
  const { kode, judul, keterangan } = req.body;

  try {
    await pool.query(
      "UPDATE monitoring SET kode=?, judul=?, keterangan=? WHERE id=?",
      [kode, judul, keterangan, id]
    );
    res.json({ message: "Monitoring berhasil diperbarui" });
  } catch (err) {
    console.error("Error updating monitoring:", err);
    res.status(500).json({ message: "Gagal memperbarui monitoring" });
  }
};

// DELETE monitoring
exports.deleteMonitoring = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM monitoring WHERE id=?", [id]);
    res.json({ message: "Monitoring berhasil dihapus" });
  } catch (err) {
    console.error("Error deleting monitoring:", err);
    res.status(500).json({ message: "Gagal menghapus monitoring" });
  }
};

exports.getMonitoringDetailByKode = async (req, res) => {
  try {
    const { kode } = req.params;

    const sql = `
      SELECT 
        tm.id AS tipe_id,
        tm.monitoring_kode,
        tm.nama_tipe,
        mi.id AS indikator_id,
        mi.indikator_isi
      FROM indikator_tipe_master tm
      LEFT JOIN monitoring_indikator mi
        ON tm.id = mi.indikator_tipe_id
      WHERE tm.monitoring_kode = ?
      ORDER BY mi.id ASC
    `;

    const [rows] = await pool.query(sql, [kode]);

    const result = rows.reduce((acc, row) => {
      const key = row.tipe_id;

      if (!acc[key]) {
        acc[key] = {
          tipe_id: row.tipe_id,
          monitoring_kode: row.monitoring_kode,
          nama_tipe: row.nama_tipe,
          indikator: []
        };
      }

      if (row.indikator_id) {
        acc[key].indikator.push({
          indikator_id: row.indikator_id,
          indikator_isi: row.indikator_isi
        });
      }

      return acc;
    }, {});

    res.json({
      success: true,
      data: Object.values(result)
    });

  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: err.message });
  }
};
