const mongoose = require('mongoose');

const cocheBaseSchema = new mongoose.Schema(
  {
    marca: { type: String, required: true, trim: true },
    modelo: { type: String, required: true, trim: true },
    color: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Color' }],
    precio: { type: Number, required: true, trim: true },
    llantas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Llanta' }],
    motor: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Motor' }],
    year: { type: Number, required: true, trim: true },
    combustible: {
      type: String,
      enum: ['combustion', 'hibrido', 'electrico'],
      required: true,
    },
    image: { type: Array },
    cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reviews' }],
    comentario: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comentario' }],
    like: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    interesados: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
  }
);

const CocheBase = mongoose.model('CocheBase', cocheBaseSchema);
module.exports = CocheBase;
