#!/bin/bash

database="productsdb"

echo "Configuring database: $database"

dropdb -U node_user productsdb
createdb -U node_user productsdb

psql -U node_user productsdb < /Users/jupiter/Hack_Reactor/rfe2202/SDC/Products/database/postgres.sql


echo "Postgres $database configured"

