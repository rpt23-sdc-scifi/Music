const helper = require('../helper/helper.js');
const { Pool, Client } = require('pg')
const pool = new Pool()

const client = new Client(
    {
    user: 'postgres',
    host: 'localhost',
    database: 'music',
    port:5432
}
);

const findSong = async (id) =>{
    try {
        const Song = await client.query(helper.GetSong(id))
        return Song.rows[0]
    }
    catch (err) {
        console.log('Error could not find Song: ', err)
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
    findSong
}