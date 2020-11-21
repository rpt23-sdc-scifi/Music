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


InsertQuery(name, length, url, image, band_id) {
    `INSERT INTO songdata (
    name, length, url, image, band_id
)
VALUES (${name, length, url, image, band_id});`
},

UpdateQuery(name, length, url, image, band_id, id) {
    `UPDATE songdata 
SET (
    name = ${name},
    length = ${length},
    url = ${url}, 
    image = ${image}, 
    band_id = ${band_id}
WHERE id = ${id});`
},

GetSong(id) {
    `SELECT * 
    FROM songdata
    WHERE id = ${id};`
},

GetBandSongs(band_id) {
    `SELECT * 
    FROM songdata
    WHERE band_id = ${band_id};`
},

DeleteSongs(id) {
`DELETE FROM songdata
 WHERE id = ${id};`
}

}




