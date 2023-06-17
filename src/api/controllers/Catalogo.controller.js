const dotenv = require("dotenv");
const Catalogo = require("../models/Catalogo.model");
const User = require("../models/User.model");

//--------------create-car-----------------
const createCatalogo = async (req, res, next) => {
  try {
    const newCatalogo = new Catalogo(req.body);

    try {
      const catalogo = await newCatalogo.save();
      const user = await User.findById(req.user._id);
      await user.updateOne({ $push: { coche_tienda: catalogo._id } });
      return res.status(200).json(catalogo);
    } catch (error) {
      return next(error);
    }
  } catch (error) {
    return next(error);
  }
};
//--------------delete-car-----------------
const deleteCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const catalogoToDelete = await Catalogo.findById(id);
    const catalogo = await Catalogo.findByIdAndDelete(id);
    if (catalogo) {
      catalogoToDelete.comentario.forEach(async (element) => {
        await Comentario.findByIdAndDelete(element);
      });

      return res.status(200).json("ok borrado");
    } else {
      return res.status(404).json("error al borrar");
    }
  } catch (error) {
    return next(error);
  }
};
//--------------update---------------------
const updateCar = async (req, res, next) => {
  try {
  } catch (error) {
    return next(error);
  }
};
//--------------get-all--------------------
const getAll = async (req, res, next) => {
  try {
    const allCatalogo = await Catalogo.find();
    if (allCatalogo) {
      return res.status(200).json(allCatalogo);
    } else {
      return res.status(404).json("error al encontrar el catalogo");
    }
  } catch (error) {
    return next(error);
  }
};
//--------------get-by-marca---------------
const getByMarca = async (req, res, next) => {
  try {
    const { marca } = req.params;
    const catalogoMarca = await Catalogo.find({ marca: marca });
    if (catalogoMarca) {
      return res.status(200).json(catalogoMarca);
    } else {
      return res.status(404).json("error al cargar los coches de esa marca");
    }
  } catch (error) {
    return next(error);
  }
};
//--------------get-by-modelo--------------
const getByModelo = async (req, res, next) => {
  try {
    const { modelo } = req.params;
    const catalogoModelo = await Catalogo.find({ modelo: modelo });
    if (catalogoModelo) {
      return res.status(200).json(catalogoMarca);
    } else {
      return res.status(404).json("error al cargar los coches de esa marca");
    }
  } catch (error) {
    return next(error);
  }
};
//--------------add-interesado-------------
const addInteresado = async (req, res, next) => {
  try {
    const { id } = req.params;
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
//--------------ranking-de-like------------
const getByLike = async (req, res, next) => {
  try {
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createCatalogo,
  deleteCar,
  updateCar,
  getAll,
  getByMarca,
  getByModelo,
  addInteresado,
  addLike,
  getByLike,
};
