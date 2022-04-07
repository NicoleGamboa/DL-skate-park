const express = require('express');
const { engine } = require('express-handlebars');
const publicRoutes = require('./routes/public.routes');
const apiRoutes = require('./routes/api.routes');
const app = express();
const port = 3000;

// Configuración express
app.use(express.json());
app.use(express.static('./public')); //  define ruta para archivos estáticos

// Configuración handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Rutas aplicación
app.use('/', publicRoutes); // rutas públicas (para el html)
app.use('api/', apiRoutes); // rutas api

app.listen(port, () => {
    console.log(`App levantada en el puerto ${port}`);
});