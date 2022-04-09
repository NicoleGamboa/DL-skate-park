const express = require('express');
const { engine } = require('express-handlebars');
const cookieParser = require('cookie-parser');
const publicRoutes = require('./routes/public.routes');
const apiRoutes = require('./routes/api.routes');
const fileUpload = require('express-fileupload');
const app = express();
const config = require('./config');

// Configuración express
app.use(fileUpload());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public')); //  define ruta para archivos estáticos

// Configuración handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Rutas aplicación
app.use('/', publicRoutes); // rutas públicas (para el html)
app.use('/api', apiRoutes); // rutas api

app.listen(config.app.port, () => {
    console.log(`App levantada en el puerto ${config.app.port}`);
});