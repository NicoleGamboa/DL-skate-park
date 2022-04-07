const express = require('express');
const publicRoutes = require('./routes/public.routes');
const app = express();
const port = 3000;

// Configuración express
app.use(express.json());

app.use('/', publicRoutes); // rutas públicas (para el html)

app.listen(port, () => {
    console.log(`App levantada en el puerto ${port}`);
});