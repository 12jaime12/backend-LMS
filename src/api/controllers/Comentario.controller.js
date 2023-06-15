const Comentario = require("../models/Comentario.model");
const User = require("../models/User.model");
const Coche = require("../models/coche.model");

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

      const coche = await Coche.findById(id);
      await coche.updateOne({
        $push: { comentario: comentSave._id },
      });

      const cliente = await User.findById(req.user._id);
      await cliente.updateOne({
        $push: { comentario: comentSave._id },
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
const deleteComentCatalogo = async (req, res, next) => {
  try {
    const { id } = req.params; //idcatologo
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

      const catologo = await Coche.findById(id);
      await catologo.updateOne({
        $push: { comentario: comentSave._id },
      });

      const cliente = await User.findById(req.user._id);
      await cliente.updateOne({
        $push: { comentario: comentSave._id },
      });

      return res.status(200).json(comentarioSave);
    } catch (error) {
      return next(error);
    }
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
