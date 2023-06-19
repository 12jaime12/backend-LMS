const Catalogo = require("../models/Catalogo.model");
const Coche = require("../models/Coche.model");
const Comentario = require("../models/Comentario.model");
const User = require("../models/User.model");

//----------------create-------------
const createComent = async (req, res, next) => {
  try {
    const { id } = req.params; //idcoche
    const { content, variable } = req.body;
    if (variable === "coche") {
      const newComentario = new Comentario({
        content: content,
        Coche: id,
        Creador: req.user._id,
        rol: "coche",
      });
      try {
        const comentarioSave = await newComentario.save();

        const coche = await Coche.findById(id);

        await coche.updateOne({
          $push: { comentario: comentarioSave._id },
        });

        const cliente = await User.findById(req.user._id);
        await cliente.updateOne({
          $push: { comentario: comentarioSave._id },
        });

        return res.status(200).json(comentarioSave);
      } catch (error) {
        return next(error);
      }
    } else if (variable === "catalogo") {
      const newComentario = new Comentario({
        content: content,
        Coche: id,
        Creador: req.user._id,
        rol: "catalogo",
      });
      try {
        const comentarioSave = await newComentario.save();
        const comentSave = await Comentario.find({
          content: content,
          Coche: id,
          Creador: req.user._id,
        });

        const catologo = await Catalogo.findById(id);
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
    }
  } catch (error) {
    return next(error);
  }
};
//----------------delete-------------
const deleteComent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const comentarioToDelete = await Comentario.findById(id);
    if (comentarioToDelete.rol === "coche") {
      await Comentario.findByIdAndDelete(id);
      const comentarioDelete = await Comentario.findById(id);
      if (comentarioDelete) {
        return res.status(404).json("error al borrar");
      } else {
        const creador = await User.findById(comentarioToDelete.Creador);
        console.log(comentarioToDelete.Creador.toString());
        await creador.updateOne({
          $pull: { comentario: id },
        });
        console.log(comentarioToDelete.Creador);
        const coche = await Coche.findById(comentarioToDelete.Coche);
        console.log(comentarioToDelete.Creador.toString());
        await coche.updateOne({
          $pull: { comentario: id },
        });
        return res.status(200).json("ok delete");
      }
    } else if (comentarioToDelete.rol === "catalogo") {
      await Comentario.findByIdAndDelete(id);
      const comentarioDelete = await Comentario.findById(id);
      if (comentarioDelete) {
        return res.status(404).json("error al borrar");
      } else {
        const creador = await User.findById(comentarioToDelete.Creador);
        console.log(comentarioToDelete.Creador.toString());
        await creador.updateOne({
          $pull: { comentario: id },
        });

        const coche = await Coche.findById(comentarioToDelete.Coche);
        console.log(comentarioToDelete.Creador.toString());
        await coche.updateOne({
          $pull: { comentario: id },
        });
        return res.status(200).json("ok delete");
      }
    }
  } catch (error) {
    return next(error);
  }
};
//----------------get-all------------
const getAll = async (req, res, next) => {
  try {
    const comentarios = await Comentario.find();
    if (comentarios) {
      return res.status(200).json(comentarios);
    } else {
      return res.starus(404).json("error al traer todos los comentarios");
    }
  } catch (error) {
    return next(error);
  }
};
//----------------get-by-coche---------
const getByCoche = async (req, res, next) => {
  try {
    const { id } = req.params;
    const coments = await Comentario.find({ Coche: id });
    if (coments) {
      return res.status(200).json(coments);
    } else {
      return res.status(404).json("Error al encontrar los comentarios");
    }
  } catch (error) {
    return next(error);
  }
};
//----------------get-by-catalogo---------
const getByCatalogo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const coments = await Comentario.find({ Catalogo: id });
    if (coments) {
      return res.status(200).json(coments);
    } else {
      return res.status(404).json("Error al encontrar los comentarios");
    }
  } catch (error) {
    return next(error);
  }
};
//----------------get-by-id----------
// const getById = async (req, res, next) => {
//   try {
//   } catch (error) {
//     return next(error);
//   }
// };

module.exports = {
  createComent,
  deleteComent,
  getAll,
  getByCoche,
  getByCatalogo,
};
