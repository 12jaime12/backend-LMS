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
const User = require("../models/User.model");
const Review = require("../models/Review.model");
const Taller = require("../models/Taller.model");
const PORT = process.env.PORT;
let confirmationCode = randomCode();
//--------1-----------REGISTER USER--------------------------
//-----------------------------------------------------------
const registerUser = async (req, res, next) => {
  //De la req.body vamos a recibir el name,email,password,movil,dni,direccion,ciudad,provincia,pais y el genero
  //Reseteamos los INDEXES para que no de problema en mongo, generamos un codigo de confirmacion y empezamos el proceso.
  //1)Buscamos si el usuario existe. 2)Creamos un nuevo User. 3)Guardamos el user. 4)Enviamos correo con el codigo. 5)Gestionamos errores en el back
  console.log("puerto", PORT);
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

    let imgPosted = req?.file?.path;

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
          console.log("redirect");
          return res.redirect(
            307,
            `http://localhost:${PORT}/api/v1/user/register/sendEmail/${saveUser.id}`
          );
          //----------------------->ENVIAR MAIL CON CODIGO DE CONFIRMACION<--------------------------------
          //----------------------->ENVIAR MAIL CON CODIGO DE CONFIRMACION<--------------------------------
          //----------------------->ENVIAR MAIL CON CODIGO DE CONFIRMACION<--------------------------------
        } else {
          return res.status(404).json("error al enviar el correo");
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
    if (req.file) deleteImgCloudinary(imgPosted);
    return res.status(500).json("Falta el email y/o dni"); //ERROR 500 -> Este seria un error general en el proceso de registro (fallo servidor..etc)
  }
};

//----------- CONTROLADOR SEND EMAIL ---> REDIRECT ----------
//-----------------------------------------------------------
const sendEmail = async (req, res, next) => {
  console.log("entro");
  try {
    const { id } = req.params;
    console.log("sendmail", id);
    const userDB = await User.findById(id);
    const emailDB = process.env.EMAIL;
    const passDB = process.env.PASSWORD;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailDB,
        pass: passDB,
      },
    });
    const mailOptions = {
      from: emailDB,
      to: userDB.email,
      subject: "Confirmation code",
      text: `Gracias por registrarte en 🏎️💨 Legendary MotorSport! 🏎️💨 Aquí tienes tu código de confirmación: ${confirmationCode}`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(404).json({
          user: userDB,
          confirmationCode: "error enviando email. Reenviar codigo",
        });
      } else {
        console.log("Email sent: " + info.response);
        return res.status(200).json({
          user: userDB,
          confirmationCode: userDB.confirmationCode,
        });
      }
    });
  } catch (error) {
    return next(error);
  }
};

//--------2-----------CHECK CODE-----------------------------
//-----------------------------------------------------------
const checkCodeUser = async (req, res, next) => {
  try {
    const { email, confirmationCode } = req.body;
    const userExist = await User.findOne({ email });

    //Buscamos al usuario por su email. Si el usuario existe comparamos los codigos de confirmacion. Si es correcto, le actualizamos
    //la propiedad check a true, y si lo ha introducido mal el usuario se borrará de nuestra base de datos.
    if (!userExist) {
      return res.status(404).json("El usuario no existe");
    } else {
      if (confirmationCode == userExist.confirmationCode) {
        try {
          await userExist.updateOne({ check: true });
        } catch (error) {
          return res
            .status(404)
            .json("No se ha podido actualizar el usuario", res.message);
        }
        const updateUser = await User.findOne({ email });
        console.log("userexist", userExist);
        return res.status(200).json({
          testCheck: updateUser.check === true ? true : false,
          updateUser,
        });
      } else {
        await User.findByIdAndDelete(userExist._id);
        //deleteImgCloudinary(userExist.imagen);
        return res.status(200).json({
          userExist,
          check: false,
          delete: (await User.findByIdAndDelete(userExist._id))
            ? "Codigo erroneo -> usuario borrado"
            : "fallo al borrar usuario",
        });
      }
    }
  } catch (error) {
    return next(error);
  }
};
//--------3-----------RESEND CODE----------------------------
//-----------------------------------------------------------
const resendCodeUser = async (req, res, next) => {};
//--------4-----------AUTOLOGIN------------------------------
//-----------------------------------------------------------
const autologinUser = async (req, res, next) => {};
//--------5-----------LOGIN----------------------------------
//-----------------------------------------------------------
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userDB = await User.findOne({ email });

    if (userDB) {
      if (bcrypt.compareSync(password, userDB.password)) {
        const token = generateToken(userDB._id, email);
        return res.status(200).json({
          user: userDB,
          token,
        });
      } else {
        return res.status(404).json("Contraseña incorrecta");
      }
    } else {
      return res.status(404).json("El usuario no existe");
    }
  } catch (error) {
    return next(error);
  }
};
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
  sendEmail,
};
