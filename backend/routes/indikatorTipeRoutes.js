const express = require("express");
const router = express.Router();
const { 
  getTipeIndikator,
  createTipe,
  updateTipe,
  deleteTipe
} = require("../controllers/indikatorTipeController");
const { authenticateToken, authorizeRoles } = require("../middlewares/auth");

router.use(authenticateToken);

router.get("/", authorizeRoles("admin"), getTipeIndikator); // GET all
router.get("/:monitoring_kode", authorizeRoles("admin"), getTipeIndikator); // GET by kode
router.post("/", authorizeRoles("admin"), createTipe);
router.put("/:id", authorizeRoles("admin"), updateTipe);
router.delete("/:id", authorizeRoles("admin"), deleteTipe);

module.exports = router;
