CREATE TABLE IF NOT EXISTS "Products"."Product_name"
(
    product_id integer NOT NULL,
    name character varying(50) NOT NULL,
    slogan text,
    description text,
    default_price character varying(100),
    category character varying(20),
    PRIMARY KEY (product_id)
);

CREATE TABLE IF NOT EXISTS "Products"."Product_features"
(
    id integer NOT NULL,
    feature character varying(90),
    value character varying(90),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS "Products"."Product_syles"
(
    style_id integer,
    name character varying(20),
    original_price character varying(10),
    sale_price character varying(10),
    "default?" boolean,
    PRIMARY KEY (style_id)
);

CREATE TABLE IF NOT EXISTS "Products"."Product_photos"
(
    photo_id integer,
    thumbnail_url text,
    url text,
    PRIMARY KEY (photo_id)
);

CREATE TABLE IF NOT EXISTS "Products"."Product_skus"
(
    sku_id integer,
    quantity integer,
    size character varying(3),
    PRIMARY KEY (sku_id)
);

CREATE TABLE IF NOT EXISTS "Products"."Product_related_items"
(
    related integer
);

ALTER TABLE IF EXISTS "Products"."Product_features"
    ADD FOREIGN KEY (id)
    REFERENCES "Products"."Product_name" (product_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS "Products"."Product_syles"
    ADD FOREIGN KEY (style_id)
    REFERENCES "Products"."Product_name" (product_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS "Products"."Product_photos"
    ADD FOREIGN KEY (photo_id)
    REFERENCES "Products"."Product_syles" (style_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS "Products"."Product_skus"
    ADD FOREIGN KEY (sku_id)
    REFERENCES "Products"."Product_syles" (style_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS "Products"."Product_related_items"
    ADD FOREIGN KEY (related)
    REFERENCES "Products"."Product_name" (product_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;
