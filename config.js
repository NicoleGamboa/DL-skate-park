const config = {
    database: {
        user: process.env.DATABASE_USER || 'postgres',
        host: process.env.DATABASE_HOST || 'localhost',
        name: process.env.DATABASE || 'skatepark',
        password: process.env.DATABASE_PASSWORD || 'carvajal0995',
        port: process.env.DATABASE_PORT || 5432,
        url: process.env.DATABASE_URL || ''
    },
    app: {
        port: process.env.PORT || 3000,
        url: process.env.APP_URL || `localhost:3000`,
        api: process.env.API_URL || `localhost:3000/api`
    } 
}

module.exports = config;