import { Sequelize } from "sequelize";

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10):5432;
const DB_NAME = process.env.DB_NAME || 'postgres';
const DB_USER = process.env.DB_USER || 'postgres';
const DB_PASSWORD = process.env.DB_PASSWORD || 'mysecretpassword';

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD,{
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres',
    logging: false,
})

export default sequelize;