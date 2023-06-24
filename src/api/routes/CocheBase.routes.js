const express = require("express");
const {
  createCocheBase,
  getByMarca,
  getById,
  addLike,
} = require("../controllers/CocheBase.controller");
const { isAuthClient } = require("../../middleware/auth.middleware");

const CocheBaseRoutes = express.Router();

CocheBaseRoutes.post("/create", createCocheBase);
CocheBaseRoutes.get("/getByMarca/:marca", getByMarca);
CocheBaseRoutes.get("/getById/:id", getById);
CocheBaseRoutes.patch("/addLike", [isAuthClient], addLike);

module.exports = CocheBaseRoutes;
