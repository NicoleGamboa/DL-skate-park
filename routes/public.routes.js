const express = require("express");
const publicRoutes = express.Router();

publicRoutes.get('/', (req, res) => {
    res.render('index');
});

publicRoutes.get('/registro', (req, res) => {
    res.render('registro');
});

publicRoutes.get('/login', (req, res) => {
    res.render('login');
});

publicRoutes.get('/datos', (req, res) => {
    res.render('datos');
});

publicRoutes.get('/admin', (req, res) => {
    res.render('admin');
});





module.exports = publicRoutes;