const pool = require('../config/db'); // Užtikrinti, kad būtų teisingi duomenys

const getPetLogs = async (petId) => {
    try {
        const query = 'SELECT * FROM logs WHERE pet_id = $1';
        const { rows } = await pool.query(query, [petId]);
        return rows;
    } catch (error) {
        console.error('Klaida:', error);
        throw error;
    }
};

const addLog = async (petId, description, status) => {
    try {
        const query = 'INSERT INTO logs (pet_id, description, status) VALUES ($1, $2, $3) RETURNING *';
        const values = [petId, description, status];
        const { rows } = await pool.query(query, values);
        return rows[0];
    } catch (error) {
        console.error('Klaida:', error);
        throw error;
    }
};

module.exports = {
    getPetLogs,
    addLog,

};
