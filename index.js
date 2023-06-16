const { connect } = require("./src/utils/db");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT;
dotenv.config();
connect();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: false }));

//--------------------------------------------------------
//-------------------------ROUTES-------------------------
//--------------------------------------------------------

const reviewRoutes = require("./src/api/routes/Review.routes");
const userRoutes = require("./src/api/routes/user.routes");
const tallerRoutes = require("./src/api/routes/Taller.routes");
const ComentariosRoutes = require("./src/api/routes/Comentario.routes");
ComentariosRoutes;

//Nos importamos las rutas y las enlazamos a nuestra ruta principal mas el añadido de /api/v1 por medio de app.use()
app.use("/api/v1/user/", userRoutes);
app.use("/api/v1/taller/", tallerRoutes);
app.use("/api/v1/review/", reviewRoutes);
app.use("/api/v1/comentarios/", ComentariosRoutes);

// app.use('*', (req, res, next) => {
//   const error = new Error('Route not found');
//   error.status = 404;
//   return next(error);
// });

// app.use((error, req, res) => {
//   return res
//     .status(error.status || 500)
//     .json(error.message || 'Unexpected error');
// });

app.disable("x-powered-by");
app.listen(PORT, () => {
  console.log(`Listening on PORT http://localhost:${PORT}`);
});
