const {
  //Nos traemos todos los controladores de Taller para enrutar cada uno de los diferentes servicios que tendrá
  registerTaller,
  checkCodeTaller,
  resendCodeTaller,
  loginTaller,
  forgotPasswordTaller,
  changePasswordTaller,
  updateTaller,
  deleteTaller,
  getAllTaller,
  getIdTaller,
} = require("../controllers/Taller.controller");
const express = require("express").Router(); //nos requerimos la LIBRERIA EXPRESS
const TallerRoutes = express; //express.Router() nos permite guardar en una variable las futuras rutas que crearemos

//Creamos las rutas en función del tipo de request que será (post, get, patch, delete) y le asignamos una ruta y el controlador
//que se ejecutará en esta ruta
TallerRoutes.post("/register", registerTaller); //-----------> AÑADIR SUBIDA DE IMAGEN, MIDDLEWARE MOULTER-CLOUDINARY
TallerRoutes.post("/checkCode", checkCodeTaller);
TallerRoutes.post("/resendCode", resendCodeTaller);
TallerRoutes.post("/login", loginTaller);
TallerRoutes.patch("/forgotPassword", forgotPasswordTaller);
TallerRoutes.patch("/changePassword", changePasswordTaller);
TallerRoutes.patch("/updateUser", updateTaller);
TallerRoutes.delete("/deleteUser", deleteTaller);
TallerRoutes.get("/", getAllTaller);
TallerRoutes.get("/:id", getIdTaller);

module.exports = TallerRoutes;
