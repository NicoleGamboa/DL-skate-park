const { Pool } = require('pg');
const config = require('./config');

const connectionData = {
    user: config.database.user || 'postgres',
    host: config.database.host || 'localhost',
    database: config.database.url || 'skatepark',
    password: config.database.password || 'carvajal0995',
    port: config.database.port || 5432,
}

const client = new Pool(connectionData)

module.exports = client;