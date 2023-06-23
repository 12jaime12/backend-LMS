const mongoose = require("mongoose");

const ColorSchema = new mongoose.Schema(
  {
    // cars es el id del coche al que pertenece, del coche base
    codeColor: { type: String },
    cars: { type: mongoose.Schema.Types.ObjectId, ref: "CocheBase" },
    name: { type: String },
    precio: { type: Number },
  },
  {
    timestamps: true,
  }
);

const Color = mongoose.model("Color", ColorSchema);
module.exports = Color;
