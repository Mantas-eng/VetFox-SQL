const pool = require('../config/db'); // Užtikrinti, kad būtų teisingi duomenys

const getAllPets = async () => {
    try {
        const query = 'SELECT * FROM pets WHERE isarchived = false';
        const { rows } = await pool.query(query);
        return rows;
    } catch (error) {
        console.error('Klaida:', error);
        throw error;
    }
};

const addPet = async (name, dob, client_email, img_url) => {
    try {
        const query = 'INSERT INTO pets (name, dob, client_email, isarchived) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [name, dob, client_email, img_url, false];
        const { rows } = await pool.query(query, values);
        return rows[0];
    } catch (error) {
        console.error('Klaida:', error);
        throw error;
    }
};

const archivePet = async (id) => {
    try {
        const query = 'UPDATE pets SET isarchived = true WHERE id = $1';
        await pool.query(query, [id]);
    } catch (error) {
        console.error('Klaida:', error);
        throw error;
    }
};

module.exports = {
    getAllPets,
    addPet,
    archivePet,
};
