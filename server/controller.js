/*functions for querying database postgressql - using node-progress
--- tables -----
songdata
banddata
---existing functions ----- 
songs by bandid

songdata by id

---new functions ------

update songdata

create songdata

delete songdata


*/

const { Client } = require('pg')

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'music',
    port:5432
});
client.connect();
//node-postgress
/* helper connecting and disconnecting to query
const client = new Client()
;(async () => {
  await client.connect()
  const res = await client.query('SELECT $1::text as message', ['Hello world!'])
  console.log(res.rows[0].message) // Hello world!
  await client.end()
})()


InsertQuery(name, length, url, image, band_id) {
},
UpdateQuery(name, length, url, image, band_id, id) {
},
GetSong(id) {
},
GetBandSongs(band_id) {
},
DeleteSongs(id) {
}
*/
const helper = require('../helper/helper.js');

const songs = (req,res) => {
client
.query(helper.GetSong(/*req.id*/))
.then(res => console.log(res.rows[0]))
.catch( e => console.log(e.stack))

};

const update = (req,res) => {
    client
    .query(helper.UpdateQuery(/*req.[name, length, url, image, band_id, id]*/))
    .then(res => console.log(res.rows[0]))
    .catch( e => console.log(e.stack))

};

const insert = (req,res) => {
    client
    .query(helper.InsertQuery(/*req.[name, length, url, image, band_id]*/))
    .then(res => console.log(res.rows[0]))
    .catch( e => console.log(e.stack))

};

const deleter = (req,res) => {
    client
    .query(helper.DeleteSongs(/*req.id*/))
    .then(res => console.log(res.rows[0]))
    .catch( e => console.log(e.stack))

};

const band = (req,res) => {
    client
    .query(helper.GetBandSongs(/*req.param?*/))
    .then(res => console.log(res.rows[0]))
    .catch( e => console.log(e.stack))

};

module.exports = {
    songs,
    update,
    insert,
    deleter,
    band,
  };
 
// router.get('songdata/:id', controller.songs);
// router.put('songdata/:id', controller.update);
// router.post('/songdata', controller.insert);
// router.delete('/songdata/:id', controller.delete);
// router.get('/songdata/:?band_id', controller.band);

