const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MotorSchema = new Schema(
  {
    cars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CocheBase' }],
    name: { type: String },
    precio: { type: Number },
  },
  {
    timestamps: true,
  }
);

const Motor = mongoose.model('Motor', MotorSchema);
module.exports = Motor;
