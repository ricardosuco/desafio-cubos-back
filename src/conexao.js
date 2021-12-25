const { Pool } = require('pg');
const parse = require("pg-connection-string").parse;
require('dotenv').config();

const query = (text, param) => {
    return pool.query(text, param);
}

const knex = require('knex')({
    client: 'pg',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
        ssl: {
            rejectUnauthorized: false
        }
    }
});


module.exports = {
    query,
    knex
}
