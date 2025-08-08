const express = require('express');
const router = express.Router();
const {
    getAllMonitoringMedis,
    createMonitoringMedis,
    updateMonitoringMedis,
    deleteMonitoringMedis,
} = require ('../controllers/medisController');
const { authenticateToken } = require('../middlewares/auth');
const { exportMedis } = require('../controllers/exportController')

router.use(authenticateToken);

router.get('/', getAllMonitoringMedis);
router.post('/', createMonitoringMedis);
router.put('/:id', updateMonitoringMedis);
router.delete('/:id,', deleteMonitoringMedis);

router.get('/export', exportMedis)

module.exports = router;