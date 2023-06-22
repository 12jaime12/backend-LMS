const express = require("express");
const { upload } = require("../../middleware/files.middleware");
const {
  isAuthClient,
  isAuthAdmin,
} = require("../../middleware/auth.middleware");
const {
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
  getById,
} = require("../controllers/Catalogo.controller");

const CatalogoRoutes = express.Router();

CatalogoRoutes.post(
  "/create",
  [isAuthClient],
  upload.array("image", 4),
  createCatalogo
);
CatalogoRoutes.delete("/delete/:id", [isAuthClient], deleteCar);
CatalogoRoutes.post("/updateCatalogo", [isAuthClient], updateCar);
CatalogoRoutes.get("/getMarca/:marca", [isAuthClient], getByMarca);
CatalogoRoutes.get("/getModelo/:modelo", [isAuthClient], getByModelo);
CatalogoRoutes.post("/like/:id", [isAuthClient], addLike);
CatalogoRoutes.get("/getAllBase", getAllBase);
CatalogoRoutes.get("/getById/:id", [isAuthClient], getById);
module.exports = CatalogoRoutes;
