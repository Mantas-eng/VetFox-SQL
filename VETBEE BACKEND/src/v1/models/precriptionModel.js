const pool = require('../config/db'); // Užtikrinti, kad būtų teisingi duomenys

const getPetPrescriptions = async (pet_id) => {
    try {
        const query = `
      SELECT p.*, m.name AS medication_name
      FROM prescriptions p
      INNER JOIN pets pet ON p.pet_id = pet.id
      INNER JOIN medications m ON p.medication_id = m.id
      WHERE pet.id = $1
    `;
        const { rows } = await pool.query(query, [pet_id]);
        return rows;
    } catch (error) {
        console.error('Klaida:', error);
        throw error;
    }
};

const addPrescription = async (pet_id, medicationId, comment) => {
    try {
        const query = 'INSERT INTO prescriptions (pet_id, medication_id, comment, timestamp) VALUES ($1, $2, $3, NOW()) RETURNING *';
        const values = [pet_id, medicationId, comment];
        const { rows } = await pool.query(query, values);
        return rows[0];
    } catch (error) {
        console.error('Klaida:', error);
        throw error;
    }
};

module.exports = {
    getPetPrescriptions,
    addPrescription,
};
