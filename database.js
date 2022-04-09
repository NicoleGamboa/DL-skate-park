const { Pool } = require('pg');
const connectionData = {
    user: process.env.DATABASE_USER || 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    database: process.env.DATABASE || 'skatepark',
    password: process.env.DATABASE_PASSWORD || 'carvajal0995',
    port: process.env.DATABASE_PORT || 5432,
}

const client = new Pool(connectionData)

module.exports = client;