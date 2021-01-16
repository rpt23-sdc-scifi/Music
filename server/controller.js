
const helper = require('../helper/helper.js');
const db = require('../database/postgres_db.js');
const songs = async (req,res) => {
 try {
    const id = req.params.id;
    if (id > 10000000  || id < 0) {
      res.end('SONG DOES NOT EXIST');
    } else {
      const Song = await db.findSong(id)
      res.send(Song);
    
    }
  } catch (error) {
    console.log(error)
  }

};

const update = async (req,res) => {
    try {
        let id = req.params.id;
        let songname = req.body.songName
        let length = req.body.songLength
        let url = req.body.songURL
        let image = req.body.songImage
        let band_id = req.body.bandID
        if (id > 10000000 || id < 0) {
          res.end('SONG DOES NOT EXIST');
        } else {
          const changeSong = await db.updateSong(songname, length, url, image, band_id, id)
          res.send(changeSong);
        
        }
      } catch (error) {
        console.log(error)
      }
    
};

const insert = async (req,res) => {
   
    try {
        let id = req.params.id;
        let songname = req.body.songName
        let length = req.body.songLength
        let url = req.body.songURL
        let image = req.body.songImage
        let band_id = req.body.bandID
        const addSong = await db.insertSong(songname, length, url, image, band_id, id)
        res.send(addSong);
      } catch (error) {
        console.log(error)
      }
    
};

const deleter = async (req,res) => {
    try {
        const id = req.params.id;
        if (id > 10000000 || id < 0) {
          res.end('SONG DOES NOT EXIST');
        } else {
          const deleteSong = await db.deleteSong(id)
          res.send(deleteSong);
        
        }
      } catch (error) {
        console.log(error)
      }
};

const band = async (req,res) => {
    try {
        const band_id = req.params.id;
        if (id > 100000 || id < 0) {
          res.end('BAND DOES NOT EXIST');
        } else {
          const band = await db.findBand(band_id)
          res.send(band);
        
        }
      } catch (error) {
        console.log(error)
      }
};

module.exports = {
    songs,
    update,
    insert,
    deleter,
    band,
  };
 

