const express = require("express");
const apiRoutes = express.Router();
const userService = require('../services/user.service');

apiRoutes.post('/users/register', async (req, res) => {

    const data = {
        user: req.body,
        file: req.files.profile_photo
    };

    try {
        // crear usuario
        await userService.createUser(data);

        // si sale todo bien, redirige a la vista de login
        return res.redirect('/login');
    } catch (error) {
        console.log(error);
        return res.send('Se produjo un error al intentar crear el usuario');
    }

});

apiRoutes.post('/users/login', async (req, res) => {
    const credentials = req.body;
    console.log(credentials)

    try {
        if(await userService.loginUser(credentials)) return res.redirect('/datos');
    } catch (error) {
        console.log(error);
    }
    
    return res.redirect('/login?error=true');
});

apiRoutes.put('/users/update/:user_id', (req, res) => {

});

module.exports = apiRoutes;