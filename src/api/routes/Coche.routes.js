const { createCoche, deleteCoche } = require("../controllers/Coche.controller");

const express = require("express").Router();
const CocheRoutes = express;

CocheRoutes.post("/createCoche", createCoche);
CocheRoutes.delete("/deleteCoche", deleteCoche);

module.exports = CocheRoutes;
