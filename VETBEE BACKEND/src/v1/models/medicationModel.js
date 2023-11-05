const pool = require('../config/db'); // Užtikrinti, kad būtų teisingi duomenys

const getAllMedications = async () => {
    try {
        const query = 'SELECT * FROM medications';
        const { rows } = await pool.query(query);
        return rows;
    } catch (error) {
        console.error('Klaida:', error);
        throw error;
    }
};

const addMedication = async (name, description) => {
    try {
        const query = 'INSERT INTO medications (name, description) VALUES ($1, $2) RETURNING *';
        const values = [name, description];
        const { rows } = await pool.query(query, values);
        return rows[0];
    } catch (error) {
        console.error('Klaida:', error);
        throw error;
    }
};

module.exports = {
    getAllMedications,
    addMedication,
};
