const express = require("express");
const {
  getByCoche,
  createComent,
  deleteComent,
  getAll,
  getByCatalogo,
} = require("../controllers/Comentario.controller");
const { isAuthClient } = require("../../middleware/auth.middleware");
const ComentariosRoutes = express.Router();

ComentariosRoutes.post("/create", [isAuthClient], createComent);
ComentariosRoutes.delete("/delete/:id", [isAuthClient], deleteComent);
ComentariosRoutes.get("/getAll", getAll);
ComentariosRoutes.get("/getByCoche/:id", getByCoche);
ComentariosRoutes.get("/getByCatalogo/:id", getByCatalogo);

module.exports = ComentariosRoutes;
