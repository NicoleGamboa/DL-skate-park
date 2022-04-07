const client = require('../database');
const fileService = require('../services/file.service');

class UserService {

    constructor () {
    }

    createUser = async (data) => {
        const user = data.user;
        const file = data.file;

        // subir foto a public/images/
        const filePath = fileService.uploadFile(file);

        const query = `
            INSERT INTO skaters 
                (email, nombre, password, anos_experiencia, especialidad, foto, estado)
            VALUES 
                ('${user.email}', '${user.name}', '${user.password}', '${user.years_experience}', '${user.specialty}', '${filePath}', '0')
        `;
        
        try {
            // Ejecutar query
            await client.query(query);
        } catch {
            // Si hay un error, devuelve el siguiente mensaje
            throw 'Error al intentar insertar un nuevo usuario en la base de datos.';
        }
    }
    
}

module.exports = new UserService();