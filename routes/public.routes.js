const express = require("express");
const guestMiddleware = require("../middlewares/guest.middleware");
const authMiddleware = require("../middlewares/auth.middleware");
const tokenService = require("../services/token.service");
const userService = require("../services/user.service");
const publicRoutes = express.Router();

publicRoutes.get('/', (req, res) => {
    const page = {
        title: 'Home'
    };

    res.render('index', { page });
});

publicRoutes.get('/registro', guestMiddleware, (req, res) => {
    const page = {
        title: 'Registrar usuario'
    };

    res.render('registro', { page });
});

publicRoutes.get('/login', guestMiddleware, (req, res) => {
    const page = {
        title: 'Iniciar sesión'
    }

    res.render('login', { page });
});

publicRoutes.get('/datos', authMiddleware, async (req, res) => {

    const token = tokenService.getToken(req.cookies.Authorization);
    const user = await userService.getCurrentUser(token);

    const page = {
        title: 'Mi perfil',
    };

    return res.render('datos', { page, user });

});

publicRoutes.get('/admin', authMiddleware, (req, res) => {
    const page = {
        title: 'Administración'
    }

    res.render('admin', { page });
});

module.exports = publicRoutes;