const path = require('path');

const envPath = '/mnt/c/Users/cid/Documents/practice/react-vite-todo/.env.local';

require('dotenv').config({path: envPath});

module.exports = {
  development: {
    username: process.env.DB_USER, // Uses DB_USER from .env, falls back to 'root'
    password: 'mysecretpassword', // Uses DB_PASSWORD from .env, falls back to null
    database: process.env.DB_NAME || 'database_development', // Uses DB_NAME from .env
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'postgres', // Ensure this matches your database (e.g., 'postgres', 'sqlite')
    port: process.env.DB_PORT || 5432,
  },
  test: {
    username: process.env.DB_USER_TEST,
    password: process.env.DB_PASSWORD_TEST,
    database: process.env.DB_NAME_TEST || 'database_test',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'postgres',
    port: process.env.DB_PORT || 5432,
  },
  production: {
    username: process.env.DB_USER_PROD,
    password: process.env.DB_PASSWORD_PROD,
    database: process.env.DB_NAME_PROD || 'database_production',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'postgres',
    port: process.env.DB_PORT || 5432,
  }
}
