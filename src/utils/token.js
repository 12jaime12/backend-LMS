const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

//Creamos una función que si existe el ID y el email nos creará un token para poder acceder
//con jwt.sign firmamos el token para ese ID y email y le ponemos el tiempo de duracion
const generateToken = (id, email) => {
  if (!id || !email) {
    throw new Error('No se ha encontrado ID o email');
  }

  return jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

//Creamos una funcion para verificar el token, a la cual le pasamos el token como parametro para que haga un jwt.verify
//con jwt.verify verificamos que los datos del token sean permitidos por la JWT_SECRET (no es lo mismo)
const verifyToken = (token) => {
  if (!token) {
    throw new Error('No hay token');
  }

  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateToken, verifyToken };
