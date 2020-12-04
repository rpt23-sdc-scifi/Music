DROP DATABASE IF EXISTS MUSIC;
CREATE DATABASE MUSIC;
\c MUSIC;

create table 
 songdata(
name varchar(80)
length int
id int
url varchar(80)
image varchar(80)
band_id int* 
)


drop table songdata;
-- psql -U postgres < db/schema.sql
