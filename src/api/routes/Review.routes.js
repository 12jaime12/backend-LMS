const { isAuthClient } = require('../../middleware/auth.middleware');
const {
  //Nos traemos todos los controladores de Taller para enrutar cada uno de los diferentes servicios que tendrá
  createReview,
  deleteReview,
  mediaPuntuacionReview,
  getReviewByDni,
  getReviewCatalogo,
  getAllReview,
} = require('../controllers/Review.controller');
const express = require('express').Router(); //Nos requerimos la LIBRERIA EXPRESS
const ReviewRoutes = express; //express.Router() nos permite guardar en una variable las futuras rutas que crearemos

//Creamos las rutas en función del tipo de request que será (post, get, patch, delete) y le asignamos una ruta y el controlador
//que se ejecutará en esta ruta
ReviewRoutes.post('/createReview/:id', [isAuthClient], createReview);
ReviewRoutes.delete('/deleteReview/:id', [isAuthClient], deleteReview);
ReviewRoutes.get('/mediaPuntuaciones', mediaPuntuacionReview);
ReviewRoutes.get('/:dni', getReviewByDni);
ReviewRoutes.get('/catalogo', getReviewCatalogo);
ReviewRoutes.get('/', getAllReview);

module.exports = ReviewRoutes;
