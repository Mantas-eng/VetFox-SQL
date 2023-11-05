const express = require('express');
const router = express.Router();
const medicationsController = require('../controllers/medicationsController'); // Corrected controller file name

router.get('/v1/meds', medicationsController.getAllMedications);
router.post('/v1/meds', medicationsController.addMedication);

module.exports = router;