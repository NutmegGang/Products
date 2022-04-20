const express = require('express');
const path = require('path');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const axios = require('axios')
const app = express();
app.use(express.json());


app.get('/products', (req,res) => {
  console.log(req.url)
  res.status(200).json({1: 'one', 2: 'two', 3: 'three'})
})

app.get('/products/:product_id', (req,res) => {

  const { id } = req.params

  console.log(id, req.url)
  res.status(200).send(req.params)
})

app.get('/products/:product_id/styles', (req,res) => {
  res.status(200).send('Styles', req.params)
})

app.get('/products/:product_id/related', (req,res) => {
  res.status(200).send('Related', req.params)
})

app.listen(PORT, () => {
  console.log(`Listening to port : ${PORT}`)
})