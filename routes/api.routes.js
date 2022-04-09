const express = require("express");
const apiRoutes = express.Router();
const userService = require('../services/user.service');
const tokenService = require('../services/token.service');
const skaterService = require("../services/skater.service");

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
    
        return res.status(500).json({
            error: 'User create',
            message: 'Se produjo un error al intentar crear un usuario'
        });
    }

});

apiRoutes.post('/users/login', async (req, res) => {
    const credentials = req.body;

    try {
        const user = await userService.loginUser(credentials);

        if(user) {
            const token = tokenService.createToken(user);
            return res.json({ token });
        };

    } catch (error) {
        console.log(error);
    }
    
    return res.status(401).json({
        error: 'Login error',
        message: 'Credenciales no válidas para autorizar al usuario'
    });
});

apiRoutes.put('/users/profile', async (req, res) => {
    
    try {
        const newData = req.body;
        const token = tokenService.getToken(req.cookies.Authorization);
        const currentUser = await tokenService.getTokenPayload(token);
        const user = await userService.updateUser(currentUser, newData);
    
        // actualizar token
        const newToken = tokenService.createToken(user);
    
        // actualizar cookie con el nuevo token
        return res.status(200).cookie('Authorization', 'Bearer ' + newToken, { overwrite: true }).send('Usuario actualizado correctamente.');
    } catch (error) {
        console.log(error);
    }

    return res.status(500).json({
        error: 'User update',
        message: 'Se produjo un error al intentar actualizar los datos del usuario'
    });
});

apiRoutes.delete('/users/profile', async (req, res) => {
    
    try {
        const token = tokenService.getToken(req.cookies.Authorization);
        const currentUser = await tokenService.getTokenPayload(token);
        userService.deleteUser(currentUser.id);
        return res.clearCookie('Authorization').send('Usuado eliminado correctamente.');
    } catch (error) {
        console.log(error);
    }

    return res.status(500).json({
        error: 'User delete',
        message: 'Se produjo un error al intentar eliminar el usuario'
    });
});

apiRoutes.get('/skaters', async (req, res) => {
    try {
        const skaters = await skaterService.getAll();
        return res.json(skaters);
    } catch (error) {
        console.log(error);
    }

    return res.status(500).json({
        error: 'Skaters',
        message: 'Se produjo un error al intentar obtener el listado de skaters.'
    });
});

apiRoutes.post('/skaters/update', async (req, res) => {
    try {
        const skaterId = req.body.skaterId;
        console.log('HEREEE', skaterId);
        skaterService.updateStatus(skaterId);
        return res.send('Estado actualizado correctamente');
    } catch (error) {
        console.log(error);
    }

    return res.status(500).json({
        error: 'Skaters update',
        message: 'Se produjo un error al intentar actualizar el estado del skater.'
    });
});

module.exports = apiRoutes;