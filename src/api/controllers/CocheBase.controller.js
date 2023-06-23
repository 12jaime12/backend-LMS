const CocheBase = require("../models/CocheBase.model");

//--------------------createCocheBase-------------------
const createCocheBase = async (req, res, next) => {
  try {
    const cocheBase = new CocheBase(req.body);
    try {
      await cocheBase.save();
      return res.status(200).json(cocheBase);
    } catch (error) {
      return next(error);
    }
  } catch (error) {
    return next(error);
  }
};
//--------------------get-by-marca---------------------
const getByMarca = async (req, res, next) => {
  try {
    const { marca } = req.params;
    console.log(marca);
    const coches = await CocheBase.find({ marca: marca });
    if (coches) {
      return res.status(200).json(coches);
    } else {
      return res.status(404).json("error al encontrar los coches");
    }
  } catch (error) {
    return next(error);
  }
};
//------------------get-by-id----------------------------
const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const coche = await CocheBase.findById(id).populate("color motor llantas");
    if (coche) {
      return res.status(200).json(coche);
    } else {
      return res.status(404).json("error al encontrar los coches");
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = { createCocheBase, getByMarca, getById };
