const { Router } = require('express');
const { sql, products, product, pool, otherProducts} = require('../../database/index.js')


const router = Router();

//we are in the /products route so only need to use /
router.get('/', (req,res, next) => {
  const {page, count} = req.query;

  // products()
  // .then(data => res.json(data))
  // .catch(err => console.log(err))
  // otherProducts((err, response) => {
  //   if(err) {
  //     console.log("Error", err)
  //     res.send(500)
  //   } else {
  //     res.send(response)
  //   }
  // })
  products(page, count)
  .then(data => res.status(200).json(data.rows))
  .catch(err => res.status(500).send(err))

  // pool.query('SELECT id, name, slogan, description, category, default_price FROM public."Product_name" ORDER BY id ASC LIMIT 4', (err, ress) => {
  //   if(err) return console.log(err);
  //   res.json(ress.rows)
  //   })
})

router.get('/:product_id', (req,res, next) => {
  const { product_id } = req.params
  product(product_id)
  .then(data => res.json(data.rows))
  .catch(err => console.warn(err))
})

router.get('/:product_id/styles', (req,res, next) => {
  res.status(200).send('Styles', req.params)
})

router.get('/:product_id/related', (req,res, next) => {
  res.status(200).send('Related', req.params)
})


module.exports = router;