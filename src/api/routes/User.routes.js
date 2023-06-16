const { isAuth } = require("../../middleware/auth.middleware");
const { upload } = require("../../middleware/files.middleware");

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
  sendPassword,
} = require("../controllers/User.controller");

//Nos traemos todos los controladores de User para enrutar cada uno de los diferentes servicios que tendrá

const express = require("express").Router(); //Nos requerimos la LIBRERIA EXPRESS
const UserRoutes = express; //express.Router() nos permite guardar en una variable las futuras rutas que crearemos

//Creamos las rutas en función del tipo de request que será (post, get, patch, delete) y le asignamos una ruta y el controlador
//que se ejecutará en esta ruta
UserRoutes.post("/register", upload.single("imagen"), registerUser); //-----------> AÑADIR SUBIDA DE IMAGEN, MIDDLEWARE MOULTER-CLOUDINARY
UserRoutes.post("/checkCode", checkCodeUser);
UserRoutes.post("/resendCode", resendCodeUser);
UserRoutes.post("/autologin", autologinUser);
UserRoutes.post("/login", loginUser);
UserRoutes.post("/register/sendEmail/:id", sendEmail);
UserRoutes.patch("/sendPassword/:id", sendPassword);
UserRoutes.patch("/forgotPassword", forgotPasswordUser);
UserRoutes.patch("/changePassword", [isAuth], changePasswordUser);
UserRoutes.patch("/updateUser", [isAuth], updateUser);
UserRoutes.delete("/deleteUser", [isAuth], deleteUser);
UserRoutes.get("/", getAllUser);
UserRoutes.get("/:id", getIdUser);

module.exports = UserRoutes;
