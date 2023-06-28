const { connect } = require('./src/utils/db');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT;
dotenv.config();
connect();

app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: false }));

//--------------------------------------------------------
//-------------------------ROUTES-------------------------
//--------------------------------------------------------

const ComentariosRoutes = require('./src/api/routes/Comentario.routes');
const UserRoutes = require('./src/api/routes/user.routes');
const ReviewRoutes = require('./src/api/routes/Review.routes');
const CocheRoutes = require('./src/api/routes/Coche.routes');
const CatalogoRoutes = require('./src/api/routes/Catalogo.routes');
const ColorRoutes = require('./src/api/routes/Color.routes');
const LlantaRoute = require('./src/api/routes/Llanta.routes');
const CocheBaseRoutes = require('./src/api/routes/CocheBase.routes');
const MotorRoutes = require('./src/api/routes/Motor.routes');

//Nos importamos las rutas y las enlazamos a nuestra ruta principal mas el añadido de /api/v1 por medio de app.use()
app.use('/api/v1/user/', UserRoutes);
app.use('/api/v1/review/', ReviewRoutes);
app.use('/api/v1/comentarios/', ComentariosRoutes);
app.use('/api/v1/coche/', CocheRoutes);
app.use('/api/v1/catalogo/', CatalogoRoutes);
app.use('/api/v1/color/', ColorRoutes);
app.use('/api/v1/llanta/', LlantaRoute);
app.use('/api/v1/cochebase', CocheBaseRoutes);
app.use('/api/v1/motor/', MotorRoutes);

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

app.disable('x-powered-by');
app.listen(() => {
  console.log(`Listening on PORT https://backend-lms-nine.vercel.app/`);
});
