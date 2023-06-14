const {
  //Nos traemos todos los controladores de Taller para enrutar cada uno de los diferentes servicios que tendrá
  createReview,
  deleteReview,
  mediaPuntuacionReview,
  getReviewByDni,
  getReviewCatalogo,
  getReviewCoche,
} = require("../controllers/Review.controller");
const express = require("express").Router(); //Nos requerimos la LIBRERIA EXPRESS
const reviewRoutes = express; //express.Router() nos permite guardar en una variable las futuras rutas que crearemos

//Creamos las rutas en función del tipo de request que será (post, get, patch, delete) y le asignamos una ruta y el controlador
//que se ejecutará en esta ruta
reviewRoutes.post("/createReview", createReview);
reviewRoutes.delete("/deleteReview", deleteReview);
reviewRoutes.get("/mediaPuntuaciones", mediaPuntuacionReview);
reviewRoutes.get("/:dni", getReviewByDni);
reviewRoutes.get("/catalogo", getReviewCatalogo);
reviewRoutes.get("/coche", getReviewCoche);

module.exports = reviewRoutes;
