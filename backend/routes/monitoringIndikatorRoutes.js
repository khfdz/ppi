const express = require("express");
const router = express.Router();
const {
  getIndikatorByMonitoring,
  createIndikator,
  deleteIndikator,
  updateIndikator
} = require("../controllers/monitoringIndikatorController");
const { authenticateToken, authorizeRoles } = require("../middlewares/auth");

router.use(authenticateToken);

// GET all indikator
router.get("/", authorizeRoles("admin", "supervisor", "user"), getIndikatorByMonitoring);

// GET indikator berdasarkan monitoring_kode
router.get("/:monitoring_kode", authorizeRoles("admin", "supervisor", "user"), getIndikatorByMonitoring);

// CRUD lainnya
router.post("/", authorizeRoles("admin", "supervisor"), createIndikator);
router.put("/:id", authorizeRoles("admin"), updateIndikator);
router.delete("/:id", authorizeRoles("admin"), deleteIndikator);

module.exports = router;
