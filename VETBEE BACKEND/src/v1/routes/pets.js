const express = require('express');
const router = express.Router();
const petsController = require('../controllers/petsController');

router.get('/v1/pets', petsController.getAllPets);
router.post('/v1/pets', petsController.addPet);
router.delete('/v1/pets/:id', petsController.archivePet);

module.exports = router;




