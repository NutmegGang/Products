const { Router } = require('express');
const { products, product, related, styles } = require('../../database/index.js')


const router = Router();

//we are in the /products route so only need to use /
router.get('/', (req,res, next) => {
  const {page, count} = req.query;
  products(page, count)
  .then(data => res.status(200).json(data.rows))
  .catch(err => res.status(500).send(err))
})

router.get('/:product_id', (req,res, next) => {
  const { product_id } = req.params
  product(product_id)
  .then(data => res.json(data.rows))
  .catch(err => console.warn(err))
})

router.get('/:product_id/related', (req,res, next) => {
  const { product_id } = req.params
  related(product_id)
  .then(data => res.status(200).json(data))
  .catch(err => res.status(500).json(err))
})

router.get('/:product_id/styles', (req,res, next) => {
  const { product_id } = req.params
  styles(product_id)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err))
})

router.get('/loaderio-57a346494ee3cf906f7f7ebb13b488eb', (req,res,next) => {
  res.send("loaderio-57a346494ee3cf906f7f7ebb13b488eb")
})

module.exports = router;