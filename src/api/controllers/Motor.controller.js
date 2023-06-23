const Motor = require("../models/Motor.model");

//------------------create-Motor---------------------
const createMotor = async (req, res, next) => {
  try {
    const motor = new Motor(req.body);
    try {
      await motor.save();
      return res.status(200).json(motor);
    } catch (error) {
      return next(error);
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = createMotor;
