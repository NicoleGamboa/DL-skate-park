const config = {
    database: {
        user: process.env.DATABASE_USER || 'postgres', // postgres => usuario
        host: process.env.DATABASE_HOST || 'localhost', // postgres => host
        name: process.env.DATABASE || 'skatepark', // postgres => base de datos
        password: process.env.DATABASE_PASSWORD || '123', // postgres => contraseña
        port: process.env.DATABASE_PORT || 5432
    },
    app: {
        port: process.env.PORT || 3000,
        url: process.env.APP_URL || `http://localhost:3000`,
        api: process.env.API_URL || `http://localhost:3000/api`
    }
}

module.exports = config;
