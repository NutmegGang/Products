const { Pool } = require('pg');
require('dotenv').config();

//const postgres = require('postgres');
//const sql = postgres(process.env.PG_CONNECTION_STRING)

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  port: process.env.DB_PORT
});


// const otherProducts = (callback) => {
//   console.log('otherProducts')

//   pool.query(`
//   SELECT id, name, slogan, description, category, default_price FROM name ORDER BY id ASC LIMIT 3;
//   `, (err, res) => {
//     if(err) {callback(err, null)};
//     callback (null, res)
//     // return res.rows
//   })
//}

async function products(page = 0, count = 5) {
  const name = await pool.query( `
  SELECT id, name, slogan, description, category, default_price
  FROM name
  ORDER BY id
  ASC
  LIMIT ${count}
  OFFSET ${count * page}
  ;
  `)

  return name;
}


async function product(product_id) {
  console.log('product id', product_id)
  const productInfo = await pool.query( `
  Select row_to_json(N) as name
  from (
  Select name.id, name.name, name.slogan, name.description, name.category, name.default_price,

    (SELECT json_agg(F)
       from (
         select features.feature, features.value
         from features
         where product_id=name.id
         ) F
         )as features

  from name as name) as N
  where N.id=${product_id};
  `)


  // const name = await pool.query( `
  // SELECT name.id, name.name, name.slogan, name.description, name.category, name.default_price, features.product_id, features.feature, features.value
  // FROM name
  // JOIN features
  // ON name.id = features.product_id
  // Where product_id=${product_id}
  // LIMIT 2;
  // `)
  return productInfo;
}
  // SELECT id, name, slogan, description, category, default_price FROM public."Product_name" WHERE id=${product_id}
  //SELECT * FROM public."Product_name" JOIN public."Product_features" ON public."Product_name".id = public."Product_features".product_id LIMIT 10;
  //SELECT * FROM public."Product_name" where id=${product_id} JOIN public."Product_features" ON public."Product_name".product_id = public."Product_features".id;




module.exports = {
  products,
  product,
  pool,
};


//related
//name
//features
//styles
//photos
//skus

