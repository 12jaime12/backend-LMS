const express = require("express");
const {
  createCocheBase,
  getByMarca,
  getById,
} = require("../controllers/CocheBase.controller");

const CocheBaseRoutes = express.Router();

CocheBaseRoutes.post("/create", createCocheBase);
CocheBaseRoutes.get("/getByMarca/:marca", getByMarca);
CocheBaseRoutes.get("/getById/:id", getById);

module.exports = CocheBaseRoutes;
