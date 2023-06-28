const mongoose = require('mongoose');

const ComentarioSchema = new mongoose.Schema(
  {
    Catalogo: { type: mongoose.Schema.Types.ObjectId, ref: 'Catalogo' },
    Coche: { type: mongoose.Schema.Types.ObjectId, ref: 'Coche' },
    Creador: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, required: true, trim: true },
    rol: { type: String, enum: ['coche', 'catalogo'] },
  },
  {
    timestamps: true,
  }
);

const Comentario = mongoose.model('Comentario', ComentarioSchema);
module.exports = Comentario;
