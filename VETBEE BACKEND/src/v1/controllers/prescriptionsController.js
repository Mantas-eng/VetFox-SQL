const pool = require('../config/db');

const getPetPrescriptions = async (req, res) => {
    const pet_id = req.params.pet_id;
    try {
        const query = 'SELECT prescriptions.*, medications.name AS medication_name FROM prescriptions JOIN medications ON prescriptions.medication_id = medications.id WHERE prescriptions.pet_id = $1';
        const { rows } = await pool.query(query, [pet_id]);
        res.json(rows);
    } catch (error) {
        console.error('Klaida:', error);
        res.status(500).json({ error: 'Klaida gavus augintinio receptus' });
    }
};

const addPrescription = async (req, res) => {
    try {
        const { medication_id, pet_id, comment, timestamp } = req.body;
        const query = 'INSERT INTO prescriptions (medication_id, pet_id, comment, timestamp) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [medication_id, pet_id, comment, timestamp];
        const { rows } = await pool.query(query, values);
        res.status(201).json(rows[0]);
    } catch (error) {
        console.error('Klaida:', error);
        res.status(500).json({ error: 'Klaida įrašant naują receptą' });
    }
};

module.exports = {
    getPetPrescriptions,
    addPrescription,
};
