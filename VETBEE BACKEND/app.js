const express = require('express');
const app = express();
const cors = require('cors');
const router = express.Router();
const bodyParser = require('body-parser');

require('dotenv').config();
const { pool } = require('./src/v1/config/db');

const logsController = require('./src/v1/controllers/logsController');
const petsController = require('./src/v1/controllers/petsController');
const medicationsController = require('./src/v1/controllers/medicationsController'); // Corrected controller file name
const prescriptionsController = require('./src/v1/controllers/prescriptionsController');

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Routes
app.use(router);
app.use(express.static('public')); // Add this if you have static files like HTML, CSS, or JavaScript in a "public" folder

const port = process.env.PORT || 3000;

router.get('/v1/logs/:petId', logsController.getPetLogs);
router.post('/v1/logs', logsController.addLog);

router.get('/v1/pets', petsController.getAllPets);
router.post('/v1/pets', petsController.addPet);
router.delete('/v1/pets/:id', petsController.archivePet);

router.get('/v1/meds', medicationsController.getAllMedications);
router.post('/v1/meds', medicationsController.addMedication);

router.get('/v1/prescriptions/:petId', prescriptionsController.getPetPrescriptions);
router.post('/v1/prescriptions', prescriptionsController.addPrescription);


app.get('/v1/pets', async (req, res) => {
    try {
        const query = 'SELECT * FROM pets WHERE isarchived = false';
        const { rows } = await pool.query(query);
        res.json(rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error fetching pets' });
    }
});


app.delete('/v1/pets/:id', async (req, res) => {
    const petId = req.params.id;

    try {
        const success = await petsController.archivePet(petId);
        if (success) {
            res.status(204).end();
        } else {
            res.status(404).send('Nepavyko ištrinti augintinio');
        }
    } catch (error) {
        console.error('Klaida:', error);
        res.status(500).send('Klaida trinant augintinį');
    }
});
router.get('/getPetById', async (req, res) => {
    const petId = req.query.petId; // Retrieve 'petId' from query parameters

    const query = 'SELECT * FROM your_table WHERE pet_id = $1';
    try {
        const { rows } = await pool.query(query, [petId]);
        res.json(rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to fetch pet data' });
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = router;
