const express = require("express");
const publicRoutes = express.Router();

publicRoutes.get('/', (req, res) => {
    const page = {
        title: 'Home'
    };

    res.render('index', { page });
});

publicRoutes.get('/registro', (req, res) => {
    const page = {
        title: 'Registrar usuario'
    };

    res.render('registro', { page });
});

publicRoutes.get('/login', (req, res) => {
    const page = {
        title: 'Iniciar sesión'
    }

    res.render('login', { page });
});

publicRoutes.get('/datos', (req, res) => {
    const page = {
        title: 'Mi perfil'
    }

    res.render('datos', { page });
});

publicRoutes.get('/admin', (req, res) => {
    const page = {
        title: 'Administración'
    }

    res.render('admin', { page });
});

module.exports = publicRoutes;