const express = require ('express');
const router = express.Router();

const { 
    createHeader,
    createDetail,
    createFull,
    getById,

} = require("../controllers/monitoringGiziController");

const { authenticateToken } = require("../middlewares/auth");

router.post("/header", authenticateToken, createHeader);
router.post("/detail", authenticateToken, createDetail);
router.post("/full", authenticateToken, createFull);
router.get("/:id", authenticateToken, getById);

module.exports = router;