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

ComentariosRoutes.post("/create/:id", [isAuthClient], createComent);
ComentariosRoutes.delete("/delete/:id", [isAuthClient], deleteComent);
ComentariosRoutes.get("/getAll", [isAuthClient], getAll);
ComentariosRoutes.get("/getByCoche/:id", [isAuthClient], getByCoche);
ComentariosRoutes.get("/getByCatalogo/:id", [isAuthClient], getByCatalogo);

module.exports = ComentariosRoutes;
