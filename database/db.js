const { Pool } = require("pg");

console.log(process.env.USER);

const pool = new Pool({
  user: process.env.USER,
  database: process.env.DB,
  password: process.env.PASSWORD,
  port: 5432,
  host: process.env.HOST
});



pool.on('connect',() => {
    console.log('Database Connection established')
});

module.exports = { pool };