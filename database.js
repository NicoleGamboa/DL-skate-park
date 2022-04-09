const { Client } = require('pg');
const config = require('./config');

// const connectionData = {
//     user: config.database.user,
//     host: config.database.host,
//     database: config.database.name,
//     password: config.database.password,
//     port: config.database.port || 5432,
// }

const client = new Client({
    connectionString: config.database.url,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect();

module.exports = client;