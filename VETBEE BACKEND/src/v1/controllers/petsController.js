const pool = require('../config/db'); // Ensure that the data is correct

const getAllPets = async (req, res) => {
    try {
        const query = 'SELECT * FROM pets WHERE isarchived = false';
        const { rows } = await pool.query(query);
        res.json(rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error fetching pets' });
    }
};

const addPet = async (req, res) => {
    try {
        const { name, dob, client_email, img_url } = req.body; // Pridėkite "img_url" įgavimą iš užklausos kūno
        if (!name || !client_email || !img_url) { // Patikrinkite, ar visi reikiami laukai yra pateikti
            return res.status(400).json({ error: 'Name, client_email, and img_url are required.' });
        }

        const query = 'INSERT INTO pets (name, dob, client_email, img_url, isarchived) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const values = [name, dob, client_email, img_url, false];
        const { rows } = await pool.query(query, values);
        res.status(201).json(rows[0]);
    } catch (error) {
        console.error('Klaida:', error);
        res.status(500).json({ error: 'Klaida įrašant augintinį' });
    }
};


const archivePet = async (req, res) => {
    const petId = req.params.id;

    // Patikriname, ar petId yra validus ir ar tai yra skaičius
    if (petId !== undefined && !isNaN(parseInt(petId, 10))) {
        try {
            // Atlikite užklausą, kuri pažymi augintinį kaip archyvuotą
            const query = 'UPDATE pets SET isarchived = true WHERE id = $1';
            await pool.query(query, [petId]);
            res.status(204).end();
        } catch (error) {
            console.error('Klaida:', error);
            res.status(500).json({ error: 'Klaida archyvuojant augintinį' });
        }
    } else {
        res.status(400).json({ error: 'Neteisingas arba trūkstamas augintinio ID' });
    }
};

module.exports = {
    getAllPets,
    addPet,
    archivePet,
};