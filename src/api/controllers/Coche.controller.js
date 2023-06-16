const Coche = require("../models/Coche.model");
const Comentario = require("../models/Comentario.model");
const Review = require("../models/Review.model");
const Taller = require("../models/Taller.model");
const User = require("../models/User.model");

//--------------create-coche-----------------
const createCoche = async (req, res, next) => {
  try {
    await Coche.syncIndexes();
    const { marca, modelo, year, combustible, precio, imagen } = req.body;
    const { _id } = req.user;

    const user = await User.findById(_id);
    const newCoche = new Coche({
      marca: marca,
      modelo: modelo,
      year: year,
      combustible: combustible,
      precio: precio,
      imagen: imagen,
    });

    try {
      const coche = await newCoche.save();
      if (!coche) {
        return res
          .status(404)
          .json("El coche no se ha guardado en la BBDD correctamente");
      } else {
        await coche.updateOne({ $push: { cliente: user._id } });
        await user.updateOne({ $push: { coche_cliente: coche._id } });
      }
    } catch (error) {
      return next(error);
    }
  } catch (error) {
    return next(error);
  }
};
//--------------delete-car-----------------
const deleteCoche = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id } = req.user;
    const user = await User.findById(_id);
    const cocheToDelete = await Coche.findById(id);

    if (!cocheToDelete) {
      return res.status(404).json("Problema al encontrar el coche");
    } else {
      if (cocheToDelete.estado == "none") {
        await user.updateOne({ $pull: { coche_cliente: id } });
        //-------------------->borrar imagenes<-----------------------------
      }
      if (cocheToDelete.estado == "venta") {
        //Recogemos los arrays populados que hay actualizar, ya que el coche va a estar en los intereses de los usuarios, va a tener
        //comentarios que hay que borrar de los usuarios y va a tener likes que habra que borrar de los usuarios tambien
        const arrayInteresados = cocheToDelete.interesados;
        const arrayComentario = cocheToDelete.comentario;
        const arrayLike = cocheToDelete.like;

        arrayInteresados.forEach(async (elem) => {
          await elem.updateOne({ $pull: { intereses: id } }); //DE CADA USUARIO LE ACTUALIZAMOS EL CAMPO INTERESES PARA BORRARLE EL COCHE
        });
        arrayComentario.forEach(async (elem) => {
          await Comentario.findByIdAndDelete(elem); //BORRAMOS EL COMENTARIO
          await elem.updateOne({ $pull: { comentario: elem } }); //DEL ARRAY DE COMENTARIOS DEL USUARIO PULLEAMOS ESE COMENTARIO
        });
        arrayLike.forEach(async (elem) => {
          await elem.updateOne({ $pull: { like_coche: elem } });
        });
      }
      if (cocheToDelete.estado == "taller") {
        return res
          .status(404)
          .json("El coche esta en el taller y no se puede borrar");
      }
      return res.status(200).json("coche borrado correctamente");
    }
  } catch (error) {
    return next(error);
  }
};
//--------------update---------------------
const updateCoche = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { precio } = req.body;

    const cocheUpdate = await Coche.findByIdAndUpdate(id, { precio: precio });
    if (cocheUpdate) {
      return res.status(200).json("Precio del coche actualizado");
    } else {
      return res
        .status(404)
        .json("El precio del coche no se ha podido actualizar");
    }
  } catch (error) {
    return next(error);
  }
};
//--------------get-all--------------------
const getAll = async (req, res, next) => {
  try {
  } catch (error) {
    return next(error);
  }
};
//--------------get-by-marca---------------
const getByMarca = async (req, res, next) => {
  try {
  } catch (error) {
    return next(error);
  }
};
//--------------get-by-modelo--------------
const getByModelo = async (req, res, next) => {
  try {
  } catch (error) {
    return next(error);
  }
};
//--------------get-by-potencia------------
const changeState = async (req, res, next) => {
  try {
  } catch (error) {
    return next(error);
  }
};
//--------------add-interesado-------------
const addInteresado = async (req, res, next) => {
  try {
  } catch (error) {
    return next(error);
  }
};
//--------------add-like-------------------
const addLike = async (req, res, next) => {
  try {
  } catch (error) {
    return next(error);
  }
};
//--------------add-taller------------
const addTaller = async (req, res, next) => {
  try {
  } catch (error) {
    return next(error);
  }
};
//--------------ranking-de-like------------
const getByLike = async (req, res, next) => {
  try {
  } catch (error) {
    return next(error);
  }
};

module.exports = { createCoche, deleteCoche };
