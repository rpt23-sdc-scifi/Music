var express = require('express');
var songData = require('../songData');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');
var expressStaticGzip = require('express-static-gzip');
var port = 3005;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const client = path.join(__dirname, '/../client');
app.use('/', expressStaticGzip(client, {
  enableBrotli: true,
   orderPreference: ['br', 'gz'],
   setHeaders: function (res) {
      res.setHeader("Cache-Control", "public, max-age=31536000");
   }
}))
const router = require('./routes.js');
app.use('/api', router);

app.use(cors());

// INCLUDE "try" AND "catch" IN THE ASYNC AWAIT BELOW

app.get('/songdata/:id', async (req, res) => {
  try {
    var id = req.params.id;
    if (id > 100 || id < 0) {
      res.end('SONG DOES NOT EXIST');
    } else {
      var findSongByID = await songData.findSong(id)
      res.send(findSongByID);
    }
  } catch (error) {
    console.log(error)
  }
});

app.delete('/songdata/:id', async (req, res) => {
  try {
    var id = req.params.id;
    if (id > 100 || id < 0) {
      res.end('SONG DOES NOT EXIST');
    } else {
      var deletedSongByID = await songData.deleteOneSong(id)
      res.send(deletedSongByID);
    }
  } catch (error) {
    console.log(error)
  }
})

app.delete('/all', async (req, res) => {
  try {
    var id = req.params.id;
    if (id > 100 || id < 0) {
      res.end('SONG DOES NOT EXIST');
    } else {
      var deleted = await songData.deleteSongs()
      res.send(deleted);
    }
  } catch (error) {
    console.log(error)
  }
})

app.get('/songsByBandID/:id', async (req, res) => {
  try {
    var bandID = req.params.id;
    if (bandID > 30 || bandID < 0) {
      res.end('BAND ID DOES NOT EXIST');
    } else {
      var findSongsByBand = await songData.findSongsByBand(bandID)
      res.send(findSongsByBand);
    }
  } catch (error) {
    console.log(error);
  }
})

// all data must be in json string format
app.post('/songdata/new', async (req, res) => {
  try {
    var dataToBeSaved = req.body;
    console.log(req.body)
    var saved = await songData.saveSong(dataToBeSaved)
    res.send(saved);
  } catch (error) {
    console.log(error)
  }
});

app.put('/songdata/:id', async (req, res) => {
  try {
    var id = req.params.id;
    var name = req.body.songName
    var length = req.body.songLength
    var url = req.body.songURL
    var image = req.body.songImage
    var band = req.body.bandID
    if (id > 100 || id < 0) {
      res.end('SONG DOES NOT EXIST');
    } else {
      var changeSong= await songData.changeSong(id, name, length, url, image, band)
      res.send(changeSong);
    }
  } catch (error) {
    console.log(error)
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
})

app.listen(port, () => {
  console.log('Server is listening at http://localhost:' + port)
});


