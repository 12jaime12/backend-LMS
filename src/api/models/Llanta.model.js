const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LlantaSchema = new Schema(
  {
    // cars es el id del coche al que pertenece, del coche base
    image: { type: String },
    cars: { type: mongoose.Schema.Types.ObjectId, ref: 'CocheBase' },
    name: { type: String },
    precio: { type: Number },
    color: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Color' }],
    images: [[{ type: String }]],
  },
  {
    timestamps: true,
  }
);

const Llanta = mongoose.model('Llanta', LlantaSchema);
module.exports = Llanta;
