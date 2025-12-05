const express = require("express");
const router = express.Router();

const {
  tambahPengisian,
  getPengisianByUser,
  getPengisianByMinggu,
  getRekapIndikator,
  getAllPengisianIndikator
} = require("../controllers/monitoringPengisianController");
const { authenticateToken, authorizeRoles } = require("../middlewares/auth");

router.use(authenticateToken);

router.post("/tambah", authorizeRoles("admin", "supervisor", "user"), tambahPengisian);
router.get("/user/:user_id", authorizeRoles("admin", "supervisor", "user"), getPengisianByUser);
router.get("/minggu/:minggu_ke", authorizeRoles("admin", "supervisor", "user"), getPengisianByMinggu);
router.get("/rekap", authorizeRoles("admin", "supervisor", "user"), getRekapIndikator);
router.get("/", authorizeRoles("admin", "supervisor", "user"), getAllPengisianIndikator);

module.exports = router;
