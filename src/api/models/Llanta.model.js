const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LlantaSchema = new Schema(
  {
    // cars es el id del coche al que pertenece, del coche base
    image: { type: String },
    cars: { type: mongoose.Schema.Types.ObjectId, ref: "CocheBase" },
    name: { type: String },
    precio: { type: Number },
    color: [{ type: mongoose.Schema.Types.ObjectId, ref: "Color" }],
    images: [[{ type: String }]],
  },
  {
    timestamps: true,
  }
);

const Llanta = mongoose.model("Llanta", LlantaSchema);
module.exports = Llanta;

// [
//   [
//     "https://res.cloudinary.com/dx3e6knoz/image/upload/v1687441652/m4grisdelante_kd3zky.png",
//     "https://res.cloudinary.com/dx3e6knoz/image/upload/v1687441656/lateralDerGris2_f6vque.png",
//     "https://res.cloudinary.com/dx3e6knoz/image/upload/v1687441656/detrasgris_cvxof6.png",
//     "https://res.cloudinary.com/dx3e6knoz/image/upload/v1687441652/lateralIzqGris2_v86y9b.png",
//   ],
//   [
//     "https://res.cloudinary.com/dx3e6knoz/image/upload/v1687441648/m4azuldelante_b8hwcz.png",
//     "https://res.cloudinary.com/dx3e6knoz/image/upload/v1687441648/lateralDerAzul2_rt8sz4.png",
//     "https://res.cloudinary.com/dx3e6knoz/image/upload/v1687441648/detrasAzul_jyj65f.png",
//     "https://res.cloudinary.com/dx3e6knoz/image/upload/v1687441648/lateralIzqAzul2_qfwi1c.png",
//   ],
//   [
//     "https://res.cloudinary.com/dx3e6knoz/image/upload/v1687441643/m4blancodelante_ixi7pd.png",
//     "https://res.cloudinary.com/dx3e6knoz/image/upload/v1687441643/lateralDerBlanco2_cmlz5x.png",
//     "https://res.cloudinary.com/dx3e6knoz/image/upload/v1687441643/detrasBlanco_tfhxyg.png",
//     "https://res.cloudinary.com/dx3e6knoz/image/upload/v1687441643/lateralIzqBlanco2_dliw0v.png",
//   ],
//   [
//     "https://res.cloudinary.com/dx3e6knoz/image/upload/v1687441636/m4negrodelante_znqaun.png",
//     "https://res.cloudinary.com/dx3e6knoz/image/upload/v1687441636/lateralDerNegro2_tkgiyx.png",
//     "https://res.cloudinary.com/dx3e6knoz/image/upload/v1687441636/deetrasNegro_ksiqs8.png",
//     "https://res.cloudinary.com/dx3e6knoz/image/upload/v1687441636/lateralIzqNegro2_oqgzxn.png",
//   ],
// ];
//"https://res.cloudinary.com/dx3e6knoz/image/upload/v1687441842/Llantas1m4_rvurny.png"
// [
//   [
//     "https://res.cloudinary.com/dx3e6knoz/image/upload/v1687441652/m4grisdelante_kd3zky.png",
//     "https://res.cloudinary.com/dx3e6knoz/image/upload/v1687441656/lateralDerGris_socg5d.png",
//     "https://res.cloudinary.com/dx3e6knoz/image/upload/v1687441656/detrasgris_cvxof6.png",
//     "https://res.cloudinary.com/dx3e6knoz/image/upload/v1687441652/lateralIzqGris_d6rzds.png",
//   ],
//   [
//     "https://res.cloudinary.com/dx3e6knoz/image/upload/v1687441648/m4azuldelante_b8hwcz.png",
//     "https://res.cloudinary.com/dx3e6knoz/image/upload/v1687441648/lateralDerAzul_qhrzjk.png",
//     "https://res.cloudinary.com/dx3e6knoz/image/upload/v1687441648/detrasAzul_jyj65f.png",
//     "https://res.cloudinary.com/dx3e6knoz/image/upload/v1687441648/lateralzqAzul_sp4rkc.png",
//   ],
//   [
//     "https://res.cloudinary.com/dx3e6knoz/image/upload/v1687441643/m4blancodelante_ixi7pd.png",
//     "https://res.cloudinary.com/dx3e6knoz/image/upload/v1687441643/lateralDerBlanco_tbuj6y.png",
//     "https://res.cloudinary.com/dx3e6knoz/image/upload/v1687441643/detrasBlanco_tfhxyg.png",
//     "https://res.cloudinary.com/dx3e6knoz/image/upload/v1687441643/lateralIzqBlanco_ai9ant.png",
//   ],
//   [
//     "https://res.cloudinary.com/dx3e6knoz/image/upload/v1687441636/m4negrodelante_znqaun.png",
//     "https://res.cloudinary.com/dx3e6knoz/image/upload/v1687441636/lateralDerNegro2_tkgiyx.png",
//     "https://res.cloudinary.com/dx3e6knoz/image/upload/v1687441636/deetrasNegro_ksiqs8.png",
//     "https://res.cloudinary.com/dx3e6knoz/image/upload/v1687441636/lateralIzqNegro_edg4cm.png",
//   ],
//];
