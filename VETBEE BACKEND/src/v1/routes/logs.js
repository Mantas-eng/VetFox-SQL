const express = require('express');
const router = express.Router();
const logsController = require('../controllers/logsController');

app.get('/v1/logs/:petId', logsController.getPetLogs);
router.post('/v1/logs', logsController.addLog);

module.exports = router;
