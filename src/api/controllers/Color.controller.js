const Color = require("../models/Color.model");

//-----------------------create-----------
const createColor = async (req, res, next) => {
  try {
    const color = new Color(req.body);
    try {
      await color.save();
      return res.status(200).json(color);
    } catch (error) {
      return next(error);
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = { createColor };
