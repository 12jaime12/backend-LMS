const Llanta = require("../models/Llanta.model");

//----------------create----------------
const createLlanta = async (req, res, next) => {
  try {
    const llanta = new Llanta(req.body);
    try {
      await llanta.save();
      return res.status(200).json(llanta);
    } catch (error) {
      return next(error);
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = createLlanta;
