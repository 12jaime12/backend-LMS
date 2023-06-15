const Comentario = require("../models/Comentario.model");

//----------------create-------------
const createComentCoche = async (req, res, next) => {
  try {
    const { id } = req.params; //idcoche
    const { content } = req.body;
    const newComentario = new Comentario({
      content: content,
      Coche: id,
      Creador: req.user._id,
    });
    try {
      const comentarioSave = await newComentario.save();
      const comentSave = await Comentario.find({
        content: content,
        Coche: id,
        Creador: req.user._id,
      });

      return res.status(200).json(comentarioSave);
    } catch (error) {
      return next(error);
    }
  } catch (error) {
    return next(error);
  }
};
//----------------delete-------------
const deleteComent = async (req, res, next) => {
  try {
  } catch (error) {
    return next(error);
  }
};
//----------------get-all------------
const getAll = async (req, res, next) => {
  try {
  } catch (error) {
    return next(error);
  }
};
//----------------get-by-car---------
const getByCar = async (req, res, next) => {
  try {
  } catch (error) {
    return next(error);
  }
};
//----------------get-by-id----------
const getById = async (req, res, next) => {
  try {
  } catch (error) {
    return next(error);
  }
};
//----------------add-like-----------
const addLike = async (req, res, next) => {
  try {
  } catch (error) {
    return next(error);
  }
};
