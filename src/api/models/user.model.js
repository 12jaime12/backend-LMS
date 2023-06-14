const mongoose = require("mongoose");
const validator = require("validator");

const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

//validator: isMobile -> isMobilePhone(str [, locale [, options]])
//validator: isDNI -> isIdentityCard(str [, locale])

const UserSchema = new Schema({
  name: { type: String, required: true, trim: true },
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
  dni: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    //validate: [validator.isIdentityCard["ES"], "dni incorrecto"],
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
  pais: { type: String, required: true, trim: true },
  genero: { type: String, enum: ["hombre", "mujer"], required: true },
  rol: { type: String, enum: ["user", "admin", "taller"], default: "user" },
  imagen: { type: String },

  coche_cliente: [{ type: mongoose.Schema.Types.ObjectId, ref: "" }],
  coche_tienda: [{ type: mongoose.Schema.Types.ObjectId, ref: "" }],
  taller: [{ type: mongoose.Schema.Types.ObjectId, ref: "" }],
  mecanico: [{ type: mongoose.Schema.Types.ObjectId, ref: "" }],
  review_coche: [{ type: mongoose.Schema.Types.ObjectId, ref: "" }],
});

UserSchema.pre("save", async function (next) {
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    console.log(error);
    next("Error hashing password", error);
  }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
