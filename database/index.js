const { Pool } = require('pg');
require('dotenv').config();

//const postgres = require('postgres');
//const sql = postgres(process.env.PG_CONNECTION_STRING)

const pool = new Pool({
  user: process.env.USER,
  host: 'ec2-34-235-137-163.compute-1.amazonaws.com',
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  post: 5432,
  max: 10,
});
// user: process.env.USER,
// host: process.env.HOST,
// database: process.env.DATABASE,
// port: process.env.DB_PORT


async function products(page = 0, count = 5) {
  const name = await pool.query( `
  SELECT product_id, name, slogan, description, category, default_price
  FROM name
  ORDER BY product_id
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
  Select name.product_id, name.name, name.slogan, name.description, name.category, name.default_price,

    (SELECT json_agg(F)
       from (
         select features.feature, features.value
         from features
         where product_id=name.product_id
         ) F
         )as features

  from name as name) as N
  where N.product_id=${product_id};
  `)
  return productInfo;
}

//related products /products/37311/related
async function related(product_id) {
  const relatedInfo = await pool.query(`
  SELECT array
 (
  SELECT related_id FROM related where product_id=${product_id}
  ) as x;
  `)
  return relatedInfo.rows[0].x
}


//product styles /products/38321/styles
async function styles(product_id) {

  const styles = await pool.query(`
SELECT name.product_id,

    (SELECT json_agg(results) as results
     FROM
       (SELECT sty.id as style_id, sty.name, sty.original_price, sty.sale_price, sty.default_style as "default?",


       (SELECT json_agg(json_build_object('thumbnail_url', photos.thumbnail_url, 'url', photos.url)) as photos
       FROM photos
       WHERE photos.style_id = sty.id
       GROUP BY photos.style_id),


          (SELECT jsonb_object_agg(skus.id, json_build_object('quantity', skus.quantity, 'size', skus.size)) as sk
	         FROM skus
	         WHERE skus.style_id = sty.id
          ) as skus

         FROM styles as sty
         WHERE sty.product_id=name.product_id
      ) as results
    )as results

FROM name as name
WHERE name.product_id=${product_id}
`)
return styles.rows[0]
}











module.exports = {
  products,
  product,
  related,
  styles
};


//related
//name
//features
//styles
//photos
//skus

