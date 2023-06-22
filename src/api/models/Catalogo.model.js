const mongoose = require("mongoose");

const CatalogoSchema = new mongoose.Schema(
  {
    marca: { type: String, required: true, trim: true },
    modelo: { type: String, required: true, trim: true },
    color: { type: String, required: true, trim: true },
    precio: { type: Number, required: true, trim: true },
    llantas: { type: String, required: true, trim: true },
    motor: { type: String, required: true, trim: true },
    year: { type: Number, required: true, trim: true },
    rol: { type: String, enum: ["base", "personalizado"], default: "base" },
    combustible: {
      type: String,
      enum: ["diesel", "gasolina", "hibrido", "electrico"],
      required: true,
    },
    taller: { type: mongoose.Schema.Types.ObjectId, ref: "Taller" },
    cliente: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reviews" }],
    comentario: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comentario" }],
    like: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    interesados: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    image: { type: Array },
  },
  {
    timestamps: true,
  }
);

const Catalogo = mongoose.model("Catalogo", CatalogoSchema);
module.exports = Catalogo;
