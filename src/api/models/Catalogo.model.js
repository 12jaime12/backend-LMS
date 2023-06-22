const mongoose = require("mongoose");

const CatalogoSchema = new mongoose.Schema(
  {
    cocheBase: { type: mongoose.Schema.Types.ObjectId, ref: "CocheBase" },
    color: { type: mongoose.Schema.Types.ObjectId, ref: "Color" },
    llantas: { type: mongoose.Schema.Types.ObjectId, ref: "Llantas" },
    motor: { type: mongoose.Schema.Types.ObjectId, ref: "Motor" },
    cliente: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    image: { type: Array },
  },
  {
    timestamps: true,
  }
);

const Catalogo = mongoose.model("Catalogo", CatalogoSchema);
module.exports = Catalogo;
