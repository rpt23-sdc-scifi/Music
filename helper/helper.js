/* create an instert
songdata(
    name varchar(80)
    length int
    id int
    url varchar(80)
    image varchar(80)
    band_id int* 

*/
module.exports =  {

// update these to account for three tables
InsertQuery(songname, length, url, image, band_id) {
   return `BEGIN TRANSACTION

    INSERT INTO songsdata (
    name, length, url, image, band_id
)
VALUES (${url, image, band_id});

INSERT INTO songdescription (
    name, length, url, image, band_id
)
VALUES (${songname, length, band_id});

COMMIT`

},

UpdateQuery(songname, length, url, image, band_id, id) {
    return `BEGIN TRANSACTION
    
    
    UPDATE songsdata 
SET (
    url = ${url}, 
    image = ${image}, 
    band_id = ${band_id}
WHERE id = ${id});


UPDATE songdescription 
SET (
    name = ${songname},
    length = ${length},
    band_id = ${band_id}
WHERE id = ${id});


COMMIT`
},


GetSong(id) {
   return `SELECT *
    FROM songsdata 
    INNER JOIN songdescription 
    ON songsdata.id = songdescription.id
    WHERE songsdata.id = ${id};`
},

GetBandSongs(band_id) {
    return `SELECT * 
    FROM songdata
    WHERE band_id = ${band_id};`
},

DeleteSongs(id) {
return `BEGIN TRANSACTION

DELETE FROM songsdata
 WHERE id = ${id};
 
 DELETE FROM songdescription
 WHERE id = ${id};

 COMMIT`
},

}




