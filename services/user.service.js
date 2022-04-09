const client = require('../database');
const bcrypt = require('bcrypt');
const fileService = require('../services/file.service');
const tokenService = require('./token.service');

class UserService {

    constructor () {
    }

    createUser = async (data) => {
        const user = data.user;
        const file = data.file;

        // subir foto a public/images/
        const filePath = fileService.uploadFile(file);
        
        // crear usuario
        try {

            // aplicar hash a contraseña
            bcrypt.hash(user.password, 1, async (error, hash) => {

                if(error) {
                    throw 'Error al intentar guardar la contraseña de manera segura.'
                } else {
                    const query = `
                        INSERT INTO skaters 
                            (email, nombre, password, anos_experiencia, especialidad, foto, estado)
                        VALUES 
                            ('${user.email}', '${user.name}', '${hash}', '${user.years_experience}', '${user.specialty}', '${filePath}', '0')
                    `;
    
                    // Ejecutar query
                    await client.query(query);
                };

            });
    
        } catch {
            // Si hay un error, devuelve el siguiente mensaje
            throw 'Error al intentar insertar un nuevo usuario en la base de datos.';
        }
    }

    updateUser = async (user, data) => {
        const dataStoredQuery = `SELECT * FROM skaters WHERE id = '${user.id}'`;
        const dataStoredResult = await client.query(dataStoredQuery);
        const dataStored = dataStoredResult.rows[0];

        if(data.password) {
            data.password = await bcrypt.hash(data.password, 1);
        }

        const dataToUpdate = {
            name: data.name || dataStored.nombre,
            password: data.password || dataStored.password,
            years_experience: data.years_experience || dataStored.anos_experiencia,
            specialty: data.specialty || dataStored.expecialidad,
        }

        const updateQuery = `UPDATE skaters SET nombre = '${dataToUpdate.name}', password = '${dataToUpdate.password}', anos_experiencia = '${dataToUpdate.years_experience}', especialidad = '${dataToUpdate.specialty}' WHERE id = '${user.id}' RETURNING *`;
        const updateResult = await client.query(updateQuery);
        const userUpdated = updateResult.rows[0];

        return userUpdated;
    }

    loginUser = async (user) => {
        const query = `SELECT password FROM skaters WHERE email = '${user.email}' LIMIT 1`;
        const result = await client.query(query);
        
        if(result.rowCount === 0) return false;

        const dbUserPassword = result.rows[0].password;

        const match = await bcrypt.compare(user.password, dbUserPassword);

        if(match) {
            const query = `SELECT * FROM skaters WHERE email = '${user.email}' LIMIT 1`;
            const result = await client.query(query);
            const userLoggedIn = result.rows[0];
            return userLoggedIn;
        };

        return false;
    }

    getCurrentUser = async (token) => {

        const userPayload = tokenService.getTokenPayload(token);

        const query = `SELECT email, nombre, anos_experiencia, especialidad, estado FROM skaters WHERE id = '${userPayload.id}' LIMIT 1`;
        const result = await client.query(query);
        const user = result.rows[0];

        return user;
    }

    deleteUser = async (userId) => {
        const query = `DELETE FROM skaters WHERE id = ${userId}`;
        await client.query(query);
    }
    
}

module.exports = new UserService();