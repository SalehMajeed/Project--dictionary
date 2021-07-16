const http = require('http');
const express = require('express');
const app = express();

// for mongo
const url = 'mongodb://localhost:27017/dictionary';
const conn = require('./db/connection');
const mongo_lib = require('./db/database');

app.use(express.json());
app.use(express.static('public'));

app.post('/add-to-dictionary', mongo_lib.store_data);

conn(url)
  .then(async (connection) => {
    app.listen(8000);
  })
  .catch((e) => console.error(e));
