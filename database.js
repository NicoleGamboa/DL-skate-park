const { Client } = require('pg');
const config = require('./config');

const client = new Client({
    connectionString: `postgres://${config.database.user}:${config.database.password}@${config.database.host}:${config.database.port}/${config.database.name}`,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect();

module.exports = client;