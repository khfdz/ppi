const express = require('express');
const router = express.Router();
const {
  getAllMonitoring,
  createMonitoring,
  updateMonitoring,
  deleteMonitoring,
} = require('../controllers/monitoringController');
const { exportMonitoring } = require('../controllers/exportController');
const { authenticateToken } = require('../middlewares/auth');

// All routes are protected
router.use(authenticateToken);

router.get('/', getAllMonitoring);
router.post('/', createMonitoring);
router.put('/:id', updateMonitoring);
router.delete('/:id', deleteMonitoring);

router.get('/export', exportMonitoring);

module.exports = router;