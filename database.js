const { Pool } = require('pg');
const connectionData = {
    user: 'postgres',
    host: 'localhost',
    database: 'skatepark',
    password: 'carvajal0995',
    port: 5432,
}

const client = new Pool(connectionData)

module.exports = client;