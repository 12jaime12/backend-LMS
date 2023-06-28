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
const Catalogo = require("../models/Catalogo.model");
const Coche = require("../models/Coche.model");
const Comentario = require("../models/Comentario.model");
const PORT = process.env.PORT;
configCloudinary();
let confirmationCode = randomCode();

//--------1-----------REGISTER USER--------------------------
//-----------------------------------------------------------
const registerUser = async (req, res, next) => {
  //De la req.body vamos a recibir el name,email,password,movil,dni,direccion,ciudad,provincia,pais y el genero
  //Reseteamos los INDEXES para que no de problema en mongo, generamos un codigo de confirmacion y empezamos el proceso.
  //1)Buscamos si el usuario existe. 2)Creamos un nuevo User. 3)Guardamos el user. 4)Enviamos correo con el codigo. 5)Gestionamos errores en el back
  console.log("puerto", PORT);
  try {
    const { email, dni } = req.body;
    await User.syncIndexes();

    let imgPosted = req?.file?.path;

    const findUser = await User.findOne({ dni }); //--------CREO QUE FUNCIONA BIEN
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
          //ENVIAMOS EL CODIGO DE CONFIRMACION MEDIANTE REDIRECT Y CON UNA FUNCION sendEmail() QUE LA TENEMOS AQUI ABAJO
        } else {
          return res.status(404).json("error al enviar el correo");
        }
      } catch (error) {
        if (req.file) deleteImgCloudinary(imgPosted);
        return next(error);
      }
    } else {
      if (req.file) deleteImgCloudinary(imgPosted);
      return res.status(404).json("El usuario ya existe con ese dni.");
    }
  } catch (error) {
    if (req.file) deleteImgCloudinary(imgPosted);
    return next(error);
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
  console.log("BODYYYYYYYY", req.body);
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

        //VOLVEMOS A BUSCAR AL USUARIO PARA VER SI SE HA ACTUALIZADO EL check Y ASI ENVIAR UNA RESPUESTA AL FRONT.
        const updateUser = await User.findOne({ email });
        return res.status(200).json({
          testCheck: updateUser.check === true ? true : false,
          updateUser,
        });
        //SI LOS CODIGOS NO COINCIDEN SE BORRA EL USUARIO AUTOMATICAMENTE
      } else {
        await User.findByIdAndDelete(userExist._id);
        deleteImgCloudinary(userExist.imagen);
        return res.status(200).json({
          userExist,
          check: false,
          delete: (await User.findById(userExist._id))
            ? "fallo al borrar usuario"
            : "Codigo erroneo -> usuario borrado",
        });
      }
    }
  } catch (error) {
    return next(error);
  }
};
//--------3-----------RESEND CODE----------------------------
//-----------------------------------------------------------
const resendCodeUser = async (req, res, next) => {
  //RESEND CODE ENVIARÁ NUEVAMENTE LA FUNCION sendEmail() POR MEDIO DE UN REDIRECT
  try {
    const { email } = req.body;
    const userToSendCode = await User.findOne({ email });

    if (userToSendCode) {
      const { _id } = userToSendCode;
      console.log("id reenvio", _id);
      return res.redirect(
        307,
        `http://localhost:${PORT}/api/v1/user/register/sendEmail/${_id}`
      );
    } else {
      return res.status(404).json("El usuario no existe");
    }
  } catch (error) {
    return next(error);
  }
};
//--------4-----------AUTOLOGIN------------------------------
//-----------------------------------------------------------
const autologinUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userDB = await User.findOne({ email });

    if (userDB) {
      if ((password, userDB.password)) {
        const token = generateToken(userDB._id, email);
        return res.status(200).json({
          user: userDB,
          token,
        });
      } else {
        return res.status(404).json("password dont match");
      }
    } else {
      return res.status(404).json("User no register");
    }
  } catch (error) {
    return next(error);
  }
};
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
const forgotPasswordUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const userDB = await User.findOne({ email });

    if (userDB) {
      return res.redirect(
        307,
        `http://localhost:${PORT}/api/v1/user/sendPassword/${userDB._id}`
      );
    } else {
      return res.status(404).json("El usuario no existe");
    }
  } catch (error) {
    return next(error);
  }
};
//-----------redirect-----------SEND PASSWORD--------------
//---------------------------------------------------------
const sendPassword = async (req, res, next) => {
  let randomPass = randomPassword();
  try {
    const { id } = req.params;
    const userDB = await User.findById(id);
    console.log("OLDDDD", userDB.password);
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
      subject: "Nuevo codigo de acceso",
      text: `Aquí tienes tu nuevo codigo de acceso: ${randomPass}`,
    };
    transporter.sendMail(mailOptions, async function (error, info) {
      if (error) {
        console.log(error);
        return res.status(404).json({
          user: userDB,
          pass: "error enviando email. Reenviar pass",
        });
      } else {
        console.log("Email sent: " + info.response);
        try {
          const newPassword = bcrypt.hashSync(randomPass, 10);
          await User.findByIdAndUpdate(id, { password: newPassword });
          const userUpdate = await User.findById(id);
          console.log(newPassword);
          console.log(userUpdate.password);

          if (bcrypt.compareSync(randomPass, userUpdate.password)) {
            return res.status(200).json({
              userUpdate: true,
              passUpdate: true,
            });
          } else {
            return res.status(404).json({
              userUpdate: false,
              passUpdate: false,
            });
          }
        } catch (error) {
          return next(error);
        }
      }
    });
  } catch (error) {
    return next(error);
  }
};
//--------7-----------CHANGE PASS----------------------------
//-----------------------------------------------------------
const changePasswordUser = async (req, res, next) => {
  try {
    console.log(req.user);
    const { password, newPassword } = req.body;
    const { _id } = req.user;
    const userToChange = await User.findById(_id);

    if (bcrypt.compareSync(password, userToChange.password)) {
      const newPassEncryp = bcrypt.hashSync(newPassword, 10);

      try {
        await User.findByIdAndUpdate(_id, { password: newPassEncryp });
        const userUpdate = await User.findById(_id);

        if (bcrypt.compareSync(newPassword, userUpdate.password)) {
          return res.status(200).json({
            updateUser: true,
          });
        } else {
          return res.status(200).json({
            updateUser: false,
          });
        }
      } catch (error) {
        return next(error);
      }
    } else {
      return res.status(404).json("Contraseña incorrecta");
    }
  } catch (error) {
    return next(error);
  }
};
//--------8-----------UPDATE USER----------------------------
//-----------------------------------------------------------
const updateUser = async (req, res, next) => {
  try {
    console.log("update entro", req.body);
    const { _id } = req.user;
    const { name, apellido, movil, direccion, ciudad, provincia, pais } =
      req.body;
    const newImagen = req?.file?.path;
    const userUpdate = await User.findById(_id);

    //CREAMOS TODAS ESTAS POSIBILIDADES PARA ACTUALIZAR SOLAMENTE LOS CAMPOS QUE NOS HAYA INTRODUCIDO INFORMACION. POR EJEMPLO: SI SOLO
    //INTRODUCE CAMBIOS EN EL movil Y ciudad SOLO SE ACTUALIZA LA INFORMACION DEL USUARIO DEL MOVIL Y LA CIUDAD
    if (!userUpdate) {
      return res.status(404).json("Usuario no encontrado");
    } else {
      name && (userUpdate.name = name);
      apellido && (userUpdate.apellido = apellido);
      movil && (userUpdate.movil = movil);
      direccion && (userUpdate.direccion = direccion);
      ciudad && (userUpdate.ciudad = ciudad);
      provincia && (userUpdate.provincia = provincia);
      pais && (userUpdate.pais = pais);
      newImagen && (userUpdate.imagen = newImagen);
    }
    try {
      const updatedUser = await userUpdate.save();
      if (!updatedUser) {
        return res.status(404).json("No se ha podido guardar");
      } else {
        return res.status(200).json(updatedUser);
      }
    } catch (error) {
      return next(error);
    }
  } catch (error) {
    return next(error);
  }
};
//--------9-----------DELETE USER----------------------------
//-----------------------------------------------------------
const deleteUser = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const userDelete = await User.findById(_id);
    console.log(userDelete.imagen);
    const arrayCocheCliente = userDelete.coche_cliente;
    const arrayCocheTienda = userDelete.coche_tienda;
    const arrayReviews = userDelete.review_coche;
    const arrayTalleres = userDelete.taller;
    const arrayComentarios = userDelete.comentario;

    await User.findByIdAndDelete(_id);
    if (!userDelete) {
      return res.status(404).json("No se ha podido borrar el usuario");
    } else {
      deleteImgCloudinary(userDelete.imagen);
      //recorremos el array de los talleres y PULLEAMOS el usuario, ya que no queremos eliminar el taller
      arrayTalleres.forEach(async (elem) => {
        await Taller.findByIdAndUpdate(elem._id, {
          $pull: { cliente: userDelete._id },
        });
      });
      //recorremos el array de coches que tiene el cliente
      arrayCocheCliente.forEach(async (elem) => {
        await Coche.findByIdAndDelete(elem);
      });
      //recorremos el array de coches de la tienda y actualizamos el catalogo para eliminar de cada coche el usuario
      arrayCocheTienda.forEach(async (elem) => {
        await Catalogo.findByIdAndUpdate(elem._id, {
          $pull: { cliente: userDelete._id },
        });
      });
      //recorremos el array de las review y BORRAMOS la review
      arrayReviews.forEach(async (elem) => {
        await Review.findByIdAndDelete(elem);
      });
      arrayComentarios.forEach(async (elem) => {
        await Comentario.findByIdAndDelete(elem);
      });

      return res.status(200).json("Usuario borrado correctamente");
    }
  } catch (error) {
    return next(error);
  }
};
//--------10-----------ADD LIKE------------------------------
//-----------------------------------------------------------
const addLike = async (req, res, next) => {
  try {
    const { idCoche, idUser } = req.body;
    console.log(req.body);
    console.log(idCoche);
    const user = await User.findById(idUser);
    const coche = await Coche.findById(idCoche);
    console.log("coche", coche);
    //SI EL USUARIO LE DA LIKE Y TODAVIA NO LO TIENE GUARDADO, SE GUARDA EN AMBOS CAMPOS TANTO EN USER COMO EN COCHE Y EN CASO CONTRARIO,
    //DE QUE YA TENGA EL LIKE DEL COCHE SE LE QUITA A AMBOS CAMPOS TAMBIEN
    if (!coche.like.includes(idUser)) {
      await coche.updateOne({ $push: { like: idUser } });
      await user.updateOne({ $push: { like_coche: idCoche } });
      return res.status(200).json("Like añadido al user");
    } else {
      await coche.updateOne({ $pull: { like: idUser } });
      await user.updateOne({ $pull: { like_coche: idCoche } });
      return res.status(200).json("Like quitado del user");
    }
  } catch (error) {
    return next(error);
  }
};
//--------10-----------GET ALL-------------------------------
//-----------------------------------------------------------
const getAllUser = async (req, res, next) => {
  try {
    const allUsers = await User.find();
    if (allUsers) {
      return res.status(200).json(allUsers);
    } else {
      return res.status(404).json("No se ha encontrado ningun usuario");
    }
  } catch (error) {
    return next(error);
  }
};
//--------11-----------GET ID--------------------------------
//-----------------------------------------------------------
const getIdUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userById = await User.findById(id).populate(
      "coche_cliente like_coche coche_tienda taller"
    );
    if (userById) {
      return res.status(200).json(userById);
    } else {
      return res.status(404).json("No se ha encontrado el usuario");
    }
  } catch (error) {
    return next(error);
  }
};
const getByRolUser = async (req, res, next) => {
  try {
    const allUserTaller = await User.find({ rol: "taller" });
    if (allUserTaller) {
      return res.status(200).json(allUserTaller);
    } else {
      return res.status(404).json("No se ha encontrado ningun taller");
    }
  } catch (error) {
    return next(error);
  }
};

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
  sendPassword,
  getByRolUser,
  addLike,
};
