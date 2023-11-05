const express = require('express');
const router = express.Router();
const prescriptionsController = require('../controllers/prescriptionsController');

router.get('/v1/prescriptions/:petId', prescriptionsController.getPetPrescriptions);
router.post('/v1/prescriptions', prescriptionsController.addPrescription);

module.exports = router;
