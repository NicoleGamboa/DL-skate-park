const express = require("express");
const publicRoutes = express.Router();

publicRoutes.get('/', (req, res) => {
    res.render('index');
});

module.exports = publicRoutes;