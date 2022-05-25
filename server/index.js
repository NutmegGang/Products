const express = require('express');
//const path = require('path');
var morgan = require('morgan')
require('dotenv').config();

const products = require('./routes/products.js')

const PORT = process.env.PORT || 3000;

const axios = require('axios')
const app = express();


app.use(express.json());
app.use(morgan('dev'))
app.use('/products', products)


app.use((err, req, res, next) => {
  res.status(500).send(err)
})

app.listen(PORT, () => {
  console.log(`Listening to port : ${PORT}`)
})