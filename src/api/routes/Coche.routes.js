const { isAuth, isAuthClient } = require("../../middleware/auth.middleware");
const {
  createCoche,
  deleteCoche,
  updateCoche,
  getByMarca,
  getAllCoche,
  getByModelo,
  getByLike,
  addInteresado,
  addLike,
  addTaller,
} = require("../controllers/Coche.controller");
const Coche = require("../models/Coche.model");

const express = require("express").Router();
const CocheRoutes = express;

CocheRoutes.post("/createCoche", [isAuthClient], createCoche);
CocheRoutes.post("/addInteresado", [isAuthClient], addInteresado);
CocheRoutes.post("/addLike", [isAuthClient], addLike);
CocheRoutes.post("/addTaller", [isAuthClient], addTaller);
CocheRoutes.delete("/deleteCoche/:id", [isAuthClient], deleteCoche);
CocheRoutes.patch("/updateCoche/:id", [isAuthClient], updateCoche);
CocheRoutes.get("/marca/:marca", getByMarca);
CocheRoutes.get("/modelo/:modelo", getByModelo);
CocheRoutes.get("/", getAllCoche);
CocheRoutes.get("/likes", getByLike);
module.exports = CocheRoutes;
