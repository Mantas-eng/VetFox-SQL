const pool = require('../config/db');

const getPetLogs = async (req, res) => {
    const pet_id = req.params.pet_id;
    try {
        const query = 'SELECT logs.*, pets.name AS pet_name FROM logs JOIN pets ON logs.pet_id = pets.id WHERE logs.pet_id = $1';
        const { rows } = await pool.query(query, [pet_id]);
        res.json(rows);
    } catch (error) {
        console.error('Klaida:', error);
        res.status(500).json({ error: 'Klaida gavus augintinio įrašus' });
    }
};

const addLog = async (req, res) => {
    try {
        const description = req.body.description;
        if (!description) {
            return res.status(400).json({ error: 'Description cannot be empty' });
        }
        // Tęskite su įrašymo operacija
        const pet_id = req.body.pet_id;
        const status = req.body.status;
        const query = 'INSERT INTO logs (pet_id, description, status) VALUES ($1, $2, $3) RETURNING *';
        const values = [pet_id, description, status];
        const { rows } = await pool.query(query, values);
        res.status(201).json(rows[0]);

        res.status(201).json(rows[0]);
    } catch (error) {
        console.error('Klaida:', error);
        res.status(500).json({ error: 'Klaida įrašant naują įrašą' });
    }
};

module.exports = {
    getPetLogs,
    addLog,
};


