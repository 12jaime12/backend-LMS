const { isAuthClient } = require("../../middleware/auth.middleware");
const {
  //Nos traemos todos los controladores de Taller para enrutar cada uno de los diferentes servicios que tendrá
  createReview,
  deleteReview,
  mediaPuntuacionReview,
  getReviewByDni,
  getReviewCatalogo,
} = require("../controllers/Review.controller");
const express = require("express").Router(); //Nos requerimos la LIBRERIA EXPRESS
const reviewRoutes = express; //express.Router() nos permite guardar en una variable las futuras rutas que crearemos

//Creamos las rutas en función del tipo de request que será (post, get, patch, delete) y le asignamos una ruta y el controlador
//que se ejecutará en esta ruta
reviewRoutes.post("/createReview", [isAuthClient], createReview);
reviewRoutes.delete("/deleteReview", [isAuthClient], deleteReview);
reviewRoutes.get("/mediaPuntuaciones", mediaPuntuacionReview);
reviewRoutes.get("/:dni", getReviewByDni);
reviewRoutes.get("/catalogo", getReviewCatalogo);

module.exports = reviewRoutes;
