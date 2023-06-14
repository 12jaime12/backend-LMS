const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  usuario: [{ type: mongoose.Schema.Type.ObjectId, ref: "" }],
  coche_tienda: [{ type: mongoose.Schema.Type.ObjectId, ref: "" }],
  taller: [{ type: mongoose.Schema.Type.ObjectId, ref: "" }],
  mecanico: [{ type: mongoose.Schema.Type.ObjectId, ref: "" }],
  likes: [{ type: mongoose.Schema.Type.ObjectId, ref: "" }],
  description: { type: String, required: true, trim: true },
  estrellas: { type: Number, enum: [1, 2, 3, 4, 5], trim: true },
});

const Review = Schema.model("Review", ReviewSchema);
module.exports = Review;