const { Pool } = require('pg');
const config = require('./config');

const connectionData = {
    user: config.database.user,
    host: config.database.host,
    database: config.database.name,
    password: config.database.password,
    port: config.database.port,
}

const client = new Pool(connectionData)

module.exports = client;