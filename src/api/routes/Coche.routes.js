const { isAuth } = require("../../middleware/auth.middleware");
const {
  createCoche,
  deleteCoche,
  updateCoche,
  getByMarca,
  getAllCoche,
  getByModelo,
} = require("../controllers/Coche.controller");

const express = require("express").Router();
const CocheRoutes = express;

CocheRoutes.post("/createCoche", [isAuth], createCoche);
CocheRoutes.delete("/deleteCoche/:id", [isAuth], deleteCoche);
CocheRoutes.patch("/updateCoche/:id", [isAuth], updateCoche);
CocheRoutes.get("/marca/:marca", getByMarca);
CocheRoutes.get("/modelo/:modelo", getByModelo);
CocheRoutes.get("/", getAllCoche);
module.exports = CocheRoutes;
