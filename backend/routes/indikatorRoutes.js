const express = require('express');
const router = express.Router();
const {
    getAllIndikators,
    getIndikatorById,
    createIndikator,
    updateIndikator,
    deleteIndikator
} = require('../controllers/indikatorController');

// Routes
router.get('/', getAllIndikators);           // GET /api/indikators
router.get('/:id', getIndikatorById);        // GET /api/indikators/:id
router.post('/', createIndikator);           // POST /api/indikators
router.put('/:id', updateIndikator);         // PUT /api/indikators/:id
router.delete('/:id', deleteIndikator);      // DELETE /api/indikators/:id

module.exports = router;