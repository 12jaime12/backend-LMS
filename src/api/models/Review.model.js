const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema(
  {
    cliente: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    coche_tienda: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Catalogo' }],
    taller: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    content: { type: String, required: true, trim: true },
    estrellas: { type: Number, enum: [1, 2, 3, 4, 5], trim: true },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;
