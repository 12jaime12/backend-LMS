const User = require('../models/User.model');
const Review = require('../models/Review.model');

const Catalogo = require('../models/Catalogo.model');

//--------1-----------CREATE REVIEW--------------------------
//-----------------------------------------------------------
const createReview = async (req, res, next) => {
  try {
    await Review.syncIndexes();
    const { id } = req.params; //id del coche que la recibe por parametros desde la url al entrar a la pagina del coche
    const { content, estrellas } = req.body;
    const { _id } = req.user;
    console.log(id);
    const userReview = await User.findById(_id);
    const cocheReview = await Catalogo.findById(id);

    if (!userReview) {
      return res.status(404).json('El usuario no existe');
    } else {
      const newReview = new Review({
        cliente: userReview,
        coche_tienda: cocheReview,
        content: content,
        estrellas: estrellas,
      });

      //CREAMOS LA REVIEW CON LA INFORMACION DE LA req.body Y ACTUALIZAMOS LA INFORMACION DEL USER, YA QUE EN SU CLAVE review_coche
      //HAY QUE PUSHEARLE LA REVIEW QUE ACABA DE CREAR
      try {
        const saveReview = newReview.save();

        if (saveReview) {
          await userReview.updateOne({
            $push: { review_coche: newReview._id },
          });
          await cocheReview.updateOne({ $push: { reviews: newReview._id } });
          return res.status(200).json('Review creada correctamente');
        } else {
          return res
            .status(404)
            .json('La review no se ha guardado correctamente');
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

    const deleteReview = await Review.findByIdAndDelete(id);

    //SI BORRAMOS UNA REVIEW HAY QUE QUITARLA DEL USUARIO Y DEL COCHE DEL CATALOGO, CON LO CUAL HACEMOS UN pull DE LAS CLAVES
    //USER-> review_coche Y CATALOGO-> reviews PARA BORRAR LA REVIEW DE AMBOS SITIOS
    if (!deleteReview) {
      return res.status(404).json('Problema con la review. No existe');
    } else {
      const idUser = deleteReview.cliente;
      const idCoche = deleteReview.coche_tienda;

      await User.findByIdAndUpdate(idUser, {
        $pull: { review_coche: id },
      });
      await Catalogo.findByIdAndUpdate(idCoche, {
        $pull: { reviews: id },
      });
      return res.status(200).json('Review borrada correctamente');
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

    //BUSCAMOS EL COCHE DEL QUE QUEREMOS OBTENER LA MEDIA DE PUNTUACION, CREAMOS UNA VARIABLE DONDE ALMACENAREMOS LA SUMA TOTAL DE TODAS
    //LAS PUNTUACIONES QUE EXISTEN EN ESE COCHE Y DESPUES LO DIVIDIMOS ENTRE EL NUMERO DE PUNTUACIONES PARA ASI OBTENER LA MEDIA
    if (!coche) {
      return res.status(404).json('Error al cargar el coche');
    } else {
      const arrayReviews = coche.reviews;
      let sumaTotal = 0;
      arrayReviews.forEach((elem) => {
        sumaTotal += elem.estrellas;
      });
      const media = sumaTotal / arrayReviews.length;

      if (media) {
        return res.status(200).json('La media es: ' + media);
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
      return res.status(404).json('No se ha encontrado ninguna review');
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
      return res.status(404).json('No hay ninguna review');
    }
  } catch (error) {
    return next(error);
  }
};

//-------------------GET ALL----------------------------
const getAllReview = async (req, res, next) => {
  try {
    const allReviews = await Review.find();

    if (allReviews) {
      return res.status(200).json(allReviews);
    } else {
      return res.status(404).json('no hay ninguna review creada');
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
  getAllReview,
};
