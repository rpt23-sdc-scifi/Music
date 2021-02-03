const helper = require('../helper/helper.js');
const { Pool, Client } = require('pg')
const pool = new Pool()
const redis = require('async-redis');

const redisclient = redis.createClient({port: 6379});

redisclient.on('error', err => {
console.log(`Error: ${err}`)
});



const client = new Client(
    {
    user: 'postgres',
    host: 'localhost',
    database: 'music',
    port:5432
}
);

const findSong = async (id) => {
    //  const redisSong = await redisclient.get(id)
    //  if (redisSong !== null) {
    //     return JSON.parse(redisSong)
    //  } else {
        try {

            
            const Song = await client.query(helper.GetSong(id))
            // console.log(JSON.stringify(Song.rows[0]))
            // const cache = await redisclient.set(id, `${JSON.stringify(Song.rows[0])}`);
            // console.log(`Cached: ${cache}`);
            
            // // console.log(Song.rows[0])
            return Song.rows[0]
            }
        
        catch (err) {
            console.log('Error could not find Song: ', err)
        }

     }
      
        // }
    
    




const updateSong = async (id) => {
    try {
        const updateSong = await client.query(helper.UpdateQuery(songname, length, url, image, band_id, id))
        return updateSong
    }
    catch (err) {
        console.log('Error could not update Song: ', err)
    }
}


const insertSong = async (id) => {
    try {
        const insertSong = await client.query(helper.InsertQuery(songname, length, url, image, band_id))
        return insertSong
    }
    catch (err) {
        console.log('Error could not insert Song: ', err)
    }
}
const deleteSong = async (id) => {
    try {
        const  deletedSong = await client.query(helper.DeleteSongs(id))
        return deletedSong
    }
    catch (err) {
        console.log('Error could not delete Song: ', err)
    }
}

const findBand = async (band_id) => {
    try { 
        const  bandName = await client.query(helper.GetBandSongs(band_id))
        return bandName.rows[0]
    }
    catch (err) {
        console.log('Error could not find Band', err)
    }
}

const connect = async () => {
    try {
      await client.connect();
    } catch(err) {
      console.log('Error connecting to database:', err);
    }
  };

const start = async() => {
    await connect();
    console.log('Connected to PSQL Database')
};
start();


module.exports = {
    findSong,
    updateSong,
    insertSong,
    deleteSong,
    findBand,
}
