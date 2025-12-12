const express = require("express");
const router = express.Router();
const { getMomentByUnit } = require("../controllers/momentController");
const { authenticateToken } = require("../middlewares/auth");

router.get("/:unit", authenticateToken, getMomentByUnit);

module.exports = router;