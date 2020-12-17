# Music
Music Player API

Create / POST - create a new item
Read / GET - read an item
Update / PUT - update an item
Delete / DELETE - delete an item

POST/songdata
Create a new song row in songdata table

Query Parameters:
name varchar(80)
length int
id int
url varchar(80)
image varchar(80)
band_id int

Path Parameters:
N/A

GET/songdata/{id}
Return songdata row by id 

Query Parameters:

N/A

Path Parameters:

id int


GET/songdata/{id}?{band_id}

Return songdata row by band_id 

Query Parameters:

band_id int

Path Parameters:

empty id int

UPDATE/songdata/{id}
update songdata row by id

Query Parameters:
name varchar(80)
length int
url varchar(80)
image varchar(80)
band_id int

Path Parameters:
id int

DELETE/songSdata/{id}

Deletes songsdata by id


Query Parameters:

N/A

Path Parameters:
id int


