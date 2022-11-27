const { Pool } = require("pg");

try {
  if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config({ override: true, debug: true })
  }
} catch (err) {
  console.log(err)
}



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