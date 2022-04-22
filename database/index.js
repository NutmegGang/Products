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
SELECT name.id AS product_id,

    (SELECT json_agg(results) as results
     FROM
       (SELECT sty.id as style_id, sty.name, sty.original_price, sty.sale_price, sty.default_style as "default?",


          (SELECT json_agg(ph) as ph
           FROM (SELECT ph.thumbnail_url, ph.url
                 FROM photos ph
                 WHERE id=sty.id
                 ) as ph
          )as photos,


          (SELECT jsonb_object_agg(skus.id, json_build_object('quantity', skus.quantity, 'size', skus.size)) as sk
	         FROM skus
	         WHERE skus.style_id = sty.id
          ) as skus

         FROM styles as sty
         WHERE sty.product_id=name.id
      ) as results
    )as results

FROM name as name
WHERE name.id=${product_id}

`)

return styles.rows.pop()

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

