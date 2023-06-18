const mongoose = require("mongoose");
const validator = require("validator");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

//validator: isMobile -> isMobilePhone(str [, locale [, options]])
//validator: isDNI -> isIdentityCard(str [, locale])

const TallerSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    cif: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate: [validator.isStrongPassword],
      minlength: [8, "min 8 characters"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: [validator.isEmail, "email no valido"],
    },
    movil: {
      type: Number,
      required: true,
      unique: true,
      trim: true,
      //validate: [validator.isMobilePhone["es-ES"]],
    },
    direccion: { type: String, required: true, trim: true },
    ciudad: { type: String, required: true, trim: true },
    provincia: { type: String, required: true, trim: true },
    rol: { type: String, default: "taller" },

    cliente: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    mecanico: [{ type: mongoose.Schema.Types.ObjectId, ref: "" }],
    coche_reparacion: [{ type: mongoose.Schema.Types.ObjectId, ref: "Coche" }],
    coche_terminado: [{ type: mongoose.Schema.Types.ObjectId, ref: "Coche" }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  },
  {
    timestamps: true,
  }
);

TallerSchema.pre("save", async function (next) {
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    console.log(error);
    next("Error hashing password", error);
  }
});

const Taller = mongoose.model("Taller", TallerSchema);
module.exports = Taller;
