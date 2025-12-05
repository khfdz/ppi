const express = require("express");
const router = express.Router();
const {
  getAllMonitoring,
  createMonitoring,
  updateMonitoring,
  deleteMonitoring,
  getMonitoringDetailByKode
} = require("../controllers/monitoringController");

const { authenticateToken, authorizeRoles } = require("../middlewares/auth");

// Semua route butuh token
router.use(authenticateToken);

// CRUD Monitoring
router.get("/", authorizeRoles("admin", "supervisor", "user"), getAllMonitoring);
router.post("/", authorizeRoles("admin"), createMonitoring);
router.put("/:id", authorizeRoles("admin"), updateMonitoring);
router.delete("/:id", authorizeRoles("admin"), deleteMonitoring);

// Detail berdasarkan CODE
router.get("/:kode/detail", authorizeRoles("admin", "supervisor", "user"), getMonitoringDetailByKode);

module.exports = router;
