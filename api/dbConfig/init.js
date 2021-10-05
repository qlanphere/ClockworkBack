 require('dotenv').config()

// const pool = new Pool();

// const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

// const pool = new Pool({
//   connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
//   ssl: isProduction,
// })

// module.exports = { pool }



const { Pool } = require('pg');

const pool = (() => {
    if ((process.env.NODE_ENV === 'development') || (process.env.NODE_ENV === 'test')) {
        return new Pool();
    } else {
        return new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
              }
        });
    } })();

module.exports = pool;