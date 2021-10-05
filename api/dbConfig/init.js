 require('dotenv').config()

// const pool = new Pool();

// const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

// const pool = new Pool({
//   connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
//   ssl: isProduction,
// })

// module.exports = { pool }



const { Pool } = require('pg');

const pool = new Pool();

module.exports = pool;