import 'dotenv/config'

export const appConfig = {
    PORT: process.env.PORT, 
    JWT_SECRET: String(process.env.JWT_SECRET),

    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    pass: process.env.DB_PASSWORD,
    db: process.env.DB_NAME,
};