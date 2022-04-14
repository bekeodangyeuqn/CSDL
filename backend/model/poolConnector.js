const Pool = require('pg').Pool;
const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_HOST || 'postgres',
    port: process.env.DB_PORT || '5432',
    user: process.env.DB_USE || 'postgres',
    password: process.env.DB_PASSWORD || 'admin',
})

module.exports = pool;