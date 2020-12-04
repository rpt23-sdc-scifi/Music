DROP DATABASE IF EXISTS music;
CREATE DATABASE music;
\c music;

create table 
 songdata(
id SERIAL PRIMARY KEY,
name VARCHAR ( 80 ) NOT NULL,
length INT NOT NULL,

url VARCHAR ( 80 ) NOT NULL,
image VARCHAR ( 80 ) NOT NULL,
band_id INT NOT NULL 
)


drop table songdata;
-- psql -U postgres < db/schema.sql
