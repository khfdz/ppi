const express = require('express');
const router = express.Router();
const {
  getAllMonitoringAmbulance,
  createMonitoringAmbulance,
  updateMonitoringAmbulance,
  deleteMonitoringAmbulance,
} = require('../controllers/ambulanceController');
const { authenticateToken } = require('../middlewares/auth');

router.use(authenticateToken);

router.get('/', getAllMonitoringAmbulance);
router.post('/', createMonitoringAmbulance);
router.put('/:id', updateMonitoringAmbulance);
router.delete('/:id', deleteMonitoringAmbulance);

module.exports = router;
