DROP DATABASE IF EXISTS music;
CREATE DATABASE music;
\c music;

CREATE TABLE songdata(
id SERIAL PRIMARY KEY,
name VARCHAR ( 80 ) NOT NULL,
length INT NOT NULL,

/*Idea splitting tables between name and length band id foreign key
with url and image content file with id foreign key
*/
url VARCHAR ( 80 ) NOT NULL,
image VARCHAR ( 80 ) NOT NULL,
band_id INT NOT NULL 
)



-- psql -U postgres < database/schema.sql
