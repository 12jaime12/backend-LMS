const {
  checkCodeUser,
  resendCodeUser,
  autologinUser,
  loginUser,
  forgotPasswordUser,
  changePasswordUser,
  updateUser,
  deleteUser,
  getAllUser,
  getIdUser,
  registerUser,
  sendEmail,
} = require("../controllers/User.controller");

//Nos traemos todos los controladores de User para enrutar cada uno de los diferentes servicios que tendrá

const express = require("express").Router(); //Nos requerimos la LIBRERIA EXPRESS
const userRoutes = express; //express.Router() nos permite guardar en una variable las futuras rutas que crearemos

//Creamos las rutas en función del tipo de request que será (post, get, patch, delete) y le asignamos una ruta y el controlador
//que se ejecutará en esta ruta
userRoutes.post("/register", registerUser); //-----------> AÑADIR SUBIDA DE IMAGEN, MIDDLEWARE MOULTER-CLOUDINARY
userRoutes.post("/checkCode", checkCodeUser);
userRoutes.post("/resendCode", resendCodeUser);
userRoutes.post("/autologin", autologinUser);
userRoutes.post("/login", loginUser);
userRoutes.post("/register/sendEmail/:id", sendEmail);
userRoutes.patch("/forgotPassword", forgotPasswordUser);
userRoutes.patch("/changePassword", changePasswordUser);
userRoutes.patch("/updateUser", updateUser);
userRoutes.delete("/deleteUser", deleteUser);
userRoutes.get("/", getAllUser);
userRoutes.get("/:id", getIdUser);

module.exports = userRoutes;
