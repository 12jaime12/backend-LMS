const { isAuth, isAuthClient } = require("../../middleware/auth.middleware");
const { upload } = require("../../middleware/files.middleware");
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
  getCocheById,
} = require("../controllers/Coche.controller");
const Coche = require("../models/Coche.model");

const express = require("express").Router();
const CocheRoutes = express;

CocheRoutes.post(
  "/createCoche",
  [isAuthClient],
  upload.fields([
    { name: "option_1", maxCount: 1 },
    { name: "option_2", maxCount: 1 },
    { name: "option_3", maxCount: 1 },
    { name: "option_4", maxCount: 1 },
  ]),
  createCoche
);
CocheRoutes.post("/addInteresado", [isAuthClient], addInteresado);
CocheRoutes.post("/addLike", [isAuthClient], addLike);
CocheRoutes.post("/addTaller", [isAuthClient], addTaller);
CocheRoutes.delete("/deleteCoche/:id", [isAuthClient], deleteCoche);
CocheRoutes.patch("/updateCoche/:id", [isAuthClient], updateCoche);
CocheRoutes.get("/marca/:marca", getByMarca);
CocheRoutes.get("/modelo/:modelo", getByModelo);
CocheRoutes.get("/", getAllCoche);
CocheRoutes.get("/likes", getByLike);
CocheRoutes.get("/coche/:id", getCocheById);
module.exports = CocheRoutes;
