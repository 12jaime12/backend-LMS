const dotenv = require("dotenv");
const Catalogo = require("../models/Catalogo.model");
const User = require("../models/User.model");

//--------------create-car-----------------
const createCatalogo = async (req, res, next) => {
  try {
    const arrayAux = [];
    if (req?.files) {
      req.files.forEach((element) => {
        console.log("path", element.path);
        arrayAux.push(element.path);
      });
    }
    const newCatalogo = new Catalogo({ ...req.body, image: arrayAux });

    try {
      const catalogo = await newCatalogo.save();

      return res.status(200).json(catalogo);
    } catch (error) {
      return next(error);
    }
  } catch (error) {
    return next(error);
  }
};
//--------------delete-car-----------------
const deleteCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const catalogoToDelete = await Catalogo.findById(id);
    const catalogo = await Catalogo.findByIdAndDelete(id);
    if (catalogo) {
      catalogoToDelete.comentario.forEach(async (element) => {
        await Comentario.findByIdAndDelete(element);
      });

      return res.status(200).json("ok borrado");
    } else {
      return res.status(404).json("error al borrar");
    }
  } catch (error) {
    return next(error);
  }
};
//--------------update---------------------
const updateCar = async (req, res, next) => {
  try {
    const newCatalogo = new Catalogo(req.body);

    newCatalogo.rol = "personalizado";
    newCatalogo.cliente = req.user._id;

    try {
      const catalogoSave = await newCatalogo.save();

      const user = await User.findById(req.user._id);
      await user.updateOne({
        $push: { coche_tienda: catalogoSave._id },
      });

      return res.status(200).json(catalogoSave);
    } catch (error) {
      return next(error);
    }
  } catch (error) {
    return next(error);
  }
};
//--------------get-all--------------------
const getAll = async (req, res, next) => {
  try {
    const allCatalogo = await Catalogo.find();
    if (allCatalogo) {
      return res.status(200).json(allCatalogo);
    } else {
      return res.status(404).json("error al encontrar el catalogo");
    }
  } catch (error) {
    return next(error);
  }
};
//--------------get-by-marca---------------
const getByMarca = async (req, res, next) => {
  try {
    const { marca } = req.params;
    const catalogoMarca = await Catalogo.find({ marca: marca });
    if (catalogoMarca) {
      return res.status(200).json(catalogoMarca);
    } else {
      return res.status(404).json("error al cargar los coches de esa marca");
    }
  } catch (error) {
    return next(error);
  }
};
//--------------get-by-modelo--------------
const getByModelo = async (req, res, next) => {
  try {
    const { modelo } = req.params;
    const catalogoModelo = await Catalogo.find({ modelo: modelo });
    if (catalogoModelo) {
      return res.status(200).json(catalogoModelo);
    } else {
      return res.status(404).json("error al cargar los coches de esa marca");
    }
  } catch (error) {
    return next(error);
  }
};
//-------------get-all-base----------------
const getAllBase = async (req, res, next) => {
  try {
    const allBase = await Catalogo.find({ rol: "base" });
    if (allBase) {
      return res.status(200).json(allBase);
    } else {
      return res.status(404).json("error al conseguir todos los coches base");
    }
  } catch (error) {
    return next(error);
  }
};
//--------------add-interesado-------------
const addInteresado = async (req, res, next) => {
  try {
    const { id } = req.params; //idCatalogo personalizado
    const catalogo = await Catalogo.findById(id);
    const user = await User.findById(req.user_id);
    if (!catalogo.interesados.includes(req.user_id)) {
      await catalogo.updateOne({
        $push: { interesados: req.user._id },
      });
      await user.updateOne({
        $push: { intereses: id },
      });
      return res.status(200).json("Añadido a interesados");
    } else {
      await catalogo.updateOne({
        $pull: { interesados: req.user._id },
      });
      await user.updateOne({
        $pull: { intereses: id },
      });
      return res.status(200).json("Eliminado de interesados");
    }
  } catch (error) {
    return next(error);
  }
};
//--------------add-like-------------------
const addLike = async (req, res, next) => {
  try {
    const { id } = req.params; //catalogo
    const catalogo = await Catalogo.findById(id);
    const user = await User.findById(req.user._id);
    if (!catalogo.like.includes(req.user._id)) {
      await catalogo.updateOne({
        $push: { like: req.user._id },
      });
      await user.updateOne({
        $push: { like_coche: id },
      });
      return res.status(200).json("like añadido");
    } else {
      await catalogo.updateOne({
        $pull: { like: req.user._id },
      });
      await user.updateOne({
        $pull: { like_coche: id },
      });
      return res.status(200).json("like eliminado");
    }
  } catch (error) {
    return next(error);
  }
};
//--------------ranking-de-like------------
const getByLike = async (req, res, next) => {
  try {
    const allCatalogo = await Catalogo.find({ rol: "base" });
    const arrayLikesOrdenado = [];
    let aux = 0;
    if (allCoches) {
      //CREAMOS UN BUCLE QUE LO PRIMERO QUE HACE ES PUSHEARNOS CADA UNO DE LOS COCHES A UN ARRAY VACIO, Y DESPUES MEDIANTE UNA CONDICION
      //EVALUAMOS CUAL DE LOS COCHES TIENE MAYOR NUMERO DE LIKES PARA POSICIONARLO EN UN SITIO U OTRO DEL ARRAY, ASI NOS LO ORDENARÁ DE
      //MAYOR A MENOR NUMERO DE LIKES
      allCatalogo.forEach((coche, index) => {
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

      return res.status(200).json(arrayLikesOrdenado);
    } else {
      return res.status(404).json("No hay coches con likes para ordenar");
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createCatalogo,
  deleteCar,
  updateCar,
  getAll,
  getByMarca,
  getByModelo,
  addInteresado,
  addLike,
  getByLike,
  getAllBase,
};
