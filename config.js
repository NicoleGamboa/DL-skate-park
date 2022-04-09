const config = {
    database: {
        user: process.env.DATABASE_USER || 'nvkrwzcuuefgko',
        host: process.env.DATABASE_HOST || 'ec2-18-214-134-226.compute-1.amazonaws.com',
        name: process.env.DATABASE || 'ddalo6a9l5thrn',
        password: process.env.DATABASE_PASSWORD || '3850425fd064eaed6e559cc68ef1b9d6afcf684e6f5ff5f0b9424d91f6fcfffe',
        port: process.env.DATABASE_PORT || 5432,
    },
    app: {
        port: process.env.PORT || 3000,
        url: process.env.APP_URL || `localhost:3000`,
        api: process.env.API_URL || `localhost:3000/api`
    } 
}

module.exports = config;