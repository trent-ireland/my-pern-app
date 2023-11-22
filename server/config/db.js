const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

pool.connect((err, client, release) => {
  if (err) {
      return console.error('Error acquiring client', err.stack);
  }
  console.log('Database Connected Successfully');
  client.query('SELECT NOW()', (err, result) => {
      release();
      if (err) {
          return console.error('Error executing query', err.stack);
      }
      console.log(result.rows);
  });
});

module.exports = pool;
