const path = require('path');

const envPath = '/mnt/c/Users/cid/Documents/practice/react-vite-todo/.env.local';

require('dotenv').config({path: envPath});

console.log('--- Testing dotenv loading ---');
console.log('NODE_ENV:', process.env.NODE_ENV); // Standard variable for context
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('TEST_VAR:', process.env.TEST_VAR); // From your added variable
console.log('--- End dotenv test ---');