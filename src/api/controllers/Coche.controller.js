const Coche = require("../models/Coche.model");
const Comentario = require("../models/Comentario.model");
const Review = require("../models/Review.model");
const Taller = require("../models/Taller.model");
const User = require("../models/User.model");

//--------------create-coche-----------------
const createCoche = async (req, res, next) => {
  try {
    await Coche.syncIndexes();
    const { _id } = req.user;
    const { marca, modelo, year, combustible, precio } = req.body;
    const imgCustom = [];
    const files = req.files;
    for (options in files) {
      imgCustom.push(files[options][0].path);
    }
    const user = await User.findById(_id);

    const customNewModelCoche = {
      image: imgCustom,
      marca,
      modelo,
      year,
      combustible,
      precio,
    };

    //CREAMOS EL COCHE CON LOS DATOS INTRODUCIDOS POR req.body Y LE AÑADIMOS EL CLIENTE QUE HA CREADO ESE COCHE
    const newCoche = new Coche(customNewModelCoche);

    try {
      const coche = await newCoche.save();
      if (!coche) {
        return res
          .status(404)
          .json("El coche no se ha guardado en la BBDD correctamente");
      } else {
        //AQUI AÑADIMOS AL USUARIO EL COCHE QUE ACABA DE CREAR
        await user.updateOne({ $push: { coche_cliente: coche._id } });
        return res.status(200).json(coche);
      }
    } catch (error) {
      return next(error);
    }
  } catch (error) {
    return next(error);
  }
};
//--------------delete-car-----------------
const deleteCoche = async (req, res, next) => {
  try {
    console.log("entro delete");
    const { id } = req.params;
    const { _id } = req.user;
    const user = await User.findById(_id);
    const cocheToDelete = await Coche.findByIdAndDelete(id);

    if (!cocheToDelete) {
      return res.status(404).json("Problema al encontrar el coche");
    } else {
      if (cocheToDelete.estado == "none") {
        await user.updateOne({ $pull: { coche_cliente: id } });
        //-------------------->borrar imagenes<-----------------------------
        return res.status(200).json("coche del USER borrado correctamente");
      }
      if (cocheToDelete.estado == "venta") {
        //Recogemos los arrays populados que hay actualizar, ya que el coche va a estar en los intereses de los usuarios, va a tener
        //comentarios que hay que borrar de los usuarios y va a tener likes que habra que borrar de los usuarios tambien
        const arrayInteresados = cocheToDelete.interesados;
        const arrayComentario = cocheToDelete.comentario;
        const arrayLike = cocheToDelete.like;

        arrayInteresados.forEach(async (elem) => {
          await elem.updateOne({ $pull: { intereses: id } }); //DE CADA USUARIO LE ACTUALIZAMOS EL CAMPO INTERESES PARA BORRARLE EL COCHE
        });
        arrayComentario.forEach(async (elem) => {
          await Comentario.findByIdAndDelete(elem); //BORRAMOS EL COMENTARIO
          await elem.updateOne({ $pull: { comentario: elem } }); //DEL ARRAY DE COMENTARIOS DEL USUARIO PULLEAMOS ESE COMENTARIO
        });
        arrayLike.forEach(async (elem) => {
          await elem.updateOne({ $pull: { like_coche: elem } });
        });
        return res.status(200).json("coche en VENTA borrado correctamente");
      }
      if (cocheToDelete.estado == "taller") {
        return res
          .status(404)
          .json("El coche esta en el taller y no se puede borrar");
      }
    }
  } catch (error) {
    return next(error);
  }
};
//--------------update---------------------
const updateCoche = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { precio, estado } = req.body;
    console.log(precio);
    const cocheUpdate = await Coche.findByIdAndUpdate(id, {
      precio: precio,
      estado: estado,
    });
    console.log("id", id);
    const cocheYaUpdate = await Coche.findById(id);
    console.log("ya update", cocheYaUpdate);
    //ACTUALIZAMOS EL COCHE Y COMPROBAMOS MEDIANTE EL PRECIO (ya que es el unico campo que se puede actualizr) SI SE HA ACTUALIZADO BIEN.
    if (cocheYaUpdate.precio == precio) {
      return res.status(200).json({
        test: "precio actualizado",
        cocheYaUpdate,
      });
    } else {
      return res
        .status(404)
        .json("El precio del coche no se ha podido actualizar");
    }
  } catch (error) {
    return next(error);
  }
};
//--------------get-all--------------------
const getAllCoche = async (req, res, next) => {
  try {
    const allCoches = await Coche.find();
    const a = allCoches.sort((a, b) => b.like.length - a.like.length);

    console.log(a);
    if (allCoches) {
      return res.status(200).json(allCoches);
    } else {
      return res.status(404).json("No hay ningun coche en la base de datos");
    }
  } catch (error) {
    return next(error);
  }
};
//--------------get-coches-venta-----------
const getCochesVenta = async (req, res, next) => {
  try {
    const allCoches = await Coche.find({ estado: "venta" });
    if (allCoches) {
      return res.status(200).json(allCoches);
    } else {
      return res.status(404).json("No hay ningun coche en la base de datos");
    }
  } catch (error) {
    return next(error);
  }
};
//--------------get-by-marca---------------
const getByMarca = async (req, res, next) => {
  try {
    const { marca } = req.params;
    const allCoches = await Coche.find();
    if (allCoches) {
      const marcas = [];
      allCoches.forEach((coche) => {
        if (marca.toLowerCase() == coche.marca.toLowerCase()) {
          marcas.push(coche);
        }
      });
      return res.status(200).json(marcas);
    } else {
      return res.status(404).json("No se ha encontrado ningun coche");
    }
  } catch (error) {
    return next(error);
  }
};
//--------------get-by-modelo--------------
const getByModelo = async (req, res, next) => {
  try {
    const { modelo } = req.params;
    const allCoches = await Coche.find();
    if (allCoches) {
      const modelos = [];
      allCoches.forEach((coche) => {
        if (modelo == coche.modelo) {
          modelos.push(coche);
        }
      });
      return res.status(200).json(modelos);
    }
  } catch (error) {
    return next(error);
  }
};

//------------get by id-------------------------------
const getCocheById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const coments = await Coche.findById(id);
    if (coments) {
      return res.status(200).json(coments);
    } else {
      return res.status(404).json("Error al encontrar los comentarios");
    }
  } catch (error) {
    return next(error);
  }
};

//--------------add-interesado-------------
const addInteresado = async (req, res, next) => {
  try {
    const { id } = req.body;
    const { _id } = req.user;
    const user = await User.findById(_id);
    const coche = await Coche.findById(id);

    //AÑADIMOS EL INTERESADO TANTO AL COCHE COMO AL CLIENTE, Y EN CASO DE QUE YA SE ESTE INTERESADO LO QUITAMOS DE AMBOS DE SITIOS
    //FUNCIONA IGUAL QUE EL LIKE-> si le das una vez le das like y te lo guarda, si le das dos veces te quita el like
    if (!user.intereses.includes(id)) {
      await user.updateOne({ $push: { intereses: id } });
      await coche.updateOne({ $push: { interesados: _id } });
      return res.status(200).json("Coche añadido a los intereses del user");
    } else {
      await user.updateOne({ $pull: { intereses: id } });
      await coche.updateOne({ $pull: { interesados: _id } });
      return res.status(200).json("Coche quitado de los intereses del user");
    }
  } catch (error) {
    return next(error);
  }
};
//--------------add-like-------------------
const addLike = async (req, res, next) => {
  try {
    const { id } = req.body;
    const { _id } = req.user;
    const user = await User.findById(_id);
    const coche = await Coche.findById(id);

    //SI EL USUARIO LE DA LIKE Y TODAVIA NO LO TIENE GUARDADO, SE GUARDA EN AMBOS CAMPOS TANTO EN USER COMO EN COCHE Y EN CASO CONTRARIO,
    //DE QUE YA TENGA EL LIKE DEL COCHE SE LE QUITA A AMBOS CAMPOS TAMBIEN
    if (!coche.like.includes(_id)) {
      await coche.updateOne({ $push: { like: _id } });
      await user.updateOne({ $push: { like_coche: id } });
      return res.status(200).json({
        results: "Like añadido al user",
        update: await Coche.find(),
      });
    } else {
      await coche.updateOne({ $pull: { like: _id } });
      await user.updateOne({ $pull: { like_coche: id } });
      return res.status(200).json({
        results: "Like quitado del user",
        update: await Coche.find(),
      });
    }
  } catch (error) {
    return next(error);
  }
};
//--------------add-taller------------
const addTaller = async (req, res, next) => {
  try {
    console.log("reqqqqqq", req.body);
    const { idCoche, idTaller } = req.body;
    const taller = await User.findById(idTaller);
    const coche = await Coche.findById(idCoche);

    console.log("taller", idTaller);
    console.log("coche", idCoche);
    //AÑADIMOS EL COCHE AL TALLER Y AL USUARIO-TALLER LE AÑADIMOS EL COCHE
    if (coche) {
      console.log("taller punto taller", taller.taller);
      console.log(coche._id);
      if (taller.taller.includes(coche._id)) {
        return res.status(404).json("El taller ya incluye ese coche");
      } else {
        await coche.updateOne({ $push: { taller: idTaller } });
        await taller.updateOne({ $push: { taller: idCoche } });
        await coche.updateOne({ estado: "taller" });
        const updatedCoche = await User.findById(idCoche);
        console.log(updatedCoche);
        return res
          .status(200)
          .json(
            `El coche -> ${coche.marca} ${coche.modelo} ha sido añadido al taller -> ${taller.name} ${taller.apellido}`
          );
      }
    } else {
      return res
        .status(404)
        .json("No hay ningun coche ni ningun taller disponible");
    }
  } catch (error) {
    return next(error);
  }
};
//--------------ranking-de-like------------
const getByLike = async (req, res, next) => {
  try {
    const allCoches = await Coche.find();
    const arrayLikesOrdenado = [];
    let aux = 0;
    if (allCoches) {
      //CREAMOS UN BUCLE QUE LO PRIMERO QUE HACE ES PUSHEARNOS CADA UNO DE LOS COCHES A UN ARRAY VACIO, Y DESPUES MEDIANTE UNA CONDICION
      //EVALUAMOS CUAL DE LOS COCHES TIENE MAYOR NUMERO DE LIKES PARA POSICIONARLO EN UN SITIO U OTRO DEL ARRAY, ASI NOS LO ORDENARÁ DE
      //MAYOR A MENOR NUMERO DE LIKES
      allCoches.forEach((coche, index) => {
        arrayLikesOrdenado.push(coche);
        if (
          arrayLikesOrdenado[index]?.like?.length >
          arrayLikesOrdenado[index - 1]?.like?.length
        ) {
          aux = coche;
          arrayLikesOrdenado[index] = arrayLikesOrdenado[index - 1];
          arrayLikesOrdenado[index - 1] = aux;
        }
      });

      console.log(arrayLikesOrdenado);
      return res.status(200).json(arrayLikesOrdenado);
    } else {
      return res.status(404).json("No hay coches con likes para ordenar");
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createCoche,
  deleteCoche,
  updateCoche,
  getByMarca,
  getAllCoche,
  getByModelo,
  getByLike,
  addInteresado,
  addLike,
  addTaller,
  getCocheById,
  getCochesVenta,
};
