const dotenv = require("dotenv");
const Catalogo = require("../models/Catalogo.model");

//--------------create-car-----------------
const createCar = async (req, res, next) => {
  try {
    const newCatalogo = new Catalogo(req.body);
  } catch (error) {
    return next(error);
  }
};
//--------------delete-car-----------------
const deleteCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const catalogo = await Catalogo.findByIdAndDelete(id);
    if (catalogo) {
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
const getByPotencia = async (req, res, next) => {
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
//--------------ranking-de-like------------
const getByLike = async (req, res, next) => {
  try {
  } catch (error) {
    return next(error);
  }
};
