require('dotenv').config({ override: true, debug: true })
const express = require('express');
const path = require('path');
const {pool} = require('../database/db');



const PORT = process.env.PORT || 3002;


const app = express();


app.use(express.static(path.resolve(__dirname, '../client/build')));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


app.get("/api/notes", (req, res) => {

   try {
    pool.query('SELECT * FROM take_note').then((resp) => {
     
        res.json(resp.rows);
    
        res.status(200)
  

      if(resp.rows){
        console.log(resp.rows)
      }
    
    });
 
 

   } catch (err) {
    console.log(err);
   }
  });