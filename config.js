const config = {
    database: {
        user: process.env.DATABASE_USER || '',
        host: process.env.DATABASE_HOST || '',
        url: process.env.DATABASE || '',
        password: process.env.DATABASE_PASSWORD || '',
        port: process.env.DATABASE_PORT || 5432,
    },
    app: {
        port: process.env.PORT || 3000,
        url: process.env.APP_URL || `localhost:3000`,
        api: process.env.API_URL || `localhost:3000/api`
    } 
}

module.exports = config;