DROP DATABASE IF EXISTS music;
CREATE DATABASE music;
\c music;
CREATE TABLE "bands"(
    band_id SERIAL,
    name VARCHAR ( 80 ) NOT NULL,
    PRIMARY KEY (band_id)
);

CREATE TABLE "songsdata"(
id SERIAL,  
url VARCHAR ( 80 ) NOT NULL,
image VARCHAR ( 80 ) NOT NULL,
band_id INT NOT NULL, 
PRIMARY KEY(id),
FOREIGN KEY (band_id) REFERENCES bands (band_id)
);

CREATE TABLE "songdescription"(
id SERIAL,
name VARCHAR ( 80 ) NOT NULL,
length INT NOT NULL,
band_id INT NOT NULL,
PRIMARY KEY(id),
FOREIGN KEY (band_id) REFERENCES bands (band_id),
CONSTRAINT fk_id FOREIGN KEY (id) REFERENCES songsdata (id)
);



-- )
/*Idea splitting tables between name and length band id foreign key
with url and image content file with id foreign key
so a band would be the main table and the children table would be the songdata and url
*/
-- CREATE TABLE songsdata(

--  psql -U postgres< database/schema.sql
