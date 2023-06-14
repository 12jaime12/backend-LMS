const {
  //Nos traemos todos los controladores de Taller para enrutar cada uno de los diferentes servicios que tendrá
  registerTaller,
  checkCodeTaller,
  resendCodeTaller,
  autologinTaller,
  loginTaller,
  forgotPasswordTaller,
  changePasswordTaller,
  updateTaller,
  deleteTaller,
  getAllTaller,
  getIdTaller,
} = require("../controllers/Taller.controller");
const express = require("express").Router(); //nos requerimos la LIBRERIA EXPRESS
const tallerRoutes = express; //express.Router() nos permite guardar en una variable las futuras rutas que crearemos

//Creamos las rutas en función del tipo de request que será (post, get, patch, delete) y le asignamos una ruta y el controlador
//que se ejecutará en esta ruta
tallerRoutes.post("/register", registerTaller); //-----------> AÑADIR SUBIDA DE IMAGEN, MIDDLEWARE MOULTER-CLOUDINARY
tallerRoutes.post("/checkCode", checkCodeTaller);
tallerRoutes.post("/resendCode", resendCodeTaller);
tallerRoutes.post("/autologin", autologinTaller);
tallerRoutes.post("/login", loginTaller);
tallerRoutes.patch("/forgotPassword", forgotPasswordTaller);
tallerRoutes.patch("/changePassword", changePasswordTaller);
tallerRoutes.patch("/updateUser", updateTaller);
tallerRoutes.delete("/deleteUser", deleteTaller);
tallerRoutes.get("/", getAllTaller);
tallerRoutes.get("/:id", getIdTaller);

module.exports = tallerRoutes;
