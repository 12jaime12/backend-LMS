const express = require("express");
const { isAuthClient } = require("../../middleware/auth.middleware");
const {
  createCatalogo,
  deleteCar,
  updateCar,
  getAll,
  getByMarca,
  getByModelo,
  addInteresado,
  addLike,
  getByLike,
  getAllBase,
} = require("../controllers/Catalogo.controller");

const CatalogoRoutes = express.Router();

CatalogoRoutes.post("/create", [isAuthClient], createCatalogo);
CatalogoRoutes.delete("/delete/:id", [isAuthClient], deleteCar);
CatalogoRoutes.patch("/updateCatalogo/:id", [isAuthClient], updateCar);
CatalogoRoutes.get("/getMarca/:marca", [isAuthClient], getByMarca);
CatalogoRoutes.get("/getModelo/:modelo", [isAuthClient], getByModelo);
CatalogoRoutes.post("/like/:id", [isAuthClient], addLike);
CatalogoRoutes.get("/getAllBase", getAllBase);
module.exports = CatalogoRoutes;
