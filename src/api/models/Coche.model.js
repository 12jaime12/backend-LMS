const mongoose = require("mongoose");

const CocheSchema = new mongoose.Schema(
  {
    marca: { type: String, required: true, trim: true },
    modelo: { type: String, required: true, trim: true },
    year: { type: Number, required: true, trim: true },
    combustible: {
      type: String,
      enum: ["diesel", "gasolina", "hibrido", "electrico"],
      required: true,
    },
    precio: { type: Number },
    taller: { type: mongoose.Schema.Types.ObjectId, ref: "Taller" },
    cliente: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    estado: {
      type: String,
      enum: ["venta", "none", "taller"],
      default: "none",
    },
    interesados: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comentario: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comentario" }],
    like: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    image: { type: Array },
  },
  {
    timestamps: true,
  }
);

const Coche = mongoose.model("Coche", CocheSchema);
module.exports = Coche;
