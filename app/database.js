const { Pool } = require('pg');

let config = {
        connectionString: process.env.DATABASE_URL,
    }

const pool = new Pool(config);

module.exports = pool;