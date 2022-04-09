const client = require('../database');

class SkaterClass {
    constructor() {}

    getAll = async () => {
        const query = `SELECT id, foto, nombre, anos_experiencia, especialidad, estado FROM skaters`;
        const result = await client.query(query);
        return result.rows;
    }

    updateStatus = async (skaterId) => {
        const query = `UPDATE skaters SET estado = NOT estado WHERE id = '${skaterId}'`;
        await client.query(query);
    }

}

module.exports = new SkaterClass();