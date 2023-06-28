const express = require('express');
const createLlanta = require('../controllers/Llanta.controller');
const { upload } = require('../../middleware/files.middleware');

const LlantaRoute = express.Router();

LlantaRoute.post('/create', upload.single('image'), createLlanta);

module.exports = LlantaRoute;
