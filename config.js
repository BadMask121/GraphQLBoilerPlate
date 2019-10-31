const dotenv = require('dotenv');
dotenv.config();



module.exports = {
    schema: './src/schema/schema.graphql',
    ACCESS_SECRET: process.env.ACCESS_SECRET,
    port: (process.env.PORT) ? process.env.PORT : 4200,
    host: (process.env.HOST) ? process.env.HOST : "localhost",
    stage: {
        DEVELOPMENT: "development",
        PRODUCTION: "production"
    },
    env: process.env.NODE_ENV
}
