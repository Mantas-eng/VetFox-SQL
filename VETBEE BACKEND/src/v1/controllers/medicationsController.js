const pool = require('../config/db');

const getAllMedications = async (req, res) => {
  try {
    const query = 'SELECT * FROM medications';
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error('Klaida:', error);
    res.status(500).json({ error: 'Klaida gavus vaistus' });
  }
};

const addMedication = async (req, res) => {
  try {
    const { name, description } = req.body;
    const query = 'INSERT INTO medications (name, description) VALUES ($1, $2) RETURNING *';
    const values = [name, description];
    const { rows } = await pool.query(query, values);
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Klaida:', error);
    res.status(500).json({ error: 'Klaida įrašant vaistą' });
  }
};

module.exports = {
  getAllMedications,
  addMedication,
};
