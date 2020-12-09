var express = require('express');
var songData = require('../songData');
var path = require('path');
var app = express();
var cors = require('cors');
var expressStaticGzip = require('express-static-gzip');
var port = 3005;
const client = path.join(__dirname, '/../client');
app.use('/', expressStaticGzip(client, {
  enableBrotli: true,
   orderPreference: ['br', 'gz'],
   setHeaders: function (res) {
      res.setHeader("Cache-Control", "public, max-age=31536000");
   }
}))

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

app.get('/:current', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
})

app.listen(port, () => {
  console.log('Server is listening at http://localhost:' + port)
});

/*
const router = require('./routes.js');
app.use('/api', router);
*/