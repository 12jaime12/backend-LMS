const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const User = require("../models/User.model");
const Review = require("../models/Review.model");
const Taller = require("../models/Taller.model");
const Catalogo = require("../models/Catalogo.model");

//--------1-----------CREATE REVIEW--------------------------
//-----------------------------------------------------------
const createReview = async (req, res, next) => {
  try {
    await Review.syncIndexes();
    const { id } = req.params; //id del coche que la recibe por parametros desde la url al entrar a la pagina del coche
    const { content, estrellas } = req.body;
    const { _id } = req.user;

    const userReview = await User.findById(_id);
    const cocheReview = await Catalogo.findById(id);

    if (!userReview) {
      return res.status(404).json("El usuario no existe");
    } else {
      const newReview = new Review({
        cliente: userReview,
        coche_tienda: cocheReview,
        content: content,
        estrellas: estrellas,
      });

      try {
        const saveReview = newReview.save();

        if (saveReview) {
          await userReview.updateOne({ $push: { review: newReview._id } });
          await cocheReview.updateOne({ $push: { review: newReview._id } });
        } else {
          return res
            .status(404)
            .json("La review no se ha guardado correctamente");
        }
      } catch (error) {
        return next(error);
      }
    }
  } catch (error) {
    return next(error);
  }
};
//--------2-----------DELETE REVIEW--------------------------
//-----------------------------------------------------------
const deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params; //id de la review que la recibe por parametros al llamar a la funcion en el front
    const { _id } = req.user;
    const deleteReview = await Review.findById(id);
    const userReview = await User.findById(_id);

    if (!deleteReview) {
      return res.status(404).json("Problema con la review. No existe");
    } else {
      const idUser = deleteReview.cliente;
      const idCoche = deleteReview.coche_tienda;

      await User.findByIdAndUpdate(idUser, {
        $pull: { review_coche: id },
      });
      await Catalogo.findByIdAndUpdate(idCoche, {
        $pull: { reviews: id },
      });
    }
  } catch (error) {
    return next(error);
  }
};
//--------3-----------MEDIA PUNTUACION-----------------------
//-----------------------------------------------------------
const mediaPuntuacionReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const coche = await Catalogo.findById(id);

    if (!coche) {
      return res.status(404).json("Error al cargar el coche");
    } else {
      const arrayReviews = coche.reviews;
      const sumaTotal = 0;
      arrayReviews.forEach((elem) => {
        sumaTotal += elem.estrellas;
      });
      const media = sumaTotal / arrayReviews.length;

      if (media) {
        return res.status(200).json("La media es: " + media);
      } else {
        return res.status(404).json();
      }
    }
  } catch (error) {
    return next(error);
  }
};
//--------4-----------GET REVIEW CATALOGO--------------------
//-----------------------------------------------------------
const getReviewCatalogo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cocheReviews = await Catalogo.findById(id);
    const reviews = cocheReviews.reviews;

    if (reviews) {
      return res.status(200).json(reviews);
    } else {
      return res.status(404).json("No se ha encontrado ninguna review");
    }
  } catch (error) {
    return next(error);
  }
};

//--------6-----------GET BY DNI-----------------------------     ///GET BY ID Y GET BY DNI DEVUELVEN EL USUARIO
//-----------------------------------------------------------
const getReviewByDni = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const userTotal = await User.findById(_id);
    const userDni = userTotal.dni;
    const reviews = userDni.review_coche;

    if (reviews) {
      return res.status(200).json(reviews);
    } else {
      return res.status(404).json("No hay ninguna review");
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createReview,
  deleteReview,
  mediaPuntuacionReview,
  getReviewByDni,
  getReviewCatalogo,
};
