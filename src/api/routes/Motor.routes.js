const express = require('express');
const createMotor = require('../controllers/Motor.controller');

const MotorRoutes = express.Router();

MotorRoutes.post('/create', createMotor);

module.exports = MotorRoutes;
