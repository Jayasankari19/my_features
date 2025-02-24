const express = require('express');
const { createVehicle, getUserVehicles, deleteVehicle } = require('../controllers/vehicleController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createVehicle);
router.get('/', authMiddleware, getUserVehicles);
router.delete('/:id', authMiddleware, deleteVehicle);

module.exports = router;
