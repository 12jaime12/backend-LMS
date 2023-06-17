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

const ComentariosRoutes = require("./src/api/routes/Comentario.routes");
const TallerRoutes = require("./src/api/routes/Taller.routes");
const UserRoutes = require("./src/api/routes/User.routes");
const ReviewRoutes = require("./src/api/routes/Review.routes");
const CocheRoutes = require("./src/api/routes/Coche.routes");
const CatalogoRoutes = require("./src/api/routes/Catalogo.routes");

//Nos importamos las rutas y las enlazamos a nuestra ruta principal mas el añadido de /api/v1 por medio de app.use()
app.use("/api/v1/user/", UserRoutes);
app.use("/api/v1/taller/", TallerRoutes);
app.use("/api/v1/review/", ReviewRoutes);
app.use("/api/v1/comentarios/", ComentariosRoutes);
app.use("/api/v1/coche/", CocheRoutes);
app.use("/api/v1/catalogo/", CatalogoRoutes);
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
