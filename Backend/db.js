const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',             // PostgreSQL username
  host: 'localhost',             // Database server (localhost for local setup)
  database: 'webshop',     // Database name
  password: '7979',     // PostgreSQL password
  port: 5432,                    // Default PostgreSQL port
});

pool.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch((err) => console.error('Connection error', err.stack));

  module.exports = {
    query: (text, params) => pool.query(text, params),
};