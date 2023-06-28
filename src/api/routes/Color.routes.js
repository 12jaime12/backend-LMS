const express = require('express');
const { createColor } = require('../controllers/Color.controller');

const ColorRoutes = express.Router();

ColorRoutes.post('/create', createColor);

module.exports = ColorRoutes;
