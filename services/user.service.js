const client = require('../database');
const bcrypt = require('bcrypt');
const fileService = require('../services/file.service');

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

    loginUser = async (user) => {
        const query = `SELECT * FROM skaters WHERE email = '${user.email}' AND password = '${user.password}'`;

        const result = await client.query(query);

        if (result.rowCount === 1) {
            return true;
        }

        return false;
    }
    
}

module.exports = new UserService();