const Review = require("../models/review.model");
const Taller = require("../models/taller.model");
const User = require("../models/user.model");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const randomCode = require("../../utils/randomCode");
const {
  deleteImgCloudinary,
  configCloudinary,
} = require("../../middleware/files.middleware");
const randomPassword = require("../../utils/randomPass");
const { generateToken } = require("../../utils/token");

//--------1-----------REGISTER USER--------------------------
//-----------------------------------------------------------
const registerUser = async (req, res, next) => {
  //De la req.body vamos a recibir el name,email,password,movil,dni,direccion,ciudad,provincia,pais y el genero
  //Reseteamos los INDEXES para que no de problema en mongo, generamos un codigo de confirmacion y empezamos el proceso.
  //1)Buscamos si el usuario existe. 2)Creamos un nuevo User. 3)Guardamos el user. 4)Enviamos correo con el codigo. 5)Gestionamos errores en el back

  try {
    const {
      email,
      name,
      password,
      movil,
      dni,
      direccion,
      ciudad,
      provincia,
      pais,
      genero,
      imagen,
    } = req.body;
    await User.syncIndexes();
    let confirmationCode = randomCode();
    console.log(confirmationCode);
    let imgPosted = req?.file?.path;
    try {
      console.log("email", email);
      const findUser = await User.findOne({ email }, { dni }); //--------CREO QUE FUNCIONA BIEN
      if (!findUser) {
        //creamos el usuario, comprobamos si nos ha enviado una imagen y si no le ponemos una por defecto y lo guardamos
        const newUser = new User({
          ...req.body,
          confirmationCode: confirmationCode,
        });
        req.file
          ? (newUser.imagen = imgPosted)
          : (newUser.imagen =
              "https://res.cloudinary.com/dx3e6knoz/image/upload/v1686775333/image-profile_ffcexg.jpg");

        //guardamos el usuario creado, pero lo hacemos en un try-catch por si ocurriera algun error interno y diera algun fallo inesperado
        try {
          const saveUser = await newUser.save();
          if (saveUser) {
            return res.status(200).json("Usuario creado y guardado con exito");
            //----------------------->ENVIAR MAIL CON CODIGO DE CONFIRMACION<--------------------------------
            //----------------------->ENVIAR MAIL CON CODIGO DE CONFIRMACION<--------------------------------
            //----------------------->ENVIAR MAIL CON CODIGO DE CONFIRMACION<--------------------------------
          }
        } catch (error) {
          if (req.file) deleteImgCloudinary(imgPosted);
          return res.status(404).json("Error guardando usuario");
        }
      } else {
        if (req.file) deleteImgCloudinary(imgPosted);
        return res.status(404).json("El usuario ya existe.");
      }
    } catch (error) {
      if (req.file) deleteImgCloudinary(imgPosted);
      return res.status(500).json("Falta el email y/o dni");
    }
  } catch (error) {
    if (req.file) deleteImgCloudinary(imgPosted);
    console.log("ERROR GENERAL 500");
    return next(error); //ERROR 500 -> Este seria un error general en el proceso de registro (fallo servidor..etc)
  }
};

//--------2-----------CHECK CODE-----------------------------
//-----------------------------------------------------------
const checkCodeUser = async (req, res, next) => {};
//--------3-----------RESEND CODE----------------------------
//-----------------------------------------------------------
const resendCodeUser = async (req, res, next) => {};
//--------4-----------AUTOLOGIN------------------------------
//-----------------------------------------------------------
const autologinUser = async (req, res, next) => {};
//--------5-----------LOGIN----------------------------------
//-----------------------------------------------------------
const loginUser = async (req, res, next) => {};
//--------6-----------FORGOT PASS----------------------------
//-----------------------------------------------------------
const forgotPasswordUser = async (req, res, next) => {};
//--------7-----------CHANGE PASS----------------------------
//-----------------------------------------------------------
const changePasswordUser = async (req, res, next) => {};
//--------8-----------UPDATE USER----------------------------
//-----------------------------------------------------------
const updateUser = async (req, res, next) => {};
//--------9-----------DELETE USER----------------------------
//-----------------------------------------------------------
const deleteUser = async (req, res, next) => {};
//--------10-----------GET ALL-------------------------------
//-----------------------------------------------------------
const getAllUser = async (req, res, next) => {};
//--------11-----------GET ID--------------------------------
//-----------------------------------------------------------
const getIdUser = async (req, res, next) => {};

module.exports = {
  registerUser,
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
};
