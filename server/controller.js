
const helper = require('../helper/helper.js');
const db = require('../database/postgres_db.js');
const songs = async (req,res) => {
 try {
    const id = req.params.id;
    if (id > 1000000 || id < 0) {
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
        var id = req.params.id;
        var songname = req.body.songName
        var length = req.body.songLength
        var url = req.body.songURL
        var image = req.body.songImage
        var band_id = req.body.bandID
        if (id > 1000000 || id < 0) {
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
        var id = req.params.id;
        var songname = req.body.songName
        var length = req.body.songLength
        var url = req.body.songURL
        var image = req.body.songImage
        var band_id = req.body.bandID
        if (id > 1000000 || id < 0) {
          res.end('SONG DOES NOT EXIST');
        } else {
          const addSong = await db.insertSong(songname, length, url, image, band_id, id)
          res.send(addSong);
        
        }
      } catch (error) {
        console.log(error)
      }
    
};

const deleter = async (req,res) => {
    try {
        const id = req.params.id;
        if (id > 1000000 || id < 0) {
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
 

