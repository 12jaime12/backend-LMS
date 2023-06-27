const CocheBase = require("../models/CocheBase.model");
const User = require("../models/User.model");

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

    const ordenados = coches.sort((a, b) => b.like.length - a.like.length);
    if (ordenados) {
      return res.status(200).json(ordenados);
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
//---------------------add-like--------------------------
const addLike = async (req, res, next) => {
  try {
    const { id } = req.body;
    const { _id } = req.user;
    const user = await User.findById(_id);
    const coche = await CocheBase.findById(id);

    //SI EL USUARIO LE DA LIKE Y TODAVIA NO LO TIENE GUARDADO, SE GUARDA EN AMBOS CAMPOS TANTO EN USER COMO EN COCHE Y EN CASO CONTRARIO,
    //DE QUE YA TENGA EL LIKE DEL COCHE SE LE QUITA A AMBOS CAMPOS TAMBIEN
    if (!coche.like.includes(_id)) {
      await coche.updateOne({ $push: { like: _id } });
      await user.updateOne({ $push: { like_coche: id } });
      return res.status(200).json({
        results: "Like añadido al user",
        update: await CocheBase.find(),
      });
    } else {
      await coche.updateOne({ $pull: { like: _id } });
      await user.updateOne({ $pull: { like_coche: id } });
      return res.status(200).json({
        results: "Like quitado del user",
        update: await CocheBase.find(),
      });
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = { createCocheBase, getByMarca, getById, addLike };
